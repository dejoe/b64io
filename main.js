import { encode, decode, isValidBase64 } from './base64.js';
import { fileToBase64, downloadBase64File } from './fileHandler.js';

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

function showTab(tabId) {
  tabButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  tabPanels.forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${tabId}`);
  });
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => showTab(btn.dataset.tab));
});

function getPanelInput(panelId) {
  return document.getElementById(`input-${panelId}`)?.value.trim() || '';
}

function setPanelOutput(panelId, text) {
  const el = document.getElementById(`output-${panelId}`);
  if (el) el.value = text;
}

function showPanelError(panelId, message) {
  const el = document.getElementById(`error-${panelId}`);
  if (!el) return;
  el.textContent = message;
  el.classList.add('visible');
}

function clearPanelError(panelId) {
  const el = document.getElementById(`error-${panelId}`);
  if (!el) return;
  el.textContent = '';
  el.classList.remove('visible');
}

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

document.addEventListener('DOMContentLoaded', () => {
  // --- Encode Text ---
  document.getElementById('btn-encode-text').addEventListener('click', () => {
    clearPanelError('encode-text');
    const input = getPanelInput('encode-text');
    if (!input) return;
    try {
      const result = encode(input);
      setPanelOutput('encode-text', result);
    } catch (err) {
      showPanelError('encode-text', 'An error occurred during encoding.');
    }
  });

  // --- Decode Text ---
  document.getElementById('btn-decode-text').addEventListener('click', () => {
    clearPanelError('decode-text');
    const input = getPanelInput('decode-text');
    if (!input) return;
    if (!isValidBase64(input) && !input.startsWith('data:')) {
      showPanelError('decode-text', 'Invalid character structure. This is not a valid Base64 string.');
      return;
    }
    try {
      const cleanInput = input.includes(';base64,') ? input.split(';base64,')[1] : input;
      const result = decode(cleanInput);
      setPanelOutput('decode-text', result);
    } catch (err) {
      showPanelError('decode-text', 'Failed to decode. The string may be corrupted.');
    }
  });

  // --- Encode Image ---
  const fileInput = document.getElementById('file-encode-image');
  const previewImg = document.getElementById('preview-encode-image');

  fileInput.addEventListener('change', async () => {
    clearPanelError('encode-image');
    const files = fileInput.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      showPanelError('encode-image', 'Please select a valid image file.');
      return;
    }
    try {
      const dataUrl = await fileToBase64(file);
      setPanelOutput('encode-image', dataUrl);
      previewImg.src = dataUrl;
      previewImg.classList.add('visible');
    } catch (err) {
      showPanelError('encode-image', err.message || 'Failed to encode image.');
    }
  });

  // --- Decode Image ---
  document.getElementById('btn-decode-image').addEventListener('click', () => {
    clearPanelError('decode-image');
    const input = document.getElementById('input-decode-image').value.trim();
    if (!input) return;
    if (!input.startsWith('data:')) {
      showPanelError('decode-image', 'Please paste a valid Base64 Data URL (data:image/...;base64,...).');
      return;
    }
    try {
      downloadBase64File(input, 'decoded-image');
      const previewImg = document.getElementById('preview-decode-image');
      previewImg.src = input;
      previewImg.classList.add('visible');
    } catch (err) {
      showPanelError('decode-image', err.message || 'Failed to decode image.');
    }
  });

  document.getElementById('btn-download-image').addEventListener('click', () => {
    clearPanelError('decode-image');
    const input = document.getElementById('input-decode-image').value.trim();
    if (!input) {
      showPanelError('decode-image', 'Please paste a Base64 Data URL first.');
      return;
    }
    try {
      downloadBase64File(input, 'decoded-image');
    } catch (err) {
      showPanelError('decode-image', err.message || 'Failed to download image.');
    }
  });

  // --- Copy buttons ---
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.dataset.target;
      const textarea = document.getElementById(targetId);
      if (!textarea || !textarea.value) return;
      try {
        await copyToClipboard(textarea.value);
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 1500);
      } catch (err) {
        // Clipboard access may be blocked; ignore silently.
      }
    });
  });

  showTab('encode-text');
});
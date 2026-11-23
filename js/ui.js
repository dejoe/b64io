const inputArea = document.getElementById('input-text');
const outputArea = document.getElementById('output-text');
const errorDisplay = document.getElementById('error-message');
const fileInput = document.getElementById('file-upload');

export function getInputText() {
  return inputArea.value.trim();
}

export function setInputText(text) {
  inputArea.value = text;
}

export function getUploadedFile() {
  return fileInput.files || null;
}

export function updateOutput(text) {
  outputArea.value = text;
}

export function showError(message) {
  errorDisplay.textContent = message;
  errorDisplay.classList.remove('hidden');
}

export function clearError() {
  errorDisplay.textContent = '';
  errorDisplay.classList.add('hidden');
}

export function clearAll() {
  inputArea.value = '';
  outputArea.value = '';
  fileInput.value = '';
  clearError();
}
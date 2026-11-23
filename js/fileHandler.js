export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Error reading the file.'));
    reader.readAsDataURL(file);
  });
}

export function downloadBase64File(base64DataUrl, defaultName = 'downloaded-file') {
  if (!base64DataUrl.startsWith('data:')) {
    throw new Error('Invalid format. File decoding requires a full Base64 Data URL sequence.');
  }
  const parts = base64DataUrl.split(';base64,');
  const mimeType = parts[0].split(':')[1];
  const rawBase64 = parts[1];
  const binaryStr = atob(rawBase64);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mimeType });
  const extension = mimeType.split('/')[1] || 'bin';
  const finalFileName = `${defaultName}.${extension}`;
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = finalFileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(downloadLink.href);
}
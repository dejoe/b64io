export function encode(str) {
  if (!str) return '';
  const utf8Bytes = new TextEncoder().encode(str);
  const binaryStr = String.fromCharCode(...utf8Bytes);
  return btoa(binaryStr);
}

export function decode(b64) {
  if (!b64) return '';
  const binaryStr = atob(b64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function isValidBase64(str) {
  const cleaned = str.replace(/\s/g, '');
  if (cleaned === '') return true;
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(cleaned);
}
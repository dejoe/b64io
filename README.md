# Base64 IO

A modern, client-side Base64 encoder/decoder for text and images. Encode plain text to Base64, decode Base64 strings back to text, convert images to Base64 data URLs, and decode data URLs back into downloadable image files — all in the browser with no server round-trips.

## Features

- **Encode Text** — Convert plain text to a Base64 string
- **Decode Text** — Convert a Base64 string back to plain text
- **Encode Image** — Select an image file and get its Base64 data URL, with an inline preview
- **Decode Image** — Paste a Base64 data URL to preview and download the image
- **Copy / Test** — Copy results to the clipboard or open a reverse-flow tab to test round-trips
- **URL parameters** — Share pre-filled encode/decode states via query parameters

## Project Structure

```
b64io/
├── index.html      # Application markup
├── styles.css      # Theme and layout styles
├── main.js         # Tab handling, UI wiring, and URL parameter support
├── ui.js           # DOM input/output helpers
├── base64.js       # Base64 encode/decode/validation logic
├── fileHandler.js  # File-to-DataURL and DataURL-to-file utilities
└── README.md       # This file
```

## Usage

Open `index.html` in any modern browser. No build step or server is required.

1. Choose a tab: **Encode Text**, **Decode Text**, **Encode Image**, or **Decode Image**.
2. Enter your input (text, Base64 string, or image file).
3. Click the primary action button to encode or decode.
4. Copy the result with the **Copy** button, or use **Test** to open the reverse operation in a new tab.

### Example query parameters

- `?encode=hello` — opens the Encode Text tab with "hello" pre-filled
- `?decode=aGVsbG8=` — opens the Decode Text tab with a Base64 string pre-filled
- `?decode-image=data:image/png;base64,...` — opens the Decode Image tab with a data URL pre-filled

## Tech stack

- Vanilla JavaScript (ES modules)
- HTML5 FileReader API for image encoding
- Blob/URL APIs for image decoding and download
- No external dependencies

## License

MIT
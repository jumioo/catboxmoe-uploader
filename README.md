# litterbox-catbox-uploader

A simple Node.js client for uploading files to [litterbox.catbox.moe](https://litterbox.catbox.moe/), a temporary file hosting service.

## Features
- Upload files programmatically to Litterbox (Catbox's temporary upload service)
- Set file expiry time (1h, 12h, 24h or 72h)
- Returns the direct download link on success

## Usage
```
const FileUploadClient = require('./client');
const client = new FileUploadClient();
const response = await client.uploadFile('/path/to/file.png', '24h');
console.log('File uploaded:', response);
```

## Installation
```
npm i axios form-data
```

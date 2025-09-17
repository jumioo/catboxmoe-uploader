const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

class FileUploadClient {
    /**
     * @param {string} apiUrl - The API endpoint URL.
     */
    constructor(apiUrl = 'https://litterbox.catbox.moe/resources/internals/api.php') {
        this.apiUrl = apiUrl;
    }

    /**
     * Uploads a file to the API.
     * @param {string} filePath - Path to the file to upload.
     * @param {string} time - Expiry time: "1h", "12h", "24h", or "72h".
     * @returns {Promise<string>} - Resolves with the response from the API.
     */
    async uploadFile(filePath, time = '24h') {
        const allowedTimes = ['1h', '12h', '24h', '72h'];
        if (!allowedTimes.includes(time)) {
            throw new Error(`Invalid time value. Allowed: ${allowedTimes.join(', ')}`);
        }

        const form = new FormData();
        form.append('reqtype', 'fileupload');
        form.append('time', time);
        form.append('fileToUpload', fs.createReadStream(filePath));

        try {
            const response = await axios.post(this.apiUrl, form, {
                headers: form.getHeaders(),
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(`Upload failed: ${error.response.status} ${error.response.statusText}\n${error.response.data}`);
            }
            throw new Error(`Upload failed: ${error.message}`);
        }
    }
}

module.exports = FileUploadClient;

/**
# litterbox-catbox-uploader

Ein einfacher Node.js-Client zum Hochladen von Dateien auf [litterbox.catbox.moe](https://litterbox.catbox.moe/), einen temporären Filehosting-Dienst.

## Features
- Dateien programmatisch zu Litterbox (Catbox' temporärer Upload-Service) hochladen
- Ablaufzeit der Datei setzen (1h, 12h, 24h oder 72h)
- Gibt bei Erfolg den direkten Download-Link zurück

## Beispiel
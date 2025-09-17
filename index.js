const FileUploadClient = require('./client');
const path = require('path');

(async () => {
    try {
        const filePath = path.join(__dirname, "cnw.png");
        const client = new FileUploadClient();
        const response = await client.uploadFile(filePath, '24h');
        console.log('Upload erfolgreich! Link:', response);
    } catch (err) {
        console.error('Fehler beim Hochladen:', err.message);
    }
})();

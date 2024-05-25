const crypto = require('crypto');
const fs = require('fs');

// Generate random bytes for secret key
const secretKey = crypto.randomBytes(10).toString('hex');
fs.writeFileSync('.env', `SECRET_KEY=${secretKey}\n`);

console.log('Secret key generated and saved to .env file.');

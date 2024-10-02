
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created uploads directory');
} else {
  console.log('Uploads directory already exists');
}
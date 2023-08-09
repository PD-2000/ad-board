const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '.public/uploads');
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  }
});

// maximum image file size (currently: 2,000,000 Bytes [2MB])
const maxImageFileSize = 2000000;
const imageUpload = multer({storage: storage, limits: {fileSize: maxImageFileSize}});

module.exports = imageUpload;
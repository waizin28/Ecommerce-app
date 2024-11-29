import multer from 'multer';
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// Filter to include only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only images are allowed!'), false); // Reject the file
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;

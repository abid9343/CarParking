const path = require('path');
const express = require('express');
const domain = require('../handlers/domain/domainHandler');
const router = express.Router();
var multer = require('multer');
const util = require('util');

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join('src/public/images'));
  },
  filename: (req, file, callback) => {
    const match = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/bmp',
      'video/mp4',
      'video/avi',
      'video/mov',
      'video/flv',
      'video/wmv',
      'video/rm',
    ];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg/jpg.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-ads-${file.originalname}`;
    callback(null, filename);
  },
});
var uploadFiles = multer({ storage: storage }).array('multi-files', 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
router.post('/fileUpload', uploadFilesMiddleware, function (req, res, next) {
  try {
    // const data = await  uploadFilesMiddleware(req, res);
    //  console.log(req.files);
    const filePath = [];

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }
    //  req.files.forEach(element => filePath.push({url :`http://localhost:3011/images/${element.filename}`}))
    const baseUrl = domain;
    req.files.forEach((element) =>
      filePath.push({
        full_path: `${baseUrl.prodDomain}/images/${element.filename}`,
      })
    );
    return res.status(200).json({
      status_code: 200,
      is_success: true,
      message: 'success',
      data: filePath,
    });
    // return res.send(`Files has been uploaded.` ,filePath);
  } catch (error) {
    //  console.log(error);

    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(500).json({
        status_code: 500,
        is_success: false,
        message: 'Too many files to upload.',
        data: [],
      });
    }
    return res.status(500).json({
      status_code: 500,
      is_success: false,
      message: `Error when trying upload many files: ${error}`,
      data: [],
    });
  }
});
module.exports = router;

var express = require('express');
var router = express.Router();
const imageUploader = require('./controllers/image.controller').imageUpload;
//var multer = require('multer');
//var upload = multer({ dest: 'images/' })
router.use('/images', express.static('images/'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/imageUpload', imageUploader('images/').single("image"), (req, res, next) => {
  console.log(req.file.filename);

  res.json({ status: "success" });
});

module.exports = router;

var express = require('express');
var router = express.Router();
const Images = require('../schemas/images');
const imageUploader = require('./controllers/image.controller').imageUpload;
//var multer = require('multer');
//var upload = multer({ dest: 'images/' })
router.use('/images', express.static('images/'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/imageUpload', imageUploader('images/').single("image"), (req, res, next) => {

  Images.create({
    imgName: req.file.filename,
    noteID: req.body.noteID
  }, function (err) {
    if (err) {
      console.log(err)
      res.status(500).json({ status: "error" });
    }
    else {
      res.json({ status: "success" });
    }
  })
  //console.log(req.file.filename);

});

router.put('/imageModify', imageUploader('images/').single("image"), (req, res, next) => {

  Images.findOneAndUpdate({
    noteID: req.body.noteID
  }, { $set: { imgName: req.file.filename } })
    .exec().then((image) => {
      console.log(image.imgName);
      res.json({ status: "success", imgName: image.imgName });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ status: "error" })
    });
});

router.get('/image/:noteID', (req, res) => {
  Images.findOne({ noteID: req.params.noteID })
    .then((image) => {
      res.json({ status: "success", image: image });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ status: "error" });
    })

})
module.exports = router;

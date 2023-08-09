const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')


//if we have a lot of images the best practice will be to use a image services not folder on our server
const imageName = new Date().toISOString().replace(/:/g,'-') // bcs the symble (:) does not accepted on Windows

const storage = multer.diskStorage({
  destination: function (req,file,callBackFn) {
    callBackFn(null,path.join(__dirname,'../images'))
  },
  filename: function(req,file,callBackFn){
    callBackFn(null, imageName + file.originalname)
  }
})

const upload = multer({
  storage: storage
})

// /api/upload
router.post('/',upload.single('image'), (req,res) => {
  res.status(200).json({
    message: 'image uploaded'
  })
})



module.exports = router
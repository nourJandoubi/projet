import multer from 'multer'
import path from 'path'

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Job4You_Backend/files')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

var upload = multer({ storage: storage })

var uploadMultiple = upload.fields([{ name: 'imageProfil' }, { name: 'cv' }])

export { uploadMultiple }

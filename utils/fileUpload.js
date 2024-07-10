const multer = require('multer')
// image files upload

// store file in server
const fileStore = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './upload');
    },
    filename: (req, file, callback) => {
        // console.log(file.originalname.replace(/[^\w.-]/g, ' '));
        callback(null, new Date().toISOString().replace(/:/g, "-") + file.originalname.replace(/[^\w.-]/g, ' '))
    }
})

// excle file filttering
const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "application/octet-stream") {
        callback(null, true);
    }
    else {
        console.log("This is Not image file");
        callback(null, false);
    }
}

const limits = {
    fieldNameSize: 10 * 1024 * 1024

}

const uploadImgs = multer({
    storage: fileStore,
    fileFilter: fileFilter,
    limits
});

module.exports = uploadImgs
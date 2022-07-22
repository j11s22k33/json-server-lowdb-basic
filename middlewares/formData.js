const multer = require('multer');
const fs = require("fs");
const env = require('../env');
const path = require("path");

const UPLOAD_DIR = env.UPLOAD_DIR

const getFilename = file => {
    let extname = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extname);
    let date = Date.now();
    return basename + '-' + date + extname
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR);
        }
        cb(null, UPLOAD_DIR) // 저장 디렉토리
    },
    filename: (req, file, cb) => {
        cb(null, getFilename(file));
    }
});
const upload = multer({storage: storage});

// module.exports = upload.single("image")
module.exports = upload
const multer = require('multer');
const fs = require("fs");
const env = require('../env');
const fileHelper = require('../common/fileHelper');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(env.UPLOAD_DIR)) {
            fs.mkdirSync(env.UPLOAD_DIR);
        }
        cb(null, env.UPLOAD_DIR) // 저장 디렉토리
    },
    filename: (req, file, cb) => {
        cb(null, fileHelper.createUploadFilename(file));
    }
});
const upload = multer({storage: storage});

// module.exports = upload.single("image")
module.exports = upload
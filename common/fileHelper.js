const path = require("path");
const fs = require("fs");
const env = require('../env.js');

const helper = {}

helper.createUploadFilename = file => {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const date = Date.now();
    let filename = basename + '-' + date + extname;

    console.info(`[fileHelper] upload filename: ${filename}`)
    return filename
}

helper.getFilename = file => file.filename

helper.deleteFiles = filenameArray => {
    if (!Array.isArray(filenameArray)) {
        throw new Error("Invalid pathArray")
    }

    console.info(`[fileHelper] delete files:`);
    console.info(filenameArray);

    filenameArray.forEach(filename => {
        try {
            const unlinkPath = `./${env.UPLOAD_DIR}/${filename}`
            if (fs.existsSync(unlinkPath)) {
                fs.unlinkSync(unlinkPath); // 이전파일 삭제
            }
        } catch (err) {
            console.error(err);
        }
    })
}

module.exports = helper
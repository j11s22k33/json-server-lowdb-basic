const fs = require('fs');
const db = require('../lowdb');
const env = require('../env.js');

const DBNAME_POSTS = 'posts';
const UPLOAD_DIR = env.UPLOAD_DIR;

const handlers = {};
handlers.getAllPost = async (req, res) => {
    const rows = db.helper.get(DBNAME_POSTS)
        .sortBy('_id')
        .reverse()
        .value();

    res.status(200).json(rows);
}
handlers.getPostByID = async (req, res) => {
    const id = req.params.id;
    const row = db.helper.get(DBNAME_POSTS)
        .find({'_id': id})
        .value();

    res.status(200).json(row);
}

handlers.createPost = async (req, res) => {
    const post = req.body;
    post.image = req.file.filename;

    const id = db.helper.generateId();
    const rows = db.get(DBNAME_POSTS)
        .push({
            _id: id,
            title: post.title,
            category: post.category,
            content: post.content,
            image: post.image
        })
        .write()

    res.status(201).json({message: 'post created successfully'});
}
handlers.updatePost = async (req, res) => {
    const id = req.params.id;
    let new_image = '';
    if (req.file) {
        new_image = req.file.filename; // 새파일
        try {
            const unlinkPath = `./${UPLOAD_DIR}/${req.body.old_image}`
            if (fs.existsSync(unlinkPath)) {
                fs.unlinkSync(unlinkPath); // 이전파일 삭제
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        new_image = req.body.old_image;
    }

    const post = req.body;
    post.image = new_image;

    const row = db.helper.get(DBNAME_POSTS)
        .find({'_id': id})
        .assign({
            title: post.title,
            category: post.category,
            content: post.content,
            image: post.image
        }).write()

    res.status(201).json({message: 'post updated successfully'});
}
handlers.deletePost = async (req, res) => {
    const id = req.params.id;
    const row = db.helper
        .get(DBNAME_POSTS)
        .find({'_id': id})
        .value();

    const rows = db.helper.get(DBNAME_POSTS)
        .remove({'_id': id})
        .write()

    const image = row?.image
    if (image !== '') {
        try {
            const unlinkPath = `./${process.env.UPLOAD_DIR}/${image}`
            if (fs.existsSync(unlinkPath)) {
                fs.unlinkSync(unlinkPath);
            }
        } catch (err) {
            console.error(err);
        }
    }
    res.status(200).json({message: 'post deleted successfully'});
}

module.exports = handlers;
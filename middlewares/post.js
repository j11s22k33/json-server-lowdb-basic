const fs = require('fs');
const db = require('../lowdb');
const env = require('../env.js');
const fileHelper = require('../common/fileHelper');

const DBNAME_POSTS = 'posts';

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
    post.image = fileHelper.getFilename(req.file);

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
    const {old_image} = req.body;
    let new_image = '';
    if (req.file) {
        new_image = fileHelper.getFilename(req.file)
        fileHelper.deleteFiles([old_image]);
    } else {
        new_image = old_image;
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

    fileHelper.deleteFiles([row?.image]);
    res.status(200).json({message: 'post deleted successfully'});
}

module.exports = handlers;
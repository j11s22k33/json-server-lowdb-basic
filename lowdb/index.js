/**
 * https://www.npmjs.com/package/lowdb/v/1.0.0
 *
 * commonjs require 쓰려면 lowdb v1.0.0 (package.json type: commonjs)
 * lowdb v2.0.0 부터 module import 로 변경되었다 (package.json type: module)
 */
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./lowdb/db.json')
const db = low(adapter)
const shortid = require('shortid')
const { v1: uuidv1 } = require('uuid')
/****************************
 *
 * helper
 *
 ****************************/
const helper = {}
// helper.generateId = () => shortid.generate()
helper.generateId = () => uuidv1()
/**
 * @param {string} dbname
 * @return {*} lodash
 */
helper.get = (dbname) => {
    if (!db.has(dbname).value()) {
        db.set(dbname, []).write()
    }
    return db.get(dbname)
}
/**
 * @param {string} dbname
 * @return {array} [] raw array
 */
helper.getRawArray = (dbname) => {
    return helper.get(dbname).value()
}
/**
 * @param {string} dbname
 * @param {array} rawArray - [] raw array
 * @return {object} {[], [], []} db.json root object
 */
helper.setRawArray = (dbname, rawArray) => {
    return db.set(dbname, rawArray).write()
}
db.helper = helper
module.exports = db
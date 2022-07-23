const listEndpoints = require("express-list-endpoints");
const helper = {}

/**
 * https://www.npmjs.com/package/express-list-endpoints
 * @param {*} app - Express app or router instance
 */
helper.getEndpointList = (app) => {
    const listEndpoints = require('express-list-endpoints');
    let endpointList = listEndpoints(app)

    endpointList = endpointList.map(endpoint =>
        `${endpoint.methods} ${endpoint.path}`)

    return endpointList;
}

module.exports = helper;
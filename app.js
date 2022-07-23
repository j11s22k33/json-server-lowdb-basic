const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mComm = require('./middlewares/common');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.static('uploads'));

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));

app.use(mComm.reqCommon);

app.use('/api/post', require('./routes/post.js'));
app.use('/api/auth', require('./routes/auth.js'));

app.use(mComm.resError);

process.on('exit', () => console.info('process exit: App is closed'));

app.listen(port, () => {
    console.info(`Server running at port:${port}`)

    const commonHelper = require("./common/commonHelper");
    const endpointList = commonHelper.getEndpointList(app);
    console.info(endpointList)
});
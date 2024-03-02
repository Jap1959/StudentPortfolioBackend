const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const multer = require('multer');
app.use(cors());
const AddData = require('./Database/AddData/AddData.js');
const GetData = require('./Database/GetData/Getdata.js');
mongoose.connect("mongodb://127.0.0.1:27017/StudentPortfolio").then(() => console.log('Connection sucessfull.....')).catch((err) => console.log(err));
app.get('/', (req, res) => {
    console.log('Connected!!!!!!!!!!');
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./uploads`);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
const upload = multer({ storage });
app.post('/AddAboutme', upload.array('file'), async (req, res) => {
    const data = req.body;
    const result = await AddData.AddAboutme(data);
    res.send(result);
});
app.post('/AddSkills', async (req, res) => {
    const data = req.body;
    const result = await AddData.AddSkills(data);
    res.send(result);
});
app.post('/AddProjects', upload.array('file'), async (req, res) => {
    const data = req.body;
    const result = await AddData.AddProject(data);
    res.send(result);
});
app.post('/Completed', (req, res) => {
    const data = req.body;
    const result = AddData.AddComplete(data);
    res.send(result);

});
app.post('/AddExprience', async (req, res) => {
    const data = req.body;
    const result = await AddData.AddExprience(data);
    res.send(result);
});
app.post('/AddBasicInfo', async (req, res) => {
    const data = req.body;
    const result = await AddData.AddBasicInfo(data);
    res.send(result);
});
app.get('/GetHeaderSection/:id', async (req, res) => {
    const id = req.params.id;
    const result = await GetData.GetHeaderSection(id);
    res.send(result);
});
app.get('/GetSkills/:id', async (req, res) => {
    const id = req.params.id;
    const result = await GetData.GetSkills(id);
    res.send(result);
});
app.get('/GetExprience/:id', async (req, res) => {
    const id = req.params.id;
    const result = await GetData.GetExprience(id);
    res.send(result);
});
app.get('/GetAboutme/:id', async (req, res) => {
    const id = req.params.id;
    const result = await GetData.GetAboutMe(id);
    res.send(result);
});
app.get('/GetProject/:id', async (req, res) => {
    const id = req.params.id;
    const result = await GetData.GetProject(id);
    res.send(result);
});
app.listen(5000, (req, res) => {
    console.log('Listing on port 5000');
});
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', './views');
const AWS = require('aws-sdk');
var s3;
//const s3tree = require("s3-tree");
app.get('/', (req, res) => {
  //res.sendFile('layout.html', { root: __dirname });
  res.render('layout');
});
app.post('/t', (req, res) => {
  var data = {
    SecretAccessKey: req.body.SecretAccessKey,
    AccessKeyId: req.body.AccessKeyId,
    BucketName: req.body.BucketName,
    folderName: req.body.folderName
  };
  res.render('test', { data: data });
  s3 = new AWS.S3({
    accessKeyId: req.body.AccessKeyId,
    secretAccessKey: req.body.SecretAccessKey,
    region: "us-west-2"
  });
  listDirectories(req.body.BucketName, req.body.folderName+"/").then(data => console.log(data));
  
});
const listDirectories = (bucket, prefix) => {
  return new Promise((resolve, reject) => {
    const s3params = {
      Bucket: bucket,    
      MaxKeys: 1000,
      Delimiter: '/',
      Prefix: prefix   
    };
     s3.listObjectsV2(s3params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
//const generator = s3tree({ bucket:'client-data-nsvue-qa' });


app.listen(3000, function () {
  console.log('app listening on port 3000!');
});


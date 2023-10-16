const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const Aws = require('aws-sdk')
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser')
app.use(fileUpload());
const bucketName = process.env.AWS_BUCKET_NAME
const region = 'ap-south-1'
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_ACCESS_KEY_SECRET
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(fileUpload());

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'database-1.cs8dlnzedl9c.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Sahithi145',
  database: 'DROPBOX',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.post('/uploadfile', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const uploadedFile = req.files.file;
  console.log( uploadedFile);
  // AWS.config.update({
  //     region: 'us-east-1', // e.g., 'us-east-1'
  //     accessKeyId: 'AKIAQLR4HGSWSCIWKUQA',
  //     secretAccessKey: 'twt/PSv5i1WZZfRRfRLQcb4Mbz+QtGSxdHYYJQ9n',
  // });

  // const s3 = new AWS.S3();

  // const params = {
  //     Bucket: 'dropbox-storage-newww-0f023744221638-staging',
  //     Key: uploadedFile.name,
  //     Body: uploadedFile.data,

  // };
  //const fileStream = fs.createReadStream(uploadedFile.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: file.data,
        Key: file.name
    }
  const data = await s3.upload(uploadParams).promise();
  console.log(uploadedFile);
  try {
     
    const  file_name = uploadedFile.name;
    const   file_size = uploadedFile.size;
    const description ='';
    const  file_type = uploadedFile.mimetype;
    const file_path = uploadedFile.tempFilePath;
    const file_s3_key ='';
    const uploaded_at =new Date();
    const updated_at = new Date();
    const user_id = 1;

    // Input validation (basic example)
    // if (!fileName || !fileSize || !fileType) {
    //   return res.status(400).send('Invalid input');
    // }
 console.log('printt');
    const query =
      'INSERT INTO File (file_name, file_size, description, file_type, file_path, file_s3_key, uploaded_at, updated_at, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(query, [
      file_name,
      file_size,
      description,
      file_type,
      file_path,
      file_s3_key,
      uploaded_at,
      updated_at,
      user_id,
    ]);

    res.json({ success: true, message: 'File details inserted', insertId: result.insertId });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data into the database.');
  }
});


// Define API endpoints
app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM `File`');
    res.json(rows);
  } catch (err) {
    console.error(err);
   // res.status(500).send('Error fetching data.');
  }
});

// Start the server
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});

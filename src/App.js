import logo from './logo.svg';
import './App.css';
import { Outlet } from "react-router-dom";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';
import React, { useState } from 'react';
import AWS from 'aws-sdk';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function App({ signOut, user }) {

  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadedFile, setDownloadedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(' File:', file);
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      
      // Configuring the AWS environment
      AWS.config.update({
        region: 'us-east-1', // e.g., 'us-east-1'
        accessKeyId: 'AKIAQLR4HGSWSCIWKUQA',
        secretAccessKey: 'twt/PSv5i1WZZfRRfRLQcb4Mbz+QtGSxdHYYJQ9n',
      });

      const s3 = new AWS.S3();

      const params = {
        Bucket: 'dropbox-storage-newww-0f023744221638-staging',
        Key: selectedFile.name,
        Body: selectedFile,

      };

      try {
        const data = await s3.upload(params).promise();
        console.log('File uploaded successfully.', data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      alert('Please select a file to upload.');
    }
  };

  const downloadFile = async () => {
    AWS.config.update({
      region: 'us-east-1', // e.g., 'us-east-1'
      accessKeyId: 'AKIAQLR4HGSWSCIWKUQA',
      secretAccessKey: 'twt/PSv5i1WZZfRRfRLQcb4Mbz+QtGSxdHYYJQ9n',
    });

    const s3 = new AWS.S3();

    const params = {
      Bucket: 'dropbox-storage-newww-0f023744221638-staging',
      Key: 'Avengers-Endgame-Chris-Hemsworth-talks-about-the-future-of-Thor-1893473.jpg',

    };
    // const downloadParams = {
    //   Bucket: 'YOUR_BUCKET_NAME',
    //   Key: selectedFile.name,
    // };

    try {
      const data = await s3.getObject(params).promise();
      setDownloadedFile(data.Body);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <>
      {/* <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="/home">Dropbox</a>
          </div>
          <ul class="nav navbar-nav">
            <li><a href="/home">Home</a></li>
            <li><a href="/itemList">My Files</a></li>
          </ul>
        </div>
      </nav> */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Dropbox</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="ItemList">My Files</Nav.Link>
            </Nav>
            <Button onClick={signOut} variant="dark">Signout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
    //   <div>
    //   {/* Navigation Bar */}
    //   <nav>
    //     <div className="logo">Dropbox</div>
    //     <ul>
    //       <li><a href="#">Home</a></li>
    //       <li><a href="#">My Files</a></li>
    //     </ul>
    //   </nav>

    //   {/* Upload File Button */}
    //   <section className="upload-section">
    //     <h2>Upload File</h2>
    //     <form onSubmit={handleFileUpload}>
    //     <label htmlFor="file-upload" className="upload-button">
    //       <span>Choose a file</span>
    //       <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} />
    //       <button type='submit' >Upload to S3</button>
    //     </label>
    //     </form>
    //   </section>

    //   {/* My Files Section */}
    //   <button type='submit' onClick={downloadFile}>Download File</button>
    //   <section className="my-files">
    //     <h2>My Files</h2>
    //     <ul>
    //       {/* List of user's files */}
    //       <li>
    //         <a href="#">File 1</a>
    //       </li>
    //       <li>
    //         <a href="#">File 2</a>
    //       </li>
    //       <li>
    //         <a href="#">File 3</a>
    //       </li>
    //       {/* Add more files as needed */}
    //     </ul>
    //   </section>
    // </div>  
  );
}

export default withAuthenticator(App);


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
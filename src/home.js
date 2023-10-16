import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import AWS from 'aws-sdk';
import axios from 'axios';


function Home() {
    const [isLoading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileDetails, setFileDetails] = useState({
        file_name: '',
        file_size: '',
        description: '',
        file_type: '',
        file_path: '',
        file_s3_key: '',
        uploaded_at: '',
        updated_at: '',
        user_id: '',
      });
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(' File:', file);
        setSelectedFile(file);
        const { name, value } = e.target;
    setFileDetails({ ...fileDetails, [name]: value });
    };

    const uploadFileToS3 = async () => {
        console.log( selectedFile);
        AWS.config.update({
            region: 'us-east-1', // e.g., 'us-east-1'
            accessKeyId: 'AKIAQLR4HGSWSCIWKUQA',
            secretAccessKey: 'twt/PSv5i1WZZfRRfRLQcb4Mbz+QtGSxdHYYJQ9n',
        });

        const s3 = new AWS.S3();

        const params = {
            Bucket: 'dropbox-storage-newww-0f023744221638-staging',
            Key: selectedFile.name,
            Body: selectedFile.data,

        };
        const data = await s3.upload(params).promise();
        return data;
    };
    const handleFileUpload = async () => {

        if (selectedFile) {
            setLoading(true);
            
            // Configuring the AWS environment
            

            try {
                
             //  const s3_key = await uploadFileToS3();
              console.log(fileDetails);
              const formData = new FormData();
             formData.append('file', selectedFile);
                const response = await axios.post('http://localhost:5001/uploadfile', formData);
      console.log(response.data);
      // Reset the form
      setFileDetails({
        file_name: '',
        file_size: '',
        description: '',
        file_type: '',
        file_path: '',
        file_s3_key: '',
        uploaded_at: '',
        updated_at: '',
        user_id: '',
      });
      
                //console.log('File uploaded successfully.', data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
            setLoading(false);
        } else {
            alert('Please select a file to upload.');
        }
    };

    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%"
            }}>
                <section className="upload-section">
                    <h2>Upload File</h2>
                    <form onSubmit={handleFileUpload} encType='multipart/form-data' >
                        <label htmlFor="file-upload" className="upload-button" style={{marginRight:"10px"}}>
                            <input type="file" id="file-upload" onChange={handleFileChange} />
                        </label>
                        <Button
                            type='submit'
                            variant="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading…' : 'Upload to S3'}
                        </Button>
                    </form>
                </section>
            </div>

        </>
    );
}

export default Home;
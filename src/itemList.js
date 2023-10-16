import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function ItemList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/data')
      .then((response) => {
        // Update the state with the received data
        setFiles(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Data loading is complete
      });
  }, []);
 
  
  
  // Format the date as needed
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <div style={{ width: '80%' }}>
        <h2>Files</h2>
        {loading ? (
          // Show a loading message while data is loading
          <div>Loading...</div>
        ) : (
          // Data is loaded, display the table
          <Table striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Last Modified</th>
                <th>Download</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {files.map((info,index) => (
                <tr key={info.id}>
                  <td>{index+1}</td>
                  <td>{info.file_name}</td>
                  <td>{new Date(info.updated_at).toLocaleString('en-US', options)}</td>
                  <td>
                    <Button variant="outline-primary" size="sm">
                      Download
                    </Button>
                  </td>
                  <td>
                    <Button variant="outline-warning" size="sm">
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button variant="outline-danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default ItemList;

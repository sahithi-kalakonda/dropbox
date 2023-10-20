# dropbox

*	University Name: San Jose State University http://www.sjsu.edu/ 
*	Course: [Cloud Technologies](http://info.sjsu.edu/web-dbgen/catalog/courses/CMPE281.html)
*	Professor: [Sanjay Garje](https://www.linkedin.com/in/sanjaygarje/)
*	Student: [Sahithi Kalakonda](https://www.linkedin.com/in/sahithik14)

### Project Introduction
DropBox is an AWS cloud-hosted web application provides authorized users with a safe environment for managing their files online. It makes it easier to upload, download, update, and delete files from any location. This three-tier application uses a variety of AWS resources to guarantee high availability, scalability, and a reasonably priced way to back up data on Amazon S3 and CloudFront. By employing AWS auto-scaling technology, the application effortlessly manages the load during periods of peak demand. Additionally, it makes use of CloudWatch, AWS Lambda, and SNS to track the health of EC2 instances linked to the auto-scale group.

### Demo
Youtube Video: [DropBox Demo](https://youtu.be/k2G63HiT3Ps)

### Detailed Website Video with instances
Youtube Video: [Detailed Website Video](https://youtu.be/umtCgPsoYMk)

Web Application: [http://vaultwave.online](http://vaultwave.online)

Deploy on AWS : [23.22.79.188](http://23.22.79.188)

### AWS Architecture of the project
![CloudProject1](https://github.com/sahithi-kalakonda/dropbox/blob/485636036015292b8045701710e04d412030fbf2/arch.jpg)


### AWS Components to be setup
* EC2: I've installed Node.js, Nginx, and the project from Git, and I've successfully launched an EC2 instance. All /api requests are being intelligently forwarded by Nginx to the Node.js server, while all other requests are being forwarded to the React app. The painstakingly designed EC2 instance I generated also has an AMI that can be easily used with Auto Scaling settings to ensure smooth scalability and resource deployment in accordance with application demands.
* AutoScaling Group: Create a highly-available system and applications that can scale to the given maximum instances of 1 and 2, respectively, by configuring the auto scaling policy. According to parameters like CPU Util, network in/out, data rates, etc., you can alter these configurations at any time in the autoscaling policy.
* Load Balancer: To divide incoming traffic among various instances, configure the load balancer with the proper listeners and routing rules.
* S3: For managing objects inside the bucket, we need to configure the necessary access restrictions and provide the relevant permissions for the bucket.For automatic data management within the bucket, we can enable versioning, enable logging, and set up lifecycle rules.
* S3 IA: The lifecycle rules for a certain S3 bucket can be specified, and I have set the maximum duration for given objects in the bucket to remain in this storage class for 75 days.
* AWS Glacier for S3 bucket: I have set up the files to migrate here after 365 days in the cold storage class called Glacier.
* RDS:To keep track of the files that users upload and the associated parameters, such as description, generated and modified times, etc., establish an RDS.
* CloudFront: Created CloudFront (CDN) that is set up for file downloads with a minimum TTL of 30 seconds to reload the cache.
* Route 53: The IP address of the application domain is resolved using this domain name server.
* CloudWatch: AWS's CloudWatch is a monitoring and observability service that gathers and records data from a variety of AWS resources to enable operational insights, resource utilization tracking, and performance management.
* Lambda: When a delete event occurs in an S3 bucket, it calls the Lambda function that was defined in nodeJS, which then calls an SNS topic to send an email notification.
* SNS: With the help of SNS (Simple Notification Service), an adaptable and completely managed messaging service offered by AWS, messages or notifications can be sent to a number of destinations, including email, SMS, and other AWS services.
* AWS Amplify: AWS Amplify is a collection of tools and services that make it easier to create scalable and secure full-stack apps. It does this by accelerating the development process with features like authentication, APIs, and storage.

### Sample Screenshots
User Registration
![User Registration](https://github.com/sahithi-kalakonda/dropbox/blob/f62e333d5dbc40f98972728194d40dae352f183b/userRegistartion.png)

Custom Login
![Custom login](https://github.com/sahithi-kalakonda/dropbox/blob/de32ccd42a21482a247ec0e3a368a5a926ff2dfd/login.png)

File Upload
![File Upload](https://github.com/sahithi-kalakonda/dropbox/blob/80977f45ae3284a56316f808d7a9f83785f629c5/fileupload.png)

File Download
![File Download](https://github.com/sahithi-kalakonda/dropbox/blob/1283bd98c022c12ab73d65e25bd82a962905ba6b/myfiles.png)

Database Update
![Database Update](https://github.com/sahithi-kalakonda/dropbox/blob/9fbf1f191e412cd34ff42cd7638058e286524516/Screen%20Shot%202023-10-16%20at%208.44.38%20PM.png)

Files Uploaded to S3 Bucket
![Files Uploaded to S3 Bucket](https://github.com/sahithi-kalakonda/dropbox/blob/c4394d3b18984db501c04ae674104e3d1ed357c4/S3fileupload.png)

Transfer Acceleration
![Transfer Acceleration](https://github.com/sahithi-kalakonda/dropbox/blob/01818bb0becf699f16783c5671645897aa892025/TrnasferAcceleration.png)

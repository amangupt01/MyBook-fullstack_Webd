# MyBook-fullstack_Webd
Mybook is an online portal where user can register and login to add their own articles.

## Functionality
* Everyone can read the articles written by the authors of MyBook.
* To write an article you can register yourself at MyBook.
* Login with username and Password anytime after registration.
* Authors can write,edit and delete their own articles and can post them to make them Public.

## Features 
* Uses **Bcrypt** and **Passport** to secure and encrypt the passwords.
* Backed up articles and user info in online **MongoDB Atlas** .
* Fast and buffer free as it uses **NodeJs** environment for running Javascript files.
* Uses **connect-flash**,**session** and **express-validator**  for flash messaging and validation.
* It has **express** famework with **express-handlebars** view engine.
* Hosted on **Google gcloud** server.

## Getting Started :
**Step-1** Fork the repository   
**Step-2** intialize npm in the directory using ```npm init```  
**Step-3** MyBook uses the following libraries :  
  Install all them using command ```npm install```
  * "@handlebars/allow-prototype-access": "^1.0.3",
  * "bcryptjs": "^2.4.3",
  * "body-parser": "^1.19.0",
  * "bootstrap": "^3.4.1",
  * "connect-flash": "^0.1.1",
  * "cookie-parser": "^1.4.5",
  * "express": "^4.17.1",
  * "express-handlebars": "^4.0.3",
  * "express-messages": "^1.0.1",
  * "express-session": "^1.17.1",
  * "express-validator": "^5.3.1",
  * "handlebars-helpers": "^0.10.0",
  * "handlebars-layouts": "^3.1.4",
  * "jquery": "^3.5.0",
  * "mongoose": "^5.9.9",
  * "passport": "^0.4.1",
  * "passport-local": "^1.0.0",
  * "port": "^0.8.1"   
 
**Step-4** Make an online cluster in mongoDb Atlas and also create a user . 
**Step-5** Modify the database.js in cofig folder by changing the database attribute by   
``` database : database:'mongodb+srv://<username>:<password>@mybookdb-wezbl.gcp.mongodb.net/test?retryWrites=true&w=majority',```  
**Step-5** You can check the website on ```localhost:8080```

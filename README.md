# Quiz Site for Enigma
This repo contains the quiz web app for the Enigma event to be held by D'CoderS

## Setting up the app

1. Install NodeJS v6.11.4 (tested on this version)

2. Clone the repo

3. Import enigma.sql to your database

4. Create config.js under routes with modified version the following code:
```
module.exports = {

    'DB_USER': '', // Database Username
    'DB_USER_PASS': '', // Database user password
    'DB_NAME': 'enigma',
    'SESSION_TOKEN_SECRET': '', //Any random string used while creating session tokens
    'TOTAL_QUESTIONS': 100 // Total number of questions for the quiz

};
```
5. run ```npm install``` to install all the dependencies

6. run ```npm start```

## Modifying HTML content

The homepage can be directly modified which is present under ```public/``` folder as ```index.html```

***IMPORTANT : Make sure your (question 1 has id 1), (question 2 has id 2), ... in the questions table.***

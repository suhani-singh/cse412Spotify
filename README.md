After unzipping the CSE412FinalProject4.zip, you will have two folders, CSE412ProjectBackend, which has spotify-app-backend folder, and CSE412ProjectFrontend which has the spotify-app-frontend folder. Below are the steps to run everything:

1. In the spotify-app-backend folder, edit the server.js file where it has the code below. Change spotifyDB to the name of the postgres database you made with our data, and change password to your postgres password:

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'spotifyDB',
  password: '--',//add postgres pw
  port: 5432,
});

2. cd into spotify-app-backend
3. run command: node server.js
4. cd into spotify-app-frontend
5. run command: npm start

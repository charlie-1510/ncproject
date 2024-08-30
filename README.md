# Northcoders News API

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

This project seeds a database based around news articles and allows a user to make queries through the server's api.
below is a link to the hosted version of the project:

https://ncproject-4nhu.onrender.com/api

To run this project locally you must create a ".env.test" file and a ".env.development" file in the "be-nc-news" folder.
Within the ".env.test" file, insert the test database name as follows PGDATABASE=<TEST_DATABASE_NAME>.
Within the ".env.development" file, insert the development database name as follows PGDATABASE=<DEVELOPMENT_DATABASE_NAME>.
Replace <TEST_DATABASE_NAME> and <DEVELOPMENT_DATABASE_NAME> with the test database name and development database name respectively.
next, type "npm run setup-dbs" into your terminal in the main folders directory to setup your database.

You may also need to install the following:
express "npm install express"
supertest "npm install -D supertest"
jest-sorted "npm install --save-dev jest-sorted"

To test the app or utils, change your directory to "**tests**" and type "npm test app.test.js" or "npm test utils.test.js" respectively in to your terminal.

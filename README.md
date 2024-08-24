# Northcoders News API

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

To run this project locally you must create a ".env.test" file and a ".env.development" file in the "be-nc-news" folder.
Within the ".env.test" file, insert the test database name as follows PGDATABASE=<TEST_DATABASE_NAME>.
Within the ".env.development" file, insert the development database name as follows PGDATABASE=<DEVELOPMENT_DATABASE_NAME>.
Replace <TEST_DATABASE_NAME> and <DEVELOPMENT_DATABASE_NAME> with the test database name and development database name respectively.
next, type "npm run setup-dbs" into your terminal in the main folders directory to setup your database.
you may also need to install the following:
express "npm install -D express"
supertest "npm install -D supertest"

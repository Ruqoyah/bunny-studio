# bunny-studio

## Hosted Application

## Technologies Used
* NodeJS
* Express
* React
* PostgreSQL
* Sequelize
* Babel
* Webpack
* Axios

## Installation
1.  Git clone this repository `https://github.com/Ruqoyah/bunny-studio.git`
2.  Change your directory `cd bunny-studio`
3.  Install all dependencies `npm install`
4.  Create .env file which will be used to load environment variables see sample in `.env.example` file in the project
5.  Migrate `npm run db:migrate`
6.  Run Seed `npm run db:seed`
7.  Start the app `npm run start:dev` for development 
8.  Navigate to `localhost:8000` in your browser


## Features
- Super Admin can login using the below credential:
    Email: superadmin@example.com
    Password: super-admin
- Super Admin can add user.
- Super Admin can see the list of users.
- Super Admin can update user details.
- Super Admin can delete user.
- Super Admin can add tasks for users.
- Super Admin can update user tasks.
- User can login with the email and password created for them by Super Admin. E.g:
    Email: testnew@example.com
    Password: test123
- User can update their tasks status.
- 404 Page Incase User get lost.
- Ensure User can't access login and homepage when they are already loggedin
- Ensure User can't access authenticated pages e.g users, tasks.


## Coding Style
- Airbnb: Airbnb is a coding style guide that guides developers to write clean codes

## Author
-  Rukayat Odukoya
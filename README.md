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
6.  Migrate `sequelize db:migrate`
7.  Start the app `npm start` for development 
8.  Navigate to `localhost:8000` in your browser


## Limitations
- Users cannot deactivate their accounts
- Users can only create account once with their username and email
- Users can login and obtain a token which is verified on every request
- Users will have to obtain a fresh token after 24 hours when their session has expired
- Users will only be able to access the full application functionalities only if they are logged in


## Coding Style
- Airbnb: Airbnb is a coding style guide that guides developers to write clean codes

## Author
-  Rukayat Odukoya
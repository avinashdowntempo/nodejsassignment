# NodeJS Assignment!
**Author**:Avinash J

# Summary
	
This application was created using node and express framework. 
Application uses clustering to utilize every cores available in the processor to improve performance and load balancing.
Application uses OAuth Jwt authentication to secure the api routes from unauthorised user.
MongoDB is being used to save the user details.
Used Mongoose to create Schema for database operation.
Api are exposed to perform the given assignment tasks.

# Note
	
 - Please change the database connection string to your mongodb connection string in the /config/db.js file .
 - Make sure you create a user using signup api before starting to test other api.
 - Login using the login api to get a token so that you can access other api routes.
 - To access type routes attach the token to authorization header before sending the request.

## List of Api

 1. *****/signup***** : 

> body:
> {
    "userName": "username",
    "userEmail": "useremail",
    "password": "password"
}
 2. *****/login***** : 

> body:
> {
    "userName": "username",
    "userEmail": "useremail",
    "password": "password"
}
 3. *****/api/v1/type1***** : 

> body:
> {
    "input": [31, 32, 43, 23, 4, 8]
}
 4. *****/api/v1/type2***** : 

> body:
> {
    "input":"ab,c#de@,'$%fgh*"
}
 5. *****/api/v1/type3***** : 

> body:
> {
    "input": [1, 3, 4, 7, 9, 10]
}

## How to run

 1. Get into the root folder and issue the command  **"npm install"** to install all dependency.
 2. Issue **"npm start"** command to run the application.
 3.  Issue **"set DEBUG=nodejs-assignment:*** **& npm start"** command to run the application.
 
 ## Contact

 emailto: avinashj4394@gmail.com
 mobile: 9597352264

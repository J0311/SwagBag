# Running the Application

Once you have completed the prerequisites, you can run the application by following the steps below:

1. Clone the repository
2. Open the project in your IDE

## Backend

3.  From terminal, navigate to the `backend` directory
4.  Run `mvn spring-boot:run -Dspring-boot.run.profiles=dev`, if maven is NOT installed on your machine, you will need to set the environment variable (active profile) to `SPRING_PROFILES_ACTIVE=dev` manually before running the application. To do this in IntelliJ:
    1. Go to `Run > Edit Configurations > Environment Variables` and add the variable there.
    2. Then run the application by clicking the green play button.
    3. If you are using a different IDE, please refer to the documentation for that IDE on how to set active profiles for Spring Boot applications.
5.  If everything is working correctly, the server should be running on `http://localhost:8080`

## Environment Variables

NOTE: These environment variables are ONLY required if you like to test the admin functionality. If you do not wish to test the admin functionality, you can skip this section.

Otherwise, you will need to create a `.env` file in the `frontend` directory with the following variables:

- `ACCESS_CODE` - Access code to register as an admin
- `REGION` - AWS region
- `BUCKET_NAME` - AWS S3 bucket name
- `ACCESS_KEY_ID` - AWS access key ID
- `SECRET_ACCESS_KEY` - AWS secret access key

## Frontend

6.  From terminal, navigate to the `frontend` directory
7.  Run `npm install --legacy-peer-deps`
8.  Run `npm run start`
9.  The frontend will be running on port 4200, and will automatically open in your browser
10. If the browser does not open automatically, you can navigate to `http://localhost:4200` in your browser to view the application. You can register as a new user or login with the following credentials:

    - Email: `customer@swagbag.com`
    - Password: `password`

11. [Optional] If you set the `.env` file in the `frontend` directory properly, and would like to test the admin functionality, you can register as a new admin or login with the following credentials:

    - Email: `admin@swagbag.com`
    - Password: `password`

Happy shopping with SwagBag :)

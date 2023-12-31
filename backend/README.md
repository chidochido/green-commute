# green-commute

## To deploy locally

in the backend directory, run:
& 'C:\Users\Mini_\.vscode\extensions\redhat.java-1.23.0-win32-x64\jre\17.0.8.1-win32-x86_64\bin\java.exe' '@C:\Users\Mini_\AppData\Local\Temp\cp_asejjr320tdagemgpoi36nx86.argfile' 'com.group5.greencommute.GreenCommuteApplication' 

and then it should be deployed on port 8080 (http://localhost:8080)

for any issues first check proper installation of maven and run:
mvn clean install -U


## for user data manipulation

the gcp url to use for carbon and database calls is:
https://project1cs3300.ue.r.appspot.com/

If you wanted to sign someone in (make sure you have "username" and "password" in the body):
[url]/api/user/login

If you wanted to sign someone up (make sure you have "username" and "password" in the body):
[url]/api/user/signup 

If you wanted to get all user's names run:
[url]/api/user/getAll

If you wanted to get a user's information run:
[url]/api/user/getUserDetails?name=[the username]

If you wanted to add a user, have information in the body (all parts of the user's information in a json file) and then run:
[url]/api/user/createUser

If you wanted to edit, include information (all parts of the user's information in a json file) then run:
[url]/api/user/updateUser?name=[the username]

If you wanted to delete a user run:
[url]/api/user/deleteUser?name=[the username]

for example:
Post
http://localhost:8080/api/user/createUser
Delete
http://localhost:8080/api/user/deleteUser?name=nemo


## for carbon emission calculations

To get the carbon emissions of a gas car:
[url]/emissionCalc/gas-car?distance=[distance in miles]&passengers=[number of passengers]

To get the carbon emissions of an electric car:
[url]/emissionCalc/electric-car?distance=[distance in miles]&passengers=[number of passengers]

To get the carbon emissions of an electric scooter:
[url]/emissionCalc/electric-scooter?distance=[distance in miles]

To get the carbon emissions of public transportation:
[url]/emissionCalc/public-transport?distance=[distance in miles]&passengers=[number of passengers]

Example 1:
http://localhost:8080/emissionCalc/gas-car?distance=2&passengers=3
    - calculates the carbon emissions for a gas car that takes 3 people 2 miles

Example 2:
http://localhost:8080/emissionCalc/electric-scooter?distance=6
    - calculates the carbon emissions for an electric scooter that goes 6 miles

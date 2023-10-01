This program is connected to the database in google cloud using the json file.

If you wanted to get a user's information run:
http://localhost:8080/users/getUserDetails?name=[the username]

If you wanted to add a user, have information in the body (all parts of the user's information in a json file) and then run:
http://localhost:8080/users/createUser

If you wanted to edit, include information (all parts of the user's information in a json file) then run:
http://localhost:8080/users/updateUser?name=[the username]

If you wanted to delete a user run:
http://localhost:8080/users/deleteUser?name=[the username]

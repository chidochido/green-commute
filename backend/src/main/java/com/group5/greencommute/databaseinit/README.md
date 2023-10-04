DataBase Information:
This program is connected to the database in google cloud using the json file.

If you wanted to add/delete/update/get using code use the functions in UserService(they are connected to the database)

Codes after //// are the added database codes

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
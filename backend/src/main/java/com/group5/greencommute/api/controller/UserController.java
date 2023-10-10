package com.group5.greencommute.api.controller;

import com.group5.greencommute.api.model.User;
import com.group5.greencommute.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping()
    public ResponseEntity<User> getUser(@RequestParam Integer id) {
        User user =  userService.getUser(id);
        return user == null ? new ResponseEntity<>(null, HttpStatus.NOT_FOUND) : new ResponseEntity<>(user, HttpStatus.OK);
    }

    /////
    @GetMapping("/getAll")
    public String getAllUsers() {
        List<User> currUserList = userService.getUserList();
        String users = "";
        for (User curr: currUserList){
            users = users + curr.getName() + "\n";
        }
        return users;
    }

    @GetMapping("/getUserDetails")
    public User getUser(@RequestParam String name ) throws InterruptedException, ExecutionException{
        return userService.getUserDetails(name);
    }

    @PostMapping("/createUser")
    public String createUser(@RequestBody User user ) throws InterruptedException, ExecutionException {
        return userService.saveUserDetails(user);
    }
    @PutMapping("/updateUser")
    public String updateUser(@RequestParam String name, @RequestBody User user  ) throws InterruptedException, ExecutionException {
        return userService.updateUserDetails(name,user);
    }

    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestParam String name){
        return userService.deleteUser(name);
    }
}

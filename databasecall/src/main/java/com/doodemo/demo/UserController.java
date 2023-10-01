package com.doodemo.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users/getUserDetails")
    public User getUser(@RequestParam String name ) throws InterruptedException, ExecutionException{
        return userService.getUserDetails(name);
    }

    @PostMapping("/users/createUser")
    public String createUser(@RequestBody User user ) throws InterruptedException, ExecutionException {
        return userService.saveUserDetails(user);
    }
    @PutMapping("/users/updateUser")
    public String updateUser(@RequestParam String name, @RequestBody User user  ) throws InterruptedException, ExecutionException {
        return userService.updateUserDetails(name,user);
    }

    @DeleteMapping("/users/deleteUser")
    public String deleteUser(@RequestParam String name){
        return userService.deleteUser(name);
    }
}

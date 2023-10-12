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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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


    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp (@RequestBody Map<String, String> userDetails) throws InterruptedException, ExecutionException {
        Map<String, Object> res = new HashMap<>();


        if (userService.getUserDetails(userDetails.get("username")) != null) {
            res.put("message", "user already exists");
            return new ResponseEntity<>(res, HttpStatus.CONFLICT);
        } else {
            User user = new User();
            user.setName(userDetails.get("username"));
            user.setPwd(userDetails.get("password"));
            user.setEmail(userDetails.get("email"));
            userService.saveUserDetails(user);
            res.put("message", "created user successfully");
            return new ResponseEntity<>(res, HttpStatus.CONFLICT);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> logIn (@RequestBody Map<String, String> userDetails)  throws InterruptedException, ExecutionException {
        Map<String, Object> res = new HashMap<>();

        User user = userService.getUserDetails(userDetails.get("username")); // need to verify getUserDetails works together

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (userDetails.get("password") == null || user.getPwd() == null) {
            res.put("message", "password null");
            return new ResponseEntity<>(res, HttpStatus.UNAUTHORIZED);
        } else if (!user.getPwd().equals(userDetails.get("password"))) {
            res.put("message", "password incorrect");
            return new ResponseEntity<>(res, HttpStatus.UNAUTHORIZED);
        } else if (user.getPwd().equals(userDetails.get("password"))) {
            res.put("id", user.getId());
            res.put("username", user.getName());
            res.put("password", user.getPwd());
            res.put("email", user.getEmail());
            res.put("score", user.getScore());
            return new ResponseEntity<>(res, HttpStatus.UNAUTHORIZED);
        } else {
            res.put("message", "unknown server error");
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

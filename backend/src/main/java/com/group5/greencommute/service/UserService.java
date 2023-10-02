package com.group5.greencommute.service;

import com.group5.greencommute.api.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService {

    private List<User> userList;
    public UserService() {
        userList = new ArrayList<>();

        User user1 = new User(1, "Chido", "chido@chido.com");
        User user2 = new User(2, "Harsha", "harsha@harsha.com");
        User user3 = new User(3, "Zach", "zach@zach.com");
        User user4 = new User(4, "Mohammed", "mohammed@mohammed.com");
        User user5 = new User(5, "Roham", "roham@roham.com");

        userList.addAll(Arrays.asList(user1, user2, user3, user4, user5));
    }

    public User getUser(Integer id) {
        for (User user: userList) {
            if (id == user.getId()) {
                return user;
            }
        }
        return null;
    }
}

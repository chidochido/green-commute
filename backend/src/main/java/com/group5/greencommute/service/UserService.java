package com.group5.greencommute.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.group5.greencommute.api.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {
    private List<User> userList;
    public UserService() {
        userList = new ArrayList<>();

        User user1 = new User(1, "Chido", "chido@chido.com","123");
        User user2 = new User(2, "Harsha", "harsha@harsha.com","123");
        User user3 = new User(3, "Zach", "zach@zach.com","123");
        User user4 = new User(4, "Mohammed", "mohammed@mohammed.com","123");
        User user5 = new User(5, "Roham", "roham@roham.com","123");

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

/////
    public static final String COL_NAME="users";

    public String saveUserDetails(User user) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(user.getName()).set(user);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public User getUserDetails(String username) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(username);
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        User user = null;

        if(document.exists()) {
            user = document.toObject(User.class);
            return user;
        }else {
            return null;
        }
    }

    public String updateUserDetails(String name, User user) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection(COL_NAME).document(name).delete();
        dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(user.getName()).set(user);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String deleteUser(String name) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COL_NAME).document(name).delete();
        return "Document with User ID "+name+" has been deleted";
    }

    public List<User> getUserList() {
        return userList;
    }

}

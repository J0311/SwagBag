package com.revature.services;

import com.revature.models.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }

    /**
     * Returns the user with the given username if it exists in the database.
     *
     * @param email    - the email of the user to retrieve
     * @param password - the password of the user to retrieve
     * @return an optional containing the user with the given email and password if
     */
    public Optional<User> findByCredentials(String email, String password) {
        return userService.findByCredentials(email, password);
    }

    /**
     * Saves the given user to the database.
     *
     * @param user - the user to save
     * @return the saved user
     */
    public User register(User user) {
        return userService.save(user);
    }
}

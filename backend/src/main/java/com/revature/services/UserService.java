package com.revature.services;

import com.revature.models.User;
import com.revature.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Returns the user with the given username and password if it exists in the
     * database.
     *
     * @param email    - the email of the user to retrieve
     * @param password - the password of the user to retrieve
     * @return an optional containing the user with the given email and password if
     *         it exists, otherwise an empty optional
     */
    public Optional<User> findByCredentials(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    /**
     * Saves the given user to the database.
     *
     * @param user - the user to save
     * @return the saved user
     */
    public User save(User user) {
        return userRepository.save(user);
    }

    /**
     * Returns the user with the given id if it exists in the database.
     *
     * @param userId - the id of the user to retrieve
     * @return an optional containing the user with the given id if it exists
     */
    public Optional<User> findById(int userId) {
        return userRepository.findById(userId);
    }
}

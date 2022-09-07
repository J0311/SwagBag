package com.revature.repositories;

import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Returns the user with the given username if it exists in the database.
     *
     * @param email    - the email of the user to retrieve
     * @param password - the password of the user to retrieve
     * @return an optional containing the user with the given email and password if
     *         it exists, otherwise an empty optional
     */
    Optional<User> findByEmailAndPassword(String email, String password);
}

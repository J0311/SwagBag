package com.revature.repositories;

import com.revature.models.User;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ContextConfiguration;

import static org.junit.jupiter.api.Assertions.*;

@ContextConfiguration(classes = { UserRepository.class })
@EnableAutoConfiguration
@EntityScan(basePackages = { "com.revature.models" })
@DataJpaTest(properties = { "spring.main.allow-bean-definition-overriding=true" })
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeAll
    public void setup() {
        user = new User(1, "test@email.com", "secret", "first", "last");
        userRepository.save(user);
    }

    @Test
    public void testFindByEmailAndPassword() {
        User retrievedUser = (userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword())).get();

        assertNotNull(retrievedUser);
        assertEquals(1, retrievedUser.getId());
        assertEquals("test@email.com", retrievedUser.getEmail());
        assertEquals("secret", retrievedUser.getPassword());
        assertEquals("first", retrievedUser.getFirstName());
        assertEquals("last", retrievedUser.getLastName());
    }

    @Test
    public void testFindByEmailAndPasswordIncorrectPassword() {
        User retrievedUser = (userRepository.findByEmailAndPassword(user.getEmail(), "IncorrectPassword")).orElse(null);
        assertNull(retrievedUser);
    }
}

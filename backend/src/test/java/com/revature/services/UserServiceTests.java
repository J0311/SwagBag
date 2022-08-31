package com.revature.services;

import com.revature.models.User;
import com.revature.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyInt;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.verify;

@ContextConfiguration(classes = { UserService.class })
@ExtendWith(SpringExtension.class)
public class UserServiceTests {
    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    User user;

    @BeforeEach
    public void setup() {
        user = new User(1,"test@email.com","secret","first","last");
    }

    @Test
    public void testSave() {
        Mockito.when(userRepository.save(any())).thenReturn(user);
        User savedUser = userService.save(user);
        assertEquals(user.getId(), savedUser.getId());
        verify(userRepository).save(user);
    }

    @Test
    public void testFindByCredentials() {
        Optional<User> optionalUser = Optional.ofNullable(user);
        Mockito.when(userRepository.findByEmailAndPassword(anyString(), anyString())).thenReturn(optionalUser);
        User retrievedUser = userService.findByCredentials("test@email.com", "secret").get();

        assertEquals(user.getId(), retrievedUser.getId());
        assertEquals(user.getEmail(), retrievedUser.getEmail());
        assertEquals(user.getPassword(), retrievedUser.getPassword());
        verify(userRepository).findByEmailAndPassword(anyString(), anyString());
    }

    @Test
    public void testFindById() {
        Optional<User> optionalUser = Optional.ofNullable(user);
        Mockito.when(userRepository.findById(anyInt())).thenReturn(optionalUser);
        User retrievedUser = userService.findById(1).get();

        assertEquals(user.getId(), retrievedUser.getId());
        assertEquals(user.getEmail(), retrievedUser.getEmail());
        assertEquals(user.getPassword(), retrievedUser.getPassword());
        verify(userRepository).findById(anyInt());
    }

}

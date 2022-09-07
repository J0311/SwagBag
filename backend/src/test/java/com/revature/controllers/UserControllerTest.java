package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.dtos.ChangePasswordRequest;
import com.revature.models.User;
import com.revature.services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.anyString;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(UserController.class)
@ExtendWith(SpringExtension.class)
public class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    UserService userService;

    @Test
    public void testChangePassword() throws Exception {
        User user = new User(1, "test@email.com", "secret", "first", "last", "CUSTOMER");
        String oldPassword = "secret";
        String newPassword = "newPassword123";
        ChangePasswordRequest changePasswordRequest = new ChangePasswordRequest(oldPassword, newPassword);
        String content = (new ObjectMapper()).writeValueAsString(changePasswordRequest);

        Mockito.when(userService.findByCredentials(anyString(), anyString())).thenReturn(Optional.of(user));
        Mockito.when(userService.save(any())).thenReturn(user);

        mockMvc.perform(
                MockMvcRequestBuilders.patch("/api/user/change-password")
                        .sessionAttr("user", user)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk())
                // .andExpect(MockMvcResultMatchers.status().isNoContent());
                .andExpect(content().contentType("application/json"))
                .andExpect(content().string(containsString("newPassword123")));
    }
}

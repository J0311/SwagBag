package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.dtos.ChangePasswordRequest;
import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = { "http://localhost:4200",
        "http://swagbag.us-east-1.elasticbeanstalk.com" }, allowCredentials = "true")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Changes the password of the user.
     *
     * @param changePasswordRequest - the change password request object
     * @param request               - the request object that will be used to get
     *                              the user's information from the session
     * @return ResponseEntity<User> with status code 200 if successful
     */
    @Authorized
    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest,
            HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("user") == null) {
            return ResponseEntity.badRequest().body("You must be logged in to perform this action");
        }
        User user = (User) session.getAttribute("user");
        String oldPassword = changePasswordRequest.getOldPassword();
        String newPassword = changePasswordRequest.getNewPassword();

        // Check if oldPassword matches the user's current password
        if (!(userService.findByCredentials(user.getEmail(), oldPassword).isPresent())) {
            return ResponseEntity.badRequest().body("Your current password was not found. Please try again.");
        }

        // Set the User password to the new password and save
        user.setPassword(newPassword);
        return ResponseEntity.ok(userService.save(user));
    }
}
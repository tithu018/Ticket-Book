package com.tithu.ticketbook.payment;

import com.tithu.ticketbook.user.User;
import com.tithu.ticketbook.user.UserService;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Purpose: Exposes payment endpoints for paying or confirming bookings.
 */
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;

    public PaymentController(PaymentService paymentService, UserService userService) {
        this.paymentService = paymentService;
        this.userService = userService;
    }

    @PostMapping
    public PaymentResponse confirmPayment(@Valid @RequestBody PaymentRequest request, Principal principal) {
        User user = userService.getByEmail(principal.getName());
        return paymentService.confirmPayment(user, request);
    }
}

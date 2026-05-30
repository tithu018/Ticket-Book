package com.tithu.ticketbook.payment;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Purpose: Handles database access for payment records.
 */
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}


package com.cdac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/billing")
public class BillingController {


@GetMapping("/test")
@PreAuthorize("hasAuthority('BILLING_STAFF')")
public String billingTest() {

    return "Welcome Billing Staff";
}


}

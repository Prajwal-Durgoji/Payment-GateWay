package com.nadifit.payment.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonController {
	
	@GetMapping("/")
	public String loadHome() {
		return "Home.html";
	}
	
	@GetMapping("/payment")
	public String loadPayment() {
		return "Payment.html";
	}

}

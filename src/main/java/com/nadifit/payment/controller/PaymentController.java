package com.nadifit.payment.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Controller
@RequestMapping("/user")
public class PaymentController {

	@PostMapping("/payment")
	public String loadPayment() {
		return "Payment.html";
	}
	
	@PostMapping("/create_order")
	public ResponseEntity<String> createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
		int amt = Integer.parseInt(data.get("amount").toString());
		var client = new RazorpayClient("rzp_test_JNKcICN4Oy0LtT", "4zGxhSPHDjrSlFZu3zkviLhY");
		
		JSONObject ob = new JSONObject();
		ob.put("amount", amt*100);
		ob.put("currency", "INR");
		ob.put("receipt", "txn_123456");
		
		Order order = client.orders.create(ob);		
		return ResponseEntity.ok(order.toString());
	}
	
	

}

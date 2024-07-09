
const paymentStart = () => {
	console.log('payment started');
	let amount = $("#payment_field").val();
	console.log(amount);
	
	if (amount == '' || amount == null) {
		/*alert('Amount is required');*/
		swal("Failed!", "Amount is required", "error");
		return;
	}
	
	// we will send the amount to the backend
	$.ajax(
		{
			url: '/user/create_order',
			data: JSON.stringify({amount: amount, info: 'order_request'}),
			contentType: 'application/json',
			type: 'POST',
			dataType: 'json',
			success: function(response){
				console.log(response);
				
				if(response.status == "created"){
					let options = {
						key: 'rzp_test_JNKcICN4Oy0LtT',
						amount: response.amount,
						currency: 'INR',
						name: 'Nadifit Health Care',
						description: 'Donation',
						image: 'https://www.thesparksfoundationsingapore.org/images/logo_small.png',
						order_id: response.id,
						handler: function(response) {
							console.log(response.razorpay_payment_id);
							console.log(response.razorpay_order_id);
							console.log(response.razorpay_signature);
							console.log('Payment successful');
							/*alert('Payment successful');*/
							swal("Good job!", "Congrats Payment Successful", "success");
						},
						prefill: {
							name: '',
							/*email: '',*/
							contact: ''
						},
						notes: {
							address: 'Nadifit Health Care'
						},
						theme: {
							color: '#3399cc'
						}
					};
					let rzp = new Razorpay(options);
					rzp.on('payment.failed', function(response) {
						console.log(response.error.code);
						console.log(response.error.description);
						console.log(response.error.source);
						console.log(response.error.step);
						console.log(response.error.reason);
						console.log(response.error.metadata.order_id);
						console.log(response.error.metadata.payment_id);
						/*alert('Payment failed');*/
						swal("Failed!", "Oops Payment Failed", "error");
					});
					rzp.open();
				}
				
			},
			error: function(error) {
				console.log(error);
				alert('Something went wrong');
			}
		}
	)
}
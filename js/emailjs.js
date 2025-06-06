
function sendemail(){

	var email=document.getElementById("email").value;
	var to_name=document.getElementById("name").value;
    var subject =document.getElementById("subject").value;
	var message=document.getElementById("message").value;

	var templateParams = {
        email: email,
        name: to_name,
        subject:subject,
		message: message
      };

      emailjs.send('service_zw2t1n8', 'template_m77xzzf', templateParams)
  .then(function(response) {
     console.log('SUCCESS!', response.status, response.text);
     window.alert("Sent successfully!");
     
  })

     
}
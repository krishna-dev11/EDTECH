const emailTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html lang="en">
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification</title>
		<style>
			body {
				margin: 0;
				padding: 0;
				background: linear-gradient(to right, #f2f4f8, #e8ebf0);
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				color: #2d3748;
			}
	
			.container {
				max-width: 600px;
				margin: 40px auto;
				background-color: #ffffff;
				box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
				border-radius: 12px;
				padding: 40px 50px;
				text-align: center;
			}
	
			.logo {
				max-width: 120px;
				margin-bottom: 30px;
			}
	
			.heading {
				font-size: 24px;
				font-weight: 700;
				color: #1a202c;
				margin-bottom: 25px;
			}
	
			.body {
				font-size: 16px;
				line-height: 1.7;
				text-align: left;
				color: #4a5568;
			}
	
			.otp-box {
				background-color: #FFD60A;
				color: #000000;
				display: inline-block;
				padding: 12px 30px;
				font-size: 24px;
				font-weight: bold;
				border-radius: 8px;
				margin: 25px 0;
				letter-spacing: 4px;
			}
	
			.footer {
				font-size: 14px;
				color: #718096;
				text-align: center;
				margin-top: 40px;
				line-height: 1.5;
			}

			a {
				color: #1a73e8;
				text-decoration: none;
			}
		</style>
	</head>
	
	<body>
		<div class="container">
			<a href="https://studynotion-edtech-project.vercel.app">
				<img class="logo" src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600" alt="StudyNotion Logo">
			</a>
	
			<div class="heading">🔐 OTP Verification</div>
	
			<div class="body">
				<p>Dear User,</p>
				<p>Thanks for signing up with <strong>StudyNotion</strong>! To complete your registration, use the OTP below:</p>
				
				<div class="otp-box">${otp}</div>
	
				<p>This OTP is valid for the next <strong>5 minutes</strong>.</p>
				<p>If you didn’t initiate this request, please ignore this email. Otherwise, verify now to start your learning journey.</p>
			</div>
	
			<div class="footer">
				Need help or have questions?<br>
				Contact us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We're always here to assist you!
			</div>
		</div>
	</body>
	
	</html>`;
};

module.exports = emailTemplate;

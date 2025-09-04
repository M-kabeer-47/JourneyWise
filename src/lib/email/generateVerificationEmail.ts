export const generateVerificationEmailHTML = (url: string, userName: string = "Traveler") => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - JourneyWise</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Raleway', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f8fafc;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            border-radius: 16px;
            overflow: hidden;
        }
        
        .header {
            background-color: #003C7D;
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="white" opacity="0.1"/><circle cx="80" cy="40" r="1" fill="white" opacity="0.1"/><circle cx="40" cy="80" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
            opacity: 0.3;
        }
        
        .logo-section {
            position: relative;
            z-index: 1;
        }
        
        .logo {
            font-family: 'Raleway', sans-serif;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        
        .tagline {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .content {
            padding: 50px 40px;
            text-align: center;
        }
        
        .main-title {
            font-size: 28px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 16px;
            line-height: 1.3;
        }
        
        .subtitle {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 35px;
            line-height: 1.5;
        }
        
        .cta-button {
            display: inline-block;
            background-color: #003C7D;
            color: white !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 8px 25px rgba(0, 60, 125, 0.3);
            transition: all 0.3s ease;
            margin-bottom: 30px;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(0, 60, 125, 0.4);
            background-color: #002a5c;
        }
        
        .features {
            display: flex;
            justify-content: space-around;
            margin: 40px 0;
            padding: 0 20px;
        }
        
        .feature {
            text-align: center;
            flex: 1;
            margin: 0 10px;
        }
        
        .feature-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
            border-radius: 50%;
            margin: 0 auto 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .feature-icon svg {
            width: 24px;
            height: 24px;
            color: #003C7D;
        }
        
        .feature-title {
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 4px;
        }
        
        .feature-desc {
            font-size: 12px;
            color: #6b7280;
            line-height: 1.4;
        }
        
        .footer {
            background: #f8fafc;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        
        .footer-text {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 16px;
        }
        
        .copyright {
            font-size: 12px;
            color: #9ca3af;
        }
        
        .security-note {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 8px;
            padding: 16px;
            margin: 30px 0;
            text-align: left;
        }
        
        .security-note strong {
            color: #92400e;
            font-weight: 600;
        }
        
        .security-note p {
            font-size: 14px;
            color: #92400e;
            margin: 0;
        }
        
        .link-text {
            font-size: 12px;
            color: #6b7280;
            margin-top: 20px;
            word-break: break-all;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 12px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .content {
                padding: 40px 20px;
            }
            
            .main-title {
                font-size: 24px;
            }
            
            .features {
                flex-direction: column;
                gap: 20px;
            }
            
            .feature {
                margin: 0;
            }
            
            .footer {
                padding: 25px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo-section">
                <div class="logo">🌍 JourneyWise</div>
                <div class="tagline">Your Gateway to Amazing Adventures</div>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <h1 class="main-title">Welcome to JourneyWise, ${userName}!</h1>
            <p class="subtitle">
                You're just one click away from unlocking a world of travel possibilities. 
                Verify your email to start planning your next adventure.
            </p>
            
            <a href="${url}" class="cta-button">
                ✨ Verify My Email Address
            </a>
            
            <!-- Features -->
            <div class="features">
                <div class="feature">
                    <div class="feature-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                    <div class="feature-title">Discover</div>
                    <div class="feature-desc">Explore amazing destinations</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                    </div>
                    <div class="feature-title">Connect</div>
                    <div class="feature-desc">Meet expert travel agents</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <div class="feature-title">Save</div>
                    <div class="feature-desc">Organize your dream trips</div>
                </div>
            </div>
            
            <!-- Security Note -->
            <div class="security-note">
                <p><strong>🔒 Security Note:</strong> This verification link will expire in 24 hours. If you didn't create an account with JourneyWise, please ignore this email.</p>
            </div>
            
            <div class="link-text">
                <p><strong>Having trouble with the button?</strong> Copy and paste this link into your browser:</p>
                <p style="color: #003C7D; margin-top: 8px;">${url}</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">Thanks for joining our community of adventurous travelers!</p>
            <p class="copyright">© 2024 JourneyWise. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};

// OTP Email Template
export const generateOTPEmailHTML = (otp: string, userName: string = "Traveler") => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Security Code - JourneyWise</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Raleway', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f8fafc;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            border-radius: 16px;
            overflow: hidden;
        }
        
        .header {
            background-color: #003C7D;
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        
        .logo {
            font-family: 'Raleway', sans-serif;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .tagline {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .content {
            padding: 50px 40px;
            text-align: center;
        }
        
        .main-title {
            font-size: 28px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 16px;
        }
        
        .subtitle {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 35px;
        }
        
        .otp-container {
            background: #f8fafc;
            border: 2px solid #003C7D;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
        }
        
        .otp-code {
            font-size: 36px;
            font-weight: 700;
            color: #003C7D;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
        }
        
        .otp-label {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 15px;
            font-weight: 500;
        }
        
        .security-note {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 8px;
            padding: 16px;
            margin: 30px 0;
            text-align: left;
        }
        
        .security-note strong {
            color: #92400e;
            font-weight: 600;
        }
        
        .security-note p {
            font-size: 14px;
            color: #92400e;
            margin: 0;
        }
        
        .footer {
            background: #f8fafc;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        
        .footer-text {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 16px;
        }
        
        .copyright {
            font-size: 12px;
            color: #9ca3af;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
            }
            
            .header, .content, .footer {
                padding: 30px 20px;
            }
            
            .main-title {
                font-size: 24px;
            }
            
            .otp-code {
                font-size: 28px;
                letter-spacing: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">🌍 JourneyWise</div>
            <div class="tagline">Your Gateway to Amazing Adventures</div>
        </div>
        
        <div class="content">
            <h1 class="main-title">Security Code for ${userName}</h1>
            <p class="subtitle">
                Use this code to complete your two-factor authentication and secure your account.
            </p>
            
            <div class="otp-container">
                <div class="otp-label">Your Security Code</div>
                <div class="otp-code">${otp}</div>
            </div>
            
            <div class="security-note">
                <p><strong>🔒 Security Note:</strong> This code will expire in 10 minutes. Do not share it with anyone. If you didn't request this code, please contact our support team immediately.</p>
            </div>
        </div>
        
        <div class="footer">
            <p class="footer-text">Thanks for keeping your JourneyWise account secure!</p>
            <p class="copyright">© 2024 JourneyWise. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};

// Reset Password Email Template
export const generateResetPasswordEmailHTML = (url: string, userName: string = "Traveler") => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - JourneyWise</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Raleway', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f8fafc;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            border-radius: 16px;
            overflow: hidden;
        }
        
        .header {
            background-color: #003C7D;
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        
        .logo {
            font-family: 'Raleway', sans-serif;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .tagline {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .content {
            padding: 50px 40px;
            text-align: center;
        }
        
        .main-title {
            font-size: 28px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 16px;
        }
        
        .subtitle {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 35px;
        }
        
        .cta-button {
            display: inline-block;
            background-color: #003C7D;
            color: white !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 8px 25px rgba(0, 60, 125, 0.3);
            transition: all 0.3s ease;
            margin-bottom: 30px;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(0, 60, 125, 0.4);
            background-color: #002a5c;
        }
        
        .info-box {
            background: #f0f9ff;
            border-left: 4px solid #003C7D;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
            text-align: left;
        }
        
        .info-box h3 {
            color: #003C7D;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .info-box p {
            font-size: 14px;
            color: #374151;
            margin: 0;
        }
        
        .security-note {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 8px;
            padding: 16px;
            margin: 30px 0;
            text-align: left;
        }
        
        .security-note strong {
            color: #92400e;
            font-weight: 600;
        }
        
        .security-note p {
            font-size: 14px;
            color: #92400e;
            margin: 0;
        }
        
        .link-text {
            font-size: 12px;
            color: #6b7280;
            margin-top: 20px;
            word-break: break-all;
        }
        
        .footer {
            background: #f8fafc;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        
        .footer-text {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 16px;
        }
        
        .copyright {
            font-size: 12px;
            color: #9ca3af;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
            }
            
            .header, .content, .footer {
                padding: 30px 20px;
            }
            
            .main-title {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">🌍 JourneyWise</div>
            <div class="tagline">Your Gateway to Amazing Adventures</div>
        </div>
        
        <div class="content">
            <h1 class="main-title">Reset Password for ${userName}</h1>
            <p class="subtitle">
                We received a request to reset your password. Click the button below to create a new password for your JourneyWise account.
            </p>
            
            <a href="${url}" class="cta-button">
                🔑 Reset My Password
            </a>
            
            <div class="info-box">
                <h3>What happens next?</h3>
                <p>After clicking the button, you'll be redirected to a secure page where you can create a new password. Make sure to choose a strong password that you haven't used before.</p>
            </div>
            
            <div class="security-note">
                <p><strong>🔒 Security Note:</strong> This password reset link will expire in 1 hour. If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.</p>
            </div>
            
            <div class="link-text">
                <p><strong>Having trouble with the button?</strong> Copy and paste this link into your browser:</p>
                <p style="color: #003C7D; margin-top: 8px;">${url}</p>
            </div>
        </div>
        
        <div class="footer">
            <p class="footer-text">Thanks for keeping your JourneyWise account secure!</p>
            <p class="copyright">© 2024 JourneyWise. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};
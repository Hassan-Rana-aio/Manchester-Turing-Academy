"""To send emails"""

""" Importing Email Modules """
import threading
import requests
from src.apis.v1.core.project_settings import settings

proj_settings = settings()

## Brevo transactional email HTTP API (sends over HTTPS / port 443, which the
## host does not block - unlike outbound SMTP ports 25/465/587/2525)
BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"

## seconds before a slow/unreachable email service gives up (avoids hanging requests)
EMAIL_TIMEOUT = 15


def _send_in_background(subject, body, recipients):
    """Fire-and-forget email send on a daemon thread so the HTTP
    request returns immediately and is never blocked by a slow or
    unreachable mail server."""
    threading.Thread(
        target=send_email,
        kwargs={"subject": subject, "body": body, "recipients": recipients},
        daemon=True,
    ).start()


def otp_email(otp, user_email):
    mail_sub = "Password Reset OTP - Manchester Turing Academy"
    mail_body = f"""Dear Valuable User,\nYou have recently requested to reset your password for your Manchester Turing Academy account. To proceed with the password reset, please use the following one-time password (OTP):\nOTP = {otp}\nPlease note that this OTP is valid for the next 30 minutes only. After that, it will expire for security reasons.\nRemember: Never share your OTP with anyone\nIf you have not requested please contact our support team\nBest Regards,\nManchester Turing Academy"""
    proj_settings.LOG_MANAGER.log("info", f"Sending OTP email to {user_email}")
    _send_in_background(subject=mail_sub, body=mail_body, recipients=user_email)


def welcome_email(user_email, user_name):
    mail_sub = "Welcome to Manchester Turing Academy!"
    mail_body = f"""Dear {user_name},\nWelcome abroad! We are thrilled to have you join Manchester Turing Academy.\nFeel free to explore our platform and make the most out of your learning experience.\nIf you have any questions or need assistance, don't hesitate to reach out to us. We're here to help you succeed!\nOnce again, welcome abroad!\nBest Regards,\nManchester Turing Academy
    """
    proj_settings.LOG_MANAGER.log("info", f"Sending Welcome email to {user_email}")
    _send_in_background(subject=mail_sub, body=mail_body, recipients=user_email)


def course_assignment_email(user_email, user_name, course_name, course_price):
    mail_sub = "Your Course Purchase Confirmation from Manchester Turing Academy"
    mail_body = f"""Dear {user_name},\nThank you for purchasing the course "{course_name}" from Manchester Turing Academy. The total price is {course_price}.\nIf you did not make this purchase, please contact our support team.\nBest Regards,\nManchester Turing Academy"""
    proj_settings.LOG_MANAGER.log(
        "info", f"Sending Course purchasing email to {user_email}"
    )
    _send_in_background(subject=mail_sub, body=mail_body, recipients=user_email)


def send_email(subject, body, recipients):
    """Send an email via the Brevo HTTP API over HTTPS.

    `recipients` may be a single email string or a list of email strings.
    Returns True on success, False on failure (failures are logged, never raised).
    """
    api_key = proj_settings.EMAIL_API_KEY
    sender_email = proj_settings.ADMIN_EMAIL
    sender_name = proj_settings.PROJECT_NAME

    if not api_key:
        proj_settings.LOG_MANAGER.log(
            "error", "EMAIL_API_KEY is not configured - cannot send email"
        )
        return False

    ## normalize recipients to Brevo's expected format
    recipient_list = recipients if isinstance(recipients, list) else [recipients]
    to = [{"email": email} for email in recipient_list]

    payload = {
        "sender": {"name": sender_name, "email": sender_email},
        "to": to,
        "subject": subject,
        "textContent": body,
    }
    headers = {
        "api-key": api_key,
        "Content-Type": "application/json",
        "accept": "application/json",
    }

    try:
        proj_settings.LOG_MANAGER.log("info", f"Sending email to {recipient_list}")
        response = requests.post(
            BREVO_API_URL, json=payload, headers=headers, timeout=EMAIL_TIMEOUT
        )
        if response.status_code in (200, 201):
            proj_settings.LOG_MANAGER.log("info", "Email sent!")
            return True

        proj_settings.LOG_MANAGER.log(
            "error",
            f"Email sending failed: HTTP {response.status_code} - {response.text}",
        )
        return False

    except Exception as e:
        proj_settings.LOG_MANAGER.log(
            "error", f"Email sending failed with an exception {e}"
        )
        return False

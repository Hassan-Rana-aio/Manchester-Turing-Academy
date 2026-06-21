"""To send emails"""

""" Importing Email Modules """
import smtplib
import threading
from email.mime.text import MIMEText
from src.apis.v1.core.project_settings import settings

proj_settings = settings()

## seconds before an unreachable mail server gives up (avoids hanging requests)
SMTP_TIMEOUT = 15


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
    SERVER_NAME = (
        "mail.manchesterturingacademy.co.uk"  # proj_settings.EMAIL_SERVER_NAME
    )
    PORT = 587  # proj_settings.EMAIL_SERVER_PORT
    sender = "admin@manchesterturingacademy.co.uk"  # proj_settings.ADMIN_EMAIL
    password = "Books654*+B"  # proj_settings.ADMIN_EMAIL_PASSWORD
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = ", ".join(recipients) if isinstance(recipients, list) else recipients
    try:
        proj_settings.LOG_MANAGER.log("info", f"Connecting to Server {SERVER_NAME}")
        with smtplib.SMTP(SERVER_NAME, PORT, timeout=SMTP_TIMEOUT) as smtp_server:
            smtp_server.starttls()
            proj_settings.LOG_MANAGER.log(
                "info", f"Logging in with admin email {sender}"
            )
            smtp_server.login(sender, password)
            proj_settings.LOG_MANAGER.log("info", "Email Logging in successful")

            proj_settings.LOG_MANAGER.log("info", "Sending Email")
            smtp_server.sendmail(sender, recipients, msg.as_string())
            proj_settings.LOG_MANAGER.log("info", "Email sent!")

    except Exception as e:
        proj_settings.LOG_MANAGER.log(
            "info", f"Email sending failed with an exception {e}"
        )
        return False

    return True

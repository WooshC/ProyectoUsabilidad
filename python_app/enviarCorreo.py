from flask import Flask, request, jsonify
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

app = Flask(__name__)

SCOPES = ['https://www.googleapis.com/auth/gmail.send']
creds = None

def send_email_with_attachment(to, subject, image_base64):
    msg = MIMEMultipart()
    msg['From'] = 'moisesisraelarequipam@gmail.com'
    msg['To'] = to
    msg['Subject'] = subject
    
    image_data = base64.b64decode(image_base64.split(',')[1])
    image_part = MIMEBase('application', 'octet-stream')
    image_part.set_payload(image_data)
    encoders.encode_base64(image_part)
    image_part.add_header('Content-Disposition', 'attachment', filename="image.png")
    msg.attach(image_part)
    
    service = build('gmail', 'v1', credentials=creds)
    raw_message = {'raw': base64.urlsafe_b64encode(msg.as_bytes()).decode()}
    message = service.users().messages().send(userId="me", body=raw_message).execute()

    return message

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    to_email = data['email']
    title = data['title']
    image_base64 = data['imageBase64']

    try:
        message = send_email_with_attachment(to_email, title, image_base64)
        return jsonify({'status': 'success', 'message': 'Email sent successfully!', 'data': message}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

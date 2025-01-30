from flask import Flask, render_template
from flask_socketio import SocketIO
import cv2
import mediapipe as mp
import threading

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)
cap = cv2.VideoCapture(0)  # Cámara

def process_camera():
    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        # Invertir imagen para que coincida con la perspectiva del usuario
        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Detección de manos
        result = hands.process(rgb_frame)

        if result.multi_hand_landmarks:
            for hand_landmarks in result.multi_hand_landmarks:
                # Coordenadas del índice (landmark 8)
                index_finger = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
                x = int(index_finger.x * 640)  # Escalar para el tamaño del canvas
                y = int(index_finger.y * 480)

                # Enviar coordenadas al cliente
                socketio.emit('hand_position', {'x': 200, 'y': y})

        # Mostrar cámara (opcional para depuración)
        cv2.imshow("Camera", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

threading.Thread(target=process_camera, daemon=True).start()

@app.route('/')
def index():
    return render_template('lienzo2.html')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)

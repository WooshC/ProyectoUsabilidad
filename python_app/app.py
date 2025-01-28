from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')  # Ruta para la página principal
def index():
    return render_template('index.html')  # Busca el archivo en la carpeta templates

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/resume")
def resume():
    return render_template("resume.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/download-resume")
def download_resume():
    return send_from_directory(
        os.path.join(app.root_path, "static", "files"),
        "Oscar_Tetteh_Resume.pdf",
        as_attachment=True
    )

if __name__ == "__main__":
    app.run(debug=True)

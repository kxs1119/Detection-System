
# Setting Up Virtual Environment and Flask

## 1. Create and Activate Virtual Environment

- Open a terminal in your project directory.

- Create the virtual environment:
  ```bash
  python3 -m venv env
  ```

- Activate the environment:
  - **macOS/Linux:** 
    ```bash
    source env/bin/activate
    ```
  - **Windows:** 
    ```bash
    env\Scripts\activate
    ```

## 2. Install Flask

Once the environment is activated, install Flask:
```bash
pip install Flask
```

## 3. Create a Basic Flask Application

In the project directory, create a file called `app.py` with the following content:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
```

## 4. Run the Flask Application

In the terminal, ensure you’re still in the virtual environment, then start the Flask app with:
```bash
python app.py
```

- Open a browser and go to `http://127.0.0.1:5000` to see the Flask app running.

## 5. Deactivate the Virtual Environment

When you're done, deactivate the environment by running:
```bash
deactivate
```

---

Follow these steps to set up and run Flask in a virtual environment easily!


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

## 3. Run the Flask Application

In the terminal, ensure you’re still in the virtual environment, then start the Flask app with:
```bash
python app.py
```

- Open a browser and go to `http://127.0.0.1:8080` or `http://localhost:8080` to see the Flask app running.

## 4. Activate the Expo Application

When you're done, run this command to start expo:
```bash
expo start -c
```

---

Follow these steps to set up and run Expo App

## 5. Deactivate the Virtual Environment

When you're done, deactivate the environment by running:
```bash
deactivate
```

---

Follow these steps to set up and run Flask in a virtual environment easily!



### **User Guide: Accessing PostgreSQL on Raspberry Pi**

This guide will help you connect to the PostgreSQL database on a Raspberry Pi.

#### 1. **Log in to the Raspberry Pi**
   - Use SSH to log into the Raspberry Pi, or open the terminal if you’re directly connected.
   - SSH example:
     ```bash
     ssh <your_username>@<raspberry_pi_ip>
     ```
   - Replace `<your_username>` with your Raspberry Pi username and `<raspberry_pi_ip>` with the Raspberry Pi’s IP address.

#### 2. **Connecting to PostgreSQL as Your User**
   - Once logged into the Raspberry Pi, you can connect to the PostgreSQL database as your PostgreSQL user (for example, `kenny`), not the default `postgres` admin.
   - Run the following command to connect to the database:
     ```bash
     psql -U <your_database_username> -d <database_name>
     ```
   - Replace `<your_database_username>` with your assigned PostgreSQL username (e.g., `postgres`), and `<database_name>` with the name of the database (e.g., `deersafe`).
   - Example:
     ```bash
     psql -U postgres -d deersafe
     ```
   - **Password Prompt**: Enter your PostgreSQL password when prompted. Once connected, you’ll be in the PostgreSQL command-line interface.

#### 3. **Basic PostgreSQL Commands for Users**
   - After connecting, here are some basic commands to get started:
     - **List all tables** in the database:
       ```sql
       \dt
       ```
     - **View data** from a table (replace `table_name` with the actual name):
       ```sql
       SELECT * FROM table_name;
       ```
     - **Check current user and connection info**:
       ```sql
       \conninfo
       ```
     - **Exit PostgreSQL**:
       ```sql
       \q
       ```

#### 4. **Optional: Connect Remotely**
   - If the `postgres` admin has configured PostgreSQL for remote access, you can connect from another machine using:
     ```bash
     psql -h <raspberry_pi_ip> -U <your_database_username> -d <database_name> -p 5432
     ```
   - Replace `<raspberry_pi_ip>`, `<your_database_username>`, and `<database_name>` with your specific details.
   - **Password Prompt**: Enter your PostgreSQL password when prompted.
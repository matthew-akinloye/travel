import json
import sqlite3

def sqlite_to_json(input_db_path, output_json_path):
    # Connect to the SQLite database
    connection = sqlite3.connect(input_db_path)
    cursor = connection.cursor()

    # Get a list of all table names in the SQLite database
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    table_names = [row[0] for row in cursor.fetchall()]

    data = {}

    for table_name in table_names:
        # Get the column names for the current table
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = [col[1] for col in cursor.fetchall()]

        # Fetch all rows from the table
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()

        # Convert the rows to a list of dictionaries (JSON-like format)
        table_data = []
        for row in rows:
            table_data.append(dict(zip(columns, row)))

        # Store the table data in the JSON object
        data[table_name] = table_data

    # Write the JSON data to the output file
    with open(output_json_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

    # Close the SQLite connection
    connection.close()

if __name__ == "__main__":
    # Replace 'input_store.db' with the path to your SQLite database file
    # Replace 'output_data.json' with the desired path for the output JSON file
    sqlite_to_json('store.db', 'output_data.json')

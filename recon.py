import json
import psycopg2

def insert_json_to_postgres(json_file_path, db_connection_params):
    with open(json_file_path, "r") as file:
        data = json.load(file)

    connection = psycopg2.connect(**db_connection_params)
    cursor = connection.cursor()

    for table_name, table_data in data.items():
        for entry in table_data:
            keys = entry.keys()
            values = [entry[key] for key in keys]
            columns = ", ".join(keys)
            placeholders = ", ".join(["%s" for _ in range(len(keys))])

            # Use double quotes to handle the reserved keyword "user"
            insert_query = f'INSERT INTO "{table_name}" ({columns}) VALUES ({placeholders})'
            cursor.execute(insert_query, values)

    connection.commit()
    cursor.close()
    connection.close()

if __name__ == "__main__":
    # Replace these parameters with your actual values
    json_file_path = "output_data.json"
    db_connection_params = {
        "dbname": "verceldb",
        "user": "default",
        "password": "sMjv1FmZ6Dnr",
        "host": "ep-falling-mouse-40250356-pooler.us-east-1.postgres.vercel-storage.com",
        "port": "5432"
    }

    insert_json_to_postgres(json_file_path, db_connection_params)

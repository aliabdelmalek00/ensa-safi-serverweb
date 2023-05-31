import mysql.connector
from datetime import date
import datetime

db = mysql.connector.connect(
    host="194.233.160.248",
    user="ali",
    passwd='ali00fF50.',
    database='ENSA'
)
# Create a cursor object
cursor = db.cursor()
# Create the table
create_table_query = """
CREATE TABLE IF NOT EXISTS Etudaints(
    id BIGINT not null AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    address VARCHAR(255),
    filier VARCHAR(255),
    dept VARCHAR(255),
    PRIMARY KEY (id)
)
"""
cursor.execute(create_table_query)

# Insert random data into the table
insert_data_query = """
INSERT INTO Etudaints (name, email, address, filier, dept)
VALUES (%s, %s, %s, %s, %s)
"""

data = [
    ('ALI Abdelmalek', 'Ali.abdelmalek@example.com', 'Errachidia', 'GTR', 'Informatique'),
    ('Yassine AAtiti', 'Yassine.aatiri@example.com', 'Casablanca', 'GTR', 'Informatique'),
    ('Sanae Bouarka', 'sanae.bouarka@example.com', 'Safi', 'GTR', 'Informatique'),
    ('Abdellah Benmessoud', 'Abdellah@example.com', 'Rabat', 'Indus', 'Indus'),
]

cursor.executemany(insert_data_query, data)

# Commit the changes to the database
db.commit()

# Close the cursor and the database connection
cursor.close()
db.close()

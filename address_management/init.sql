CREATE DATABASE IF NOT EXISTS address_management;
USE address_management;

-- Create table according to the Address entity schema
CREATE TABLE IF NOT EXISTS address (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    add_line1 VARCHAR(255) NOT NULL,
    add_line2 VARCHAR(255),
    add_line3 VARCHAR(255),
    region VARCHAR(255) NOT NULL,
    city VARCHAR(20) NOT NULL,
    zipcode VARCHAR(10) NOT NULL,
    country_code VARCHAR(3) NOT NULL
);

INSERT INTO address (name, add_line1, add_line2, add_line3, region, city, zipcode, country_code) VALUES
('John Doe', '123 Main St', 'Apt 4B', NULL, 'California', 'Los Angeles', '90001', 'USA'),
('Jane Smith', '456 Elm St', NULL, NULL, 'New York', 'New York', '10001', 'USA'),
('Bob Johnson', '789 Oak St', 'Suite 500', NULL, 'Texas', 'Houston', '77001', 'USA'),
('Alice Williams', '101 Maple Ave', NULL, NULL, 'Florida', 'Miami', '33101', 'USA'),
('Charlie Brown', '202 Pine St', 'Unit 3', NULL, 'Illinois', 'Chicago', '60601', 'USA'),
('Emma Watson', '10 Downing Street', NULL, NULL, 'London', 'London', 'SW1A 2AA', 'GBR'),
('Harry Potter', '4 Privet Drive', 'Little Whinging', NULL, 'Surrey', 'London', 'CR2 6ER', 'GBR'),
('Hermione Granger', '12 Grimmauld Place', NULL, NULL, 'Islington', 'London', 'N1 9AG', 'GBR'),
('Ron Weasley', 'The Burrow', 'Ottery St Catchpole', NULL, 'Devon', 'Exeter', 'EX4 4PT', 'GBR'),
('Draco Malfoy', 'Malfoy Manor', 'Wiltshire', NULL, 'Wiltshire', 'Salisbury', 'SP1 3AA', 'GBR'),
('Sarah Lee', '100 Queen St W', 'Suite 100', NULL, 'Ontario', 'Toronto', 'M5H 2N2', 'CAN'),
('Michael Scott', '200 Wellington St', NULL, NULL, 'Ontario', 'Ottawa', 'K1A 0A9', 'CAN'),
('Jim Halpert', '300 Rue Saint-Jacques', 'Bureau 400', NULL, 'Quebec', 'Montreal', 'H2Y 1N1', 'CAN'),
('Pam Beesly', '400 8th Ave SW', NULL, NULL, 'Alberta', 'Calgary', 'T2P 1E1', 'CAN'),
('Dwight Schrute', '500 Granville St', 'Suite 600', NULL, 'British Columbia', 'Vancouver', 'V6C 1W1', 'CAN'),
('Hans Mueller', 'Musterstraße 1', NULL, NULL, 'Berlin', 'Berlin', '10115', 'DEU'),
('Greta Schmidt', 'Hauptstraße 10', '3. Stock', NULL, 'Bavaria', 'Munich', '80331', 'DEU'),
('Klaus Wagner', 'Königsallee 20', NULL, NULL, 'North Rhine-Westphalia', 'Düsseldorf', '40212', 'DEU'),
('Sabine Fischer', 'Friedrichstraße 30', 'Zimmer 405', NULL, 'Hesse', 'Frankfurt', '60313', 'DEU'),
('Peter Hoffmann', 'Rathausplatz 40', NULL, NULL, 'Hamburg', 'Hamburg', '20095', 'DEU'),
('Aarav Patel', '1 MG Road', NULL, NULL, 'Maharashtra', 'Mumbai', '400001', 'IND'),
('Priya Sharma', '2 Brigade Road', 'Flat 302', NULL, 'Karnataka', 'Bangalore', '560001', 'IND'),
('Rahul Singh', '3 Anna Salai', NULL, NULL, 'Tamil Nadu', 'Chennai', '600002', 'IND'),
('Anjali Gupta', '4 Park Street', 'Apartment 5', NULL, 'West Bengal', 'Kolkata', '700016', 'IND'),
('Vikram Reddy', '5 Banjara Hills', NULL, NULL, 'Telangana', 'Hyderabad', '500034', 'IND');

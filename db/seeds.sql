INSERT INTO departments (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Human Resources"),
       ("Customer Support");

INSERT INTO roles (title, salary, department_id)
VALUES ("Senior Developer", 100000.00, 2),
       ("Junior Developer", 50000.00, 2),
       ("Senior Sales Associate", 80000.00, 1),
       ("Junior Sales Associate", 40000.00, 1),
       ("Human Resources Administrator", 60000.00, 3),
       ("Human Resources Representative", 35000.00, 3),
       ("Customer Support Administrator", 64000.00, 4),
       ("Customer Support Representative", 32000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Marky", "Mark", 1, NULL),
       ("Joe", "Schmoe", 2, 1),
       ("Ivana", "Tinkle", 5, NULL),
       ("Seymour", "Butts", 6, 3),
       ("Ben", "Dover", 3, NULL),
       ("Mike", "Rotch", 4, 5),
       ("Buck", "Futter", 7, NULL),
       ("Chip", "Walsch", 8, 7);
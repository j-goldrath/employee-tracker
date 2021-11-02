DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

SELECT 'CREATING DATABASE STRUCTURE' as 'INFO';

DROP TABLE IF EXISTS departments,
                     roles,
                     employees;


CREATE TABLE departments (
    id              INT             NOT NULL    AUTO_INCREMENT,
    name            VARCHAR(30)     NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (name)
);

CREATE TABLE roles (
    id              INT             NOT NULL    AUTO_INCREMENT,
    title           VARCHAR(50)     NOT NULL,
    salary          DECIMAL         NOT NULL,
    department_id   INT             NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
    PRIMARY KEY (id),
    UNIQUE KEY (title)
);

CREATE TABLE employees (
    id              INT             NOT NULL    AUTO_INCREMENT,
    first_name      VARCHAR(30)     NOT NULL,
    last_name       VARCHAR(30)     NOT NULL,
    role_id         INT             NOT NULL,
    manager_id      INT,   
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);


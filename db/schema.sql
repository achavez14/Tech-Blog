DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;

-- Create table for BlogPost
CREATE TABLE IF NOT EXISTS BlogPost (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL
);

-- Create table for Comment
CREATE TABLE IF NOT EXISTS Comment (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL
);

-- Create table for User
CREATE TABLE IF NOT EXISTS User (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
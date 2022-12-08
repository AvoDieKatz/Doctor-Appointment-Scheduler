# Doctor Appointment Scheduler Web App

This project is about a Web App where client (patients) can schedule an appointment for checkup. These appointments will be assigned to the doctors and they will later make examination on these patients.

## Project Structure

The project is built using React and Symfony, they connect through API. In the project directory, there are two folders: 
"client" - the React Application or Front-end; "server" - the Symfony Application or Back-end

## How to run the project

### Start Symfony server
- Open "server" folder in VSC's integrated Terminal.
- Make sure you have Symfony and Composer installed on your machine, if not follow their websites instructions
- Run `composer install`to install dependencies
- When the installation is complete, run `symfony check:requirements` to check if you can run the Symfony Project
- Edit `DATABASE_URL` in .env file to match your MySQL configuration
- Run `php bin/console doctrine:database:create` to create database in your MySQL
- Run `php bin/console doctrine:migrations:migrate` to create tables in your MySQL database
- Run `php bin/console doctrine:fixtures:load` to populate your database with demo data
- Run `symfony serve`, the server should now running on http://127.0.0.1/8000

### Start React App
- Install Nodejs from their website.
- Open "client" folder in VSC's integrated Terminal.
- Run `npm install` to install all dependencies
- When the installation is complete, run `npm start`
- The React App is should be running on http://localhost:3000 

Test branch protection rule: lock branch
Test branch protection rule: do not allow bypass
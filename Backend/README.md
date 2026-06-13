[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/snPWRHYg)
# Examenopdracht Front-end Web Development / Web Services

- Student: Jonas De Vliegher
- Studentennummer: 202292116
- E-mailadres: jonas.devliegher@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## Opstarten

 - maak een database op u localhost die dit heeft:
    client: 'mysql2',
    host: 'localhost',
    port: 3306,
    name: 'project',
    username: 'root',

 - maak een .env met deze inhoud:

    NODE_ENV=development
    DATABASE_PASSWORD="your password of your database"

 - yarn install

 - yarn start

## Testen

- maak een .env.test met deze inhoud: 

    NODE_ENV=test
    DATABASE_HOST=localhost
    DATABASE_PORT=3306
    DATABASE_NAME=project_test
    DATABASE_USERNAME="username van u localhost"
    DATABASE_PASSWORD="wachtwoord van u localhost"

- yarn install

- yarn test

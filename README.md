# Evaluate a news article with Natural Language Processing - Project

# Overview
This project is a website that allows the user to input a specific url of a certain article to run Natural Language Processing (NLP) on it or blogs found on other websites.
It uses an external api (Meaning Cloud) and concentrate on sentimented processing.
It has two parts client side and server side, each is working on a different port

## Development 
The website is developed using javascript and html and is using webpack,webpack loaders and plugins, SASS, Service workers and API

To get started developing :

* All project dependencies ahould be installed using `npm install`
* The server should be started using `npm start`
* Both development and production configurations are available

## Other Installations
The project required other installation such as....
* express
* body-parser
* cors
* jest
* dotenv 
* other dependencies are also required that are included in the package.json file

## Dealing with the API

The Meaning cloud API is the one used in this project to make the required NLP on the url typed by the user.
An API is registered in the .env file, no other info was required. 
the API is free to use up to 1000 requests per day.

## Other features

The project also has other features like...
* Testing js files using unit testing
* offline feature availabilaty of the website using service workers
* The response of the server fill dynamically the User Interface

## Author:
The author is me Rouwaida Mouard, a student in the Egyptfwd initiative.

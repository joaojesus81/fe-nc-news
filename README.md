# No news is good news

## Description: 
Check the news at home or on the go using this most suitable news app. Check the latest articles and voice your opinion on them.

## Link to website:
https://no-news.netlify.app/

## Prerequisites: 

For this app to work please make sure you have an up to date browser and an internet connection.

## Installation:

No installation required. Follow the provided link.

## Usage:
You should be able to navigate the website using the navigation bar on the left (bottom for smaller displays) and the links provided in each article.

### Instructions to run locally:
1. Please make sure you're using the **recommended versions or later** of the software listed bellow.
2. Start by cloning the backend repository. On your console write the following code:  
    >git clone https://github.com/joaojesus81/be-nc-news
3. Navigate to the newly created directory:
    >cd be-nc-news
4. Inside the directory run the following command to install needed dependencies:
    >npm install
5. After all dependencies are installed, you should be able to run the database setup:
    >npm run setup-dbs
6. Proceed seed the database and migrate to latest:
    >npm run seed:prod migrate-latest:prod
7. And start the server using nodemon to access the api:
    >npm run start

---

1. For the frontend, start by cloning the frontend repository.
   1. >git clone https://github.com/joaojesus81/fe-nc-news
2. Navigate to the newly created directory:
   1. >cd fe-nc-news
3. Inside the directory run the following command to install needed dependencies:
   1. >npm install
4. After all dependencies are installed, you should be able to start the react server:
    >npm run start

### Access to the backend repo:
https://github.com/joaojesus81/be-nc-news

### Access to the frontend repo:
https://github.com/joaojesus81/fe-nc-news

### Versions:
- Node: 14.4.0
- npm: 6.14.8

## Authors:
Joao Jesus  
You can find me in my personal github:  
https://github.com/joaojesus81

## License:
No news is good news is licensed under CC0-1.0.

## Acknowledgments:
Everyone at Northcoders and every other student in our cohort.
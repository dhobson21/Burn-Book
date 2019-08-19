This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<img src="./src/components/img/BBInit.png" alt="Burn Book"  >

# Burn Book - A tongue-in-cheek social app for "petty" people

Burn Book is an app for social media users that are just plain tired of all the positivity and support on today's social platforms. If you're a petty person that can't forget any slight, infraction, offence, or indeceny made against you, Burn Book is the app for you. Burn Book allows you to track all of the grudges you hold, no matter how inconsequential. Users are also able to explore Burn Book community grudges, and connect with other users over a common enemy.
Burn Book is written with the JavaScript framework, React.js.

## Getting Started
To run Burn Book locally, create an empty directory and clone the project by running the following command in your terminal: ``` git@github.com:dhobson21/Burn-Book.git```

Burn Book uses a database.json file to store all data. To create the database, run:
```
mkdir api
cd api
touch database.json
```
Open **database.json** and copy the following into the file to create a database skeleton:
```
{
  "grudges": [
    {
      "shared": true,
      "enemyName": "Dustin H",
      "date": "2019-08-07",
      "email": "dhobson21@gmail.com",
      "insult": "lumpish rough-hewn flax-wench!",
      "incident": "He spilled his drink like an absolute idiot and ruined the new carpet at the NSS hackery ",
      "pettyLevel": 6,
      "userId": 3,
      "isResolved": false,
      "id": 1
    },
    {
      "enemyName": "Drew  Palazola",
      "date": "2019-08-04",
      "email": "dhobson21@gmail.com",
      "insult": "surly dread-bolted scantling!",
      "incident": "Drew spiked a ping pong ball into my chest and laughed a little too hard about it.",
      "pettyLevel": 9,
      "userId": 1,
      "isResolved": true,
      "shared": false,
      "id": 3
    },
    {
      "enemyName": "Madi Peper",
      "date": "2019-06-21",
      "email": "dhobson21@gmail.com",
      "insult": "bootless dread-bolted bum-bailey!",
      "incident": "She kept saying the word 'bagel' like it was spelled bag-el....super annoying",
      "pettyLevel": 8,
      "userId": 1,
      "isResolved": true,
      "shared": false,
      "id": 13
    },
    {
      "shared": false,
      "enemyName": "Blake Davis",
      "date": "2019-08-01",
      "email": "Blake@gmail.com",
      "insult": "mammering fen-sucked apple-john!",
      "incident": "He is merciless when we play ping pong. ",
      "pettyLevel": 6,
      "userId": 4,
      "isResolved": false,
      "id": 5
    },
    {
      "shared": false,
      "enemyName": "Steve Brownlee",
      "date": "2019-06-06",
      "email": "steve@nss.com",
      "insult": "saucy eye-offending barnacle!",
      "incident": "He walks around the building like he owns it",
      "pettyLevel": 9,
      "userId": 4,
      "isResolved": false,
      "id": 6
    }
  ],
  "images": [
    {
      "id": 1,
      "url": "https://usatftw.files.wordpress.com/2016/08/ryan-lochte-perfect-hair.jpg?w=1200"
    },
    {
      "id": 2,
      "url": "https://www.cheatsheet.com/wp-content/uploads/2017/07/GQ-Cadillac-Lacoste-And-Patron-Tequila-Celebrate-Coolest-Athletes.jpg?w=1200-h=800"
    },
    {
      "id": 3,
      "url": "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/02/16/14/martin-shkreli.jpg?w=1200-h=800"
    },
    {
      "id": 4,
      "url": "https://cbsnews2.cbsistatic.com/hub/i/r/2015/04/16/02aa96b1-1293-4165-8129-5747bf13fdab/thumbnail/1200x630/bb7af33c83e3a352306b0b17fb1b8624/elizabethholmespromo.jpg?w=1200-h=800"
    },
    {
      "id": 5,
      "url": "https://static.tvtropes.org/pmwiki/pub/images/baratheon_joffrey_2675.jpg?w=1200-h=800"
    },
    {
      "id": 6,
      "url": "http://images.fanpop.com/images/image_uploads/Angela-the-office--28us-29-34529_1024_791.jpg?w=1200-h=800"
    },
    {
      "id": 7,
      "url": "http://i1.mirror.co.uk/incoming/article6131758.ece/ALTERNATES/s615/Jar-Jar-Binks-in-Star-Wars.jpg?w=1200-h=800"
    },
    {
      "id": 8,
      "url": " https://www.telltalesonline.com/wp-content/uploads/2016/02/Kanye-West-and-Taylor-Swift-feud.jpg?w=1200-h=800"
    },
    {
      "id": 9,
      "url": "https://starschanges.com/wp-content/uploads/2016/08/alex-jones-height-weight-age.jpg?w=1200-h=800"
    },
    {
      "id": 10,
      "url": "http://media4.s-nbcnews.com/j/newscms/2014_38/676051/140919-roger-goodell-nfl-1523_6e1f530afa5e14105aca241ffa1485c5.nbcnews-fp-1200-800.jpg"
    }
  ],
  "resolvedGrudges": [
    {
      "resolveReason": "I was wrong",
      "compliment": "he is nice",
      "grudgeId": 3,
      "date": "08/15/2019",
      "id": 3
    },
    {
      "resolveReason": "I was wrong",
      "compliment": "Madi was right",
      "grudgeId": 13,
      "date": "08/19/2019",
      "id": 7
    }
  ],
  "sharedGrudges": [
    {
      "userId": 1,
      "grudgeId": 1,
      "id": 1
    },
    {
      "userId": 1,
      "grudgeId": 4,
      "id": 2
    }
  ],
  "users": [
    {
      "id": 1,
      "username": "DustinH",
      "email": "dhobson21@gmail.com",
      "password": "password123",
      "firstname": "Dustin",
      "lastname": "Hobson"
    },
    {
      "firstname": "Curt ",
      "lastname": "Cato",
      "username": "Curt1225",
      "password": "password123",
      "email": "kurt@yahoo.com",
      "id": 2
    },
    {
      "firstname": "Krystal",
      "lastname": "Gates",
      "username": "Kgatez",
      "password": "password123",
      "email": "kg@gmail.com",
      "id": 3
    },
    {
      "firstname": "Ben",
      "lastname": "Parker",
      "username": "Bparker1",
      "password": "password123",
      "email": "bdog@@gmail.com",
      "id": 4
    }
  ]
}
```
Head back to the Burn-Book folder and run: ```npm install```
This is will install all packages, libraries and their dependencies used by Burn Book.
Next  run the following in order to view Burn Book in your browser: ```npm start```
Open [http://localhost:3000]( http://localhost:3000) to view it in the browser.
In another window of your terminal go into the ```src/api``` forlder and run: ```json-server -p 5002 -w database.json```

## Entity Relationship Diagrams
https://dbdiagram.io/d/5d2f3d09ced98361d6dcc080

## Technologies Used
<img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-128.png" alt='React.JS' width=100>
<img src="https://www.schemecolor.com/wp-content/uploads/javascript-logo.png" alt='JS' width=100>
<img src='https://techchurian.files.wordpress.com/2013/02/css3-logo.png' alt='CSS3' width=100>
<img src="https://www.w3.org/html/logo/downloads/HTML5_Logo_256.png" alt='HTML5' width=100 height=100>

<img src="https://react.semantic-ui.com/logo.png" alt='Semantic-ui React' width=100>
<img src="https://www.bootcdn.cn/assets/img/momentjs.svg?1541408619167" alt='Momentjs' width=100>
<img src="https://dashboard.snapcraft.io/site_media/appmedia/2018/07/code-256px_yXmjUSe.png" alt='VS Code' width=100>
<img src="https://cdn.rawgit.com/npm/logos/31945b5c/npm%20square/n-64.png" alt='NPM' width=100>
<img src="https://lh3.googleusercontent.com/HxaWoP7_9DZnmC3jzt6E4mHAupAHN2rzwnI2MgLvHGi_O4qPxIK8Ah3n5fAL0u0Nfuu5o1LdnA=w128-h128-e365" alt='Canva' width=100>
<img src=https://trevorstone.org/curse/shakespeareoval.gif alt='Elizabethan Curse Generator' width=100>
<img src=https://www.emailjs.com/wp-content/themes/EmailJS/pages/homepage/img/logo@2x.png alt='Email.js' width=100>

## Enjoy Burn Book--Don't take it seriously
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
### Author
[Dustin Hobson](https://github.com/dhobson21)
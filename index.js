/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const gamesCard = document.createElement("div");
        gamesCard.classList.add("game-card");
        gamesCard.innerHTML = `
            <div class="game-card-header">
                <h3>${games[i].name}</h3>
                <p>${games[i].category}</p>
            </div>
            <img src="${games[i].img}" class="game-img">
        `;

        // Append the game card to the gamesContainer (already defined)
        gamesContainer.appendChild(gamesCard);
    }
}

addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

contributionsCard.innerHTML = `
<strong>Total Individual Contributions:</strong> ${totalContributions.toLocaleString()}
`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);

raisedCard.innerHTML = `
<strong>Total Amount Raised:</strong> ${totalRaised.toLocaleString()}
`;



// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const numGames = GAMES_JSON.length;

gamesCard.innerHTML = `
<strong>Number of Games:</strong> ${numGames}
`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    // use filter() to get a list of games that have not yet met their goal
    let  unfundedGames = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
      });

    addGamesToPage(unfundedGames);
    // use the function we previously created to add the unfunded games to the DOM
    return unfundedGames.length
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    
    // use filter() to get a list of games that have not yet met their goal
    let fundedGames = GAMES_JSON.filter ( (game) => {
        return game.pledged >= game.goal;
      });
    addGamesToPage(fundedGames);
    // use the function we previously created to add the unfunded games to the DOM
    return fundedGames.length
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    return GAMES_JSON.length;
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", function () {
    console.log("Number of unfunded games:", filterUnfundedOnly());
  });
  
fundedBtn.addEventListener("click", function () {
    console.log("Number of funded games:", filterFundedOnly());
  });
  
allBtn.addEventListener("click", function () {
    console.log("Total number of games:", showAllGames());
  });



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numOfUnfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesInfo = document.createElement("div");
unfundedGamesInfo.innerHTML = `
    <p>
        ${numOfUnfundedGames > 0
            ? `${numOfUnfundedGames.toLocaleString()} ${
                numOfUnfundedGames === 1 ? "game is" : "games are"
              } currently unfunded.`
            : "All games are funded."}
    </p>
`;
// create a new DOM element containing the template string and append it to the description container

descriptionContainer.appendChild(unfundedGamesInfo);




/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});


// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUpGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameNameElement = document.createElement("p");
topGameNameElement.textContent = `Top Pledge Game: ${topGame.name}`;

const runnerUpGameNameElement = document.createElement("p");
runnerUpGameNameElement.textContent = `Runner-Up Game: ${runnerUpGame.name}`;
// do the same for the runner up item

firstGameContainer.appendChild(topGameNameElement);
secondGameContainer.appendChild(runnerUpGameNameElement);

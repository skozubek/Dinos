// Create Dino Tiles objects using revaling module pattern
const createDinoTile = (function () {
  function setFact(dino, human) {
    // Weight Compare Method
    function compareWeight() {
      return `Dino weight was ${dino.weight} lbs, your weight is only ${human.weight} lbs`;
    }
    // Height Compare Method
    function compareHeight() {
      return `Dino was ${dino.height} heigh, you are only ${human.feets} feets and ${human.inches} inches tall`;
    }
    // Diet Compare Method
    function compareDiet() {
      return `Dino's diet was ${dino.diet}. You are ${human.diet}`;
    }
    // variable to store the fact text.
    let fact = ``;
    // If it is Pigeon, always the fact stored in json file will be displayed.
    // Otherwise, random info from the json file will be displayed.
    if (dino.species === 'Pigeon') {
      fact = dino.fact;
    } else {
      // get random number from 0-5
      // if we get 0 - the fact will be weight
      // if we get 1 - the fact will be height
      // if we get 2 - the fact will be diet
      // if we get 3 - the fact will be fact
      // if we get 4 - the fact will be where
      // if we get 5 - the fact will be when
      const number =
        Math.floor(Math.random() * (Math.floor(5) - Math.ceil(0))) +
        Math.ceil(0);

      switch (number) {
        case 0:
          fact = compareWeight();
          break;
        case 1:
          fact = compareHeight();
          break;
        case 2:
          fact = compareDiet();
          break;
        case 3:
          fact = dino.fact;
          break;
        case 4:
          fact = `Dino lived in: ${dino.where}`;
          break;
        case 5:
          fact = `Dino lived in ${dino.when}`;
          break;
        default:
          console.log(`sth went wrong`);
      }
    }
    return fact;
  }
  // creates data to be displayed on tiles
  function createTile(dino, human) {
    const fact = setFact(dino, human);
    const { species, url } = dino;
    return {
      fact,
      species,
      url: url.toLowerCase(),
    };
  }
  return {
    create: createTile,
  };
})();
// Creates human object
function createHuman(name, feets, inches, weight, diet) {
  return {
    name,
    feets,
    inches,
    weight,
    diet,
  };
}
// Add tiles to DOM
// Remove form from screen
// On button click, prepare and display infographic
// Validate form, store data in the variables, remove the form and prepare the grid
function validateForm(name, feets, inches, weight) {
  let valid = false;
  let message = '';
  // validate form fields if not empty or invalid
  if (name === '') {
    message = `C'monn gimme your name`;
  } else if (feets <= 0) {
    message = `C'monn, gimme proper feets`;
  } else if (inches <= 0) {
    message = `C'monn, gimme proper inchesss`;
  } else if (weight <= 0) {
    message = `C'monn, gimme proper weight`;
  } else {
    valid = true;
  }
  return {
    verdict: valid,
    message,
  };
}
// Removes the form from the DOM
function removeForm() {
  const formUser = document.getElementById('dino-compare');
  formUser.remove();
}
// Fetch data from provided json file and return a promise
async function fetchDinos() {
  const url = './dino.json';
  const response = await fetch(url);
  const json = await response.json();
  return json.Dinos;
}
// Create html element for the tile object
function createTileHtml(tile) {
  // create new div and its html based on tile's data
  const tileElement = document.createElement(`div`);
  tileElement.className = `grid-item`;
  tileElement.innerHTML = `<h3>${tile.species}</h3><p>${tile.fact}</p><img src="${tile.url}"/>`;
  return tileElement;
}
// Add tile to grid
function addTileToGrid(gridItem) {
  // add grid items html to grid
  // add the newly created element and it's content into the DOM
  const gridElement = document.getElementById('grid');
  gridElement.appendChild(gridItem);
}
// Here we start, executes on button click
function start() {
  // get values form the form and set variables
  const name = document.getElementById('name').value;
  const feets = document.getElementById('feet').value;
  const inches = document.getElementById('inches').value;
  const weight = document.getElementById('weight').value;
  const diet = document.getElementById('diet').value;
  // check if the form is valid
  const isValid = validateForm(name, feets, inches, weight);
  // if it is proceed to create objects
  if (isValid.verdict) {
    removeForm();
    // create human object
    const human = createHuman(name, feets, inches, weight, diet);
    // create dinos objects
    // getting json into array
    // create tiles based on the fetched data
    (async function () {
      // dinos will be the array of objects
      const data = await fetchDinos();
      // add img url to every object
      const dinos = data.map((item) => ({
        ...item,
        url: `./images/${item.species}.png`,
      }));
      // create dino tiles based on dino and human for comparsion
      const tiles = dinos.map((dino) => createDinoTile.create(dino, human));
      // Create grid based on the content of tiles objects
      // add human tile in the middle of the grid (index of 4)
      tiles.splice(4, 0, {
        fact: human.name,
        species: `Homo Sapiens`,
        url: `./images/human.png`,
      });
      // Create html for all the tiles
      const gridItems = tiles.map((tile) => createTileHtml(tile));
      // ... and add them to the grid
      gridItems.forEach((element) => addTileToGrid(element));
    })();
    // if the form is not valid, alert the message
  } else alert(isValid.message);
}

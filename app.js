// Create Dino Constructor
/* let dino = (function (dino, picUrl) {
  return {
    dinos: dino.species,
    weight: dino.weight,
    height: dino.height,
    diet: dino.diet,
    pic: picUrl
  };
})(); */
// Create Dino Objects
// Fetch data from provided json file and return a promise
async function fetchDinos() {
  const url = './dino.jsongit';
  const response = await fetch(url);
  const json = await response.json();
  return json.Dinos;
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}

// fetchDinos().then(data => createTiles(data));
// Create Human Object
// Use IIFE to get human data from form
// Creates human object
function createHuman(name, feets, inches, weight, diet) {
  return {
    name,
    heightFeet: feets,
    heightInches: inches,
    weight,
    diet,
  };
}
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
// Generate Tiles for each Dino in Array
// Add tiles to DOM
// Remove form from screen
// On button click, prepare and display infographic
// Validate form, store data in the variables, remove the form and prepare the grid
function validateForm(name, feets, inches, weight) {
  let valid = false;
  let message = '';
  // validate form fields if not empty or invalid
  if (name === '') {
    message = 'gimme your name';
  } else if (feets <= 0) {
    message = 'cmonn, gimme proper feets';
  } else if (inches <= 0) {
    message = 'cmonn, gimme proper inchesss';
  } else if (weight <= 0) {
    message = 'cmonn, gimme proper weight';
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
// Here we start, executes on button click
function start() {
  // get values form the form and set variables
  const name = document.getElementById('name').value;
  const feets = document.getElementById('feet').value;
  const inches = document.getElementById('inches').value;
  const weight = document.getElementById('weight').value;
  const diet = document.getElementById('diet').value;
  // if the form is valid, create human object
  const isValid = validateForm(name, feets, inches, weight);
  if (isValid.verdict) {
    const human = createHuman(name, feets, inches, weight, diet);
    console.log(human);
    // if the form is not valid, alert the message
  } else alert(isValid.message);

  let dinos = [];
  // fetchDinos().then(data => console.log(data));
  (async function () {
    // dinos will be the array of objects
    dinos = await fetchDinos();

    // console.log(dinos);
  })();
}

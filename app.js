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
const fetchDinos = async () => {
  let url = './dino.json';
  const response = await fetch(url)
  const json = await response.json()
  return json;
}

//fetchDinos().then(data => createTiles(data));

// Create Human Object

// Use IIFE to get human data from form


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


//Validate form, store data in the variables, remove the form and prepare the grid
const validateForm = () => {
  let valid = false;
  let message = '';
  //get values form the form and set variables
  const name = document.getElementById('name').value;
  const feets = document.getElementById('feet').value;
  const inches = document.getElementById('inches').value;
  const weight = document.getElementById('weight').value;

  //validate form fields if not empty or invalid
  if (name === '') {
    message = 'gimme your name';
  } else if (feets <= 0) {
    message = 'cmonn, gimme proper feets';
  } else if (inches <= 0) {
    message = 'cmonn, gimme proper inches';
  } else if (weight <= 0) {
    message = 'cmonn, gimme proper weight';
  } else {
    valid = true;
  }
  return {
    verdict: valid,
    message: message
  }
}

// if (document.getElementById('name').value !== '' && document.getElementById('feet').value > 0 && document.getElementById('inches').value > 0 && document.getElementById('weight').value > 0) {
//   valid = true;
// } else alert(`something's wrong with the form man!`);

// return valid;


let getHuman = () => {
  return {
    name: document.getElementById('name').value,
    heightFeet: document.getElementById('feet').value,
    heightInches: document.getElementById('inches').value,
    weight: document.getElementById('weight').value,
    diet: document.getElementById('diet').value
  }
};

const removeForm = () => {
  const formUser = document.getElementById('dino-compare');
  formUser.remove();
}

const start = () => {
  if (validateForm().verdict) {
    let human = getHuman();
    console.log(human);
  } else console.log(validateForm().message);

}
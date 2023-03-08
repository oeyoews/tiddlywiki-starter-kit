// comments by @chatgpt
// Import the built-in 'fs' module to work with the file system
const fs = require('fs');

// Read the contents of 'sentences.txt' file synchronously and store it in the 'data' variable as a string
const data = fs.readFileSync('sentences.txt', 'utf-8');

// Split the string into an array of lines using the newline character '\n'
const lines = data.split('\n');

// Create an empty array to store the result
const result = [];

// Initialize a counter variable 'id' with value 1
let id = 1;

// Loop through each line in the 'lines' array
for (let line of lines) {
  // Split the line into two parts using the colon ':' separator
  const parts = line.split(':');

  // If there are less than two parts, skip to the next line
  if (parts.length < 2) {
    continue;
  }

  // Trim any leading or trailing white space from the 'from' and 'hitokoto' parts
  const from = parts[0].trim();
  const hitokoto = parts[1].trim();

  // Create an object 'item' with 'id', 'from', and 'hitokoto' properties
  const item = {
    id: id.toString(),
    from: from,
    hitokoto: hitokoto,
  };

  // Add the 'item' object to the 'result' array
  result.push(item);

  // Increment the 'id' counter
  id++;
}

// Convert the 'result' array to a formatted JSON string and store it in the 'jsonResult' variable
// const jsonResult = JSON.stringify(result, null, 2);
const jsonResult = JSON.stringify(result);

const sentencesName = 'sentences.json';
// Write the 'jsonResult' string to a new file called 'sentences.json'
fs.writeFileSync(sentencesName, jsonResult);

// Print a message to the console to confirm that the data has been written to the new file
console.log(`JSON data written to ${sentencesName} and have ${id} sentences`);

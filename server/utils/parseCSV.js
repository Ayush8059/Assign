const csv=require('csv-parser');
const fs=require('fs');

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
};
module.exports = parseCSV;
// Usage example:
// const parseCSV = require('./parseCSV');  
// parseCSV('path/to/file.csv')
//   .then(data => console.log(data))           
//   .catch(error => console.error('Error parsing CSV:', error));
// This code reads a CSV file and parses it into an array of objects, where each object represents a row in the CSV file.
// The `csv-parser` library is used to handle the parsing of the CSV file.
// The `fs` module is used to read the file from the filesystem.
// The function returns a promise that resolves with the parsed data or rejects with an error if something goes wrong.
// Make sure to install the `csv-parser` package using npm:
// npm install csv-parser
// You can use this utility function in your application to read and parse CSV files easily.
// It can be particularly useful for importing data from CSV files into your application or database.
// Ensure you handle the file path correctly and that the CSV file is formatted properly for parsing.
// You can also modify the parsing logic to handle specific CSV formats or data types as needed.
// This utility function can be integrated into your application wherever you need to read and process CSV files.
// Make sure to handle errors appropriately in your application when using this utility function.
// You can also extend this utility to include additional features like filtering, transforming, or validating the parsed data as per your requirements.
// This utility function can be used in various scenarios, such as importing transaction data from CSV files into a database or processing CSV files for analytics.

// Remember to test the utility function with different CSV files to ensure it works as expected in various scenarios.
// You can also add additional options to the `csv-parser` to customize the parsing behavior, such as handling headers, delimiters, etc.
// This utility function can be a valuable addition to your toolkit for working with CSV files in Node.js applications.
// You can also consider adding logging or error handling mechanisms to track the parsing process and handle any issues that may arise during file reading or parsing.
// This utility function can be used in various applications, such as data migration, reporting, or data analysis tasks.
// You can also extend this utility to support different file formats or data processing tasks as needed in your application.
// Make sure to document the usage of this utility function in your codebase to help other developers understand how to use it effectively.
// You can also consider adding unit tests for this utility function to ensure its reliability and correctness in different scenarios.
// This utility function can be a great addition to your Node.js application for handling CSV files efficiently.
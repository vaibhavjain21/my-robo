#!/usr/bin/env node
var app = require('../index.js');

 // input file
var fileName = process.argv[2];

 // Run the simulation
app.runSimulation(fileName, function(err, robot) {
  // In case of error, let the user know
  if (err) {
    console.log('ERROR:' + ' ' + err.message);
    return false;
  }

  if (!robot.isPlaced) {
    console.log('My-Robo is not placed on the table');
  }
  console.log('-------------------------------------');
  console.log('My-Robo simultion ended. Thank you!!!!');
  console.log('-------------------------------------');
});

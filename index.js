var My_Robo = require('./lib/My_Robo');
var FileReader = require('./lib/FileReader');
var FileParser = require('./lib/FileParser');

//Instances for usage
var robo = new My_Robo();
var fileReader = new FileReader();
var parser = new FileParser();

//Application module
var app = {};

/**
 * Read and parse file name
 * @param {String} fileName File to read and parse
 * @param {Function} cb Callback function
 */
app.readAndParseFile = function(fileName, cb) {
  fileReader.readInputFile(fileName, function(err, fileData) {
    if (err) {
      cb(err);
      return false;
    }

    parser.parseArgs(fileData, function(err, instructionList) {
      if (err) {
        cb(err);
        return false;
      }

      cb(null, instructionList);
    })
  });
};

/**
 * Run simulation using input file
 * @param {String} fileName File to run the simulation on
 * @param {Function} cb Callback function
 */
app.runSimulation = function(fileName, cb) {
  this.readAndParseFile(fileName, function(err, instructionList) {
    if (err) {
      cb(err);
      return false;
    }

    robo = robo.runInstructions(instructionList);
    cb(null, robo);
  });
};

module.exports = app;
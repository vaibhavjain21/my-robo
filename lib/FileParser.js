
 //FileParser constructor
var FileParser = function () {};

/**
 * Parse the arguments from file contents
 * @param {String} args commands list from the file
 * @param {Function} cb Callback function
 */
FileParser.prototype.parseArgs = function(args, cb) {
  //  Error in case if no commands are passed
  if (!args.length) {
    cb(new RangeError('Must pass instructions to the robot'));
    return false;
  }

  var parsedArgsArray = args
    .split('\n')
    .map(function(instruction) {
      return instruction.toLowerCase();
    })
    .reduce(function(instructionList, rawInstruction) {

      var parsedInstruction = this.parseInstruction(rawInstruction);

      if (parsedInstruction) {
        instructionList.push(parsedInstruction);
      }
      return instructionList;
    }.bind(this), []);

  // Error in case if no commands are passed
  if (!parsedArgsArray.length) {
    cb(new TypeError('Please pass valid instructions'));
    return false;
  }

  cb(null, parsedArgsArray);
};

/**
 * Valid directions for placement of robot
 * @type {string[]}
 */
FileParser.prototype.validDirections = ['north', 'south', 'east', 'west'];

/**
 * Parse a commands into an object
 * @param {String} rawInstructionString Commands string from input file
 * @returns {*}
 */
FileParser.prototype.parseInstruction = function(rawInstructionString) {
  var instructionObject;
  var multiWordInstructionList = rawInstructionString.split(' ');

  if (multiWordInstructionList.length > 1 && multiWordInstructionList[0] === 'place') {
    instructionObject = this.parsePlaceInstruction(multiWordInstructionList);
  } else {
    instructionObject = this.parseSingleWordInstruction(rawInstructionString);
  }

  if (instructionObject) {
    return instructionObject;
  }
};

/**
 * Parse place instructions
 * @param {Array} placeParts Place instruction parts
 * @returns {*}
 */
FileParser.prototype.parsePlaceInstruction = function(placeParts) {
  var placeArgsList = placeParts[1].split(',');

  var x = parseInt(placeArgsList[0], 10);
  var y = parseInt(placeArgsList[1], 10);
  var direction = placeArgsList[2];

  if (!isNaN(x) && !isNaN(y) && (this.validDirections.indexOf(direction) > -1)) {
    return {
      command: 'place',
      args: [x, y, direction]
    };
  } else {
    return null;
  }
};

/**
 * @param {String} instructionString Single word commands
 * @returns {*}
 */
FileParser.prototype.parseSingleWordInstruction = function(instructionString) {
  switch (instructionString) {
    case 'move':
      return {
        command: 'move'
      };
    case 'left':
      return {
        command: 'turn',
        args: 'left'
      };
    case 'right':
      return {
        command: 'turn',
        args: 'right'
      };
    case 'report':
      return {
        command: 'report'
      };
    default:
      return null;
  }
};

module.exports = FileParser;
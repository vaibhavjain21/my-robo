/**
 * Robot constructor
 * @constructor
 */
var My_Robo = function() {
  this.isPlaced = false;
  this.position = {
    x: null,
    y: null
  };
  this.direction = null;
};

/**
 * Map for turning the robot
 * @type {{direction: {value: string, left: string, right: string}}}
 */
var directionMap = {
  north: {
    value: 'north',
    left: 'west',
    right: 'east'
  },
  east: {
    value: 'east',
    left: 'north',
    right: 'south'
  },
  south: {
    value: 'south',
    left: 'east',
    right: 'west'
  },
  west: {
    value: 'west',
    left: 'south',
    right: 'north'
  }
};
My_Robo.prototype.tableSize = {x: 4, y: 4};

/**
 * Place a robot
 * @param {Array} paramList 3-tuple of x, y, and direction
 * @returns {Robot}
 */
My_Robo.prototype.place = function(paramList) {
  var x = paramList[0];
  var y = paramList[1];
  var direction = directionMap[paramList[2]].value;

  // Ignore if placement is off the table
  if (x > this.tableSize.x || y > this.tableSize.y) {
    return this;
  }

  this.isPlaced = true;
  this.position.x = x;
  this.position.y = y;
  this.direction = direction;

  return this;
};

/**
 * Move the robot one unit in the direction it is facing
 * @returns {Robot}
 */
My_Robo.prototype.move = function() {
  // Ignore command if robot is not yet placed
  if (!this.isPlaced) {
    return this;
  }

  var x = this.position.x;
  var y = this.position.y;

  switch (this.direction) {
    case 'north':
      if (++y < this.tableSize.y) {
        this.position = {x: x, y: y}
      }
      break;
    case 'east':
      if (++x < this.tableSize.x) {
        this.position = {x: x, y: y}
      }
      break;
    case 'south':
      if (--y >= 0) {
        this.position = {x: x, y: y};
      }
      break;
    case 'west':
      if (--x >= 0) {
        this.position = {x: x, y: y}
      }
      break;
    default:
      break;
  }

  return this;
};

/**
 * Turn a robot in a direction
 * @param {String} direction Direction to turn in
 * @returns {My_Robo}
 */
My_Robo.prototype.turn = function(direction) {
  // Ignore command if robot is not yet placed
  if (!this.isPlaced) {
    return this;
  }

  var resultDirection = directionMap[this.direction][direction];

  if (resultDirection) {
    this.direction = resultDirection;
  }

  return this;
};

/**
 * Report current position of the robot
 * @returns {My_Robo}
 */
My_Robo.prototype.report = function() {
  // Ignore command if robot is not yet placed
  if (!this.isPlaced) {
    return this;
  }
  console.log('my-robo simulation started');
  console.log('--------------------------');
  console.log('OUTPUT: '+  [this.position.x, this.position.y,this.direction.toUpperCase()].join(','));

  return this;
};

/**
 * Run parsed instructions
 * @param {Array} instructionList List of parsed instructions
 * @returns {Robot}
 */
My_Robo.prototype.runInstructions = function(instructionList) {
  var instruction;
  var robot = this;

  // Run command in series
  for (var i = 0; i<instructionList.length; i++) {
    instruction = instructionList[i];
    if (instruction.args) {
      robot = this[instruction.command](instruction.args);
    } else {
      robot = this[instruction.command]()
    }
  }

  return robot;
};

module.exports = My_Robo;




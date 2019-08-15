# A Robotic simulator
A walking robot simulator written in Node.js and Javascript

## Installation & usage
 
## How to install globally
This will add ```robot``` to your path. Use it wherever you'd like. 
@ the prompt
$ npm install -g
$ robot CommandFile1.txt
$ robot CommandFile2.txt
$ robot CommandFile3.txt

## How to install locally
If you install it locally, you can use it within the directory via 'npm start' or 'node'.
@ the prompt
$ npm install
$ npm start -- CommandFile1.txt
$ npm start -- CommandFile2.txt
$ npm start -- CommandFile3.txt
$ node ./bin/robot.js CommandFile1.txt
$ node ./bin/robot.js CommandFile2.txt
$ node ./bin/robot.js CommandFile3.txt

## Instruction format

The simulator only accepts .txt files, with one command per line. The commands available are:

- **PLACE X, Y, DIRECTION (PLACE 2,3,EAST):** Place the robot on the table.
- **MOVE:** Move the robot one unit in the direction it is facing
- **LEFT:** Turn the robot left
- **RIGHT:** Turn the robot right
- **REPORT:** Report the current position and direction of the robot Eg:(0,0,WEST)

The table is a 5x5 grid, and any command that would result in the robot being off the table will be ignored

## Command to run tests

$ npm test  #Please note that there is one test case which will fail. It has been done intentionally

Test input files are available in ```test/data```. 



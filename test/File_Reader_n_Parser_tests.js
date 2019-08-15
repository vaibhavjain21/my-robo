var expect = require('chai').expect;
var FileReader = require('../lib/FileReader');
var FileParser = require('../lib/FileParser');
var path = require('path');

//Paser File test cases
describe('Test cases: File and FileParser', function() {
  var fileReader = new FileReader();

  console.log('Unit tests are as follows')
  console.log('-------------------------')
  it('content of the text file should be correctly read', function(done) {
    fileReader.readInputFile(path.join(__dirname, 'data/test1.txt'), function(err, fileData) {
      expect(err).to.be.null;
      expect(fileData).to.equal('PLACE 0,0,NORTH\nMOVE\nREPORT');
      done();
    });
  });

  it('display an error if the file is not a text file', function(done) {
    fileReader.readInputFile(path.join(__dirname, 'data/noContent.txt'), function(err) {
      expect(err).to.exist;
      done();
    });
  });
});

//Paser Test cases
describe('', function() {
  var parser;

  before(function() {
    parser = new FileParser();
  });

  it('Error should be thrown if no instructions are passed', function(done) {
    parser.parseArgs('', function(err) {
      expect(err).to.exist;
      done();
    });
  });

  it('parse file contents correctly into an array of instructions', function(done) {
    parser.parseArgs('PLACE 0,0,NORTH\nMOVE\nLEFT\nRIGHT\nREPORT', function(err, instructionList) {
      expect(instructionList).to.deep.equal([
        {
          command: 'place',
          args: [0, 0, 'north']
        }, {
          command: 'move'
        }, {
          command: 'turn',
          args: 'left'
        }, {
          command: 'turn',
          args: 'right'
        }, {
          command: 'report'
        }
      ]);
      done();
    });
  });

  it('Unknown instructions should be ignored', function(done) {
    parser.parseArgs('PLACE 0,0,NORTH\nslartybartfast\nmarco polo\nPLACE 0,1,north-east\nMOVE\nREPORT', function(err, instructionList) {
      expect(instructionList).to.deep.equal([
        {
          command: 'place',
          args: [0, 0, 'north']
        }, {
          command: 'move'
        }, {
          command: 'report'
        }
      ]);
      done();
    });
  });
});
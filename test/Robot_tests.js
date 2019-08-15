var expect = require('chai').expect;
var sinon = require('sinon');
var My_Robo = require('../lib/My_Robo');

describe('Test cases: Robot', function() {
  var robot;
  var stub;

  beforeEach(function() {
    robot = new My_Robo();
  });
//Negetive scenario. It will fail
  it('robot should be correctly placed on valid point on the table', function() {
    robot = robot.place([0,1,'north']);
    expect(robot.isPlaced).to.be.true;
    expect(robot.position).to.deep.equal({x: 0, y: 1});
    expect(robot.direction).to.equal('south');
  });

  it('instruction which place the robo off the board should be ignored', function() {
    robot = robot.place([0,1,'north']);
    robot = robot.place([5,3,'west']);
    expect(robot.isPlaced).to.be.true;
    expect(robot.position).to.deep.equal({x: 0, y: 1});
    expect(robot.direction).to.equal('north');
  });

  it('If asked, it should correctly replace the robot ', function() {
    robot = robot.place([0,1,'north']);
    robot = robot.move();
    robot = robot.place([2,2,'east']);
    expect(robot.position).to.deep.equal({x: 2, y: 2});
    expect(robot.direction).to.equal('east');

  });


  it('It should make a move correctly when a move command is issued', function() {
    robot = robot.place([0,1,'east']);
    robot = robot.move();
    expect(robot.position).to.deep.equal({x: 1, y: 1});
  });

  it('It should take a turn correctly when a turn command is issued', function() {
    robot = robot.place([0,1,'east']);
    robot = robot.turn('left');
    expect(robot.direction).to.equal('north');
  });

  it('Current position & direction shold be reported when a report instruction is issued', function() {
    stub = sinon.stub(console, 'log');
    robot = robot.place([0,1,'east']);
    robot = robot.report();
    robot = robot.move();
    robot = robot.report();

    expect(stub.called).to.be.true;
    expect(stub.callCount).to.equal(2);
    expect(stub.getCall(0).args[0].split(' ')[1]).to.equal('0,1,EAST');
    expect(stub.getCall(1).args[0].split(' ')[1]).to.equal('1,1,EAST');
    stub.restore();
  });

  it('should ignore all instructions before the first place instruction', function() {
    robot = robot.turn('left');
    robot = robot.move();
    robot = robot.place([0,0,'south']);
    expect(robot.position).to.deep.equal({x: 0, y: 0});
    expect(robot.direction).to.equal('south');
  });

  it('should ignore all instructions that would make it fall off the board', function() {
    robot = robot.place([4,4,'north']);
    robot = robot.move();
    robot = robot.turn('right');
    robot = robot.move();
    expect(robot.position).to.deep.equal({x: 4, y: 4});
    expect(robot.direction).to.equal('east');

  });

  it('should correctly run a series of parsed instructions', function() {
    stub = sinon.stub(console, 'log');
    robot.runInstructions([
      {
        command: 'place',
        args: [0, 0, 'north']
      }, {
        command: 'move'
      }, {
        command: 'report'
      }
    ]);
    expect(robot.position).to.deep.equal({x: 0, y: 1});
    expect(robot.direction).to.equal('north');
    expect(stub.called).to.be.true;
    expect(stub.getCall(0).args[0].split(' ')[1]).to.equal('0,1,NORTH');
    stub.restore();
  });
});
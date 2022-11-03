const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const puzzlesAndSolutions = require('../controllers/puzzle-strings');
let solver = new Solver();

suite('Unit Tests', () => {
    suite('Validate puzzle strings',function(){
        test('Invalidate string length 80',function(){
            assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926'),'String length should be 81 characters');
        });
        test('Invalidate string with invalid characters',function(){
            assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1k.16..!.926914.37.'),'invalid characters');
        });
        test('validate correct strings',function(){
            assert.equal(solver.validate(puzzlesAndSolutions[0][0]),'valid string');
        });
    });
    suite('validate row placements', function(){
        test('Handle invalid row placement',function(){
            assert.isFalse(solver.checkRowPlacement(puzzlesAndSolutions[0][0],'C',3,5));
        });
        test('Handle valid row placement',function(){
            assert.isTrue(solver.checkRowPlacement(puzzlesAndSolutions[0][0],'C',3,8));
        });
    });

    suite('validate column placements', function(){
        test('Handle invalid column placement',function(){
            assert.isFalse(solver.checkColPlacement(puzzlesAndSolutions[0][0],'C',3,6));
        });
        test('Handle valid column placement',function(){
            assert.isTrue(solver.checkColPlacement(puzzlesAndSolutions[0][0],'C',3,8));
        });
    })
    suite('validate region placements', function(){
        test('Handle invalid region placement',function(){
            assert.isFalse(solver.checkRegionPlacement(puzzlesAndSolutions[0][0],'C',3,1));
        });
        test('Handle valid region placement',function(){
            assert.isTrue(solver.checkRegionPlacement(puzzlesAndSolutions[0][0],'C',3,8));

        });
    })
    suite('Pass strings to solver', function(){
        test('invalid string fails the solver',function(){
            assert.equal(solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..168...926914.37.'),'not solvable');
        });
        test('Valid string passes the solver',function(){
            assert.notEqual(solver.solve(puzzlesAndSolutions[0][0]),'not solvable');
        });
        
    })
    suite('Return solutions', function(){
        test('Return solution for incomplete puzzle',function(){
            for (let i=0; i<puzzlesAndSolutions.length; i++) {
                assert.equal(solver.solve(puzzlesAndSolutions[i][0]),puzzlesAndSolutions[i][1])
            } 
        });
    })
    
});

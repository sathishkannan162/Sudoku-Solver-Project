const chai = require('chai');
const SudokuSolver = require('../controllers/sudoku-solver.js');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const puzzlesAndSolutions = require('../controllers/puzzle-strings');
let solver;

suite('Unit Tests', () => {
    suite('Validate puzzle strings',function(){
        test('Invalidate string length 80',function(){
            assert.equal(SudokuSolver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926'),'String should 81 characters');
        });
        test('Invalidate string with invalid characters',function(){
            assert.equal(SudokuSolver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1k.16..!.926914.37.'),'invalid characters');
        });
        test('validate correct strings',function(){
            assert.equal(SudokuSolver.validate(puzzlesAndSolutions[0][0]),'valid string');
        });
    });
    suite('validate row placements', function(){
        test('Handle invalid row placement',function(){

        });
        test('Handle valid row placement',function(){

        });
    });

    suite('validate column placements', function(){
        test('Handle invalid column placement',function(){

        });
        test('Handle valid column placement',function(){

        });
    })
    suite('validate region placements', function(){
        test('Handle invalid region placement',function(){

        });
        test('Handle valid region placement',function(){

        });
    })
    suite('Pass strings to solver', function(){
        test('invalid string fails the solver',function(){

        });
        test('Valid string passes the solver',function(){

        });
        
    })
    suite('Return solutions', function(){
        test('Return solution for incomplete puzzle',function(){

        });
        
    })
    
});

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
            assert.isFalse(SudokuSolver.checkRowPlacement(puzzlesAndSolutions[0][0],C,3,5));
        });
        test('Handle valid row placement',function(){
            assert.isTrue(SudokuSolver.checkRowPlacement(puzzlesAndSolutions[0][0],C,3,8));
        });
    });

    suite('validate column placements', function(){
        test('Handle invalid column placement',function(){
            assert.isFalse(SudokuSolver.checkColplacement(puzzlesAndSolutions[0][0],C,3,6));
        });
        test('Handle valid column placement',function(){
            assert.isTrue(SudokuSolver.checkColplacement(puzzlesAndSolutions[0][0],C,3,8));
        });
    })
    suite('validate region placements', function(){
        test('Handle invalid region placement',function(){
            assert.isFalse(SudokuSolver.checkRegionPlacement(puzzlesAndSolutions[0][0],C,3,1));
        });
        test('Handle valid region placement',function(){
            assert.isTrue(SudokuSolver.checkRegionPlacement(puzzlesAndSolutions[0][0],C,3,8));

        });
    })
    suite('Pass strings to solver', function(){
        test('invalid string fails the solver',function(){
            assert.equal(SudokuSolver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..168...926914.37.'),'not solvable');
        });
        test('Valid string passes the solver',function(){
            assert.notEqual(SudokuSolver.solve(puzzlesAndSolutions[0][0]),'not solvable');
        });
        
    })
    suite('Return solutions', function(){
        test('Return solution for incomplete puzzle',function(){
            assert.equal(puzzlesAndSolutions[0][0],puzzlesAndSolutions[0][1]);
        });
    })
    
});

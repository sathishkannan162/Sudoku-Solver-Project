'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    if (
      req.body.puzzle !== '' &&
      req.body.coordinate !== '' &&
      req.body.value !== '' &&
      req.body.hasOwnProperty('puzzle') &&
      req.body.hasOwnProperty('coordinate') &&
      req.body.hasOwnProperty('value')
    ) {
      if (/^[a-f]\d$/i.test(req.body.coordinate)) {
        if (/^[\.\d]*$/.test(req.body.puzzle)) {
          if (req.body.puzzle.length == 81) {
            if (/^\d$/.test(req.body.value)) {
              // parse coordinate
              let coordinates = [...req.body.coordinate];
              let strPos = solver.getPosInString(coordinates[0],coordinates[1]);
              if (/\d/.test(req.body.puzzle[strPos])) {
                // req.body.puzzle[solver.getPosInString(coordinates[0],coordinates[1])] == '.'
                let newPuzzle = req.body.puzzle.slice(0,strPos)+'.'+req.body.puzzle.slice(strPos+1);
                req.body.puzzle = newPuzzle;
              }
              let conflict = solver.checkConflict(
                req.body.puzzle,
                coordinates[0],
                coordinates[1],
                req.body.value
              );
              if (conflict.length == 0) {
                res.json({
                  valid: true,
                });
              } else {
                res.json({
                  valid: false,
                  conflict: conflict,
                });
              }
            } else {
              res.json({
                error: 'Invalid value',
              });
            }
          } else {
            res.json({
              error: 'Expected puzzle to be 81 characters long',
            });
          }
        } else {
          res.json({
            error: 'Invalid characters in puzzle',
          });
        }
      } else {
        res.json({
          error: 'Invalid coordinate',
        });
      }
    } else {
      res.json({
        error: 'Required field(s) missing',
      });
    }
  });

  app.route('/api/solve').post((req, res) => {
    
    if (req.body.puzzle !== '' && req.body.hasOwnProperty('puzzle')) {
      if (/^[\.\d]*$/.test(req.body.puzzle)) {
        if (req.body.puzzle.length == 81) {
          let solution = solver.solve(req.body.puzzle);
          if (solution === 'not solvable') {
            res.json({
              error: 'Puzzle cannot be solved',
            });
          } else {
            res.json({
              solution: solver.solve(req.body.puzzle),
            });
          }
        } else {
          res.json({
            error: 'Expected puzzle to be 81 characters long',
          });
        }
      } else {
        res.json({
          error: 'invalid characters in puzzle',
        });
      }
    } else {
      res.json({
        error: 'Required field missing',
      });
    }
  });
};

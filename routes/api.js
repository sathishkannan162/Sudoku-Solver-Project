'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {});

  app.route('/api/solve').post((req, res) => {
    console.log(req.body);
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

class SudokuSolver {
  validate(puzzleString) {
    if (/^[\d\.]*$/.test(puzzleString)) {
      if (puzzleString.length == 81) {
        return 'valid string'
      } else {
        return 'String length should be 81 characters'
      }
    } else {
      return 'invalid characters'
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver

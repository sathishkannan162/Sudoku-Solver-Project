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
  getRowNum(letter) {
    let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    return rows.indexOf(letter.toLowerCase()) + 1
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rowNum = this.getRowNum(row)
    // note string postions start from index 0 and slice slices start index and leaves end index.
    // They nullify in calculations
    let startNum = (rowNum - 1) * 9
    let rowValues = puzzleString.slice(startNum, startNum + 9)
    return !rowValues.includes(value)
  }

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver

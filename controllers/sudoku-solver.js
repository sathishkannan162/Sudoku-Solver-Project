class SudokuSolver {
  validate(puzzleString) {
    if (/^[\d\.]*$/.test(puzzleString)) {
      if (puzzleString.length == 81) {
        return 'valid string';
      } else {
        return 'String length should be 81 characters';
      }
    } else {
      return 'invalid characters';
    }
  }
  getRowNum(letter) {
    let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return rows.indexOf(letter.toLowerCase()) + 1;
  }
  getColValues(puzzleString, col) {
    let colValues = [];
    for (let i = 0; i < 9; i++) {
      // col -1 is used as index starts from zero.
      colValues.push(puzzleString[i * 9 + (col - 1)]);
    }
    return colValues.join('');
  }

  getRegionNum(row, col) {
    let rowNum = this.getRowNum(row);
    return [Math.ceil(rowNum / 3), Math.ceil(col / 3)];
  }

  getRegionValues(puzzleString, reg) {
    // note puzzleString starts with index 0
    let regColVals = puzzleString.slice((reg[0] - 1) * 3 * 9, reg[0] * 3 * 9);
    let regValues = [];
    for (let i = 0; i < 3; i++) {
      regValues.push(regColVals[9*i+(reg[1]-1)*3],regColVals[9*i+(reg[1]-1)*3+1],regColVals[9*i+(reg[1]-1)*3+2])
    }
    return regValues.join('');
    }

  checkRowPlacement(puzzleString, row, column, value) {
    let rowNum = this.getRowNum(row);
    // note string postions start from index 0 and slice slices start index and leaves end index.
    // They nullify in calculations
    let startNum = (rowNum - 1) * 9;
    let rowValues = puzzleString.slice(startNum, startNum + 9);
    return !rowValues.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    let colValues = this.getColValues(puzzleString, column);
    return !colValues.includes(value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let regVals = this.getRegionValues(puzzleString,this.getRegionNum(row,column));
    return !regVals.includes(value);
  }

  solve(puzzleString) {}
}

module.exports = SudokuSolver;

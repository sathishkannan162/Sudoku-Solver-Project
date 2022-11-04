const { threadId } = require('worker_threads');

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
    let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    return rows.indexOf(letter.toLowerCase()) + 1;
  }
  getRowName(num) {
    let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    return rows[num - 1].toUpperCase();
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
      regValues.push(
        regColVals[9 * i + (reg[1] - 1) * 3],
        regColVals[9 * i + (reg[1] - 1) * 3 + 1],
        regColVals[9 * i + (reg[1] - 1) * 3 + 2]
      );
    }
    return regValues.join('');
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rowNum = this.getRowNum(row);
    // note string postions start from index 0 and slice slices start index and leaves end index.
    // They nullify in calculations
    let startNum = (rowNum - 1) * 9;
    let rowValues = puzzleString.slice(startNum, startNum + 9);
    return !rowValues.includes(value.toString());
  }

  checkColPlacement(puzzleString, row, column, value) {
    let colValues = this.getColValues(puzzleString, column);
    return !colValues.includes(value, toString());
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let regVals = this.getRegionValues(
      puzzleString,
      this.getRegionNum(row, column)
    );
    return !regVals.includes(value.toString());
  }

  checkPlacement(puzzleString, row, col, value) {
    //try to use nested if statements if the anded statements affects performance
    if (
      this.checkColPlacement(puzzleString, row, col, value) &&
      this.checkRowPlacement(puzzleString, row, col, value) &&
      this.checkRegionPlacement(puzzleString, row, col, value)
    ) {
      return true;
    }
    return false;
  }

  solve(puzzleString) {
    let solved = [...puzzleString];
    let possibleNums = [];

    for (let i = 0; i < puzzleString.length; i++) {
      let row = this.getRowName(Math.ceil((i + 1) / 9));
      let col = (i % 9) + 1;
      if (solved[i] != '.') {
        continue;
      }
      for (let j = 1; j < 10; j++) {
        if (this.checkPlacement(solved.join(''), row, col, j.toString())) {
          possibleNums.push(j);
        }
      }
      if (possibleNums.length != 0) {
        for (let k = 0; k < possibleNums.length; k++) {
          solved[i] = possibleNums[k].toString();
          let sol = this.solve(solved.join(''));
          if (
            sol === 'not solvable' &&
            solved[i] === possibleNums[possibleNums.length - 1].toString()
          ) {
            return 'not solvable';
          }
          if (sol !== 'not solvable') {
            return sol;
          }
        }
      } else {
        return 'not solvable';
      }
    }
    return solved.join('');
  }
}

module.exports = SudokuSolver;

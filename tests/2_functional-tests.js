const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
let puzzlesAndSolutions = require('../controllers/puzzle-strings');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  suite('POST /api/solve => ', function () {
    test('POST with valid puzzle string', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle: puzzlesAndSolutions[0][0],
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'solution');
          assert.match(res.body.solution, /\d{81}/);
          assert.equal(res.body.solution, puzzlesAndSolutions[0][1]);
          done();
        });
    });
    test('POST with missing puzzle string', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({})
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Required field missing');
          done();
        });
    });
    test('POST with invalid characters in puzzle', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle:
            '..9..5.1.85.4..!.2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'invalid characters in puzzle');
          done();
        });
    });
    test('POST with string incorrect length', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle:
            '..9..5.1.85.4...2432......1...69.83.9.....6.62.71..1945....4.37.4.3..6..',
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(
            res.body.error,
            'Expected puzzle to be 81 characters long'
          );
          done();
        });
    });
    test('POST with puzzle not solvable', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle:
            '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9..8...1945....4.37.4.3..6..',
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Puzzle cannot be solved');
          done();
        });
    });
  });
  suite('POST /api/check => ', function () {
    test('POST with valid placement with no conflicts', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: 'A2',
          value: 3,
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'valid');
          assert.isTrue(res.body.valid);
          done();
        });
    });
    suite(
      'POST api/check with valid placement with one placement conflicts',
      function () {
        test('POST api/check with valid placement with only column conflicts', function (done) {
          chai
            .request(server)
            .post('/api/check')
            .send({
              puzzle: puzzlesAndSolutions[0][0],
              coordinate: 'A2',
              value: 7,
            })
            .end(function (err, res) {
              if (err) {
                console.log(err);
              }
              assert.equal(res.status, 200);
              assert.property(res.body, 'valid');
              assert.property(res.body, 'conflict');
              assert.isArray(res.body.conflict);
              assert.equal(res.body.conflict.length, 1);
              assert.isFalse(res.body.valid);
              assert.include(res.body.conflict, 'column');
              done();
            });
        });

        test('POST api/check with valid placement with only row conflicts', function (done) {
          chai
            .request(server)
            .post('/api/check')
            .send({
              puzzle: puzzlesAndSolutions[0][0],
              coordinate: 'b1',
              value: 7,
            })
            .end(function (err, res) {
              if (err) {
                console.log(err);
              }
              assert.equal(res.status, 200);
              assert.property(res.body, 'valid');
              assert.property(res.body, 'conflict');
              assert.isArray(res.body.conflict);
              assert.equal(res.body.conflict.length, 1);
              assert.isFalse(res.body.valid);
              assert.include(res.body.conflict, 'row');
              done();
            });
        });

        test('POST api/check with valid placement with only region conflicts', function (done) {
          chai
            .request(server)
            .post('/api/check')
            .send({
              puzzle: puzzlesAndSolutions[0][0],
              coordinate: 'B1',
              value: 5,
            })
            .end(function (err, res) {
              if (err) {
                console.log(err);
              }
              assert.equal(res.status, 200);
              assert.property(res.body, 'valid');
              assert.property(res.body, 'conflict');
              assert.isArray(res.body.conflict);
              assert.equal(res.body.conflict.length, 1);
              assert.isFalse(res.body.valid);
              assert.include(res.body.conflict, 'region');
              done();
            });
        });
      }
    );
    test('POST with valid placement with multiple placement conflicts', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: 'B5',
          value: 5,
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'valid');
          assert.property(res.body, 'conflict');
          assert.isArray(res.body.conflict);
          assert.equal(res.body.conflict.length, 2);
          assert.isFalse(res.body.valid);
          assert.include(res.body.conflict, 'region');
          assert.include(res.body.conflict, 'column');
          done();
        });
    });
    test('POST with valid placement with all placement conflicts', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: 'B5',
          value: 3,
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'valid');
          assert.property(res.body, 'conflict');
          assert.isArray(res.body.conflict);
          assert.equal(res.body.conflict.length, 3);
          assert.isFalse(res.body.valid);
          assert.include(res.body.conflict, 'region');
          assert.include(res.body.conflict, 'column');
          assert.include(res.body.conflict, 'row');
          done();
        });
    });
    suite('POST with missing required fields', function () {
      test('POST with valid placement missing puzzle field', function (done) {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: 'B5',
            value: 3,
          })
          .end(function (err, res) {
            if (err) {
              console.log(err);
            }
            assert.equal(res.status, 200);
            assert.property(res.body, 'error');
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
          });
      });
      test('POST with valid placement missing value field', function (done) {
        chai
          .request(server)
          .post('/api/check')
          .send({
            puzzle: puzzlesAndSolutions[0][0],
            coordinate: 'B5',
          })
          .end(function (err, res) {
            if (err) {
              console.log(err);
            }
            assert.equal(res.status, 200);
            assert.property(res.body, 'error');
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
          });
      });
      test('POST with valid placement missing coordinate field', function (done) {
        chai
          .request(server)
          .post('/api/check')
          .send({
            puzzle: puzzlesAndSolutions[0][0],
            value: 3,
          })
          .end(function (err, res) {
            if (err) {
              console.log(err);
            }
            assert.equal(res.status, 200);
            assert.property(res.body, 'error');
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
          });
      });
    });
    test('POST with invalid string characters', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16..a.926914.37.',
          coordinate: 'B5',
          value: 3,
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid characters in puzzle');
          done();
        });
    });
    test('POST with incorrect string length', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16...926914.37.',
          coordinate: 'B5',
          value: 3,
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(
            res.body.error,
            'Expected puzzle to be 81 characters long'
          );
          done();
        });
    });
    test('POST with invalid placement coordinate', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: 'k3',
          value: 3,
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid coordinate');
          done();
        });
    });
    test('POST with invalid placement value', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: 'B5',
          value: 20,
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid value');
          done();
        });
    });
    test('POST with valid placement value but value already present in puzzle, no conflicts', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: 'c5',
          value: 6,
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'valid');
          assert.isTrue(res.body.valid);
          done();
        });
    });
    test('POST with valid placement value but value already present in puzzle, one conflict', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: 'c5',
          value: 4,
        })
        .end(function (err, res) {
          if (err) {
            console.log(err);
          }
          assert.equal(res.status, 200);
          assert.property(res.body, 'valid');
          assert.property(res.body, 'conflict');
          assert.isFalse(res.body.valid);
          console.log(res.body);
          assert.isArray(res.body.conflict);
          assert.equal(res.body.conflict.length, 1);
          assert.include(res.body.conflict, 'column');
          done();
        });
    });
  });
});

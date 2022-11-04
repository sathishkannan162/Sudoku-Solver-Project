const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
let puzzlesAndSolutions = require('../controllers/puzzle-strings');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('POST /api/solve => ', function () {
    test('POST with valid puzzle string', function (done) {
      assert.fail();
      done();
    });
    test('POST with missing puzzle string', function (done) {
      assert.fail();
      done();
    });
    test('POST with invalid characters in puzzle', function (done) {
      assert.fail();
      done();
    });
    test('POST with string incorrect length', function (done) {
      assert.fail();
      done();
    });
    test('POST with puzzle not solvable', function (done) {
      assert.fail();
      done();
    });
  });
  suite('POST /api/check => ', function () {
    test('POST with valid placement with no conflicts', function (done) {
      assert.fail();
      done();
    });
    test('POST with valid placement with one placement conflicts', function (done) {
      assert.fail();
      done();
    });
    test('POST with valid placement with multiple placement conflicts', function (done) {
      assert.fail();
      done();
    });
    test('POST with valid placement with all placement conflicts', function (done) {
      assert.fail();
      done();
    });
    test('POST with missing required fields', function (done) {
      assert.fail();
      done();
    });
    test('POST with invalid string characters', function (done) {
      assert.fail();
      done();
    });
    test('POST with incorrect string length', function (done) {
      assert.fail();
      done();
    });
    test('POST with invalid placement coordinate', function (done) {
      assert.fail();
      done();
    });
    test('POST with invalid placement value', function (done) {
      assert.fail();
      done();
    });
  });
});

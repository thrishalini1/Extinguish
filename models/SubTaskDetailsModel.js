const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  subtaskId: {
    type: String,
    required: true
  },
  stockName: {
    type: String,
    required: true
  },
  pid: {
    type: Number,
    required: true
  },
  batchNo: {
    type: Number,
    required: true
  },
  mfgDate: {
    type: Date,
    required: true
  },
  expDate: {
    type: Date,
    required: true
  },
  noOfCases: {
    type: Number,
    required: true
  },
  pieces: {
    type: Number,
    required: true
  },
  outer: {
    type: Number,
    required: true
  }
});

const Subtask = mongoose.model('Subtask', subtaskSchema);


const subtaskData = [
  {
    subtaskId: 'SUB001',
    stockName: 'Stock A',
    pid: 123,
    batchNo: 456,
    mfgDate: new Date('2022-01-01'),
    expDate: new Date('2023-12-31'),
    noOfCases: 10,
    pieces: 100,
    outer: 5
  },
  {
    subtaskId: 'SUB002',
    stockName: 'Stock B',
    pid: 789,
    batchNo: 101,
    mfgDate: new Date('2022-03-15'),
    expDate: new Date('2024-06-30'),
    noOfCases: 5,
    pieces: 50,
    outer: 2
  }
];



module.exports = Subtask;

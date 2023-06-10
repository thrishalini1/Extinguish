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

module.exports = Subtask;

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  model: {
    type: String
  },
  license: {
    type: String
  },
  reservations: {
    type: Array
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
});

module.exports = mongoose.model('Car', carSchema);

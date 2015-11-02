var mongoose = require('mongoose');
Schema = mongoose.Schema;
mongoose.connect('localhost:27017/mydb');

var User = new Schema({
  firstname: {
    type: String,
    required: true,
    unique: true
  },
  lastname: {
    type: String,
    required: true,
    unique: true
  },
  userRole: {
    type: String,
    ref: 'Role'
  }
});

var Role = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  }
});

var Document = new Schema({
  title: {
    type: String,
    required: true
  },
  createdAt: String,
  accessibleTo: {
    type: String,
    required: true,
    ref: 'Role'
  },
  date: {
    type: Date,
    default: new Date()
  }

});

module.exports = {
  User: mongoose.model('User', User),
  Role: mongoose.model('Role', Role),
  Document: mongoose.model('Document', Document)
};

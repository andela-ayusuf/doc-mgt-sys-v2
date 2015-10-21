var mongoose = require('mongoose');
Schema = mongoose.Schema;

var userSchema = new Schema({
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

var roleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  }
});

var documentSchema = new Schema({
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

mongoose.model('User', userSchema);
mongoose.model('Role', roleSchema);
mongoose.model('Document', documentSchema);

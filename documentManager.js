require('./schema');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var Document = mongoose.model('Document');


// this method creates a new user
exports.createUser = function(first, last, position) {
  return Role.findOne({title: position}).then(function(role, err) {
    if (role === []) {
      return Role.create({title: position});
    }
    else {
      return role;
    }
  }).then(function(res, err) {
    return User.create({
      firstname: first,
      lastname: last,
      userRole: position
    }).then(function(user, err) {
      return user;
    });
  });
};

// this method returns all users
exports.getAllUsers = function() {
  return User.find({}, function(err, users) {
    if (err) {
      return err;
    }
    else {
      return users;
    }
  });
};

// this method creates a new role
exports.createRole = function(position) {
  return Role.create({title: position}, function(err, role) {
    if (err) {
      return err;
    }
    else {
      return role;
    }
  });
};

// this method return all roles
exports.getAllRoles = function() {
  return Role.find({}, function(err, roles) {
    if (err) {
      return err;
    }
    else {
      return roles;
    }
  });
};

// this function return the date, used by createDocument()
currentDay = function() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  return dd+'-'+mm+'-'+yyyy;
};

// this method creates a new document
exports.createDocument = function(title, position) {
  return Role.findOne({title: position}).then(function(role, err) {
    if (!role) {
      return Role.create({title: position});
    } 
    else {
      return role;
    }
  }).then(function(role, err) {
    return Document.create({
      title: title,
      createdAt: currentDay(),
      accessibleTo: position
    }).then(function(doc, err) {
      return doc;
    });
  });
};

// this method returns all docuemnts
exports.getAllDocuments = function(limit) {
  return Document.find().sort({date: 'desc'})
  .limit(limit).exec(function(err, docs) {
    if (err) {
      return err;
    }
    else {
      return docs;
    }
  });
};

// this method returns all document accessible to a role according to the date of creation
exports.getAllDocumentsByRole = function(role, limit) {
  return Document.find({accessibleTo: role})
  .sort({date: 'desc'})
  .limit(limit).exec(function(err, docs) {
    if (err) {
      return err;
    }
    else {
      return docs;
    }
  });
};

// this method returns documents created on a particular day
exports.getAllDocumentsByDate = function(date, limit) {
  return Document.find({createdAt: date})
  .limit(limit).then(function(docs, err) {
    if (err) {
      return err;
    }
    else {
      return docs;
    }
  });
};

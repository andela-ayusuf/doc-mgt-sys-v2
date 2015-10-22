require('./schema');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var Document = mongoose.model('Document');

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
currentDay = function() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  return dd+'-'+mm+'-'+yyyy;
};

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

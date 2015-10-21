var dmsCtrl = require('./documentManager');
require('./schema');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var Document = mongoose.model('Document');
mongoose.connect('localhost:27017/myTestDb');

describe('User', function() {

  beforeEach(function(done) {
    User.remove({}, function() {
      Role.remove({}, function() {
        dmsCtrl.createUser('Kanye', 'West', 'Rapper').then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      Role.remove({}, function() {
        done();
      });
    });
  });

  it('validates that a new user created is unique.', function(done) {
    User.find({
      firstname: 'Kanye'
    }).then(function(user) {
      expect(user.length).toBe(1);
      done();
    });
  });

  it('should validate that a new user created has a role defined.', function(done) {
    User.find({
      firstname: 'Kanye'
    }).then(function(user) {
      expect(user[0].userRole).toBeDefined();
      done();
    });
  });

  it('should validate that a new user created both first and last names.', function(done) {
    User.find({
      firstname: 'Kanye'
    }).then(function(user) {
      expect(user[0].firstname).toBe('Kanye');
      expect(user[0].lastname).toBe('West');
      done();
    });
  });

  it('should validate that all users are returned when getAllUsers is called.', function(done) {
    dmsCtrl.createUser('Beyonce', 'Knowles', 'Singer').then(function() {
      dmsCtrl.getAllUsers().then(function(users) {
        expect(users.length).toBe(2);
        done();
      });
    });
  });

});

describe('Role', function() {
  beforeEach(function(done) {
    Role.remove({}, function() {
      dmsCtrl.createRole('Actor').then(function() {
        done();
      });
    });
  });

  afterEach(function(done) {
    Role.remove({}, function() {
      done();
    });
  });

  it('should validate that a new role created has a unique title.', function(done) {
    Role.find({
      title: 'Actor'
    }).then(function(role) {
      expect(role.length).toBe(1);
      done();
    });
  });


  it('should validate that all roles are returned when getAllRoles is called.', function(done) {
    dmsCtrl.createRole('Actress').then(function() {
      dmsCtrl.getAllRoles().then(function(roles) {
        expect(roles.length).toBe(2);
        done();
      });
    });
  });

});

describe('Document', function() {
  beforeEach(function(done) {
    Document.remove({}, function() {
      Role.remove({}, function() {
        dmsCtrl.createDocument('Tales by the moonlight', 'Children').then(function(doc) {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    Document.remove({}, function() {
      Role.remove({}, function() {
        done();
      });
    });
  });

  it('should validate that a new user document created has a published date defined.', function(done) {
    Document.find({
      title: 'Tales by the moonlight'
    }).then(function(docs) {
      expect(docs[0].date).toBeDefined();
      done();
    });
  });

  it('should validate that all documents are returned, limited by a specified number, when getAllDocuments is called.', function(done) {
    dmsCtrl.createDocument('Aladin and the 40 thieves', 'Children').then(function() {
      dmsCtrl.createDocument('Cinderella', 'Children').then(function() {
        dmsCtrl.getAllDocuments(2).then(function(docs) {
          expect(docs.length).toBe(2);
          done();
        });
      });
    });
  });

  // it('should validate that all documents are returned in order of their published dates, starting from the most recent when getAllDocuments is called.', function(done) {
  //   dmsCtrl.createDocument('12 years a slave', 'Everybody').then(function() {
  //     dmsCtrl.createDocument('Kings speech', 'Everybody').then(function() {
  //         dmsCtrl.getAllDocuments().then(function(documents) {
  //           console.log(documents[0])
  //           console.log(documents[1])
  //           console.log(documents[2])
  //           expect(documents.length).toBe(3);
  //           expect(documents[1].date).toBeDefined();
  //           expect(documents[2].date).toBeDefined();
  //           // expect(documents[0].date).toBeGreaterThan(documents[1].date);
  //           done();
  //       });
  //     });
  //   });
  // });

});

describe('Search', function() {
  beforeEach(function(done) {
    Document.remove({}, function() {
      Role.remove({}, function() {
        dmsCtrl.createDocument('Karishika part 1', 'PG18').then(function(doc) {
          dmsCtrl.createDocument('Karishika part 2', 'PG18').then(function(doc) {
            done();
          });
        });
      });
    });
  });

  afterEach(function(done) {
    Document.remove({}, function() {
      Role.remove({}, function() {
        done();
      });
    });
  });

  it('validates that all documents, limited by a specified number and ordered by published date, that can be accessed by a specified role, are returned when getAllDocumentsByRole is called.', function(done) {
    dmsCtrl.getAllDocumentsByRole('PG18', 2).then(function(docs) {
      expect(docs.length).toEqual(2);
      done();
    });
  });

  it('validates that all documents, limited by a specified number, that were published on a certain date, are returned when getAllDocumentsByDate is called.', function(done) {
      var dateTime = new Date();
      var dd = dateTime.getDate();
      var mm = dateTime.getMonth()+1;
      var yyyy = dateTime.getFullYear();
      var today = dd+'-'+mm+'-'+yyyy;

    dmsCtrl.getAllDocumentsByDate(today, 2).then(function(docs) {
      expect(docs[0].createdAt).toBe(today);
      done();
    });
  });

});


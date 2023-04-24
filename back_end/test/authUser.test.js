const assert = require('assert');
//const { authUser, registerUser, updateUser, getUserProfile, verifPassword } = require('../controllers/user');
const User = require('../models/user');
const mongoose = require('mongoose');
//const { MongoMemoryServer } = require('mongodb-memory-server');
const authUser = require('../controllers/user').authUser;
const registerUser = require('../controllers/user').registerUser;

describe('userController', function() {

  /*let mongoServer;

  before(async function() {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async function() {
    await mongoose.disconnect();
    await mongoServer.stop();
  });*/
    // Test de la fonction registerUser
    describe('#registerUser()', function() {
        it('devrait créer un nouvel utilisateur et renvoyer un objet utilisateur avec un token', async function(done) {
          const req = { body: { email: 'test@test.com', password: 'test1234', name: 'Test', lastName: 'User', country: 'France' } };
          const res = { 
            status: function(status) {
              assert.strictEqual(status, 201);
              return {
                json: function(data) {
                  assert.strictEqual(data.success, true);
                  assert.strictEqual(data.user.email, req.body.email);
                  assert.ok(data.token.startsWith('Bearer '));
                }
              };
            }
          };
          await registerUser(req, res);
          const user = await User.findOne({ email: req.body.email });
          assert.ok(user);
          done();
        });
    
        it('devrait renvoyer un objet error si l\'utilisateur existe déjà', async function(done) {
          const req = { body: { email: 'test@test.com', password: 'test1234', name: 'Test', lastName: 'User', country: 'France' } };
          const res = { 
            status: function(status) {
              assert.strictEqual(status, 400);
              return {
                send: function(data) {
                  assert.strictEqual(data.success, false);
                  assert.strictEqual(data.error, 'User already exists');
                }
              };
            }
          };
          const user = new User(req.body);
          await user.save();
          await registerUser(req, res);
          done();
        });
      });

  // Test de la fonction authUser
  describe('#authUser()', function() {
    it('devrait renvoyer un objet utilisateur avec un token si l\'authentification est réussie', async function(done) {
      const req = { body: { email: 'test@test.com', password: 'test1234' } };
      const res = { 
        json: function(data) {
          assert.strictEqual(data.success, true);
          assert.strictEqual(data.user.email, req.body.email);
          assert.ok(data.token.startsWith('Bearer '));
        }
      };
      const user = new User({ email: req.body.email, password: 'test1234' });
      await user.save();
      await authUser(req, res);
      done();
    });

    it('devrait renvoyer un objet success:false si l\'authentification est échouée', async function() {
      const req = { body: { email: 'test@test.com', password: 'wrongpassword' } };
      const res = { 
        json: function(data) {
          assert.strictEqual(data.success, false);
        }
      };
      await authUser(req, res);
      done();
    });
  });



})
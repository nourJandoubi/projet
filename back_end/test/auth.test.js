const assert = require('assert');
const sinon = require('sinon');
const { authUser } = require('../controllers/user');
const User = require('../models/user');

describe('User Controller', function() {
  describe('authUser', function() {
    it('should authenticate user and send login mail', async function() {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password'
        }
      };
      const user = new User({
        email: 'test@example.com',
        password: 'password',
        name: 'Test User'
      });
      sinon.stub(User, 'findOne').returns(user);
      sinon.stub(user, 'matchPassword').returns(true);
      const res = {
        json: sinon.spy()
      };
      await authUser(req, res);
      sinon.assert.calledWith(res.json, {
        success: true,
        token: sinon.match.string,
        user: {
          email: 'test@example.com',
          name: 'Test User'
        }
      });
      User.findOne.restore();
      user.matchPassword.restore();
    });

    it('should return error for invalid credentials', async function() {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'wrongpassword'
        }
      };
      sinon.stub(User, 'findOne').returns(null);
      const res = {
        json: sinon.spy()
      };
      await authUser(req, res);
      sinon.assert.calledWith(res.json, {
        success: false
      });
      User.findOne.restore();
    });
  });
});

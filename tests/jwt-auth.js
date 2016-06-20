var expect = require('expect.js');

describe('JWT AUTH', function() {

    var jwt = null;

    before(function(done) {
        request(url)
            .post('/api/login')
            .send({ _id: user1._id, password: user1.password })
            .end(function(err, res) {
                token = res.body.token;
                done();
            });
    });

    it('should get a valid token for user: user1', function(done) {
        request('/api/todo')
            .set('Authorization', token)
            .expect(200, done);
    });
});



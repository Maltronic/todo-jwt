var mongoose = require('mongoose');

beforeEach(function (done) {
    function setup() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {
            });
        }
        return done();
    }

    if (mongoose.connection.readyState === 0) {
        mongoose.connect(config.db_test, function (err) {
            if (err) {
                throw err;
            }
            return setup();
        });
    } else {
        return setup();
    }


});
afterEach(function (done) {
    mongoose.disconnect();
    return done();
});

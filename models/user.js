var mongoose = require("mongoose"),
    bcrypt = require("bcryptjs"),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toObject: {
        virtuals: true
    }, toJSON: {
        virtuals: true
    }
});

UserSchema.pre("save", function(next) {
    var user = this;
    if(this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if(err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (pass, cb) {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
        if(err) {
            return cb(err);
        }
        cb(null, isMatch);
    })
};

module.exports = mongoose.model("User", UserSchema);

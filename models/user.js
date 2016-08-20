var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;

var User = new Schema({
    username: String,
    password: String,
    question: String,
    answer: String,
    name: {
        type: String,
        default: ''
    },
    resume: {
      type: String,
      default: ''
    },
    about: {
      type: String,
      default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;

var User = new Schema({
    username: {
      type: String,
      index: { unique: true },
      required: true
    },
    password: String,
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
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
    },
    telegram: {
      type: String,
      default: '',
      index: { unique: true },
      sparse: true
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

var path = require('path'),
    mongoose = require('mongoose'),
    should = require('should'),
    prepare = require('./setup.js');
mongoose.connect('mongodb://localhost/contacts-test');

var TodoItemChema = new mongoose.Schema({
    primarycontactnumber: {type: String, index: {unique: true}},
    firstname: String,
    lastname: String,
    title: String,
    company: String,
    jobtitle: String,
    othercontactnumbers: [String],
    primaryemailaddress: String,
    emailaddresses: [String],
    groups: [String]
});

var TodoItem = mongoose.model('Contact', contactSchema);

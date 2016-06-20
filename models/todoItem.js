var mongoose = require('mongoose');

var TodoItemSchema = mongoose.Schema({
    text: { type: String, required: true },
    done: Boolean,
    createdAt: String, // Date type?
    doneAt: String, // Date type?
    priority: Number
    // user: User
});

module.exports = mongoose.model('TodoItem', TodoItemSchema);

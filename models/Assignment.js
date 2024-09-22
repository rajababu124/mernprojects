const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  task_description: {
    type: String,
    trim: true,
  },
  task_title : {
    type : String,
    required : [true, "Task Title is required"],
    trim : true,
    minlength : [3, "Title must have minimum length of three"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to User model
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;

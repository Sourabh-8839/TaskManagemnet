import mongoose, { Schema } from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },

  description: { type: String, required: true },

  priority: {
    type: String,
    default: 'normal',
    enum: ['high', 'medium', 'low'],
  },
  stage: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  team: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  date: { type: Date, default: new Date() },
});

export const Task = mongoose.model('Task', TaskSchema);

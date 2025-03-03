import mongoose  from "mongoose"
const ticketSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAuth', // Assuming you have a User model
    required: true,
  },
  attachments: [
    {
      filename: String,
      path: String,
    },
  ],
});

// Middleware to update the updatedAt field before saving
ticketSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
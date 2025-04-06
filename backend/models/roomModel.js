import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  text: { type: String, required: true },
  results: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      time: { type: Number },
      accuracy: { type: Number },
    },
  ],
});

const Room = mongoose.model('Room', roomSchema);

export default Room;

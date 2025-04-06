import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
});

const User = mongoose.model('User', userSchema);

export default User;

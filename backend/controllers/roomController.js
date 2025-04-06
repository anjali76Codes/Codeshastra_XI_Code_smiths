import Room from '../models/roomModel.js';
import User from '../models/userModel.js';

// Create a new room
export const createRoom = async (req, res) => {
  const { text } = req.body;
  const code = Math.random().toString(36).substring(7); // Generate a random code

  const room = new Room({ code, text, players: [], results: [] });
  await room.save();

  res.json({ code });
};

// Join an existing room
export const joinRoom = async (req, res) => {
  const { code, username } = req.body;
  
  let user = await User.findOne({ username });
  if (!user) {
    user = new User({ username });
    await user.save();
  }

  const room = await Room.findOne({ code }).populate('players');
  
  if (!room) {
    return res.status(404).send('Room not found');
  }

  // Add user to room's players list
  room.players.push(user._id);
  await room.save();

  user.rooms.push(room._id);
  await user.save();

  res.json({ text: room.text, code: room.code });
};

// Submit test result
export const submitResult = async (req, res) => {
  const { code, username, time, accuracy } = req.body;

  const room = await Room.findOne({ code }).populate('players');
  const user = await User.findOne({ username });

  if (!room || !user) {
    return res.status(404).send('Room or user not found');
  }

  room.results.push({ user: user._id, time, accuracy });
  await room.save();

  res.json({ success: true, results: room.results });
};

// Get room details
export const getRoomDetails = async (req, res) => {
  const { code } = req.params;
  const room = await Room.findOne({ code }).populate('players').populate('results.user');
  
  if (!room) {
    return res.status(404).send('Room not found');
  }

  res.json(room);
};

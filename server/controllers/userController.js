import User from '../models/User.js';

const formatFriends = (friends) => {
  const formatedFriends = friends?.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    }
  );
  return formatedFriends;
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json({ status: 'success', user });
  } catch (err) {
    res.status(404).json({ status: 'error', message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const friends = await Promise.all(
      user.friends.map((friend) => User.findById(friend))
    );
    const formatedFriends = formatFriends(friends);
    res.status(200).json({ status: 'success', formatedFriends });
  } catch (err) {
    res.status(404).json({ status: 'error', message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((friend) => friend != friendId);
      friend.friends = friend.friends.filter((friend) => friend != userId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((friend) => User.findById(friend))
    );
    const formatedFriends = formatFriends(friends);
    res.status(200).json({ status: 'success', formatedFriends, user });
  } catch (err) {
    res.status(404).json({ status: 'error', message: err.message });
  }
};

import { User } from "../models/authModel.js";
import { FriendRequest } from "../models/friendRequestModel.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;

    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json("Friend request already sent");
    }

    const friendRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId,
    });

    await friendRequest.save();
    res.status(200).json("Friend request sent successfully");
  } catch (error) {
    res.status(500).json("Failed to send friend request");
  }
};

export const handleFriendRequest = async (req, res) => {
  try {
    const { status } = req.body;
    const requestId = req.params.id;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json("Request not found");
    }

    if (friendRequest.receiver.toString() !== req.id) {
      return res.status(403).json("You are not authorized");
    }

    friendRequest.status = status;
    await friendRequest.save();

    if (status === "accepted") {
      const receiver = await User.findById(friendRequest.receiver);
      const sender = await User.findById(friendRequest.sender);

      receiver.friends.push(sender._id);
      sender.friends.push(receiver._id);

      await receiver.save();
      await sender.save();

      res.status(200).json("Friend request accepted");
    } else {
      res.status(200).json("Friend request rejected");
    }
  } catch (error) {
    res.status(500).json("Failed to handle friend request");
  }
};
export const getPendingFriendRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      receiver: req.id,
      status: "pending",
    }).populate("sender", "fullname email");

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json("Failed to fetch friend requests");
  }
};

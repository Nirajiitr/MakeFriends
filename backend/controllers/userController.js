import { User } from "../models/authModel.js";
import { FriendRequest } from "../models/friendRequestModel.js";

export const getOtherUser = async (req, res) => {
  const LoggedInUser = req.id;

  try {
     
    const loggedInUserData = await User.findById(LoggedInUser).select("friends");
    
    const pendingRequests = await FriendRequest.find({
      $or: [{ sender: LoggedInUser }, { receiver: LoggedInUser }],
      status: "pending",
    });
    const pendingRequestIds = pendingRequests.flatMap((request) => [
      request.sender.toString(),
      request.receiver.toString(),
    ]);
    const friends = loggedInUserData?.friends || []; 
    const OtherUsers = await User.find({
      _id: { $nin: [LoggedInUser, ...friends, ...pendingRequestIds] }, 
    }).select("-Password");

    if (!OtherUsers || OtherUsers.length === 0) {
      return res.status(404).json({ message: "No other users found" });
    }

    res.status(200).json(OtherUsers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.id;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const unFriend = async (req, res) => {
  const id = req.params.id;
  const currentUserId = req.id;

  if (!id || id === currentUserId)
    return res.status(403).json("Action forbidden");

  try {
    const unfriendUser = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    if (!unfriendUser || !currentUser) {
      return res.status(404).json("User not found");
    }

    if (!currentUser.friends.includes(id)) {
      return res.status(400).json("User is not your friend");
    }

    currentUser.friends = currentUser.friends.filter(
      (friendId) => friendId.toString() !== id
    );
    unfriendUser.friends = unfriendUser.friends.filter(
      (friendId) => friendId.toString() !== currentUserId
    );

    await currentUser.save();
    await unfriendUser.save();

    res.status(200).json("Unfriended successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const getFriends = async (req, res) => {
  const userId = req.id;

  try {
    const user = await User.findById(userId).populate(
      "friends",
      "fullname email phone hobbies"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const recommendedFriends = async (req, res) => {
  const userId = req.id;

  try {
    
    const currentUser = await User.findById(userId).populate("friends");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentFriendsIds = currentUser.friends.map((friend) => friend._id.toString());

    const pendingRequests = await FriendRequest.find({
      $or: [{ sender: userId }, { receiver: userId }],
      status: "pending",
    });

    const pendingRequestIds = pendingRequests.flatMap((request) => [
      request.sender.toString(),
      request.receiver.toString(),
    ]);

    const exclusionList = [...currentFriendsIds, ...pendingRequestIds, currentUser._id.toString()];

    const recommendedUsers = await User.find({
      _id: { $nin: exclusionList },
      $or: [
        { hobbies: { $in: currentUser.hobbies } }, 
        { friends: { $in: currentFriendsIds } },  
      ],
    })
      .select("fullname email phone hobbies")
      
    res.status(200).json(recommendedUsers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const currentUserId = req.id;

  if (currentUserId) {
    try {
      const user = await User.findByIdAndUpdate(currentUserId, req.body, {
        new: true,
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own Profile");
  }
};

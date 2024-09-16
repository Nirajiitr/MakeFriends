import express from "express";
import isAuthenticated from "../middlewere/isAuthenticated.js"
import { getFriends, getOtherUser, getUserProfile,  recommendedFriends,  unFriend, updateUser } from "../controllers/userController.js";
import { getPendingFriendRequests, handleFriendRequest, sendFriendRequest } from "../controllers/friendRequestController.js";

const router = express.Router();

router.get("/", isAuthenticated, getOtherUser);
router.get("/profile", isAuthenticated, getUserProfile);
router.get("/friends", isAuthenticated, getFriends);
router.get("/recommended/friends", isAuthenticated, recommendedFriends);
router.get("/friend-requests", isAuthenticated, getPendingFriendRequests); 

router.put("/:id/unfriend", isAuthenticated, unFriend);
router.put("/profile", isAuthenticated, updateUser);

router.post("/:id/add-friend", isAuthenticated, sendFriendRequest); 
router.put("/:id/handle-request", isAuthenticated, handleFriendRequest);

export default router;

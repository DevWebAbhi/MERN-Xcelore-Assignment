const express = require("express");
const registrationModel = require("../models/registrationModel");
const addedUserModel = require("../models/addedUser");

const adminRouter = express.Router();

// Helper function to check admin authorization
const isAdmin = (userType) => userType === "admin";

// GET all users
adminRouter.get("/", async (req, res) => {
    try {
        const { email, userType } = req.body;
        if (!isAdmin(userType)) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const user = await registrationModel.findOne({ email, userType });
        if (user) {
            const users = await registrationModel.find({});
            return res.status(200).send({ message: "Successful", users });
        }

        return res.status(401).send({ message: "Unauthorized" });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
});

// ADD a new user
adminRouter.post("/add", async (req, res) => {
    try {
        const { email, userType } = req.body;
        if (!isAdmin(userType)) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const user = await registrationModel.findOne({ email, userType });
        if (user) {
            const newUserDoc = await addedUserModel(user);
            await newUserDoc.save();
            return res.status(201).send({ message: "User added successfully" });
        }

        return res.status(401).send({ message: "Unauthorized" });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
});

adminRouter.patch("/makeadmin", async (req, res) => {
    try {
        const { email, userType,userId, updateData } = req.body;
        if (!isAdmin(userType)) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const user = await registrationModel.findOne({ email, userType });
        if (user) {
            await registrationModel.findByIdAndUpdate(userId, updateData, { new: true });
            return res.status(200).send({ message: "User updated successfully" });
        }

        return res.status(401).send({ message: "Unauthorized" });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
});

// DELETE a user
adminRouter.delete("/delete", async (req, res) => {
    try {
        const { email, userType, userId } = req.body;
        if (!isAdmin(userType)) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const user = await registrationModel.findOne({ email, userType });
        if (user) {
            await registrationModel.findByIdAndDelete(userId);
            return res.status(200).send({ message: "User deleted successfully" });
        }

        return res.status(401).send({ message: "Unauthorized" });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
});

// UPDATE a user
adminRouter.put("/update", async (req, res) => {
    try {
        const { email, userType, userId, updateData } = req.body;
        if (!isAdmin(userType)) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const user = await registrationModel.findOne({ email, userType });
        if (user) {
            await registrationModel.findByIdAndUpdate(userId, updateData, { new: true });
            return res.status(200).send({ message: "User updated successfully" });
        }

        return res.status(401).send({ message: "Unauthorized" });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
});

module.exports = adminRouter;

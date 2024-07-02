const mongoose = require("mongoose");

const addedUserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    userType: { type: String, required: true, enum: ["admin", "user"], default: "user" }
}, {
    timestamps: true
});

const addedUserModel = mongoose.model("AddedUserser", addedUserSchema);

module.exports = addedUserModel;

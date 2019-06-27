import mongoose from "mongoose";
import passport from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    avatarUrl : String,
    facebookId : Number,
    githubId : Number
});

UserSchema.plugin(passport, {usernameField: "email"});

UserSchema.statics.serializeUser = () =>(user, cb) => cb(null, user.id);

// eslint-disable-next-line func-names
UserSchema.statics.deserializeUser = function(){
    const self = this;
    return (id, cb) => self.findById(id, cb);
};

const model = mongoose.model("User", UserSchema);

export default model;
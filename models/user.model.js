import mongoose from "mongoose";

const userSchema = mongoose.Schema(

    {
        name:{
            type:String,
            required:[true,'Please add a name']
        },

        email: {
            type:String,
            required:[true,'plz add an email'],
            unique:true
        },

        password:{
            type:String,
            required:[true,'plz add a password']

        },
        role:{
            type:String,
            required:[true,'plz add a role']

        }



    },
    {
        timestamps: true
    }
);

const user = mongoose.model("user", userSchema);
export default user;
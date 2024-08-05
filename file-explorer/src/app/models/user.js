import { model, default as mongoose } from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            select: false,
        }
    },
    { timestamps: true }
);

const User = mongoose.models.User || model('User', userSchema);

export { User };
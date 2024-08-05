import { model, default as mongoose } from "mongoose";

const fileSchema = mongoose.Schema(
    {
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        },
        name: {
            type: String,
        },
        content: {
            type: String,
        }
    },
    { timestamps: true }
);

const File = mongoose.models.File || model('File', fileSchema);

export { File };
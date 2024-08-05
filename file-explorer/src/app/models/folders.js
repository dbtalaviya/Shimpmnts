import { model, default as mongoose } from "mongoose";

const folderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        child: [
            {
                type: {
                    type: String,
                    enum: ['File', 'Folder'],
                    required: true
                },
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    refPath: 'child.type'  
                }
            }
        ],
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Folder',  
            default: null  
        }
    },
    {
        timestamps: true
    }
);

const Folder = mongoose.models.Folder || model('Folder', folderSchema);

export { Folder };

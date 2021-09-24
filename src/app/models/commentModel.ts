import { model, Schema, Document } from 'mongoose';

export interface IComment {
    episode_id: string;
    message: string;
}

interface CommentDocument extends IComment, Document {}

const commentModel = new Schema<CommentDocument>(
    {
        episode_id: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);
const Comment = model('Comment', commentModel);
export default Comment;

import { Request, Response, NextFunction } from 'express';
import Comment, { IComment } from '../models/commentModel';
import { BAD_REQUEST, SERVER_ERROR, NOT_FOUND, SUCCESS } from '../types/statusCode';
import { UPDATE_SUCCESS, DELETED_SUCCESS, NOT_FOUND as N_FOUND } from '../types/messages';

interface Icomment {
    create: (req: Request, res: Response, next: NextFunction) => any;
    edit: (req: Request, res: Response, next: NextFunction) => any;
    delete: (req: Request, res: Response, next: NextFunction) => any;
}

export default class commentController implements Icomment {
    public async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { message, episode_id }: IComment = req.body;
            const response = await Comment.create({ message, episode_id });
            return res.status(SUCCESS).json({ response });
        } catch (error: any) {
            return res.status(SERVER_ERROR).json({ message: error.message });
        }
    }

    public async edit(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { message, episode_id }: IComment = req.body;
            const response = await Comment.updateOne(
                { episode_id: episode_id },
                { $set: { message } }
            );
            if (response.nModified === 1)
                return res.status(SUCCESS).json({ message: UPDATE_SUCCESS });
            return res.status(NOT_FOUND).json({ message: N_FOUND });
        } catch (error: any) {
            return res.status(SERVER_ERROR).json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { episode_id } = req.params;
            const response = await Comment.deleteOne({ episode_id: episode_id });
            if (response.n === 1) return res.status(SUCCESS).json({ message: DELETED_SUCCESS });
            return res.status(NOT_FOUND).json({ message: N_FOUND });
        } catch (error: any) {
            return res.status(SERVER_ERROR).json({ message: error.message });
        }
    }
}

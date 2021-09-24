import express from 'express';
import commentController from '../controller/commentController';

const router = express.Router();

const controller = new commentController();

router.post('/', controller.create);

router.put('/edit', controller.create);

router.delete('/:episode_id', controller.create);

export default router;

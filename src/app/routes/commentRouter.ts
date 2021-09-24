import express from 'express';
import commentController from '../controller/commentController';

const router = express.Router();

const controller = new commentController();

router.get('/', controller.show);

router.post('/', controller.create);

router.put('/edit', controller.edit);

router.delete('/:episode', controller.delete);

export default router;

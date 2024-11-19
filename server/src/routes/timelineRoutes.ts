import express from 'express';
import { generateTimeline } from '../controllers/timelineController';

const router = express.Router();

router.post('/generate-timeline', generateTimeline);

export default router;


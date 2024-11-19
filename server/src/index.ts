import express from 'express';
import cors from 'cors';
import timelineRoutes from './routes/timelineRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', timelineRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;


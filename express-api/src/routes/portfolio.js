import { Router } from 'express';
const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Portfolio list – placeholder' });
});

export default router;

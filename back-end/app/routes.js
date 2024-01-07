const express = require('express');
const idx = require('idx');

const router = express.Router();

const {
  getUserById,
  getUserActivityById,
  getUserAverageSession,
  getUserPerformance,
  getUserDailyGoalCompletion,
} = require('./models');

const {
  handleNoUserData,
} = require('./middleware');

router.get('/user/:id', (req, res) => {
  const userId = idx(req, _ => _.params.id);
  const userData = getUserById(Number(userId));

  return handleNoUserData(res, userData);
});

router.get('/user/:id/activity', (req, res) => {
  const userId = idx(req, _ => _.params.id);
  const userData = getUserActivityById(Number(userId));

  return handleNoUserData(res, userData);
});

router.get('/user/:id/average-sessions', (req, res) => {
  const userId = idx(req, _ => _.params.id);
  console.log('userId:', userId);
  const userData = getUserAverageSession(Number(userId));
  console.log('userData:', userData);

  if (userData === null) {
    res.status(404).json({ message: 'User not found' });
  } else {
    res.json(userData);
  }
});

router.get('/user/:id/performance', (req, res) => {
  const userId = idx(req, _ => _.params.id);
  const userData = getUserPerformance(Number(userId));

  return handleNoUserData(res, userData);
});

router.get('/user/:id/daily-goal-completion', async (req, res) => {
  const userId = idx(req, _ => _.params.id);
  const userData = await getUserDailyGoalCompletion(Number(userId));

  return handleNoUserData(res, userData);
});

module.exports = router;

import { Router } from 'express';
import { isAdminRoute, protectRoute } from '../middleware/auth.middleware.js';
import {
  createTask,
  dashboardStatistics,
  deleteTask,
  getAllAdminTask,
  getTask,
  getTaskList,
  updateTask,
} from '../controller/task.controller.js';

const router = Router();

router.post('/create', protectRoute, isAdminRoute, createTask);
router.get('/getAllTask', protectRoute, isAdminRoute, getAllAdminTask);
router.get('/dashboard', protectRoute, dashboardStatistics);
router.get('/get-task', protectRoute, getTaskList);
router.delete('/deletetask/:id', protectRoute, isAdminRoute, deleteTask);
router.get('/:id', protectRoute, getTask);
router.put('/update/:id', protectRoute, isAdminRoute, updateTask);

export default router;

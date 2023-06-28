import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getTasks, 
         getTaskById, 
         createTask, 
         updateTask, 
         deleteTasks } from '../controllers/tasks.controller.js'; 
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js'; 

const router = Router();

router.get('/tasks', authRequired, getTasks);

router.post(
    '/tasks', 
    authRequired, 
    validateSchema(createTaskSchema), 
    createTask);

router.delete('/tasks/:id', authRequired, deleteTasks);

router.get('/tasks/:id', authRequired, getTaskById);

router.put('/tasks/:id', authRequired, updateTask);


export default router; 


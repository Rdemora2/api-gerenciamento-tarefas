const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const taskController = require('../../controllers/taskController');
const taskService = require('../../services/taskService');

jest.mock('../../services/taskService');

const app = express();
app.use(bodyParser.json());

app.post('/task', taskController.createTask);
app.get('/tasks', taskController.getAllTasks);
app.get('/task/:taskId', taskController.getTaskById);
app.put('/task/:taskId', taskController.updateTask);
app.delete('/task/:taskId', taskController.deleteTask);
app.get('/tasks/status/:status', taskController.getTasksByStatus);

describe('taskController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createTask', () => {
        it('should return 403 for unauthorized user', async () => {
            const response = await supertest(app)
                .post('/task')
                .send({ title: 'Test', description: 'Test description', status: 'pending' })
                .expect('Content-Type', /json/)
                .expect(403);

            expect(response.body).toEqual({ error: 'Usuário não autenticado' });
        });
    });
});


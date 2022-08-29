const express = require('express');
const router = express.Router(); 

const Task = require('../models/Task'); 

router.get('/', async (_req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
})

router.get('/:id', async (req, res) =>{
    const tasks = await Task.findById(req.params.id);
    res.json(tasks);
});

router.post('/', async(req, res) => {
    const task = new Task(req.body);
    await task.save();
    console.log(task);
    res.json({
        status: 'Task created'
    });
})


router.put('/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
            res.json({
            status: 'Task updated'
        });
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Task deleted'
    })
})

module.exports = router; //! para que pueda usar las rutas

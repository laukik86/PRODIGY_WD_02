const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// CREATE
router.post('/', async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.status(201).send(emp);
});

// READ
router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.send(employees);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.send({ message: 'Employee deleted' });
});

module.exports = router;

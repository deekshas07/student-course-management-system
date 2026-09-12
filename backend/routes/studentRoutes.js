// routes/studentRoutes.js
const express = require('express');
const router  = express.Router();
const Student = require('../models/Student');

router.get('/',       async (req, res) => res.json(await Student.getAll()));
router.get('/:id',    async (req, res) => res.json(await Student.getById(req.params.id)));
router.post('/',      async (req, res) => res.json(await Student.create(req.body)));
router.put('/:id',    async (req, res) => res.json(await Student.update(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json(await Student.delete(req.params.id)));

module.exports = router;

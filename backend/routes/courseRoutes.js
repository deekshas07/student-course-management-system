// routes/courseRoutes.js
const express = require('express');
const router  = express.Router();
const Course  = require('../models/Course');

router.get('/',       async (req, res) => res.json(await Course.getAll()));
router.get('/:id',    async (req, res) => res.json(await Course.getById(req.params.id)));
router.post('/',      async (req, res) => res.json(await Course.create(req.body)));
router.put('/:id',    async (req, res) => res.json(await Course.update(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json(await Course.delete(req.params.id)));

module.exports = router;

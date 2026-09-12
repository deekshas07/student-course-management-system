// routes/attemptRoutes.js
const express               = require('express');
const router                = express.Router();
const StudentCourseAttempt  = require('../models/StudentCourseAttempt');

router.get('/',       async (req, res) => res.json(await StudentCourseAttempt.getAll()));
router.get('/:id',    async (req, res) => res.json(await StudentCourseAttempt.getById(req.params.id)));
router.post('/',      async (req, res) => res.json(await StudentCourseAttempt.create(req.body)));
router.put('/:id',    async (req, res) => res.json(await StudentCourseAttempt.update(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json(await StudentCourseAttempt.delete(req.params.id)));

module.exports = router;

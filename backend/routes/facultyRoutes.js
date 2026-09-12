// routes/facultyRoutes.js
const express = require('express');
const router  = express.Router();
const Faculty = require('../models/Faculty');

router.get('/',       async (req, res) => res.json(await Faculty.getAll()));
router.get('/:id',    async (req, res) => res.json(await Faculty.getById(req.params.id)));
router.post('/',      async (req, res) => res.json(await Faculty.create(req.body)));
router.put('/:id',    async (req, res) => res.json(await Faculty.update(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json(await Faculty.delete(req.params.id)));

module.exports = router;

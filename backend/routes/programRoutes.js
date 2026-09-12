// routes/programRoutes.js
const express = require('express');
const router  = express.Router();
const Program = require('../models/Program');

router.get('/',       async (req, res) => res.json(await Program.getAll()));
router.get('/:id',    async (req, res) => res.json(await Program.getById(req.params.id)));
router.post('/',      async (req, res) => res.json(await Program.create(req.body)));
router.put('/:id',    async (req, res) => res.json(await Program.update(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json(await Program.delete(req.params.id)));

module.exports = router;

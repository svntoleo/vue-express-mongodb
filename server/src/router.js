const express = require('express');
const router = express.Router();
const Character = require('./characterModel');

//GET ALL CHARACTERS
router.get('/', async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET CHARACTER BY ID
router.get('/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        res.json(character);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// CREATE NEW CHARACTER
router.post('/', async (req, res) => {
    const character = new Character({
        name: req.body.name,
        class: req.body.class
    });
    try {
        const newCharacter = await character.save();
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

//UPDATE CHARACTER BY ID
router.patch('/:id', async (req, res) => {
    const character = await Character.findById(req.params.id);
    character.name = req.body.name;
    character.class = req.body.class;
    try {
        const updatedCharacter = await character.save();
        res.status(200).json(updatedCharacter);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

//DELETE CHARACTER BY ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCharacter = await Character.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedCharacter);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;
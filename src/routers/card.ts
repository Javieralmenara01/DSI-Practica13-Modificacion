import express from 'express';
import { Card } from '../models/card.js';
import { User } from '../models/user.js';

export const cardRouter = express.Router();

/**
 * Añadir una tarjeta
 */
cardRouter.post('/cards/:username', (req, res) => {
  /// Buscar el usuario
  User.findOne({ username: req.params.username.toString() }).then((user) => {
    if (!user) {
      res.status(404).send({
        error: 'User not found'
      });
    } else {
      /// Crear una nueva tarjeta
      const card = new Card({
        owner: user._id,
        ...req.body 
      })
      /// Guardar la tarjeta
      card.save().then((card) => {
        card.populate({
          path: 'owner',
          select: ['username']
        }).then(() => {
          res.status(201).send(card);
        }).catch((error) => {
          res.status(500).send(error);
        });
      }).catch((error) => {
        res.status(500).send(error);
      });
    }
  }).catch((error) => {
    res.status(500).send(error);
  })
});

/**
 * Obtener todas las tarjetas
 */
cardRouter.get('/cards/:username', (req, res) => {
  /// Buscar el usuario por su nombre de usuario
  User.findOne({username: req.params.username}).then((user) => {
    if (!user) {
      res.status(404).send({
        error: "User not found"
      });
    } else {
      Card.find({owner: user._id}).populate({
        path: 'owner',
        select: ['username']
      }).then((cards) => {
        if (cards.length !== 0) {
          res.send(cards);
        } else {
          res.status(404).send();
        }
      }).catch((error) => {
        res.status(500).send(error);
      });
    }
  }).catch((error) => {
    res.status(500).send(error);
  });
});

/**
 * Obtener una tarjeta
 */
cardRouter.get('/cards/:username/:id', (req, res) => {
  /// Buscar el usuario por su nombre de usuario
  User.findOne({username: req.params.username}).then((user) => {
    if (!user) {
      res.status(404).send({
        error: "User not found"
      });
    } else {
      Card.findOne({id: req.params.id, owner: user._id}).populate({
        path: 'owner',
        select: ['username']
      }).then((card) => {
        if (card) {
          res.send(card);
        } else {
          res.status(404).send();
        }
      }).catch((error) => {
        res.status(500).send(error);
      });
    } 
  }).catch((error) => {
    res.status(500).send(error);
  });
});

/**
 * Actualizar una tarjeta
 */
cardRouter.patch('/cards/:username/:id', (req, res) => {
  /// Buscar el usuario por su nombre de usuario
  User.findOne({username: req.params.username}).then((user) => {
    if (!user) {
      res.status(404).send({
        error: "User not found"
      });
    } else {
      const allowedUpdates = ['id', 'title', 'manaCost', 'color', 'type', 'rarity', 'rulesText', 'powerToughness', 'loyaltyCounter', 'value'];
      const updates = Object.keys(req.body);
      const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
      
      if (!isValidOperation) {
        res.status(400).send({
          error: 'Invalid updates!'
        });
      } else {
        Card.findOneAndUpdate({id: req.params.id, owner: user._id}, req.body, {new: true}).populate({
          path: 'owner',
          select: ['username']
        }).then((card) => {
          if (card) {
            res.send(card);
          } else {
            res.status(404).send();
          }
        }).catch((error) => {
          res.status(500).send(error);
        });
      }
    }
  }).catch((error) => {
    res.status(500).send(error);
  })
});

/**
 * Eliminar una tarjeta
 */
cardRouter.delete('/cards/:username/:id', (req, res) => {
  /// Buscar el usuario por su nombre de usuario
  User.findOne({username: req.params.username}).then((user) => {
    if (!user) {
      res.status(404).send({
        error: "User not found"
      });
    } else {
      Card.findOneAndDelete({id: req.params.id, owner: user._id}).populate({
        path: 'owner',
        select: ['username']
      }).then((card) => {
        if (card) {
          res.send(card);
        } else {
          res.status(404).send();
        }
      }).catch((error) => {
        res.status(500).send(error);
      });
    }
  }).catch((error) => {
    res.status(500).send(error);
  });
});
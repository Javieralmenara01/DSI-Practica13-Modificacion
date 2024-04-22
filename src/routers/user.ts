import express from 'express';
import { User } from '../models/user.js';
import { Card } from '../models/card.js';

export const userRouter = express.Router();

/**
 * Dar de alta un usuario
 */
userRouter.post('/users', (req, res) => {
  /// Crear un nuevo usuario
  const user = new User(req.body);

  user.save().then((user) => {
    res.status(201).send(user);
  }).catch((error) => {
    res.status(500).send(error);
  })
});

/**
 * Buscar un usuario
 */
userRouter.get('/users', (req, res) => {
  /// Buscar el username en la consulta
  const filter = req.query.username ? { username: req.query.username.toString() } : {};

  User.find(filter).then((users) => {
    if (users.length === 0) {
      res.status(404).send();
    }
    res.send(users);
  }).catch((error) => {
    res.status(500).send(error);
  })
});

/**
 * Modificar un usuario
 */
userRouter.patch('/users', (req, res) => {
  
  if (!req.query.username) {
    res.status(400).send({
      error: 'A username must be provided'
    })
  } else {
    const allowedUpdates = ['name', 'username'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted'
      })
    } else {
      User.findOneAndUpdate( { username: req.query.username.toString() }, req.body, {
        new: true,
        runValidators: true
      }).then((user) => {
        if (!user) {
          res.status(404).send(); 
        } else {
          res.send(user);
        }
      }).catch((error) => {
        res.status(500).send(error);
      })
    }
  }
})

/**
 * Eliminar un usuario
 */
userRouter.delete('/users', (req, res) => {
  
  if (!req.query.username) {
    res.status(400).send({
      error: 'A username must be provided'
    })
  } else {
    User.findOneAndDelete( { username: req.query.username.toString() }).then((user) => {
      if (!user) {
        res.status(404).send(); 
      } else {
        /// Eliminar todas las cartas del usuario antes
        Card.deleteMany({ owner: user._id }).then((result) => {
          if (!result.acknowledged) {
            res.status(500).send();
          } else {
            /// Delete the user
            User.findById(user._id).then((user) => {
              res.send(user);
            });
          }
        });
      }
    }).catch((error) => {
      res.status(500).send(error);
    })
  }
});
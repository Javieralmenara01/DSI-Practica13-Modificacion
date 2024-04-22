import express from 'express';

export const defaultRouter = express.Router();

/**
 * Ruta por defecto en caso de no encontrar un patrón
 */
defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});
import express from 'express';
const router = express.Router();

import { me, photos } from '../context';

export function single(app) {

  // users

  router.get('/me', (req, res) => {
    res.send(me.toLink());
  });

  router.get('/users/:userId', (req, res) => {
    if (req.params.userId === 1) {
      res.send(me);
    } else {
      res.send({});
    }
  });

  // feed

  router.get('/feed/:offset-:limit', (req, res) => {
    const offset = parseInt(req.params.offset);
    const limit = parseInt(req.params.limit);

    const results = photos.feed(offset, limit).map(photo => photo.toLink());
    
    res.send(results);
  });

  router.get('/feed', (req, res) => {
    const results = photos.feed().map(photo => photo.toLink());
    
    res.send(results);
  });

  // photo

  router.get('/photo/:id', (req, res) => {
    const result = photos.single(parseInt(req.params.id));

    if (result) {
      result.author = me.toLink();
    }

    res.send(result);
  });

  app.use('/single', router);
}
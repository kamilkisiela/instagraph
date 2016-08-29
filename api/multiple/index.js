import express from 'express';
const router = express.Router();

import { me, photos } from '../context';

export function multiple(app) {

  // users

  router.get('/me', (req, res) => {
    res.send(me);
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
    
    const results = photos.feed(offset, limit).map(photo => {
      console.log('photo');
      // add author instead of just an id
      photo.author = me;
      return photo;
    });
    
    res.send(results);
  });

  router.get('/feed', (req, res) => {
    const results = photos.feed().map(photo => {
      // add author instead of just an id
      photo.author = me;
      return photo;
    });

    res.send(results);
  });

  // photo

  router.get('/photo/:id', (req, res) => {
    const result = photos.single(parseInt(req.params.id));
    
    if (result) {
      result.author = me;
    }

    res.send(result);
  });

  app.use('/multiple', router);
}
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { graphql } from './graphql';
import { multiple } from './multiple';
import { single } from './single';

const PORT = 4300;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

graphql(app);
multiple(app);
single(app);

app.listen(PORT, () => console.log( // eslint-disable-line no-console
  `API Server is now running on http://localhost:${PORT}`
));
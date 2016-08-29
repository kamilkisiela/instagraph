import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import { schema, resolvers } from './schema';
import { me, photos } from '../context';

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export function graphql(app) {
  app.use('/graphql', apolloExpress((req) => {
    // Get the query, the same way express-graphql does it
    // https://github.com/graphql/express-graphql/blob/3fa6e68582d6d933d37fa9e841da5d2aa39261cd/src/index.js#L257
    const query = req.query.query || req.body.query;
    if (query && query.length > 2000) {
      // None of our app's queries are this long
      // Probably indicates someone trying to send an overly expensive query
      throw new Error('Query too large.');
    }

    return {
      schema: executableSchema,
      context: {
        me,
        photos,
      },
    };
  }));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));
}
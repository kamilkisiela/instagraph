export const schema = [`
  ## Represents a user
  type User {
    id: Int!
    username: String!
    firstname: String!
    surname: String!
    bio: String
    ## relative url of a profile picture
    picture: String!
  }

  ## Represents a photo
  type Photo {
    id: Int!
    createdAt: Float!
    author: User!
    likes: Int!
    liked: Boolean!
    ## relative url of a photo
    url: String!
  }

  type Query {
    ## List of photos
    feed(offset: Int, limit: Int): [Photo]
    
    ## Gets the single photo 
    photo(id: Int!): Photo
    
    ## Currently logged in user
    me: User
  }

  type Mutation {
    likePhoto(id: Int!, value: Boolean!): Photo
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

export const resolvers = {
  Query: {
    feed(_, { type, offset, limit }, context) {
      const protectedLimit = limit < 1 ? 3 : limit;

      return context.photos.feed(offset, protectedLimit);
    },
    photo(_, { id }, context) {
      return context.photos.single(id);
    },
    me(_, __, context) {
      return context.me;
    },
  },
  Mutation: {
    likePhoto(_, { id, value }, context) {
      const photo = context.photos.single(id);
      
      if (photo) {
        photo.likes += (value ? 1 : -1) * 1;
        photo.liked = !!value;
      }

      return photo;
    },
  },
  Photo: {
    author(_, __, context) {
      return context.me;
    }
  }
};

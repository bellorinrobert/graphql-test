import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import type { ListenOptions } from 'net';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
    #graphql
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        title: String
        author: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book]
    }
    type Query {
        hello(name: String): String!
    }
`;

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  // Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
      hello: ( _, {name} ) => `Hello ${name}!`
    },
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
export const createApolloServer = async (listenOptions: ListenOptions = { port: 4000 }) => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  
    const { url } = await startStandaloneServer(server, { listen: listenOptions });
  
    // return the server instance and the url the server is listening on
    return { server, url };
  };

  if (process.env.NODE_ENV !== 'test') {
    const { url } = await createApolloServer();
    console.log(`🚀 Query endpoint ready at ${url}`);
  }
  
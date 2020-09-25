export const resolvers = {
  Query: {
    folder(_parent, _args, _context, _info) {
      return { 
          id: 1, 
          name: "custom logic", 
        };
    },
  },
};

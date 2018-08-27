const createDatabase = require('./db');

async function seed({ databaseUrl, pizzas }) {
  const { Pizza } = await createDatabase(databaseUrl);

  await Promise.all(
    pizzas.map(async pizza => {
      const record = await Pizza.findOne({ name: pizza.name });
      if (!record) {
        return new Promise(cb => Pizza.create(pizza, cb));
      }
    }),
  );
}

seed({
  databaseUrl: 'mongodb://127.0.0.1:27017/pizzabox',
  pizzas: [
    {
      name: 'Pizza 1',
      likesCount: 0,
      priceCents: 1000,
    },
    {
      name: 'Pizza 2',
      likesCount: 0,
      priceCents: 2000,
    },
    {
      name: 'Pizza 3',
      likesCount: 0,
      priceCents: 2000,
    },
  ],
}).then(() => process.exit());

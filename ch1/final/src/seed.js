const createDatabase = require('./db');

async function seed({ databaseUrl, pizzas }) {
  const db = await createDatabase(databaseUrl);

  await Promise.all(
    pizzas.map(async pizza => {
      const record = await db.findOne(db.Pizza, { name: pizza.name });

      if (record) {
        await db.update(db.Pizza, { id: record._id, ...pizza });
      } else {
        await db.create(db.Pizza, pizza);
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

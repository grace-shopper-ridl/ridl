'use strict';

const { db } = require('../server/db');
const { User, Product } = require('../server/db/models');

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const productData = [
  {
    name: 'Shields, Ondricka and Koelpin',
    description: 'visualize plug-and-play supply-chains',
    inventory: 495,
    price: 55768.08
  },
  {
    name: 'Reichel, Hodkiewicz and Crooks',
    description: 'recontextualize sexy models',
    inventory: 671,
    price: 5298.33
  },
  {
    name: 'Watsica and Sons',
    description: 'strategize holistic initiatives',
    inventory: 181,
    price: 64959.63
  },
  {
    name: 'Dickinson and Sons',
    description: 'engineer mission-critical platforms',
    inventory: 519,
    price: 68317.45
  },
  {
    name: 'Stamm-Nienow',
    description: 'whiteboard impactful web-readiness',
    inventory: 834,
    price: 68855.45
  },
  {
    name: 'Emmerich-Harris',
    description: 'brand visionary e-commerce',
    inventory: 689,
    price: 40550.43
  },
  {
    name: 'Hayes, Runte and Gibson',
    description: 'architect front-end communities',
    inventory: 943,
    price: 32919.39
  },
  {
    name: 'Dach, King and Heathcote',
    description: 'exploit B2B schemas',
    inventory: 913,
    price: 16897.03
  },
  {
    name: 'Beer-Metz',
    description: 'synthesize killer ROI',
    inventory: 587,
    price: 37136.02
  },
  {
    name: 'Batz, Miller and Champlin',
    description: 'synergize cutting-edge paradigms',
    inventory: 80,
    price: 27190.53
  },
  {
    name: 'Johnson LLC',
    description: 'engage back-end networks',
    inventory: 231,
    price: 31228.31
  },
  {
    name: "O'Kon, Schmitt and Emmerich",
    description: 'innovate open-source technologies',
    inventory: 149,
    price: 93453.94
  },
  {
    name: 'Reinger, Huel and Casper',
    description: 'orchestrate dynamic channels',
    inventory: 363,
    price: 58107.92
  },
  {
    name: 'Wolf-Wehner',
    description: 'facilitate one-to-one web-readiness',
    inventory: 567,
    price: 49114.07
  },
  {
    name: 'Cummings Inc',
    description: 'redefine magnetic ROI',
    inventory: 67,
    price: 36356.5
  },
  {
    name: 'Erdman Group',
    description: 'scale best-of-breed architectures',
    inventory: 897,
    price: 39396.74
  },
  {
    name: 'Corkery-Ondricka',
    description: 'embrace visionary action-items',
    inventory: 131,
    price: 52645.41
  },
  {
    name: 'Langworth, Mayert and Barrows',
    description: 'engineer extensible e-services',
    inventory: 20,
    price: 45537.77
  },
  {
    name: 'Rempel Group',
    description: 'orchestrate robust vortals',
    inventory: 117,
    price: 58657.33
  },
  {
    name: 'Rodriguez LLC',
    description: 'implement wireless metrics',
    inventory: 522,
    price: 22223.98
  },
  {
    name: 'Vandervort, Davis and Larson',
    description: 'innovate bricks-and-clicks infrastructures',
    inventory: 814,
    price: 22543.25
  },
  {
    name: 'Hahn-Hettinger',
    description: 'reintermediate interactive mindshare',
    inventory: 112,
    price: 79159.65
  },
  {
    name: 'Windler, Lakin and Boyer',
    description: 'harness sexy e-services',
    inventory: 322,
    price: 65703.78
  },
  {
    name: 'Quitzon LLC',
    description: 'enhance leading-edge eyeballs',
    inventory: 936,
    price: 69107.11
  },
  {
    name: 'Brown, Hane and Hauck',
    description: 'unleash world-class technologies',
    inventory: 684,
    price: 1128.91
  },
  {
    name: 'Paucek Inc',
    description: 'synergize clicks-and-mortar metrics',
    inventory: 718,
    price: 65188.99
  },
  {
    name: 'Mayer-Zboncak',
    description: 'deliver value-added users',
    inventory: 624,
    price: 69413.37
  },
  {
    name: 'Jacobs LLC',
    description: 'recontextualize one-to-one users',
    inventory: 578,
    price: 22538.7
  },
  {
    name: 'Blanda, Auer and Paucek',
    description: 'visualize web-enabled methodologies',
    inventory: 25,
    price: 80012.46
  },
  {
    name: 'Kub and Sons',
    description: 'optimize distributed infomediaries',
    inventory: 554,
    price: 61243.16
  },
  {
    name: 'Bergnaum-Herzog',
    description: 'engage impactful systems',
    inventory: 361,
    price: 14237.65
  },
  {
    name: 'Predovic LLC',
    description: 'harness 24/365 relationships',
    inventory: 861,
    price: 30751.54
  },
  {
    name: 'Keebler LLC',
    description: 'visualize innovative web services',
    inventory: 994,
    price: 9662.62
  },
  {
    name: 'Beier, Upton and Skiles',
    description: 'exploit bleeding-edge technologies',
    inventory: 641,
    price: 63625.75
  },
  {
    name: 'Okuneva-McDermott',
    description: 'deliver efficient synergies',
    inventory: 443,
    price: 47575.95
  },
  {
    name: 'Kuhic, Wyman and Sipes',
    description: 'scale compelling initiatives',
    inventory: 692,
    price: 84374.13
  },
  {
    name: 'Ortiz-Konopelski',
    description: 'drive killer e-business',
    inventory: 547,
    price: 17942.43
  },
  {
    name: 'Gleichner-Bauch',
    description: 'strategize dynamic users',
    inventory: 114,
    price: 67633.38
  },
  {
    name: 'Weissnat, Hagenes and Howell',
    description: 'synthesize global ROI',
    inventory: 99,
    price: 97815.59
  },
  {
    name: 'Koepp-Cruickshank',
    description: 'expedite rich channels',
    inventory: 991,
    price: 55731.31
  },
  {
    name: 'Morar LLC',
    description: 'engineer B2C action-items',
    inventory: 754,
    price: 58840.01
  },
  {
    name: 'Nikolaus, Schmeler and Zieme',
    description: 'synthesize dynamic mindshare',
    inventory: 706,
    price: 5979.43
  },
  {
    name: 'Schimmel-Hyatt',
    description: 'morph B2C initiatives',
    inventory: 92,
    price: 32501.51
  },
  {
    name: 'Schulist Inc',
    description: 'extend virtual communities',
    inventory: 316,
    price: 40287.81
  },
  {
    name: 'Kerluke Group',
    description: 'synthesize enterprise e-markets',
    inventory: 893,
    price: 13668.53
  },
  {
    name: 'Kovacek-Douglas',
    description: 'morph enterprise users',
    inventory: 452,
    price: 91989.37
  },
  {
    name: 'Rath, Gleichner and Stark',
    description: 'e-enable rich e-commerce',
    inventory: 602,
    price: 36254.55
  },
  {
    name: 'Mante-Koss',
    description: 'utilize revolutionary convergence',
    inventory: 337,
    price: 85984.15
  },
  {
    name: 'Hodkiewicz and Sons',
    description: 'maximize collaborative supply-chains',
    inventory: 57,
    price: 37453.84
  },
  {
    name: 'Gutmann, Gibson and Bergstrom',
    description: 'revolutionize interactive communities',
    inventory: 802,
    price: 15508.98
  }
];

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ]);

  const products = await Promise.all(
    productData.map(product => Product.create(product))
  );
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  seed()
    .catch(err => {
      console.error(err);
      process.exitCode = 1;
    })
    .then(() => {
      console.log('closing db connection');
      db.close();
      console.log('db connection closed');
    });
  /*
   * note: everything outside of the async function is totally synchronous
   * The console.log below will occur before any of the logs that occur inside
   * of the async function
   */
  console.log('seeding...');
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

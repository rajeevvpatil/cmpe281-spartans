**This file include some of the MongoDb commands I used for preparing the product catalog  for the DB**

use gamecart

show collections

db.createCollection('games');

db.createCollection('geners');

db.geners.insert({name: 'Adventure'});

db.geners.insert({name: 'Action'});

db.geners.insert({name: 'Sports'});

db.geners.insert({name: 'Racing'});

db.geners.find();

db.games.insert({product_id:'1',name:'Middle-earth: Shadow of War',geners: 'Adventure',description:'Middle-earth: Shadow of War is the second chapter in the story of Talion, the Ranger of the Black Gate. A direct sequel to a hit game Middle-earth: Shadow of Mordor, it expands on every system seen in its predecessor.',price:'46.48',image_url:'https://images.g2a.com/images/211x289/1x1x1/434420ce7693/59d4e81eae653a22840c1af4'});

db.games.insert({product_id:'2',name:'Call of Duty',geners: 'Action',description:'CoD:WWII (PC) abandons some of the present-day mainstays of the first-person shooter genre. There is no health regenerating after several second of hiding behind a chest-high wall.',price:'53.22',image_url:'https://images.g2a.com/images/211x289/1x1x1/a2e89cd782aa/59ea2439ae653ab1342eb187'});

db.games.insert({product_id:'3',name:'Assetto Corsa Steam Key GLOBAL',geners: 'Racing',description:'Assetto Corsa is a next-generation driving simulator for Windows PC which reproduces real-world circuits, as well as road and racing cars',price:'13.00',image_url:'https://images.g2a.com/images/211x289/1x1x1/59f72fb3bd04/59122c56ae653a3bff0545c3'});

db.games.insert({product_id:'4',name:'FIFA 17 Origin Key GLOBAL',geners: 'Sport',description:'In FIFA 17 the new Active Intelligence System allows for a much more accurate simulation of the field of play',price:'23.16',image_url:'https://images.g2a.com/images/211x289/1x1x1/8fb87f26fe4e/5912ce065bafe39930282a4c'});

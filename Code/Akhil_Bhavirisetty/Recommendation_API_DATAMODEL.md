CREATE (:Games {product_id:"1",name:"Cricket",create_date:"2017-11-03"}),(:Games {product_id:"2",name:"FIFA",create_date:"2017-11-03"}),(:Games {product_id:"3",name:"Tennis",create_date:"2017-11-03"})


CREATE (:Games {product_id:"4",name:"Stick_Cricket",create_date:"2017-11-04"})
CREATE (:Games {product_id:"5",name:"Stick_Tennis",create_date:"2017-11-05"})
CREATE (:Games {product_id:"6",name:"Stick_TableTennis",create_date:"2017-11-06"})

CREATE (:Geners {gener_name:"Sports"})


RelationShip between games and geners:

MATCH (g:Games)
MATCH (ge:Geners)
where g.product_id IN["1","2","3"] AND ge.gener_name="Sports"
CREATE (g)-[belongs_to:Belongs_To]->(ge)


Now Creating two Users:

CREATE (:Person {user_id:1,username:"akhil",First_Name:"Akhil",Last_Name:"Bhavirisetty",Location:"San Jose",title:"akhil"}),(:Person {user_id:2,username:"desu",First_Name:"SaiTeja",Last_Name:"Desu",Location:"San Jose",title:"desu"})

Now Creating the order history

MATCH (p:Person {username:"akhil"})
MATCH (g:Games {product_id:"1"})
CREATE (p)-[purchased:Purchased {orderid:1}]->(g)


MATCH (p:Person {username:"desu"})
MATCH (g:Games) 
WHERE g.product_id in ["2","3"]
CREATE (p)-[purchased:Purchased {orderid:1}]->(g)

Recommendations Starts from here:

1. New Products
MATCH (g:Games) RETURN g order by g.create_date DESC LIMIT 5

2. Products you may like (Products which belongs to the same category of the previously purchased products)

MATCH (person:Person)-[:Purchased]->(games)-[:Belongs_To]->(geners:Geners),
         (geners)<-[:Belongs_To]-(cogames:Games)
WHERE person.user_id = "akhil"
RETURN cogames.name


3. Products pruchased by people of same location:


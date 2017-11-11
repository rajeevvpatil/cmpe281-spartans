const express        = require('express');
const bodyParser     = require('body-parser');
const neo4j = require('neo4j-driver').v1;
const app            = express();

const port = 8000;

//This is to parse the body of the http API call
app.use(bodyParser.urlencoded({ extended: true }));

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "password"));

app.listen(port, () => {
    console.log('We are live on ' + port);
});

// This is to fetch the new recommendations

app.get('/new_prod', (req, res) => {
    console.log("Inside new products recommendation")
    const session = driver.session();

    const resultPromise = session.run(
        'MATCH (g:Games) RETURN g order by g.create_date DESC LIMIT 5'
    );

    //Results
    resultPromise.then(result => {
        session.close();
        var response_array =[];
        result.records.forEach(function (record) {
            console.log(record._fields[0].properties);
            response_array.push(record._fields[0].properties);

        });

        res.send(JSON.stringify(response_array));
        driver.close()
    });
});

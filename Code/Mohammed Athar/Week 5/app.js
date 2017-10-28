mongoose.connect('mongodb://localhost/gamecart');

var db = mongoose.connection

app.get('/', function(req,res){
    res.send('App Working');
});

app.get('/api/geners',function(req,res){
Genre.getGeners(function(err,geners){
    if(err){
        throw err;
    }
    res.json(geners);
 });
});

app.post('/api/geners',function(req,res){
    var geners = req.body;
    Genre.addGener(geners,function(err,geners){
        if(err){
            throw err;
        }
        res.json(geners);
     });
    });

app.get('/api/games',function(req,res){
    Games.getGames(function(err,games){
        if(err){
            throw err;
        }
        res.json(games);
     });
    });

app.get('/api/game/:_id',function(req,res){
        Games.getGamesById(req.params._id, function(err,game){
            if(err){
                throw err;
            }
            res.json(game);
         });
        });

app.post('/api/games',function(req,res){
        var games = req.body;
        Games.addGames(games,function(err,games){
            if(err){
                throw err;
            }
             res.json(games);
            });
        });


app.listen(3000);
console.log('Running on port 3000...');

module.exports = function(app,db){
app.post("/signup",(req,res) => {
console.log(req.body);
const login_cred = { username: req.body.username , password: req.body.password , name : req.body.Name };
db.collection('users').insert(login_cred,(err,result)=> {
if(err){
res.send({'error':"An error has occured"});
}
else{
res.send(result.ops[0]);
}
});
});
};

var fs=require('fs');
fs.unlink('sampledoc.txt',function(err){
if (err) throw err;
console.log('File Deleted');
});

const fs = require('fs') 

function list(, 'txt'){

    let result = fs.readdir('path', (process.argv[2]).toString())
    
    console.log(list(result))
}


The fs.readdir() method takes a pathname as its first argument and a
callback as its second. The callback signature is:

   function callback (err, list) { /* ... */ }

where list is an array of filename strings.
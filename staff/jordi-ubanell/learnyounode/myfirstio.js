const fs = require('fs') 

let result = fs.readFileSync(process.argv[2]).toString()

result = result.split('\n')

console.log(result.length-1)
const fs = require("fs");

// fs.readFile (Asynchronous)
fs.readFile('example.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data);
})

console.log("Reading file..."); // This runs before the file is read


// // fs.readFileSync (Synchronous)
// try {
//     const data = fs.readFileSync('example.txt', 'utf-8');
//     console.log(data);
// }
// catch (err) {
//     console.error(err);
// }

// console.log("Reading file..."); // This runs after the file is read


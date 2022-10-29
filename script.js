// console.log("Hello world");

const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 42069;

const server = http.createServer((req, res) => {
    if (req.url === '/'){
        let filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', (error, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
})

// const server = http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     fs.readFile('index.html', function(error, data){
//         if (error){
//             res.writeHead(404);
//             res.write("Error: index.html not found");
//         }else{
//             res.write(data);
//         }
//         res.end();
//     })
// });

server.listen(port, (error) => {
    if (error){
        console.log("An error occured dipshit", error);
    }
    else{
        console.log(`Server is listening on port ${port}`);
    }
})

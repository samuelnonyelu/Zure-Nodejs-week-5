// console.log("Hello world");

const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 42069;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, '.', req.url === '/' ? 'index.html': req.url);
    let contentType = getContentType(filePath) || 'text/html';
    let emptyPagePath = path.join(__dirname, '.', '404.html')
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err){
            if (err.code === 'ENOENT'){
                fs.readFile(emptyPagePath, 'utf8', (err, content) => {
                    res.writeHead(200, {'Content-Type': contentType});
                    res.end(content);
                });
            }else{
                res.writeHead(500);
                res.end('Server error');
            }
        }else if(!err){
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        }
    })
})

const getContentType = (filePath) => {
    let extname = path.extname(filePath);
    if (extname === '.js'){
        return 'text/javascript';
    }else if (extname === '.css'){
        return 'text/css';
    }
}

server.listen(port, (error) => {
    if (error){
        console.log("An error occured dipshit", error);
    }
    else{
        console.log(`Server is listening on port ${port}`);
    }
})

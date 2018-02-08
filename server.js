const http = require('http');
const fs = require('fs');
const port = 8080;

const requestHandler = (request, response) => {
  console.log(request.url, new Date);
  if (request.url === '/') {
    fs.readFile('./index.html', (err, html) => {
      if (err) {
        console.log(err);
      }
      response.writeHeader(200, {'Content-Type': 'text/html'});  
      response.write(html);
      response.end();
    });
  }
  if (request.url === '/planner/') {
    fs.readFile('./index.html', (err, html) => {
      if (err) {
        console.log(err);
      }
      response.writeHeader(200, {'Content-Type': 'text/html'});  
      response.write(html);
      response.end();
    });
  }
  if (request.url.match(/[a-z]+\.js/ig)) {
    fs.readFile(`./${request.url}`, (err, js) => {
      if (err) {
        console.log(err);
      }
      response.write(js);
      response.end();
    });
  }
  if (request.url === '/random') {
    response.writeHeader(200, {'Content-Type': 'text/html'});
    response.end(`${Math.random() * 100}`);
  }
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
  if (err) {
    return console.log(err);
  }
  
  console.log(`server is listening on port ${port}`);
});


const interval = 5000;
let id;
let connections = new Map();

function start() {
  if (id) {return;}
  id = setInterval(() => {
    console.log(Date.now());
    fetch('/random')
      .then(res => {
        console.log(connections.size);
        return res.json();
      })
      .then(res => connections.forEach(connection => connection.postMessage({name: 'notify', payload: res})));
  }, interval);
}

onconnect = function(e) {
  const port = e.ports[0];

  port.onmessage = function(e) {
    if (e.data.name === 'start') {
      connections.set(e.data.payload, port);
      start();
    }
    if (e.data.name === 'stop') {
      connections.delete(e.data.payload);
    }
  };

};


let connected = false;

self.addEventListener('connect', e => {
  
  let id;
  const interval = 5000;

  function start() {
    clearInterval(id);
    id = setInterval(() => {
      console.log(Date.now());
      fetch('/random')
        .then(res => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          let notification = new Notification(`Hi there! ${~~res}`);
        });
    }, interval);
  }  
  
  e.source.addEventListener('message', ev => {
    if (ev.data === 'start') {
      if (connected === false) {
        e.source.postMessage('worker init');
        start();
        connected = true;
      } else {
        e.source.postMessage('worker already inited');
      }
    }
  }, false);
  e.source.start();
}, false);
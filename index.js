let worker = new SharedWorker('worker.js');
worker.port.addEventListener("message", e => {
  console.log(e.data);
}, false);
worker.port.start();
worker.onerror = function(event) {
  console.log(event);
};
worker.port.postMessage("start");

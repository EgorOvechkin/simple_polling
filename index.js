let worker = new SharedWorker('worker.js');
const id = Date.now();
worker.port.addEventListener('message', e => {
  console.log(e.data);
  if (e.data.name === 'notify') {
    let notify = new Notification(`Hi there! ${~~e.data.payload}`, {tag: 'workersNotification'});
    notify.onclick = () => window.open('/planner');
  }
}, false);
worker.port.start();
worker.onerror = function(event) {
  console.log(event);
};
worker.port.postMessage({name: 'start', payload: id});

window.addEventListener('beforeunload', function() {
  worker.port.postMessage({name: 'stop', payload: id});
})

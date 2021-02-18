// The worker is available globally here
//
// for typescript:
// const worker = this as DedicatedWorkerGlobalScope;
//
// and just use it like so "worker.postMessage" "worker.onmessage"
onmessage = e => getData(e.data);

const getData = (n) => {
    const arr = [];
    let i, a, b, c, spike;
    for (i = 0; i < n; i = i + 1) {
      if (i % 100 === 0) {
        a = 2 * Math.random();
      }
      if (i % 1000 === 0) {
        b = 2 * Math.random();
      }
      if (i % 10000 === 0) {
        c = 2 * Math.random();
      }
      if (i % 50000 === 0) {
        spike = 10;
      } else {
        spike = 0;
      }
      arr.push([i, 2 * Math.sin(i / 100) + a + b + c + spike + Math.random()]);
    }
    postMessage(arr);
}


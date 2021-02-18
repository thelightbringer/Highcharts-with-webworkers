function go() {
    const noOfCharts = document.querySelector('#charts').value;
    const noOfPoints = document.querySelector('#points').value;
    const container = document.querySelector('#container');
    container.innerHTML = '';
    // make sure Worker is supported here
    if (window.Worker) {
        spawnWorker(noOfCharts, noOfPoints);
      
    } else {
        alert('No worker support here, weird, it should be supported in IE10 and above 🧐')
    }
}

function spawnWorker(n, p) {
    const container = document.querySelector('#container');
    const workerScriptPath = 'worker.js';
    for(let i=0;i<n;i++) {
        let div = document.createElement('div');
        let w = new Worker(workerScriptPath);
        container.append(div);
        w.onmessage = (e) => {
            Highcharts.chart(div, {
                boost: {
                  useGPUTranslations: true
                },
                title: {
                  text: "Chart with " + e.data.length + " points"
                },
                subtitle: {
                  text: "Using the Boost module"
                },
                tooltip: {
                  valueDecimals: 2
                },
                series: [
                  {
                    data: e.data,
                    lineWidth: 0.5
                  }
                ]
              });
              w.terminate();
        }
        w.postMessage(p);
    }
}
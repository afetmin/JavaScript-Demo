function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let num = Math.floor(Math.random() * 10);
      console.log("生成随机值", num);
      if (num < 5) reject(num);
      resolve(num);
    }, 2000);
  });
}

function retry(fn, times, delay) {
  return new Promise((resolve, reject) => {
    function handle() {
      fn()
        .then(resolve)
        .catch((err) => {
          console.log(`还剩${times}次`);
          if (times === 0) {
            reject(err);
          } else if (times > 0) {
            times--;
            setTimeout(handle, delay);
          }
        });
    }
    handle();
  });
}

retry(fetchData, 5, 300)
  .then(log)
  .catch((err) => console.log(`失败`, err));

function log(num) {
  console.log(`成功， ${num}`);
}

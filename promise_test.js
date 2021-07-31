function wait(delay = 2000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, delay);
  });
}

async function doSomePromise(asyncFn) {
  let resolve;
  try {
    const rs = await asyncFn();
    resolve(rs);
  } catch (e) {
    console.log(e);
  }
  return {
    promise: new Promise((r) => {
      resolve = r;
    }),
  };
}

doSomePromise(wait).promise;

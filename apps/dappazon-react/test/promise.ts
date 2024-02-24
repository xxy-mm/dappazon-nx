const createPromise = (i: number) => {
  return new Promise<number>((res) =>
    setTimeout(() => {
      res(i);
    }, 1000)
  );
};

async function testAwait() {
  const start = Date.now();
  for (let index = 0; index < 10; index++) {
    await createPromise(index);
    console.log(index);
  }
  console.log("await", Date.now() - start);
  return Date.now() - start;
}

function testPromiseAll() {
  const start = Date.now();
  const items: Promise<number>[] = [];
  for (let index = 0; index < 10; index++) {
    items.push(createPromise(index));
    console.log(index);
  }
  return Promise.all(items).then(() => {
    console.log("promise.all", Date.now() - start);
    return Date.now() - start;
  });
}

async function test() {
  const promiseCost = await testPromiseAll();
  const promiseAwait = await testAwait();

  return promiseAwait - promiseCost;
}

test().then((result) => console.log(result));

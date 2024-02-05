export function promise() {
  const btns = document.querySelectorAll('button');

  const promises = [];

  btns.forEach((btn) => {
    const promise = new Promise((res) => {
      btn.addEventListener('click', res);
    });

    promises.push(promise);
  });

  Promise.all(promises).then(() => console.log('All promises were resolved!'));
}

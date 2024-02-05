export function callbacks() {
  const btns = document.querySelectorAll('button');

  const clickedBtns = {};

  btns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      clickedBtns[index] = 'clicked';

      if (Object.keys(clickedBtns).length === btns.length) console.log('All buttons were clicked!');
    });
  });
}

const matches = document.querySelector('.app');
let clickCount = 0;
let firstClicked;
let secondClicked;

function shuffleEmojis() {
  const emojis = Array.from(document.querySelectorAll('.emoji'));
  emojis.forEach((emoji) => {
    emoji.classList.remove('visible');
    emoji.parentElement.classList.remove('matched');
  });

  for (let i = emojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [emojis[i].innerHTML, emojis[j].innerHTML] = [
      emojis[j].innerHTML,
      emojis[i].innerHTML,
    ];
  }
}

document.addEventListener('DOMContentLoaded', shuffleEmojis);

matches.addEventListener('click', (e) => {
  const clickedElement = e.target.closest('.match');

  if (!clickedElement || clickedElement.classList.contains('matched')) {
    return;
  }

  if (clickCount === 0) {
    firstClicked = clickedElement;
    firstClicked.querySelector('.emoji').classList.add('visible');
    clickCount++;
  } else if (clickCount === 1 && clickedElement !== firstClicked) {
    secondClicked = clickedElement;
    secondClicked.querySelector('.emoji').classList.add('visible');
    clickCount++;

    setTimeout(matchCheck, 1000);
  }
});

function matchCheck() {
  if (firstClicked.innerHTML === secondClicked.innerHTML) {
    firstClicked.classList.add('matched');
    secondClicked.classList.add('matched');
  } else {
    firstClicked.querySelector('.emoji').classList.remove('visible');
    secondClicked.querySelector('.emoji').classList.remove('visible');
  }

  clickCount = 0;
  firstClicked = null;
  secondClicked = null;
}

const arr = ['A','B','C','D','E','F','G','H'];
const newArr = [...arr, ...arr]
const score = document.getElementById('score')
// 16 square

const shuffle = (newArr) => {
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const gameBoard =   document.getElementById('gameBoard')

document.addEventListener('DOMContentLoaded', ()=>{
  shuffle(newArr)
  console.log(newArr)
  let firstCard = null;
  let secondCard = null;

  let lockBoard = false
  let matchFound = 0

  score.innerText = matchFound

  newArr.forEach((cardValue, index) => {
    const cardBox = document.createElement('div')
    cardBox.classList.add("card")
    cardBox.dataset.value = cardValue; //store the card value in data sttribute

    const cardName = document.createElement('span')
    cardName.innerText = cardValue
    cardName.classList.add('hidden')
    cardBox.appendChild(cardName)

    gameBoard.appendChild(cardBox)
    cardBox.addEventListener('click', (e)=>{
      handleCardClick(e, index)
    })
  })

  function handleCardClick(e,index){
    cardBox = e.currentTarget

    if (lockBoard){return} // prevent clicking the board
    if(cardBox === firstCard) {return} // Ignore if same card is clicked

    flipCard(cardBox)

    if(!firstCard){
      firstCard = cardBox
    } else {
      secondCard = cardBox
      lockBoard = true; // lock until match is complete
      checkForMatch()

    }
  }
  function flipCard(card) {
    card.classList.add('flipped')
    card.querySelector('span').classList.remove('hidden')
  }

  function checkForMatch(){
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    if(isMatch){
      matchFound++;
      score.innerText = matchFound
      disableCards();
      resetBoard()

      if(matchFound === arr.length){
        setTimeout(() => {
            alert('You Won')
        }, 500);
      }
    }else {
      unflipCards();
    }


  }

  function unflipCards(){
    setTimeout(() => {
      firstCard.classList.remove('flipped')
      secondCard.classList.remove('flipped')
      firstCard.querySelector('span').classList.add('hidden');
      secondCard.querySelector('span').classList.add('hidden');
      resetBoard()
    }, 1000);
  }

  function disableCards(){
    firstCard.removeEventListener('click', handleCardClick)

    secondCard.removeEventListener('click', handleCardClick)

  }

  function resetBoard(){
    [firstCard, secondCard] = [null, null]
    lockBoard = false;
  }


})


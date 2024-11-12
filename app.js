const arr = ['A','B','C','D','E','F','G','H'];
const newArr = [...arr, ...arr]

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

  let firstCard
  let secondCard

  let lockBoard = false
  let matchFound = 0

  newArr.forEach((card) => {
    const cardBox = document.createElement('div')
    cardBox.classList.add("card")
    
    const cardName = document.createElement('span')
    cardName.innerText = card 
    
        cardBox.appendChild(cardName)
        gameBoard.appendChild(cardBox)

    
  })
  
})

function flipCard(card) {
  if (lockBoard){return}
  
}
function generateWinningNumber(min=1,max=100) ({

    let difference = max - min;
    let winningNumber = Math.random();
    
    winningNumber = Math.floor(winningNumber * difference);
    
    winningNumber = winningNumber + min;

    return winningNumber;
})

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
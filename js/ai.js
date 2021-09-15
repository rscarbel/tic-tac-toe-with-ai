const generateSquareChoice = () => {
  let squareChoice = Math.floor(Math.random() * (squares.length));
  let resultingSquare = findDimensionalIndex(squareChoice);


  if (currentBoard[resultingSquare[0]][resultingSquare[1]]) {
    generateSquareChoice()
  } else {
    return squareChoice;
  }
}

function aiPlays (difficulty) {
  if (difficulty === 'easy') {
    aiPlaysEasy();
  } else if (difficulty === 'medium') {
    aiPlaysMedium()
  } else if (difficulty === 'hard') {
    aiPlaysHard();
  } else if (difficulty === 'impossible') {
    aiPlaysImpossible();
  }
};

function duplicateGame () {
  let duplicateBoard = []
  for (let i = 0;i < threshold; i++){
    duplicateBoard.push([])
    for (let j = 0;j < threshold;j++){
      duplicateBoard[i].push(currentBoard[i][j])
    }
  }
  return duplicateBoard
}

function testWinningMove(move,player=currentPlacement) {
  let duplicateBoard = duplicateGame();
  let squareToTest = findDimensionalIndex(move);
  if (duplicateBoard[squareToTest[0]][squareToTest[1]]) {
    return false;
  }
  duplicateBoard[squareToTest[0]][squareToTest[1]] = player;
  return checkVictoryConditions(duplicateBoard);
}

function aiPlaysEasy (choice,attempts=0) {
  attempts++
  if (choice===undefined) {
    aiPlaysMedium(generateSquareChoice(),attempts);
  }
  if (!testWinningMove(choice) && (attempts <= 2)){
    aiPlaysMedium(generateSquareChoice(),attempts);
  } else {
    aiPopulateSquare(choice);
  }
}

function aiPlaysMedium () {
  //javascript
  for(let i = 0; i < squares.length;i++){
    if (testWinningMove(i,!currentPlacement)){
      aiPopulateSquare(i)
      return;
    }
  }
  aiPlaysEasy()
}

function aiPlaysHard (choice,bestchoice,attempts=0) {

  for(let i = 0; i < squares.length;i++){
    if (testWinningMove(i,currentPlacement)){
      aiPopulateSquare(i);
      return;
    }
  }
  aiPlaysMedium()
}

function aiPlaysImpossible () {
  //javascript
}

function aiPopulateSquare (index) {
  while (index === undefined || (document.querySelector(`.S${squaresIds[index]}`) === null)) {
    index = generateSquareChoice()
  }
  turnsTaken++;
  if (turnsTaken > squares.length) {
    alert('the game is already over')
    return;
  }
  let targetSquare = document.querySelector(`.S${squaresIds[index]}`);
  targetSquare.textContent = currentPlacement;
  addCurrentPlayToBoard(index);
  if (checkVictoryConditions()) {
    alert(`Player ${currentPlacement} won!`)
  } else {
    changePlayer();
  }
}
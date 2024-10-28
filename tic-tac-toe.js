function set_board() {
    let parent = document.getElementById("board");
    let no_children = parent.childElementCount;
    let buttons = document.getElementsByClassName("controls");
    buttons[0].addEventListener('click', newgameHandler);
    for (let i = 0; i < no_children; i++) {
        parent.children[i].classList.add("square");
        parent.children[i].addEventListener('click', stopCheating);
        parent.children[i].addEventListener('mouseover', hoverHandler);
        parent.children[i].addEventListener('mouseout', hoverHandler);
    }
    return parent;
}

function turn(pos) {
    const currentPlayer = current_moves === 2 ? "X" : "O";
    const currentMoveIndex = current_moves === 2 ? 1 : 0;
    set_board().children[pos].classList.add(currentPlayer);
    set_board().children[pos].innerHTML = currentPlayer;
    moves[currentMoveIndex] = moves[currentMoveIndex].substring(0, pos) + "1" + moves[currentMoveIndex].substring(pos + 1);

    current_moves = current_moves === 2 ? 1 : 2;
}

function stopCheating(event) {
    if (!win) { 
      const index = Array.from(set_board().children).indexOf(event.target);
      if (isEmpty(index)) { 
        turn(index);
        no_moves++;
        if (no_moves >= 5) {
          win_check();
        }
      }
    }
  }
  
  function isEmpty(pos) {
    return moves[0][pos] === "0" && moves[1][pos] === "0";
  }



function hoverHandler(event) {
    const index = Array.from(set_board().children).indexOf(event.target);

    if (event.type === "mouseover") {
      set_board().children[index].classList.add("hover");
    } else if (event.type === "mouseout") {
      set_board().children[index].classList.remove("hover");
    }
  }
  

function win_check() {
    const winPatterns = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]  
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (moves[0][a] === "1" && moves[0][b] === "1" && moves[0][c] === "1") {
            document.getElementById("status").classList.add("you-won");
            document.getElementById("status").innerHTML = "Congratulations! O is the Winner!";
            win = true;
            return;
        } else if (moves[1][a] === "1" && moves[1][b] === "1" && moves[1][c] === "1") {
            document.getElementById("status").classList.add("you-won");
            document.getElementById("status").innerHTML = "Congratulations! X is the Winner!";
            win = true;
            return;
        }
    }
}



function newgameHandler() {
    moves = ["000000000", "000000000"];
    no_moves = 0;
    win = false;
    document.getElementById("status").classList.remove("you-won");
    document.getElementById("status").textContent = "Move your mouse over a square and click to play an X or an O.";
  
    const squares = set_board().children;
    for (const square of squares) {
      square.textContent = '';
      square.classList.remove('X', 'O');
    }
  }


window.onload = set_board;
var win = false;
var moves = ["000000000", "000000000"];
var no_moves = 0;
var current_moves = Math.floor(Math.random() * (2 - 1 + 1)) + 1;



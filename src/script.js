/**
 *  - create an array to store the sequence
 *  - push a new random number to the array
 *  - check that the user gets the sequence correct
 *  - construct a gameboard class
 */
const colorList = ['red', 'green', 'blue', 'yellow'];
const newGame = document.querySelector('#start');
const reset = document.querySelector('#reset');
const board = document.querySelector('#board');
const score = document.querySelector('#score');


 class GameBoard {
     constructor () {
        this.clearBoard();
        this.score = 0;
     }

     addRandom () {
         this.sequence.push(Math.floor(Math.random()*4))
     }

     check(target) {
         let color = target.id;
         let button = colorList.indexOf(color);
        this.flashColor(button);
         if (this.correct && this.guessIndex < this.sequence.length) {
             if (button !== this.sequence[this.guessIndex]) {
                this.correct = false;
                score.innerText = `Game Over. \nYour final score is ${this.score}`
                this.clearBoard();
             }
             else {
                 this.guessIndex++;
             }
         }
         if (this.sequence.length > 0 && this.sequence.length === this.guessIndex && this.correct){
             this.score = this.sequence.length;
             this.addRandom();
             this.flashSequence();
             this.guessIndex = 0;
         }
    }

     clearBoard () {
         this.sequence = [];
         this.correct = true;
         this.guessIndex = 0;
     }

     firstThree () {
        if (this.sequence.length === 0) {
            for (let i = 0; i < 3; i++)
            {
                this.addRandom();
            }
        }
     }

     flashColor(colorIndex) {
        let color = colorList[colorIndex];
        let button = document.querySelector(`#${color}`);
        button.style.backgroundColor = color;
        setTimeout(function() {
            this.resetColor(colorIndex)
        }.bind(this),500);
     }

     flashSequence() {
        let index = 0;
       let seq = setInterval(function() {
           if (index < this.sequence.length) {
                this.flashColor(this.sequence[index]);
                index++;
           }
           else {
               clearInterval(seq);
           }
       }.bind(this), 600);
    }

     resetColor(colorIndex) {
        let color = colorList[colorIndex];
        let button = document.querySelector(`#${color}`);
        button.style.backgroundColor = "black";
     }

     start() {
        newGame.addEventListener('click', function() {
            game.firstThree();
            game.flashSequence();
           });
        reset.addEventListener('click', function(){game.clearBoard()});
       
        board.addEventListener('click', function(evt) {
           if (evt.target.tagName === 'A') {
               evt.preventDefault();
               game.check(evt.target);
           }
        })
     }
 }

 const game = new GameBoard();
game.start();



 /**
  * set a game attribute, guessIndex, to indicate what position of the sequence the player is on
  * guessIndex gets reset when addRandom is called.
  * propegate to colorButtons
  * each time one is clicked, check method is called.
  */

function openTab(event, tabName) {
    const tabcontent = document.querySelectorAll('.tabcontent');
    const tabLinks = document.querySelectorAll('tabLinks');
    const selectTab = document.querySelector(`#${tabName}`)

    for (let i = 0; i< tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks.className.replace(" active", "");
    }

    selectTab.style.display = 'flex';
    event.target.className =+ ' active';
}

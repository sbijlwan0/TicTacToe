import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  userChoice = 'X';                                                             // default choice for user symbol
  squares = Array(9).fill(null);                                                //setting null values to squares by default
  canPlay = true;                                                               //variable to disable all player clicks until computer plays
  chance = 0;                                                                   //count to maintain how many chances are played in total
  winConditions = [
                                                                                // all possible conditions of win
    [0, 1, 2],
    [2, 5, 8],
    [8, 7, 6],
    [6, 3, 0],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [3, 4, 5],
  ];
  winner = '';                                                                  // winner name
  draw = false;                                                                 //Variable to toggle draw and win result

  constructor() {}

  ngOnInit(): void {}

  //function triggers when user changes its choice.

  userChoiceChange(e) {
    this.userChoice = e.target.checked ? 'X' : 'O';
  }

  //function triggers every time user clicks a box.

  userPlay(index: number) {
    if (this.canPlay) {
      //checks if user can play or not.
      this.squares[index] = this.userChoice; //putting user choice in selected Box.
      this.chance += 1;
      this.canPlay = false; //disabling user clicks on box
      if (this.chance == 9) {
        // checking if all chances are completed.
        this.checkWinNmove(index);
      }
      if (this.chance >= 5) {
        this.checkWinNmove(index);
      } else {
        setTimeout(() => {
          this.computerPlay(index);
        }, 500);
      }
    }
  }

  // function to call win check and the computer play

  async checkWinNmove(index: number) {
    let win = await this.someOneWin();
    if (!win) {
      if (this.chance < 9)
        setTimeout(() => {
          this.computerPlay(index);
        }, 500);
      else {
        this.draw = true;
      }
    }
  }

  //function to check if someone won

  someOneWin() {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.winConditions.length; i++) {
        const [a, b, c] = this.winConditions[i];
        if (
          //checking if all values match for winning
          this.squares[a] &&
          this.squares[a] === this.squares[b] &&
          this.squares[b] === this.squares[c]
        ) {
          if (this.squares[a] == this.userChoice) {
            //setting winner name
            this.winner = 'User';
            resolve(true);
          } else {
            this.winner = 'Computer';
            resolve(true);
          }
        }
      }
      resolve(false);
    });
  }

  //function to decide computer's move

  computerPlay(userMove: number) {
    let arr = this.winConditions.filter((a, i) => a.includes(userMove));                          // getting all winning scenarios in which user's move can make him win
    const choice = new Set();
    for (let i = 0; i < arr.length; i++) {
      // getting all distinct box number's possible for his next move.
      arr[i].map((a) => {
        if (a != userMove) choice.add(a);
      });
    }
    let myArr = Array.from(choice);
    let userPresence = [];
    let notPresent = [];
    myArr.map((a: number) => {
      // getting empty and non-empty boxes
      if (this.squares[a]) userPresence.push(a);
      else notPresent.push(a);
    });
    if (userPresence.length == 0) {
      // if its the firstMove then selecting a random box
      let n = Math.floor(Math.random() * notPresent.length);
      while (this.squares[notPresent[n]]) {
        n = Math.floor(Math.random() * notPresent.length);
      }
      this.squares[notPresent[n]] = this.userChoice == 'X' ? 'O' : 'X';
      console.log(notPresent, n);
      this.chance += 1;
      this.canPlay = true;
    } else {
      // if user is present in nearby boxes then getting two boxes in winning condition where user is and selecting third box as computer's mark
      let s = notPresent;
      notPresent = [];
      for (let i = 0; i < arr.length; i++) {
        const [a, b, c] = arr[i];
        if (
          this.squares[a] == this.userChoice &&
          this.squares[b] == this.userChoice &&
          !this.squares[c]
        ) {
          notPresent.push(c);
        } else if (
          this.squares[a] == this.userChoice &&
          this.squares[c] == this.userChoice &&
          !this.squares[b]
        ) {
          notPresent.push(b);
        } else if (
          this.squares[b] == this.userChoice &&
          this.squares[c] == this.userChoice &&
          !this.squares[a]
        ) {
          notPresent.push(a);
        }
      }
      if (notPresent.length > 0) {
        let n = Math.floor(Math.random() * notPresent.length);
        while (this.squares[notPresent[n]]) {
          n = Math.floor(Math.random() * notPresent.length);
        }
        this.squares[notPresent[n]] = this.userChoice == 'X' ? 'O' : 'X';
        console.log(notPresent, n);
      } else {
        let n = Math.floor(Math.random() * s.length);
        while (this.squares[s[n]]) {
          n = Math.floor(Math.random() * s.length);
        }
        this.squares[s[n]] = this.userChoice == 'X' ? 'O' : 'X';
        console.log(notPresent, n);
      }
      this.chance += 1;
      this.canPlay = true;
    }
    this.someOneWin();
  }

  //function to reset game

  resetGame() {
    this.squares = Array(9).fill(null);
    this.canPlay = true;
    this.chance = 0;
    this.winner = '';
    this.draw = false;
  }
}

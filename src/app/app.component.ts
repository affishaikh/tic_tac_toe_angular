import { Component } from '@angular/core';
import { Player } from './Player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  board: Array<string> = new Array(9).fill('');
  players: Array<Player> = [
    new Player('Aftab', 'X'),
    new Player('Rishab', 'O')
  ];
  currentPlayerIndex: number = 0;
  currentPlayer: Player = this.players[this.currentPlayerIndex];
  hasAnyoneWon: boolean = false;
  winningCombinations: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];
  isMoveInvalid: boolean = false;

  isInvalidMove(move): boolean {
    return (
      this.players[0].moves.includes(move) ||
      this.players[1].moves.includes(move)
    );
  }

  performMove(): void {
    const index: number = +(event.target as Element).id;
    this.isMoveInvalid = this.isInvalidMove(index);
    if (this.isMoveInvalid) {
      return;
    }
    this.board[index] = this.currentPlayer.symbol;
    this.currentPlayer.moves.push(index);
    this.hasAnyoneWon = this.hasWon(this.currentPlayer);
    if (!this.hasAnyoneWon) {
      this.changeTurn();
    } else {
      
    }
  }

  changeTurn(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
    this.currentPlayer = this.players[this.currentPlayerIndex];
  }

  hasWon(player: Player): boolean {
    return this.winningCombinations.some(winningCombination => {
      return winningCombination.every(number => {
        return player.moves.includes(number);
      });
    });
  }
}

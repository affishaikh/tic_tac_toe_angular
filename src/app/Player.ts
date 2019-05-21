export class Player {
  name: string;
  symbol: string;
  moves: Array<number>;
  constructor(name: string, symbol: string) {
    this.name = name;
    this.symbol = symbol;
    this.moves = [];
  }
}

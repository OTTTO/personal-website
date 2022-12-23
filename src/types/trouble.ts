export interface Peg {
  id: number;
  player: number;
  space: number;
  isStarted: boolean;
  inFinish: boolean;
}

export class Player {
  id: number;
  pegs: Peg[] = [];

  constructor(iter: number) {
    this.id = iter;
  }
}

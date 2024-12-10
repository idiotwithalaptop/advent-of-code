import { LinkedLetter, WordSearch } from './domain';

const DIRECTION_NORTH_WEST = (rowIndex: number, columnIndex: number) => {
  return { rowIndex: rowIndex - 1, columnIndex: columnIndex - 1 };
};

const DIRECTION_NORTH = (rowIndex: number, columnIndex: number) => {
  return { rowIndex: rowIndex - 1, columnIndex: columnIndex };
};

const DIRECTION_NORTH_EAST = (rowIndex: number, columnIndex: number) => {
  return { rowIndex: rowIndex - 1, columnIndex: columnIndex + 1 };
};

const DIRECTION_EAST = (rowIndex: number, columnIndex: number) => {
  return { rowIndex: rowIndex, columnIndex: columnIndex + 1 };
};

const DIRECTION_SOUTH_EAST = (rowIndex: number, columnIndex: number) => {
  return { rowIndex: rowIndex + 1, columnIndex: columnIndex + 1 };
};

const DIRECTION_SOUTH = (rowIndex: number, columnIndex: number) => {
  return { rowIndex: rowIndex + 1, columnIndex: columnIndex };
};

const DIRECTION_SOUTH_WEST = (rowIndex: number, columnIndex: number) => {
  return { rowIndex: rowIndex + 1, columnIndex: columnIndex - 1 };
};

const DIRECTION_WEST = (rowIndex: number, columnIndex: number) => {
  return { rowIndex: rowIndex, columnIndex: columnIndex - 1 };
};

const DIRECTIONS = [
  DIRECTION_NORTH_WEST,
  DIRECTION_NORTH,
  DIRECTION_NORTH_EAST,
  DIRECTION_EAST,
  DIRECTION_SOUTH_EAST,
  DIRECTION_SOUTH,
  DIRECTION_SOUTH_WEST,
  DIRECTION_WEST,
];

export function find(word: LinkedLetter, board: WordSearch): number {
  let found = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      for (const direction of DIRECTIONS) {
        if (traverse(i, j, board, word, direction)) {
          found++;
        }
      }
    }
  }
  return found;
}

function traverse(
  rowIndex: number,
  columnIndex: number,
  board: WordSearch,
  word: LinkedLetter,
  next: (rowIndex, columnIndex) => { rowIndex: number; columnIndex: number }
): boolean {
  if (rowIndex < 0 || rowIndex >= board.length) {
    return false;
  }
  if (columnIndex < 0 || columnIndex >= board[rowIndex].length) {
    return false;
  }
  const letter = board[rowIndex][columnIndex];
  if (letter !== word.letter) {
    return false;
  }
  if (word.next === null) {
    return true;
  }
  const nextPosition = next(rowIndex, columnIndex);
  return traverse(
    nextPosition.rowIndex,
    nextPosition.columnIndex,
    board,
    word.next,
    next
  );
}

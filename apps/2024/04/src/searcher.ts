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

const WORD_SEARCH_DIRECTIONS = [
  DIRECTION_NORTH_WEST,
  DIRECTION_NORTH,
  DIRECTION_NORTH_EAST,
  DIRECTION_EAST,
  DIRECTION_SOUTH_EAST,
  DIRECTION_SOUTH,
  DIRECTION_SOUTH_WEST,
  DIRECTION_WEST,
];

const X_SEARCH_DIRECTIONS = [
  DIRECTION_NORTH_WEST,
  DIRECTION_NORTH_EAST,
  DIRECTION_SOUTH_EAST,
  DIRECTION_SOUTH_WEST,
];

type SearchResult = {
  firstRow: number;
  firstColumn: number;
  lastRow: number;
  lastColumn: number;
};

function doFind(
  board: WordSearch,
  directions: ((
    rowIndex: number,
    columnIndex: number
  ) => { rowIndex: number; columnIndex: number })[],
  word: LinkedLetter
) {
  const results: SearchResult[] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      for (const direction of directions) {
        const traverseResult = traverse(
          {
            firstRow: i,
            firstColumn: j,
            currentRow: i,
            currentColumn: j,
          },
          board,
          word,
          direction
        );
        if (traverseResult.found) {
          results.push({
            firstRow: traverseResult.firstRow,
            firstColumn: traverseResult.firstColumn,
            lastRow: traverseResult.currentRow,
            lastColumn: traverseResult.currentColumn,
          });
        }
      }
    }
  }
  return results;
}

export function find(word: LinkedLetter, board: WordSearch): number {
  return doFind(board, WORD_SEARCH_DIRECTIONS, word).length;
}

export function findX(word: LinkedLetter, board: WordSearch): number {
  const results = doFind(board, X_SEARCH_DIRECTIONS, word);
  const midpoints = results
    .map((result) => {
      return {
        ...result,
        midpoint: `${Math.floor(
          (result.firstRow + result.lastRow) / 2
        )},${Math.floor((result.firstColumn + result.lastColumn) / 2)}`,
      };
    })
    .reduce((count, result) => {
      count[result.midpoint] = (count[result.midpoint] || 0) + 1;
      return count;
    }, {});
  return Object.values(midpoints).filter((count) => (count as number) >= 2)
    .length;
}

type TraversalResult = TraversalState & {
  found: boolean;
};

type TraversalState = {
  firstRow: number;
  firstColumn: number;
  currentRow: number;
  currentColumn: number;
};

function traverse(
  traversalState: TraversalState,
  board: WordSearch,
  word: LinkedLetter,
  next: (rowIndex, columnIndex) => { rowIndex: number; columnIndex: number }
): TraversalResult {
  const rowIndex = traversalState.currentRow;
  const columnIndex = traversalState.currentColumn;
  if (rowIndex < 0 || rowIndex >= board.length) {
    return { ...traversalState, found: false };
  }
  if (columnIndex < 0 || columnIndex >= board[rowIndex].length) {
    return { ...traversalState, found: false };
  }
  const letter = board[rowIndex][columnIndex];
  if (letter !== word.letter) {
    return { ...traversalState, found: false };
  }
  if (word.next === null) {
    return { ...traversalState, found: true };
  }
  const nextPosition = next(rowIndex, columnIndex);
  return traverse(
    {
      ...traversalState,
      currentRow: nextPosition.rowIndex,
      currentColumn: nextPosition.columnIndex,
    },
    board,
    word.next,
    next
  );
}

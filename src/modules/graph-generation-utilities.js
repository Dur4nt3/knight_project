// Utilities used while creating the move graph

// Generate all possible moves from a given square
// Can produce moves that are out of the board (use cleanMoves to remove invalid moves)
export function generateMoves(squareCoordinate) {
    const moves = [];
    // 2 down 1 left
    moves.push([squareCoordinate[0] - 1, squareCoordinate[1] - 2]);

    // 2 down 1 right
    moves.push([squareCoordinate[0] + 1, squareCoordinate[1] - 2]);

    // 2 up 1 left
    moves.push([squareCoordinate[0] - 1, squareCoordinate[1] + 2]);

    // 2 up 1 right
    moves.push([squareCoordinate[0] + 1, squareCoordinate[1] + 2]);

    // 2 left 1 up
    moves.push([squareCoordinate[0] - 2, squareCoordinate[1] + 1]);

    // 2 left 1 down
    moves.push([squareCoordinate[0] - 2, squareCoordinate[1] - 1]);

    // 2 right 1 up
    moves.push([squareCoordinate[0] + 2, squareCoordinate[1] + 1]);

    // 2 right 1 down
    moves.push([squareCoordinate[0] + 2, squareCoordinate[1] - 1]);

    return moves;
}

// Removes the following moves:
// 1) illegal moves 2) duplicate moves
export function cleanMoves(moves) {
    // Remove duplicates
    // Approach:
    // 1) Create an array with the moves as strings rather than arrays
    // 2) Create a set from that array which will remove all duplicates
    // 3) Use the 'Array.from' method to convert the set to an array and parse all elements (converting them back to an array)
    moves = Array.from(new Set(moves.map(JSON.stringify)), JSON.parse);

    // Loop in reverse due to re-indexing caused by Array method 'splice'
    for (let i = moves.length - 1; i >= 0; i -= 1) {
        const currentMove = moves[i];

        // The move is illegal
        if (
            currentMove[0] > 7 ||
            currentMove[0] < 0 ||
            currentMove[1] > 7 ||
            currentMove[1] < 0
        ) {
            moves.splice(i, 1);
            continue;
        }
    }

    return moves;
}

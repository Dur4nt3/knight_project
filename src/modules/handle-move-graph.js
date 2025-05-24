import { generateMoves, cleanMoves } from './graph-generation-utilities.js';
import { Graph } from './graph.js';

// Generate a graph with all possible chess moves a knight can perform and find the shortest path between two squares

function generateGraph(startMove, graph) {
    let possibleMoves = generateMoves(startMove);
    possibleMoves = cleanMoves(possibleMoves);

    possibleMoves.forEach((move) => {
        if (!graph.edgeExists(startMove, move)) {
            graph.addEdge(startMove, move);
            generateGraph(move, graph);
        }
    });

    return;
}

// Starting move can be any square on the board
// All legal squares generate a graph with all possible moves a knight can perform
const moveGraph = new Graph(64);
generateGraph([3,3], moveGraph);

// NOTE: this function cannot decipher squares using algebraic notation
// Must use array's representing squares [0,0] - [7,7]
export function getShortestPath(start, end) {
    return moveGraph.shortestPath(start, end);
}
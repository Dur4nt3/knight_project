import { generateMoves, cleanMoves } from './graph-generation-utilities.js';

// Generate a graph with all possible chess moves a knight can perform

export function generateGraph(startMove, graph) {
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

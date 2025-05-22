// A graph class tailored for chess moves a knight can perform

export class Graph {
    constructor(numOfVertices) {
        this.numOfVertices = numOfVertices;
        this.edgeList = new Map();
    }

    // An edge describes a possible move from one square to another
    addEdge(startSquare, endSquare) {
        // Note: squares are stringified due to the fact that they are arrays
        const startVertex = JSON.stringify(startSquare);
        const endVertex = JSON.stringify(endSquare);

        if (!this.edgeList.has(startVertex)) {
            this.edgeList.set(startVertex, []);
            this.edgeList.get(startVertex).push(endVertex);
        } else {
            this.edgeList.get(startVertex).push(endVertex);
        }

        if (!this.edgeList.has(endVertex)) {
            this.edgeList.set(endVertex, []);
            this.edgeList.get(endVertex).push(startVertex);
        } else {
            this.edgeList.get(endVertex).push(startVertex);
        }
    }

    // Returns true if there is an edge between two vertexes (squares)
    edgeExists(startSquare, endSquare) {
        const startVertex = JSON.stringify(startSquare);
        const endVertex = JSON.stringify(endSquare);

        // Vertex (square) wasn't inserted to list yet
        if (!this.edgeList.has(startVertex)) {
            return false;
        }

        if (this.edgeList.get(startVertex).includes(endVertex)) {
            return true;
        }
        return false;
    }

    // Approach:
    // 1) Visit a node
    // 2) Visit all of the node's neighbors and log the visit, additionally log from what node you've reached the vertex from
    // 3) Repeat from 1 on the node's neighbors
    // 3) Once you've reached the target node backtrack through the path
    shortestPath(start, finish) {
        start = JSON.stringify(start);
        finish = JSON.stringify(finish);

        if (start === finish) {
            return start;
        }

        const pseudoQueue = [start];
        const visited = { [start]: true };
        const predecessorLog = {};
        let tail = 0;

        while (tail < pseudoQueue.length) {
            let originVertex = pseudoQueue[tail];
            tail += 1;
            const neighbors = this.edgeList.get(originVertex);
            for (const vertex of neighbors) {
                // No need to traverse a vertex that was already visited
                if (visited[vertex]) {
                    continue;
                }

                visited[vertex] = true;

                // The first time you encounter the target vertex will be the shortest path
                if (vertex === finish) {
                    const path = [vertex];
                    // Backtrack through the path until you reach the starting vertex (square)
                    while (originVertex !== start) {
                        path.push(originVertex);
                        originVertex = predecessorLog[originVertex];
                    }
                    // Add the starting vertex to the path
                    path.push(originVertex);
                    // Make sure path starts from the starting square
                    path.reverse();
                    return path;
                }

                predecessorLog[vertex] = originVertex;
                // Queue the vertex to ensure its neighbors are also traversed
                pseudoQueue.push(vertex);
            }
        }
    }
}

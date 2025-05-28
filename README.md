# Knight Travails Project

## Knight Travails - Overview

This is the tenth project of the "JavaScript" course within "The Odin Project".

This project acts as summary of the DSA (data structures and algorithms) section within "The Odin Project".

In particular, this project aims to implement an algorithm that will find the shortest path a chess knight can perform to get from one square to another.
*This project isn't supposed to have a GUI, but I decided to spin up a simple GUI because I thought it would be interesting to see the simulation.*

## Additional Information

### Main Algorithm - Overview

To find the shortest path a chess knight can perform to get from one to square to another I will use a graph.

The solution will be divided into two:

1) Generate a graph of all possible moves a chess knight can perform on a standard 8x8 chess board

2) Find the shortest path between two vertex on the graph (i.e., two squares on the board)

Below you will find an in-depth explanation of the aforementioned algorithms.

### Main Algorithm - Generating a Graph

To generate the aforementioned graph perform the following:

1) first generate all possible (legal) moves from a selected starting square (the square selected isn't important as long as its valid) and store them within an array.

2) Iterate through the array: if an edge exists between the starting move and the current move skip to the next element within the array, if there isn't an edge, mark that edge on the graph and re-execute the function with the current move as the starting move.

3) Repeat from the first step until we've finished iterating through the possible moves.

4) simply return (terminates recursion)

*The end result is a graph containing all possible moves from all squares on the chess board.*

### Main Algorithm - Finding the Shortest Path

To find the shortest path from one square to another perform the following:

1) Using a breadth-first approach we will traverse the graph.
*Essentially we are dividing the graph into levels where level 0 is the starting square (vertex within the graph) and the final level is the target square (target vertex).*

2) Traverse each vertex within a level, mark it as visited (prevents infinite cycles), add its children (edges that weren't already visited, i.e., weren't marked as visited) to the queue, and mark from what vertex you've reached said vertex from (allows us to track the entries to each level and backtrack from finish to start).
*Traversing a vertex means dequeuing the queue (because I am using a pseudo-queue I just move the pointer 1 element forward which simulates the action of dequeuing).*

3) If you've reached the target square (finish vertex), move 1 level back at a time tracking each level as a step from the start to the finish by appending it to the path array (until you reach the start vertex).

4) Once you've reached the start square (start vertex), append it to the path array.

5) Reverse the path array so it will resemble a start => finish path rather than a finish => start path.

6) Return the path array.

*The end result is the shortest path from the starting square to the finish square.*

## Skills Demonstrated

- Graph

- Data structures

- Utilizing a breadth-first search

- Algorithms

## Misc Information

**Webpage responsiveness:** This project will not display properly on mobile devices

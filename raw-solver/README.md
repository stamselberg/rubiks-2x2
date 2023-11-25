Command-line Python scripts used while developing the strategy for solving the Rubiks 2x2.
The solution algorithm takes advantage of the fact that a 2x2 cube only has ~3million solutions and that the longest solution is 11 moves.

It's therefore feasible to find all permutations that take 11 moves or less - done in GetAll2x2Solutions.py. The script dumps all solutions and takes a few minutes to run.

It's also feasible to find the solution to any cube by trying all possible permutations from the solved cube and from the unsolved cube, going out 5/6 steps respectively, and then meeting in the middle.
This takes ~500 ms - and there are around 20000 permutations for 5 moves and 60000 for 6.
This is done in SolveRubiks2x2.py.

It is fully possible to optimise the algorithms further, e.g. by implementing a more efficient way of doing the moves (if changing the data model), and possibly also by altering the recursive call to be faster at finding duplicates.


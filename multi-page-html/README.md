Multi-file version of the Rubiks2x2 application - which needs hosting to run. A .bat file is provided to run (requires Python on local machine)
The application shows a Rubiks2x2 cube initially in the solved state with a small version of each of its 8 corners highlighted above.

The user can:
- Click the big cube to rotate it, to better see how the cube looks.
- Click any of the small cubes to change which corner is used in this position.
- Click the text above any of the small cubes to change the rotation of the corner.

If the current cube if solvable, the solution will be printed underneath the large cube.

The fifth piece is locked (WRB at the bottom left back).
In order to use the app, the user will have to orientate their unsolved cube to have the fifth piece in the same location.
Then, each piece and corner must be clicked to be the same as on their own cube.

The UX could be better, but it's enough for a trained user to relatively quickly (~60s) setup the cube, and be given the fewest moves solution.

The application uses WebGL and renders the cube on one Canvas, while using a secondary canvas for the user to interact.
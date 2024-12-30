
function TransformRubiks2x2(CubeCorners, Move) {
    let NewCubeCorners = CubeCorners.slice();
    switch (Move) {
        case "T":
            TransformRubiks2x2_T(CubeCorners, NewCubeCorners);
            break;
        case "T'":
            TransformRubiks2x2_rT(CubeCorners, NewCubeCorners);
            break;
        case "T2":
            TransformRubiks2x2_T2(CubeCorners, NewCubeCorners);
            break;
        case "R":
            TransformRubiks2x2_R(CubeCorners, NewCubeCorners);
            break;
        case "R'":
            TransformRubiks2x2_rR(CubeCorners, NewCubeCorners);
            break;
        case "R2":
            TransformRubiks2x2_R2(CubeCorners, NewCubeCorners);
            break;
        case "F":
            TransformRubiks2x2_F(CubeCorners, NewCubeCorners);
            break;
        case "F'":
            TransformRubiks2x2_rF(CubeCorners, NewCubeCorners);
            break;
        case "F2":
            TransformRubiks2x2_F2(CubeCorners, NewCubeCorners);
            break;
    }
    return NewCubeCorners
}

function TransformRubiks2x2_T(CubeCorners, NewCubeCorners) {
    NewCubeCorners[0] = CubeCorners[2];
    NewCubeCorners[1] = CubeCorners[0];
    NewCubeCorners[2] = CubeCorners[3];
    NewCubeCorners[3] = CubeCorners[1];
}

function TransformRubiks2x2_rT(CubeCorners, NewCubeCorners) {
    NewCubeCorners[0] = CubeCorners[1];
    NewCubeCorners[1] = CubeCorners[3];
    NewCubeCorners[2] = CubeCorners[0];
    NewCubeCorners[3] = CubeCorners[2];
}

function TransformRubiks2x2_T2(CubeCorners, NewCubeCorners) {
    NewCubeCorners[0] = CubeCorners[3];
    NewCubeCorners[1] = CubeCorners[2];
    NewCubeCorners[2] = CubeCorners[1];
    NewCubeCorners[3] = CubeCorners[0];
}

function TransformRubiks2x2_R(CubeCorners, NewCubeCorners) {
    NewCubeCorners[1] = FlipClockwise(CubeCorners[3]);
    NewCubeCorners[3] = FlipAntiClockwise(CubeCorners[7]);
    NewCubeCorners[5] = FlipAntiClockwise(CubeCorners[1]);
    NewCubeCorners[7] = FlipClockwise(CubeCorners[5]);
}

function TransformRubiks2x2_rR(CubeCorners, NewCubeCorners) {
    NewCubeCorners[1] = FlipClockwise(CubeCorners[5]);
    NewCubeCorners[3] = FlipAntiClockwise(CubeCorners[1]);
    NewCubeCorners[5] = FlipAntiClockwise(CubeCorners[7]);
    NewCubeCorners[7] = FlipClockwise(CubeCorners[3]);
}

function TransformRubiks2x2_R2(CubeCorners, NewCubeCorners) {
    NewCubeCorners[1] = CubeCorners[7];
    NewCubeCorners[3] = CubeCorners[5];
    NewCubeCorners[5] = CubeCorners[3];
    NewCubeCorners[7] = CubeCorners[1];
}

function TransformRubiks2x2_F(CubeCorners, NewCubeCorners) {
    NewCubeCorners[2] = FlipAntiClockwise(CubeCorners[6]);
    NewCubeCorners[3] = FlipClockwise(CubeCorners[2]);
    NewCubeCorners[6] = FlipClockwise(CubeCorners[7]);
    NewCubeCorners[7] = FlipAntiClockwise(CubeCorners[3]);
}

function TransformRubiks2x2_rF(CubeCorners, NewCubeCorners) {
    NewCubeCorners[2] = FlipAntiClockwise(CubeCorners[3]);
    NewCubeCorners[3] = FlipClockwise(CubeCorners[7]);
    NewCubeCorners[6] = FlipClockwise(CubeCorners[2]);
    NewCubeCorners[7] = FlipAntiClockwise(CubeCorners[6]);
}

function TransformRubiks2x2_F2(CubeCorners, NewCubeCorners) {
    NewCubeCorners[2] = CubeCorners[7];
    NewCubeCorners[3] = CubeCorners[6];
    NewCubeCorners[6] = CubeCorners[3];
    NewCubeCorners[7] = CubeCorners[2];
}

function FlipClockwise(CubeCorner) {
    let Rotation = CubeCorner & 0xf;
    CubeCorner -= Rotation;
    Rotation += 1;
    if (Rotation == 4) {
        Rotation = 1;
    }
    CubeCorner += Rotation;
    return CubeCorner;
}

function FlipAntiClockwise(CubeCorner) {
    let Rotation = CubeCorner & 0xf;
    CubeCorner -= Rotation;
    Rotation -= 1;
    if (Rotation == 0) {
        Rotation = 3;
    }
    CubeCorner += Rotation;
    return CubeCorner;
}

function FindAllSolutionsUpToStep(Cube0, MaxStep) {
    let FoundCubes = new Set();
    let FoundCubePaths = {};
    let Moves = [];
    FindShortestPathsRecursive(Cube0, FoundCubes, FoundCubePaths, 0, MaxStep, Moves);

    return FoundCubePaths;
}


// Reverse a path of moves to do backwards.
// e.g. "F2", "R" -> "R'", "F2"
function ReversePath(p) {
    let pr = []
    for (var strM of p) {
        let strRM = ReverseMove(strM);
        pr.push(strRM);
    }

    pr = pr.reverse();
    return pr;
}

// Return the opposite move, e.g. "R" -> "R'"
function ReverseMove(strM) {
    switch (strM) {
        case "T":
            strM = "T'";
            break;
        case "T'":
            strM = "T";
            break;
        case "R":
            strM = "R'";
            break;
        case "R'":
            strM = "R";
            break;
        case "F":
            strM = "F'";
            break;
        case "F'":
            strM = "F";
            break;
    }
    return strM;
}


function CubeToString(C) {
    let str = C.map(n => (n).toString(16)).join('');
    return str
}

// @param Cube - cube position to examine
// @param FoundCubes - all known solutions for previous number of steps
// @param Step - Current Step
// @param MaxStep - Max Step (recursion) to Find solutions for
function FindShortestPathsRecursive(Cube, FoundCubes, FoundCubePaths, Step, MaxStep, Moves) {
    let CubeAsString = CubeToString(Cube);

    if (FoundCubes.has(CubeAsString)) {
        let CurrentBestPath = FoundCubePaths[CubeAsString];
        if (CurrentBestPath.length <= Moves.length) {
            return;
        }
    }
    else {
        FoundCubes.add(CubeAsString);
    }

    FoundCubePaths[CubeAsString] = Moves;

    if (Step == MaxStep) {
        return;
    }

    let MovesToTry = ["T2", "R2", "F2", "T", "T'", "R", "R'", "F", "F'"];

    for (var m of MovesToTry) {
        let NewCube = TransformRubiks2x2(Cube, m);
        let NewMoves = Moves.slice();
        NewMoves.push(m);
        FindShortestPathsRecursive(NewCube, FoundCubes, FoundCubePaths, Step + 1, MaxStep, NewMoves)
    }
}
// Solve a Rubiks 2x2 knowing that the 5th piece is matching
// the solved cube. E.g. if 5th piece is WRB, then the matching
// cube is trusted to have Top=Y, Bottom=W, Left=R, Back=B, Right=O, Front=G
function solveRubiks2x2ToKnownMatch(CubeToSolve, Cube0) {

    let Cube0Solutions_5 = FindAllSolutionsUpToStep(Cube0, 5);
    let CubeToSolveSolutions_6 = FindAllSolutionsUpToStep(CubeToSolve, 6);
    let Cube0Solutions_5Keys = Object.keys(Cube0Solutions_5);
    let SharedCubes = Cube0Solutions_5Keys.filter(key => CubeToSolveSolutions_6.hasOwnProperty(key));
    let BestLength = 12;
    let BestPath = [];
    for (var Cube of SharedCubes) {
        let PathFromCube0 = Cube0Solutions_5[Cube];
        let PathFromCubeToSolve = CubeToSolveSolutions_6[Cube];

        let TotalPath = PathFromCubeToSolve.slice();
        TotalPath = TotalPath.concat(ReversePath(PathFromCube0));
        if (TotalPath.length < BestLength) {
            BestPath = TotalPath;
            BestLength = TotalPath.length;
        }
    }

    if (BestLength == 12) {
        return null;
    }
    return BestPath;
}



// Given array of 8 cube model corners where fifth item is known to be 51, return best path to solve
// All items in array are trusted to be two-digit base-10 numbers where first digit is 1..8 and second is 1..3
//
// Solve by using the "KnownMatch" method, first create Cube0 to match piece 5
// of the cube to solve. E.g. if 5th piece is WRB, then the matching
// cube will be the one that has Top=Y, Bottom=W, Left=R, Back=B, Right=O, Front=G
// (0x11, 0x21, 0x31, 0x41, 0x51, 0x61, 0x71, 0x81)
function solveRubiks2x2(cubeToSolveBase10) {
    let cubeToSolve = [];

    for (var c of cubeToSolveBase10) {
        let lowernibble = c % 10;
        let uppernibble = ((c - lowernibble) / 10) * 16;
        cubeToSolve.push(uppernibble + lowernibble);
    }
    const cubeMapIDToColour = {
        0x11: 'YBR', 0x12: 'BRY', 0x13: 'RYB',
        0x21: 'YOB', 0x22: 'OBY', 0x23: 'BYO',
        0x31: 'YRG', 0x32: 'RGY', 0x33: 'GYR',
        0x41: 'YGO', 0x42: 'GOY', 0x43: 'OYG',
        0x51: 'WRB', 0x52: 'RBW', 0x53: 'BWR',
        0x61: 'WBO', 0x62: 'BOW', 0x63: 'OWB',
        0x71: 'WGR', 0x72: 'GRW', 0x73: 'RWG',
        0x81: 'WOG', 0x82: 'OGW', 0x83: 'GWO'
    };

    const cubeMapColourToId = {};
    for (const [key, value] of Object.entries(cubeMapIDToColour)) {
        cubeMapColourToId[value] = parseInt(key);
    }

    const colourToOpposite = { 'Y': 'W', 'W': 'Y', 'G': 'B', 'B': 'G', 'R': 'O', 'O': 'R' };

    const piece5 = cubeToSolve[4];
    const piece5Colours = cubeMapIDToColour[piece5];
    const bo = piece5Colours[0];
    const ba = piece5Colours[2];
    const l = piece5Colours[1];
    const t = colourToOpposite[bo];
    const r = colourToOpposite[l];
    const f = colourToOpposite[ba];

    const pieceColours = [t + ba + l, t + r + ba, t + l + f, t + f + r, piece5Colours, bo + ba + r, bo + f + l, bo + r + f];
    const cube0 = pieceColours.map(p => cubeMapColourToId[p]);
    
    const solution = solveRubiks2x2ToKnownMatch(cubeToSolve, cube0);
    return solution;
}


export { solveRubiks2x2 };

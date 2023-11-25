
function TransformRubiks2x2(CubeCorners, Move)
{
    let NewCubeCorners = CubeCorners.slice();
    switch (Move)
	{
        case "T":
            TransformRubiks2x2_T(CubeCorners, NewCubeCorners);
			break;
        case "T'":
            TransformRubiks2x2_rT(CubeCorners, NewCubeCorners);
			break;
        case "2T":
            TransformRubiks2x2_2T(CubeCorners, NewCubeCorners);
			break;
        case "R":
            TransformRubiks2x2_R(CubeCorners, NewCubeCorners);
			break;
        case "R'":
            TransformRubiks2x2_rR(CubeCorners, NewCubeCorners);
			break;
        case "2R":
            TransformRubiks2x2_2R(CubeCorners, NewCubeCorners);
			break;
        case "F":
            TransformRubiks2x2_F(CubeCorners, NewCubeCorners);
			break;
        case "F'":
            TransformRubiks2x2_rF(CubeCorners, NewCubeCorners);
			break;
        case "2F":
            TransformRubiks2x2_2F(CubeCorners, NewCubeCorners);
			break;
	}
    return NewCubeCorners
}

function TransformRubiks2x2_T(CubeCorners, NewCubeCorners)
{
    NewCubeCorners[0] = CubeCorners[2];
    NewCubeCorners[1] = CubeCorners[0];
    NewCubeCorners[2] = CubeCorners[3];
    NewCubeCorners[3] = CubeCorners[1];
}

function TransformRubiks2x2_rT(CubeCorners, NewCubeCorners)
{
    NewCubeCorners[0] = CubeCorners[1];
    NewCubeCorners[1] = CubeCorners[3];
    NewCubeCorners[2] = CubeCorners[0];
    NewCubeCorners[3] = CubeCorners[2];
}

function TransformRubiks2x2_2T(CubeCorners, NewCubeCorners)
{
    NewCubeCorners[0] = CubeCorners[3];
    NewCubeCorners[1] = CubeCorners[2];
    NewCubeCorners[2] = CubeCorners[1];
    NewCubeCorners[3] = CubeCorners[0];
}

function TransformRubiks2x2_R(CubeCorners, NewCubeCorners)
{
    NewCubeCorners[1] = FlipClockwise(CubeCorners[3]);
    NewCubeCorners[3] = FlipAntiClockwise(CubeCorners[7]);
    NewCubeCorners[5] = FlipAntiClockwise(CubeCorners[1]);
    NewCubeCorners[7] = FlipClockwise(CubeCorners[5]);
}

function TransformRubiks2x2_rR(CubeCorners, NewCubeCorners)
{
    NewCubeCorners[1] = FlipClockwise(CubeCorners[5]);
    NewCubeCorners[3] = FlipAntiClockwise(CubeCorners[1]);
    NewCubeCorners[5] = FlipAntiClockwise(CubeCorners[7]);
    NewCubeCorners[7] = FlipClockwise(CubeCorners[3]);
}

function TransformRubiks2x2_2R(CubeCorners, NewCubeCorners)
{
    NewCubeCorners[1] = CubeCorners[7];
    NewCubeCorners[3] = CubeCorners[5];
    NewCubeCorners[5] = CubeCorners[3];
    NewCubeCorners[7] = CubeCorners[1];
}

function TransformRubiks2x2_F(CubeCorners, NewCubeCorners)
{
    NewCubeCorners[2] = FlipAntiClockwise(CubeCorners[6]);
    NewCubeCorners[3] = FlipClockwise(CubeCorners[2]);
    NewCubeCorners[6] = FlipClockwise(CubeCorners[7]);
    NewCubeCorners[7] = FlipAntiClockwise(CubeCorners[3]);
}

function TransformRubiks2x2_rF(CubeCorners, NewCubeCorners)
{
    NewCubeCorners[2] = FlipAntiClockwise(CubeCorners[3]);
    NewCubeCorners[3] = FlipClockwise(CubeCorners[7]);
    NewCubeCorners[6] = FlipClockwise(CubeCorners[2]);
    NewCubeCorners[7] = FlipAntiClockwise(CubeCorners[6]);
}

function TransformRubiks2x2_2F(CubeCorners, NewCubeCorners)
{
    NewCubeCorners[2] = CubeCorners[7];
    NewCubeCorners[3] = CubeCorners[6];
    NewCubeCorners[6] = CubeCorners[3];
    NewCubeCorners[7] = CubeCorners[2];
}

function FlipClockwise(CubeCorner)
{
    let Rotation = CubeCorner & 0xf;
    CubeCorner -= Rotation;
    Rotation += 1;
    if (Rotation == 4)
	{
        Rotation = 1;
	}
    CubeCorner += Rotation;
    return CubeCorner;
}

function FlipAntiClockwise(CubeCorner)
{
    let Rotation = CubeCorner & 0xf;
    CubeCorner -= Rotation;
    Rotation -= 1;
    if (Rotation == 0)
	{
        Rotation = 3;
	}
    CubeCorner += Rotation;
    return CubeCorner;
}

function FindAllSolutionsUpToStep(Cube0, MaxStep)
{
    let FoundCubes = new Set();
    let FoundCubePaths = {};
    let Moves = [];
    FindShortestPathsRecursive(Cube0, FoundCubes, FoundCubePaths, 0, MaxStep, Moves);

    return FoundCubePaths;
}


// Reverse a path of moves to do backwards.
// e.g. "2F", "R" -> "'R", "2F"
function ReversePath(p)
{
    let pr = []
    for (var strM of p)
	{
        let strRM = ReverseMove(strM);
        pr.push(strRM);
	}
        
    pr = pr.reverse();
    return pr;
}

// Return the opposite move, e.g. "R" -> "R'"
function ReverseMove(strM)
{
    switch (strM)
	{
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
 

function CubeToString(C)
{
    let str = C.map(n => (n).toString(16)).join('');
    return str
}

// @param Cube - cube position to examine
// @param FoundCubes - all known solutions for previous number of steps
// @param Step - Current Step
// @param MaxStep - Max Step (recursion) to Find solutions for
function FindShortestPathsRecursive(Cube, FoundCubes, FoundCubePaths, Step, MaxStep, Moves)
{
    let CubeAsString = CubeToString(Cube);

    if (FoundCubes.has(CubeAsString))
	{
        let CurrentBestPath = FoundCubePaths[CubeAsString];
        if (CurrentBestPath.length <= Moves.length)
		{
            return;
		}
    }
	else
	{
        FoundCubes.add(CubeAsString);
	}

    FoundCubePaths[CubeAsString] = Moves;
    
    if (Step == MaxStep)
	{
        return;
	}

    let MovesToTry = ["2T", "2R", "2F", "T", "T'", "R", "R'", "F", "F'"];

    for (var m of MovesToTry)
	{
        let NewCube = TransformRubiks2x2(Cube, m);
        let NewMoves = Moves.slice();
        NewMoves.push(m);
        FindShortestPathsRecursive(NewCube, FoundCubes, FoundCubePaths, Step + 1, MaxStep, NewMoves)
	}
}    



function solveRubiks2x2(CubeToSolveBase10)
{
	let Cube0 = [0x11, 0x21, 0x31, 0x41, 0x51, 0x61, 0x71, 0x81];
	let CubeToSolve = [];

	for (var c of CubeToSolveBase10)
	{		
	    let lowernibble = c % 10;;
		let uppernibble = ((c - lowernibble) / 10) * 16;
		CubeToSolve.push(uppernibble + lowernibble);
	}

	let Cube0Solutions_5 = FindAllSolutionsUpToStep(Cube0, 5);
	let CubeToSolveSolutions_6 = FindAllSolutionsUpToStep(CubeToSolve, 6);
	let Cube0Solutions_5Keys = Object.keys(Cube0Solutions_5);
	let SharedCubes = Cube0Solutions_5Keys.filter(key => CubeToSolveSolutions_6.hasOwnProperty(key));
	let BestLength = 12;
	let BestPath = [];
	for (var Cube of SharedCubes)
    {
		let PathFromCube0 = Cube0Solutions_5[Cube];
		let PathFromCubeToSolve = CubeToSolveSolutions_6[Cube];

		let TotalPath = PathFromCubeToSolve.slice();
		TotalPath = TotalPath.concat(ReversePath(PathFromCube0));
		if (TotalPath.length < BestLength)
		{
			BestPath = TotalPath;
			BestLength = TotalPath.length;
		}
	}

	//TimeTaken = time.process_time() - TimeBegin
	//print('Time taken (s) - ', TimeTaken)
	if (BestLength == 12)
	{
		return null;
	}
	return BestPath;
}

export { solveRubiks2x2 };

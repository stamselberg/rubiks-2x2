import time

def PrintCube(CubeCorners):
    for (ix, CubeCorner) in enumerate(CubeCorners):
        print('Corner#', ix + 1, hex(CubeCorner))

def PrintCubeShort(CubeCorners):
    print(list(map(hex, CubeCorners)))


# Given array of 8 corners and their orientation (CubeCorners)
# as well as a move (Move) - return a transformed array.
# Array indices are defined as
# TDL, TDR, TFL, TFR
# BDL, BDR, BFL, BFR
#, Where T/B = Top/Bottom, F/D = Front/Distance(back), L/R = Left/Right
# Array items are two-digit HEX numbers where first digit is 1-8 for the corner.
# 1 = YBP
# 2 = YOB
# 3 = YRG
# 4 = YGO
# 5 = WRB
# 6 = WBO
# 7 = WGR
# 8 = WOG
# Orientations are 1/2/3 where 2 is clocwise rotation of 1 and 3 of 2.
# So - using Front, Top, Left corner as orientation, all items are (using the standard six colours Yellow, Blue, Red, Green, White, Orange):
# 11 = YBR    -    12 = BRY    -    13 = RYB
# 21 = YOB    -    22 = OBY    -    23 = BYO
# 31 = YRG    -    32 = RGY    -    33 = GYR
# 41 = YGO    -    42 = GOY    -    43 = OYG
# 51 = WRB    -    52 = RBW    -    53 = BWR
# 61 = WBO    -    62 = BOW    -    63 = OWB
# 71 = WGR    -    72 = GRW    -    73 = RWG
# 81 = WOG    -    82 = OGW    -    83 = GWO
# The corners are bytes - split into upper and lower nibble for piece (1..8) and rotation (1..3).
# i.e. as Hex the possible values can be: 0x11, 0x12, 0x13, 0x21, 0x22, 0x23, ...., 0x81, 0x82, 0x83
# Moves can be any of (using standard cuber notation):
# T, T', 2T
# R, R', 2R
# F, F', 2F

# So e.g.
# - an array of [Xn, Ym, Zo, Wp, **, **, **, **] with a rotation of 2T would become
#               [Wp, Zo, Ym, Xn, **, **, **, **]
# - an array of [**, X1, **, Y1, **, Z1, **,  W1] with a rotation of R' would become
#               [**, Z2, **, X3, **, W3, **,  Y2]
def TransformRubiks2x2(CubeCorners, Move):
    NewCubeCorners = CubeCorners[:]
    match Move:
        case "T":
            TransformRubiks2x2_T(CubeCorners, NewCubeCorners)
        case "T'":
            TransformRubiks2x2_rT(CubeCorners, NewCubeCorners)
        case "2T":
            TransformRubiks2x2_2T(CubeCorners, NewCubeCorners)
        case "R":
            TransformRubiks2x2_R(CubeCorners, NewCubeCorners)
        case "R'":
            TransformRubiks2x2_rR(CubeCorners, NewCubeCorners)
        case "2R":
            TransformRubiks2x2_2R(CubeCorners, NewCubeCorners)
        case "F":
            TransformRubiks2x2_F(CubeCorners, NewCubeCorners)
        case "F'":
            TransformRubiks2x2_rF(CubeCorners, NewCubeCorners)
        case "2F":
            TransformRubiks2x2_2F(CubeCorners, NewCubeCorners)
    return NewCubeCorners
  
# @see TransformRubiks2x2 - T move
def TransformRubiks2x2_T(CubeCorners, NewCubeCorners):
    NewCubeCorners[0] = CubeCorners[2]
    NewCubeCorners[1] = CubeCorners[0] 
    NewCubeCorners[2] = CubeCorners[3]
    NewCubeCorners[3] = CubeCorners[1]

# @see TransformRubiks2x2 - rT move
def TransformRubiks2x2_rT(CubeCorners, NewCubeCorners):
    NewCubeCorners[0] = CubeCorners[1]
    NewCubeCorners[1] = CubeCorners[3]
    NewCubeCorners[2] = CubeCorners[0]
    NewCubeCorners[3] = CubeCorners[2]

# @see TransformRubiks2x2 - 2T move
def TransformRubiks2x2_2T(CubeCorners, NewCubeCorners):
    NewCubeCorners[0] = CubeCorners[3]
    NewCubeCorners[1] = CubeCorners[2]
    NewCubeCorners[2] = CubeCorners[1]
    NewCubeCorners[3] = CubeCorners[0]

# @see TransformRubiks2x2 - R move
def TransformRubiks2x2_R(CubeCorners, NewCubeCorners):
    NewCubeCorners[1] = FlipClockwise(CubeCorners[3])
    NewCubeCorners[3] = FlipAntiClockwise(CubeCorners[7])
    NewCubeCorners[5] = FlipAntiClockwise(CubeCorners[1])
    NewCubeCorners[7] = FlipClockwise(CubeCorners[5])

# @see TransformRubiks2x2 - rR move
def TransformRubiks2x2_rR(CubeCorners, NewCubeCorners):
    NewCubeCorners[1] = FlipClockwise(CubeCorners[5])
    NewCubeCorners[3] = FlipAntiClockwise(CubeCorners[1])
    NewCubeCorners[5] = FlipAntiClockwise(CubeCorners[7])
    NewCubeCorners[7] = FlipClockwise(CubeCorners[3])

# @see TransformRubiks2x2 - 2R move
def TransformRubiks2x2_2R(CubeCorners, NewCubeCorners):
    NewCubeCorners[1] = CubeCorners[7]
    NewCubeCorners[3] = CubeCorners[5]
    NewCubeCorners[5] = CubeCorners[3]
    NewCubeCorners[7] = CubeCorners[1]

# @see TransformRubiks2x2 - F move
def TransformRubiks2x2_F(CubeCorners, NewCubeCorners):
    NewCubeCorners[2] = FlipAntiClockwise(CubeCorners[6])
    NewCubeCorners[3] = FlipClockwise(CubeCorners[2])
    NewCubeCorners[6] = FlipClockwise(CubeCorners[7])
    NewCubeCorners[7] = FlipAntiClockwise(CubeCorners[3])

# @see TransformRubiks2x2 - rF move
def TransformRubiks2x2_rF(CubeCorners, NewCubeCorners):
    NewCubeCorners[2] = FlipAntiClockwise(CubeCorners[3])
    NewCubeCorners[3] = FlipClockwise(CubeCorners[7])
    NewCubeCorners[6] = FlipClockwise(CubeCorners[2])
    NewCubeCorners[7] = FlipAntiClockwise(CubeCorners[6])

# @see TransformRubiks2x2 - 2F move
def TransformRubiks2x2_2F(CubeCorners, NewCubeCorners):
    NewCubeCorners[2] = CubeCorners[7]
    NewCubeCorners[3] = CubeCorners[6]
    NewCubeCorners[6] = CubeCorners[3]
    NewCubeCorners[7] = CubeCorners[2]

# @see TransformRubiks2x2 - Flip a corner piece clockwise
def FlipClockwise(CubeCorner):
    Rotation = CubeCorner & 0xf
    CubeCorner -= Rotation
    Rotation += 1
    if Rotation == 4:
        Rotation = 1
    CubeCorner += Rotation
    return CubeCorner

# @see TransformRubiks2x2 - Flip a corner piece anticlockwise
def FlipAntiClockwise(CubeCorner):
    Rotation = CubeCorner & 0xf
    CubeCorner -= Rotation
    Rotation -= 1
    if Rotation == 0:
        Rotation = 3
    CubeCorner += Rotation
    return CubeCorner

# Given a starting Cube presumed to be a cube in the solved state (array of 8 corner pieces)
# Return an array of the shortest unique paths that can be done in MaxStep moves or less.
# E.g. 2T is the shortest path for a one-move solution, but 2T, 2T, 2T (which solves the same cube) is not included (as 2T is shorter)
def FindAllSolutionsUpToStep(Cube0, MaxStep):
    FoundCubes = set()
    FoundCubePaths = {}
    Moves = []
    FindShortestPathsRecursive(Cube0, FoundCubes, FoundCubePaths, 0, MaxStep, Moves)
    #print('For Max of ', MaxStep, ' there are ', len(SolutionsCubes), ' solutions')
    
    #for (c, p) in SolutionsCubePaths.items():
    #    PrintCubeSolution(c, p)
    return FoundCubePaths

def PrintAllSolutionsUpToStep(Cube0, MaxStep):
    print('Finding All Solutions Up To Step', MaxStep)
    AllSolutions = FindAllSolutionsUpToStep(Cube0, MaxStep)

    print('There are ', len(AllSolutions), ' solutions')
    
    for (c, p) in AllSolutions.items():
        PrintCubeSolution(c, p)

    return

def PrintCubeSolution(str, p):
    pr = ReversePath(p)
    print('"' + str.replace('0x', '') + '":"' + ' '.join(pr) + '",')

# Reverse a path of moves to do backwards.
# e.g. "2F", "R" -> "'R", "2F"
def ReversePath(p):
    pr = []
    for strM in p:
        strRM = ReverseMove(strM)
        pr.append(strRM)
        
    pr.reverse();
    return pr


# Return the opposite move, e.g. "R" -> "R'"
def ReverseMove(strM):
    match strM:
        case "T":
            strM = "T'"
        case "T'":
            strM = "T"
        case "R":
            strM = "R'"
        case "R'":
            strM = "R"
        case "F":
            strM = "F'"
        case "F'":
            strM = "F"
    return strM
 

def CubeToString(C):
    str = ''.join(list(map(hex, C)))
    return str

# Recursive function examining all paths from a given position
# @param Cube - cube position to examine
# @param FoundCubes - all known solutions for previous number of steps
# @param Step - Current Step
# @param MaxStep - Max Step (recursion) to Find solutions for
def FindShortestPathsRecursive(Cube, FoundCubes, FoundCubePaths, Step, MaxStep, Moves):
    #print('FindShortestPathsRecursive', Step)
    CubeAsString = CubeToString(Cube)
    #print(CubeAsString)
    if CubeAsString in FoundCubes:
        #print('Seen Before:')
        CurrentBestPath = FoundCubePaths[CubeAsString]
        #print('Current best: ', len(CurrentBestPath), ' - path being tried: ', len(Moves))
        if (len(CurrentBestPath) <= len(Moves)):
            return
    else:
        FoundCubes.add(CubeAsString)

    # Not seen (better) before - so add and recurse
    #print('New (best) solution found for cube:')
    #PrintCubeShort(Cube)
    #print (Moves)
    FoundCubePaths[CubeAsString] = Moves
    
    if (Step == MaxStep):
        #print('End of recursion')
        return

    MovesToTry = ["2T", "2R", "2F", "T", "T'", "R", "R'", "F", "F'"]

    for m in MovesToTry:
        NewCube = TransformRubiks2x2(Cube, m)
        NewMoves = Moves[:]
        NewMoves.append(m)
        FindShortestPathsRecursive(NewCube, FoundCubes, FoundCubePaths, Step + 1, MaxStep, NewMoves)

# Solve a Rubiks 2x2 knowing that the 5th piece is matching
# the solved cube. E.g. if 5th piece is WRB, then the matching
# cube is trusted to have Top=Y, Bottom=W, Left=R, Back=B, Right=O, Front=G
def SolveRubiks2x2ToKnownMatch(CubeToSolve, Cube0):

    TimeBegin = time.process_time()

    # Find all possible positions from the solved cube that can be done in five moves or less
    Cube0Solutions_5 = FindAllSolutionsUpToStep(Cube0, 5)
    # Find all possible positions from the requested cube that can be done in six moves or less
    CubeToSolveSolutions_6 = FindAllSolutionsUpToStep(CubeToSolve, 6)
    Set0 = set(Cube0Solutions_5)
    SetToSolve = set(CubeToSolveSolutions_6)
    # Match the cubes paths that "meet in the middle" (i.e. that end up in the same cube) - then find the shortest path among them.
    SharedCubes = Set0.intersection(SetToSolve)
    #print ('#SharedCubes', len(SharedCubes))
    BestLength = 12
    BestPath = []
    for Cube in SharedCubes:
        PathFromCube0 = Cube0Solutions_5[Cube]
        PathFromCubeToSolve = CubeToSolveSolutions_6[Cube]
        TotalPath = PathFromCubeToSolve[:]
        TotalPath.extend(ReversePath(PathFromCube0))
        #print('For meeting point', Cube, 'length is', len(TotalPath),':', TotalPath)
        if (len(TotalPath) < BestLength):
            #print('New best path', Cube, 'length is', len(TotalPath),':', ' '.join(TotalPath))
            BestPath = TotalPath
            BestLength = len(TotalPath)

    TimeTaken = time.process_time() - TimeBegin
    print('Time taken (s) - ', TimeTaken)
    if BestLength == 12:
        print('No solutions - bad initial cube')
    else:
        print('Shortest solution is:', ' '.join(BestPath))


def TestSolveRubiks2x2ToKnownMatch():
    # Example cube to solve.
    # e.g. [0x83, 0x13, 0x21, 0x31, 0x51, 0x63, 0x42, 0x73] 

    #                   +------+------+
    #                  / 1    / 2    /|
    #                 / GWO  / RYB  / |
    #                +------+------+--+
    #               / 3    / 4    /| /|
    #              / YOB  / YRG  / |/ |
    #             +------+------+  +--+
    # 5--> WRB    |      |      | /|6/ OWB
    #             |      |      |/ |/
    #             +------+------+  +
    #             |  7   |  8   | /
    #             | GOY  | RWG  |/
    #             +------+------+
    CubeToSolve = [0x83, 0x13, 0x21, 0x31, 0x51, 0x63, 0x42, 0x73] 

    # Cube0 is Top=Y, Bottom=W, Left=R, Back=B, Right=O, Front=G
    Cube0 = [0x11, 0x21, 0x31, 0x41, 0x51, 0x61, 0x71, 0x81]

    SolveRubiks2x2ToKnownMatch(CubeToSolve, Cube0)


# Solve a Rubiks 2x2 by using the "KnownMatch" method, first create Cube0 to match piece 5
# the solved cube. E.g. if 5th piece is WRB, then the matching
# cube will be the one that has Top=Y, Bottom=W, Left=R, Back=B, Right=O, Front=G
# (0x11, 0x21, 0x31, 0x41, 0x51, 0x61, 0x71, 0x81)

def SolveRubiks2x2ToAnyMatch(CubeToSolve):
    CubeMapIDToColour = {
        0x11 : 'YBR', 0x12 : 'BRY', 0x13: 'RYB',
        0x21 : 'YOB', 0x22 : 'OBY', 0x23: 'BYO',
        0x31 : 'YRG', 0x32 : 'RGY', 0x33: 'GYR',
        0x41 : 'YGO', 0x42 : 'GOY', 0x43: 'OYG',
        0x51 : 'WRB', 0x52 : 'RBW', 0x53: 'BWR',
        0x61 : 'WBO', 0x62 : 'BOW', 0x63: 'OWB',
        0x71 : 'WGR', 0x72 : 'GRW', 0x73: 'RWG',
        0x81 : 'WOG', 0x82 : 'OGW', 0x83: 'GWO'
    }
    CubeMapColourToId = {value: key for key, value in CubeMapIDToColour.items()}

    ColourToOpposite = { 'Y': 'W', 'W': 'Y', 'G': 'B', 'B': 'G', 'R': 'O', 'O': 'R'}

    Piece5 = CubeToSolve[4]
    Piece5Colours = CubeMapIDToColour[Piece5]
    Bo = Piece5Colours[0]
    Ba = Piece5Colours[2]
    L = Piece5Colours[1]
    T = ColourToOpposite[Bo]
    R = ColourToOpposite[L]
    F = ColourToOpposite[Ba]

    PieceColours = [T+Ba+L, T+R+Ba, T+L+F, T+F+R, Piece5Colours, Bo+Ba+R, Bo+F+L, Bo+R+F]
    Cube0 = list(map(lambda p: CubeMapColourToId[p], PieceColours))
    #PrintCube(Cube0)

    SolveRubiks2x2ToKnownMatch(CubeToSolve, Cube0)

CubeToSolve = [0x62, 0x31, 0x53, 0x82, 0x13, 0x71, 0x43, 0x22] 
CubeToSolve = [0x13, 0x83, 0x72, 0x41, 0x23, 0x62, 0x53, 0x33] 
SolveRubiks2x2ToAnyMatch(CubeToSolve)

    

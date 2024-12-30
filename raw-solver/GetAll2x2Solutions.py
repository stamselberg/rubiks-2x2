
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
# T, T', T2
# R, R', R2
# F, F', F2

# So e.g.
# - an array of [Xn, Ym, Zo, Wp, **, **, **, **] with a rotation of T2 would become
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
        case "T2":
            TransformRubiks2x2_T2(CubeCorners, NewCubeCorners)
        case "R":
            TransformRubiks2x2_R(CubeCorners, NewCubeCorners)
        case "R'":
            TransformRubiks2x2_rR(CubeCorners, NewCubeCorners)
        case "R2":
            TransformRubiks2x2_R2(CubeCorners, NewCubeCorners)
        case "F":
            TransformRubiks2x2_F(CubeCorners, NewCubeCorners)
        case "F'":
            TransformRubiks2x2_rF(CubeCorners, NewCubeCorners)
        case "F2":
            TransformRubiks2x2_F2(CubeCorners, NewCubeCorners)
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

# @see TransformRubiks2x2 - T2 move
def TransformRubiks2x2_T2(CubeCorners, NewCubeCorners):
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

# @see TransformRubiks2x2 - R2 move
def TransformRubiks2x2_R2(CubeCorners, NewCubeCorners):
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

# @see TransformRubiks2x2 - F2 move
def TransformRubiks2x2_F2(CubeCorners, NewCubeCorners):
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

def FindAllSolutions():
    Solution0 = [0x11, 0x21, 0x31, 0x41, 0x51, 0x61, 0x71, 0x81]
    SolutionsCubes = set()
    SolutionsCubePaths = {}
    Moves = []
    MaxStep = 11
    FindAllSolutionsRecursive(Solution0, SolutionsCubes, SolutionsCubePaths, 0, MaxStep, Moves)
    print('For Max of ', MaxStep, ' there are ', len(SolutionsCubes), ' solutions')
    
    for (c, p) in SolutionsCubePaths.items():
        PrintCubeSolution(c, p)

def PrintCubePath(str, p):
    print('"' + str.replace('0x', '') + '" :', p, ',')

def PrintCubeSolution(str, p):
    pr = []
    for strM in p:
        strRM = strM
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
        pr.append(strM)
        
    pr.reverse();

    print('"' + str.replace('0x', '') + '":"' + ' '.join(pr) + '",')


def CubeToString(C):
    str = ''.join(list(map(hex, C)))
    return str

# @param Cube - cube position to examine
# @param Solutions - all known solutions for previous number of steps
# @param Step - Current Step
# @param MaxStep - Max Step (recursion) to Find solutions for
def FindAllSolutionsRecursive(Cube, SolutionsCubes, SolutionsCubePaths, Step, MaxStep, Moves):
    #print('FindAllSolutionsRecursive', Step)
    CubeAsString = CubeToString(Cube)
    #print(CubeAsString)
    if CubeAsString in SolutionsCubes:
        #print('Seen Before:')
        CurrentBestPath = SolutionsCubePaths[CubeAsString]
        #print('Current best: ', len(CurrentBestPath), ' - path being tried: ', len(Moves))
        if (len(CurrentBestPath) <= len(Moves)):
            return
    else:
        SolutionsCubes.add(CubeAsString)

    # Not seen (better) before - so add and recurse
    #print('New (best) solution found for cube:')
    #PrintCubeShort(Cube)
    #print (Moves)
    SolutionsCubePaths[CubeAsString] = Moves
    
    if (Step == MaxStep):
        #print('End of recursion')
        return

    MovesToTry = ["T2", "R2", "F2", "T", "T'", "R", "R'", "F", "F'"]

    for m in MovesToTry:
        NewCube = TransformRubiks2x2(Cube, m)
        NewMoves = Moves[:]
        NewMoves.append(m)
        FindAllSolutionsRecursive(NewCube, SolutionsCubes, SolutionsCubePaths, Step + 1, MaxStep, NewMoves)
    
FindAllSolutions()


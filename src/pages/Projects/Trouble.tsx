import { Button, Grid, IconButton, Modal, Typography } from "@mui/material";
import {
  CropDinOutlined,
  LooksOne,
  LooksTwo,
  Looks3,
  Looks4,
  Close,
} from "@mui/icons-material";
import oneDie from "images/dice/dice-one.svg";
import twoDie from "images/dice/dice-two.svg";
import threeDie from "images/dice/dice-three.svg";
import fourDie from "images/dice/dice-four.svg";
import fiveDie from "images/dice/dice-five.svg";
import sixDie from "images/dice/dice-six.svg";
import React, { useRef } from "react";

const HOME = -1;
const startEndSpaces = [1, 8, 15, 22];

const colorMapping = ["red", "green", "#FFC133", "purple"];
const dieMapping = {
  1: oneDie,
  2: twoDie,
  3: threeDie,
  4: fourDie,
  5: fiveDie,
  6: sixDie,
};

const introText = `WELCOME TO THE GAME OF TROUBLE`;
// The rules are simple
// Players roll to see who goes first
// All pegs start in HOME, in order to leave HOME the player must roll a 6
// The game ends when a player has moved all of their pegs into their FINISH line
// Players cannot move a peg onto a space occupied by another one of their pegs
// If your peg lands on an opponent's peg, their peg is sent back HOME`;

const startRollText = "Roll to see who goes first";
const startRollTieText = "There was a tie, let's roll some more!";

const nextMoveText = (playerId: number) => {
  return `PLAYER ${playerId}: IT IS YOUR TURN, PLEASE ROLL THE DIE`;
};

const noValidMovesText = (playerId: number) => {
  return `NO VALID MOVES
   PLAYER ${playerId} YOUR TURN IS OVER `;
};

const validMoveText = (playerId: number) => {
  return `PLAYER ${playerId}: CHOOSE A PEG TO MOVE`;
};

const invalidMoveText = (playerId: number) => {
  return `PLAYER ${playerId}: THIS IS NOT A VALID PEG, PLEASE TRY ANOTHER MOVE;`;
};

interface Peg {
  id: number;
  player: number;
  space: number;
  isStarted: boolean;
  inFinish: boolean;
}

class Player {
  id: number;
  pegs: Peg[] = [];

  constructor(iter: number) {
    this.id = iter;
  }
}

function Console({ text }) {
  const [output, setOutput] = React.useState(text[0]);
  const outputIdx = useRef(0);

  React.useEffect(() => {
    function tick() {
      setOutput((prev: string) => prev + text[++outputIdx.current]);
    }
    if (outputIdx.current < text.length - 1 && text.includes(output)) {
      let addChar = setInterval(tick, 35);
      return () => clearInterval(addChar);
    } else if (outputIdx.current === output.length - 1 && output !== text) {
      setOutput(text[0]);
      outputIdx.current = 0;
    }
  }, [text, output]);

  return (
    <Grid
      sx={{
        backgroundColor: "black",
        margin: "2rem",
        padding: "2rem 0rem",
        borderRadius: "1rem",
      }}
    >
      {output.split("\n").map((out, key) => (
        <Typography variant="h6" color="white" textAlign="center" key={key}>
          {out}
        </Typography>
      ))}
    </Grid>
  );
}

export function Trouble() {
  //BOARD
  const [track, setTrack] = React.useState(new Array<Peg>(28).fill(undefined));
  const [home, setHome] = React.useState(
    new Array<[Peg]>(4).fill(undefined).map(() => new Array<Peg>(4))
  );
  const [finish, setFinish] = React.useState(
    new Array<[Peg]>(4).fill(undefined).map(() => new Array<Peg>(4))
  );

  //GAME PLAY
  const [lastRoll, setLastRoll] = React.useState(6);
  const [started, setStarted] = React.useState(false);
  //   const [finished, setFinished] = React.useState(false);
  const [numPlayers, setNumPlayers] = React.useState(0);
  const [players, setPlayers] = React.useState([]);
  const [playerTurn, setPlayerTurn] = React.useState(0);
  const [playerCanMove, setPlayerCanMove] = React.useState(false);

  //ROLL TO START
  const [playersWithMaxRoll, setPlayersWithMaxRoll] = React.useState([]);
  const [playersToRemove, setPlayersToRemove] = React.useState([]);
  const [playersToRoll, setPlayersToRoll] = React.useState([]);
  const [maxRoll, setMaxRoll] = React.useState(0);
  const [rolling, setRolling] = React.useState(false);
  const [rolls, setRolls] = React.useState(new Array(4).fill(0));

  //MODAL
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    initGame();
    setOpen(false);
  };

  //TEXT
  const [outputText, setOutputText] = React.useState(introText);

  const pegJSX = (peg: Peg, color: string) => {
    const style = { color };
    const onClick = (e) => {
      if (
        started &&
        playerCanMove &&
        playerTurn === peg.player &&
        isValidMove(peg)
      ) {
        move(peg.id);
      }
    };
    return [
      <Grid item>
        <IconButton onClick={onClick} sx={{ padding: 0 }}>
          <LooksOne fontSize="large" style={style} />
        </IconButton>
      </Grid>,
      <Grid item>
        <IconButton onClick={onClick} sx={{ padding: 0 }}>
          <LooksTwo fontSize="large" style={style} />
        </IconButton>
      </Grid>,
      <Grid item>
        <IconButton onClick={onClick} sx={{ padding: 0 }}>
          <Looks3 fontSize="large" style={style} />
        </IconButton>
      </Grid>,
      <Grid item>
        <IconButton onClick={onClick} sx={{ padding: 0 }}>
          <Looks4 fontSize="large" style={style} />
        </IconButton>
      </Grid>,
    ][peg.id];
  };

  const spaceJSX = (peg: Peg, colorIdx: number) => {
    return peg && peg.space ? (
      pegJSX(peg, colorMapping[peg.player])
    ) : (
      <Grid item>
        <CropDinOutlined
          fontSize="large"
          style={{ color: colorMapping[colorIdx] }}
        />
      </Grid>
    );
  };

  const turnBoardJSX = () => {
    return (
      <Grid container direction="column">
        {new Array(numPlayers).fill(undefined).map((_, idx) => {
          const player = playersToRoll[playerTurn];
          const isTurn = player && player.id === idx;
          return (
            <Grid
              key={idx}
              sx={{
                backgroundColor: isTurn ? colorMapping[idx] : "white",
              }}
              textAlign={!started ? "left" : "center"}
            >
              <Typography
                paddingLeft={!started ? "1rem" : "0rem"}
                fontWeight={isTurn ? "bold" : "normal"}
                color={
                  isTurn && (player.id === 0 || player.id === 2)
                    ? "black"
                    : isTurn && (player.id === 1 || player.id === 3)
                    ? "white"
                    : colorMapping[idx]
                }
                sx={{
                  background: "rgba(0,0,0,0)",
                  display: "inline",
                }}
              >
                Player {idx + 1}
              </Typography>
              {!started && (
                <Typography
                  sx={{
                    background: "rgba(0,0,0,0)",
                    display: "inline",
                  }}
                >
                  {": " + rolls[idx]}
                </Typography>
              )}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const dieJSX = (face: number) => {
    const className = rolling || started ? "spin-die" : "";
    const onClick = rolling
      ? startRoll
      : started && !playerCanMove
      ? () => {
          roll();
        }
      : () => {};
    return (
      <img
        key={Math.random()}
        src={dieMapping[face]}
        width="5%"
        onClick={onClick}
        className={className}
        alt="die"
      ></img>
    );
  };

  const roll = () => {
    let thisRoll: number;
    const rolling = setInterval(() => {
      thisRoll = Math.floor(Math.random() * 6) + 1;
      setLastRoll(thisRoll);
    }, 250);
    setTimeout(() => {
      clearInterval(rolling);
      if (checkValidMoves(thisRoll)) {
        setPlayerCanMove(true);
      }
    }, 900);
  };

  const startRoll = () => {
    let thisRoll: number;
    const rolling = setInterval(() => {
      thisRoll = Math.floor(Math.random() * 6) + 1;
      setLastRoll(thisRoll);
    }, 250);
    setTimeout(() => {
      clearInterval(rolling);
      rolls[playersToRoll[playerTurn].id] = thisRoll;
      setRolls(rolls);

      let maxRollers = playersWithMaxRoll;
      let removable = playersToRemove;
      let ended = false;
      if (thisRoll > maxRoll) {
        setMaxRoll(thisRoll);
        removable = removable.concat(playersWithMaxRoll);
        setPlayersToRemove(removable);
        maxRollers = [players[playerTurn]];
        setPlayersWithMaxRoll(maxRollers);
      } else if (thisRoll === maxRoll) {
        maxRollers = playersWithMaxRoll.concat([players[playerTurn]]);
        setPlayersWithMaxRoll(maxRollers);
      } else {
        removable.push(players[playerTurn]);
        setPlayersToRemove(removable);
      }
      if (playerTurn === playersToRoll.length - 1 && maxRollers.length > 1) {
        setOutputText(startRollTieText);
      } else if (playerTurn === playersToRoll.length - 1) {
        ended = true;
        setRolling(false);
        setStarted(true);
      }

      const nextTurn = (playerTurn + 1) % playersToRoll.length;
      const maxRolls = maxRollers[0].id;
      setPlayerTurn(!ended ? nextTurn : maxRolls);
      if (nextTurn === 0) {
        setMaxRoll(0);
        setRolls(new Array(numPlayers).fill(0));

        const removableIds = removable.map((p) => p.id);

        const rollable = playersToRoll.filter(
          (p) => !removableIds.includes(p.id)
        );

        if (!ended) {
          setPlayersToRoll(rollable);
          setPlayersWithMaxRoll(new Array(rollable.length));
        } else {
          setPlayersToRoll(players);
          setOutputText(`Player ${maxRolls + 1} goes first!`);
        }
      }
    }, 900);
  };

  const initGame = () => {
    const newPlayers = new Array(numPlayers);
    const newHome = new Array<[Peg]>(4)
      .fill(undefined)
      .map(() => new Array<Peg>(4));

    for (let i = 0; i < newPlayers.length; i++) {
      const newPlayer = new Player(i);
      for (let j = 0; j < 4; j++) {
        const peg: Peg = {
          player: i,
          id: j,
          space: HOME,
          isStarted: false,
          inFinish: false,
        };

        newHome[i][j] = peg;
        newPlayer.pegs[j] = peg;
      }
      newPlayers[i] = newPlayer;
    }

    setPlayers(newPlayers);
    setHome(newHome);
    setPlayersToRoll(newPlayers);
    setRolls(new Array(numPlayers).fill(0));
    setRolling(true);
    setOutputText(startRollText);
  };

  const getFinalSpace = (startSpace: number, startEnd: number) => {
    let finalSpace: number;
    if (startSpace === HOME) {
      finalSpace = startEnd + 1;
    } else {
      finalSpace = (startSpace + lastRoll) % 28;
    }
    return finalSpace;
  };

  const isGoingIntoFinish = (
    peg: Peg,
    startSpace: number,
    finalSpace: number,
    startEnd: number
  ) => {
    //edge case for player 4 looping back around
    if (peg.player === 3) {
      const betweenStartAndZero =
        peg.isStarted &&
        (startSpace === startEnd || startSpace === startEnd + 1);

      const looped = finalSpace === 0 || finalSpace === 1;

      if (betweenStartAndZero && looped) finalSpace += 27;
    }
    const pastStartEnd = finalSpace > startEnd + 1;
    const finishing = (startSpace + lastRoll) % 28 <= startEnd + lastRoll + 1;
    return peg.isStarted && pastStartEnd && finishing;
  };

  const stomp = (oppPeg: Peg) => {
    oppPeg.space = HOME;
    oppPeg.isStarted = false;

    const newHome = [...home];
    newHome[oppPeg.player][oppPeg.id] = oppPeg;
    setHome(newHome);
  };

  const move = (pegId: number) => {
    const newPlayers = [...players];
    const player: Player = newPlayers[playerTurn];
    const peg = player.pegs[pegId];

    const startSpace = player.pegs[pegId].space;
    const startEnd = startEndSpaces[player.id];
    const finalSpace = getFinalSpace(startSpace, startEnd);

    const newHome = [...home];
    const newTrack = [...track];
    const newFinish = [...finish];

    if (startSpace === HOME) {
      newHome[player.id][pegId] = undefined;
      setHome(newHome);

      const oppPeg = track[finalSpace];
      if (oppPeg) stomp(oppPeg);

      newTrack[finalSpace] = peg;
      setTrack(newTrack);
    } else if (peg.inFinish) {
      newFinish[player.id][startSpace - (startEnd + 2)] = undefined;
      newFinish[player.id][finalSpace - (startEnd + 2)] = peg;
    } else if (isGoingIntoFinish(peg, startSpace, finalSpace, startEnd)) {
      newFinish[player.id][finalSpace - (startEnd + 2)] = peg;
      peg.inFinish = true;
      peg.space = finalSpace;
      track[startSpace] = undefined;
    } else {
      newTrack[startSpace] = undefined;

      if (startSpace === startEnd + 1) peg.isStarted = true;
      const oppPeg = newTrack[finalSpace];
      if (oppPeg) stomp(oppPeg);

      newTrack[finalSpace] = peg;
      setTrack(newTrack);
    }

    const nextPlayer = (playerTurn + 1) % numPlayers;
    peg.space = finalSpace;
    setPlayers(newPlayers);
    setPlayerTurn(nextPlayer);
    setOutputText(nextMoveText(nextPlayer));
    setPlayerCanMove(false);
  };

  const otherPegLogic = (peg: Peg, otherPeg: Peg) => {
    if (otherPeg) {
      if (peg.player === otherPeg.player) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const isValidMove = (peg: Peg) => {
    const startSpace = peg.space;
    const startEnd = startEndSpaces[peg.player];

    const finalSpace = getFinalSpace(startSpace, lastRoll);
    const finishLine = finalSpace - (startEnd + 2);

    let isValid;
    //LEAVING HOME
    if (startSpace === HOME) {
      if (lastRoll === 6) {
        const otherPeg = track[startEnd + 1];
        isValid = otherPegLogic(peg, otherPeg);
      } else {
        isValid = false;
      }
    } else if (peg.inFinish) {
      //IN FINISH LINE
      if (startSpace + lastRoll <= startEnd + 5) {
        const otherPeg = finish[peg.player][finishLine];
        isValid = !otherPeg;
      } else {
        isValid = false;
      }
    } else if (isGoingIntoFinish(peg, startSpace, finalSpace, startEnd)) {
      // GOING INTO FINISH
      const otherPeg = finish[peg.player][finishLine];
      isValid = otherPegLogic(peg, otherPeg);
    } else {
      //ON TRACK
      const otherPeg = track[finalSpace];
      isValid = otherPegLogic(peg, otherPeg);
    }

    if (!isValid) {
      setOutputText(invalidMoveText(peg.player + 1));
    }

    return isValid;
  };

  const checkValidMoves = (thisRoll: number) => {
    let invalidMoves = 0;
    const player: Player = players[playerTurn];
    const startEnd = startEndSpaces[player.id];

    for (const peg of player.pegs) {
      const startSpace = peg.space;
      const finalSpace = getFinalSpace(startSpace, thisRoll);
      const goingIntoFinish = isGoingIntoFinish(
        peg,
        startSpace,
        finalSpace,
        startEnd
      );
      let otherPeg: Peg;

      //home and not a 6
      if (startSpace === HOME && thisRoll !== 6) {
        invalidMoves++;
        continue;
      }

      //past finish (in finish)
      if (peg.inFinish) {
        if (startSpace + thisRoll > startEnd + 5) {
          invalidMoves++;
          continue;
        }
      }

      //past finish (going into finish)
      if (goingIntoFinish) {
        if (finalSpace > startEnd + 5) {
          invalidMoves++;
          continue;
        }
      }

      //land on own peg
      if (startSpace === HOME) {
        otherPeg = track[startEnd + 1];
      } else if (goingIntoFinish || peg.inFinish) {
        const finishLine = finalSpace - (startEnd + 2);
        if (finishLine > 3) {
          invalidMoves++;
          continue;
        } else {
          otherPeg = finishLine[player.id][finishLine];
        }
      } else {
        otherPeg = track[finalSpace];
      }

      if (otherPeg && peg.player === otherPeg.player) {
        invalidMoves++;
        continue;
      }
    }

    const nextPlayer = (playerTurn + 1) % numPlayers;
    const playerId = nextPlayer + 1;
    if (invalidMoves === 4) {
      setPlayerTurn(nextPlayer);
      setOutputText(noValidMovesText(playerId));
      setOutputText(nextMoveText(playerId));
      return false;
    } else {
      setOutputText(validMoveText(playerId));
      return true;
    }
  };

  return (
    <Grid height="100vh">
      {/* TITLE */}
      <Typography textAlign="center" variant="h3">
        GAME OF TROUBLE
      </Typography>

      {/* BOARD */}
      <Grid
        container
        justifyContent="center"
        width="37rem"
        direction="column"
        sx={{
          backgroundColor: "black",
          padding: "2rem 0rem",
          borderRadius: "1rem",
        }}
        margin="auto"
      >
        <Grid container justifyContent="space-between" padding="0rem 1rem">
          {/* START BUTTON AND MODAL */}
          <Button
            variant="contained"
            sx={{
              width: "20%",
              height: "20%",
              backgroundColor: "white",
              color: "black",
            }}
            onClick={handleOpen}
          >
            START
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Grid
              alignItems="center"
              justifyContent="center"
              sx={{ margin: "auto" }}
            >
              <Grid
                width="50%"
                sx={{
                  margin: "auto",
                  backgroundColor: "white",
                  borderRadius: ".5rem",
                  opacity: ".9",
                }}
              >
                <IconButton onClick={handleClose} sx={{ float: "left" }}>
                  <Close sx={{ color: "red" }}></Close>
                </IconButton>
                <Typography
                  variant="h6"
                  component="h2"
                  textAlign="center"
                  paddingTop="1rem"
                >
                  SELECT NUMBER OF PLAYERS
                </Typography>
                <Grid container justifyContent="center">
                  <Grid item>
                    <IconButton onClick={() => setNumPlayers(2)}>
                      <LooksTwo
                        className="selectTwo"
                        fontSize={numPlayers === 2 ? "large" : "small"}
                        style={{ color: colorMapping[1] }}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => setNumPlayers(3)}>
                      <Looks3
                        className="selectThree"
                        fontSize={numPlayers === 3 ? "large" : "small"}
                        style={{ color: colorMapping[2] }}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => setNumPlayers(4)}>
                      <Looks4
                        className="selectFour"
                        fontSize={numPlayers === 4 ? "large" : "small"}
                        style={{ color: colorMapping[3] }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{ width: "50%", margin: "0 auto 1rem" }}
                    onClick={handleClose}
                  >
                    LET'S GO
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Modal>

          {/* HOME 0 */}

          <Grid container direction="column" sx={{ width: "20%" }}>
            <Grid container justifyContent="center">
              {new Array(3)
                .fill(undefined)
                .map((_, idx) => spaceJSX(home[0][idx], 0))}
            </Grid>
            <Grid container justifyContent="center">
              {spaceJSX(home[0][3], 0)}
            </Grid>
          </Grid>
          {numPlayers > 0 ? (
            <Grid
              container
              direction="column"
              sx={{
                width: "20%",
                backgroundColor: "white",
                borderRadius: ".5rem",
                marginTop: "-1rem",
              }}
              justifyItems="center"
              overflow="hidden"
            >
              {turnBoardJSX()}
            </Grid>
          ) : (
            <Grid width="20%"></Grid>
          )}
        </Grid>

        {/* TOP ROW */}
        <Grid container justifyContent="center" spacing={2}>
          {[0, 1, 2, 3, 4].map((space) => spaceJSX(track[space], 0))}
        </Grid>

        {/* TOP DIAGONALS AND MIDDLE HOME */}
        <Grid container justifyContent="center">
          <Grid container width="18rem" justifyContent="space-between">
            {spaceJSX(track[27], 0)}
            {spaceJSX(finish[0][0], 0)}
            {spaceJSX(track[5], 0)}
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid container width="21rem" justifyContent="space-between">
            {spaceJSX(track[26], 3)}
            {spaceJSX(finish[0][1], 0)}
            {spaceJSX(track[6], 1)}
          </Grid>
        </Grid>

        {/* COLUMNS */}
        <Grid
          container
          width="37rem"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {/* TOP ROW FOR COLUMNS*/}
          <Grid container item width="24rem" justifyContent="space-between">
            {spaceJSX(track[25], 3)}
            {spaceJSX(finish[0][2], 0)}
            {spaceJSX(track[7], 1)}
          </Grid>
          {/* TOP HOME AND FINISH */}
          <Grid container justifyContent="space-between">
            <Grid container width="8.5rem" justifyContent="space-between">
              <Grid container width="4.5rem" justifyContent="flex-end">
                <Grid item>{spaceJSX(home[3][0], 3)}</Grid>
              </Grid>
              <Grid item>{spaceJSX(track[24], 3)}</Grid>
            </Grid>
            <Grid item>{spaceJSX(finish[0][3], 0)}</Grid>
            <Grid container width="8.5rem" justifyContent="space-between">
              {spaceJSX(track[8], 1)}
              <Grid container width="4.5rem" justifyContent="flex-start">
                <Grid item>{spaceJSX(home[1][0], 1)}</Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* MIDDLE HOME AND FINISH */}
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            width="36rem"
          >
            <Grid container item width="17rem" justifyContent="flex-end">
              {spaceJSX(home[3][1], 3)}
              {spaceJSX(home[3][3], 3)}
              {spaceJSX(track[23], 3)}
              {new Array(4)
                .fill(undefined)
                .map((_, idx) => spaceJSX(finish[3][idx], 3))}
            </Grid>
            {dieJSX(lastRoll)}
            <Grid container item width="17rem" justifyContent="flex-start">
              {new Array(4)
                .fill(undefined)
                .map((_, idx) => spaceJSX(finish[1][idx], 1))}
              {spaceJSX(track[9], 1)}
              {spaceJSX(home[1][3], 1)}
              {spaceJSX(home[1][1], 1)}
            </Grid>
          </Grid>

          {/* BOTTOM HOME AND FINISH */}
          <Grid container justifyContent="space-between">
            <Grid container width="8.5rem" justifyContent="space-between">
              <Grid container width="4.5rem" justifyContent="flex-end">
                {spaceJSX(home[3][2], 3)}
              </Grid>
              {spaceJSX(track[22], 3)}
            </Grid>
            {spaceJSX(finish[2][3], 2)}
            <Grid container width="8.5rem" justifyContent="space-between">
              {spaceJSX(track[10], 1)}

              <Grid container width="4.5rem" justifyContent="flex-start">
                {spaceJSX(home[1][2], 1)}
              </Grid>
            </Grid>
          </Grid>

          {/* BOTTOM ROW FOR COLUMNS */}
          <Grid container item width="24rem" justifyContent="space-between">
            {spaceJSX(track[21], 3)}
            {spaceJSX(finish[2][2], 2)}
            {spaceJSX(track[11], 1)}
          </Grid>
        </Grid>

        {/* BOTTOM DIAGONALS AND MIDDLE HOME */}

        <Grid container justifyContent="center">
          <Grid container width="21rem" justifyContent="space-between">
            {spaceJSX(track[20], 3)}
            {spaceJSX(finish[2][1], 2)}
            {spaceJSX(track[12], 1)}
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid container width="18rem" justifyContent="space-between">
            {spaceJSX(track[19], 2)}
            {spaceJSX(finish[2][0], 2)}
            {spaceJSX(track[13], 2)}
          </Grid>
        </Grid>

        {/* BOTTOM ROW */}
        <Grid container justifyContent="center" spacing={2}>
          {[18, 17, 16, 15, 14].map((space) => spaceJSX(track[space], 2))}
        </Grid>

        {/* HOME 2 */}
        <Grid direction="column" container>
          <Grid container justifyContent="center">
            {spaceJSX(home[2][3], 2)}
          </Grid>
          <Grid container justifyContent="center">
            {new Array(3)
              .fill(undefined)
              .map((_, idx) => spaceJSX(home[2][idx], 2))}
          </Grid>
        </Grid>
      </Grid>
      {/* CONSOLE OUTPUT */}
      <Console text={outputText}></Console>
    </Grid>
  );
}

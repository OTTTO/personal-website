import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  ThemeProvider,
  Typography,
} from "@mui/material";
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
import React, { useContext, useEffect, useRef } from "react";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import mainTheme from "themes/mainTheme";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Peg, Player } from "types/trouble";
import { ThemeContext } from "context/theme";
import { getMainTheme } from "utils/utils";
import { Title } from "components/TItle";
import { TitleDivider } from "components/TitleDivider";

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

const instructions = `Players roll to see who goes first
All pegs start in HOME, in order to leave HOME the player must roll a 6
When you leave HOME you only advance to the entry space
Players cannot move a peg onto a space occupied by another one of their pegs
If your peg lands on an opponent's peg, their peg is sent back HOME
The game ends when a player has moved all of their pegs into their FINISH line`;

const startRollText = `ROLL TO SEE WHO GOES FIRST
PLAYER 1: YOUR UP, CLICK THE DIE`;

const rollingText = (playerId: number) => {
  return `PLAYER ${playerId}: YOUR UP`;
};

const startRollTieText = `THERE WAS A TIE
    LET'S ROLL SOME MORE!`;

const nextMoveText = (playerId: number) => {
  return `PLAYER ${playerId}: IT IS YOUR TURN, PLEASE ROLL`;
};

const noValidMovesText = (endPlayerId: number, startPlayerId: number) => {
  return `NO VALID MOVES
   PLAYER ${endPlayerId}: YOUR TURN IS OVER
   PLAYER ${startPlayerId}: IT IS YOUR TURN
   `;
};

const validMoveText = (playerId: number) => {
  return `PLAYER ${playerId}: CHOOSE A PEG TO MOVE`;
};

const invalidMoveText = (playerId: number) => {
  return `PLAYER ${playerId}: THIS IS NOT A VALID PEG
  PLEASE TRY ANOTHER MOVE`;
};

const winRollText = (playerId: number) => {
  return `PLAYER ${playerId}: YOU WON THE DIE ROLL
   IT IS YOUR TURN`;
};

const gameOverText = (playerId: number) => {
  return `PLAYER ${playerId} WON THE GAME!`;
};

function Console({ text, update, finished, playerTurn }) {
  const [output, setOutput] = React.useState(text[0]);

  const [lastUpdate, setLastUpdate] = React.useState(update);

  const outputIdx = useRef(0);

  if (update !== lastUpdate) {
    setOutput(text[0]);
    outputIdx.current = 0;
    setLastUpdate(update);
  }

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
        margin: "1rem auto",
        padding: "2rem 0rem",
        borderRadius: "1rem",
        maxWidth: "37rem",
        width: "80%",
      }}
    >
      {output.split("\n").map((out, key) => (
        <Typography
          variant={!finished ? "h6" : "h4"}
          color={!finished ? "white" : colorMapping[playerTurn]}
          textAlign="center"
          key={key}
        >
          {out}
        </Typography>
      ))}
    </Grid>
  );
}

export function Trouble() {
  //BOARD
  const [track, setTrackState] = React.useState(new Array<Peg>(28).fill(null));
  const [home, setHomeState] = React.useState(
    new Array<[Peg]>(4).fill(null).map(() => new Array<Peg>(4))
  );
  const [finish, setFinishState] = React.useState(
    new Array<[Peg]>(4).fill(null).map(() => new Array<Peg>(4))
  );

  //BOARD STORAGE
  const getTrack = () => {
    return JSON.parse(sessionStorage.getItem("track")) || track;
  };
  const setTrack = (track) => {
    sessionStorage.setItem("track", JSON.stringify(track));
    setTrackState(track);
  };

  const getHome = () => {
    return JSON.parse(sessionStorage.getItem("home")) || home;
  };
  const setHome = (home) => {
    sessionStorage.setItem("home", JSON.stringify(home));
    setHomeState(home);
  };

  const getFinish = () => {
    return JSON.parse(sessionStorage.getItem("finish")) || finish;
  };

  const setFinish = (finish) => {
    sessionStorage.setItem("finish", JSON.stringify(finish));
    setFinishState(finish);
  };

  //GAME PLAY
  const [lastRoll, setLastRollState] = React.useState(6);
  const [started, setStartedState] = React.useState(false);
  const [finished, setFinishedState] = React.useState(false);
  const [numPlayers, setNumPlayersState] = React.useState(0);
  const [players, setPlayersState] = React.useState([]);
  const [playerTurn, setPlayerTurnState] = React.useState(0);
  const [playerCanMove, setPlayerCanMoveState] = React.useState(false);
  const [isRolling, setIsRollingState] = React.useState(false);

  //GAME PLAY STORAGE
  const getLastRoll = () => {
    return JSON.parse(sessionStorage.getItem("lastRoll")) || lastRoll;
  };
  const setLastRoll = (lastRoll) => {
    sessionStorage.setItem("lastRoll", JSON.stringify(lastRoll));
    setLastRollState(lastRoll);
  };
  const getStarted = () => {
    return JSON.parse(sessionStorage.getItem("started")) || started;
  };
  const setStarted = (started) => {
    sessionStorage.setItem("started", JSON.stringify(started));
    setStartedState(started);
  };
  const getFinished = () => {
    return JSON.parse(sessionStorage.getItem("finished")) || finished;
  };
  const setFinished = (finished) => {
    sessionStorage.setItem("finished", JSON.stringify(finished));
    setFinishedState(finished);
  };
  const getNumPlayers = () => {
    return JSON.parse(sessionStorage.getItem("numPlayers")) || numPlayers;
  };
  const setNumPlayers = (numPlayers) => {
    sessionStorage.setItem("numPlayers", JSON.stringify(numPlayers));
    setNumPlayersState(numPlayers);
  };
  const getPlayers = () => {
    return JSON.parse(sessionStorage.getItem("players")) || players;
  };
  const setPlayers = (players) => {
    sessionStorage.setItem("players", JSON.stringify(players));
    setPlayersState(players);
  };
  const getPlayerTurn = () => {
    return JSON.parse(sessionStorage.getItem("playerTurn")) || playerTurn;
  };
  const setPlayerTurn = (playerTurn) => {
    sessionStorage.setItem("playerTurn", JSON.stringify(playerTurn));
    setPlayerTurnState(playerTurn);
  };
  const getPlayerCanMove = () => {
    return JSON.parse(sessionStorage.getItem("playerCanMove")) || playerCanMove;
  };
  const setPlayerCanMove = (playerCanMove) => {
    sessionStorage.setItem("playerCanMove", JSON.stringify(playerCanMove));
    setPlayerCanMoveState(playerCanMove);
  };
  const getIsRolling = () => {
    return JSON.parse(sessionStorage.getItem("isRolling")) || isRolling;
  };
  const setIsRolling = (isRolling) => {
    sessionStorage.setItem("isRolling", JSON.stringify(isRolling));
    setIsRollingState(isRolling);
  };

  //ROLL TO START
  const [playersWithMaxRoll, setPlayersWithMaxRollState] = React.useState([]);
  const [playersToRemove, setPlayersToRemoveState] = React.useState([]);
  const [playersToRoll, setPlayersToRollState] = React.useState([]);
  const [maxRoll, setMaxRollState] = React.useState(0);
  const [rolling, setRollingState] = React.useState(false);
  const [rolls, setRollsState] = React.useState(new Array(4).fill(0));

  //ROLL TO START STORAGE
  const getPlayersWithMaxRoll = () => {
    return (
      JSON.parse(sessionStorage.getItem("playersWithMaxRoll")) ||
      playersWithMaxRoll
    );
  };
  const setPlayersWithMaxRoll = (playersWithMaxRoll) => {
    sessionStorage.setItem(
      "playersWithMaxRoll",
      JSON.stringify(playersWithMaxRoll)
    );
    setPlayersWithMaxRollState(playersWithMaxRoll);
  };
  const getPlayersToRemove = () => {
    return (
      JSON.parse(sessionStorage.getItem("playersToRemove")) || playersToRemove
    );
  };
  const setPlayersToRemove = (playersToRemove) => {
    sessionStorage.setItem("playersToRemove", JSON.stringify(playersToRemove));
    setPlayersToRemoveState(playersToRemove);
  };
  const getPlayersToRoll = () => {
    return JSON.parse(sessionStorage.getItem("playersToRoll")) || playersToRoll;
  };
  const setPlayersToRoll = (playersToRoll) => {
    sessionStorage.setItem("playersToRoll", JSON.stringify(playersToRoll));
    setPlayersToRollState(playersToRoll);
  };
  const getMaxRoll = () => {
    return JSON.parse(sessionStorage.getItem("maxRoll")) || maxRoll;
  };
  const setMaxRoll = (maxRoll) => {
    sessionStorage.setItem("maxRoll", JSON.stringify(maxRoll));
    setMaxRollState(maxRoll);
  };
  const getRolling = () => {
    return JSON.parse(sessionStorage.getItem("rolling")) || rolling;
  };

  const setRolling = (rolling) => {
    sessionStorage.setItem("rolling", JSON.stringify(rolling));
    setRollingState(rolling);
  };
  const getRolls = () => {
    return JSON.parse(sessionStorage.getItem("rolls")) || rolls;
  };
  const setRolls = (rolls) => {
    sessionStorage.setItem("rolls", JSON.stringify(rolls));
    setRollsState(rolls);
  };

  //SELECT MODAL
  const [openSelect, setOpenSelect] = React.useState(false);
  const handleOpenSelect = () => setOpenSelect(true);
  const handleCloseSelect = () => setOpenSelect(false);

  //INSTRUCTIONS MODAL
  const [openInstructions, setOpenInstructions] = React.useState(false);
  const handleOpenInstructions = () => setOpenInstructions(true);
  const handleCloseInstructions = () => setOpenInstructions(false);

  //TEXT
  const [outputText, setOutputTextState] = React.useState(introText);
  const getOutputText = () => {
    return JSON.parse(sessionStorage.getItem("outputText")) || outputText;
  };
  const setOutputText = (outputText) => {
    sessionStorage.setItem("outputText", JSON.stringify(outputText));
    setOutputTextState(outputText);
  };
  const [update, updateState] = React.useState({});

  const changeOutput = (text: string) => {
    setOutputText(text);
    updateState({});
  };

  //SET STATE WITH SESSION
  useEffect(() => {
    setTrack(getTrack());
    setHome(getHome());
    setFinish(getFinish());
    setLastRoll(getLastRoll());
    setStarted(getStarted());
    setFinished(getFinished());
    setNumPlayers(getNumPlayers());
    setPlayers(getPlayers());
    setPlayerTurn(getPlayerTurn());
    setPlayerCanMove(getPlayerCanMove());
    setIsRolling(getIsRolling());
    setPlayersWithMaxRoll(getPlayersWithMaxRoll());
    setPlayersToRemove(getPlayersToRemove());
    setPlayersToRoll(getPlayersToRoll());
    setMaxRoll(getMaxRoll());
    setRolling(getRolling());
    setRolls(getRolls());
    setOutputText(getOutputText());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pegJSX = (peg: Peg, color: string, idx: number) => {
    const style = { color };
    const onClick = () => {
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
      <Grid item key={idx}>
        <IconButton onClick={onClick} sx={{ padding: 0, fontSize: "1.4rem" }}>
          <LooksOne fontSize={isSmall ? "large" : "inherit"} style={style} />
        </IconButton>
      </Grid>,
      <Grid item key={idx}>
        <IconButton onClick={onClick} sx={{ padding: 0, fontSize: "1.4rem" }}>
          <LooksTwo fontSize={isSmall ? "large" : "inherit"} style={style} />
        </IconButton>
      </Grid>,
      <Grid item key={idx}>
        <IconButton onClick={onClick} sx={{ padding: 0, fontSize: "1.4rem" }}>
          <Looks3 fontSize={isSmall ? "large" : "inherit"} style={style} />
        </IconButton>
      </Grid>,
      <Grid item key={idx}>
        <IconButton onClick={onClick} sx={{ padding: 0, fontSize: "1.4rem" }}>
          <Looks4 fontSize={isSmall ? "large" : "inherit"} style={style} />
        </IconButton>
      </Grid>,
    ][peg.id];
  };

  const spaceJSX = (peg: Peg, colorIdx: number, idx: number) => {
    return peg && peg.space !== undefined ? (
      pegJSX(peg, colorMapping[peg.player], idx)
    ) : (
      <Grid item key={idx} sx={{ fontSize: "1.3rem" }}>
        <CropDinOutlined
          fontSize={isSmall ? "large" : "inherit"}
          style={{ color: colorMapping[colorIdx] }}
        />
      </Grid>
    );
  };

  const turnBoardJSX = () => {
    return (
      <Grid container direction="column">
        {new Array(numPlayers).fill(null).map((_, idx) => {
          const player = playersToRoll[playerTurn];
          const isTurn = player && player.id === idx;
          return (
            <Grid
              key={idx}
              sx={{
                backgroundColor: isTurn ? colorMapping[idx] : "white",
              }}
              textAlign={"center"}
            >
              <Typography
                fontSize={isSmall ? "1rem" : ".8rem"}
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
                  fontSize={isSmall ? "1rem" : ".8rem"}
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
    const className = rolling || (started && isRolling) ? "spin-die" : "";
    const onClick = rolling
      ? startRoll
      : started && !playerCanMove && !isRolling && !finished
      ? roll
      : () => {};
    return (
      <img
        key={Math.random()}
        src={dieMapping[face]}
        width={isSmall ? "5%" : "6%"}
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
      setIsRolling(true);
    }, 100);

    setTimeout(() => {
      clearInterval(rolling);
      setIsRolling(false);
      if (checkValidMoves(thisRoll)) {
        setPlayerCanMove(true);
      }
    }, 650);
  };

  const startRoll = () => {
    let thisRoll: number;
    const rolling = setInterval(() => {
      thisRoll = Math.floor(Math.random() * 6) + 1;
      setLastRoll(thisRoll);
      setIsRolling(true);
    }, 100);

    setTimeout(() => {
      clearInterval(rolling);
      setIsRolling(false);

      setLastRoll(thisRoll);
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
        changeOutput(startRollTieText);
      } else if (playerTurn === playersToRoll.length - 1) {
        ended = true;
        setRolling(false);
        setStarted(true);
      }

      const nextTurn = (playerTurn + 1) % playersToRoll.length;
      const maxRolls = maxRollers[0].id;
      setPlayerTurn(!ended ? nextTurn : maxRolls);
      changeOutput(rollingText(nextTurn + 1));
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
          changeOutput(winRollText(maxRolls + 1));
        }
      }
    }, 650);
  };

  const initGame = () => {
    const newPlayers = new Array(numPlayers);
    const home = getHome();
    const newHome = [...home];

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
    changeOutput(startRollText);
  };

  const getFinalSpace = (
    startSpace: number,
    startEnd: number,
    thisRoll: number
  ) => {
    let finalSpace: number;
    if (startSpace === HOME) {
      finalSpace = startEnd + 1;
    } else {
      finalSpace = (startSpace + thisRoll) % 28;
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
    const finalSpace = getFinalSpace(startSpace, startEnd, lastRoll);

    const newHome = [...home];
    const newTrack = [...track];
    const newFinish = [...finish];

    let finalMove = false;

    if (startSpace === HOME) {
      newHome[player.id][pegId] = null;
      setHome(newHome);

      const oppPeg = track[finalSpace];
      if (oppPeg) stomp(oppPeg);

      newTrack[finalSpace] = peg;
      setTrack(newTrack);
    } else if (peg.inFinish) {
      newFinish[player.id][startSpace - (startEnd + 2)] = null;
      newFinish[player.id][finalSpace - (startEnd + 2)] = peg;
      setFinish(newFinish);
      finalMove = checkWin(newFinish[player.id]);
    } else if (isGoingIntoFinish(peg, startSpace, finalSpace, startEnd)) {
      newFinish[player.id][finalSpace - (startEnd + 2)] = peg;
      peg.inFinish = true;
      peg.space = finalSpace;
      newTrack[startSpace] = null;
      setTrack(newTrack);
      setFinish(newFinish);
      finalMove = checkWin(newFinish[player.id]);
    } else {
      newTrack[startSpace] = null;

      if (startSpace === startEnd + 1) peg.isStarted = true;
      const oppPeg = newTrack[finalSpace];
      if (oppPeg) stomp(oppPeg);

      newTrack[finalSpace] = peg;
      setTrack(newTrack);
    }

    if (finalMove) {
      setFinished(true);
      changeOutput(gameOverText(playerTurn + 1));
    } else {
      const nextPlayer = (playerTurn + 1) % numPlayers;
      peg.space = finalSpace;
      setPlayers(newPlayers);
      setPlayerTurn(nextPlayer);
      changeOutput(nextMoveText(nextPlayer + 1));
      setPlayerCanMove(false);
    }
  };

  const otherPegLogic = (peg: Peg, otherPeg: Peg) => {
    if (otherPeg) {
      if (peg.player !== otherPeg.player) {
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

    const finalSpace = getFinalSpace(startSpace, startEnd, lastRoll);
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
      if (finalSpace <= startEnd + 5) {
        const otherPeg = finish[peg.player][finishLine];
        isValid = !otherPeg;
      } else {
        isValid = false;
      }
    } else if (isGoingIntoFinish(peg, startSpace, finalSpace, startEnd)) {
      // GOING INTO FINISH
      if (finalSpace <= startEnd + 5) {
        const otherPeg = finish[peg.player][finishLine];
        isValid = otherPegLogic(peg, otherPeg);
      } else {
        isValid = false;
      }
    } else {
      //ON TRACK
      const otherPeg = track[finalSpace];
      isValid = otherPegLogic(peg, otherPeg);
    }

    if (!isValid) {
      changeOutput(invalidMoveText(peg.player + 1));
    }

    return isValid;
  };

  const checkValidMoves = (thisRoll: number) => {
    let invalidMoves = 0;
    const player: Player = players[playerTurn];
    const startEnd = startEndSpaces[player.id];

    for (const peg of player.pegs) {
      const startSpace = peg.space;
      const finalSpace = getFinalSpace(startSpace, startEnd, thisRoll);
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
        if (finalSpace > startEnd + 5) {
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
          otherPeg = finish[player.id][finishLine];
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
    const playerId = playerTurn + 1;
    const nextPlayerId = nextPlayer + 1;
    if (invalidMoves === 4) {
      setPlayerTurn(nextPlayer);
      changeOutput(noValidMovesText(playerId, nextPlayerId));
      return false;
    } else {
      changeOutput(validMoveText(playerId));
      return true;
    }
  };

  const reset = () => {
    //BOARD
    setTrack(new Array<Peg>(28).fill(null));
    setHome(new Array<[Peg]>(4).fill(null).map(() => new Array<Peg>(4)));
    setFinish(new Array<[Peg]>(4).fill(null).map(() => new Array<Peg>(4)));

    //GAME PLAY
    setLastRoll(6);
    setStarted(false);
    setFinished(false);
    setNumPlayers(0);
    setPlayers([]);
    setPlayerTurn(0);
    setPlayerCanMove(false);

    //ROLL TO START
    setPlayersWithMaxRoll([]);
    setPlayersToRemove([]);
    setPlayersToRoll([]);
    setMaxRoll(0);
    setRolling(false);
    setRolls(new Array(4).fill(0));

    //TEXT
    setOutputText(" ");
  };

  const checkWin = (finishLine: Peg[]) => {
    for (const peg of finishLine) {
      if (!peg) {
        return false;
      }
    }
    return true;
  };

  const { width } = useWindowDimensions();
  const smallerDeviceWidth = 650;
  const isSmall = width > smallerDeviceWidth;
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid
      container
      direction="column"
      className={finished ? "fireworks" : ""}
      border="double thick black"
    >
      <ThemeProvider theme={mainTheme}>
        <Menu backgroundColor="black" borderSides />
      </ThemeProvider>
      <Grid
        // padding="1rem 0rem"
        border="solid black .1rem"
        width="99%"
        margin="0 auto .25rem auto"
        sx={{ background: getMainTheme(theme) }}
      >
        <Title title="TROUBLE" />
        <TitleDivider />
        <Grid
          container
          justifyContent="center"
          width={isSmall ? "37rem" : "21rem"}
          direction="column"
          sx={{
            backgroundColor: "black",
            padding: "2rem 0rem",
            borderRadius: "1rem",
          }}
          margin="1rem auto 0"
        >
          <Grid container justifyContent="space-between" padding="0rem 1rem">
            {/* START BUTTON */}
            {rolling || started || finished ? (
              <Button
                variant="contained"
                sx={{
                  width: isSmall ? "20%" : "25%",
                  height: "20%",
                  backgroundColor: "white",
                  color: "black",
                  marginTop: "-1rem",
                }}
                onClick={() => {
                  // eslint-disable-next-line no-restricted-globals
                  if (confirm("You are about to restart your game")) {
                    reset();
                    changeOutput(introText);
                    handleOpenSelect();
                  }
                }}
              >
                RESTART
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  width: isSmall ? "20%" : "25%",
                  height: "20%",
                  backgroundColor: "white",
                  color: "black",
                  marginTop: "-1rem",
                }}
                onClick={handleOpenSelect}
              >
                START
              </Button>
            )}

            {/* HOME 0 */}

            <Grid
              container
              direction="column"
              sx={{ width: isSmall ? "20%" : "25%" }}
            >
              <Grid container justifyContent="center">
                {new Array(3)
                  .fill(null)
                  .map((_, idx) => spaceJSX(home[0][idx], 0, idx))}
              </Grid>
              <Grid container justifyContent="center">
                {spaceJSX(home[0][3], 0, 0)}
              </Grid>
            </Grid>

            {/* TURN BOARD */}
            {numPlayers > 0 && (rolling || started) ? (
              <Grid
                container
                direction="column"
                sx={{
                  width: isSmall ? "20%" : "25%",
                  backgroundColor: "white",
                  borderRadius: ".5rem",
                  marginTop: "-1rem",
                  marginBottom: isSmall ? "-1rem" : "-1rem",
                }}
                justifyItems="center"
                overflow="hidden"
              >
                {turnBoardJSX()}
              </Grid>
            ) : (
              <Grid sx={{ width: isSmall ? "20%" : "25%" }}></Grid>
            )}
          </Grid>

          {/* TOP ROW */}
          <Grid container justifyContent="center" spacing={isSmall ? 2 : 1}>
            {[0, 1, 2, 3, 4].map((space, idx) =>
              spaceJSX(track[space], 0, idx)
            )}
          </Grid>

          {/* TOP DIAGONALS AND MIDDLE HOME */}
          <Grid container justifyContent="center">
            <Grid
              container
              width={isSmall ? "50%" : "50%"}
              justifyContent="space-between"
            >
              {spaceJSX(track[27], 0, 0)}
              {spaceJSX(finish[0][0], 0, 1)}
              {spaceJSX(track[5], 0, 2)}
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid
              container
              width={isSmall ? "55%" : "55%"}
              justifyContent="space-between"
            >
              {spaceJSX(track[26], 3, 0)}
              {spaceJSX(finish[0][1], 0, 1)}
              {spaceJSX(track[6], 1, 2)}
            </Grid>
          </Grid>

          {/* COLUMNS */}
          <Grid
            container
            width="100%"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {/* TOP ROW FOR COLUMNS*/}
            <Grid
              container
              width={isSmall ? "60%" : "62%"}
              justifyContent="space-between"
            >
              {spaceJSX(track[25], 3, 0)}
              {spaceJSX(finish[0][2], 0, 1)}
              {spaceJSX(track[7], 1, 2)}
            </Grid>

            {/* TOP HOME AND FINISH */}
            <Grid container justifyContent="space-between">
              <Grid
                container
                width={isSmall ? "8.5rem" : "5rem"}
                justifyContent="space-between"
              >
                <Grid
                  container
                  width={isSmall ? "4.5rem" : "2rem"}
                  justifyContent="flex-end"
                >
                  <Grid item>{spaceJSX(home[3][0], 3, 0)}</Grid>
                </Grid>
                <Grid item>{spaceJSX(track[24], 3, 0)}</Grid>
              </Grid>
              <Grid item>{spaceJSX(finish[0][3], 0, 0)}</Grid>
              <Grid
                container
                width={isSmall ? "8.5rem" : "5rem"}
                justifyContent="space-between"
              >
                {spaceJSX(track[8], 1, 0)}
                <Grid
                  container
                  width={isSmall ? "4.5rem" : "2rem"}
                  justifyContent="flex-start"
                >
                  <Grid item>{spaceJSX(home[1][0], 1, 0)}</Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* MIDDLE HOME AND FINISH */}
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              width={isSmall ? "36rem" : "21rem"}
            >
              <Grid
                container
                item
                width={isSmall ? "17rem" : "9.8rem"}
                justifyContent="flex-end"
              >
                {spaceJSX(home[3][1], 3, 0)}
                {spaceJSX(home[3][3], 3, 1)}
                {spaceJSX(track[23], 3, 2)}
                {new Array(4)
                  .fill(null)
                  .map((_, idx) => spaceJSX(finish[3][idx], 3, idx))}
              </Grid>
              {dieJSX(lastRoll)}
              <Grid
                container
                item
                width={isSmall ? "17rem" : "9.8rem"}
                justifyContent="flex-start"
              >
                {new Array(4)
                  .fill(null)
                  .map((_, idx) => spaceJSX(finish[1][idx], 1, idx))
                  .reverse()}
                {spaceJSX(track[9], 1, 0)}
                {spaceJSX(home[1][3], 1, 1)}
                {spaceJSX(home[1][1], 1, 2)}
              </Grid>
            </Grid>

            {/* BOTTOM HOME AND FINISH */}
            <Grid container justifyContent="space-between">
              <Grid
                container
                width={isSmall ? "8.5rem" : "5rem"}
                justifyContent="space-between"
              >
                <Grid
                  container
                  width={isSmall ? "4.5rem" : "2rem"}
                  justifyContent="flex-end"
                >
                  {spaceJSX(home[3][2], 3, 0)}
                </Grid>
                {spaceJSX(track[22], 3, 0)}
              </Grid>
              {spaceJSX(finish[2][3], 2, 0)}
              <Grid
                container
                width={isSmall ? "8.5rem" : "5rem"}
                justifyContent="space-between"
              >
                {spaceJSX(track[10], 1, 0)}

                <Grid
                  container
                  width={isSmall ? "4.5rem" : "2rem"}
                  justifyContent="flex-start"
                >
                  {spaceJSX(home[1][2], 1, 0)}
                </Grid>
              </Grid>
            </Grid>

            {/* BOTTOM ROW FOR COLUMNS */}
            <Grid
              container
              item
              width={isSmall ? "60%" : "62%"}
              justifyContent="space-between"
            >
              {spaceJSX(track[21], 3, 0)}
              {spaceJSX(finish[2][2], 2, 1)}
              {spaceJSX(track[11], 1, 2)}
            </Grid>
          </Grid>

          {/* BOTTOM DIAGONALS AND MIDDLE HOME */}

          <Grid container justifyContent="center">
            <Grid
              container
              width={isSmall ? "55%" : "55%"}
              justifyContent="space-between"
            >
              {spaceJSX(track[20], 3, 0)}
              {spaceJSX(finish[2][1], 2, 1)}
              {spaceJSX(track[12], 1, 2)}
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid
              container
              width={isSmall ? "50%" : "50%"}
              justifyContent="space-between"
            >
              {spaceJSX(track[19], 2, 0)}
              {spaceJSX(finish[2][0], 2, 1)}
              {spaceJSX(track[13], 2, 2)}
            </Grid>
          </Grid>

          {/* BOTTOM ROW */}
          <Grid container justifyContent="center" spacing={isSmall ? 2 : 1}>
            {[18, 17, 16, 15, 14].map((space, idx) =>
              spaceJSX(track[space], 2, idx)
            )}
          </Grid>

          <Grid container justifyContent="space-between" padding="0rem 1rem">
            <Grid width="30%"></Grid>
            {/* HOME 2 */}
            <Grid container direction="column" sx={{ width: "30%" }}>
              <Grid container justifyContent="center">
                {spaceJSX(home[2][3], 2, 0)}
              </Grid>
              <Grid container justifyContent="center">
                {new Array(3)
                  .fill(null)
                  .map((_, idx) => spaceJSX(home[2][idx], 2, idx))}
              </Grid>
            </Grid>

            {/* INSTRUCTIONS BUTTON */}
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              width="30%"
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  fontSize: isSmall ? "1rem" : ".7rem",
                  margin: "0rem 0rem -1rem -1rem",
                }}
                onClick={handleOpenInstructions}
              >
                INSTRUCTIONS
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* CONSOLE OUTPUT */}
        <Console
          text={outputText}
          update={update}
          finished={finished}
          playerTurn={playerTurn}
        ></Console>
        {/* FIREWORKS CELEBRATION */}
        {finished && (
          <Grid container>
            {new Array(4).fill(null).map((_, idx) => (
              <Grid item className="firework" key={idx}></Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Footer />

      {/* SELECT PLAYERS MODAL */}
      <Modal
        open={openSelect}
        onClose={() => {
          handleCloseSelect();
          setNumPlayers(0);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-6.5rem",
        }}
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
          <IconButton
            onClick={() => {
              handleCloseSelect();
              setNumPlayers(0);
            }}
            sx={{ float: "left" }}
          >
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
              onClick={() => {
                handleCloseSelect();
                if (numPlayers > 0) {
                  initGame();
                }
              }}
            >
              LET'S GO
            </Button>
          </Grid>
        </Grid>
      </Modal>

      {/* INSTRUCTIONS DIALOG */}
      <Dialog
        open={openInstructions}
        onClose={handleCloseInstructions}
        scroll="paper"
        fullWidth
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          sx={{
            margin: "auto",
            backgroundColor: "white",
            borderRadius: ".5rem",
            opacity: ".9",
            paddingBottom: "1rem",
          }}
        >
          <IconButton onClick={handleCloseInstructions} sx={{ float: "left" }}>
            <Close sx={{ color: "red" }}></Close>
          </IconButton>
          <DialogTitle>
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              paddingTop="1rem"
              fontWeight="bold"
            >
              INSTRUCTIONS
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              {instructions.split("\n").map((instruction, idx) => (
                <Grid key={idx}>
                  <Typography
                    variant={isSmall ? "h5" : "h6"}
                    textAlign="center"
                  >
                    {instruction}
                  </Typography>
                  {idx !== instructions.split("\n").length - 1 && <hr></hr>}
                </Grid>
              ))}
            </DialogContentText>
          </DialogContent>
        </Grid>
      </Dialog>
    </Grid>
  );
}

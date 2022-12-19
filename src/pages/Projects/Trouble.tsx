import { Grid, Typography } from "@mui/material";
import {
  CropDinOutlined,
  LooksOne,
  LooksTwo,
  Looks3,
  Looks4,
} from "@mui/icons-material";
import oneDie from "images/dice/dice-one.svg";
import twoDie from "images/dice/dice-two.svg";
import threeDie from "images/dice/dice-three.svg";
import fourDie from "images/dice/dice-four.svg";
import fiveDie from "images/dice/dice-five.svg";
import sixDie from "images/dice/dice-six.svg";
import React, { useRef } from "react";

const HOME = -1;
const colorMapping = ["red", "green", "#FFC133", "purple"];
const dieMapping = {
  1: oneDie,
  2: twoDie,
  3: threeDie,
  4: fourDie,
  5: fiveDie,
  6: sixDie,
};

interface Peg {
  player: number;
  identifier: String;
  internalId: number;
  space: number;
  started: boolean;
  finished: boolean;
}

class Player {
  pegs: Peg[] = [];
  identifier: number;
  internalId: number;
  playerStr: string;

  constructor(iter: number, home: Peg[][]) {
    this.identifier = iter + 1;
    this.internalId = iter;
    for (let j = 0; j < 4; j++) {
      const peg: Peg = {
        player: iter,
        identifier: `${j + 1}`,
        internalId: j,
        space: HOME,
        started: false,
        finished: false,
      };

      home[iter][j] = peg;
      this.pegs[j] = peg;
    }
  }
}

function Console({ text }) {
  const [output, setOutput] = React.useState(text[0]);
  const outputIdx = useRef(0);

  React.useEffect(() => {
    function tick() {
      setOutput((prev) => prev + text[++outputIdx.current]);
    }
    if (outputIdx.current < text.length - 1) {
      let addChar = setInterval(tick, 50);
      return () => clearInterval(addChar);
    }
  }, [output, text]);

  return <span>{output}</span>;
}

export function Trouble() {
  const track = new Array<Peg>(28).fill(undefined);
  const home = new Array<[Peg]>(4).fill(undefined).map(() => new Array<Peg>(4));
  const finish = new Array<[Peg]>(4)
    .fill(undefined)
    .map(() => new Array<Peg>(4));
  const [lastRoll, setLastRoll] = React.useState(6);

  let players: Player[];

  const pegJSX = (id: number, color: string) => {
    const style = { color };
    return [
      <Grid item>
        <LooksOne fontSize="large" style={style} />
      </Grid>,
      <Grid item>
        <LooksTwo fontSize="large" style={style} />
      </Grid>,
      <Grid item>
        <Looks3 fontSize="large" style={style} />
      </Grid>,
      <Grid item>
        <Looks4 fontSize="large" style={style} />
      </Grid>,
    ][id];
  };

  const spaceJSX = (peg: Peg, colorIdx: number) => {
    return peg && peg.space === -1 ? (
      pegJSX(peg.internalId, colorMapping[peg.player])
    ) : (
      <Grid item>
        <CropDinOutlined
          fontSize="large"
          style={{ color: colorMapping[colorIdx] }}
        />
      </Grid>
    );
  };

  const renderDie = (face: number) => {
    return <img src={dieMapping[face]} width="5%" onClick={roll}></img>;
  };

  const roll = () => {
    setLastRoll(Math.floor(Math.random() * 6) + 1);
  };

  const initGame = () => {
    const numPlayers = 4; // numPlayersSelect();

    players = new Array(numPlayers);

    for (let i = 0; i < players.length; i++) {
      players[i] = new Player(i, home);
    }

    // playerTurn = initRoll();
  };

  initGame();

  return (
    <Grid height="100vh">
      {/* TITLE */}
      <Typography textAlign="center" variant="h1">
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
        {/* HOME 0 */}
        <Grid direction="column">
          <Grid container justifyContent="center">
            {new Array(3)
              .fill(undefined)
              .map((_, idx) => spaceJSX(home[0][idx], 0))}
          </Grid>
          <Grid container justifyContent="center">
            {spaceJSX(home[0][3], 0)}
          </Grid>
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
          <Grid
            container
            item
            direction="row"
            width="24rem"
            justifyContent="space-between"
          >
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
            {renderDie(lastRoll)}
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
        <Grid direction="column">
          <Grid container justifyContent="center">
            {spaceJSX(home[2][3], 2)}
          </Grid>
          <Grid container justifyContent="center">
            {new Array(3)
              .fill(undefined)
              .map((_, idx) => spaceJSX(home[2][idx], 0))}
          </Grid>
        </Grid>
      </Grid>
      {/* CONSOLE OUTPUT */}
      <Console text="we are printing this out kind of slowly"></Console>
    </Grid>
  );
}

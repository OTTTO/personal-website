import { Grid } from "@mui/material";
import {
  AccessibilityNewRounded,
  CropDinOutlined,
  LooksOne,
} from "@mui/icons-material";

const HOME = -1;

interface Peg {
  player: number;
  identifier: String;
  internalId: number;
  space: number;
  started: boolean;
  finished: boolean;
}

class Player {
  pegs: Peg[];
  identifier: number;
  internalId: number;
  playerStr: string;

  constructor(iter: number, home: Peg[]) {
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

export function Trouble() {
  const track = new Array<Peg>(28).fill(undefined);
  track[2] = {
    player: 0,
    identifier: "red",
    internalId: 2,
    space: -1,
    started: true,
    finished: false,
  };
  track[17] = {
    player: 0,
    identifier: "red",
    internalId: 2,
    space: -1,
    started: true,
    finished: false,
  };
  const home = new Array<[Peg]>(4);
  const finish = new Array<[Peg]>(4);

  return (
    <Grid margin="auto" height="100vh">
      {/* BOARD */}
      <Grid container justifyContent="center" width="37rem" direction="column">
        {/* HOME 1 */}
        <Grid direction="column">
          <Grid container justifyContent="center">
            {track.slice(0, 3).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined fontSize="large" />
              );
            })}
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              {true ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined fontSize="large" />
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* TOP ROW */}
        <Grid container justifyContent="center" spacing={2}>
          {track.slice(0, 5).map((peg) => {
            return peg && peg.space === 0 ? (
              <Grid item>
                <AccessibilityNewRounded fontSize="large" />
              </Grid>
            ) : (
              <Grid item>
                <CropDinOutlined fontSize="large" />
              </Grid>
            );
          })}
        </Grid>

        {/* TOP DIAGONALS AND MIDDLE HOME */}
        <Grid container justifyContent="center">
          <Grid container width="18rem" justifyContent="space-between">
            {track.slice(0, 3).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined fontSize="large" />
              );
            })}
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid container width="21rem" justifyContent="space-between">
            {track.slice(0, 3).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined fontSize="large" />
              );
            })}
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
            {track.slice(0, 3).map((peg) => {
              return peg && peg.space === 0 ? (
                <Grid item>
                  <AccessibilityNewRounded fontSize="large" />
                </Grid>
              ) : (
                <Grid item>
                  <CropDinOutlined fontSize="large" />
                </Grid>
              );
            })}
          </Grid>
          {/* TOP HOME AND FINISH */}
          <Grid container justifyContent="space-between">
            <Grid container width="8.5rem" justifyContent="space-between">
              <Grid container width="4.5rem" justifyContent="flex-end">
                <Grid item>
                  {true ? (
                    <CropDinOutlined fontSize="large" />
                  ) : (
                    <CropDinOutlined fontSize="large" />
                  )}
                </Grid>
              </Grid>
              <Grid item>
                {true ? (
                  <CropDinOutlined fontSize="large" />
                ) : (
                  <CropDinOutlined fontSize="large" />
                )}
              </Grid>
            </Grid>
            <Grid item>
              {true ? (
                <CropDinOutlined fontSize="large" />
              ) : (
                <AccessibilityNewRounded fontSize="large" />
              )}
            </Grid>
            <Grid container width="8.5rem" justifyContent="space-between">
              <Grid item>
                {true ? (
                  <CropDinOutlined fontSize="large" />
                ) : (
                  <AccessibilityNewRounded fontSize="large" />
                )}
              </Grid>
              <Grid container width="4.5rem" justifyContent="flex-start">
                <Grid item>
                  {true ? (
                    <CropDinOutlined fontSize="large" />
                  ) : (
                    <CropDinOutlined fontSize="large" />
                  )}
                </Grid>
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
              {track.slice(0, 7).map((peg) => {
                return peg && peg.space === 0 ? (
                  <Grid item>
                    <AccessibilityNewRounded fontSize="large" />
                  </Grid>
                ) : (
                  <Grid item>
                    <CropDinOutlined fontSize="large" />
                  </Grid>
                );
              })}
            </Grid>
            <Grid container item width="17rem" justifyContent="flex-start">
              {track.slice(0, 7).map((peg) => {
                return peg && peg.space === 0 ? (
                  <Grid item>
                    <AccessibilityNewRounded fontSize="large" />
                  </Grid>
                ) : (
                  <Grid item>
                    <CropDinOutlined fontSize="large" />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          {/* BOTTOM HOME AND FINISH */}
          <Grid container justifyContent="space-between">
            <Grid container width="8.5rem" justifyContent="space-between">
              <Grid container width="4.5rem" justifyContent="flex-end">
                <Grid item>
                  {true ? (
                    <CropDinOutlined fontSize="large" />
                  ) : (
                    <CropDinOutlined fontSize="large" />
                  )}
                </Grid>
              </Grid>
              <Grid item>
                {true ? (
                  <CropDinOutlined fontSize="large" />
                ) : (
                  <CropDinOutlined fontSize="large" />
                )}
              </Grid>
            </Grid>
            <Grid item>
              {true ? (
                <CropDinOutlined fontSize="large" />
              ) : (
                <AccessibilityNewRounded fontSize="large" />
              )}
            </Grid>
            <Grid container width="8.5rem" justifyContent="space-between">
              <Grid item>
                {true ? (
                  <CropDinOutlined fontSize="large" />
                ) : (
                  <AccessibilityNewRounded fontSize="large" />
                )}
              </Grid>
              <Grid container width="4.5rem" justifyContent="flex-start">
                <Grid item>
                  {true ? (
                    <CropDinOutlined fontSize="large" />
                  ) : (
                    <CropDinOutlined fontSize="large" />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* BOTTOM ROW FOR COLUMNS */}
          <Grid container item width="24rem" justifyContent="space-between">
            {track.slice(0, 3).map((peg) => {
              return peg && peg.space === 0 ? (
                <Grid item>
                  <AccessibilityNewRounded fontSize="large" />
                </Grid>
              ) : (
                <Grid item>
                  <CropDinOutlined fontSize="large" />
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        {/* BOTTOM DIAGONALS AND MIDDLE HOME */}

        <Grid container justifyContent="center">
          <Grid container width="21rem" justifyContent="space-between">
            {track.slice(0, 3).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined fontSize="large" />
              );
            })}
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid container width="18rem" justifyContent="space-between">
            {track.slice(0, 3).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined fontSize="large" />
              );
            })}
          </Grid>
        </Grid>

        {/* BOTTOM ROW */}
        <Grid container justifyContent="center" spacing={2}>
          {track.slice(0, 5).map((peg) => {
            return peg && peg.space === 0 ? (
              <Grid item>
                <AccessibilityNewRounded fontSize="large" />
              </Grid>
            ) : (
              <Grid item>
                <LooksOne fontSize="large" style={{ color: "red" }} />
              </Grid>
            );
          })}
        </Grid>

        {/* HOME 3 */}
        <Grid direction="column">
          <Grid container justifyContent="center">
            <Grid item>
              {true ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined fontSize="large" />
              )}
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            {track.slice(0, 3).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined fontSize="large" />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

import { Grid, Typography } from "@mui/material";
import {
  AccessibilityNewRounded,
  CropDinOutlined,
  LooksOne,
  LooksTwo,
  Looks3,
  Looks4,
} from "@mui/icons-material";

const HOME = -1;
const colorMapping = { 0: "red", 1: "green", 2: "#FFC133", 3: "purple" };

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

export function Trouble() {
  const track = new Array<Peg>(28).fill(undefined);
  track[2] = {
    player: 0,
    identifier: "3",
    internalId: 2,
    space: -1,
    started: true,
    finished: false,
  };
  track[17] = {
    player: 0,
    identifier: "3",
    internalId: 2,
    space: -1,
    started: true,
    finished: false,
  };

  const home = new Array<[Peg]>(4).fill(undefined).map(() => new Array<Peg>(4));
  const finish = new Array<[Peg]>(4)
    .fill(undefined)
    .map(() => new Array<Peg>(4));

  let players: Player[];

  const pegJSX = (id: number, color: string) => {
    const style = { color };
    return [
      <LooksOne fontSize="large" style={style} />,
      <LooksTwo fontSize="large" style={style} />,
      <Looks3 fontSize="large" style={style} />,
      <Looks4 fontSize="large" style={style} />,
    ][id];
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
        {/* HOME 1 */}
        <Grid direction="column">
          <Grid container justifyContent="center">
            {home[0].slice(0, 3).map((peg) => {
              return peg && peg.space === -1 ? (
                pegJSX(peg.internalId, colorMapping[0])
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[0] }}
                />
              );
            })}
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              {home[0][3] && home[0][3].space === -1 ? (
                pegJSX(home[0][3].internalId, colorMapping[0])
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[0] }}
                />
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
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[0] }}
                />
              </Grid>
            );
          })}
        </Grid>

        {/* TOP DIAGONALS AND MIDDLE HOME */}
        <Grid container justifyContent="center">
          <Grid container width="18rem" justifyContent="space-between">
            {track.slice(0, 1).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[0] }}
                />
              );
            })}
            {finish[0][0] && finish[0][0].space === -1 ? (
              pegJSX(finish[0][0].internalId, colorMapping[0])
            ) : (
              <CropDinOutlined
                fontSize="large"
                style={{ color: colorMapping[0] }}
              />
            )}
            {track.slice(0, 1).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[0] }}
                />
              );
            })}
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid container width="21rem" justifyContent="space-between">
            {track.slice(0, 1).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[3] }}
                />
              );
            })}
            {finish[0][1] && finish[0][1].space === -1 ? (
              pegJSX(finish[0][1].internalId, colorMapping[0])
            ) : (
              <CropDinOutlined
                fontSize="large"
                style={{ color: colorMapping[0] }}
              />
            )}
            {track.slice(0, 1).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[1] }}
                />
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
            {track.slice(0, 1).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[3] }}
                />
              );
            })}
            {finish[0][2] && finish[0][2].space === -1 ? (
              pegJSX(finish[0][2].internalId, colorMapping[0])
            ) : (
              <CropDinOutlined
                fontSize="large"
                style={{ color: colorMapping[0] }}
              />
            )}
            {track.slice(0, 1).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[1] }}
                />
              );
            })}
          </Grid>
          {/* TOP HOME AND FINISH */}
          <Grid container justifyContent="space-between">
            <Grid container width="8.5rem" justifyContent="space-between">
              <Grid container width="4.5rem" justifyContent="flex-end">
                <Grid item>
                  {home[3][0] && home[3][0].space === -1 ? (
                    pegJSX(home[3][0].internalId, colorMapping[3])
                  ) : (
                    <CropDinOutlined
                      fontSize="large"
                      style={{ color: colorMapping[3] }}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid item>
                {track.slice(0, 1).map((peg) => {
                  return peg && peg.space === 0 ? (
                    <AccessibilityNewRounded fontSize="large" />
                  ) : (
                    <CropDinOutlined
                      fontSize="large"
                      style={{ color: colorMapping[3] }}
                    />
                  );
                })}
              </Grid>
            </Grid>
            <Grid item>
              {finish[0][3] && finish[0][3].space === -1 ? (
                pegJSX(finish[0][3].internalId, colorMapping[0])
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[0] }}
                />
              )}
            </Grid>
            <Grid container width="8.5rem" justifyContent="space-between">
              <Grid item>
                {track.slice(0, 1).map((peg) => {
                  return peg && peg.space === 0 ? (
                    <AccessibilityNewRounded fontSize="large" />
                  ) : (
                    <CropDinOutlined
                      fontSize="large"
                      style={{ color: colorMapping[1] }}
                    />
                  );
                })}
              </Grid>
              <Grid container width="4.5rem" justifyContent="flex-start">
                <Grid item>
                  {home[1][0] && home[1][0].space === -1 ? (
                    pegJSX(home[1][0].internalId, colorMapping[1])
                  ) : (
                    <CropDinOutlined
                      fontSize="large"
                      style={{ color: colorMapping[1] }}
                    />
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
              {home[3][1] && home[3][1].space === -1 ? (
                pegJSX(home[3][1].internalId, colorMapping[3])
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[3] }}
                />
              )}
              {home[3][3] && home[3][3].space === -1 ? (
                pegJSX(home[3][3].internalId, colorMapping[3])
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[3] }}
                />
              )}
              {track.slice(0, 5).map((peg) => {
                return peg && peg.space === 0 ? (
                  <Grid item>
                    <AccessibilityNewRounded fontSize="large" />
                  </Grid>
                ) : (
                  <Grid item>
                    <CropDinOutlined
                      fontSize="large"
                      style={{ color: colorMapping[3] }}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Grid container item width="17rem" justifyContent="flex-start">
              {track.slice(0, 5).map((peg) => {
                return peg && peg.space === 0 ? (
                  <Grid item>
                    <AccessibilityNewRounded fontSize="large" />
                  </Grid>
                ) : (
                  <Grid item>
                    <CropDinOutlined
                      fontSize="large"
                      style={{ color: colorMapping[1] }}
                    />
                  </Grid>
                );
              })}
              {home[1][3] && home[1][3].space === -1 ? (
                pegJSX(home[1][3].internalId, colorMapping[1])
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[1] }}
                />
              )}
              {home[1][1] && home[1][1].space === -1 ? (
                pegJSX(home[1][1].internalId, colorMapping[1])
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[1] }}
                />
              )}
            </Grid>
          </Grid>

          {/* BOTTOM HOME AND FINISH */}
          <Grid container justifyContent="space-between">
            <Grid container width="8.5rem" justifyContent="space-between">
              <Grid container width="4.5rem" justifyContent="flex-end">
                <Grid item>
                  {home[3][2] && home[3][2].space === -1 ? (
                    pegJSX(home[3][2].internalId, colorMapping[3])
                  ) : (
                    <CropDinOutlined
                      fontSize="large"
                      style={{ color: colorMapping[3] }}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid item>
                {track.slice(0, 1).map((peg) => {
                  return peg && peg.space === 0 ? (
                    <AccessibilityNewRounded fontSize="large" />
                  ) : (
                    <CropDinOutlined
                      fontSize="large"
                      style={{ color: colorMapping[3] }}
                    />
                  );
                })}
              </Grid>
            </Grid>
            <Grid item>
              {finish[2][3] && finish[2][3].space === -1 ? (
                pegJSX(finish[2][3].internalId, colorMapping[2])
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[2] }}
                />
              )}
            </Grid>
            <Grid container width="8.5rem" justifyContent="space-between">
              {track.slice(0, 1).map((peg) => {
                return peg && peg.space === 0 ? (
                  <AccessibilityNewRounded fontSize="large" />
                ) : (
                  <CropDinOutlined
                    fontSize="large"
                    style={{ color: colorMapping[1] }}
                  />
                );
              })}
              <Grid container width="4.5rem" justifyContent="flex-start">
                <Grid item>
                  {home[1][2] && home[1][2].space === -1 ? (
                    pegJSX(home[1][2].internalId, colorMapping[1])
                  ) : (
                    <CropDinOutlined
                      fontSize="large"
                      style={{ color: colorMapping[1] }}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* BOTTOM ROW FOR COLUMNS */}
          <Grid container item width="24rem" justifyContent="space-between">
            {track.slice(0, 1).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[3] }}
                />
              );
            })}
            {finish[2][2] && finish[2][2].space === -1 ? (
              pegJSX(finish[0][2].internalId, colorMapping[0])
            ) : (
              <CropDinOutlined
                fontSize="large"
                style={{ color: colorMapping[2] }}
              />
            )}
            {track.slice(0, 1).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[1] }}
                />
              );
            })}
          </Grid>
        </Grid>

        {/* BOTTOM DIAGONALS AND MIDDLE HOME */}

        <Grid container justifyContent="center">
          <Grid container width="21rem" justifyContent="space-between">
            {track.slice(0, 1).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[3] }}
                />
              );
            })}
            {finish[2][1] && finish[2][1].space === -1 ? (
              pegJSX(finish[2][1].internalId, colorMapping[0])
            ) : (
              <CropDinOutlined
                fontSize="large"
                style={{ color: colorMapping[2] }}
              />
            )}
            {track.slice(0, 1).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[1] }}
                />
              );
            })}
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid container width="18rem" justifyContent="space-between">
            {track.slice(0, 1).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[2] }}
                />
              );
            })}
            {finish[2][0] && finish[2][0].space === -1 ? (
              pegJSX(finish[2][0].internalId, colorMapping[0])
            ) : (
              <CropDinOutlined
                fontSize="large"
                style={{ color: colorMapping[2] }}
              />
            )}
            {track.slice(0, 1).map((peg) => {
              return peg && peg.space === 0 ? (
                <AccessibilityNewRounded fontSize="large" />
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[2] }}
                />
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
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[2] }}
                />
              </Grid>
            );
          })}
        </Grid>

        {/* HOME 3 */}
        <Grid direction="column">
          <Grid container justifyContent="center">
            <Grid item>
              {home[0][3] && home[0][3].space === -1 ? (
                pegJSX(home[0][3].internalId, colorMapping[2])
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[2] }}
                />
              )}
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            {home[0].slice(0, 3).map((peg) => {
              return peg && peg.space === -1 ? (
                pegJSX(peg.internalId, colorMapping[2])
              ) : (
                <CropDinOutlined
                  fontSize="large"
                  style={{ color: colorMapping[2] }}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

import { Grid, IconButton } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import projectsTheme from "themes/projectsTheme";
import { Menu } from "components/Menu";
import { Footer } from "components/Footer";
import { RecognitionItem } from "./RecognitionItem";
import { useContext, useEffect, useState } from "react";
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { ThemeContext } from "context/theme";
import {
  authenticationCheck,
  getMainTheme,
  getStorage,
  testAuthenticationCheck,
} from "utils/utils";
import { Title } from "components/TItle";
import axios from "axios";
import { RecognitionItemClass } from "types/recognition";
import { Loading } from "components/Loading";
import { ErrorPage } from "pages/Error/Error";
import { RecognitionType } from "types/recognitionType";
import { AddCircle } from "@mui/icons-material";
import { AuthButtons } from "components/AuthButtons";
import { RecognitionEdit } from "./RecognitionEdit";
import { ReferralTabs } from "./ReferralTabs";
import useWindowDimensions from "hooks/useWindowDimensions";
import { TitleDivider } from "components/TitleDivider";

export function Recognition() {
  const { theme } = useContext(ThemeContext);
  const isAuthenticated = authenticationCheck();
  const isTestAuthenticated = testAuthenticationCheck();
  const { width } = useWindowDimensions();
  const isMobile = width <= 500;

  const [activeTab, setActiveTab] = useState(RecognitionType.Development);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(true);
  const [recognition, setRecognition] = useState([]);

  const addRecognitionItem = () => {
    const newRecognition = structuredClone(recognition);
    const thisRecognition = newRecognition.filter((x) => x.type === activeTab);
    const otherRecognition = newRecognition.filter((x) => x.type !== activeTab);
    const newRecognitionItem = new RecognitionItemClass();
    newRecognitionItem.type = activeTab;

    newRecognitionItem.position = thisRecognition.length;
    thisRecognition.push(newRecognitionItem);

    const completeRecognition = thisRecognition.concat(otherRecognition);
    setRecognition(completeRecognition);
  };

  const removeRecognitionItem = (idx: number) => {
    let newRecognition = structuredClone(recognition);
    const thisRecognition = newRecognition.filter((x) => x.type === activeTab);
    const otherRecognition = newRecognition.filter((x) => x.type !== activeTab);
    thisRecognition.splice(idx, 1);

    const sortedNewRecognition = thisRecognition.sort(
      (a, b) => a.position - b.position
    );

    for (let i = 0; i < sortedNewRecognition.length; i++) {
      sortedNewRecognition[i].position = i;
    }

    const completeRecognition = sortedNewRecognition.concat(otherRecognition);
    setRecognition(completeRecognition);
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newRecognition = structuredClone(recognition);
    console.log(newRecognition);
    const thisRecognition = newRecognition.filter((x) => x.type === activeTab);
    const otherRecognition = newRecognition.filter((x) => x.type !== activeTab);
    thisRecognition.sort((a, b) => a.position - b.position);
    const [removed] = thisRecognition.splice(source.index, 1);
    thisRecognition.splice(destination.index, 0, removed);

    //reset positions
    for (let i = 0; i < thisRecognition.length; i++) {
      thisRecognition[i].position = i;
    }

    const completeRecognition = thisRecognition.concat(otherRecognition);
    setRecognition(completeRecognition);
  };

  const handleSaveOnClick = async () => {
    if (isTestAuthenticated) {
      localStorage.setItem("recognition", JSON.stringify(recognition));
    } else {
      console.log(recognition);
      await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/portfolio/recognition/save`,
        { items: recognition },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    }
    window.location.replace("/recognition");
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    idx: number
  ) => {
    const newRecognition = structuredClone(recognition);
    const newRecognitionItem = structuredClone(newRecognition[idx]);
    newRecognitionItem[key] = e.target.value;
    newRecognition[idx] = newRecognitionItem;
    setRecognition(newRecognition);
  };

  const testRecognition = getStorage("recognition");

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/portfolio/recognition`)
        .catch((err) => {
          setError(true);
        });
      if (resp && resp.data) {
        setRecognition(resp.data.items);
      }
      setLoading(false);
    };
    if (!isTestAuthenticated) fetchData();
    else {
      setRecognition(testRecognition);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <Grid border="double thick black">
      <Grid sx={{ height: "vh100" }} border=".25rem white solid">
        <ThemeProvider theme={projectsTheme}>
          <Menu backgroundColor="black" />
          <Grid
            container
            direction="column"
            paddingBottom="2rem"
            sx={{ background: getMainTheme(theme) }}
          >
            <Title title="RECOGNITION" />
            {(isAuthenticated || isTestAuthenticated) && edit ? (
              <IconButton onClick={addRecognitionItem}>
                <AddCircle sx={{ mr: 1 }} style={{ color: "white" }} />
              </IconButton>
            ) : null}
            <TitleDivider />
            <ReferralTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <Grid>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-list">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {[...recognition]
                        .filter((x) => x.type === activeTab)
                        .sort((a, b) => a.position - b.position)
                        .map((item, idx) => (
                          <Draggable
                            draggableId={item.id}
                            index={idx}
                            key={item.id}
                            isDragDisabled={
                              (!isAuthenticated && !isTestAuthenticated) ||
                              !edit
                            }
                          >
                            {(provided, snapshot) => (
                              <Grid
                                container
                                key={idx}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={
                                  snapshot.isDragging ? "draggingListItem" : ""
                                }
                              >
                                <Grid width={isMobile ? "5%" : "10%"}></Grid>

                                {(!isAuthenticated && !isTestAuthenticated) ||
                                !edit ? (
                                  <RecognitionItem
                                    idx={idx}
                                    content={item.content}
                                    source={item.source}
                                    href={item.href}
                                    left={idx % 2 === 0}
                                    up={
                                      (idx % 3) - 1 === 0 || (idx % 3) - 2 === 0
                                    }
                                  />
                                ) : (
                                  <RecognitionEdit
                                    recognition={recognition}
                                    item={item}
                                    idx={idx}
                                    handleTextChange={handleTextChange}
                                    isAuthenticated={isAuthenticated}
                                    isTestAuthenticated={isTestAuthenticated}
                                    edit={edit}
                                    removeRecognitionItem={
                                      removeRecognitionItem
                                    }
                                  />
                                )}
                                <Grid width={isMobile ? "5%" : "10%"}></Grid>
                              </Grid>
                            )}
                          </Draggable>
                        ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              {(isAuthenticated || isTestAuthenticated) && (
                <AuthButtons
                  handleSaveOnClick={handleSaveOnClick}
                  edit={edit}
                  setEdit={setEdit}
                />
              )}
            </Grid>
          </Grid>
          <Footer />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}

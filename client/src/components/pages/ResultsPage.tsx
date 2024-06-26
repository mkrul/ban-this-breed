import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Breakdown } from "../../interfaces/breakdown";
import { TopUser } from "../../interfaces/topUser";
import { Carousel } from "react-responsive-carousel";
import { RootState } from "../../redux/store";
import { Result } from "../../interfaces/result";
import { Selection } from "../../interfaces/selection";
import { CircularProgress } from "@mui/material";
import { Container, Grid, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ResultsPage = () => {
  const [showDogs, setShowDogs] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingBreakdown, setLoadingBreakdown] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const [proAccuracy, setProAccuracy] = useState(0);
  const [modAccuracy, setModerateAccuracy] = useState(0);
  const [antiAccuracy, setAntiAccuracy] = useState(0);
  const [proCount, setProCount] = useState(0);
  const [modCount, setModerateCount] = useState(0);
  const [antiCount, setAntiCount] = useState(0);
  const [allUsersAccuracy, setAllUsersAccuracy] = useState(0);
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [proPercentage25, setProPercentage25] = useState(0);
  const [proPercentage50, setProPercentage50] = useState(0);
  const [proPercentage75, setProPercentage75] = useState(0);
  const [proPercentageGreaterThan75, setProPercentageGreaterThan75] =
    useState(0);
  const [modPercentage25, setModeratePercentage25] = useState(0);
  const [modPercentage50, setModeratePercentage50] = useState(0);
  const [modPercentage75, setModeratePercentage75] = useState(0);
  const [modPercentageGreaterThan75, setModeratePercentageGreaterThan75] =
    useState(0);
  const [antiPercentage25, setAntiPercentage25] = useState(0);
  const [antiPercentage50, setAntiPercentage50] = useState(0);
  const [antiPercentage75, setAntiPercentage75] = useState(0);
  const [antiPercentageGreaterThan75, setAntiPercentageGreaterThan75] =
    useState(0);
  const [antiApbt, setAntiApbt] = useState(0);
  const [antiAst, setAntiAst] = useState(0);
  const [antiSbt, setAntiSbt] = useState(0);
  const [antiAb, setAntiAb] = useState(0);
  const [proApbt, setProApbt] = useState(0);
  const [proAst, setProAst] = useState(0);
  const [proSbt, setProSbt] = useState(0);
  const [proAb, setProAb] = useState(0);
  const [moderateApbt, setModerateApbt] = useState(0);
  const [moderateAst, setModerateAst] = useState(0);
  const [moderateSbt, setModerateSbt] = useState(0);
  const [moderateAb, setModerateAb] = useState(0);

  const resultData = useSelector((state: RootState) => state.results as Result);
  const word1 = resultData.totalSelected === 1 ? "dog" : "dogs";
  const word2 = resultData.totalSelected === 1 ? "a pit bull" : "pit bulls";
  const word3 = resultData.totalIncorrectGuesses === 1 ? "was" : "were";
  const imageRefs = useRef(new Map());

  const incorrectGuesses = resultData.selections.filter(
    (selection: Selection) => !selection.correctGuess
  );

  const fetchAllUserData = async () => {
    try {
      setLoadingBreakdown(true);
      const domain_url =
        process.env.NODE_ENV === "production"
          ? "https://ban-this-breed-b3bc9b835a36.herokuapp.com"
          : "http://localhost:5000";
      const response = await fetch(`${domain_url}/api/users`);
      response.json().then((res) => {
        const breakdown = res.data as Breakdown;
        setLoadingBreakdown(false);
        setShowBreakdown(true);
        setProAccuracy(breakdown.proAccuracy);
        setModerateAccuracy(breakdown.moderateAccuracy);
        setAntiAccuracy(breakdown.antiAccuracy);
        setProCount(breakdown.proCount);
        setModerateCount(breakdown.moderateCount);
        setAntiCount(breakdown.antiCount);
        setAllUsersAccuracy(breakdown.allUsersAccuracy);
        setTopUsers(breakdown.topUsers);
        setProPercentage25(breakdown.proPercentage25);
        setProPercentage50(breakdown.proPercentage50);
        setProPercentage75(breakdown.proPercentage75);
        setProPercentageGreaterThan75(breakdown.proPercentageGreaterThan75);
        setModeratePercentage25(breakdown.moderatePercentage25);
        setModeratePercentage50(breakdown.moderatePercentage50);
        setModeratePercentage75(breakdown.moderatePercentage75);
        setModeratePercentageGreaterThan75(
          breakdown.moderatePercentageGreaterThan75
        );
        setAntiPercentage25(breakdown.antiPercentage25);
        setAntiPercentage50(breakdown.antiPercentage50);
        setAntiPercentage75(breakdown.antiPercentage75);
        setAntiPercentageGreaterThan75(breakdown.antiPercentageGreaterThan75);
        setAntiApbt(breakdown.antiApbt);
        setAntiAst(breakdown.antiAst);
        setAntiSbt(breakdown.antiSbt);
        setAntiAb(breakdown.antiAb);
        setProApbt(breakdown.proApbt);
        setProAst(breakdown.proAst);
        setProSbt(breakdown.proSbt);
        setProAb(breakdown.proAb);
        setModerateApbt(breakdown.moderateApbt);
        setModerateAst(breakdown.moderateAst);
        setModerateSbt(breakdown.moderateSbt);
        setModerateAb(breakdown.moderateAb);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUserData();
  }, []);

  useEffect(() => {
    if (incorrectGuesses.length > 0) {
      setLoading(true);
      let loadedImages = 0;
      incorrectGuesses.forEach((selection, index) => {
        const imgKey = `${selection.dir}/${selection.image}`;
        if (!imageRefs.current.has(imgKey)) {
          const img = new Image();
          img.src = `/assets/images/dogs/${selection.dir}/${selection.image}`;
          img.onload = () => {
            loadedImages++;
            if (loadedImages === incorrectGuesses.length) {
              setLoading(false);
            }
          };
          img.onerror = () => {
            console.error(`Failed to load image at ${img.src}`);
            loadedImages++;
            if (loadedImages === incorrectGuesses.length) {
              setLoading(false);
            }
          };
          imageRefs.current.set(imgKey, img);
        } else {
          loadedImages++;
          if (loadedImages === incorrectGuesses.length) {
            setLoading(false);
          }
        }
      });
    } else {
      setLoading(false);
    }
  }, [incorrectGuesses]);

  const handleShowSelections = () => {
    setShowDogs(!showDogs);
  };

  const renderUserName = (username: string) => {
    if (username.length > 14) {
      return username.substring(0, 14) + "...";
    }
    return username;
  };

  return (
    <div className="antialiased bg-body text-body font-body">
      <section className="mt-4 pt-6 py-12 md:py-2">
        <div className="container mx-auto px-4 pb-5">
          <div className="mb-15">
            {resultData.completed === 1 && (
              <div>
                <h2 className="mb-12 text-5xl font-semibold font-subheading">
                  🥇<span className="ml-2">Your Results</span>
                </h2>
                <div className="mb-5 text-xl text-neutral-700 font-medium">
                  <p className="mb-5">
                    You selected{" "}
                    <span className="font-bold">
                      {resultData.totalSelected}
                    </span>{" "}
                    {word1} that appeared to be {word2} based on the criteria
                    you set at the beginning of the test
                  </p>
                  <p className="mb-5">
                    Out of all dogs selected,{" "}
                    <span className="font-bold">
                      {resultData.totalIncorrectGuesses}
                    </span>{" "}
                    {word3} identified incorrectly based on your criteria
                  </p>
                  <p className="mb-5">
                    The average accuracy for all participants is currently{" "}
                    <span className="font-bold">
                      {allUsersAccuracy > 0
                        ? `${allUsersAccuracy.toFixed(1)}%`
                        : "0%"}
                    </span>
                  </p>
                  <p className="mb-5">
                    Your overall accuracy was{" "}
                    <span className="font-bold">
                      {resultData.userAccuracy > 0
                        ? `${resultData.userAccuracy.toFixed(1)}%`
                        : "0%"}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
          {resultData.completed === 1 &&
            !showDogs &&
            resultData.totalIncorrectGuesses > 0 && (
              <button
                onClick={handleShowSelections}
                className="inline-flex justify-center items-center text-center h-16 p-5 font-semibold tracking-tight text-md text-neutral-900 hover:text-white focus:text-white bg-white hover:bg-neutral-900 focus:bg-neutral-900 border border-neutral-900 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200 mt-3"
              >
                Show incorrect guesses
              </button>
            )}
          <div className="w-full">
            {showDogs && (
              <div className="inline-flex justify-center w-full">
                {loading ? (
                  <div className="mt-3 w-full p-5">
                    <CircularProgress />
                  </div>
                ) : (
                  <div className="w-full md:w-1/2 p-5">
                    <div className="overflow-hidden rounded-2xl">
                      <Carousel>
                        {incorrectGuesses.map((selection, index) => (
                          <img
                            key={index}
                            className="w-full h-full object-cover"
                            src={require(`../../assets/images/dogs/${selection.dir}/${selection.image}`)}
                            alt="Dog"
                          />
                        ))}
                      </Carousel>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {loadingBreakdown && !showBreakdown && (
            <div className="mt-6 mb-5">
              <CircularProgress />
            </div>
          )}
          {!loadingBreakdown && showBreakdown && (
            <div>
              <div className="my-6 pt-4">
                <h2 className="text-5xl font-semibold font-subheading">
                  📊 <span className="ml-2">Total Results</span>
                </h2>
                <p className="mt-5 mb-3">
                  These results are broken down based on how participants
                  identified their feelings toward pit bulls, as well as the
                  accuracy of their selections. Note that this data is somewhat
                  subjective, since it is based on the criteria set by each
                  individual participant.
                </p>
                <div className="container mx-auto py-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="my-auto">
                      <h6 className="py-1 font-bold bg-neutral-300">
                        All Participants
                      </h6>
                      <table className="w-full text-xl text-neutral-700 font-medium bg-neutral-100">
                        <thead>
                          <tr>
                            <th className="py-2">Alignment</th>
                            <th className="py-2">Count</th>
                            <th className="py-2">Accuracy</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2">Pro</td>
                            <td className="py-2">{proCount}</td>
                            <td className="py-2">
                              {proCount > 0
                                ? `${parseFloat(proAccuracy.toFixed(1))}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">Moderate</td>
                            <td className="py-2">{modCount}</td>
                            <td className="py-2">
                              {modCount > 0
                                ? `${parseFloat(modAccuracy.toFixed(1))}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">Anti</td>
                            <td className="py-2">{antiCount}</td>
                            <td className="py-2">
                              {antiCount > 0
                                ? `${parseFloat(antiAccuracy.toFixed(1))}%`
                                : "0%"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <Container
                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          boxShadow: "5px 5px 10px rgba(0,0,0,0.01)",
                          borderRadius: "10px",
                        }}
                      >
                        <BarChart
                          xAxis={[
                            {
                              id: "barCategories",
                              data: [""],
                              scaleType: "band",
                            },
                          ]}
                          series={[
                            { data: [parseFloat(proAccuracy.toFixed(1))] },
                            { data: [parseFloat(modAccuracy.toFixed(1))] },
                            { data: [parseFloat(antiAccuracy.toFixed(1))] },
                          ]}
                          colors={["#AFE1AF", "#7661E2", "#F6866A"]}
                          height={300}
                        />
                        <Grid
                          container
                          sx={{
                            padding: "0px 0px 20px 40px",
                            justifyContent: "space-around",
                            display: "flex",
                          }}
                        >
                          <Grid
                            item
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <div
                              style={{
                                height: "10px",
                                width: "10px",
                                borderRadius: "100%",
                                backgroundColor: "#AFE1AF",
                              }}
                            ></div>
                            <Typography>Pro-Pit Bull</Typography>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              marginLeft: "15px",
                              marginRight: "15px",
                            }}
                          >
                            <div
                              style={{
                                height: "10px",
                                width: "10px",
                                borderRadius: "100%",
                                backgroundColor: "#7661E2",
                              }}
                            ></div>
                            <Typography>Moderate</Typography>
                          </Grid>
                          <Grid
                            item
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <div
                              style={{
                                height: "10px",
                                width: "10px",
                                borderRadius: "100%",
                                backgroundColor: "#F6866A",
                              }}
                            ></div>
                            <Typography>Anti-Pit Bull</Typography>
                          </Grid>
                        </Grid>
                      </Container>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-5 py-5">
                <h2 className="text-5xl font-semibold font-subheading">
                  🐕 <span className="ml-2">Breed Selection</span>
                </h2>
                <p className="mt-5 mb-3">
                  During the initial survey, participants were asked to select
                  from four breeds that are commonly called pit bulls. This data
                  shows the percentage of users who selected each breed, grouped
                  according to their alignment.
                </p>
                <div className="container mx-auto py-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="my-auto">
                      <h6 className="py-1 font-bold bg-neutral-300">
                        Pro-Pit Bull
                      </h6>
                      <table className="w-full text-xl text-neutral-700 font-medium bg-neutral-100">
                        <thead>
                          <tr>
                            <th className="py-2">Selection</th>
                            <th className="py-2">% of Users</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2">APBT</td>
                            <td className="py-2">
                              {proApbt > 0
                                ? `${(proApbt * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">AST</td>
                            <td className="py-2">
                              {proAst > 0
                                ? `${(proAst * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">SBT</td>
                            <td className="py-2">
                              {proSbt > 0
                                ? `${(proSbt * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">AB</td>
                            <td className="py-2">
                              {proAb > 0
                                ? `${(proAb * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <h6 className="py-1 font-bold bg-neutral-300">
                        Moderate
                      </h6>
                      <table className="w-full text-xl text-neutral-700 font-medium bg-neutral-100">
                        <thead>
                          <tr>
                            <th className="py-2">Selection</th>
                            <th className="py-2">% of Users</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2">APBT</td>
                            <td className="py-2">
                              {moderateApbt > 0
                                ? `${(moderateApbt * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">AST</td>
                            <td className="py-2">
                              {moderateAst > 0
                                ? `${(moderateAst * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">SBT</td>
                            <td className="py-2">
                              {moderateSbt > 0
                                ? `${(moderateSbt * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">AB</td>
                            <td className="py-2">
                              {moderateAb > 0
                                ? `${(moderateAb * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <h6 className="py-1 font-bold bg-neutral-300">
                        Anti-Pit Bull
                      </h6>
                      <table className="w-full text-xl text-neutral-700 font-medium bg-neutral-100">
                        <thead>
                          <tr>
                            <th className="py-2">Selection</th>
                            <th className="py-2">% of Users</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2">APBT</td>
                            <td className="py-2">
                              {antiApbt > 0
                                ? `${(antiApbt * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">AST</td>
                            <td className="py-2">
                              {antiAst > 0
                                ? `${(antiAst * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">SBT</td>
                            <td className="py-2">
                              {antiSbt > 0
                                ? `${(antiSbt * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">AB</td>
                            <td className="py-2">
                              {antiAb > 0
                                ? `${(antiAb * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <Container
                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          boxShadow: "5px 5px 10px rgba(0,0,0,0.01)",
                          borderRadius: "10px",
                          marginTop: "20px",
                        }}
                      >
                        <BarChart
                          colors={["#AFE1AF", "#7661E2", "#F6866A"]}
                          xAxis={[
                            {
                              scaleType: "band",
                              data: ["APBT", "AST", "SBT", "AB"],
                            },
                          ]}
                          series={[
                            {
                              data: [
                                parseFloat((proApbt * 100).toFixed(1)),
                                parseFloat((proAst * 100).toFixed(1)),
                                parseFloat((proSbt * 100).toFixed(1)),
                                parseFloat((proAb * 100).toFixed(1)),
                              ],
                            },
                            {
                              data: [
                                parseFloat((moderateApbt * 100).toFixed(1)),
                                parseFloat((moderateAst * 100).toFixed(1)),
                                parseFloat((moderateSbt * 100).toFixed(1)),
                                parseFloat((moderateAb * 100).toFixed(1)),
                              ],
                            },
                            {
                              data: [
                                parseFloat((antiApbt * 100).toFixed(1)),
                                parseFloat((antiAst * 100).toFixed(1)),
                                parseFloat((antiSbt * 100).toFixed(1)),
                                parseFloat((antiAb * 100).toFixed(1)),
                              ],
                            },
                          ]}
                          height={400}
                        />
                      </Container>
                      <Grid
                        container
                        sx={{
                          padding: "0px 0px 20px 40px",
                          justifyContent: "space-around",
                          display: "flex",
                        }}
                      >
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "100%",
                              backgroundColor: "#AFE1AF",
                            }}
                          ></div>
                          <Typography>Pro-Pit Bull</Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginLeft: "15px",
                            marginRight: "15px",
                          }}
                        >
                          <div
                            style={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "100%",
                              backgroundColor: "#7661E2",
                            }}
                          ></div>
                          <Typography>Moderate</Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "100%",
                              backgroundColor: "#F6866A",
                            }}
                          ></div>
                          <Typography>Anti-Pit Bull</Typography>
                        </Grid>
                      </Grid>
                      <div className="mx-6 text-sm">
                        APBT - American Pit Bull Terrier{" "}
                        <span className="mx-1">|</span> AST - American
                        Staffordshire Terrier <span className="mx-1">|</span>{" "}
                        SBT - Staffordshire Bull Terrier{" "}
                        <span className="mx-1">|</span> AB - American Bully
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-5 py-5">
                <h2 className="text-5xl font-semibold font-subheading">
                  🧬 <span className="ml-2">DNA Selection</span>
                </h2>
                <p className="mt-5 mb-4">
                  Participants were asked to specify how much "pit bull DNA" is
                  required for a dog to be considered a pit bull. The following
                  results are broken down based on user alignment and ranges of
                  DNA percentages.
                </p>
                <div className="container mx-auto py-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="my-auto">
                      <h6 className="py-1 font-bold bg-neutral-300">
                        Pro-Pit Bull
                      </h6>
                      <table className="w-full text-xl text-neutral-700 font-medium bg-neutral-100">
                        <thead>
                          <tr>
                            <th className="py-2">Selection</th>
                            <th className="py-2">% of Users</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2">≤ 25%</td>
                            <td className="py-2">
                              {proPercentage25 > 0
                                ? `${(proPercentage25 * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">26% - 50%</td>
                            <td className="py-2">
                              {proPercentage50 > 0
                                ? `${(proPercentage50 * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">51% - 75%</td>
                            <td className="py-2">
                              {proPercentage75 > 0
                                ? `${(proPercentage75 * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">76% - 100%</td>
                            <td className="py-2">
                              {proPercentageGreaterThan75 > 0
                                ? `${(proPercentageGreaterThan75 * 100).toFixed(
                                    1
                                  )}%`
                                : "0%"}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <h6 className="py-1 font-bold bg-neutral-300">
                        Moderate
                      </h6>
                      <table className="w-full text-xl text-neutral-700 font-medium bg-neutral-100">
                        <thead>
                          <tr>
                            <th className="py-2">Selection</th>
                            <th className="py-2">% of Users</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2">≤ 25%</td>
                            <td className="py-2">
                              {modPercentage25 > 0
                                ? `${(modPercentage25 * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">26% - 50%</td>
                            <td className="py-2">
                              {modPercentage50 > 0
                                ? `${(modPercentage50 * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">51% - 75%</td>
                            <td className="py-2">
                              {modPercentage75 > 0
                                ? `${(modPercentage75 * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">76% - 100%</td>
                            <td className="py-2">
                              {modPercentageGreaterThan75 > 0
                                ? `${(modPercentageGreaterThan75 * 100).toFixed(
                                    1
                                  )}%`
                                : "0%"}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <h6 className="py-1 font-bold bg-neutral-300">
                        Anti-Pit Bull
                      </h6>
                      <table className="w-full text-xl text-neutral-700 font-medium bg-neutral-100">
                        <thead>
                          <tr>
                            <th className="py-2">Selection</th>
                            <th className="py-2">% of Users</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2">≤ 25%</td>
                            <td className="py-2">
                              {antiPercentage25 > 0
                                ? `${(antiPercentage25 * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">26% - 50%</td>
                            <td className="py-2">
                              {antiPercentage50 > 0
                                ? `${(antiPercentage50 * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">51% - 75%</td>
                            <td className="py-2">
                              {antiPercentage75 > 0
                                ? `${(antiPercentage75 * 100).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">76% - 100%</td>
                            <td className="py-2">
                              {antiPercentageGreaterThan75 > 0
                                ? `${(
                                    antiPercentageGreaterThan75 * 100
                                  ).toFixed(1)}%`
                                : "0%"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <Container
                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          boxShadow: "5px 5px 10px rgba(0,0,0,0.01)",
                          borderRadius: "10px",
                          marginTop: "20px",
                        }}
                      >
                        <BarChart
                          colors={["#AFE1AF", "#7661E2", "#F6866A"]}
                          xAxis={[
                            {
                              scaleType: "band",
                              data: [
                                "≤25%",
                                "26% - 50%",
                                "51% - 70%",
                                "71% - 100%",
                              ],
                            },
                          ]}
                          series={[
                            {
                              data: [
                                parseFloat((proPercentage25 * 100).toFixed(1)),
                                parseFloat((proPercentage50 * 100).toFixed(1)),
                                parseFloat((proPercentage75 * 100).toFixed(1)),
                                parseFloat(
                                  (proPercentageGreaterThan75 * 100).toFixed(1)
                                ),
                              ],
                            },
                            {
                              data: [
                                parseFloat((modPercentage25 * 100).toFixed(1)),
                                parseFloat((modPercentage50 * 100).toFixed(1)),
                                parseFloat((modPercentage75 * 100).toFixed(1)),
                                parseFloat(
                                  (modPercentageGreaterThan75 * 100).toFixed(1)
                                ),
                              ],
                            },
                            {
                              data: [
                                parseFloat((antiPercentage25 * 100).toFixed(1)),
                                parseFloat((antiPercentage50 * 100).toFixed(1)),
                                parseFloat((antiPercentage75 * 100).toFixed(1)),
                                parseFloat(
                                  (antiPercentageGreaterThan75 * 100).toFixed(1)
                                ),
                              ],
                            },
                          ]}
                          height={400}
                        />
                      </Container>
                      <Grid
                        container
                        sx={{
                          padding: "0px 0px 20px 40px",
                          justifyContent: "space-around",
                          display: "flex",
                        }}
                      >
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "100%",
                              backgroundColor: "#AFE1AF",
                            }}
                          ></div>
                          <Typography>Pro-Pit Bull</Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginLeft: "15px",
                            marginRight: "15px",
                          }}
                        >
                          <div
                            style={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "100%",
                              backgroundColor: "#7661E2",
                            }}
                          ></div>
                          <Typography>Moderate</Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "100%",
                              backgroundColor: "#F6866A",
                            }}
                          ></div>
                          <Typography>Anti-Pit Bull</Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-5 py-5">
                <h2 className="text-5xl font-semibold font-subheading">
                  🏆 <span className="ml-2">High Scores</span>
                </h2>
                <p className="mt-5 mb-6">
                  The following table lists the top 10 participants based on how
                  many dogs they were able to correctly identify as pit bulls.
                  It is important to understand that this data is partially
                  subjective, as it is based on each individual's personal
                  criteria and perceptions.
                </p>
                <div className="flex justify-center">
                  <div className="w-full md:w-1/2">
                    <h6 className="py-1 font-bold bg-neutral-300">
                      All Participants
                    </h6>
                    <table className="w-full text-xl text-neutral-700 font-medium bg-neutral-100">
                      <thead>
                        <tr>
                          <th className="py-2">Username</th>
                          <th className="py-2">Alignment</th>
                          <th className="py-2">Accuracy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topUsers.map((user, index) => {
                          return (
                            <tr key={index}>
                              <td className="py-2 col-first">
                                {renderUserName(user.username)}
                              </td>
                              <td className="py-2">
                                {user.alignment === "neutral"
                                  ? "moderate"
                                  : user.alignment}
                              </td>
                              <td className="py-2">
                                {user.accuracy.toFixed(1)}%
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Link
                to="/1"
                className="mb-6 mt-3 inline-flex items-center justify-center text-center h-16 p-5 font-semibold text-2xl text-white tracking-tight bg-neutral-900 hover:bg-neutral-200 focus:bg-neutral-200 rounded-lg focus:ring-4 focus:ring-neutral-300 transition duration-200"
              >
                Go Back
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResultsPage;

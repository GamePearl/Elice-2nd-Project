import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../../front/src/components/styles/GlobalStyle";

import { loginReducer } from "./reducer";

import Header from "./components/Header";
import Main from "./pages/Main";
import GameSearch from "./pages/GameSearch";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Community from "./pages/Community";
import CommunityDetail from "./components/community/CommunityDetail";
import Recommend from "./pages/Recommend";
import RecomGenre from "./components/recommend/RecomGenre";
import RecomQnA from "./components/recommend/RecomQnA";
import RecomResult from "./components/recommend/RecomResult";
import RecomResultDetail from "./components/recommend/RecomResultDetail";
import Prologue from "./pages/Prologue";
import Mypage from "./pages/Mypage";
import MiniGame from "./pages/MiniGame";
import TopChart from "./pages/TopChart";
import CommunityAddForm from "./components/community/CommunityAddForm";
import GameDetail from "./pages/GameDetail";
import Github from "./components/socialLogin/Github";
import Google from "./components/socialLogin/Google";
import Kakao from "./components/socialLogin/Kakao";
import PacmanLoader from "react-spinners/PacmanLoader";
import loadingbg from "./images/loadingbg.svg";
import Roulette from "./components/minigame/Roulette/Roulette";
import MemorizeCards from "./components/minigame/Cat Match/MemorizeCards";
import SnakeBoard from "./components/minigame/Snake/SnakeBoard";
import GameSearchGenre from "./components/Search/GameSearchGenre";
import GameSearchPlatform from "./components/Search/GameSearchPlatform";
import GameSearchAge from "./components/Search/GameSearchAge";
import TeamInfo from "./pages/TeamInfo";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  // useReducer ?????? ?????? userState ????????? dispatch????????? ?????????.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  const [bookmark, setBookmark] = useState();

  // ????????? fetchCurrentUser ????????? ????????? ????????? ??????????????? ??????????????? ???.
  // ?????? ????????? ?????? isFetchCompleted ??? true?????? ??????????????? ?????????.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const currentUser = JSON.parse(sessionStorage.getItem("user"));

      // ????????? ??? ????????? ????????????
      if (!currentUser)
        console.log("%c SessionStorage??? ?????? ??????.", "color: #d93d1a;");
      // ????????? ????????????
      else {
        // dispatch ????????? ?????? ????????? ?????? ????????? ??????.
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: currentUser,
        });

        console.log("%c sessionStorage??? ?????? ??????.", "color: #d93d1a;");
      }
    } catch {
      console.log("???????????????.");
    }
    // fetchCurrentUser ????????? ???????????????, isFetchCompleted ????????? true??? ?????????
    setIsFetchCompleted(true);
  };

  // useEffect????????? ?????? fetchCurrentUser ????????? ?????????.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${loadingbg})`,
          backgroundSize: "100%",
          width: "100%",
        }}
      >
        <div style={{ marginRight: 100, marginBottom: 100 }}>
          <PacmanLoader
            size={30}
            // style={{ marginRight: 100 }}
            color={"rgba(201,138,204,1)"}
          />
        </div>
      </div>
    );
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Header />
          <ScrollToTop />
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/gamesearch" element={<GameSearch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/topchart" element={<TopChart />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/recommend/qna/1" element={<RecomGenre />} />
            <Route path="/recommend/qna/2" element={<RecomQnA />} />
            <Route path="/recommend/result" element={<RecomResult />} />
            <Route
              path="/recommend/result/detail"
              element={<RecomResultDetail />}
            />
            <Route path="/prologue" element={<Prologue />} />
            <Route path="/teaminfo" element={<TeamInfo />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/community/create" element={<CommunityAddForm />} />
            <Route path="/gamedetail/:id" element={<GameDetail />} />
            <Route path="/auth/github/callback" element={<Github />} />
            <Route path="/auth/google/callback" element={<Google />} />
            <Route path="/auth/kakao/callback" element={<Kakao />} />
            <Route path="/minigame/2048" element={<MiniGame />} />
            <Route path="/minigame/roulette" element={<Roulette />} />
            <Route path="/minigame/catMatch" element={<MemorizeCards />} />
            <Route path="/minigame/snake" element={<SnakeBoard />} />
            <Route path="/gamesearch/:genre" element={<GameSearchGenre />} />
            <Route
              path="/gamesearch/platform/:platform"
              element={<GameSearchPlatform />}
            />
            <Route path="/gamesearch/age/:age" element={<GameSearchAge />} />
          </Routes>
          <Footer />
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;

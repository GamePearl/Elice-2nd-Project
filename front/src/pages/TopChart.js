import React from "react";
import Slider from "../components/Slider";
import Slider2 from "../components/Slider2";
import Slider3 from "../components/Slider3";
import Slider4 from "../components/Slider4";
import { MainImage, Main } from "../components/styles/TopChartStyle";
function TopChart() {
  return (
    <body style={{ height: "280vh" }}>
      <MainImage className="video">
        <video width="100%" muted autoPlay loop>
          <source src="/videos/trophy2.mp4" type="video/mp4" />
        </video>
        <div className="title">
          <h1>TOP 차트</h1>
        </div>
      </MainImage>
      <Main>
        <div
          className="toptenContainer"
          id="best"
          style={{
            margin: 0,
            background: `linear-gradient(
    180deg,
    rgba(117, 130, 183, 0.59) 0%,
    rgba(168, 202, 210, 0.59) 100%
  )`,
          }}
        >
          <h3>평점 TOP 10</h3>
          <Slider></Slider>
        </div>
        <div className="toptenContainer" id="genre">
          <h3>장르별 TOP 10</h3>
          <Slider2></Slider2>
        </div>
        <div
          className="toptenContainer"
          id="age"
          style={{
            background: `linear-gradient(
    180deg,
    rgba(117, 130, 183, 0.59) 0%,
    rgba(168, 202, 210, 0.59) 100%
  )`,
          }}
        >
          <h3>이용등급별 TOP 10</h3>

          <Slider3></Slider3>
        </div>
        <div className="toptenContainer" id="worst">
          <h3>똥겜 TOP 10</h3>
          <Slider4></Slider4>
        </div>
      </Main>
    </body>
  );
}

export default TopChart;

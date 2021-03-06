import React, { Component, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { ImgDiv } from "../styles/GameSearchStyle";
import { Accordion } from "react-bootstrap";

const MainNews = ({ firstGameNews, lastGameNews }) => {
  return (
    <First>
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header style={{ backgroundColor: "grey !important" }}>
            <News className="container">
              {firstGameNews.map((item) => (
                <div className="card-wrapper">
                  <div className="card-image">
                    <a href={item.url} target="_blank">
                      <img src={item.thumbnail} alt="gameNews image" />
                    </a>
                  </div>
                  <div className="newsTitle">{item.title}</div>
                </div>
              ))}
            </News>
          </Accordion.Header>
          <Accordion.Body
            style={{
              height: "100vh",
              background: "rgba(54, 52, 137, 0.1)",
            }}
          >
            <News className="container">
              {lastGameNews.map((item) => (
                <div className="card-wrapper">
                  <div className="card-image">
                    <a href={item.url} target="_blank">
                      <img src={item.thumbnail} alt="gameNews image" />
                    </a>
                  </div>
                  <div className="newsTitle">{item.title}</div>
                </div>
              ))}
            </News>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </First>
  );
};

const First = styled.div`
  .accordion-item {
    border-radius: 10px !important;
    background-color: rgba(54, 52, 137, 0.1) !important;
  }
  .accordion-button {
    background-color: rgba(54, 52, 137, 0) !important;
    border-radius: 10px !important;
    color: white;
  }
  .accordion-button:focus {
    box-shadow: none;
  }
  .accordion-button:not(.collapsed) {
    color: white;
    border-radius: 10px !important;
  }
  .container {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
const News = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .card-wrapper {
    width: 23%;
    margin: 10px 5px;
  }
  .newsTitle {
    margin-top: 10px;
  }
`;
export default MainNews;

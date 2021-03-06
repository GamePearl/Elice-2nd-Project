import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { useEffect, useState } from 'react'
import styled, { keyframes } from "styled-components"
import { Link } from 'react-router-dom'


const RecomSlider = ({ gameItem, getCurrentIdx }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentNum, setCurrentNum] = useState(1)
    const slideLength = 5;

    const autoScroll = false;
    let slideInterval
    let intervalTime = 5000;

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)
        setCurrentNum(currentNum === 1 ? 5 : currentNum - 1)

    }

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
        setCurrentNum(currentNum === 5 ? 1 : currentNum + 1)

    }

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime)
    }


    useEffect(() => {
        setCurrentSlide(0)
        setCurrentNum(1)
    }, [])

    useEffect(() => {
        if (autoScroll) {
            auto()
        }
        return () => clearInterval(slideInterval)
    }, [currentSlide])



    return (
        <BodyStyle>
            <Slider>
                <AiOutlineArrowLeft className="Arrow Prev" onClick={prevSlide} />
                <AiOutlineArrowRight className="Arrow Next" onClick={nextSlide} />
                {gameItem.map((items, index) => {
                    return (
                        <CurrentSlide className={index === currentSlide ? "current" : "slide"} key={index}>
                            {index === currentSlide && (
                                <>
                                    <Background src={items.background} alt='game_background' />
                                    <Content className="Content">
                                        <h5>당신에게 추천드리는 게임은... ({currentNum}/5)</h5>
                                        <Link
                                            key={index}
                                            to={`/gamedetail/${items["gameId"]}`}
                                        >
                                            <HeaderImg src={items.headerImage} /></Link>
                                        <Heading>
                                            {items.name}
                                        </Heading>
                                        <hr />
                                        <ContentDetail>
                                            <ReleasedDate>
                                                {items.releaseDate}
                                            </ReleasedDate>
                                            <Genre>{items.genres}</Genre>
                                            < RequiredAge>{items.requiredAge}</RequiredAge>
                                        </ContentDetail>
                                    </Content>

                                </>
                            )}

                        </CurrentSlide>

                    )
                })}
            </Slider>
        </BodyStyle>


    )



}

export default RecomSlider


const BodyStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: beige;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


`


const Slider = styled.div`
    overflow: hidden;

    .Arrow {
        border: 2px solid #fff;
        background-color: transparent;
        color: #fff;
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        position: absolute;
        top: 45%;
        z-index: 999;
    }
    
    .Arrow:hover{
            background: #fff;
            color: #777;
    }
    .Next{
        left: 48rem;
    }

    .Prev{
        left: 5rem;
    }

    hr{
        height: 2px;
        background: #fff;
        width: 80%;


    }


`


const Background = styled.img`
    width: 100vw;
    height: 100vh;

`




const CurrentSlide = styled.div`
    .current{
        opacity: 1;
        transform: translateX(0);


    }
    .slide{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height: 100%;
        opacity: 0;
        transform: translateX(-50%);
        transition: all 0.5s ease;
    }

    .slide img{
        height: 100%;
    }

    .current .Content {
        opacity: 1;
        transform: translateX(0);
        transition: all 0.5s ease;
}


`

const slideUp = keyframes`
    0% { 
        visibility: visible;
        top: 4rem;
    }

    100% { 
        visibility: visible;
        top: 7rem;

    }


`



const Content = styled.div`
    *{
        color: #fff;
        margin-bottom: 1rem;

    }

    padding: 3rem;
    background-color: rgba(0,0,0,0.3);
    position: absolute;
    top: 8rem;
    left: 10rem;
   /*  opacity: 0; */
    animation: ${slideUp} 1s ease .5s;
    animation-fill-mode: forwards;
  /*   visibility: hidden; */

`









const HeaderImg = styled.img`


`



const Heading = styled.h2``



const ContentDetail = styled.div`
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const ReleasedDate = styled.p`
    display: inline-block;

`

const RequiredAge = styled.p`
    display: inline-block;

`

const Genre = styled.p`
    display: inline-block;
`
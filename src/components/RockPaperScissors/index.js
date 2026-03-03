import {useState} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'

import {PopupContainer, Score} from './styledComponets.js'

import 'reactjs-popup/dist/index.css'
import './index.css'

const RockPaperScissors = props => {
  const {choicesList} = props
  const [score, setScore] = useState(0)
  const [resultMessage, setResultMessage] = useState('')
  const [isResult, setResult] = useState(false)

  const [resultImages, setResultImages] = useState({
    myChoise: '',
    opponentChoise: '',
  })

  const clickedImg = (myChoise, myChoiseImg) => {
    const randNum = Math.floor(Math.random() * choicesList.length)

    const oppositePersonChoice = choicesList[randNum].id
    const oppositeChoiseImg = choicesList[randNum].imageUrl

    if (myChoise === oppositePersonChoice) {
      setResultMessage('IT IS DRAW')
      setResult(true)
      setResultImages({
        myChoise: myChoiseImg,
        opponentChoise: oppositeChoiseImg,
      })
    } else if (
      (myChoise === 'PAPER' && oppositePersonChoice === 'ROCK') ||
      (myChoise === 'SCISSORS' && oppositePersonChoice === 'PAPER') ||
      (myChoise === 'ROCK' && oppositePersonChoice === 'SCISSORS')
    ) {
      setResultMessage('YOU WON')
      setScore(prev => prev + 1)
      setResult(true)
      setResultImages({
        myChoise: myChoiseImg,
        opponentChoise: oppositeChoiseImg,
      })
    } else {
      setResultMessage('YOU LOSE')
      setResult(true)
      setScore(prev => prev - 1)
      setResultImages({
        myChoise: myChoiseImg,
        opponentChoise: oppositeChoiseImg,
      })
    }
  }
  console.log(isResult)
  const playAgain = () => {
    setResult(false)
  }

  const renderResult = () => (
    <div className='results-view-container'>
      <div>
        <h1>You</h1>
        <img
          src={resultImages.myChoise}
          alt='your choice'
          className='result-img'
        />
      </div>
      <div>
        <h1>Opponent</h1>
        <img
          src={resultImages.opponentChoise}
          alt='opponent choice'
          className='result-img'
        />
      </div>
      <div>
        <p className='result-message'>{resultMessage}</p>
        <button
          type='button'
          data-testid='button'
          className='play-again-btn'
          onClick={playAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  )

  return (
    <div className='main-container'>
      <div className='game-list-score-card'>
        <h1>Rock Paper Scissors</h1>
        <div className='score-card'>
          <p>Score</p>
          <Score>{score}</Score>
        </div>
      </div>
      {!isResult ? (
        <div className='game-play-card'>
          <button
            type='button'
            data-testid='rockButton'
            className='rock-paper-scissors-card'
            onClick={() =>
              clickedImg(choicesList[0].id, choicesList[0].imageUrl)
            }
          >
            <img src={choicesList[0].imageUrl} alt={choicesList[0].id} />
          </button>
          <button
            type='button'
            data-testid='scissorsButton'
            className='rock-paper-scissors-card'
            onClick={() =>
              clickedImg(choicesList[1].id, choicesList[1].imageUrl)
            }
          >
            <img src={choicesList[1].imageUrl} alt={choicesList[1].id} />
          </button>
          <button
            type='button'
            data-testid='paperButton'
            onClick={() =>
              clickedImg(choicesList[2].id, choicesList[2].imageUrl)
            }
          >
            <img src={choicesList[2].imageUrl} alt={choicesList[2].id} />
          </button>
        </div>
      ) : (
        renderResult()
      )}

      <PopupContainer>
        <Popup
          modal
          trigger={
            <button type='button' data-testid='button' className='rules-button'>
              Rules
            </button>
          }
        >
          {close => (
            <div className='rules-img-card'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png'
                alt='rules'
                className='img'
              />
              <button
                type='button'
                onClick={() => close()}
                className='close-btn'
              >
                <RiCloseLine />
              </button>
            </div>
          )}
        </Popup>
      </PopupContainer>
    </div>
  )
}

export default RockPaperScissors

import './App.css'
import Audio from './AudioFiles'
import {useState} from 'react';
import {shuffle} from 'lodash';
import Winner from './Winner';

function App() {

  const [cards, setCards] = useState(shuffle([...Audio, ...Audio]));
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);

  const play = (index) => {
    flipCard(index)
  }

  function flipCard(index){
    let localActiveCards = []

    if(won) {
      setCards(shuffle([...Audio, ...Audio]));
      setFoundPairs([]);
      setWon(false);
      setClicks(0)
    }
    if (activeCards.length === 0) {
      setActiveCards([index])
      localActiveCards=[index]
    }
    if (activeCards.length === 1) {

      const firstIndex = activeCards[0];
      const secondIndex = index;

      if(cards[firstIndex] === cards[secondIndex]) {

        if(foundPairs.length + 2 === cards.length) {
          setWon(true)
        }
        setTimeout(() => {
          setFoundPairs([...foundPairs,firstIndex,secondIndex]);
        }, 1000);
      }
      setActiveCards([...activeCards, index])
      localActiveCards=[...activeCards, index]
    }
    if(activeCards.length ===2) {

      setActiveCards([index])
      localActiveCards=[index]
    }
    setClicks(clicks + 1)


    playAudio(index, localActiveCards)
  }

  const playAudio = (i, actCards) => {
    const audioFiles = document.getElementsByClassName("audio-files")

    for (const file of audioFiles) {
      file.pause()
    }
    const audio = document.getElementsByClassName("audio-files")[i]
    audio.play()
    audio.currentTime = 2;
    playWithInterval(actCards)
  };

  const stopAll = () => {
    const audioFiles = document.getElementsByClassName("audio-files")

    for (const file of audioFiles) {
      file.pause()
      setActiveCards([])
    }
  }
  
  const [timer, setTimer] = useState()

  const playWithInterval = (actCards) => {
    const localTimer = timer
    clearTimeout(localTimer)
    setTimer(setTimeout(() => {
      const audioFiles = document.getElementsByClassName("audio-files")

      for (const file of audioFiles) {
        file.pause()
      }

      if(actCards.length > 1) {
        setActiveCards([])
      }
    }, 10000))
  }
  
  return (
    <div>
      {won ?  <Winner /> : null}
      {/* <div className="stats">
           Found pairs: {foundPairs.length / 2}
        </div> */}
        <div className="button" onClick={stopAll}>
        </div>
      <div className="board">
        {cards.map((card, index) => {
          const flippedToFront = (activeCards.indexOf(index) !== -1) || foundPairs.indexOf(index) !== -1;
          const hideFound = (foundPairs.indexOf(index) !== -1)
          return(
            <div className={"card-outer " + ( flippedToFront ? 'flipped' : '') + (hideFound ? ' hide' : '')}  onClick={() => play(index)} key={index}>
              <div className="card">
                <div className="front">
                  <audio className='audio-files'>
                    <source src={card}></source>
                  </audio>
                </div>
                <div className="back">
                  <p>{index+1}</p>
                </div>
              </div>
            </div>
          )
        }
        )}
        
      </div>
        
    </div>
  );
}

export default App;
import Tile from "./Tile.js";
import PCBar from "./PCBar.js";
import { useState, useEffect } from "react";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }
  return array;
}

function MemoryGame(props) {
  let shuffledTileData = shuffle(props.tileData);
  let [tileDataState, setTileDataState] = useState(shuffledTileData);
  let [selectedTile1, setSelectedTile1] = useState("");
  let [selectedTile2, setSelectedTile2] = useState("");
  let [matchedTiles, setMatchedTiles] = useState([]);
  let [pageState, setPageState] = useState("game");

  useEffect(() => {
    function updateSelectedTiles() {
      flip2Tile(Number(selectedTile1), Number(selectedTile2), isMatch);
      setSelectedTile1("");
      setSelectedTile2("");
    }

    if (matchedTiles.length === tileDataState.length) {
      setPageState("win");
    }
    if (!selectedTile1 || !selectedTile2) {
      return;
    }

    let isMatch = checkPair(selectedTile1, selectedTile2);
    let timeoutId;

    if (isMatch) {
      updateSelectedTiles();
      props.setNumStars(props.numStars + 1);
    } else {
      timeoutId = setTimeout(updateSelectedTiles, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedTile1, selectedTile2]);

  function selectTile(tileNumber) {
    if (selectedTile1 === "") {
      flipTile(tileNumber, true);
      setSelectedTile1(tileNumber.toString());
    } else if (selectedTile2 === "") {
      flipTile(tileNumber, true);
      setSelectedTile2(tileNumber.toString());
    }
  }

  function flipTile(tileNumberInt, showImage) {
    let newTileDataState = getNewTileState(
      tileDataState,
      tileNumberInt,
      showImage
    );
    setTileDataState(newTileDataState);
  }

  function flip2Tile(tile1Int, tile2Int, showImage) {
    let newTileDataState = getNewTileState(tileDataState, tile1Int, showImage);
    newTileDataState = getNewTileState(newTileDataState, tile2Int, showImage);
    setTileDataState(newTileDataState);
  }

  function getNewTileState(oldTileDataState, tileNumberInt, showImage) {
    let newTileDataState = [];
    // let selectedTileIndex = oldTileDataState.findIndex(
    //   (tile) => tile.tileNumber === tileNumberInt
    // );
    oldTileDataState.forEach((tile, index) => {
      if (index === tileNumberInt) {
        newTileDataState.push({
          ...tile,
          isFlipped: showImage
        });
      } else {
        newTileDataState.push(tile);
      }
    });
    return newTileDataState;
  }

  function checkPair(tile1, tile2) {
    if (getImageFromTileNum(tile1) === getImageFromTileNum(tile2)) {
      let newMatchedTiles = matchedTiles;
      newMatchedTiles.push(tile1, tile2);
      setMatchedTiles(newMatchedTiles);
      let newMatchedPC = props.matchedPC;
      newMatchedPC.unshift(getImageFromTileNum(tile1));
      props.setMatchedPC(newMatchedPC);

      return true;
    } else {
      return false;
    }
  }

  function getImageFromTileNum(tileNumber) {
    return tileDataState[Number(tileNumber)]?.image;
  }

  function reset() {
    setPageState("game");
    shuffle(shuffledTileData);
    setTileDataState(shuffledTileData);
    setMatchedTiles([]);
    props.setNumStars(props.numStars + 16);
  }

  function getPage() {
    if (pageState === "game") {
      return (
        <div className="MemoryGame">
          <div className="flex-container flex-start">
            <PCBar
              matchedPC={props.matchedPC}
              nameToGroupData={props.nameToGroupData}
            />
            <div className="flex-container flex-center">
              <div className="GameBoard">
                {tileDataState.map(({ image, isFlipped }, index) => {
                  return (
                    <Tile
                      number={index}
                      key={index}
                      image={image}
                      isFlipped={isFlipped}
                      selectTile={selectTile}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (pageState === "win") {
      return (
        <div className="WinPage">
          <h1>you've matched all the cards!</h1>
          <img
            className="endgameImg"
            alt="happy cat"
            src="https://media.tenor.com/YSg1RfzumocAAAAi/eyes-happy.gif"
          ></img>
          <button className="resetBTN" onClick={reset}>
            flip cards over!
          </button>
        </div>
      );
    }
  }

  return <div>{getPage()}</div>;
}

export default MemoryGame;

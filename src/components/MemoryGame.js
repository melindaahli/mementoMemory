import Tile from "./Tile.js";
import PCBar from "./PCBar.js";
import { useState, useEffect } from "react";
import tileDataJSON from "../tileData.json";

function MemoryGame(props) {
  let [pageState, setPageState] = useState("game");

  useEffect(() => {
    function updateSelectedTiles() {
      flip2Tile(
        Number(props.selectedTile1),
        Number(props.selectedTile2),
        isMatch
      );
      props.setSelectedTile1("");
      props.setSelectedTile2("");
    }

    if (
      props.matchedTiles.length != 0 &&
      props.matchedTiles.length === props.tileData.length
    ) {
      setPageState("win");
    }
    if (!props.selectedTile1 || !props.selectedTile2) {
      return;
    }

    let isMatch = checkPair(props.selectedTile1, props.selectedTile2);
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
  }, [props.selectedTile1, props.selectedTile2]);

  function selectTile(tileNumber) {
    if (props.selectedTile1 === "") {
      flipTile(tileNumber, true);
      props.setSelectedTile1(tileNumber.toString());
    } else if (props.selectedTile2 === "") {
      flipTile(tileNumber, true);
      props.setSelectedTile2(tileNumber.toString());
    }
  }

  function flipTile(tileNumberInt, showImage) {
    let newTileDataState = getNewTileState(
      props.tileData,
      tileNumberInt,
      showImage
    );
    props.setTileData(newTileDataState);
  }

  function flip2Tile(tile1Int, tile2Int, showImage) {
    let newTileDataState = getNewTileState(props.tileData, tile1Int, showImage);
    newTileDataState = getNewTileState(newTileDataState, tile2Int, showImage);
    props.setTileData(newTileDataState);
  }

  function getNewTileState(oldTileDataState, tileNumberInt, showImage) {
    let newTileDataState = [];
    oldTileDataState.forEach((tile, index) => {
      if (index === tileNumberInt) {
        newTileDataState.push({
          ...tile,
          isFlipped: showImage,
        });
      } else {
        newTileDataState.push(tile);
      }
    });
    return newTileDataState;
  }

  function getValueFromObjUsingIndex(array, index, property) {
    return array[index][property];
  }

  function getOddNumberFromPair(x, y) {
    if (x % 2 === 0) {
      return y;
    } else {
      return x;
    }
  }

  function getNameFromImgURL(url) {
    return url.substring(10, url.indexOf("."));
  } // 10 is the length of "/PCimages/"

  function checkPair(tile1, tile2) {
    if (getImageFromTileNum(tile1) === getImageFromTileNum(tile2)) {
      let newMatchedTiles = props.matchedTiles;
      newMatchedTiles.push(tile1, tile2);
      props.setMatchedTiles(newMatchedTiles);
      let newMatchedPC = props.matchedPC;
      // newMatchedPC.unshift(getImageFromTileNum(tile1));
      let pairOfTileNumbers = [
        getValueFromObjUsingIndex(props.tileData, tile1, "tileNumber"),
        getValueFromObjUsingIndex(props.tileData, tile2, "tileNumber"),
      ];
      newMatchedPC.unshift({
        tileNumber: getOddNumberFromPair(
          pairOfTileNumbers[0],
          pairOfTileNumbers[1]
        ),
        image: getImageFromTileNum(tile1),
        name: getNameFromImgURL(props.tileData[tile1]["image"]),
      });
      props.setMatchedPC(newMatchedPC);
      return true;
    } else {
      return false;
    }
  }

  function getImageFromTileNum(tileNumber) {
    return props.tileData[Number(tileNumber)]?.image;
  }

  function reset() {
    setPageState("game");
    props.setTileData(props.getSetOfnTiles(props.NTiles, tileDataJSON));
    props.setMatchedTiles([]);
    props.setNumStars(props.numStars + props.NTiles);
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
            <div
              className="flex-container flex-center"
              style={{ height: "500px" }}
            >
              <div className="GameBoard">
                {props.tileData.map(({ image, isFlipped }, index) => {
                  return (
                    <Tile
                      index={index}
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
            more cards!
          </button>
        </div>
      );
    }
  }

  return <div>{getPage()}</div>;
}

export default MemoryGame;

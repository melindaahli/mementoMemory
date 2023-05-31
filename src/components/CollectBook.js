import tileDataJSON from "../tileData.json";
import { useState, useEffect } from "react";
import PC from "./PC.js";

function CollectBook(props) {
  // obj array of all possible cards: image url, name, group, tileNumber (odd), (isFlipped)
  let cardList = every_nth(tileDataJSON.flat(), 2);

  let [earnedCardsList, setEarnedCardsList] = useState(getBlankCardList());

  let [startIndex, setStartIndex] = useState(0);
  let [leftPageCardList, setLeftPageCardList] = useState(
    earnedCardsList.slice(startIndex, startIndex + 4)
  );
  let [rightPageCardList, setRightPageCardList] = useState(
    earnedCardsList.slice(startIndex + 4, startIndex + 4 + 4)
  );

  // returns obj array of every other object in initial array
  function every_nth(arr, nth) {
    return arr.filter((e, i) => i % nth === nth - 1);
  }

  // returns obj array of all possivle cards: image url -> placeholder img url, name -> ???, group, tileNumber, (isFlipped)
  function getBlankCardList() {
    let blankCardList = [];
    cardList.forEach((cardObj) => {
      blankCardList.push({
        ...cardObj,
        image: "./PCimages/placeholder.jpg",
        name: "???",
      });
    });
    return blankCardList;
  }

  useEffect(() => {
    // updates the img url and name in earnedCardsList based on matchedPC array
    function updateBook(oldEarnedCardsList) {
      let uniquePCs = [...new Set(props.matchedPC)];
      let newEarnedCardsList = [];
      newEarnedCardsList = oldEarnedCardsList.map((item) => {
        const item2 = uniquePCs.find((i2) => i2.tileNumber === item.tileNumber);
        return item2 ? { ...item, ...item2 } : item;
      });
      setEarnedCardsList(newEarnedCardsList);
    }
    updateBook(earnedCardsList);
  }, [props.matchedPC]);

  useEffect(() => {
    // changes imgs
    function flipBook() {
      setLeftPageCardList(earnedCardsList.slice(startIndex, startIndex + 4));
      setRightPageCardList(
        earnedCardsList.slice(startIndex + 4, startIndex + 4 + 4)
      );
    }
    flipBook();
  }, [startIndex, earnedCardsList]);

  function getButtonVisibility(LeftOrRight, index) {
    if (LeftOrRight === "left") {
      if (index === 0) {
        return "hidden";
      } else {
        return "visible";
      }
    } else {
      if (index + 8 >= cardList.length) {
        return "hidden";
      } else {
        return "visible";
      }
    }
  }

  return (
    <div className="CollectBook flex-container">
      <button
        style={{ visibility: `${getButtonVisibility("left", startIndex)}` }}
        onClick={() => {
          setStartIndex(startIndex - 8);
        }}
      >
        &larr;
      </button>
      <div className="book flex-container">
        <div
          className="leftPage bookPage flex-container"
          style={{ flexWrap: "wrap" }}
        >
          {leftPageCardList.map(({ image, name }, index) => {
            return (
              <div>
                <PC
                  setInfoCard={props.setInfoCard}
                  currentTab={props.currentTab}
                  setCurrentTab={props.setCurrentTab}
                  key={index}
                  imgURL={image}
                />
                <p>{name}</p>
              </div>
            );
          })}
        </div>
        <div
          className="rightPage bookPage flex-container"
          style={{ flexWrap: "wrap" }}
        >
          {rightPageCardList.map(({ image, name }, index) => {
            return (
              <div>
                <PC
                  setInfoCard={props.setInfoCard}
                  currentTab={props.currentTab}
                  setCurrentTab={props.setCurrentTab}
                  key={index}
                  imgURL={image}
                />
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <button
        style={{ visibility: `${getButtonVisibility("right", startIndex)}` }}
        onClick={() => {
          setStartIndex(startIndex + 8);
        }}
      >
        &rarr;
      </button>
    </div>
  );
}

export default CollectBook;

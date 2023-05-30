import tileDataJSON from "../tileData.json";
import { useState, useEffect } from "react";
import PC from "./PC.js";

function CollectBook(props) {
  let cardList = every_nth(tileDataJSON.flat(), 2);
  let blankCardList = getBlankCardList();
  let [earnedCardsList, setEarnedCardsList] = useState(blankCardList);
  // console.log("cardList:", cardList);
  let [startIndex, setStartIndex] = useState(0);
  // let startIndex = 0;
  let [leftPageCardList, setLeftPageCardList] = useState(
    earnedCardsList.slice(startIndex, startIndex + 4)
  );
  // let leftPageCardList = cardList.slice(startIndex, startIndex + 4);
  console.log("leftPageCardList:", leftPageCardList);
  let [rightPageCardList, setRightPageCardList] = useState(
    earnedCardsList.slice(startIndex + 4, startIndex + 4 + 4)
  );
  // let rightPageCardList = cardList.slice(startIndex + 4, startIndex + 4 + 4);
  console.log("rightPageCardList:", rightPageCardList);

  function getNameFromImgURL(url) {
    return url.substring(10, url.indexOf("."));
  } // 10 is the length of "/PCimages/"

  // useEffect(() => {
  //   function updateBook(oldEarnedCardsList) {
  //     let newEarnedCardsList = [];
  //     let uniquePCs = [...new Set(props.matchedPC)];
  //      console.log(uniquePCs)
  //     oldEarnedCardsList.forEach((card) => {
  //       uniquePCs.forEach((PC) => {
  //         if (card["tileNumber"] === PC["tileNumber"]) {
  //           newEarnedCardsList.push({
  //             ...card,
  //             image: PC["image"],
  //             name: getNameFromImgURL(PC["image"])
  //           });
  //         } else {
  //           newEarnedCardsList.push(card);
  //         }
  //       });
  //     });
  //     setEarnedCardsList(newEarnedCardsList);
  //   }
  //   updateBook(earnedCardsList);
  // }, [props.matchedPC]);

  function getBlankCardList() {
    let blankCardList = [];
    cardList.forEach((cardObj) => {
      blankCardList.push({
        ...cardObj,
        image: "./PCimages/placeholder.jpg",
        name: "???",
      });
    });
    console.log("blankCardList", blankCardList);
    return blankCardList;
  }

  function every_nth(arr, nth) {
    return arr.filter((e, i) => i % nth === nth - 1);
  }

  useEffect(() => {
    function flipBook() {
      console.log("in flipbook", earnedCardsList);
      setLeftPageCardList(earnedCardsList.slice(startIndex, startIndex + 4));
      setRightPageCardList(
        earnedCardsList.slice(startIndex + 4, startIndex + 4 + 4)
      );
    }
    flipBook();
  }, [startIndex]);

  function getButtonVisibility(LeftOrRight, index) {
    if (LeftOrRight === "left") {
      if (index === 0) {
        return "hidden";
      } else {
        return "visible";
      }
    } else {
      if (index + 8 > cardList.length) {
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
                <PC key={index} imgURL={image} />
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
                <PC key={index} imgURL={image} />
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

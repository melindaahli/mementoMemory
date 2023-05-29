import tileDataJSON from "../tileData.json";
import { useState, useEffect } from "react";
import PC from "./PC.js";

function CollectBook() {
  let cardList = every_nth(tileDataJSON.flat(), 2);
  // console.log("cardList:", cardList);
  let [startIndex, setStartIndex] = useState(0);
  // let startIndex = 0;
  let [leftPageCardList, setLeftPageCardList] = useState(
    cardList.slice(startIndex, startIndex + 4)
  );
  // let leftPageCardList = cardList.slice(startIndex, startIndex + 4);
  console.log("leftPageCardList:", leftPageCardList);
  let [rightPageCardList, setRightPageCardList] = useState(
    cardList.slice(startIndex + 4, startIndex + 4 + 4)
  );
  // let rightPageCardList = cardList.slice(startIndex + 4, startIndex + 4 + 4);
  console.log("rightPageCardList:", rightPageCardList);

  function every_nth(arr, nth) {
    return arr.filter((e, i) => i % nth === nth - 1);
  }

  useEffect(() => {
    function updateBook() {
      setLeftPageCardList(cardList.slice(startIndex, startIndex + 4));
      setRightPageCardList(cardList.slice(startIndex + 4, startIndex + 4 + 4));
    }
    updateBook();
  }, [startIndex]);

  return (
    <div className="CollectBook flex-container">
      <button
        // style={{ visibility:  }}
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
          {leftPageCardList.map(({ image }) => {
            return <PC imgURL={image} />;
          })}
        </div>
        <div
          className="rightPage bookPage flex-container"
          style={{ flexWrap: "wrap" }}
        >
          {rightPageCardList.map(({ image }) => {
            return <PC imgURL={image} />;
          })}
        </div>
      </div>
      <button
        // style={{ position: "absolute" }}
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

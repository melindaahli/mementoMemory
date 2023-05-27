import "./styles.css";
import { React, useState, useEffect } from "react";
import NavBar from "./components/NavBar.js";
import Start from "./components/Start.js";
import Shop from "./components/Shop.js";
import Info from "./components/Info.js";
import MemoryGame from "./components/MemoryGame.js";
import tileDataJSON from "./tileData.json";
import shopItems from "./shopItems.json";

export default function App() {
  let componentList = {
    Start: Start,
    MemoryGame: MemoryGame,
    Shop: Shop,
    Info: Info,
  };

  let [currentTab, setCurrentTab] = useState("Start");
  let [numStars, setNumStars] = useState(0);
  let [matchedPC, setMatchedPC] = useState([]);
  let [purchasedItems, setPurchasedItems] = useState([]);
  let [PCdeco, setPCdeco] = useState("");
  let [PCdecoType, setPCdecoType] = useState("");
  let [infoCardURL, setInfoCardURL] = useState("");
  let [infoCardName, setInfoCardName] = useState("name");
  let [infoCardGroupName, setInfoCardGroupName] = useState("group");
  let [shopItemsState, setShopItemsState] = useState(shopItems);
  let [NTiles, setNTiles] = useState(16);
  let [tileData, setTileData] = useState(getSetOfnTiles(NTiles, tileDataJSON));

  let nameToGroupData = {};
  tileDataJSON.flat().forEach(function ({ name, group }) {
    nameToGroupData[name] = group;
  });

  function getSetOfnTiles(NTiles, fullTileData) {
    let setOfNTiles = shuffle(fullTileData).flat();
    console.log("set of n tiles", setOfNTiles);
    // let startIndex = Math.floor(Math.random() * (setOfNTiles.length / 2)) * 2;
    let newSetOfNTiles = setOfNTiles.slice(0, NTiles);
    // for (let i = 0; i < numTilesToRemove; ) {
    //
    //   setOfNTiles.slice(startIndex, 2);
    //   i = i + 2;
    // }
    console.log("NTiles = ", NTiles, "new setOfNTiles = ", newSetOfNTiles);
    return newSetOfNTiles;
  }

  function setDecoOnInfoCard(url, type) {
    setPCdeco(url);
    setPCdecoType(type);
  }

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
        array[currentIndex],
      ];
    }
    return array;
  }

  function getComponentFromString(key) {
    let Component = componentList[key];
    return (
      <Component
        // for NavBar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        // for Start tab
        NTiles={NTiles}
        setNTiles={setNTiles}
        getSetOfnTiles={getSetOfnTiles}
        // for MemoryGame tab
        tileData={tileData}
        setTileData={setTileData}
        numStars={numStars}
        setNumStars={setNumStars}
        matchedPC={matchedPC}
        setMatchedPC={setMatchedPC}
        nameToGroupData={nameToGroupData}
        shuffle={shuffle}
        // for Shop tab
        shopItemsState={shopItemsState}
        purchasedItems={purchasedItems}
        setPurchasedItems={setPurchasedItems}
        setShopItemsState={setShopItemsState}
        // for Info tab
        PCdeco={PCdeco}
        PCdecoType={PCdecoType}
        setDecoOnInfoCard={setDecoOnInfoCard}
        infoCardURL={infoCardURL}
        setInfoCardURL={setInfoCardURL}
        infoCardName={infoCardName}
        setInfoCardName={setInfoCardName}
        infoCardGroupName={infoCardGroupName}
        setInfoCardGroupName={setInfoCardGroupName}
      />
    );
  }

  return (
    <div className="App">
      <div className="outer">
        <NavBar setCurrentTab={setCurrentTab} />
        <div className="monitor-screen">
          {getComponentFromString(currentTab)}
        </div>
        <h3>
          stars: {numStars}
          <img
            className="star-icon"
            src="https://i.pinimg.com/originals/93/a6/95/93a69514bf3b0af82c35b4a8c48395f4.png"
            alt="star"
          />
        </h3>
      </div>
    </div>
  );
}

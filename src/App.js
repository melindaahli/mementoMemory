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
  let [NTiles, setNTiles] = useState();
  let tileData;
  
  useEffect(() => {
    tileData = getSetOfnTiles(NTiles, tileDataJSON);
  }, [NTiles]);


  
    function getSetOfnTiles(nTiles, tileArray) {
    let setOfNTiles = tileArray;
    let numTilesToRemove = tileArray.length - nTiles;
    for (let i = 0; i < numTilesToRemove; ) {
      let startIndex = Math.floor(Math.random() * (tileArray.length / 2)) * 2;
      tileArray.splice(startIndex, 2);
      i = i + 2;
    }
    return setOfNTiles.flat();
  }

  let nameToGroupData = {};
  tileDataJSON.forEach(function ({ name, group }) {
    nameToGroupData[name] = group;
  });

  function setDecoOnInfoCard(url, type) {
    setPCdeco(url);
    setPCdecoType(type);
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
        // for MemoryGame tab
        tileData={tileData}
        numStars={numStars}
        setNumStars={setNumStars}
        matchedPC={matchedPC}
        setMatchedPC={setMatchedPC}
        nameToGroupData={nameToGroupData}
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

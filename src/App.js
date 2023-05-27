import "./styles.css";
import { React, useState } from "react";
import NavBar from "./components/NavBar.js";
import Start from "./components/Start.js";
import Shop from "./components/Shop.js";
import Deco from "./components/Deco.js";
import MemoryGame from "./components/MemoryGame.js";
import tileDataJSON from "./tileData.json";
import shopItems from "./shopItems.json";
import Alert from "./components/Alert.js";

export default function App() {
  let componentList = {
    Start: Start,
    MemoryGame: MemoryGame,
    Shop: Shop,
    Deco: Deco,
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
  let [NTiles, setNTiles] = useState(0);
  let [tileData, setTileData] = useState(getSetOfnTiles(NTiles, tileDataJSON));
  let [showAlert, setShowAlert] = useState("hidden");
  let [alertMessage, setAlertMessage] = useState("hi");

  let nameToGroupData = {};
  tileDataJSON.flat().forEach(function ({ name, group }) {
    nameToGroupData[name] = group;
  });

  function getSetOfnTiles(NTiles, fullTileData) {
    let setOfNTiles = shuffle(fullTileData).flat();
    let newSetOfNTiles = setOfNTiles.slice(0, NTiles);
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
        setShowAlert={setShowAlert}
        setAlertMessage={setAlertMessage}
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
  
  console.log(showAlert)
  console.log(alertMessage)
  console.log(NTiles)

  return (
    <div className="App">
      <div className="outer">
        <NavBar
          setCurrentTab={setCurrentTab}
          setShowAlert={setShowAlert}
          setAlertMessage={setAlertMessage}
          NTiles={NTiles}
        />
        <div className="monitor-screen">
          <Alert
            alertMessage={alertMessage}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
          {getComponentFromString(currentTab)}
        </div>
        <div className="extraBar">
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
    </div>
  );
}

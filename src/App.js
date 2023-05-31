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
import CollectBook from "./components/CollectBook.js";

export default function App() {
  let componentList = {
    Start: Start,
    MemoryGame: MemoryGame,
    Shop: Shop,
    Deco: Deco,
    CollectBook: CollectBook,
  };

  let [currentTab, setCurrentTab] = useState("Start");
  let [numStars, setNumStars] = useState(0);
  let [matchedPC, setMatchedPC] = useState([]);

  let [shopItemsState, setShopItemsState] = useState(shopItems);
  let [purchasedItems, setPurchasedItems] = useState([]);
  let [PCdeco, setPCdeco] = useState("");
  let [PCdecoType, setPCdecoType] = useState("");

  let [infoCardURL, setInfoCardURL] = useState("");
  let [infoCardName, setInfoCardName] = useState("name");
  let [infoCardGroupName, setInfoCardGroupName] = useState("group");

  let [NTiles, setNTiles] = useState(0);
  let [tileData, setTileData] = useState(getSetOfnTiles(NTiles, tileDataJSON));
  let [selectedTile1, setSelectedTile1] = useState("");
  let [selectedTile2, setSelectedTile2] = useState("");
  let [matchedTiles, setMatchedTiles] = useState([]);

  let [showAlert, setShowAlert] = useState("hidden");
  let [alertMessage, setAlertMessage] = useState("hi");

  let nameToGroupData = {};
  tileDataJSON.flat().forEach(function ({ name, group }) {
    nameToGroupData[name] = group;
  });

  function getSetOfnTiles(NTiles, fullTileData) {
    let newSetOfNTiles = shuffle(fullTileData).flat().slice(0, NTiles);
    return shuffle(newSetOfNTiles);
  }

  function setDecoOnInfoCard(url, type) {
    setPCdeco(url);
    setPCdecoType(type);
  }

  function getNameFromImgURL(url) {
    return url.substring(10, url.indexOf("."));
  } // 10 is the length of "/PCimages/"

  function getGroupFromName(name) {
    return nameToGroupData[name];
  }

  function setInfoCard(url) {
    let name = getNameFromImgURL(url);
    console.log("name", name);
    let group = getGroupFromName(name);
    console.log("group", group);
    setInfoCardURL(url);
    setInfoCardName(name);
    setInfoCardGroupName(group);
  }

  function shuffle(array) {
    let array2 = [...array];
    let currentIndex = array2.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array2[currentIndex], array2[randomIndex]] = [
        array2[randomIndex],
        array2[currentIndex],
      ];
    }
    return array2;
  }

  function getComponentFromString(key) {
    let Component = componentList[key];
    return (
      <Component
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setShowAlert={setShowAlert}
        setAlertMessage={setAlertMessage}
        //mainly for Start tab
        NTiles={NTiles}
        setNTiles={setNTiles}
        getSetOfnTiles={getSetOfnTiles}
        //mainly for MemoryGame tab
        tileData={tileData}
        setTileData={setTileData}
        numStars={numStars}
        setNumStars={setNumStars}
        matchedPC={matchedPC}
        setMatchedPC={setMatchedPC}
        nameToGroupData={nameToGroupData}
        matchedTiles={matchedTiles}
        setMatchedTiles={setMatchedTiles}
        selectedTile1={selectedTile1}
        setSelectedTile1={setSelectedTile1}
        selectedTile2={selectedTile2}
        setSelectedTile2={setSelectedTile2}
        //mainly for Shop tab
        shopItemsState={shopItemsState}
        purchasedItems={purchasedItems}
        setPurchasedItems={setPurchasedItems}
        setShopItemsState={setShopItemsState}
        //mainly for Deco tab
        PCdeco={PCdeco}
        PCdecoType={PCdecoType}
        setDecoOnInfoCard={setDecoOnInfoCard}
        infoCardURL={infoCardURL}
        infoCardName={infoCardName}
        infoCardGroupName={infoCardGroupName}
        setInfoCard={setInfoCard}
      />
    );
  }

  return (
    <div className="App">
      <div className="outer">
        <NavBar
          currentTab={currentTab}
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

import "./styles.css";
import { React, useState } from "react";
import NavBar from "./components/NavBar.js";
import Start from "./components/Start.js";
import Shop from "./components/Shop.js";
import Info from "./components/Info.js";
import MemoryGame from "./components/MemoryGame.js";

export default function App() {
  let componentList = {
    Start: Start,
    MemoryGame: MemoryGame,
    Shop: Shop,
    Info: Info
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
  let holderPrice = 10;
  let coverPrice = 5;
  let shopItems = [
    {
      url: "/shopImages/holder-pochacco.png",
      price: holderPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/holder-cinnamoroll.png",
      price: holderPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/holder-hellokitty.png",
      price: holderPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/holder-pompompurin.png",
      price: holderPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/holder-kuromi.png",
      price: holderPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/holder-mymelody.png",
      price: holderPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/cover-blackribbon.png",
      price: coverPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/cover-blueribbons.png",
      price: coverPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/cover-flower.png",
      price: coverPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/cover-greenbear.png",
      price: coverPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/cover-pinkribbon.png",
      price: coverPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/cover-pompompurin.png",
      price: coverPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/cover-star.png",
      price: coverPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/cover-toastcat.png",
      price: coverPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/cover-plaid.png",
      price: coverPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/cover-white_blueribbon.png",
      price: coverPrice,
      isPurchased: false
    },
    {
      url: "/shopImages/cover-orange_whiteribbon.png",
      price: coverPrice,
      isPurchased: false
    }
  ];
  let [shopItemsState, setShopItemsState] = useState(shopItems);

  let tileData = [
    // soobin
    {
      tileNumber: 0,
      isFlipped: false,
      image: "/PCimages/soobin.jpg",
      name: "soobin",
      group: "tomorrow x together"
    },
    {
      tileNumber: 1,
      isFlipped: false,
      image: "/PCimages/soobin.jpg",
      name: "soobin",
      group: "tomorrow x together"
    },

    // han
    {
      tileNumber: 2,
      isFlipped: false,
      image: "/PCimages/han.jpg",
      name: "han",
      group: "stray kids"
    },
    {
      tileNumber: 3,
      isFlipped: false,
      image: "/PCimages/han.jpg",
      name: "han",
      group: "stray kids"
    },

    //san
    {
      tileNumber: 4,
      isFlipped: false,
      image: "/PCimages/san.jpg",
      name: "san",
      group: "ateez"
    },
    {
      tileNumber: 5,
      isFlipped: false,
      image: "/PCimages/san.jpg",
      name: "san",
      group: "ateez"
    },

    //moonbin
    {
      tileNumber: 6,
      isFlipped: false,
      image: "/PCimages/moonbin.jpg",
      name: "moonbin",
      group: "astro"
    },
    {
      tileNumber: 7,
      isFlipped: false,
      image: "/PCimages/moonbin.jpg",
      name: "moonbin",
      group: "astro"
    },

    //youngji
    {
      tileNumber: 8,
      isFlipped: false,
      image: "/PCimages/youngji.jpg",
      name: "youngji",
      group: "solo"
    },
    {
      tileNumber: 9,
      isFlipped: false,
      image: "/PCimages/youngji.jpg",
      name: "youngji",
      group: "solo"
    },

    //kazuha
    {
      tileNumber: 10,
      isFlipped: false,
      image: "/PCimages/kazuha.jpg",
      name: "kazuha",
      group: "le sserafim"
    },
    {
      tileNumber: 11,
      isFlipped: false,
      image: "/PCimages/kazuha.jpg",
      name: "kazuha",
      group: "le sserafim"
    },

    //jk
    {
      tileNumber: 12,
      isFlipped: false,
      image: "/PCimages/jungkook.jpg",
      name: "jungkook",
      group: "bts"
    },
    {
      tileNumber: 13,
      isFlipped: false,
      image: "/PCimages/jungkook.jpg",
      name: "jungkook",
      group: "bts"
    },

    //scoups
    {
      tileNumber: 14,
      isFlipped: false,
      image: "/PCimages/scoups.jpg",
      name: "scoups",
      group: "seventeen"
    },
    {
      tileNumber: 15,
      isFlipped: false,
      image: "/PCimages/scoups.jpg",
      name: "scoups",
      group: "seventeen"
    }
  ];

  let nameToGroupData = {};
  tileData.forEach(({ name, group }) => {
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
        // for MemoryGame tab
        numStars={numStars}
        setNumStars={setNumStars}
        matchedPC={matchedPC}
        setMatchedPC={setMatchedPC}
        tileData={tileData}
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

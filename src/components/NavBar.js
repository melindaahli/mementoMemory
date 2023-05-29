function NavBar(props) {

  function whenNavBarBTNclicked(destination) {
    if (props.NTiles === 0) {
      props.setShowAlert("visible");
      props.setAlertMessage("please choose your difficulty first!");
    } else {
      props.setCurrentTab(destination);
    }
  }
  
  function getBackgroundColor(destination) {
    if (destination === props.currentTab) {
      return "white"
    } else {
      return "var(--light-green)"
    }
  }

  return (
    <div className="NavBar flex-container" >
      <button
        className="NavBarBTN"
        style={{ backgroundColor: getBackgroundColor("Start") }}
        onClick={() => whenNavBarBTNclicked("Start")}
      >
        start
      </button>
      <button
        className="NavBarBTN"
        style={{ backgroundColor: getBackgroundColor("MemoryGame") }}
        onClick={() => whenNavBarBTNclicked("MemoryGame")}
      >
        game
      </button>
      <button
        className="NavBarBTN"
        style={{ backgroundColor: getBackgroundColor("Shop") }}
        onClick={() => whenNavBarBTNclicked("Shop")}
      >
        shop
      </button>
      <button
        className="NavBarBTN"
        style={{ backgroundColor: getBackgroundColor("Deco") }}
        onClick={() => whenNavBarBTNclicked("Deco")}
      >
        deco
      </button>
      <button
        className="NavBarBTN"
        style={{ backgroundColor: getBackgroundColor("CollectBook") }}
        onClick={() => whenNavBarBTNclicked("CollectBook")}
      >
        book
      </button>
    </div>
  );
}

export default NavBar;

function NavBar(props) {
  function whenNavBarBTNclicked(destination) {
    if (props.NTiles === 0) {
    props.setShowAlert("visible");
    props.setAlertMessage("please choose your difficulty first!");
    } else {
      props.setCurrentTab(destination);
    }
  }

  return (
    <div className="NavBar flex-container">
      <button
        className="NavBarBTN"
        onClick={() => whenNavBarBTNclicked("Start")}
      >
        start
      </button>
      <button
        className="NavBarBTN"
        onClick={() => whenNavBarBTNclicked("MemoryGame")}
      >
        game
      </button>
      <button
        className="NavBarBTN"
        onClick={() => whenNavBarBTNclicked("Shop")}
      >
        shop
      </button>
      <button
        className="NavBarBTN"
        onClick={() => whenNavBarBTNclicked("Deco")}
      >
        deco
      </button>
    </div>
  );
}

export default NavBar;

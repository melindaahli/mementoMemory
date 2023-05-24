function NavBar(props) {
  return (
    <div className="NavBar flex-container">
      <button
        className="NavBarBTN"
        onClick={() => props.setCurrentTab("Start")}
      >
        start
      </button>
      <button
        className="NavBarBTN"
        onClick={() => props.setCurrentTab("MemoryGame")}
      >
        game
      </button>
      <button className="NavBarBTN" onClick={() => props.setCurrentTab("Shop")}>
        shop
      </button>
      <button className="NavBarBTN" onClick={() => props.setCurrentTab("Info")}>
        info
      </button>
    </div>
  );
}

export default NavBar;

function Start(props) {
  return (
    <div className="Start">
      <p className="title">Memento</p>
      <p className="instructions">match all the cards to win!</p>
      <button
        class="startBTN"
        onClick={() => props.setCurrentTab("MemoryGame")}
      >
        start game!
      </button>
    </div>
  );
}

export default Start;

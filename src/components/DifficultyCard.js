function DifficultyCard(props) {
  return (<button
        class="startBTN"
        onClick={() => {props.setCurrentTab("MemoryGame");
                        props.setNTiles(props.NTiles);}}
        >
          {props.NTiles}!
      </button>)
}

export default DifficultyCard;

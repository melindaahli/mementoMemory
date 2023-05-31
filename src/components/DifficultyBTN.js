import tileDataJSON from "../tileData.json";

function DifficultyBTN(props) {
  function changeTileMarginInCSS(NTiles) {
    if (NTiles <= 20) {
      root.style.setProperty("--tile-margin", "15px 18px 15px 18px");
    } else {
      root.style.setProperty("--tile-margin", "15px 5px 15px 5px");
    }
  }

  return (
    <button
      class="startBTN"
      onClick={() => {
        props.setCurrentTab("MemoryGame");
        props.setNTiles(props.NTiles);
        changeTileMarginInCSS(props.NTiles);
        props.setTileData(
        props.getSetOfnTiles(props.NTiles, tileDataJSON)
        );
      }}
    >
      {props.NTiles}
    </button>
  );
}

export default DifficultyBTN;

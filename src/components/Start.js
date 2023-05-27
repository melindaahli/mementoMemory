import DifficultyCard from "./DifficultyCard";

function Start(props) {
  let tileSetSizes = [16, 20, 24, 28];

  return (
    <div className="Start">
      <p className="title">Memento</p>
      <p className="text instructions">match cards to win!</p>
      <br /><br /><br />
      <p className="text">choose the number of cards:</p>
      <div className="flex-container flex-center">
        {tileSetSizes.map((tileSetSize) => {
          return (
            <DifficultyCard
              NTiles={tileSetSize}
              setNTiles={props.setNTiles}
              setCurrentTab={props.setCurrentTab}
              setTileData={props.setTileData}
              shuffle={props.shuffle}
              getSetOfnTiles={props.getSetOfnTiles}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Start;

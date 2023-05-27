import DifficultyCard from "./DifficultyCard";

function Start(props) {
  let tileSetSizes = [16, 20, 24, 28];
  
  return (
    <div className="Start">
      <p className="title">Memento</p>
      <p className="instructions">match all the cards to win!</p>
      <p className="instructions">choose the number of cards:</p>
      <div className="flex-container flex-center">
        {tileSetSizes.map((tileSetSize) => {
          return <DifficultyCard NTiles={tileSetSize} setNTiles={props.setNTiles} setCurrentTab={props.setCurrentTab} />
        })}
      </div>
    </div>
  );
}

export default Start;

import DifficultyCard from "./components/DifficultyCard.js";

function Start(props) {
  return (
    <div className="Start">
      <p className="title">Memento</p>
      <p className="instructions">choose the number of cards:</p>
      <div className="flex-container flex-center">
       <DifficultyCard NTiles=16 />
       <DifficultyCard NTiles=20 />
       <DifficultyCard NTiles=24 />
       <DifficultyCard NTiles=28 />
      </div>
    </div>
  );
}

export default Start;

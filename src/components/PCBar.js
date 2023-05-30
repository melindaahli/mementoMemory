import PC from "./PC.js";

function PCBar(props) {
  return (
    <div className="PCBar flex-container">
      {props.matchedPC?.map(({image, tileNumber}) => {
        return (
          <PC
            imgURL={image}
            key={tileNumber}
            setInfoCard={props.setInfoCard}
            currentTab={props.currentTab}
          />
        );
      })}
    </div>
  );
}

export default PCBar;

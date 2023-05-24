import PC from "./PC.js";

function PCBar(props) {
  return (
    <div className="PCBar flex-container">
      {props.matchedPC?.map((imgURL, key) => {
        return (
          <PC
            imgURL={imgURL}
            key={key}
            setInfoCard={props.setInfoCard}
            currentTab={props.currentTab}
          />
        );
      })}
    </div>
  );
}

export default PCBar;

import PCBar from "./PCBar";
import PurchasedBar from "./PurchasedBar";

function Deco(props) {
  return (
    <div className="Deco flex-container flex-start">
      <PCBar
        matchedPC={props.matchedPC}
        setMatchedPC={props.setMatchedPC}
        setInfoCard={props.setInfoCard}
        nameToGroupData={props.nameToGroupData}
        currentTab={props.currentTab}
        setCurrentTab={props.setCurrentTab}
      />
      <div className="flex-container flex-center">
        <div id="cardInfo">
          {props.PCdeco ? (
            <img
              className={`PCdeco ${props.PCdecoType}`}
              src={props.PCdeco}
              alt="deco card"
            />
          ) : (
            <div className="currentPCdeco"></div>
          )}
          <img
            alt="card"
            className="enlargedPC"
            src={
              props.infoCardURL
                ? props.infoCardURL
                : "/PCimages/placeholder.jpg"
            }
          />
          <h2>{props.infoCardName}</h2>
          <h4>{props.infoCardGroupName}</h4>
        </div>
      </div>
      <PurchasedBar
        purchasedItems={props.purchasedItems}
        setDecoOnInfoCard={props.setDecoOnInfoCard}
        setCurrentTab={props.setCurrentTab}
      />
    </div>
  );
}

export default Deco;

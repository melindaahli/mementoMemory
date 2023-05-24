import PCBar from "./PCBar";
import PurchasedBar from "./PurchasedBar";

function Info(props) {
  function getNameFromImgURL(url) {
    return url.substring(10, url.indexOf("."));
  } // 10 is the length of "/PCimages/"

  function getGroupFromName(name) {
    return props.nameToGroupData[name];
  }

  function setInfoCard(url) {
    let name = getNameFromImgURL(url);
    let group = getGroupFromName(name);
    props.setInfoCardURL(url);
    props.setInfoCardName(name);
    props.setInfoCardGroupName(group);
  }

  return (
    <div className="Info flex-container flex-start">
      <PCBar
        matchedPC={props.matchedPC}
        setMatchedPC={props.setMatchedPC}
        setInfoCard={setInfoCard}
        nameToGroupData={props.nameToGroupData}
        currentTab={props.currentTab}
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
      />
    </div>
  );
}

export default Info;

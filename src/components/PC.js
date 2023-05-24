function PC(props) {
  let isCurrentTabInfo = false;

  if (props.currentTab === "Info") {
    isCurrentTabInfo = true;
  }
  console.log("is tab info", isCurrentTabInfo);
  function onClick() {
    if (isCurrentTabInfo) {
      console.log("clicked!");
      props.setInfoCard(props.imgURL);
    }
  }

  console.log(props.imgURL);
  return (
    <div>
      <img
        alt="photocard"
        className="PC"
        src={props.imgURL}
        onClick={onClick}
      />
    </div>
  );
}

export default PC;

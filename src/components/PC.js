function PC(props) {
  function onClick() {
    if (props.currentTab === "Deco" || props.currentTab === "CollectBook") {
      props.setInfoCard(props.imgURL);
    }
  }

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

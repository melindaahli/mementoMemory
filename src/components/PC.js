function PC(props) {
  function onClick() {
    if (props.currentTab === "Deco") {
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

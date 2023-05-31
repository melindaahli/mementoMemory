function PC(props) {
  function onClick() {
    if (isCurrentTabDesired("Deco") || isCurrentTabDesired("CollectBook")) {
      props.setInfoCard(props.imgURL);
      props.setCurrentTab("Deco");
    }
  }

  function isCurrentTabDesired(desiredTab) {
    if (props.currentTab === desiredTab) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <img
        alt="photocard"
        className={
          "PC " +
          (isCurrentTabDesired("Deco") || isCurrentTabDesired("CollectBook")
            ? "pointer-on-hover "
            : "")
        }
        src={props.imgURL}
        onClick={onClick}
      />
    </div>
  );
}

export default PC;

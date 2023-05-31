function PurchasedBar(props) {
  return (
    <div className="purchasedItemsBar" style={{ backgroundColor: "#faf0f1" }}>
      {props.purchasedItems.map(({ url, type }) => (
        <img
          className={"pointer-on-hover " + type}
          key={url}
          src={url}
          alt="item"
          onClick={() => {
            props.setDecoOnInfoCard(url, type);
            props.setCurrentTab("Deco");
          }}
        />
      ))}
    </div>
  );
}

export default PurchasedBar;

function ShopItem(props) {
  return (
    <div className={"ShopItem " + (props.isPurchased ? "green-border " : "")}>
      <img alt="item" src={props.imgURL} />
      <div class="priceTag">
        <p>{props.price}</p>
        <img
          className="star-icon"
          src="https://i.pinimg.com/originals/93/a6/95/93a69514bf3b0af82c35b4a8c48395f4.png"
          alt="star"
        />
      </div>

      <button
        className="shopBTN"
        disabled={props.isPurchased}
        onClick={() => alert(props.buyItem(props.imgURL, props.price))}
      >
        buy
      </button>
      <button
        className="shopBTN"
        disabled={!props.isPurchased}
        onClick={() => {
          props.setDecoOnInfoCard(
            props.imgURL,
            props.getItemTypeFromURL(props.imgURL)
          );
          console.log(props.PCdecoType, "shop Item");
          props.setCurrentTab("Info");
        }}
      >
        apply
      </button>
    </div>
  );
}

export default ShopItem;

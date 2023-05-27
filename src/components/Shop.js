import ShopItem from "./ShopItem.js";
import PurchasedBar from "./PurchasedBar.js";

function Shop(props) {
  function buyItem(url, price) {
    if (props.numStars >= price) {
      props.setNumStars(props.numStars - price);
      //updating purchasedItems array
      let newPurchasedItems = props.purchasedItems;
      newPurchasedItems.unshift({ url: url, type: getItemTypeFromURL(url) });
      props.setPurchasedItems(newPurchasedItems);
      console.log(newPurchasedItems);
      //updating shopItemsState array
      let newShopItemsState = [];
      let selectedItemIndex = props.shopItemsState.findIndex(
        (item) => item.url === url
      );
      props.shopItemsState.forEach((item, index) => {
        if (index === selectedItemIndex) {
          newShopItemsState.push({
            ...item,
            isPurchased: true,
          });
        } else {
          newShopItemsState.push(item);
        }
      });
      props.setShopItemsState(newShopItemsState);
      props.setShowAlert("visible");
      props.setAlertMessage("purchased!");
    } else {
      props.setShowAlert("visible");
      props.setAlertMessage("you need to earn more stars first!");
    }
  }

  function getItemTypeFromURL(url) {
    return url.substring(12, url.indexOf("-"));
    // 12 is the length of "/shopImages/"
  }

  return (
    <div className="Shop flex-container">
      <div className="shopItemsDiv flex-container">
        {props.shopItemsState.map(({ url, price, isPurchased }) => (
          <ShopItem
            imgURL={url}
            price={price}
            isPurchased={isPurchased}
            purchasedItems={props.purchasedItems}
            setPurchasedItems={props.setPurchasedItems}
            buyItem={buyItem}
            setDecoOnInfoCard={props.setDecoOnInfoCard}
            PCdecoType={props.PCdecoType}
            setCurrentTab={props.setCurrentTab}
            getItemTypeFromURL={getItemTypeFromURL}
          />
        ))}
      </div>
      <PurchasedBar
        purchasedItems={props.purchasedItems}
        setPCdeco={props.setPCdeco}
        setPCdecoType={props.setPCdecoType}
      />
    </div>
  );
}

export default Shop;

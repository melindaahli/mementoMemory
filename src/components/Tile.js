function Tile(props) {
  return (
    <div>
      <button
        /* disabled={props.isFlipped} */
        className="Tile"
        onClick={() => {
          if (props.isFlipped === false) {
            props.selectTile(props.number);
          }
        }}
      >
        <div className="tileContent">
          <img
            className="tile"
            alt={props.number}
            src={
              props.isFlipped
                ? props.image
                : "https://i.pinimg.com/564x/27/3f/51/273f519fceda6075e761aa49ea09e1cf.jpg"
            }
          />
        </div>
      </button>
    </div>
  );
}

export default Tile;

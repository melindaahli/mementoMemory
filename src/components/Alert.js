function Alert(props) {
  return (
    <div className="Alert" style={{ visibility: `${props.showAlert}` }}>
      <div className="alertMessage">
        <p>{props.alertMessage}</p>
      </div>
      <div className="closeAlert" onClick={() => props.setShowAlert("hidden")}>
        <p>okay!</p>
      </div>
    </div>
  );
}

export default Alert;

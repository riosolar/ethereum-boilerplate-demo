import { useState, useEffect } from "react";
import { useTokenPrice } from "react-moralis";


const styles = {
  token: {
    padding: "0 7px",
    height: "42px",
    gap: "5px",
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
    color: "white",
  },
};
function TokenPrice(props) {
  
  /*const [usdRate, setUsdRate] = useState();
  const GetUSDExchangeRate = async () => {
    var requestOptions = { method: "GET", redirect: "follow" };
    return fetch("https://api.coinbase.com/v2/exchange-rates?currency=BNB", requestOptions)
      .then((response) => response.json())
      .then((result) => {setUsdRate(result.data.rates.USD)})
      .catch((error) => {return("error", error)});
  }  
  
  useEffect(() => {
    GetUSDExchangeRate();
  },[] )*/
  const { data: formattedData } = useTokenPrice(props);

  const [isUSDMode, setIsUSDMode] = useState(true);

  const toggleDisplayStyle = () => setIsUSDMode(!isUSDMode);

  const noLogoToken = "https://etherscan.io/images/main/empty-token.png";

  return (
    <div style={styles.token}>
      <img src={props.image || noLogoToken} alt="logo" style={{ height: props?.size || "35px" }} />
      <span title={`Show in ${isUSDMode ? "ETH" : "USD"}`}>
        1 EVT = $ {formattedData && (isUSDMode ? formattedData.usdPrice.toFixed(10) : formattedData.formattedNative)}
      </span>
    </div>
  );
}
export default TokenPrice;

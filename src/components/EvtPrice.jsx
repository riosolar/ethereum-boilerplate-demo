import React, { useState, useEffect }  from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const EvtPrice = () => {

    const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, Moralis, isInitialized } = useMoralis();

    const Web3Api = useMoralisWeb3Api();
    const [usdPrice, setUsdPrice] = useState();
    const fetchTokenPrice = async () => {
      
      //Get token price on PancakeSwap v2 BSC
      const options = {
        address: "0x6BAFAea58B24266D6C5BDA39698155D47b2305e9",
        chain: "bsc",
        exchange: "PancakeSwapv2",
      };
      const price = await Web3Api.token.getTokenPrice(options);
      setUsdPrice(price.usdPrice.toFixed(10));
    };
    /*const [usdRate, setUsdRate] = useState();
    const GetUSDExchangeRate = async () => {
      var requestOptions = { method: "GET", redirect: "follow" };
      return fetch("https://api.coinbase.com/v2/exchange-rates?currency=BNB", requestOptions)
        .then((response) => response.json())
        .then((result) => {setUsdRate(result.data.rates.USD)})
        .catch((error) => {return("error", error)});
    }  */
    
    useEffect(() => {
      if (isInitialized) {
        fetchTokenPrice();
      }
    },[isInitialized] )
    
    return (
        <div>
            <h3>{usdPrice}</h3>
        </div>
    );
};

export default EvtPrice;
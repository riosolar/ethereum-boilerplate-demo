import { Card, Timeline, Typography, Image } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Button, InputNumber, Space, Radio } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import Elon from './elon.png';
import Tesla from './tesla.png';
import Twitter from './tw.png';
import ABI from './contractInfo.json';

const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

export default function QuickStart() {
  const { Moralis } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const { account } = useMoralis();

  const [userAccount, setAccount] = useState('');
  const [tokenBalance, setBalance] = useState(0);

  const [stakeStatus, setStakeStauts] = useState('stake');
  const [tokenssToStake, setTokensToStake] = useState('99');

  const sendOptions = {
    contractAddress: "0x273b95e2174b2B7cDAD88dfd126bDB7C2Ca9A802",
    functionName: "deposit",
    abi: ABI,
    params: {
      amount: Number(tokenssToStake),
    },
  };
  const stakeTokens = async () => {
    const transaction = await Moralis.executeFunction(sendOptions);
    console.log(transaction.hash);
    // --> "0x39af55979f5b690fdce14eb23f91dfb0357cb1a27f387656e197636e597b5b7c"

  }

  const fetchTokenBalances = async () => {
    const result = await Moralis.Web3API.account.getTokenBalances({
      chain: 'bsc testnet', // example chain
      address: userAccount,
      token_addresses: ['0xc50b0f357eAA1d064645CE8f8424DA97B497D7f3'] // contract address,
    });
    setBalance(Moralis.Units.FromWei(result[0].balance, 18));
    console.log(Moralis.Units.FromWei(result[0].balance, 18));
  };

  useEffect(() => {
    setAccount(account ?? '')

    setTimeout(() => {
      fetchTokenBalances();
    }, 1000);
  }, []);


  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setStakeStauts(e.target.value);
  }

  return (
    <div style={{ display: "flex", justifyContent: 'center', columnGap: '20px', marginLeft: '15px', marginRight: '15px', paddingBottom:'50px' }}>
      <div style={{ maxWidth: '100%' }}>
        <Card
          bordered={true}
          title={
            <>
              <div style={{ display: "flex", justifyContent: "center", columnGap: "10px", alignItems: 'center' }}>
                <Image
                  preview={false}
                  width={70}
                  src={Elon}
                />
                <h1 style={{ fontSize: "35px", color: "white" }}>Elon Vs Twitter</h1>
              </div>
            </>
          }
        >
          <div style={{ display: 'grid', textAlign: 'center' }}>
            <h2 style={{ color: "#338ABE", fontWeight: 'bold' }}>STAKING AND REWARDS</h2>
            <h4 style={{ color: "white", fontWeight: '500' }}>To participate in the EVT Reward Stake Pool, holders must take a minimun of 500,000,000 (500 million) EVT tokens. EVT holders earn 1% APY per day</h4>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "15px", marginTop: "15px", columnGap: '30px' }}>
              <div style={{ width: '100%', border: "1px solid #F19200", borderRadius: '5px', backgroundColor: '#121212', display: 'grid', justifyItems: 'center', padding: '10px' }}>
                <Image
                  preview={false}
                  width={100}
                  src={Elon}
                />
                <h4 style={{ color: "white" }}>1% Daily EVT Rewards</h4>
                <h3 style={{ color: "white" }}>STAKE NOW</h3>

              </div>
              <div style={{ width: '100%', border: "1px solid #F19200", borderRadius: '5px', backgroundColor: '#121212', display: 'grid', justifyItems: 'center', padding: '10px' }}>
                <Image
                  preview={false}
                  width={100}
                  src={Tesla}
                />
                <h4 style={{ color: "white" }}>$TSLA Shares</h4>

              </div>
              <div style={{ width: '100%', border: "1px solid #F19200", borderRadius: '5px', backgroundColor: '#121212', display: 'grid', justifyItems: 'center', padding: '10px' }}>
                <Image

                  preview={false}
                  width={100}
                  src={Twitter}
                />
                <h4 style={{ color: "white" }}>$TWTR Shares</h4>

              </div>



            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ color: '#F49100' }} >Token Balance</Text>
                <Text style={{ color: '#F49100' }}>{tokenBalance} EVT</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                <InputNumber
                  style={{ width: '100%' }}
                  size="large"
                  min={1}
                  value={tokenssToStake}
                  onChange={setTokensToStake} />
                <Button
                  style={{
                    backgroundColor: '#F49100',
                    color: '#181818',
                    border: '0px'
                  }}
                  size="large"
                  type="primary"
                  onClick={() => {
                    setTokensToStake(tokenBalance);
                  }}
                >
                  MAX
                </Button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                <Text style={{ color: '#F49100' }}>APY</Text>
                <div style={{ display: 'grid', textAlign: 'right' }}>
                  <Text style={{ color: '#F49100' }}>365%</Text>
                  <Text style={{ color: '#F49100' }}>{tokenssToStake * 365 / 100} EVT</Text>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                <Button
                  style={{
                    width: '90%',
                    height: '45px',
                    borderRadius: '4px',
                    backgroundColor: '#F49100',
                    color: '#181818',
                    border: '0px'
                  }}
                  icon={<DownloadOutlined />}
                  size={"large"}
                  onClick={() => { stakeTokens() }}
                >
                  Stake Now
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div style={{ display: 'grid', alignContent: 'baseline', rowGap: '15px', maxWidth: '400px', width: '100%' }}>
        <div >
          <Card>
            <div style={{ display: 'grid', textAlign: 'center' }}>
              <h2 style={{ color: "#338abe", fontWeight: 'bold' }}>STAKING AND REWARDS</h2>
              <h3 style={{ color: "white", fontWeight: '500' }}>
                What rewards can I earn if I hold EVT -? </h3>
            </div>
            <div style={{ display: 'flex', columnGap:'10px', marginTop:'20px' }}>
              <div><h3 style={{color:'#2566A9', fontWeight:'bold'}}>DOGECOIN</h3></div>
              <div><h4 style={{color:'white'}}>2% reflections paid in Doge Coin on every Buy/Sell transaction</h4></div>
            </div>
            <div style={{ display: 'flex', columnGap:'10px', marginTop:'10px' }}>
              <div><h3 style={{color:'#2566A9', fontWeight:'bold'}}>EVT STAKING</h3></div>
              <div><h4 style={{color:'white'}}>1% APY per day staked</h4></div>
            </div>
            <div style={{ display: 'flex', columnGap:'10px', marginTop:'10px' }}>
              <div><h3 style={{color:'#2566A9', fontWeight:'bold'}}>TSLA/TWTR SHARES</h3></div>
              <div><h4 style={{color:'white'}}>2% of every buy/sell transaction is accumulated to purchase TSLA / TWTR shares for our holders</h4></div>
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "15px", marginTop: "15px", columnGap: '30px' }}>
                <div style={{ width: '100%', border: "1px solid #F19200", borderRadius: '5px', backgroundColor: '#121212', display: 'grid', justifyItems: 'center', padding: '10px' }}>

                  <h3 style={{ color: "white" }}>EVT STAKED</h3>
                  <h4 style={{ color: "#F49100" }}>{tokenBalance}</h4>

                </div>
                <div style={{ width: '100%', border: "1px solid #F19200", borderRadius: '5px', backgroundColor: '#121212', display: 'grid', justifyItems: 'center', padding: '10px' }}>

                  <h3 style={{ color: "white" }}>EVT EARNED</h3>
                  <h4 style={{ color: "#F49100" }}>{tokenBalance}</h4>
                </div>

              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>

              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                <InputNumber
                  style={{ width: '100%' }}
                  size="large"
                  min={1}
                  value={tokenBalance}
                  onChange={setTokensToStake} />
                <Button
                  style={{
                    backgroundColor: '#F49100',
                    color: '#181818',
                    border: '0px'
                  }}
                  size="large"
                  type="primary"
                  onClick={() => {
                    setTokensToStake(tokenBalance);
                  }}
                >
                  MAX
                </Button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                <Button
                  style={{
                    width: '90%',
                    height: '45px',
                    borderRadius: '4px',
                    backgroundColor: '#F49100',
                    border: '0px',
                    color: '#181818'
                  }} icon={<UploadOutlined />} size={"large"}>
                  Unstake
                </Button>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

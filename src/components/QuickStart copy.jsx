import { Card, Timeline, Typography, Image } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Button, InputNumber, Space, Radio } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

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

  const fetchTokenBalances = async () => {
    const result = await Moralis.Web3API.account.getTokenBalances({
      chain: 'bsc testnet', // example chain
      address: userAccount,
      token_addresses: ['0xFA14BcbaC88DaB69fbD179aCAdfcD7DD8D0De019'] // contract address,
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

  const [stakeStatus, setStakeStauts] = useState('stake');
  const [tokenssToStake, setTokensToStake] = useState('99');

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setStakeStauts(e.target.value);
  }

  return (
    <div style={{ display: "flex", justifyContent: 'center', columnGap: '15px'}}>
      <div>
        <Card
          bordered={true}
          title={
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Radio.Group onChange={onChange} defaultValue="stake" buttonStyle="solid">
                  <Radio.Button size='large' value="stake">Stake</Radio.Button>
                  <Radio.Button size='large' value="unstake">Unstake</Radio.Button>
                </Radio.Group>
              </div>
            </>
          }
        >
          <div style={{ display: 'grid' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "15px" }}>
              <Image
                preview={false}
                width={150}
                src="https://propublica.s3.us-east-1.amazonaws.com/projects/wealth/sillos/black_white/elon_musk_sillo_bw.png"
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text >Token Balance</Text>
                <Text>{tokenBalance} TKN</Text>
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
                    color: 'white'
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
                <Text>APY</Text>
                <div style={{ display: 'grid', textAlign: 'right' }}>
                  <Text>365%</Text>
                  <Text>{tokenssToStake * 365 / 100} TKN</Text>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                <Button
                  style={{
                    width: '90%',
                    height: '45px',
                    borderRadius: '4px',
                    backgroundColor: '#F49100',
                    border: '0px',
                    color: 'white'
                  }} icon={<DownloadOutlined />} size={"large"}>
                  Stake Now
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div style={{ display: 'grid', alignContent:'baseline', rowGap:'15px' }}>
      <div>
          <Card>
elon_musk_sillo_bw
          </Card>
        </div>
        <div>
          <Card>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text >Available</Text>
                <Text>{tokenBalance} TKN</Text>
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
                    color: 'white'
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
                    color: 'white'
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

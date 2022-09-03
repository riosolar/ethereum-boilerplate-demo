import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Layout, Tabs, Menu } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import QuickStart from "components/QuickStart";
import Contract from "components/Contract/Contract";
import Text from "antd/lib/typography/Text";
import Ramper from "components/Ramper";
import MenuItems from "./components/MenuItems";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Elon from './components/elon.png'


const { Header, Footer, Sider } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "100px",
    width:'100%', 
    placeContent: 'center',
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "rgb(41, 41, 41)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};


const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();
 
  useEffect(() => {

    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);


  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const items = [
    getItem('EVT Staking', '1', <PieChartOutlined />),
    getItem('Website', '2', <DesktopOutlined />),
    getItem('TSLA + TWTR Rewards', '3', <FileOutlined />),
    getItem('BUY EVT', '4', <FileOutlined />),
    getItem('Chart', '5', <FileOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: '100%', overflow: "auto" }}>
      <Router>
        <Layout>
        <Header style={styles.header}>
          <Logo />
          <div style={styles.headerRight}>
            <Account />
          </div>
        </Header>
        </Layout>
        <Sider 
        style={{backgroundColor:'transparent', width:'250px'}} 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        >
        <div style={{marginTop:'80px'}}>
          <div style={{paddingBottom:'15px', borderBottom:'1px solid grey', marginBottom:'15px'}}>
          <TokenPrice
              address="0x6BAFAea58B24266D6C5BDA39698155D47b2305e9"
              chain="bsc"
              image={Elon}
              size="40px"
            />
          </div>
        
        <Menu style={{backgroundColor:'rgb(41, 41, 41)'}} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </div>
      </Sider>

        <div style={styles.content}>
          <Switch>
            <Route exact path="/stake">
              <QuickStart/>
            </Route>
            <Route path="/">
              <Redirect to="/stake" />
            </Route>
            <Route path="/stake">
              <Redirect to="/stake" />
            </Route>
          </Switch>
        </div>
      </Router>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    
  </div>
);

export default App;

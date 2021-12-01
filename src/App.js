import { Layout, Menu } from 'antd';
import { useState } from 'react';
import 'antd/dist/antd.css';
import { TeamOutlined, FireOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Customers from './components/Customers';
import Trainings from './components/Trainings';


function App() {
 const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const { Sider, Content } = Layout;

  return (
    <div>
      <Router>
      <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
            <Menu.Item key="1" icon={<TeamOutlined />} title={null}>
              <Link to="/customers">
              Customers
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FireOutlined />} title={null}>
              <Link to="/activities">
              Training Activities
              </Link>
            </Menu.Item>
            </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{marginTop: 10, marginLeft: 15}}>
        <Routes>          
            <Route exact path="/" element={<Customers />} />
            <Route exact path="/customers" element={<Customers />} />
            <Route exact path="/activities" element={<Trainings />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
    </Router>
    </div>
  );
};

export default App;

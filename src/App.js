import { Layout, Menu } from 'antd';
import { useState } from 'react';
import 'antd/dist/antd.css';
import { TeamOutlined, FireOutlined, ScheduleOutlined, LineChartOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Customers from './components/Customers';
import Trainings from './components/Trainings';
import ActivitySchedule from './components/ActivitySchedule';
import Statistics from './components/Statistics';


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
            <Menu.Item key="3" icon={<ScheduleOutlined />} title={null}>
              <Link to="/schedule">
              Schedule
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<LineChartOutlined />} title={null}>
              <Link to="/statistics">
                Statistics
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
            <Route exact path="/schedule" element={<ActivitySchedule />} />
            <Route exact path="/statistics" element={<Statistics />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
    </Router>
    </div>
  );
};

export default App;

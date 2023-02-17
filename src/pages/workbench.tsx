import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

import "./index.css";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;

const WorkbenchPage: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const clickMenu = ({ item, key, keyPath, domEvent }: any) => {
    navigate(key);
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          onClick={clickMenu}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/takephoto"]}
          items={[
            {
              key: "/takephoto",
              icon: <UserOutlined />,
              label: "摄像头拍照",
            },
            {
              key: "/webrtc",
              icon: <VideoCameraOutlined />,
              label: "视频会议",
            },
            {
              key: "/bgreplace",
              icon: <UploadOutlined />,
              label: "视频背景替换",
            },
          ]}
        />
      </Sider>
      <Layout
        className="site-layout"
        id="components-layout-demo-custom-trigger"
      >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>Demo WebRTC React</Footer>
      </Layout>
    </Layout>
  );
};

export default WorkbenchPage;

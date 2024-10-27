import { Col, Layout, Row } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import "./App.css";
import Menu from "./layout/Menu";
import AppRouter from "./router/Router";
import { BrowserRouter, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import store from "./redux/store";
import { Provider } from "react-redux";

const LayoutWrapper = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === "/login";

  return (
    <Layout>
      {!isAuthPage && (
        <Sider
          collapsible
          onCollapse={(value) => setCollapsed(value)}
          collapsed={collapsed}
          trigger={null}
          className="sider"
        >
          <Menu />
        </Sider>
      )}
      <Layout>
        {!isAuthPage && <Header />}
        <Content className={isAuthPage ? "auth-content" : "content"}>
          <AppRouter />
        </Content>
        {!isAuthPage && (
          <Footer className="footer">
            <Row>
              <Col>© 2024, Vipblackbets</Col>
            </Row>
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LayoutWrapper />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

import React, { Component } from 'react';
import { message, Layout, Menu, Breadcrumb, Icon, Button, Switch } from 'antd';
import './App.css';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {

  constructor(){
    super()
    this.InvertFlag = this.InvertFlag.bind(this)
    this.state = {
        flag: false,
        message: "Off"
    }
  }

  HandlePrimaryClick = () => {
    console.log("Clicked.");
  }

  InvertFlag = () => {
    if (this.state.flag === true){
      this.setState({message: "Off"})
    }
    if (this.state.flag === false){
      this.setState({message: "On"})
    }
    this.setState({
      flag: !this.state.flag,
    });
  }

  ShowMessage = (messageStatus) => {
    if (messageStatus.status === false) {
      message.success(messageStatus.message)
    }
    if (messageStatus.status === true) {
      message.success(messageStatus.message)
    }
    if (messageStatus.status === 520) {
      message.warning(messageStatus.message)
    }
    if (messageStatus.status === 500) {
      message.error(messageStatus.message)
    }
  }

  render() {
    return (
      <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item onClick={this.InvertFlag} key="1">Configuration</Menu.Item>
              <Menu.Item key="2">Control Center</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >
                  <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                    <Menu.Item key="1">option1</Menu.Item>
                    <Menu.Item key="2">option2</Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Button onClick={this.asyncRequest} type="primary">{this.state.message}</Button>
                <Switch onChange={this.InvertFlag} />
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            TP Link Controller ©2018 Created by Bobby Luisi
          </Footer>
        </Layout>
    );
  }

  // Methods
  asyncRequest = () => {
    fetch('http://127.0.0.1:3001/TpLInk/api/power', {
    //fetch('http://127.0.0.1:3001/TpLInk/api/light', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: this.state.flag, // This is a test to retrieve POST
        message: this.state.message, // This is a test to retrieve POST
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.ShowMessage(responseJson)
      })
      .catch((err) => {
        var responseJson = {
          status: 502,
          err: err
        }
        this.ShowMessage(responseJson)
      })
  }

}

export default App;

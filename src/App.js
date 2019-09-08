import React, { Component } from 'react';
import Menu from 'antd/es/menu';
import AccessibleMenu from './components/accessiblemenu'
import "./App.css"

const {SubMenu} = Menu

class App extends Component {
  render() {
    return (
      <AccessibleMenu mode="horizontal">
        <SubMenu title="About">
          <Menu.Item>Overview</Menu.Item>
          <Menu.Item>Administration</Menu.Item>
          <SubMenu title="Facts">
            <Menu.Item>History</Menu.Item>
            <Menu.Item>Current Statistics</Menu.Item>
            <Menu.Item>Awards</Menu.Item>
          </SubMenu>
          <SubMenu title="Campus Tours">
            <Menu.Item>For prospective students</Menu.Item>
            <Menu.Item>For alumni</Menu.Item>
            <Menu.Item>For visitors</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu title="Admissions">
          <Menu.Item>Apply</Menu.Item>
          <SubMenu title="Tuition">
            <Menu.Item>Undergratuate</Menu.Item>
            <Menu.Item>Graduate</Menu.Item>
            <Menu.Item>Professional Schools</Menu.Item>
          </SubMenu>
          <Menu.Item>Sign Up</Menu.Item>
          <Menu.Divider/>
          <Menu.Item>Visit</Menu.Item>
          <Menu.Item>Photo Tour</Menu.Item>
          <Menu.Item>Connect</Menu.Item>
        </SubMenu>
        <SubMenu title="Academics">
          <Menu.Item>Colleges &amp; Schools</Menu.Item>
          <Menu.Item>Programs of Study</Menu.Item>
          <Menu.Item>Honors Programs</Menu.Item>
          <Menu.Item>Online Courses</Menu.Item>
          <Menu.Divider/>
          <Menu.Item>Course Explorer</Menu.Item>
          <Menu.Item>Register for Class</Menu.Item>
          <Menu.Item>Academic Calendar</Menu.Item>
          <Menu.Item>Transcripts</Menu.Item>
        </SubMenu>
      </AccessibleMenu>
    );
  }
}

export default App;

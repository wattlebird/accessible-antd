import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';

const MenuItem = styled(Menu.Item)`
  & [role=menuitem]:focus {
    background-color: #f5f5f5
  }
`

class App extends React.PureComponent {
  state = {
    isExpanded: false,
    isButtonHovering: false,
    isMenuHovering: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isButtonHovering !== prevState.isButtonHovering || this.state.isMenuHovering !== prevState.isMenuHovering) {
      setTimeout(this.onCloseMenu, 300)
    }
  }


  onPressButton = (e) => {
    let keycode = e.keyCode
    if (keycode === 32 || keycode === 13 || keycode === 40 || keycode === 38) {
      this.setState({
        isExpanded: true
      })  
      let menunode = document.getElementById("menu2")
      let itemnodes = menunode.querySelectorAll("[role=menuitem]")
      if (keycode === 38) {
        itemnodes[itemnodes.length - 1].focus()
      } else {
        itemnodes[0].focus()
      }
    }
  }

  menuItemKeyDownHandler = (e) => {
    let keycode = e.keyCode
    if (keycode === 38 || keycode === 40) {
      const menunode = document.getElementById("menu2")
      const itemnodes = menunode.querySelectorAll("[role=menuitem]")
      let i = Array.prototype.findIndex.call(itemnodes, itm => itm === e.target)
      if (i !== -1) {
        i = keycode === 40 ? (i + 1) % itemnodes.length : (i + itemnodes.length - 1) % itemnodes.length
        itemnodes[i].focus()
      }
    } else if (keycode === 27 || keycode === 13) {
      setTimeout(() => {
        const button = document.getElementById("menubutton")
        button.focus()
        this.setState({
          isExpanded: false
        })
      })
      if (keycode === 27) {
        e.stopPropagation()
        e.preventDefault()
      } else return
    }
  }

  onCloseMenu = () => {
    const {isButtonHovering, isMenuHovering} = this.state
    if (!isButtonHovering && !isMenuHovering) {
      this.setState({
        isExpanded: false
      })
    }
  }

  onMouseEnterMenu = () => {
    this.setState({
      isMenuHovering: true
    })
  }

  onMouseLeaveMenu = () => {
    this.setState({
      isMenuHovering: false
    })
  }

  onMouseEnterButton = () => {
    this.setState({
      isExpanded: true,
      isButtonHovering: true
    })
  }

  onMouseLeaveButton = () => {
    this.setState({
      isButtonHovering: false
    })
  }

  render() {
    const menu = (
      <Menu id="menu2" aria-labelledby="menubutton" onMouseEnter={this.onMouseEnterMenu} onMouseLeave={this.onMouseLeaveMenu}>
        <MenuItem role="none">
          <a role="menuitem" href="https://www.w3.org/" onKeyDown={this.menuItemKeyDownHandler}>W3C Home Page</a>
        </MenuItem>
        <MenuItem role="none">
          <a role="menuitem" href="https://www.w3.org/standards/webdesign/accessibility" onKeyDown={this.menuItemKeyDownHandler}>W3C Web Accessibility Initiative</a>
        </MenuItem>
        <MenuItem role="none">
          <a role="menuitem" href="https://www.w3.org/TR/wai-aria/" onKeyDown={this.menuItemKeyDownHandler}>
            Accessible Rich Internet Application Specification
          </a>
        </MenuItem>
        <MenuItem role="none">
          <a role="menuitem" href="https://www.w3.org/TR/wai-aria-practices/" onKeyDown={this.menuItemKeyDownHandler}>
            WAI-ARIA Authoring Practices
          </a>
        </MenuItem>
        <MenuItem role="none">
          <a role="menuitem" href="https://www.w3.org/TR/wai-aria-implementation/" onKeyDown={this.menuItemKeyDownHandler}>
            WAI-ARIA Implementation Guide
          </a>
        </MenuItem>
        <MenuItem role="none">
          <a role="menuitem" href="https://www.w3.org/TR/accname-aam-1.1/" onKeyDown={this.menuItemKeyDownHandler}>
            Accessible Name and Description
          </a>
        </MenuItem>
      </Menu>
    )
    return (
      <div>
        <Dropdown overlay={menu} visible={this.state.isExpanded}>
          <Button
            id="menubutton"
            aria-haspopup="true"
            aria-controls="menu2"
            aria-expanded={this.state.isExpanded ? "true" : "false"}
            onKeyDown={this.onPressButton}
            onMouseEnter={this.onMouseEnterButton}
            onMouseLeave={this.onMouseLeaveButton}
          >WAI-ARIA Quick Links</Button>
        </Dropdown>
      </div>
    )
  }
}

export default hot(App);

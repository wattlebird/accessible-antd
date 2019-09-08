import React from 'react';
import ReactDOM from 'react-dom'
import Menu from 'antd/es/menu';

const {SubMenu, Item} = Menu

const keyCode = Object.freeze({
  'TAB': 9,
  'RETURN': 13,
  'ESC': 27,
  'SPACE': 32,
  'PAGEUP': 33,
  'PAGEDOWN': 34,
  'END': 35,
  'HOME': 36,
  'LEFT': 37,
  'UP': 38,
  'RIGHT': 39,
  'DOWN': 40
})

class AccessibleSubMenu extends React.Component {
  constructor(props){
    super(props)
    this.submenu = React.createRef()
  }

  focus = () => {
    ReactDOM.findDOMNode(this.submenu).focus()
  }

  onKeyDown = (e) => {
    let handleFlag = false
    switch (e.keyCode) {
      case keyCode.RIGHT:
        this.props.focusOnNext()
        handleFlag = true
        break
      case keyCode.LEFT:
        this.props.focusOnPrev()
        handleFlag = true
        break
      default:
        break
    }
    if (handleFlag) {
      e.stopPropagation()
      e.preventDefault()
    }
  }


  render () {
    const props = {...this.props}
    delete props.ref
    return <SubMenu {...props} onKeyDown={this.onKeyDown} ref={this.submenu}/>
  }
}

class AccessibleItem extends React.Component {
  render () {
    return <Item {...this.props} />
  }
}

// Menu should manage sub items and provide interface to navigate to next/prev/first/last
class AccessibleMenu extends React.Component {
  constructor(props) {
    super(props)
    this.menu = React.createRef()
    this.state = {
      menuItemsType: [],
      cur: -1
    }
    this.menuItems = {}
  }

  componentDidMount() {
    const menuItemsType = this.menu.current.props.children.map(itm => itm.type.name)
    const idx = menuItemsType.findIndex(itm => itm !== "Divider")
    this.setState({
      menuItemsType: menuItemsType,
      cur: idx
    })
  }

  get firstItemIdx() {
    const {menuItemsType} = this.state
    const idx = menuItemsType.findIndex(itm => itm !== "Divider")
    return idx
  }

  get lastItemIdx() {
    const {menuItemsType} = this.state
    const copyMenuItemsType = [...menuItemsType]
    copyMenuItemsType.reverse()
    const idx = copyMenuItemsType.findIndex(itm => itm !== "Divider")
    return idx === -1 ? idx :  menuItemsType.length - idx - 1
  }

  focusOnNext = () => {
    this.setState(prev => {
      let cur = prev.menuItemsType.findIndex((itm, idx) => idx > prev.cur && itm !== "Divider")
      if (cur === -1) {
        cur = prev.menuItemsType.findIndex(itm => itm !== "Divider")
        if (cur === -1) return
      }
      ReactDOM.findDOMNode(this.menuItems[cur]).focus()

      return {cur}
    })
  }

  focusOnPrev = () => {
    this.setState(prev => {
      const temp = [...prev.menuItemsType]
      temp.reverse()
      let cur = temp.findIndex((itm, idx) => idx + prev.cur >= temp.length && itm !== "Divider")
      if (cur === -1) {
        cur = temp.findIndex(itm => itm !== "Divider")
        if (cur === -1) return
      }
      cur = temp.length - cur - 1
      ReactDOM.findDOMNode(this.menuItems[cur]).focus()

      return {cur}
    })
  }

  focusFirst = () => {
    const idx = this.firstItemIdx
    if (idx === -1) return
    ReactDOM.findDOMNode(this.menuItems[idx]).focus()
    this.setState({
      cur: idx
    })
  }

  focusLast = () => {
    const idx = this.lastItemIdx
    if (idx === -1) return
    ReactDOM.findDOMNode(this.menuItems[idx]).focus()
    this.setState({
      cur: idx
    })
  }

  setMenuItemRef = (key, itm) => {
    this.menuItems[key] = itm
  }

  render () {
    const children = this.props.children.map((itm, idx) => {
      if (itm.type.name === "SubMenu") return (
        <AccessibleSubMenu
          {...itm.props}
          tabIndex={idx === this.state.cur ? "0" : "-1"}
          focusOnNext={this.focusOnNext}
          focusOnPrev={this.focusOnPrev}
          focusFirst={this.focusFirst}
          focusLast={this.focusLast}
          ref={this.setMenuItemRef.bind(this, idx)}
        />
      )
      else if (itm.type.name === "Item") return (
        <AccessibleItem
          {...itm.props}
          tabIndex={idx === this.state.cur ? "0" : "-1"}
          focusOnNext={this.focusOnNext}
          focusOnPrev={this.focusOnPrev}
          focusFirst={this.focusFirst}
          focusLast={this.focusLast}
          ref={this.setMenuItemRef.bind(this, idx)}
        />
      )
      else return itm
    })
    return (
      <Menu {...this.props} ref={this.menu}>
        {children}
      </Menu>
    )
  }
}

export default AccessibleMenu

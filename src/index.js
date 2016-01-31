
'use strict'

var React = require('react')
var ReactDom = require('react-dom')

var Tabs = require('./tabs.js')
var renderFunction = require('./functions.js').renderFunction

module.exports = React.createClass({
  displayName: 'tabsNavigationMenu',
  propTypes: {
    banner: React.PropTypes.shape({ // Banner content (optional)
      children: React.PropTypes.oneOfType([ // Tab initialy selected
        React.PropTypes.func,
        React.PropTypes.node
      ])
    }),
    color: React.PropTypes.string,
    fixOffset: React.PropTypes.number,
    lineStyle: React.PropTypes.object,
    onTabChange: React.PropTypes.func,
    selected: React.PropTypes.oneOfType([ // Tab initialy selected
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    selectedTabStyle: React.PropTypes.object,
    tabs: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        children: React.PropTypes.oneOfType([ // Tab initialy selected
          React.PropTypes.func,
          React.PropTypes.node
        ]),
        displayName: React.PropTypes.string.isRequired
      })
    ),
    tabsBarClassName: React.PropTypes.string,
    tabsBarStyle: React.PropTypes.object,
    tabsClassName: React.PropTypes.string,
    tabsStyle: React.PropTypes.object
  },
  getDefaultProps: function () {
    return {
      fixOffset: 0,
      prev: 'Next',
      views: []
    }
  },
  getInitialState: function () {
    return {
      selectedTab: this.props.selected || 0,
      width: 300
    }
  },
  componentDidMount: function () {
    window.addEventListener('resize', this.calculateWidth)
    this.calculateWidth()
  },
  componentWillReceiveProps: function (nextProps) {
    if (typeof nexProps !== 'undefined') {
      if (nextProps.selected === this.props.selected) {
        this.handleTabChange(nextProps.selected)
      }
    }
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this.calculateWidth)
  },
  // Public method
  changeSelectedTab: function (i) {
    this.handleTabChange(i)
  },
  calculateWidth: function () {
    this.setState({
      width: ReactDom.findDOMNode(this.refs.tabsContainer).clientWidth
    })
  },
  handleTabChange: function (i) {
    let result

    if (this.props.onTabChange) {
      result = this.props.onTabChange(i)
    }

    if (result !== false) {
      this.setState({
        selectedTab: i
      })
    }
  },
  render: function () {
    return (
      <div role="application">
        <div>
          {renderFunction(this.props.banner &&
            this.props.banner.children)}
        </div>
        <div ref='tabsContainer'>
          <Tabs
            clic={this.handleTabChange}
            color={this.props.color}
            elements={this.props.tabs.map((item) => {
              return item.displayName
            })}
            fixOffset={this.props.fixOffset}
            handleTabChange={this.handleTabChange}
            lineStyle={this.state.lineStyle}
            selected={this.state.selectedTab}
            selectedTabStyle={this.props.selectedTabStyle}
            tabsBarClassName={this.props.tabsBarClassName}
            tabsBarStyle={this.props.tabsBarStyle}
            tabsClassName={this.props.tabsClassName}
            tabsStyle={this.props.tabsStyle}
            widthB={this.state.width}
          />
        </div>
        <div role="tabpanel">
          {renderFunction(this.props.tabs[this.state.selectedTab] &&
            this.props.tabs[this.state.selectedTab].children)}
        </div>
      </div>
    )
  }
})
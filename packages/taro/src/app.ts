import { Component, PropsWithChildren } from 'react'

import './app.scss'

console.warn = () => {};


class App extends Component<PropsWithChildren> {

  componentDidMount () {}
  
  /**
   * 页面显示/切入前台时触发
   * 在小程序环境中，当应用从后台进入前台显示，或者页面从隐藏状态切换到显示状态时调用
   */
  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}
export default App

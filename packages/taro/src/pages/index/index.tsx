import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { Card } from '@tarotpl/comp_taro'
import './index.scss'

export default class Index extends Component<PropsWithChildren> {

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }
  
  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <Card title='test'></Card>
      </View>
    )
  }
}

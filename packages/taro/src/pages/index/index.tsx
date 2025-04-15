import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { Card } from '@tarotpl/comp_taro'
import { AtTag } from "taro-ui";
import './index.scss'

export default class Index extends Component<PropsWithChildren> {

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }
  
  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <AtTag type='primary'>标签</AtTag>
        <Card title='test'></Card>
      </View>
    )
  }
}

import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { Card } from '@tarotpl/comp_taro'
import './index.scss'
import { userAPI } from '../../api';

export default function Index() {
  const [demo, setDemo] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userAPI.getDemo()
        if (result) {
          setDemo(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch demo:', error)
      }
    }

    fetchData()
  }, [])
  return (
    <View className='index'>
      {demo.map((item: any, index: number) => {
        return (
          <View key={index} className='demo-item'>
            <View className='demo-title'>{item.menuName}</View>
            <View className='demo-description'>{item.pageCode}</View>
          </View>
        )
      })}
      {/* <AtTag type='primary'>标签</AtTag> */}
      <Card title='test' description='description'></Card>
    </View>
  )
}
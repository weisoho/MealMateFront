import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'

export default function TabBar({ current }) {
  const tabs = [
    { id: 'index', title: '首页', icon: '🏠' },
    { id: 'order', title: '点单', icon: '🍵' },
    { id: 'my-orders', title: '订单', icon: '📋' },
    { id: 'profile', title: '我的', icon: '👤' }
  ]

  const switchTab = (url) => {
    // 使用switchTab而不是navigateTo来切换tabBar页面
    Taro.switchTab({
      url: `/pages/${url}/index`
    })
  }

  return (
    <View className='tab-bar'>
      {tabs.map(tab => (
        <View 
          key={tab.id}
          className={`tab-item ${current === tab.id ? 'active' : ''}`}
          onClick={() => switchTab(tab.id)}
        >
          <Text className='tab-icon'>{tab.icon}</Text>
          <Text className='tab-title'>{tab.title}</Text>
        </View>
      ))}
    </View>
  )
}
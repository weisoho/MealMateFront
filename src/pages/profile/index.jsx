import { View, Text, Image } from '@tarojs/components'
import TabBar from '../../components/TabBar'
import './index.css'

export default function Profile() {
  // 用户信息
  const userInfo = {
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
    nickname: '用户123456',
    level: '普通会员',
    points: 258
  }

  // 菜单项
  const menuItems = [
    { id: 1, icon: '🏆', title: '我的会员', desc: '查看会员特权' },
    { id: 2, icon: '🎁', title: '我的优惠券', desc: '2张可用' },
    { id: 3, icon: '📝', title: '我的评价', desc: '' },
    { id: 4, icon: '📍', title: '我的地址', desc: '' },
    { id: 5, icon: '⭐', title: '我的收藏', desc: '' },
    { id: 6, icon: '🔔', title: '消息通知', desc: '' },
    { id: 7, icon: '⚙️', title: '设置', desc: '' }
  ]

  return (
    <View className='profile-page'>
      {/* 用户信息卡片 */}
      <View className='user-card'>
        <Image className='user-avatar' src={userInfo.avatar} />
        <View className='user-info'>
          <Text className='user-name'>{userInfo.nickname}</Text>
          <View className='user-level'>
            <Text className='level-tag'>{userInfo.level}</Text>
          </View>
        </View>
        <View className='points-info'>
          <Text className='points-value'>{userInfo.points}</Text>
          <Text className='points-label'>积分</Text>
        </View>
      </View>

      {/* 我的订单入口 */}
      <View className='order-entry'>
        <View className='entry-header'>
          <Text className='entry-title'>我的订单</Text>
          <View className='view-all'>
            <Text className='view-all-text'>查看全部</Text>
            <Text className='arrow'>›</Text>
          </View>
        </View>
        <View className='order-types'>
          <View className='type-item'>
            <View className='type-icon'>🛒</View>
            <Text className='type-name'>待付款</Text>
          </View>
          <View className='type-item'>
            <View className='type-icon'>🍵</View>
            <Text className='type-name'>待取餐</Text>
          </View>
          <View className='type-item'>
            <View className='type-icon'>📋</View>
            <Text className='type-name'>待评价</Text>
          </View>
          <View className='type-item'>
            <View className='type-icon'>🔄</View>
            <Text className='type-name'>退款/售后</Text>
          </View>
        </View>
      </View>

      {/* 菜单列表 */}
      <View className='menu-list'>
        {menuItems.map(item => (
          <View className='menu-item' key={item.id}>
            <View className='item-left'>
              <Text className='item-icon'>{item.icon}</Text>
              <Text className='item-title'>{item.title}</Text>
            </View>
            <View className='item-right'>
              {item.desc && <Text className='item-desc'>{item.desc}</Text>}
              <Text className='item-arrow'>›</Text>
            </View>
          </View>
        ))}
      </View>

      {/* 客服入口 */}
      <View className='customer-service'>
        <Text className='service-text'>联系客服</Text>
      </View>
      
      {/* 底部空白区域，为TabBar留出空间 */}
      <View style={{ height: '60px' }}></View>
      
      {/* 添加TabBar组件 */}
      <TabBar current='profile' />
    </View>
  )
}
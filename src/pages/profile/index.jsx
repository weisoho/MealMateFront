import { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'  // 引入 useDidShow
import './index.css'

export default function Profile() {
  const [userInfo, setUserInfo] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 添加 useDidShow 钩子，每次页面显示时都会执行
  useDidShow(() => {
    // 检查登录状态
    const loggedIn = Taro.getStorageSync('isLoggedIn')
    console.log('页面显示，检查登录状态:', loggedIn);
    if (loggedIn) {
      setIsLoggedIn(true)
      const userInfoData = Taro.getStorageSync('userInfo')
      setUserInfo(userInfoData)
    } else {
      setIsLoggedIn(false)
      setUserInfo(null)
    }
  })

  // 保留原来的 useEffect
  useEffect(() => {
    console.log('Profile组件挂载');
  }, [])

  // 处理登录
  const handleLogin = () => {
    // 使用完整路径
    const url = '/pages/login/index';
    console.log('尝试导航到:', url);
    
    Taro.navigateTo({
      url: url,
      success: () => {
        console.log('导航成功');
      }
    })
  }

  // 处理退出登录
  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function (res) {
        if (res.confirm) {
          // 清除登录状态
          Taro.removeStorageSync('isLoggedIn')
          Taro.removeStorageSync('userInfo')
          setIsLoggedIn(false)
          setUserInfo(null)
        }
      }
    })
  }

  return (
    <View className='profile-page'>
      <View className='user-card'>
        <Image 
          className='user-avatar' 
          src={isLoggedIn ? userInfo.avatarUrl : 'https://img.yzcdn.cn/vant/cat.jpeg'} 
          mode='aspectFill' 
        />
        <View className='user-info'>
          {isLoggedIn ? (
            <>
              <Text className='user-name'>{userInfo.username}</Text>
              <View className='user-level'>
                <Text className='level-tag'>{userInfo.vipLevel}</Text>
              </View>
              <View className='points-info'>
                <Text className='points-value'>{userInfo.points}</Text>
                <Text className='points-label'>积分</Text>
              </View>
            </>
          ) : (
            // 修改这里，确保点击事件正确绑定
            <View 
              className='login-section' 
              onClick={handleLogin}
              style={{ cursor: 'pointer' }}
            >
              <Text className='login-text'>去登录</Text>
              <Text className='login-arrow'>›</Text>
            </View>
          )}
        </View>
      </View>
      
      {/* 订单入口 */}
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
            <Text className='type-icon'>🕒</Text>
            <Text className='type-name'>待付款</Text>
          </View>
          <View className='type-item'>
            <Text className='type-icon'>🍔</Text>
            <Text className='type-name'>待取餐</Text>
          </View>
          <View className='type-item'>
            <Text className='type-icon'>🥡</Text>
            <Text className='type-name'>已完成</Text>
          </View>
          <View className='type-item'>
            <Text className='type-icon'>💬</Text>
            <Text className='type-name'>待评价</Text>
          </View>
        </View>
      </View>
      
      {/* 菜单列表 */}
      <View className='menu-list'>
        <View className='menu-item'>
          <View className='item-left'>
            <Text className='item-icon'>🎁</Text>
            <Text className='item-title'>优惠券</Text>
          </View>
          <View className='item-right'>
            <Text className='item-desc'>3张可用</Text>
            <Text className='item-arrow'>›</Text>
          </View>
        </View>
        <View className='menu-item'>
          <View className='item-left'>
            <Text className='item-icon'>📍</Text>
            <Text className='item-title'>收货地址</Text>
          </View>
          <View className='item-right'>
            <Text className='item-arrow'>›</Text>
          </View>
        </View>
        <View className='menu-item'>
          <View className='item-left'>
            <Text className='item-icon'>⭐</Text>
            <Text className='item-title'>我的收藏</Text>
          </View>
          <View className='item-right'>
            <Text className='item-arrow'>›</Text>
          </View>
        </View>
        
        {isLoggedIn && (
          <View className='menu-item' onClick={handleLogout}>
            <View className='item-left'>
              <Text className='item-icon'>🚪</Text>
              <Text className='item-title'>退出登录</Text>
            </View>
            <View className='item-right'>
              <Text className='item-arrow'>›</Text>
            </View>
          </View>
        )}
      </View>
      
      {/* 客服入口 */}
      <View className='customer-service'>
        <Text className='service-text'>客服电话：400-123-4567</Text>
      </View>
    </View>
  )
}
import { useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import TabBar from '../../components/TabBar'
import './index.css'

export default function MyOrders() {
  // 模拟订单数据
  const mockOrders = [
    {
      id: 'ORD20230001',
      date: '2023-10-15 14:30',
      status: '已完成',
      totalPrice: 36,
      items: [
        { id: 1, name: '招牌奶茶', price: 12, count: 2 },
        { id: 2, name: '芝士奶盖', price: 15, count: 1 }
      ]
    },
    {
      id: 'ORD20230002',
      date: '2023-10-14 18:45',
      status: '已完成',
      totalPrice: 42,
      items: [
        { id: 3, name: '满杯红柚', price: 16, count: 1 },
        { id: 4, name: '珍珠奶茶', price: 13, count: 2 }
      ]
    },
    {
      id: 'ORD20230003',
      date: '2023-10-13 12:15',
      status: '已完成',
      totalPrice: 30,
      items: [
        { id: 5, name: '乌龙奶茶', price: 12, count: 1 },
        { id: 6, name: '薯条', price: 18, count: 1 }
      ]
    }
  ]

  const [orders] = useState(mockOrders)
  const [activeTab, setActiveTab] = useState('all')

  // 根据标签筛选订单
  const getFilteredOrders = () => {
    if (activeTab === 'all') return orders
    return orders.filter(order => {
      if (activeTab === 'pending' && order.status === '待完成') return true
      if (activeTab === 'completed' && order.status === '已完成') return true
      return false
    })
  }

  const filteredOrders = getFilteredOrders()

  return (
    <View className='orders-page'>
      {/* 订单标签栏 */}
      <View className='order-tabs'>
        <View 
          className={`tab-item ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          全部
        </View>
        <View 
          className={`tab-item ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          待完成
        </View>
        <View 
          className={`tab-item ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          已完成
        </View>
      </View>

      {/* 订单列表 */}
      <ScrollView className='order-list' scrollY>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <View className='order-item' key={order.id}>
              <View className='order-header'>
                <Text className='order-id'>订单号: {order.id}</Text>
                <Text className='order-status'>{order.status}</Text>
              </View>
              
              <View className='order-content'>
                {order.items.map(item => (
                  <View className='order-product' key={item.id}>
                    <Text className='product-name'>{item.name}</Text>
                    <Text className='product-count'>x{item.count}</Text>
                    <Text className='product-price'>¥{item.price}</Text>
                  </View>
                ))}
              </View>
              
              <View className='order-footer'>
                <Text className='order-date'>{order.date}</Text>
                <Text className='order-total'>合计: ¥{order.totalPrice}</Text>
              </View>
              
              <View className='order-actions'>
                <View className='action-btn'>再来一单</View>
                {order.status === '待完成' && (
                  <View className='action-btn primary'>查看详情</View>
                )}
              </View>
            </View>
          ))
        ) : (
          <View className='empty-orders'>
            <Text className='empty-text'>暂无订单</Text>
          </View>
        )}
      </ScrollView>
      <TabBar current='my-orders' />
    </View>
  )
}
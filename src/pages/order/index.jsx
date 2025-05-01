import { useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.css'

export default function Order() {
  // 模拟分类数据
  const categories = [
    { id: 1, name: '人气推荐' },
    { id: 2, name: '奶茶系列' },
    { id: 3, name: '果茶系列' },
    { id: 4, name: '咖啡系列' },
    { id: 5, name: '小吃零食' },
    { id: 6, name: '甜品系列' }
  ]

  // 模拟商品数据
  const products = [
    { id: 1, categoryId: 1, name: '招牌奶茶', price: 12, desc: '经典原味奶茶', imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    { id: 2, categoryId: 1, name: '芝士奶盖', price: 15, desc: '浓郁芝士奶盖', imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    { id: 3, categoryId: 2, name: '珍珠奶茶', price: 13, desc: '香浓奶茶搭配珍珠', imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    { id: 4, categoryId: 2, name: '乌龙奶茶', price: 12, desc: '乌龙茶搭配牛奶', imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    { id: 5, categoryId: 3, name: '满杯红柚', price: 16, desc: '清爽红柚果茶', imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    { id: 6, categoryId: 3, name: '柠檬绿茶', price: 14, desc: '新鲜柠檬切片', imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    { id: 7, categoryId: 4, name: '美式咖啡', price: 15, desc: '醇香美式咖啡', imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    { id: 8, categoryId: 5, name: '薯条', price: 18, desc: '香脆薯条', imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' }
  ]

  const [activeCategory, setActiveCategory] = useState(1)
  const [cart, setCart] = useState([])

  // 根据分类筛选商品
  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.categoryId === categoryId)
  }

  // 添加商品到购物车
  const addToCart = (product) => {
    const existItem = cart.find(item => item.id === product.id)
    if (existItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, count: item.count + 1 } 
          : item
      ))
    } else {
      setCart([...cart, { ...product, count: 1 }])
    }
  }

  // 从购物车移除商品
  const removeFromCart = (productId) => {
    const existItem = cart.find(item => item.id === productId)
    if (existItem.count === 1) {
      setCart(cart.filter(item => item.id !== productId))
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, count: item.count - 1 } 
          : item
      ))
    }
  }

  // 计算购物车总价
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0)
  }

  // 计算购物车商品总数
  const getTotalCount = () => {
    return cart.reduce((total, item) => total + item.count, 0)
  }

  // 添加点击事件处理函数，确保事件正确传播
  const handleAddToCart = (e, product) => {
    e.stopPropagation() // 阻止事件冒泡
    addToCart(product)
  }

  const handleRemoveFromCart = (e, productId) => {
    e.stopPropagation() // 阻止事件冒泡
    removeFromCart(productId)
  }

  return (
    <View className='order-page'>
      {/* 分类列表 */}
      <View className='category-list'>
        <ScrollView scrollY style={{ height: '100%' }}>
          {categories.map(category => (
            <View 
              key={category.id}
              className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 商品列表 */}
      <View className='product-list'>
        <ScrollView scrollY style={{ height: '100%' }}>
          {getProductsByCategory(activeCategory).map(product => (
            <View className='product-item' key={product.id}>
              <Image className='product-img' src={product.imgUrl} mode='aspectFill' />
              <View className='product-info'>
                <Text className='product-name'>{product.name}</Text>
                <Text className='product-desc'>{product.desc}</Text>
                <View className='product-bottom'>
                  <Text className='product-price'>¥{product.price}</Text>
                  <View className='product-action'>
                    {cart.find(item => item.id === product.id) && (
                      <>
                        <View 
                          className='action-btn' 
                          onClick={(e) => handleRemoveFromCart(e, product.id)}
                          style={{ width: '34px', height: '34px', fontSize: '22px' }} // 调整减号按钮大小
                        >-</View>
                        <Text className='count'>{cart.find(item => item.id === product.id)?.count || 0}</Text>
                      </>
                    )}
                    <View 
                      className='action-btn add' 
                      onClick={(e) => handleAddToCart(e, product)}
                      style={{ width: '34px', height: '34px', fontSize: '22px' }} // 调整加号按钮大小
                    >+</View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 购物车栏 - 只有当购物车有商品时才显示 */}
      {cart.length > 0 && (
        <View className='cart-bar'>
          <View className='cart-info'>
            <View className='cart-icon'>
              🛒
              <Text className='cart-count'>{getTotalCount()}</Text>
            </View>
            <Text className='total-price'>¥{getTotalPrice()}</Text>
          </View>
          <View 
            className='checkout-btn'
            
          >
            去结算
          </View>
        </View>
      )}
    </View>
  )
}
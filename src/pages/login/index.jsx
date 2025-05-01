import { useState } from 'react'
import { View, Text, Button, Image, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'

export default function Login() {
  const [phoneIsLoading, setPhoneIsLoading] = useState(false)
  const [quickIsLoading, setQuickIsLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const quickLoginUrl = process.env.TARO_APP_API + '/user/login/wechat'
  // 处理手机号输入
  const handlePhoneInput = (e) => {
    setPhone(e.detail.value)
  }

  // 处理验证码输入
  const handleCodeInput = (e) => {
    setVerifyCode(e.detail.value)
  }

  // 获取验证码
  const getVerifyCode = () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    // 发送获取验证码请求
    Taro.request({
      url: process.env.TARO_APP_API + '/user/send-verify-code',
      method: 'POST',
      data: {
        phone: phone
      },
      success: (res) => {
        if (res.data.code === 0) {
          Taro.showToast({
            title: '验证码已发送',
            icon: 'success'
          })
          setCodeSent(true)
          // 开始倒计时
          let time = 60
          setCountdown(time)
          const timer = setInterval(() => {
            time--
            setCountdown(time)
            if (time <= 0) {
              clearInterval(timer)
              setCodeSent(false)
            }
          }, 1000)
        } else {
          Taro.showToast({
            title: res.data.msg || '发送失败',
            icon: 'none'
          })
        }
      },
      fail: () => {
        Taro.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        })
      }
    })
  }

  // 处理验证码登录
  const handleLogin = async () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }

    if (!verifyCode) {
      Taro.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return
    }

    setPhoneIsLoading(true)

    // 发送验证码登录请求
    Taro.request({
      url: process.env.TARO_APP_API + '/user/login/sms',
      method: 'POST',
      data: {
        phone: phone,
        code: verifyCode
      },
      success: (res) => {
        if (res.data.code === 0) {
          // 存储登录状态
          Taro.setStorageSync('isLoggedIn', true)
          Taro.setStorageSync('userInfo', res.data.data)

          // 登录成功后跳转我的页面
          Taro.switchTab({
            url: '/pages/profile/index',
            success: () => {
              Taro.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        } else {
          Taro.showToast({
            title: res.data.msg || '验证码错误',
            icon: 'none'
          })
        }
      },
      fail: () => {
        Taro.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        })
      },
      complete: () => {
        setPhoneIsLoading(false)
      }
    })
  }

  // 处理一键登录
  const handleQuickLogin = async () => {
    setQuickIsLoading(true)
    const code = await Taro.login();
    const res = Taro.request({
      url: quickLoginUrl,
      method: 'GET',
      data: {
        code: code.code
      },
      success: function (res) {
        console.log(res)
        setQuickIsLoading(false)
        if (res.data.resultCode == '0') {
          // 先存储登录状态和用户信息
          Taro.setStorageSync('isLoggedIn', true)
          Taro.setStorageSync('userInfo', res.data.data.userInfo)
          
          // 确保数据已存储后再跳转         
            Taro.switchTab({
              url: '/pages/profile/index',
              success: () => {
                Taro.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
        } else {
          Taro.showToast({
            title: '登录失败',
            icon: 'error',
            duration: 2000
          })
        }
      }
      ,
      fail: function (res) {
        console.log(res.data)
        Taro.showToast({
          title: '服务请求失败请稍后重试',
          icon: 'none',
          duration: 2000
        })
        setQuickIsLoading(false)
      }
    })
  }

  return (
    <View className='login-page'>
      <View className='login-header'>
        <Image
          className='logo'
          src='https://img.yzcdn.cn/vant/cat.jpeg'
          mode='aspectFill'
        />
        <Text className='app-name'>MealMate</Text>
        <Text className='slogan'>美食相伴，快乐用餐</Text>
      </View>

      <View className='login-form'>
        <View className='input-group'>
          <View className='input-item'>
            <Text className='input-label'>手机号</Text>
            <View className='input-field'>
              <Text className='input-prefix'>+86</Text>
              <Input
                className='input-control'
                type='number'
                maxlength={11}
                placeholder='请输入手机号'
                value={phone}
                onInput={handlePhoneInput}
              />
            </View>
          </View>

          <View className='input-item'>
            <Text className='input-label'>验证码</Text>
            <View className='input-field'>
              <Input
                className='input-control'
                type='number'
                maxlength={6}
                placeholder='请输入验证码'
                value={verifyCode}
                onInput={handleCodeInput}
              />
              {codeSent ? (
                <Text className='get-code-btn disabled'>{countdown}秒后重发</Text>
              ) : (
                <Text className='get-code-btn' onClick={getVerifyCode}>获取验证码</Text>
              )}
            </View>
          </View>
        </View>

        <Button
          className='login-btn'
          onClick={handleLogin}
          loading={phoneIsLoading}
        >
          手机号安全登录
        </Button>

        <Button
          className='quick-login-btn'
          onClick={handleQuickLogin}
          loading={quickIsLoading}
        >
          一键登录
        </Button>

        <View className='other-login-options'>
          <Text className='option-text'>其他登录方式</Text>
          <View className='options-list'>
            <View className='option-item'>
              <View className='option-icon wechat'>微信</View>
              <Text className='option-name'>微信</Text>
            </View>
            <View className='option-item'>
              <View className='option-icon phone'>手机</View>
              <Text className='option-name'>手机号</Text>
            </View>
          </View>
        </View>

        <View className='agreement-info'>
          <Text className='agreement-text'>
            登录即表示您已同意《用户协议》和《隐私政策》
          </Text>
        </View>
      </View>
    </View>
  )
}
import request from "./utils/request.js"
let httpajax = require('./utils/request.js')
//app.js
App({
  onLaunch: function() {
    let that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: that.globalData.serverUrl + '/user/getSessionKey', //仅为示例，并非真实的接口地址
          data: {
            jsCode: res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            var sessionKey=JSON.parse(JSON.stringify(res.data)).sessionKey
            wx.setStorageSync('sessinoKey', sessionKey.split("&$&")[1])
            that.globalData.sessinoKey = sessionKey.split("&$&")[1]
          }
        })

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              let enobj = {
                encryptedData: res.encryptedData,
                iv: res.iv,
                signature: res.signature,
                rawData: res.rawData,
                sessionKey: wx.getStorageSync("sessionKey")
              }

              console.log(wx.getStorageSync("sessionKey"))
              
              wx.request({
                url: that.globalData.serverUrl + '/user/info', //仅为示例，并非真实的接口地址
                data: enobj,
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  hasUserInfo: true
                }
              })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    userInfo: null,
    serverUrl: "http://localhost:8015",
    sessinoKey: null
  }
})
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    hasUserInfo:false
  },
  ready() {
    let that=this
    let glb = getApp().globalData

    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail() {
        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              url: glb.serverUrl + '/user/getSessionKey', //仅为示例，并非真实的接口地址
              data: {
                jsCode: res.code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                wx.setStorage({
                  key: 'userKey',
                  data: JSON.stringify(res.data)
                })
              }
            })

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
              glb.userInfo = res.userInfo

              wx.setStorage({
                key: 'user',
                data: res.userInfo
              })

              let usermsg = wx.getStorageSync('userKey')
              let user = JSON.parse(usermsg)

              let enobj = {
                encryptedData: res.encryptedData,
                iv: res.iv,
                signature: res.signature,
                rawData: res.rawData,
                sessionKey: user.sessionKey.split("&$&")[0]
              }

              wx.request({
                url: glb.serverUrl + '/user/info?' + "t=" + new Date().getTime(), //仅为示例，并非真实的接口地址
                data: enobj,
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(13)
                  glb.hasUserInfo = false
                }
              })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                console.log(14)
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          glb.hasUserInfo = true
          this.setData({
            hasUserInfo: glb.hasUserInfo
          })
          console.log(12)
        }
      }
    })

  }
})
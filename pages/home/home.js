const app = getApp();
Page({
    data: {
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
      iconList: [],
      gridCol: 3,
      hasUserInfo: app.globalData.hasUserInfo,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      skin: false
    },
    onLoad: function() {
      this.getUser()
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
        })
        hasUserInfo = that.globalData.hasUserInfo
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
          })
          hasUserInfo = that.globalData.hasUserInfo
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo
            })
            hasUserInfo = that.globalData.hasUserInfo
          }
        })
      }
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
  getUser() {
    let that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(1)
        if (res.authSetting['scope.userInfo']) {
          console.log(2)
          wx.getUserInfo({
            success: res => {
              console.log(this.data.msgobj)
              let enobj = {
                encryptedData: res.encryptedData,
                iv: res.iv,
                signature: res.signature,
                rawData: res.rawData,
                sessionKey: that.globalData.sessinoKey
              }
              console.log(enobj)
              wx.request({
                url: that.globalData.serverUrl + '/user/info', //仅为示例，并非真实的接口地址
                data: enobj,
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  hasUserInfo = that.globalData.hasUserInfo
                }
              })

            }
          })
        } else {

        }
      },
      fail: function (err) {

      }
    })
  }
  }),
  Component({
    options: {
      addGlobalClass: true,
    }
  })
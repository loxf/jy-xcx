//app.js
App({
  onLaunch: function () {
    wx.clearStorage();
    // var _this = this;
    // // session校验及登录
    // wx.checkSession({
    //   success: function(){
    //     var loginCode = wx.getStorageSync('loginCode');
    //     if(loginCode){
    //       wx.login({
    //         success: res => {
    //           if (res.code) {
    //             wx.setStorageSync('loginCode', res.code);
    //           } else {
    //             wx.showToast({
    //               title: '登录失败！' + res.msg,
    //               icon: 'none',
    //               duration: 2000
    //             })
    //           }
    //         }
    //       })
    //     }
    //   },
    //   fail: function(){
    //     // session_key 已经失效，需要重新执行登录流程
    //     wx.login({
    //       success: res => {
    //         if (res.code) {
    //           wx.setStorageSync('loginCode', res.code);
    //         } else {
    //           wx.showToast({
    //             title: '登录失败！' + res.msg,
    //             icon: 'none',
    //             duration: 2000
    //           })
    //         }
    //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //       }
    //     }) //重新登录
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
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
  },
  globalData: {
    userInfo: null
  }
})
// //app.js
// App({
//   onLaunch: function () {
//     // 登录
//     wx.login({
//       success: res => {
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//       }
//     })
//     // 获取用户信息
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           wx.getUserInfo({
//             success: res => {
//               // 可以将 res 发送给后台解码出 unionId
//               this.globalData.userInfo = res.userInfo

//               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//               // 所以此处加入 callback 以防止这种情况
//               if (this.userInfoReadyCallback) {
//                 this.userInfoReadyCallback(res)
//               }
//             }
//           })
//         }
//       }
//     })
//   },
//   globalData: {
//     userInfo: null
//   }
// })
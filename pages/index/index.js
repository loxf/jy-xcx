const urlConfig = require('../../utils/urlConfig.js')
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '静怡雅学',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  nav: function(load) {
    //发起网络请求
      var token_his = wx.getStorageSync('token');
      var openid_his = wx.getStorageSync('openid');
      if(token_his!=""&&openid_his!=""&&!load){
        console.log("has_token");
        wx.redirectTo({
          url: '../jingyi/jingyi?token='+token_his+'&openid='+openid_his
        })
      }else{
        console.log("no_token");
        var code = wx.getStorageSync('loginCode');
        var userInfo = app.globalData.userInfo;
        var sex = userInfo.gender;
        var nickname = userInfo.nickName;
        var province = userInfo.province;
        var city = userInfo.city;
        var country = userInfo.country;
        var headimgurl = userInfo.avatarUrl;
        var recommend = "";
        wx.request({
          url: urlConfig.api+'/api/loginByXcx',
          method: 'POST',
          data: {
            code: code,
            sex: sex,
            province: province,
            city: city,
            nickname: nickname,
            country: country,
            headImgUrl: headimgurl,
            recommend: recommend
          },
          success: tokenRes => {
            if (tokenRes.data.code == "1") {
              console.log("get_token");
              wx.setStorageSync('openid', tokenRes.data.data.openid);
              wx.setStorageSync('token', tokenRes.data.data.token);
              wx.setStorageSync('custId', tokenRes.data.data.custId);
              wx.redirectTo({
                url: '../jingyi/jingyi?token='+tokenRes.data.data.token+'&openid='+tokenRes.data.data.openid
              })
            }else{
              wx.showToast({
                title: '验证失败！' + tokenRes.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: err => {
            wx.showToast({
              title: '验证失败！',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
  },
  onLoad: function (options) {
      var validate = options?options.validate:"yes";
      var token = wx.getStorageSync('token');
      if(token!=""&&validate!="no"){
        console.log("validate_ok");
        this.nav();
      }else{
        console.log("wx.login_start");
        wx.login({
          success: res => {
            if (res.code) {
              console.log("wx.login_code");
              wx.setStorageSync('loginCode', res.code);
              if (app.globalData.userInfo) {
                console.log("has_app.globalData.userInfo");
                this.setData({
                  userInfo: app.globalData.userInfo,
                  hasUserInfo: true
                })
                this.nav(true);
              } else if (this.data.canIUse){
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                app.userInfoReadyCallback = res => {
                  console.log("callback_app.globalData.userInfo");
                  this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                  })
                  this.nav(true);
                }
              } else {
                // 在没有 open-type=getUserInfo 版本的兼容处理
                wx.getUserInfo({
                  success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                      userInfo: res.userInfo,
                      hasUserInfo: true
                    })
                    this.nav(true);
                  }
                })
              }
            } else {
              wx.showToast({
                title: '登录失败！' + res.msg,
                icon: 'none',
                duration: 2000
              })
            }
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
          }
        })
    }
  },
  getUserInfo: function(e) {
    console.log("get_app.globalData.userInfo");
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.nav(true);
  }
})

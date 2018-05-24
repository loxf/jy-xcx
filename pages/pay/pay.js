const urlConfig = require('../../utils/urlConfig.js')
Page({
  data: {
  },
  onLoad: function (options) {
    let packageStr;
    if(options.package){
      packageStr = options.package.replace(/-/, "=");
    }
    wx.requestPayment({
       'timeStamp': options.timeStamp,
       'nonceStr': options.nonceStr,
       'package': packageStr,
       'signType': options.signType,
       'paySign': options.paySign,
       'success':function(res){
          wx.navigateBack();
       },
       'fail':function(res){
          if(res.errMsg == "requestPayment:fail cancel"){
            wx.request({
              url: urlConfig.api+'/api/cancelPay',
              method: 'POST',
              data: {
                orderId: options.orderId,
                prepayId: packageStr
              },
              success: res => {},
              fail: err => {}
            })
          } 
          wx.navigateBack();
       }
    })
  }
})

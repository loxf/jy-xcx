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
          wx.showToast({
            title:"支付成功！"
          });
          wx.navigateBack(3);
       },
       'fail':function(res){
          wx.showToast({
            title:"支付失败！"
          })
          wx.navigateBack();
       }
    })
  }
})

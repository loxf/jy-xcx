//logs.js
const util = require('../../utils/util.js');
const urlConfig = require('../../utils/urlConfig.js')

Page({
  data: {
    url:"",
    pay:false
  },
  onLoad: function (options) {
    var target = urlConfig.addr;
    if(options.target){
      target = options.target
    }
    this.setData({
      url:urlConfig.api+"/api/loginByXcxTmpToken?targetUrl="+ encodeURIComponent(target+"?env=XCX&custId"+options.custId) + "&token="+options.token+"&openid="+options.openid
    })
  },
  msgHandler: function(e) {
    console.log(e);
  },
  onShareAppMessage(options) {
    var custId = wx.getStorageSync('custId');
    console.log(options.webViewUrl)
    if (options.webViewUrl.indexOf("lessonDetail")>0) {
      return {
        title: '静怡雅学文化',
        path: '/index/index?custId='+custId+"&target="+encodeURIComponent(options.webViewUrl)
      }
    }else{
      return {
        title: '静怡雅学文化课程分享',
        path: '/index/index?custId='+custId
      }
    }
  }
})

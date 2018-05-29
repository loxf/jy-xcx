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
      target = decodeURIComponent(options.target);
    }
    // wx.showToast({
    //     title: "old_"+target,
    //     icon: 'none',
    //     duration: 8000
    //   })
    var url;
    if(target.indexOf("?")>0){
      url = target+"&env=XCX"
    }else{
      url = target+"?env=XCX"
    }
    this.setData({
      url:urlConfig.api+"/api/loginByXcxTmpToken?targetUrl="+ encodeURIComponent(url) + "&token="+options.token+"&openid="+options.openid
    })
  },
  msgHandler: function(e) {
    console.log(e);
  },
  onShareAppMessage(options) {
    var custId = wx.getStorageSync('custId');
    var type = "";
    var shareObj = urlConfig.addr;
    var param = "";
    if (options.webViewUrl.indexOf("id=")>0) {
      var parameterResult = {};
      var urlParmsIndex = options.webViewUrl.indexOf("?");
      var urlParms = options.webViewUrl.slice(urlParmsIndex);
      var parameters = urlParms.replace('?', '');
      var parameterArray = parameters.split('&');
      for (var i = 0; i < parameterArray.length; i++) {
          var result = parameterArray[i].split('=');
          parameterResult[result[0]] = result[1].replace('/', '');//过滤斜杠符号
      }
      shareObj = parameterResult.id;
    }
    var title = "静怡雅学文化"
    debugger;
    if (options.webViewUrl.indexOf("lessonDetail")>0) {
      param = custId+","+encodeURIComponent(options.webViewUrl);
      console.log('lessonDetail_/pages/index/index?id='+param)
      type = "VIDEO";
      title= '课程分享-静怡雅学文化'
    }else if (options.webViewUrl.indexOf("newsDetail")>0) {
      param = custId+","+encodeURIComponent(options.webViewUrl)
      console.log('newsDetail_/pages/index/index?id='+param)
      type = "NEWS";
      title= '新闻分享-静怡雅学文化';
    }else if (options.webViewUrl.indexOf("packageDetail")>0) {
      param = custId+","+encodeURIComponent(options.webViewUrl)
      type = "OFFER";
      title = '套餐分享-静怡雅学文化'
      console.log('packageDetail_/pages/index/index?id='+param)
    }else if (options.webViewUrl.indexOf("activityDetail")>0) {
      param = custId+","+encodeURIComponent(options.webViewUrl)
      type = "ACTIVE";
      title = '活动分享-静怡雅学文化'
      console.log('activityDetail_/pages/index/index?id='+param)
    }else{
      console.log("home_page")
      type = "INDEX";
      title = '静怡雅学文化';
      param = custId;
    }
    var token_his = wx.getStorageSync('token');
    var openid_his = wx.getStorageSync('openid');
    wx.request({
      url: urlConfig.api+'/api/share/shareInfoXcx',
      method: 'POST',
      data: {
        token: token_his,
        openid: openid_his,
        type:type,
        shareObj:shareObj,
        detailName:title
      },
      success: res => {
        if (res.data.code == "1") {

        }else{
          wx.showToast({
            title: '分享失败！' + res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: err => {
        wx.showToast({
          title: '分享失败！',
          icon: 'none',
          duration: 2000
        })
      }
    })
    return {
      title: title,
      path: '/pages/index/index?id='+param
    }
  }
})


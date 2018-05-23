//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    url:""
  },
  onLoad: function (options) {
    this.setData({
        url:"https://test.jingyizaixian.com/api/loginByXcxTmpToken?targetUrl=" + encodeURIComponent("https://test.jingyizaixian.com?env=XCX") + "&token="+options.token+"&openid="+options.openid
        // url:"https://test.jingyizaixian.com/api/loginByXcxTmpToken?targetUrl="+ encodeURIComponent("http://local.jingyizaixian.com/?env=XCX") + "&token="+options.token+"&openid="+options.openid
      })
  },
  msgHandler: function(e) {
    console.log(e);
  }
})

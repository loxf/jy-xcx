//logs.js
const util = require('../../utils/util.js');
const urlConfig = require('../../utils/urlConfig.js')

Page({
  data: {
    url:"",
    pay:false
  },
  onLoad: function (options) {
    this.setData({
      // url:"https://test.jingyizaixian.com/api/loginByXcxTmpToken?targetUrl=" + encodeURIComponent("https://test.jingyizaixian.com?env=XCX") + "&token="+options.token+"&openid="+options.openid
      url:urlConfig.api+"/api/loginByXcxTmpToken?targetUrl="+ encodeURIComponent(urlConfig.addr+"?env=XCX") + "&token="+options.token+"&openid="+options.openid
    })
  },
  msgHandler: function(e) {
    console.log(e);
  }
})

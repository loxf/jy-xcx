const url = {
    local: {
        api:"http://dev.jingyizaixian.com",
        addr:"http://local.jingyizaixian.com"
    },
    test:{
        api:"https://test.jingyizaixian.com",
        addr:"https://test.jingyizaixian.com"
    },
    product:{
        api:"https://www.jingyizaixian.com",
        addr:"https://www.jingyizaixian.com"
    }
}
module.exports = url.test;
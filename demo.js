// 快排算法

var quickSort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
};


result = quickSort([3, 9, 1, 2, 5, 7, 4, 8, 6])
console.log(result)


// 自动化测试
// 技术栈 ： taiko@node.js

const { openBrowser, goto, write, click, closeBrowser, $, waitFor, switchTo } = require('taiko');

async () => {
    // 打开浏览器
    await openBrowser();

    // 访问登陆界面
    await goto("https://login.taobao.com/");

    await write('username', { placeholder: "会员名/邮箱/手机号" })
    await write('username', { placeholder: "请输入登录密码" })
    await click('登陆')

    // 登陆完成后跳转至主页
    await goto('https://www.taobao.com')

    await write('gundam', $('#q'))
    await click('搜索')

    // 等待搜索结果，关键字「综合排序」
    await waitFor('综合排序')

    // 点击某个商品
    await click('某个商品')

    // 切换tab 至商品页面
    await switchTo('商品页面')

    // 点击具体的某个商品分类
    await click('某个商品分类')

    await click('立即购买')

    await closeBrowser();
};


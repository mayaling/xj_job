/**
 * 解决hbuilder打包app之后点击手机返回键直接退出app的
 */
document.addEventListener('plusready', function () {
    var webview = plus.webview.currentWebview()
    var first = null
    plus.key.addEventListener('backbutton', function () {
      webview.canBack(function (e) {
      
          if (!first) {
            first = new Date().getTime()
            console.log('再按一次退出应用') // 此处可以用自定义提示
            setTimeout(function () {
              first = null
            }, 500)
            setTimeout(function () {
              webview.back()
            }, 510)
          } else {
            if (new Date().getTime() - first < 500) {
              webview.close();
              plus.runtime.quit()
              console.log(webview)
            }
        }
      })
    })
  })
// // ios
// function setupWebViewJavascriptBridge(callback) {
//     if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
//     if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
//     window.WVJBCallbacks = [callback];
//     var WVJBIframe = document.createElement('iframe');
//     WVJBIframe.style.display = 'none';
//     WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
//     document.documentElement.appendChild(WVJBIframe);
//     setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
//   }
//   setupWebViewJavascriptBridge();
  
//   //安卓注册事件监听
//   function connectWebViewJavascriptBridge(callback) {
//       if (window.WebViewJavascriptBridge) {
//           callback(WebViewJavascriptBridge)
//       } else {
//           document.addEventListener(
//               'WebViewJavascriptBridgeReady'
//               , function() {
//                   callback(WebViewJavascriptBridge)
//               },
//               false
//           );
//       }
//   }
// //注册回调函数，第一次连接时调用 初始化函数
//  connectWebViewJavascriptBridge(function(bridge) {
//        //初始化
//       bridge.init(function(message, responseCallback) {
//           //var data = {'Javascript Responds': 'Wee!'};
//           responseCallback(data);
//       });
//       //Android调用js方法：functionInJs方法名称需要保持一致 ，并返回给Android通知
//       bridge.registerHandler("functionInJs", function(data, responseCallback) {
//           responseCallback(data);
//       });
//   })

// // android
// function connectWebViewJavascriptBridge(callback) {
//     if (window.WebViewJavascriptBridge) {
//         callback(WebViewJavascriptBridge)
//     } else {
//         document.addEventListener(
//             'WebViewJavascriptBridgeReady'
//             , function() {
//                 callback(WebViewJavascriptBridge)
//             },
//             false
//         );
//     }
// }

// connectWebViewJavascriptBridge(function(bridge) {
//     initVueApp();

//     bridge.init(function(message, responseCallback) {
//         console.log('JS got a message', message);
//         var data = {
//             'Javascript Responds': '测试中文!'
//         };
//         console.log('JS responding with', data);
//         responseCallback(data);
//     });
// });
// // // ios
// // function setupWebViewJavascriptBridge(callback) {
// //     if (window.WebViewJavascriptBridge) {
// //         return callback(WebViewJavascriptBridge);
// //     }
// //     if (window.WVJBCallbacks) {
// //         return window.WVJBCallbacks.push(callback);
// //     }
// //     window.WVJBCallbacks = [callback];
// //     var WVJBIframe = document.createElement('iframe');
// //     WVJBIframe.style.display = 'none';
// //     WVJBIframe.src = 'https://__bridge_loaded__';
// //     document.documentElement.appendChild(WVJBIframe);
// //     setTimeout(function () {
// //         document.documentElement.removeChild(WVJBIframe)
// //     }, 0)
// // }
// // setupWebViewJavascriptBridge(function (bridge) {
// //         initVueApp(); // vue 实例
// // });

// // function setupWebViewJavascriptBridge(callback) {
// //     if (window.WebViewJavascriptBridge) {
// //       return callback(window.WebViewJavascriptBridge)
// //     }
// //     if (window.WVJBCallbacks) {
// //       return window.WVJBCallbacks.push(callback)
// //     }
// //     window.WVJBCallbacks = [callback]
// //     let WVJBIframe = document.createElement('iframe');
// //     WVJBIframe.style.display = 'none'
// //     WVJBIframe.src = 'https://__bridge_loaded__'
// //     document.documentElement.appendChild(WVJBIframe);
// //     setTimeout(() => {
// //       document.documentElement.removeChild(WVJBIframe)
// //     }, 0)
// //   }
// //   export default {
// //     // callhandler(name, data, callback) {//用于调用ios的原生方法
// //     //   setupWebViewJavascriptBridge(function (bridge) {
// //     //     bridge.callHandler(name, data, callback)
// //     //   })
// //     // },
// //     webviewLoginSync(name, callback) {//用于注册js方法，供给ios调用
// //       setupWebViewJavascriptBridge(function (bridge) {
// //         bridge.webviewLoginSync(name, function (data, responseCallback) {
// //           callback(data, responseCallback)
// //         })
// //       })
// //     }
// //   }

	// function setupWebViewJavascriptBridge(callback) {
	//   if (window.WebViewJavascriptBridge) {
	//     return callback(window.WebViewJavascriptBridge)
	//   }
	//   if (window.WVJBCallbacks) {
	//     return window.WVJBCallbacks.push(callback)
	//   }
	//   window.WVJBCallbacks = [callback]
	//   let WVJBIframe = document.createElement('iframe');
	//   WVJBIframe.style.display = 'none'
	//   WVJBIframe.src = 'https://__bridge_loaded__'
	//   document.documentElement.appendChild(WVJBIframe);
	//   setTimeout(() => {
	//     document.documentElement.removeChild(WVJBIframe)
	//   }, 0)
	// }
	// export default {
	//   callhandler(webviewLoginSync, data, callback) {
	//     setupWebViewJavascriptBridge(function (bridge) {
	//       bridge.callHandler(webviewLoginSync, data, callback)
	//     })
	//   },
	//   registerhandler(webviewLoginSync, callback) {
	//     setupWebViewJavascriptBridge(function (bridge) {
	//       bridge.registerHandler(webviewLoginSync, function (data, responseCallback) {
	//         callback(data, responseCallback)
	//       })
	//     })
	//   }
    // }
    

    // function setupWebViewJavascriptBridge (callback) {
    //     if (window.WebViewJavascriptBridge) {
    //       return callback(window.WebViewJavascriptBridge)
    //     }
    //     if (window.WVJBCallbacks) {
    //       return window.WVJBCallbacks.push(callback)
    //     }
    //     window.WVJBCallbacks = [callback]
    //     let WVJBIframe = document.createElement('iframe')
    //     WVJBIframe.style.display = 'none'
    //     WVJBIframe.src = 'https://__bridge_loaded__'
    //     document.documentElement.appendChild(WVJBIframe)
    //     setTimeout(() => {
    //       document.documentElement.removeChild(WVJBIframe)
    //     }, 0)
    //   }
    //   export default {
    //     callhandler (name, data, callback) {
    //       setupWebViewJavascriptBridge(function (bridge) {
    //         bridge.callHandler(name, data, callback)
    //       })
    //     },
    //     registerhandler (name, callback) {
    //       setupWebViewJavascriptBridge(function (bridge) {
    //         bridge.registerHandler(name, function (data, responseCallback) {
    //           callback(data, responseCallback)
    //         })
    //       })
    //     }
    //   }

    // function setupWebViewJavascriptBridge(callback) {
    //     if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    //     if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    //     window.WVJBCallbacks = [callback];
    //     var WVJBIframe = document.createElement('iframe');
    //     WVJBIframe.style.display = 'none';
    //     WVJBIframe.src = 'https://__bridge_loaded__';
    //     document.documentElement.appendChild(WVJBIframe);
    //     setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    // }


    // function setupWebViewJavascriptBridge(callback) {
    //     if (window.WebViewJavascriptBridge) {
    //       return callback(window.WebViewJavascriptBridge)
    //     }
    //     if (window.WVJBCallbacks) {
    //       return window.WVJBCallbacks.push(callback)
    //     }
    //     window.WVJBCallbacks = [callback]
    //     let WVJBIframe = document.createElement('iframe');
    //     WVJBIframe.style.display = 'none'
    //     WVJBIframe.src = 'https://__bridge_loaded__'
    //     document.documentElement.appendChild(WVJBIframe);
    //     setTimeout(() => {
    //       document.documentElement.removeChild(WVJBIframe)
    //     }, 0)
    //   }
    //   export default {
    //     callhandler(name, data, callback) {
    //       setupWebViewJavascriptBridge(function (bridge) {
    //         bridge.callHandler(name, data, callback)
    //       })
    //     },
    //     registerhandler(name, callback) {
    //       setupWebViewJavascriptBridge(function (bridge) {
    //         bridge.registerHandler(name, function (data, responseCallback) {
    //           callback(data, responseCallback)
    //         })
    //       })
    //     }
    //   }

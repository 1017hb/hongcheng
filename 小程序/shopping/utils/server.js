const HTTP_BASE_URL = "http://123.207.32.32:8000/api/wh";

function api(_methods, url, data, callback) {

  wx.request({
    url: HTTP_BASE_URL + url,
    method: _methods,
    data: data,
    dataType: 'json',
    success: (res) => {
      typeof callback == "function" && callback(res, "");
    },
    fail: (res) => {
      console.log('请求数据失败')
      console.log(err)
      typeof callback == "function" && callback(err, "");
    }
  });
}

export function getJSON(url, data, callback) {
  api('GET', url, data, callback)
}
export function postJSON(url, data, callback) {
  api('POST', url, data, callback)
}
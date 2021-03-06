// app.js
import { promisifyAll } from 'miniprogram-api-promise';

const wxp = {}
// promisify all wx's api
promisifyAll(wx, wxp)

let dev;
// dev = true
 // dev means developer mode. not live mode

App({
  onLaunch() {
    const host = this.getRoot()
    console.log('beginning login', host)
    wx.login({
      success: (res) => {
        console.log('res from login', res)
        wx.request({
          url: host + 'login',
          method: 'post',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log('res from succesful login', res)
            console.log('userID', res.data.userId)
            this.globalData.userId = res.data.userId
          },
        })
      }
    });
  },

  globalData: {
    userInfo: {},
    env: dev?'dev':'prod',
    host: {
      dev: "http://localhost:3000/",
      prod: "https://mark-my-way.wogengapp.cn/"
    },
    api: 'api/v1/'
  },

  getRoot() {
    return this.globalData.host[this.globalData.env]
  },

  getHost() {
    return this.getRoot() + this.globalData.api
  }
})
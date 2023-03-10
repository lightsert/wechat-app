// pages/search/search.js
import request from "../../utils/request"
let isSend = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderContent:'',  //placeholder的内容
    hotList:[], //热搜榜数据
    searchContent:'',  //用户输入的表单项数据
    searchList:[], //  关键字模糊匹配的数据
    historyList:[]  //  搜索的历史记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取初始数据
    this.getInitDate()
    //  获取历史记录
    this.getSearchHistory()  
  },

  //  表单项内容发送改变
  handleInput(event){
    this.setData({
      searchContent:event.detail.value.trim()
    })
    if(isSend !== null){
      clearTimeout(isSend)
    }

    //  函数防抖
    isSend = setTimeout(()=>{
      this.getsearchData();
    },300)

  },

  async getsearchData(){
    //  发请求获取关键字模糊匹配数据
    let {searchContent,historyList} = this.data

    if(this.data.searchContent){
      let searchListData = await request("/search",{keywords:searchContent,limit:10})
      this.setData({
        searchList:searchListData.result.songs
      })
    }

    //  将搜索的关键字添加到历史记录中
    if(historyList.indexOf(searchContent) !== -1){
      historyList.splice(historyList.indexOf(searchContent),1)
    }
    historyList.unshift(searchContent)
    if(historyList.indexOf('') !== -1){
      historyList.splice(historyList.indexOf(''),1)
    }
    this.setData({
      historyList
    })

    wx.setStorageSync('searchHistory',historyList)

  },

  //  清空历史记录
  deleteSearchHistory(){
    wx.showModal({
      content:'确认删除吗？',
      success:(res)=>{
        if(res.confirm){
          // 清空data中historyList
          this.setData({
            historyList:[]
          })
          //  移除本地历史记录
          wx.removeStorageSync('searchHistory')
        }
      }
    })
  },

  //  清空搜索内容
  clearSearch(){
    this.setData({
      searchContent:'',
      searchList:[]
    })
  },

  // 获取本地历史记录的功能函数
  getSearchHistory(){
    let historyList = wx.getStorageSync('searchHistory')
    if(historyList){
      this.setData({
        historyList
      })
    }
  },


  //  获取初始化的数据
  async getInitDate(){
    let placeholderData = await request("/search/default")
    let hotListData = await request("/search/hot/detail")
    this.setData({
      placeholderContent:placeholderData.data.showKeyword,
      hotList:hotListData.data
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
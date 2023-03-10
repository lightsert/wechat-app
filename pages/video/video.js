// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList:[],
    navId:'',  //导航的标识
    videoListDatas:[],  //视频的列表数据
    videoId:'',  // 视频的标识
    videoUpdateTime:[],  //记录视频的时长 
    isTriggered:false //标识下拉刷新是否被触发
  },

  //  导航条内容
  async videoListReq(){
    let result = await request("/video/group/list")
    this.setData({
      videoList:result.data.slice(0,14),
      navId:result.data[0].id
    })

    this.getVideoList(this.data.navId)
  },

  //  获取视频列表数据
  async getVideoList(navId){
    let videoListData = await request("/video/group",{id:navId})
    //  关闭信息提示框
    wx.hideLoading();
    let index = 0;
    let videoListDatas = videoListData.datas.map(item => {
      item.id = index++
      return item;
    })

    this.setData({
      videoListDatas:videoListDatas,
      isTriggered:false //  关闭下拉刷新
    })
  },

  //  点击导航的回调
  activeClice(event){
    let navId = event.currentTarget.id;
    this.setData({
      navId:navId * 1,
      videoListDatas:[]
    })

    // 显示正在加载
    wx.showLoading({
      title:'正在加载'
    })

    //  动态获取当前导航下的视频数据
    this.getVideoList(this.data.navId)
  },
  
  //  点击播放/继续播放的回调
  handlePlay(event){
    let vid = event.currentTarget.id
    // this.vid !== vid && this.videoContext && this.videoContext.stop()

    // this.vid = vid;
    this.setData({
      videoId:vid
    })
    //  创建控制video标签的实例对象
    this.videoContext = wx.createVideoContext(vid)
    //  判断当前的视频之前是否播放过，是否有播放记录, 如果有，跳转到指定的位置
    let {videoUpdateTime} = this.data
    let videoItem = videoUpdateTime.find(item => {vid === item.vid})
    if(videoItem){
      this.videoContext.seek(videoItem.currentTime);
    }
    this.videoContext.play()
  },

  // 监听视频播放进度的回调
  handleTime(event){        //  2                             4.3s
    let videoTimeObj = {vid:event.currentTarget.id,currentTime:event.detail.currentTime}
    let {videoUpdateTime} = this.data;
    //  [{id:1,time:2.3s}]
    let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid);
    if(videoItem){
      videoItem.currentTime = videoTimeObj.currentTime;
    }else{
      videoUpdateTime.push(videoTimeObj)
    }

    this.setData({
      videoUpdateTime
    })




  },
  // 视频结束调用
  handleEnd(event){
    // 移除记录播放时长数组中当前视频的对象
    let {videoUpdateTime} = this.data;
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id),1)
    this.setData({
      videoUpdateTime
    })
  },

  //  下拉刷新
  handleRefresher(){
    //  再次发请求
    this.getVideoList(this.data.navId)
  },
  //  上拉触底的回调
  handleToLower(){
    
  },
  // 跳转到搜索页面
  toSearch(){
    wx.navigateTo({
      url:'/pages/search/search'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoListReq()
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
  onShareAppMessage: function (from) {
    console.log(from);
  }
})
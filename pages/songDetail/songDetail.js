// pages/songDetail/songDetail.js
import request from "../../utils/request";
import PubSub  from "pubsub-js";
const AppInster = getApp()
import moment from "moment";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,  //是否播放
    song:[], //音乐数据
    musicId:'',  //  音乐的id 
    musicLink:'',  //音乐链接
    currentTime:'00:00',  //实时时间
    durationTime:'00:00',  //  总时长
    currentWidth:0    //  实时进度条的宽度
  },

  // 获取音乐详情数据的函数
  async musicdata(musicId){
    let songData = await request('/song/detail',{ids:musicId})
    let durationTime = moment(songData.songs[0].dt).format("mm:ss")
    this.setData({
      song:songData.songs[0],
      durationTime
    })
    // console.log(this.data.song.al.name);
    //  动态修改窗口标题
    wx.setNavigationBarTitle({
      title:this.data.song.name
    })

  },


  //  点击播放/暂停的状态
  handleMusicPlay(){
    this.setData({
      isPlay:!this.data.isPlay
    })
    let {musicId,musicLink} = this.data
    this.musicControl(this.data.isPlay,musicId,musicLink)
  },

  async musicControl(isPlay,musicId,musicLink){
    if(isPlay){
      //  音乐播放
      if(!musicLink){
        let musicLinkData = await request ('/song/url',{id:musicId})
        //  获取音乐播放链接
        musicLink = musicLinkData.data[0].url;

        this.setData({
          musicLink
        })
      }
 
      this.backgroundAudioManager.src = musicLink
      this.backgroundAudioManager.title = this.data.song.name


    }else{
      //  暂停音乐
      this.backgroundAudioManager.pause();
    }
  },
  //  上一首/下一首
  handleSwitch(event){
    //  获取类型
    let type = event.currentTarget.id

    //  关闭当前播放的音乐
    this.backgroundAudioManager.pause()

    PubSub.subscribe('musicId',(msg,musicId)=>{
      
      this.musicdata(musicId);
      //  自动播放当前的音乐
      this.musicControl(true,musicId)

      PubSub.unsubscribe('musicId')
    })

    //  发布数据给每日推荐页面
    PubSub.publish('switchType',type)

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  options 接收路跳转的query的参数
    let musicId = options.musicId
    this.setData({
      musicId
    })


    this.musicdata(musicId)

    //  如果用户操作系统的控制音乐播放/暂停的按钮，页面不知道，导致页面显示是否播放的状态和真实的音乐播放状态不一致
    //  解决方案：
    //    1.通过控制音频的实例backgroundAudioManager 去监视音乐播放/暂停

      // 判断当前页面音乐是否在播放
    if(AppInster.globalData.isMusicPlay && AppInster.globalData.musicId === musicId){
      //修改当前页面音乐播放状态为true
      this.setData({
        isPlay:true
      })
    }


    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    this.backgroundAudioManager.onPlay(()=>{
      //  修改音乐是否的状态
      this.changePlayState(true)

      AppInster.globalData.musicId = musicId

    })
    this.backgroundAudioManager.onPause(()=>{
      this.changePlayState(false)
    })
    this.backgroundAudioManager.onStop(()=>{
      this.changePlayState(false)
    })

    //  监听音乐播放自然结束
    this.backgroundAudioManager.onEnded(()=>{
      //  自动切换至下一首音乐，并且自动播放
      PubSub.publish("switchType",'next')
      //  将实时进度条的长度还原成0
      this.setData({
        currentWidth:0,
        currentTime:'00:00'
      })

    })


    //  监听音乐实时播放的进度
    this.backgroundAudioManager.onTimeUpdate(()=>{
      let currentTime = moment(this.backgroundAudioManager.currentTime * 1000).format("mm:ss")
      let currentWidth = this.backgroundAudioManager.currentTime/this.backgroundAudioManager.duration * 450
      this.setData({
        currentTime,
        currentWidth
      })
    })

  },

  //  修改播放状态的功能函数
  changePlayState(isPlay){
    this.setData({
      isPlay
    })
    AppInster.globalData.isMusicPlay = isPlay
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
<template>
  <div id="app">
      <!--PC端主界面-->
      <div id="main">
          <div v-if="!isMobile" id="pc" style="width: 100%;display: flex;flex-direction: row">
              <div id="left" style="width: 15%;float:left"></div>
              <div id="middle" style="width:70%">
                  <div id="menu">
                      <div style="height: 100%;width: 20%;">
                          <img src="https://tsx-1302788370.file.myqcloud.com/sysImage/wolflogo.png" style="width: 55%;margin-left: 40%;margin-top: 2%" />
                      </div>
                      <div style="height: 100%;width: 80%">
                          <el-button round @click="toMain" type="info" icon="el-icon-s-home" style="margin-left:5%;margin-top: 4%;background-color: rosybrown;border-color: rosybrown;box-shadow:3px 2px 2px 2px darkgray">主页</el-button>
                          <el-button round @click="toDiary" type="info" icon="el-icon-s-promotion" style="margin-left:5%;background-color: rosybrown;border-color: rosybrown;box-shadow:3px 2px 2px 2px darkgray">日常吐槽</el-button>
                          <el-button round @click="toBook" type="info" icon="el-icon-edit" style="margin-left:5%;background-color: rosybrown;border-color: rosybrown;box-shadow:3px 2px 2px 2px darkgray">留言板</el-button>
                          <el-button round @click="toImage" type="info" icon="el-icon-picture-outline" style="margin-left:5%;background-color: rosybrown;border-color: rosybrown;box-shadow:3px 2px 2px 2px darkgray">图库</el-button>
                          <el-dialog
                                  title="管理员入口"
                                  :visible.sync="dialogVisible"
                                  width="30%"
                                  :before-close="handleClose">
                              <span>暗号对了就能进</span>
                              <el-input v-model="input" placeholder="请输入暗号"></el-input>
                              <span slot="footer" class="dialog-footer">
                              <el-button @click="dialogVisible = false">取 消</el-button>
                              <el-button type="primary" @click="login">确 定</el-button>
                          </span>
                          </el-dialog>
                          <el-button round v-if="!isMobile" @click="dialogVisible = true" type="info" icon="el-icon-key" style="margin-left:5%;background-color: rosybrown;border-color: rosybrown;box-shadow:3px 2px 2px 2px darkgray">马头人入口</el-button>
                      </div>
                  </div>
              </div>
              <div id="right" style="width: 15%;">
                  <div id="musicBox">
                      <music ref="music" :audiosrc="audioURL[index].url" :imgsrc="audioURL[index].imgURL" :key="timer" @end="alreadyEnd" style="height: 70%;margin-bottom: 2%"></music>
                      <div style="height: 20%;">
                          <p style="text-align: center;font-size: 80%">
                              <span>{{audioURL[index].name}}</span>
                          </p>
                      </div>
                      <div style="height: 25px;display: flex;flex-direction: row;margin-bottom:4%">
                          <el-button size="mini" type="info" icon="el-icon-video-pause" @click="pause"></el-button>
                          <el-button size="mini" type="info" icon="el-icon-video-play" @click="start"></el-button>
                          <el-button size="mini" type="info" icon="el-icon-magic-stick" @click="randomNext"></el-button>
                      </div>
                  </div>
              </div>
          </div>

          <div v-if="isMobile" id="mobile" style="width: 100%;display: flex;flex-direction: row">
              <div style="width: 20%">
                  <img src="https://tsx-1302788370.file.myqcloud.com/sysImage/wolflogo.png" style="width: 100%;margin-left:40%;margin-top: 5%"/>
              </div>

              <div style="width: 80%;display: flex;flex-direction: column">
                  <div style="margin-left: 20%;margin-top: 2%">
                      <el-button size="mini" round @click="toMain" type="info" icon="el-icon-s-home" style="background-color: rosybrown;border-color: rosybrown;box-shadow:3px 2px 2px 2px darkgray">主页</el-button>
                      <el-button size="mini" round @click="toDiary" type="info" icon="el-icon-s-promotion" style="margin-left:9%;background-color: rosybrown;border-color: rosybrown;box-shadow:3px 2px 2px 2px darkgray">日常吐槽</el-button>
                  </div>
                  <div style="margin-left: 15%;margin-top: 4%">
                      <el-button size="mini" round @click="toBook" type="info" icon="el-icon-edit" style="margin-left:5%;background-color: rosybrown;border-color: rosybrown;box-shadow:3px 2px 2px 2px darkgray">留言板</el-button>
                      <el-button size="mini" round @click="toImage" type="info" icon="el-icon-picture-outline" style="margin-left:9%;background-color: rosybrown;border-color: rosybrown;box-shadow:3px 2px 2px 2px darkgray">图库</el-button>
                  </div>
              </div>

              <div id="mmusicBox">
                  <music :audiosrc="audioURL[index].url" :imgsrc="audioURL[index].imgURL" :key="timer" @end="alreadyEnd" style="height: 70%;margin-bottom: 2%"></music>
                  <div style="height: 25px;display: flex;flex-direction: row;margin-bottom:4%">
                      <el-button size="mini" type="info" icon="el-icon-video-play" @click="randomNext"></el-button>
                  </div>
              </div>
          </div>

      </div>
      <router-view v-if="isRouterAlive" v-wechat-title='$route.meta.title'></router-view>
  </div>
</template>

<script>
  import Music from "./components/Music";
  export default {
    components:{
       Music
    },
    provide(){
        return {
            reload:this.reload
        }
    },
    data() {
      return {
          menuData:[{}],
          audioURL:[
              {id:0,name:'Kaer Morhen',url:"https://tsx-1302788370.file.myqcloud.com/music/Kaer%20Morhen.mp3",imgURL:"https://y.gtimg.cn/music/photo_new/T002R300x300M000003dKgkH3CRkYx.jpg?max_age=2592000"},
              {id:1,name:'The Fields of Ard Skellig',url:"https://tsx-1302788370.file.myqcloud.com/music/The%20Fields%20of%20Ard%20Skellig.mp3",imgURL:"https://y.gtimg.cn/music/photo_new/T002R300x300M000003dKgkH3CRkYx.jpg?max_age=2592000"},
              {id:2,name:'Village',url:"https://tsx-1302788370.file.myqcloud.com/music/Village.mp3",imgURL:"https://y.gtimg.cn/music/photo_new/T002R300x300M000000BG8bW3Rffo9_1.jpg?max_age=2592000"},
              {id:3,name:'帝国时代2DE不列颠',url:"https://tsx-1302788370.file.myqcloud.com/music/%E5%B8%9D%E5%9B%BD%E6%97%B6%E4%BB%A32DE%E4%B8%8D%E5%88%97%E9%A2%A0.mp3",imgURL:"https://y.gtimg.cn/music/photo_new/T002R300x300M000002hZwxF2aoIL6_1.jpg?max_age=2592000"},
          ],
          index:0,
          dialogVisible:false,
          input:'',
          isRouterAlive:true,
      };
    },
    mounted(){
      if (this._isMobile()) {
        // alert("手机端");
        this.$router.replace('/m');
        this.$router.push({path:'/mmain'})
      } else {
        // alert("pc端");
        this.$router.replace('/');
        this.$router.push({path:'/main'})
      }
      this.index = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    },
    computed:{
        isMobile(){
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        }
    },
    methods: {
      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      },
      toDiary(){
          if(this._isMobile()){
              this.$router.push({path:'/mDiary'})
          }else {
              this.$router.push({path:'/diary'})
          }
      },
      toMain(){
          if(this._isMobile()){
              this.$router.push({path:'/mmain'})
          }else {
              this.$router.push({path:'/main'})
          }
      },
      toBook(){
          if(this._isMobile()){
              this.$router.push({path:'/mbook'})
          }else {
              this.$router.push({path:'/book'})
          }
      },
        reload(){
            this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        },
      nextMusic(){
          if(this.index<3){
              this.index = this.index+1;
          }else if (this.index===3){
              this.index=0
          }
          this.timer = new Date().getTime()
      },
      alreadyEnd(val){
          if(this.index<3){
              this.index = this.index+1;
          }else if (this.index===3){
              this.index=0
          }
          this.timer = new Date().getTime()
      },
      randomNext(){
        var b = Math.floor(Math.random() * (3 - 0 + 1) + 0);
        if(this.index !== b){
            this.index = b
        }else {
            if(this.index<3){
                this.index = this.index+1;
            }else if (this.index===3){
                this.index=0
            }
        }
        this.timer = new Date().getTime()
      },
      login(){
          this.dialogVisible=false
          if(this.input==='lsdmtrtsx2222'){
              this.$router.push('/login')
          }else {
              this.$alert('不知道暗号别想进！！！', '立入禁止', {
                  confirmButtonText: '确定',})
          }
      },
      pause() {
          this.$store.commit('stop')
          this.$refs.music.peform()
      },
      start(){
          this.$store.commit('go')
          this.$refs.music.peform()
      },
      toImage(){
          if(this._isMobile()){
              this.$router.push({path:'/mimage'})
          }else {
              this.$router.push({path:'/image'})
          }
      }
    }
  }
</script>

<style>
  #app{
    width: 100%;
    display: flex;
    flex-direction:column;
      background-image: url("https://tsx-1302788370.file.myqcloud.com/sysImage/back7.jpg");
      background-repeat: repeat;
  }
  #menu{
     width: 100%;
     height: 80px;
     display: flex;
     flex-direction: row;
  }
  #musicBox{
      margin-top: 10%;
      margin-left:2%;
      width: 10%;
      height:270px;
      margin-right:2%;
      position: fixed;
      border: silver 2px solid;
      border-bottom-left-radius: 12%;
      border-bottom-right-radius: 12%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: white;
  }
  #mmusicBox{
      z-index: 20;
      width: 15%;
      margin-left:84%;
      margin-top: 140%;
      position: fixed;
      border: silver 2px solid;
      border-bottom-left-radius: 12%;
      border-bottom-right-radius: 12%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: white;
  }
  #main{
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-bottom: 3%;
  }
</style>

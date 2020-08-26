<template>
    <div id="main">
        <div id="topImg" style="width: 100%;">
            <el-carousel :interval="8000" >
                <el-carousel-item v-for="item in topIMG" :key="item.id">
                    <h3 class="medium"><img v-bind:src=item.url style="height: 100%;width: 100%" /></h3>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="showArea">
            <div style="border-bottom: 2px black solid;display: flex;flex-direction: row">
                <p style="margin-left: 3%;font-family:迷你简水柱;color: cornflowerblue;font-size: 15px"><span>马头人吐槽</span></p>
                <p @click="toDiary" style="margin-left: 46%">更多吐槽-></p>
            </div>
            <div style="overflow: auto">
                <div class="weibo" v-for="item in weibo">
                    <div style="width: 20%">
                        <img style="width: 80%;margin-left: 11%;margin-top: 15%" src="https://tsx-1302788370.file.myqcloud.com/sysImage/cat.png" />
                    </div>
                    <div style="display:flex;flex-direction: column;width: 80%">
                        <div class="top" style="font-size: 90%">
                            <p>{{item.weiboDate}}</p>
                        </div>
                        <div class="text" style="word-wrap:break-word;word-break:break-all;border-top:1px silver solid;margin-top: -5px">
                            <p style="text-indent: 2em"><span>{{item.weiboText}}</span></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="showArea">
            <div style="border-bottom: 2px black solid;display: flex;flex-direction: row">
                <p style="margin-left: 3%;font-family: 迷你简水柱;color:cornflowerblue;font-size: 15px"><span>客官留言</span></p>
                <p @click="toBook" style="margin-left: 50%">更多留言-></p>
            </div>
            <div style="overflow: auto">
                <div class="message" v-for="item in message">
                    <div style="width: 20%">
                        <img style="width: 94%;margin-left: 4%;margin-top: 10%" src="https://tsx-1302788370.file.myqcloud.com/sysImage/catlogo.gif" />
                    </div>
                    <div style="display:flex;flex-direction: column;width: 80%">
                        <div class="top" style="font-size: 90%">
                            <p>{{item.messageDate}}</p>
                        </div>
                        <div class="text" style="word-wrap:break-word;word-break:break-all;border-top:1px silver solid;margin-top: -5px">
                            <p style="text-indent: 2em"><span>{{item.messageText}}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "mMainpage",
        data(){
            return{
                topIMG:[
                    {id:0,url:"https://tsx-1302788370.file.myqcloud.com/sysImage/2.jpg"},
                    {id:1,url:"https://tsx-1302788370.file.myqcloud.com/Image/Witcher-13.png"},
                    {id:2,url:"https://tsx-1302788370.file.myqcloud.com/sysImage/4.jpg"},
                    {id:3,url:"https://tsx-1302788370.file.myqcloud.com/Image/Witcher-3.png"},
                    {id:4,url:"https://tsx-1302788370.file.myqcloud.com/Image/Witcher-7.png"}
                ],
                weibo:[{}],
                message:[{}],
            }
        },
        created(){
            var _this = this
            axios.get('/api/weibo/findAll/0/6').then(function (resp) {
                _this.weibo = resp.data.content
            })
            axios.get('/api/message/findAll/0/6').then(function (resp) {
                _this.message = resp.data.content
            })
        },
        methods:{
            toDiary() {
                this.$router.push({path: '/mdiary'})
            },
            toBook(){
                this.$router.push({path: '/mbook'})
            }
        }
    }
</script>

<style scoped>
    #main{
        width: 100%;
        display: flex;
        flex-direction:column;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-image: url("https://tsx-1302788370.file.myqcloud.com/sysImage/back5.jpg");
        background-repeat: repeat;
    }
    .el-carousel__item h3 {
        margin-top: 6%;
    }
    .showArea{
        width: 90%;
        height: 300px;
        border-radius: 10px;
        border: 2px darkgray solid;
        margin-left: 5%;
        overflow:auto;
        background-color: white;
        box-shadow:6px 6px 3px  grey;
        display: flex;
        flex-direction: column;
        margin-bottom: 7%;
    }
    .message{
        display: flex;
        flex-direction: row;
        width: 94%;
        margin-right: 3%;
        margin-left: 3%;
        border: 2px darkslategrey solid;
        border-radius: 10px;
        margin-top: 1%;
    }
    .weibo{
        display: flex;
        flex-direction: row;
        width: 94%;
        margin-right: 3%;
        margin-left: 3%;
        border: 2px darkslategrey solid;
        border-radius: 10px;
        margin-top: 1%;
    }
</style>
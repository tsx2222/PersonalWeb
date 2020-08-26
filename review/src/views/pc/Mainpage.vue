<template>
    <div id="main">
        <div id="topImg" style="width: 100%;height: 34%">
            <el-carousel :interval="8000" type="card" style="height: 100%">
                <el-carousel-item v-for="item in topIMG" :key="item.id">
                    <h3 class="medium"><img v-bind:src=item.url style="height: 100%;width: 100%" /></h3>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div id="showArea">

            <div id="row1">
                <div id="column1">
                    <div style="border-bottom: 2px black solid;display: flex;flex-direction: row">
                        <p style="margin-left: 3%;font-family:迷你简水柱;color: cornflowerblue;font-size: 20px"><span>马头人吐槽</span></p>
                        <p @click="toDiary" style="margin-left: 58%">更多吐槽-></p>
                    </div>
                    <div style="overflow: auto">
                        <div class="weibo" v-for="item in weibo">
                            <div style="width: 10%">
                                <img style="width: 80%;margin-left: 11%;margin-top: 15%" src="https://tsx-1302788370.file.myqcloud.com/sysImage/cat.png" />
                            </div>
                            <div style="display:flex;flex-direction: column;width: 90%">
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

                <div id="column2">
                    <div style="border-bottom: 2px black solid;display: flex;flex-direction: row">
                        <p style="margin-left: 3%;font-family: 迷你简水柱;color:cornflowerblue;font-size: 20px"><span>客官留言</span></p>
                        <p @click="toBook" style="margin-left: 63%">更多留言-></p>
                    </div>
                    <div style="overflow: auto">
                        <div class="message" v-for="item in message">
                            <div style="width: 10%">
                                <img style="width: 80%;margin-left: 11%;margin-top: 15%" src="https://tsx-1302788370.file.myqcloud.com/sysImage/catlogo.gif" />
                            </div>
                            <div style="display:flex;flex-direction: column;width: 90%">
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

            <!--<div id="row2">
                <div id="column3">
                    <div style="border-bottom: 2px black solid;display: flex;flex-direction: row">
                        <p style="margin-left: 3%;font-family: 迷你简水柱;color:cornflowerblue;font-size: 20px"><span>马头人的相册</span></p>
                        <p style="margin-left: 56%">更多相册-></p>
                    </div>

                    <div style="display: flex;flex-direction: ">

                    </div>
                </div>

                <div id="column4">
                    <div style="border-bottom: 2px black solid;display: flex;flex-direction: row">
                        <p style="margin-left: 3%;font-family: 迷你简水柱;color:cornflowerblue;font-size: 20px"><span>还没有想好搞什么</span></p>
                        <p ></p>
                    </div>
                </div>
            </div>-->
        </div>

        <div id="bottom"></div>
    </div>
</template>

<script>
    export default {
        name: "Mainpage",
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
                this.$router.push({path: '/diary'})
            },
            toBook(){
                this.$router.push({path: '/book'})
            }
        }
    }
</script>

<style scoped>
    #main{
        margin-left: 15%;
        margin-right: 15%;
        width: 70%;
        display: flex;
        flex-direction:column;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-image: url("https://tsx-1302788370.file.myqcloud.com/sysImage/back5.jpg");
        background-repeat: repeat;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;

        line-height: 100%;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    #showArea{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    #row1{
        width: 100%;
        display: flex;
        flex-direction: row;
        height: 550px;
    }
    #row2{
        margin-top: 3%;
        width: 100%;
        display: flex;
        flex-direction: row;
        height: 550px;
    }
    #column1{
        width: 42%;
        height: 100%;
        border-radius: 10px;
        border: 2px darkgray solid;
        margin-left: 5%;
        overflow:auto;
        background-color: white;
        box-shadow:6px 6px 3px  grey;
        display: flex;
        flex-direction: column;
    }
    #column2{
        width: 42%;
        border-radius: 10px;
        border: 2px darkgray solid;
        margin-left: 6%;
        overflow:auto;
        height: 100%;
        background-color: white;
        box-shadow:6px 6px 3px  grey;
        display: flex;
        flex-direction: column;
    }
    #column3{
        width: 42%;
        border-radius: 10px;
        border: 2px darkgray solid;
        margin-left: 5%;
        overflow:auto;
        height: 100%;
        box-shadow:6px 6px 3px  grey;
        background-color: white;
        display: flex;
        flex-direction: column;
    }
    #column4{
        width: 42%;
        border-radius: 10px;
        border: 2px darkgray solid;
        margin-left: 6%;
        overflow:auto;
        height: 100%;
        box-shadow:6px 6px 3px  grey;
        background-color: white;
        display: flex;
        flex-direction: column;
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
    #bottom{
        margin-top: 2%;
        width: 100%;
        height: 20px;
        background-image: url("https://tsx-1302788370.file.myqcloud.com/sysImage/back7.jpg");
    }
</style>
<template>
    <div id="main">
        <div id="diary">
            <el-button round style="margin-top: 1%" type="warning" @click="write">按这里给阿妥写一条留言</el-button>
            <div style="display: flex;text-align: center;justify-content: center">
                <el-form :model="messageForm" ref="messageForm" style="width: 100%" class="demo-ruleForm" v-if="show">

                    <el-form-item prop="messageText">
                        <el-input type="textarea" class="inputbox" v-model="messageForm.messageText"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="messageDate" style="display: none;">
                        <el-input class="inputbox" v-model="messageForm.messageDate"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitMessage('messageForm')">发表</el-button>
                    </el-form-item>

                </el-form>
            </div>
            <div class="message" v-for="item in message">
                <div style="width: 20%">
                    <img style="width: 86%;margin-left: 4%;margin-top: 5%" src="https://tsx-1302788370.file.myqcloud.com/sysImage/catlogo.gif" />
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
        <div style="display: flex;justify-content: center;align-items: center;margin-top: 1%">
            <el-pagination
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="page"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Book",
        inject:['reload'],
        data(){
            return{
                message:[{}],
                total:0,
                pagesize:0,
                show:false,
                messageForm:{
                    messageText:'',
                    messageDate:'',
                }
            }
        },
        created() {
            var _this = this
            axios.get('/api/message/findAll/0/10').then(function (resp) {
                _this.message = resp.data.content
                _this.pageSize = resp.data.size
                _this.total = resp.data.totalElements
            })
        },
        methods:{
            page(currentPage){
                const _this = this
                axios.get('/api/message/findAll/'+(currentPage - 1)+'/10').then(function (resp){
                    _this.message = resp.data.content
                    _this.pageSize = resp.data.size
                    _this.total = resp.data.totalElements
                })
            },
            write(){
                this.show = true
            },
            submitMessage(){
                var d = new Date()
                var time=[]
                var minute=[]
                time[0]=d.getFullYear().toString()+'年'
                time[1]=(d.getMonth()+1).toString()+'月'
                time[2]=(d.getDate()).toString()+'日'
                minute[0]=d.getHours().toString()+'时'
                minute[1]=d.getMinutes().toString()+'分'
                this.messageForm.messageDate = time.join('').concat([','],minute.join(''))
                const that = this
                axios.post('/api/message/save',this.messageForm).then(function (resp) {
                    if (resp.data == 'success'){
                        that.$alert('留言成功！','消息',{
                            comfirmButtonText:'确定',
                            callback: action => {
                                that.reload()
                            }
                        })
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                })
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
        background-image: url("https://tsx-1302788370.file.myqcloud.com/sysImage/back5.jpg");
        background-repeat: repeat;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
    #diary{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .message{
        display: flex;
        flex-direction: row;
        width: 90%;
        margin-right: 5%;
        margin-left: 5%;
        border: 2px darkslategrey solid;
        border-radius: 10px;
        margin-top: 1%;
    }
</style>
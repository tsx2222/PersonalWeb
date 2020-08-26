<template>
    <div>
        <el-form :model="weiboForm" ref="weiboForm" label-width="80px" class="demo-ruleForm">

            <el-form-item label="心情内容" prop="weiboText">
                <el-input class="inputbox" v-model="weiboForm.weiboText"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="weiboDate" style="display: none">
                <el-input class="inputbox" v-model="weiboForm.weiboDate"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitWeibo('weiboForm')">发表</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        inject:['reload'],
        data(){
            return{
                weiboForm:{
                    weiboText:'',
                    weiboDate:''
                }
            }
        },
        methods:{
            submitWeibo(){
                var d = new Date()
                var time=[]
                var minute=[]
                time[0]=d.getFullYear().toString()+'年'
                time[1]=(d.getMonth()+1).toString()+'月'
                time[2]=(d.getDate()).toString()+'日'
                minute[0]=d.getHours().toString()+'时'
                minute[1]=d.getMinutes().toString()+'分'
                this.weiboForm.weiboDate = time.join('').concat([','],minute.join(''))
                const that = this
                axios.post('/api/weibo/save',this.weiboForm).then(function (resp) {
                    if (resp.data == 'success'){
                        that.$alert('发表成功！','消息',{
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

</style>
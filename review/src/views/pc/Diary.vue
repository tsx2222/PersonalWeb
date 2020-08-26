<template>
    <div id="main">
        <div id="diary">
            <div class="weibo" v-for="item in weibo">
                <div style="width: 20%">
                    <img style="width: 86%;margin-left: 4%;margin-top: 4%" src="https://tsx-1302788370.file.myqcloud.com/sysImage/cat.png" />
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
        name: "Diary",
        data(){
            return{
                weibo:[{}],
                total:0,
                pagesize:0,
            }
        },
        created() {
            var _this = this
            axios.get('/api/weibo/findAll/0/10').then(function (resp) {
                _this.weibo = resp.data.content
                _this.pageSize = resp.data.size
                _this.total = resp.data.totalElements
            })
        },
        methods:{
            page(currentPage){
                const _this = this
                axios.get('/api/weibo/findAll/'+(currentPage - 1)+'/10').then(function (resp){
                    _this.weibo = resp.data.content
                    _this.pageSize = resp.data.size
                    _this.total = resp.data.totalElements
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
    .weibo{
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
<template>
    <div id="main">
        <div id="boxRow" v-for="item in image">
            <div id="box">
                <div style="border-bottom: 2px solid gray">
                    <img style="width: 100%" :src="item.imageSrc"/>
                </div>
                <div style="display: flex;flex-direction: row;">
                    <p style="margin-left: 10%">{{item.imageBox}}</p>
                    <p>——</p>
                    <p>{{item.imageDes}}</p>
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
        name: "mImage",
        data(){
            return{
                image:[{}],
                total:0,
                pagesize:0,
            }
        },
        created() {
            var _this = this
            axios.get('/api/image/findAll/0/3').then(function (resp) {
                _this.image = resp.data.content
                _this.pageSize = resp.data.size
                _this.total = resp.data.totalElements
            })
        },
        methods:{
            page(currentPage){
                const _this = this
                axios.get('/api/image/findAll/'+(currentPage - 1)+'/3').then(function (resp){
                    _this.image = resp.data.content
                    _this.pageSize = resp.data.size
                    _this.total = resp.data.totalElements
                })
            }
        }
    }
</script>

<style scoped>
    #main{
        width: 98%;
        margin-left: 1%;
        display: flex;
        flex-direction:column;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-image: url("https://tsx-1302788370.file.myqcloud.com/sysImage/back5.jpg");
        background-repeat: repeat;
    }
    #boxRow{
        margin-top: 4%;
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    #box{
        display:flex;
        flex-direction: column;
        width: 100%;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        border: 2px solid gray;
        background-color: white;
    }
</style>
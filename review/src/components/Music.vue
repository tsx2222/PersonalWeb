<template>
    <div style="width:100%;">
        <audio id="audio" autoplay="autoplay">
            <source :src=this.audiosrc />
        </audio>
        <img :src=this.imgsrc style="height: 100%;width: 100%"/>
    </div>
</template>

<script>
    export default {
        name: "Music",
        inject:["reload"],
        props:{
            audiosrc:'',
            imgsrc:'',
        },
        mounted(){
            var that = this
            var audio = document.getElementById("audio");
            audio.addEventListener('ended', function(){
                that.isEnded()
                }
            , false);
        },
        computed(){

        },
        methods:{
            isEnded(){
                this.$emit('end',1)
            },
            peform(){
                var audio = document.getElementById('audio');
                if (this.$store.state.isPause === true) {
                    audio.pause()
                } else if(this.$store.state.isPause === false){
                    audio.play()
                }
            }
        }
    }
</script>

<style scoped>

</style>
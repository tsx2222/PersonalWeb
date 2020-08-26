import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Input, Pagination, Carousel,Form,FormItem,Icon,CarouselItem,Dialog, MessageBox } from 'element-ui';

//import 'element-ui/lib/theme-chalk/index.css';
import VueWechatTitle from 'vue-wechat-title'
import './plugins/axios'

Vue.config.productionTip = false

Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Icon)
Vue.use(CarouselItem)
Vue.use(Carousel)
Vue.use(Button)
Vue.use(Input)
Vue.use(Pagination)
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(VueWechatTitle);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

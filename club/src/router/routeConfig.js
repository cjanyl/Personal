
import HelloWorld from '../components/HelloWorld';

export default {
  routeConfig:[
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
  ],

  authType: 'white',  //白名单 white 可以跳过登录 | 黑名单 black 不可以跳过登录
  whiteList: [
    /^\/login/,
    /^\/system\/systemHelp\/componentDoc/
  ],
  blackList: [

  ],

}

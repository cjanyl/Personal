
import HelloWorld from '../components/HelloWorld';
import Login from '../login/login';
import Register from '../register/register';
import User from '../user/user';

export default {
  routeConfig:[
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
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

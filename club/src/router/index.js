import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from './routeConfig'

Vue.use(Router)


let router = new Router({
  mode: 'history',
  routes: routerConfig.routeConfig,
});


router.beforeEach((to, from, next) => {
  if(to.path === '/'){
    next('/HelloWorld')
  }else{
    if (to.meta.title) {
      document.title = 'Cjanyl-'+to.meta.title;
    }else{
      document.title = 'Cjanyl';
    }

    //验证地址是否需要登录
    let checkUrl = () => {
      return new Promise((resolve, reject) => {
        let flag;
        if(routerConfig.authType === 'white'){
          routerConfig.whiteList.forEach(pathRule => {
            if(pathRule.test(to.path)){
              flag = true;
            }
          });
        }else if(routerConfig.authType === 'black'){
          flag = true;
          routerConfig.blackList.forEach(pathRule => {
            if(pathRule.test(to.path)){
              flag = false;
            }
          });
        }

        if(flag){
          resolve();
        }else{
          reject();
        }
      })
    };

    //验证是否已登录
    let checkLogin = () => {
      return new Promise((resolve, reject) => {
        if(router.app.$store.state.userInfo){
          resolve();
        }else{
          router.app.$store.commit('init');
          if(router.app.$store.state.userInfo){
            resolve();
          }else{
            router.app.$store.dispatch('autoLoginByCookie')
              .then(() => resolve())
              .catch(() => reject());
          }
        }
      })
    };

    next();
    // checkLogin().then(() => next()).catch(() => {
    //   checkUrl().then(() => next()).catch(() => {
    //     let redirectUrl = to.path;
    //     for(let key in to.query){
    //       if(redirectUrl.indexOf('?') >= 0){
    //         redirectUrl += `&`;
    //       }else{
    //         redirectUrl += `?`;
    //       }
    //       redirectUrl += `${key}=${to.query[key]}`;
    //     }
    //     next(`/login?redirectUrl=${encodeURIComponent(redirectUrl)}`);
    //   })
    // });
  }
});

export default router;

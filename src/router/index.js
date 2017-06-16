import Vue from 'vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter);

//配置路由
let routes = [{
    path: '*',
    component: resolve => require(['../pages/index.vue'], resolve)
}, {
    path: '/',
    component: resolve => require(['../pages/index.vue'], resolve)
}, {
    path: '/index',
    component: resolve => require(['../pages/index.vue'], resolve)
}, {
    path: '/aboutUs',
    component: resolve => require(['../pages/aboutUs.vue'], resolve)
}, {
    path: '/drugsEncy',
    component: resolve => require(['../pages/drugsEncy.vue'], resolve)
}, {
    path: '/entrance',
    component: resolve => require(['../pages/entrance.vue'], resolve)
}, {
    path: '/filiale',
    component: resolve => require(['../pages/filiale.vue'], resolve)
}, {
    path: '/forget',
    component: resolve => require(['../pages/forget.vue'], resolve)
}, {
    path: '/info',
    component: resolve => require(['../pages/info.vue'], resolve)
}, {
    path: '/login',
    component: resolve => require(['../pages/login.vue'], resolve)
}, {
    path: '/market',
    component: resolve => require(['../pages/market.vue'], resolve)
}, {
    path: '/member',
    component: resolve => require(['../pages/member.vue'], resolve),
    children: [{
        path: '/member/addressManagement',
        component: resolve => require(['../pages/member/addressManagement.vue'], resolve)
    }, {
        path: '/member/companyCertification',
        component: resolve => require(['../pages/member/companyCertification.vue'], resolve)
    }, {
        path: '/member/myNeed',
        component: resolve => require(['../pages/member/myNeed.vue'], resolve)
    }, {
        path: '/member/myReportPrice',
        component: resolve => require(['../pages/member/myReportPrice.vue'], resolve)
    }, {
        path: '/member/myResource',
        component: resolve => require(['../pages/member/myResource.vue'], resolve)
    }, {
        path: '/member/mySuggest',
        component: resolve => require(['../pages/member/mySuggest.vue'], resolve)
    }, {
        path: '/member/personalCertification',
        component: resolve => require(['../pages/member/personalCertification.vue'], resolve)
    }, {
        path: '/member/personalInformation',
        component: resolve => require(['../pages/member/personalInformation.vue'], resolve)
    }, {
        path: '/member/preSaleOrder',
        component: resolve => require(['../pages/member/preSaleOrder.vue'], resolve)
    }, {
        path: '/member/purchaseOrder',
        component: resolve => require(['../pages/member/purchaseOrder.vue'], resolve)
    }, {
        path: '/member/saleOrder',
        component: resolve => require(['../pages/member/saleOrder.vue'], resolve)
    }]
}, {
    path: '/need',
    component: resolve => require(['../pages/need.vue'], resolve)
}, {
    path: '/orderConfirm',
    component: resolve => require(['../pages/orderConfirm.vue'], resolve)
}, {
    path: '/presell',
    component: resolve => require(['../pages/presell.vue'], resolve)
}, {
    path: '/presellConfirm',
    component: resolve => require(['../pages/presellConfirm.vue'], resolve)
}, {
    path: '/register',
    component: resolve => require(['../pages/register.vue'], resolve)
}, {
    path: '/resource',
    component: resolve => require(['../pages/resource.vue'], resolve)
}, {
    path: '/spec',
    component: resolve => require(['../pages/spec.vue'], resolve)
}, {
    path: "/aboutUsNew",
    component: resolve => require(['../pages/aboutUsNew.vue'], resolve),
    children: [{
        path: "/aboutUsNew/about",
        component: resolve => require(['../pages/aboutUsNew/about.vue'], resolve),
        children: [{
            path: "/aboutUsNew/about/contact",
            component: resolve => require(['../pages/aboutUsNew/about/contact.vue'], resolve),

        }, {
            path: "/aboutUsNew/about/corporate",
            component: resolve => require(['../pages/aboutUsNew/about/corporate.vue'], resolve),

        }, {
            path: "/aboutUsNew/about/development",
            component: resolve => require(['../pages/aboutUsNew/about/development.vue'], resolve),

        }, {
            path: "/aboutUsNew/about/honor",
            component: resolve => require(['../pages/aboutUsNew/about/honor.vue'], resolve),

        }, {
            path: "/aboutUsNew/about/initiator",
            component: resolve => require(['../pages/aboutUsNew/about/initiator.vue'], resolve),

        }, {
            path: "/aboutUsNew/about/profile",
            component: resolve => require(['../pages/aboutUsNew/about/profile.vue'], resolve),

        }, {
            path: "/aboutUsNew/about/teamStyle",
            component: resolve => require(['../pages/aboutUsNew/about/teamStyle.vue'], resolve),

        }]
    }, {
        path: "/aboutUsNew/help",
        component: resolve => require(['../pages/aboutUsNew/help.vue'], resolve),
        children: [{
            path: "/aboutUsNew/help/helpRegister",
            component: resolve => require(['../pages/aboutUsNew/help/helpRegister.vue'], resolve),

        }, {
            path: "/aboutUsNew/help/helpSeek",
            component: resolve => require(['../pages/aboutUsNew/help/helpSeek.vue'], resolve),

        }]
    }, {
        path: "/aboutUsNew/law",
        component: resolve => require(['../pages/aboutUsNew/law.vue'], resolve),
        children: [{
            path: "/aboutUsNew/law/statement",
            component: resolve => require(['../pages/aboutUsNew/law/statement.vue'], resolve)
        }]
    }, {
        path: "/aboutUsNew/media",
        component: resolve => require(['../pages/aboutUsNew/media.vue'], resolve),
        children: [{
            path: "/aboutUsNew/media/reports",
            component: resolve => require(['../pages/aboutUsNew/media/reports.vue'], resolve)
        }]
    }]
}, {
    path: '/drugsEncyDetail/:id',
    component: resolve => require(['../pages/drugsEncyDetail/_id.vue'], resolve)
}, {
    path: '/echart/:id',
    component: resolve => require(['../pages/echart/_id.vue'], resolve)
}, {
    path: '/industry/:id',
    component: resolve => require(['../pages/industry/_id.vue'], resolve)
}, {
    path: '/needDetail/:id',
    component: resolve => require(['../pages/needDetail/_id.vue'], resolve)
}, {
    path: '/presellDetail/:id',
    component: resolve => require(['../pages/presellDetail/_id.vue'], resolve)
}, {
    path: '/publish/:type/:id',
    component: resolve => require(['../pages/publish/_type/_id.vue'], resolve)
}, {
    path: '/publish/:type',
    component: resolve => require(['../pages/publish/_type/_id.vue'], resolve)
}, {
    path: '/resourceDetail/:id',
    component: resolve => require(['../pages/resourceDetail/_id.vue'], resolve)
}, {
    path: '/resourcePub/:id',
    component: resolve => require(['../pages/resourcePub/_id.vue'], resolve)
}]
var router = new vueRouter({
    mode: 'history',
    hashbang: true,
    history: true,
    saveScrollPosition: true,
    suppressTransitionError: true,
    linkActiveClass: "myactive",
    routes: routes
});
// router.beforeEach((to, from, next) => {
//   // ...
//   console.log(to, from);
// })
// router.beforeEach((to, from, next) => {
//     console.log(to, from);
//     let toPath = to.path
//     let fromPath = from.path
//     console.log(`to: ${toPath} from: ${fromPath}`)
//     if (toPath.replace(/[^/]/g, '').length > 1) {
//         router.app.isIndex = false
//     } else {
//         let depath = toPath === '/' || toPath === '/invite' || toPath === '/rank'
//         router.app.isIndex = depath ? 0 : 1
//     }
//     next()
// })

export default router;

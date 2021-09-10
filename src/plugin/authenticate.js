import store from '../store'

const ifNotauthenticated = (to, from, next) => {

    if (store.getters["user/isLogin"] === false) {
        next();
    } else {
        next({
            name: 'home-page',

            query: {
                redirect: to.name
            }
        })
    }

}

const ifauthenticated = (to, from, next) => {
    if (store.getters["user/isLogin"] === true) {
        next();
    } else {
        next({
            name: 'login',
            query: {
                redirect: to.name
            }
        })
    }
}

export {
    ifNotauthenticated,
    ifauthenticated
}
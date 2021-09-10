// console.log("==========================")
// console.log("demoAsync")


// function frist() {
//     console.log("frist run");
//     setTimeout(() => {
//         console.log('tương tác server')
//     })
// }

// function second() {
//     console.log("trước khi gọi function frist()");
//     frist();
//     console.log("sau khi gọi function frist()");

// }

// second();
// console.log("==========================")


function login(username, password) {
    console.log('serve đang xử lí ....');
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log('serve xử lí thành công ....');

            let data = {
                username: username,
                password: 'phamlanchinh',
                isLogin: true,
                userId: 'nguoidung01'
            }
            resolve(data);
            // let err = {
            //     err: "lỗi",
            //     isLogin: false,

            // }
            // reject(err)
        }, 2000);
    })
}

function getPostUserId(userid) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log("server getPostUserId xử lí thành công", userid);
            let data = [

                {
                    postId: 1,
                    content: 'nguyễn lan chinh'
                },
                {
                    postId: 2,
                    content: 'trần thị trinh'
                },
            ];
            resolve(data);
        }, 4000);
    })
}
// login('admin', 'admin').then(function(data) {
//     console.log('một số đoạn code xử lí sau login')
//     console.log('sau khi Promise xử lí thành công')
//     return {
//         demo: 'abc',
//         demo: 'xử lí xong công việc thứ 2',
//         data: data
//     }
// }).then(function(data) {
//     console.log('xử lí lần 3', data)
// });
// login('admin', 'admin')
//     .then(function(data) {
//         console.log("success", data)
//         getPostUserId(data.userId).then(function(data) {
//             console.log('data post ', data)
//         })
//     })
//     .catch(function(err) {
//         console.log("err", err)

//     })
async function handleLoginUser() {
    var resultLogin = await login('admin', 'admin');
    var resultPost = await getPostUserId(resultLogin.userId);

    console.log('resultLogin', resultLogin);
    console.log('resultPost', resultPost);

}
// handleLoginUser();

var resultPost = fetch('http://api-meme-zendvn-01.herokuapp.com/api/post/getListPagination.php?pagesize=3&currPage=1');

var start = new Date().getTime();
resultPost.then(function(response) {
    var end = new Date().getTime();
    // console.log('respose', response);
    console.log("time = ", end / start);
    return response.json();
}).then(function(MyJson) {
    console.log(MyJson);

});
// console.log("resultPost =", resultPost);
console.log("==========================")
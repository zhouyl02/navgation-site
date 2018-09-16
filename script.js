// 1. 初始化数据
var links = [
    {
        q:'qq.com',
        w:'wordart.com',
        e:'ele.me',
        r:'renren.com',
        t:'twitter.com',
        y:'youtube.com',
        u:'ubuntu.com',
        i:'iciba.com',
        o:'office.com',
        p:'processon.com'
    },
    {
        a:'alipay.com',
        s:'shadowsocks.org',
        d:'deepin.org',
        f:'facebook.com',
        g:'github.com',
        h:'hackerrank.com',
        j:'jirengu.com',
        k:'kugou.com',
        l:'leetcode.com'
    },
    {
        z:'zhihu.com',
        x:'xunlei.com',
        c:'csdn.net',
        v:'vuejs.org',
        b:'undefined',
        n:'nodejs.org',
        m:'material-ui.com'
    }
];
var rows_keys = new Array();
var rows_values = new Array();
for (var i = 0; i < links.length; i++) {
    rows_keys[i] = Object.keys(links[i]);
    rows_values[i] = Object.values(links[i]);
};

// 2. 创建页面主要布局
createSearchBar();
createInputEvent();
createSearchEvent();
for (var i = 0; i < 3; i++) {
    createKeyBoard(rows_keys[i],rows_values[i]);
};

// 3. 监听用户动作
listenToUser();

// 4. 添加使用说明
createDescription();

//下面是工具函数
// function getFromLocalStorage(name) {
//     return JSON.parse(localStorage.getItem(name) || 'null');
// }
// // 取出 localStorage 中的 zzz 对应的 hash
// var hashInLocalStorage = getFromLocalStorage('zzz')
// if (hashInLocalStorage) {
//     links = hashInLocalStorage
// }
// return {
//     "links": links
// }
function createSearchBar(){
    var body = document.querySelector("body");
    var form = document.createElement("form");
    var input = document.createElement("input");
    var baidu = document.createElement("a");
    var google = document.createElement("a");
    input.setAttribute("type","text");
    input.setAttribute("spellcheck","false");
    input.setAttribute("placeholder","Search，点击百度或谷歌搜索");
    input.setAttribute("class","keypress");
    baidu.setAttribute("class","baidu");
    google.setAttribute("class","google");
    baidu.textContent = "百度";
    google.textContent = "谷歌";
    body.appendChild(form);
    form.appendChild(input);
    form.appendChild(baidu);
    form.appendChild(google);
}
function createInputEvent(){
    var body = document.querySelector("body");
    var input = document.querySelector("input");
    body.onclick = function (evt){
        if(evt.target.localName == "input"){
            input.setAttribute("autofocus","autofocus");
        }else{
            input.removeAttribute("autofocus");
        } 
    }
}

function createSearchEvent(){
    var search_buttons = document.querySelectorAll("a");
    for (var i = 0; i < search_buttons.length; i++) {
        search_buttons[i].onclick = function (evt){
            var question = document.querySelector("input").value;
            if (question) {
                switch(evt.target.className) {
                    case "baidu": window.open("https://www.baidu.com/s?wd=" + question); break;
                    case "google": window.open("https://www.google.com/search?q=" + question); break;
                }
            }
        }
    }
}
function createKeyBoard(arr1,arr2){
    var body = document.querySelector("body");
    var div = document.createElement('div');
    body.appendChild(div);
    for (let i = 0; i < arr1.length; i++) {
        var kbd = document.createElement('kbd');
        kbd.setAttribute("title", arr2[i]);
        kbd.textContent = arr1[i];
        div.appendChild(kbd);
        kbd.onclick = function (evt){
            window.open("//" + evt.target.getAttribute("title"),"_blank");
        };
    }
};
function listenToUser(){
    window.onkeydown = function(evt){
        var input = document.querySelector("input");
        if (!input.getAttribute("autofocus")){
            evt.preventDefault();
            if (evt.ctrlKey) {
                switch(evt.code){
                    case "KeyE": editKeyBoard(); break;
                };
            } else {
                if (!evt.altKey) {
                    var kbds = document.querySelectorAll("kbd");
                    for (var i = 0; i < kbds.length; i++) {
                        if (evt.code.lastIndexOf(kbds[i].innerText) == 3) {
                            window.open("//" + kbds[i].getAttribute("title"),"_blank");
                        }
                    }
                }
            }
        }
    }
}

function editKeyBoard(){
    var letter = prompt("您想修改哪个字母的导航？");
    var user_link = prompt("新的导航地址为？");
    if (letter && user_link) {
        var letter_uppercase = letter.toUpperCase();
        var result = letter_uppercase.match(/[a-zA-Z]/g);
        if (result && result.length == 1) {
            alert("修改成功！");
            var kbds = document.querySelectorAll("kbd");
            for (var i = 0; i < kbds.length; i++) {
                if (kbds[i].innerText == letter_uppercase) {
                    kbds[i].setAttribute("title", user_link);
                }
            }
        } else {
            alert("请输入有效的单个字母或导航地址！");
        }
    } else {
        alert("字母和导航地址需要同时填写");
    }
}
function createDescription(){
    var body = document.querySelector("body");
    var p = document.createElement("p");
    p.setAttribute("class","description");
    p.innerHTML = "<span>使用说明</span>:<br>1. <span>Ctrl + E</span> 可自定义与字母关联的导航地址<br>2. <span>刷新页面</span> 可恢复默认字母导航地址<br>3. 修改时字母和导航地址 <span>不区分大小写</span> "
    body.appendChild(p);
}

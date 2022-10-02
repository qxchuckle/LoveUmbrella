const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
var oError = document.getElementById("error_box");
const account1 = document.querySelector(".input1");
const password1 = document.querySelector(".input2");
const account2 = document.querySelector(".input3");
const password2 = document.querySelector(".input4");
const email = document.querySelector(".input5");
window.onload = function () {
	var item = document.getElementsByClassName("item");
	var it = item[0].getElementsByTagName("div");

	var content = document.getElementsByClassName("content");
	var con = content[0].getElementsByTagName("div");

	for (let i = 0; i < it.length; i++) {
		it[i].onclick = function () {
			for (let j = 0; j < it.length; j++) {
				it[j].className = '';
				con[j].style.display = "none";
			}
			this.className = "active";
			it[i].index = i;
			con[i].style.display = "block";
			oError.innerHTML = "";
		}
	}
}
function setCookies(obj, limitTime) {
	let data = new Date(new Date().getTime() + limitTime * 24 * 60 * 60 * 1000).toUTCString()
	for (let i in obj) {
		document.cookie = i + '=' + obj[i] + ';expires=' + data
	}
}
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
var cookieValue = getCookie('token');
//自动登录
if (cookieValue) {
	fetch('自动登录接口', {
		method: "POST",
		body: JSON.stringify({ token: cookieValue }),
		headers: {
			"Content-Type": "application/json"
		},
	})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject('QAQ出错啦');
			}
		})
		.then(data => {
			console.log(data);
			if (data.login) {
				oError.innerHTML = "自动登录成功";
				setCookies({
					name: '登录token',
					token: data.list.token,
				}, 7);
				if (!href.indexOf('/zhuye/')) {
					window.location.href = '/zhuye/';
				}
			} else {
				if (!href.indexOf('/login/')) {
					window.location.href = '/login/';
				}
			}
		});
} else {
	var href = location.href
	if (!href.indexOf('/login/')) {
		window.location.href = '/login/';
	}
}
//登录
btn1.addEventListener("click", function () {
	if (account1.value.length > 20 || account1.value.length < 2) {
		oError.innerHTML = "账号请输入2-20位字符";
		return;
	}
	if (password1.value.length > 20 || password1.value.length < 6) {
		oError.innerHTML = "密码请输入6-20位字符"
		return;
	} else for (var i = 0; i < password1.value.charCodeAt(i); i++) {
		if ((password1.value.charCodeAt(i) < 48) || (password1.value.charCodeAt(i) > 57) && (password1.value.charCodeAt(i) < 97) || (password1.value.charCodeAt(i) > 122)) {
			oError.innerHTML = "密码必须为字母跟数字组成";
			return;
		}
	}

	fetch('http://127.0.0.1:4523/m1/1703731-0-default/login', {
		method: "POST",
		body: JSON.stringify({ account: account1.value, password: password1.value }),
		headers: {
			"Content-Type": "application/json"
		},
	})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject('QAQ出错啦');
			}
		})
		.then(data => {
			console.log(data);
			oError.innerHTML = "登录成功";
			setCookies({
				name: '登录token',
				token: data.list.token,
			}, 7)
			window.location.href = '/zhuye/';
		});
});


//登录
btn2.addEventListener("click", function () {
	if (account2.value.length > 20 || account2.value.length < 2) {
		oError.innerHTML = "账号请输入2-20位字符";
		return;
	}
	if (password2.value.length > 20 || password2.value.length < 6) {
		oError.innerHTML = "密码请输入6-20位字符"
		return;
	} else for (var i = 0; i < password2.value.charCodeAt(i); i++) {
		if ((password2.value.charCodeAt(i) < 48) || (password2.value.charCodeAt(i) > 57) && (password2.value.charCodeAt(i) < 97) || (password2.value.charCodeAt(i) > 122)) {
			oError.innerHTML = "密码必须为字母跟数字组成";
			return;
		}
	}
	var email_Regex = new RegExp('^.+@[A-Z0-9a-z]+\.[a-zA-Z]+$');
	if (!email_Regex.test(email.value)) {
		oError.innerHTML = "邮箱格式不正确";
		return;
	}
	oError.innerHTML = "";


	// fetch('注册接口', {
	// 	method: "POST",
	// 	body: JSON.stringify({ account: account2.value, password: password2.value, email: email.value }),
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	},
	// })
	// 	.then(response => {
	// 		if (response.ok) {
	// 			return response.json();
	// 		} else {
	// 			return Promise.reject('QAQ出错啦');
	// 		}
	// 	})
	// 	.then(data => {
	// 		console.log(data);
	// 		oError.innerHTML = "注册成功";
	//      window.location.href = '/login/';
	// 	});
});














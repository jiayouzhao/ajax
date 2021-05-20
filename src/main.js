
getCss.onclick = function() {
	const ajax = new XMLHttpRequest();

	ajax.open("GET", "/style");

	ajax.onload = () => {
		
		const style = document.createElement("style");
		style.innerHTML = ajax.response;
		document.head.appendChild(style);
	};
	ajax.onerror = () => {
		console.log("获取失败");
	};
	ajax.send();
};

getJS.onclick = () => {
	const ajax = new XMLHttpRequest();
	ajax.open("get", "2.js");
	ajax.onload = () => {
		const script = document.createElement("script");
		script.innerHTML = ajax.response;
		document.body.appendChild(script);
	};
	ajax.onerror = () => {};
	ajax.send();
};

getHtml.onclick = () => {
	
	const ajax = new XMLHttpRequest();
	ajax.open("get", "3.html");
	ajax.onreadystatechange = () => {
		//下载完成，但是不确定是否成功
		if (ajax.readyState === 4) {

			if (ajax.status >= 200 && ajax.status < 300) {
				const div = document.createElement("div");
				div.innerHTML = ajax.response;
				document.body.appendChild(div);
			} else {
				alert("加载html失败");
			}
		}
	};
	ajax.send();
};

getXml.onclick = () => {
	const ajax = new XMLHttpRequest();
	ajax.open("get", "4.xnl");
	ajax.onreadystatechange = () => {
		if (ajax.readyState === 4) {
			
			if (ajax.status == 200) {
				let xml = ajax.responseXML;
				let text = xml.getElementsByTagName("warning")[0].textContent.trim();
				console.log(text);
			} else {
				alert("加载xml失败");
			}
		} 
	};
	ajax.send();
};

getJson.onclick = () => {
	const ajax = new XMLHttpRequest();
	ajax.open("get", "5.json");
	ajax.send();
	ajax.onreadystatechange = () => {
		if (ajax.readyState === 4) {
			if (ajax.status === 200) {
				userName.innerText = JSON.parse(ajax.response).name;
			} else {
				alert("加载json失败");
			}
		}
	};
};
let n = 1;

getNext.onclick = () => {
	
	if (n > 2) {
		getNext.disabled = "disabled";
		getNext.innerText = "无数据";
		return; 
	}
	const ajax = new XMLHttpRequest();
	
	ajax.open("get", `page${n + 1}`);
	ajax.send();
	ajax.onreadystatechange = () => {
		if (ajax.readyState === 4 && ajax.status === 200) {
			let result = JSON.parse(ajax.response);
			let template = document.createElement("template");

			template.innerHTML = result.map((item) => {
				return `<li>${item.id}</li>`;
			}).join("");
			//console.log(template.content);
			xxx.appendChild(template.content);
			n++;
		}
	};
};
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();



//計算載入的頁數
let loadPage = 1

function load() {
    let url = 'https://padax.github.io/taipei-day-trip-resources/taipei-attractions.json';
    xhr.open('GET', url);
    xhr.send(null);

    xhr.onload = function () {
        let ulDom = document.querySelector('.mainList')
        let fragment = document.createDocumentFragment();
        data = JSON.parse(xhr.responseText)

        //將原本ul裡面的子節點全部移除
        while (ulDom.firstChild) {
            ulDom.removeChild(ulDom.firstChild);
        }

        for (let i = 0; i <= loadPage*8-1; i++) {
           
            //取得單筆資料
            let singleData = data.result.results[i];
            //新增li 標籤
            let liDom = document.createElement('li');
            //新增<div class="imgContainer">
            let imgContainer = document.createElement('div');
            imgContainer.setAttribute('class', 'imgContainer')
            //新增img標籤 並設定src
            let imgDom = document.createElement('img');
            let imgUrl = singleData.file.toLowerCase().indexOf('.jpg');
            imgUrl = singleData.file.slice(0, imgUrl + 4);
            imgDom.setAttribute('src', imgUrl);
            imgContainer.appendChild(imgDom)
            //新增p標籤 顯示地名
            let pDom = document.createElement('p');
            let pText = document.createTextNode(data.result.results[i].stitle);
            pDom.appendChild(pText)

            //將dom新增到虛擬document中
            fragment.appendChild(liDom).appendChild(imgContainer).appendChild(pDom)
        }
        ulDom.appendChild(fragment);
        loadPage++;
    }

}

load();
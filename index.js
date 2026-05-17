
import {
    actionAddWater,
    chooseBot,
    downFunction,
    changeBotWater,
    upFunction,
    successIf
} from './method.js'


// 所有瓶子
let botArr = new Array()

// 小瓶子长度
let botArrLength = 5



// 小瓶子
let bot1 = new Array()
let bot2 = new Array()
let bot3 = new Array()
let bot4 = new Array()
let bot5 = new Array()
let bot6 = new Array()
let bot7 = new Array()

// 选择空满瓶数组
let haveBot = []
let emptyBot = []



/* 
每个瓶子里面有五层水 每个小数组有五个元素
*/



// 动态渲染页面

function renderPage() {
    // 获取盒子

    let botList = []
    for (let i = 1; i < 8; i++) {
        // const element = array[i];
        let botName = document.querySelector(`.bot${i}`)
        botList.push(botName)
    }
    // 清除div





    // console.log(botList);

    /*     瓶子样式
        let bot1 = document.querySelector('.bot1')
        let bot2 = document.querySelector('.bot2')
        let bot3 = document.querySelector('.bot3')
        let bot4 = document.querySelector('.bot4')
        let bot5 = document.querySelector('.bot5')
        let bot6 = document.querySelector('.bot6')
        let bot7 = document.querySelector('.bot7')
     */
    // 添加5个盒子在里面
    // botList.forEach((element,index) => {

    // });
    for (let index = 0; index < 7; index++) {
        console.log(botArr[index]);
        if (botArr[index].length !== 0) {
            botArr[index].forEach((item, i) => {
                let div = document.createElement('div')
                div.className = item
                botList[index].appendChild(div)
            });
        }
        else {
            let div = document.createElement('div')
            botList[index].appendChild(div)
        }
    }

}

// 页面加载 设定五个满屏 两个空瓶
document.addEventListener(

    'DOMContentLoaded', function () {
        // 开始 前五个瓶子满水
        botArr[0] = actionAddWater('red', bot1, botArrLength)
        botArr[1] = actionAddWater('orange', bot2, botArrLength)
        botArr[2] = actionAddWater('pink', bot3, botArrLength)
        botArr[3] = actionAddWater('blue', bot4, botArrLength)
        botArr[4] = actionAddWater('yellow', bot5, botArrLength)
        // 留两个空瓶子
        botArr[5] = []
        botArr[6] = [];
        // 遍历有水和没水的瓶子
        ({ haveBot, emptyBot } = chooseBot(haveBot, emptyBot, botArr, botArrLength))


        // debugger

        let gameNumber = Math.floor(Math.random() * 200) + 50
        // console.log(gameNumber);

        let i = 0
        while (i !== gameNumber) {
            // console.log(botArrLength);

            changeBotWater(haveBot, emptyBot, botArr, botArrLength);
            // 每次执行完要重新判断有水无水
            haveBot = [];
            emptyBot = [];
            ({ haveBot, emptyBot } = chooseBot(haveBot, emptyBot, botArr, botArrLength))
            // console.log(haveBot);
            // console.log(emptyBot);

            // debugger

            i++
        }
        // console.log(botArr);

        renderPage();









    }
)


let botClickEvent = 0
let colorData = ''
let clickId = 0
let idCheck = 0
// 设定一个量存刚才点击没放下的dom
let botDom = ''

// 点击事件
function botClick(element) {


    let id = element.dataset.id
    // console.log(id + 1);


    // 视觉上移 获取点击的dom
    let botClickData = document.querySelector(`.bot${Number(id) + 1}`)








    // 如果点完再点自己，放下水瓶
    if (clickId == id && botClickEvent) {
        console.log('放下水瓶');
        downFunction(botClickData);
        botClickEvent = !botClickEvent
        // 每次点击清除掉一个 要在这里恢复
        botArr[id].push(colorData)
        colorData = ''
        console.log(botArr);

        return
    }




    // 判断重复点击事件

    // 无法往空瓶子里面塞东西
    if (botArr[id].length !== 0) {
        // 第一次点击
        // console.log('空瓶bug，来到这了', botClickEvent);
        if (!botClickEvent) {
            upFunction(botClickData)
            botDom = botClickData
            console.log(botDom);

            colorData = botArr[id].pop()
            // console.log(botDom);

            // downFunction(botClickData)  

        } else {

            // 判断长度
            if (botArr[id].length == botArrLength && colorData) {
                console.log('水满了，不能加了');
                idCheck = !idCheck
                // clickId = 0
                // botClickEvent = !botClickEvent
                return
            }
            // push需要同种颜色
            // console.log(bot1.at(-1));

            if (colorData == botArr[id].at(-1)) {
                botArr[id].push(colorData)
                // 清除div
                // console.log(document.getElementsByClassName('bot'));

                document.querySelectorAll('.bot').forEach(el => {
                    el.innerHTML = ''
                })
                // console.log(document.getElementsByClassName('bot').innerHTML);
                renderPage();
                downFunction(botDom)
            }
            else {
                console.log('颜色不对，无法执行');
                // console.log(botClickData);
                // console.log(botDom);
                botArr[clickId].push(colorData)
                colorData = ''

                downFunction(botDom)

            }


        }
        // colorData = ''



        console.log(JSON.parse(JSON.stringify(botArr)));

    }
    else {
        console.log('这是空瓶子');

        if (botClickEvent) {
            // console.log('可以点击');
            // console.log(colorData);
            botArr[id].push(colorData)
            document.querySelectorAll('.bot').forEach(el => {
                el.innerHTML = ''
            })
            // console.log(document.getElementsByClassName('bot').innerHTML);


            renderPage();
            downFunction(botDom)



        }

    }
    botClickEvent = !botClickEvent
    clickId = id

    console.log(successIf(botArr, botArrLength), "!!!!!!!!!");


    // 判断是否胜利
    if (successIf(botArr, botArrLength)) {
        setTimeout(() => {
            alert('胜利了，游戏结束')
            setTimeout(() => {
                location.reload()
            }, 400);
        }, 300);
    }



}



window.botClick = botClick
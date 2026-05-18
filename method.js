// 页面加载往瓶子里面添加水 
function actionAddWater(element, array, arrlength) {
    // console.log('水加好了');
    for (let index = 0; index < arrlength; index++) {
        // const element = array[index];
        array.push(element)

    }
    return array
}

//遍历选出能加水的瓶子和不能加水的瓶子
function chooseBot(haveBot, emptyBot, botArr, botArrLength) {
    botArr.forEach((element, i) => {
        // 判断有没有水 
        // 有水
        if (element.length !== 0) {
            haveBot.push(i)
        } else {
            // 没水
            emptyBot.push(i)
        }

        // 可以加水的未满瓶子也要放进来
        if (emptyBot.length == 0) {
            // console.log('执行了');
            botArr.forEach((item, i) => {
                // console.log(item);

                if (item.length !== botArrLength && item.length < botArrLength) {
                    emptyBot.push(i)
                    // console.log(emptyBot);

                }

            })

        }
        // console.log(emptyBot);

    });
    // console.log(emptyBot);
    // 遍历时候判断是否有胜利条件


    return { haveBot, emptyBot }

}

// 有水的瓶子随机往没水的瓶子中添加最后一个数组
function changeBotWater(haveBot, emptyBot, botArr, botArrLength) {
    // console.log(haveBot, emptyBot);

    // 有水没水随机抽
    let haveNumber = Math.floor(Math.random() * haveBot.length)
    let emptyNumber = Math.floor(Math.random() * emptyBot.length)
    // let haveNumber1 = Math.floor(Math.random() * haveBot.length)
    // console.log(emptyNumber);

    // 没满的瓶子也可以随机加水



    // console.log(haveBot);

    // console.log(emptyBot);

    botArr[emptyBot[emptyNumber]].push(botArr[haveBot[haveNumber]].pop())
    // console.log(botArr);



    return botArr



}

// 点击上移
function upFunction(el) {
    el.style.transform = 'translateY(-50px)';
    el.style.transform = 'transform: skewX(-3deg)';
    el.style.transform = 'transform-origin: bottom center';
    el.style.transition = '.5s'; // 平滑动画
    /* 
    transform: skewX(-3deg);
transform-origin: bottom center;
    */

}

//点击下沉
function downFunction(el) {
    console.log("放下？", el);

    el.style.transform = 'translateY(0px)';
    el.style.transition = '.5s'; // 平滑动画
}

//判断胜利
function successIf(botArr, botArrLength) {
    // 如果botArr 的内容有五个长度等于5并且里面的颜色是一样的  说明游戏结束 胜利
    /* botArr.forEach(element => {
        // 长度为5的 数组
        if (element.length == botArrLength) {
            // 判断颜色是否一样
            if (element.every(item => item == element[0])) {
                // console.log("游戏结束");
                return true
            }
        }
    }); */
    // return botArr.every(element => {
    /* onsole.log(element.length);
        
        return element.length === botArrLength && element.every(item => item === element[0]); */

    // 第一步：筛选出【装满了 + 颜色一样】的瓶子
    const fullBottles = botArr.filter(item => {
        // 必须是数组 + 装满了 + 颜色全部一样
        return Array.isArray(item)
            && item.length === botArrLength
            && item.every(color => color === item[0])
    })

    // 第二步：够 5 个就胜利
    const isWin = fullBottles.length >= 5
    return isWin
    // });


}



export {
    actionAddWater,
    chooseBot,
    changeBotWater,
    upFunction,
    downFunction,
    successIf
}
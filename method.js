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
    el.style.transition = '.5s'; // 平滑动画

}

//点击下沉
function downFunction(el){
    console.log("放下？",el);
    
    el.style.transform = 'translateY(0px)';
    el.style.transition = '.5s'; // 平滑动画
}



export { actionAddWater, chooseBot, changeBotWater, upFunction ,downFunction}
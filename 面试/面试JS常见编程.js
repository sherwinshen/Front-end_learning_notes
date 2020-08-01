// 防抖
function debounce(func, delayTime) {
    let timer
    return function () {
        let context = this
        let args = arguments
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(context, args)
        }, delayTime)
    }
}

// 节流
function throttle(func, delayTime) {
    let flag
    return function () {
        let context = this
        let args = arguments
        if (!flag) {
            flag = true
            setTimeout(() => {
                func.apply(context, args)
                flag = false
            })
        }

    }

}

// JSONP
const script = document.createElement('script');
script.src = 'http://localhost:8080/?callback=displayData&&user=envision';
document.body.append(script);

function displayData(data) {
    console.log(data);
}

// setTimeout 实现 setInterval
function mySetInterval(fn, delayTime) {
    const innerSetTimeout = function () {
        fn()
        setTimeout(innerSetTimeout, delayTime)
    }
    setTimeout(innerSetTimeout, delayTime)
}

// 深拷贝
function deepClone(obj) {
    const newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' || 'function' ? deepClone(obj[key]) : obj[key]
        }
    }
    return newObj
}

// bind
Function.prototype.myBind = function () {
    const fn = this
    const args = Array.from(arguments).slice(1)
    const context = Array.from(arguments)[0]

    return function () {
        return fn.apply(this instanceof fn ? this : context, args.concat(...arguments))
    }
};




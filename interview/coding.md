# 面试常见编程

## 一. 算法相关

![](./img/总结.png)

### 1.1 直接插入排序

```javascript
function insertSort(array) {
    for (let i = 1; i < array.length; i++) {
        const temp = array[i]
        let j
        for (j = i - 1; j > 0; j--) {
            if (array[j] > temp) {
                array[j + 1] = array[j]
            } else {
                break
            }
        }
        array[j + 1] = temp
    }
    return array
}
```

### 1.2 折半插入排序

```javascript
function binaryInsertSort(array) {
    const binarySearch = function (i, target) {
        let left = 0
        let right = i
        while (left <= right) {
            const mid = Math.floor((left + right) / 2)
            if (array[mid] < target) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        return left
    }
    for (let i = 1; i < array.length; i++) {
        const temp = array[i]
        const index = binarySearch(i, temp)
        for (let j = i; j > index; j--) {
            array[j] = array[j - 1]
        }
        array[index] = temp
    }
    return array
}
```

### 1.3 希尔排序

```javascript
function shellSort(array) {
    let gap = Math.floor(array.length / 2)
    while (gap) {
        for (let i = gap; i < array.length; i++) {
            const temp = array[i]
            let j
            for (j = i - gap; j > 0; j -= gap) {
                if (array[j] > temp) {
                    array[j + gap] = array[j]
                } else {
                    break
                }
            }
            array[j + gap] = temp
        }
        gap = Math.floor(gap / 2)
    }
    return array
}
```

### 1.4 冒泡排序

```javascript
function bubbleSort(array) {
    const swap = function (i, j) {
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    for (let i = 0; i < array.length; i++) {
        let flag = false; // 如果一趟排序未发生改变则排序完成
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                flag = true
                swap(j, j + 1)
            }
        }
        if (!flag) break
    }
    return array
}
```

### 1.5 快速排序

```javascript
function quickSort(array) {
    const partition = function (low, high) {
        const temp = array[low]
        while (low < high) {
            while (low < high && array[high] >= temp) {
                high--
            }
            array[low] = array[high]
            while (low < high && array[low] < temp) {
                low++
            }
            array[high] = array[low]
        }
        array[low] = temp
        return low
    }
    const sort = function (low, high) {
        if (low < high) {
            const index = partition(low, high)
            sort(low, index - 1)
            sort(index + 1, high)
        }
    }
    sort(0, array.length - 1)
    return array
}
```

### 1.6 归并排序

```javascript
function mergeSort(array) {
    const merge = function (arr1, arr2) {
        let result = []
        let i = 0
        let j = 0
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] < arr2[j]) {
                result.push(arr1[i])
                i++
            } else {
                result.push(arr2[j])
                j++
            }
        }

        if (i < arr1.length) result = result.concat(arr1.slice(i))
        if (j < arr2.length) result = result.concat(arr2.slice(j))
        return result
    }
    const recursion = function (array) {
        if (array.length === 0 || array.length === 1) return array
        const index = Math.floor(array.length / 2)
        const left_arr = recursion(array.slice(0, index))
        const right_arr = recursion(array.slice(index))
        return merge(left_arr, right_arr)
    }
    return recursion(array)
}
```

### 1.7 选择排序

```javascript
function selectSort(array) {
    const swap = function (i, j) {
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    const findMax = function (i) {
        let min = array[i]
        let index = i
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < min) {
                min = array[j]
                index = j
            }
        }
        return index
    }
    for (let i = 0; i < array.length; i++) {
        const index = findMax(i)
        swap(i, index)
    }
    return array
}
```

### 1.8 位运算

```javascript
// 左移
// a << b 可看成 a * (2 ^ b) 
10 << 1 // -> 20

// 右移
// a >> b 可看成 a / (2 ^ b)
13 >> 1 // -> 6

// 按位与 &
// 转成二进制，每一位都为 1，结果才为 1
8 & 7 // 1000 & 0111 -> 0000 -> 0

// 按位或 ｜
// 转成二进制，其中一位为 1，结果就是 1
8 | 7 // 1000 | 0111 -> 1111 -> 15

// 按位异或 ^
// 转成二进制，每一位都不同，结果才为 1
8 ^ 7 // 1000 ^ 0111 -> 1111 -> 15
```

✍️ 右移操作常用于二分法取中间值 `a >> 1`。

✍️  按位异或常用于一个数组除了某个元素只出现一次以外，其余每个元素均出现两次的那个唯一元素，所有数据异或即可。



## 二. JS相关

### 1.1 防抖/节流

```javascript
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
```

```javascript
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
```

### 1.2 JSONP

```javascript
const script = document.createElement('script');
script.src = 'http://localhost:8080/?callback=displayData&&user=envision';
document.body.append(script);

function displayData(data) {
    console.log(data);
}
```

### 1.3 setTimeout 实现 setInterval

```javascript
function mySetInterval(fn, delayTime) {
    const innerSetTimeout = function () {
        fn()
        setTimeout(innerSetTimeout, delayTime)
    }
    setTimeout(innerSetTimeout, delayTime)
}
```

### 1.4 深拷贝

```javascript
function deepClone(obj) {
    const newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' || 'function' ? deepClone(obj[key]) : obj[key]
        }
    }
    return newObj
}
```

### 1.5 bind

```javascript
Function.prototype.myBind = function () {
    const fn = this
    const args = Array.from(arguments).slice(1)
    const context = Array.from(arguments)[0]

    return function () {
        return fn.apply(this instanceof fn ? this : context, args.concat(...arguments))
    }
};
```
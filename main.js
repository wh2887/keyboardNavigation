const keys = document.querySelectorAll('.key')
const website = document.querySelector('.website')
const submit = document.querySelector('.submit')
const select = document.querySelector('.abc')
let userUrl = ""
let userKey = ""
const mask = document.querySelector('.mask')
const closeElement = document.querySelector('.close')
const cancel = document.querySelector('.cancel')
const setting = document.querySelector('.settings')
let sites = window.localStorage.getItem("siteStorage")
let sitesObject = JSON.parse(sites)
let hashMap = sitesObject || [
    { id: '1', key: 'A', url: 'baidu.com', logo: 'noLogo' },
    { id: '2', key: 'A', url: 'baidu2.com', logo: 'noLogo2' },
    { id: '3', key: 'B', url: 'baidu3.com', logo: 'noLogo3' },
    { id: '4', key: 'B', url: 'baidu4.com', logo: 'noLogo4' },
    { id: '4', key: 'B', url: 'baidu4.com', logo: 'noLogo5' },
]
// 保证 key 不重复
let uniqueHashMap = Object.values(
    hashMap.reduce((uniqueHashMapMap, item) => {
        uniqueHashMapMap[item.key] = item
        return uniqueHashMapMap
    }, [])
)


const render = () => {
    keys.forEach(key => {
        // 得到 每个 按键元素  => 从而 获取到按键上的 大写字母 key.innerText
        // 大写字母需要和 谁 对比？
        hashMap.forEach(node => {
            // 得到 每个 {id,key,url,logo} 对象 ，也就是一个 node , node 中有 node.key 大写的
            if (key.innerText === node.key) {
                while (key.hasChildNodes()) {
                    key.removeChild(key.firstChild)
                }
                key.innerText = node.key
                const img = document.createElement('img')
                img.src = node.url + node.logo   // 设置  img 的src 地址 用于展示 图片
                key.appendChild(img)
            }
            key.addEventListener('mousedown', () => {
                key.classList.add('shadow-down')
            })
            key.addEventListener('mouseup', () => {
                key.classList.remove('shadow-down')
            })
            key.addEventListener('mouseout', () => {
                key.classList.remove('shadow-down')
            })
            // let xxx = (e) => {
            //     if (e.key === node.key) {
            //         window.open(node.url)
            //         // location.assign(node.url)
            //     }
            // }
            // document.addEventListener('keypress', xxx)

        })

    })
}
render()

submit.addEventListener('click', () => {
    userUrl = website.value
    userKey = select.options[select.selectedIndex].text
    hashMap.forEach((node, index) => {

    })
    render()
})

window.onbeforeunload = () => {
    let string = JSON.stringify(uniqueHashMap);
    window.localStorage.setItem("siteStorage", string);
};

// 关闭 | 显示 弹窗
function close() {
    mask.style.display = 'none'
}
function show() {
    mask.style.display = 'block'
}
closeElement.addEventListener('click', () => {
    close()
})
cancel.addEventListener('click', () => {
    close()
})

setting.addEventListener('click', () => {
    show()
})


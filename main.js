const keys = document.querySelectorAll('.key')
const clearButton = document.querySelector('.clear')
const select = document.querySelector('.abc')
const website = document.querySelector('.website')
const submit = document.querySelector('.submit')
let userUrl = ""
let userKey = ""
const mask = document.querySelector('.mask')
const closeElement = document.querySelector('.close')
const cancel = document.querySelector('.cancel')

let sites = window.localStorage.getItem("siteStorage")
let sitesObject = JSON.parse(sites)
// console.log('sitesObject', )
let hashMap = sitesObject || [
    { id: 0, key: 'B', url: 'https://www.baidu.com', logo: '/favicon.ico' },
    { id: 1, key: 'T', url: 'https://www.taobao.com', logo: '/favicon.ico' }
]


const render = () => {
    keys.forEach(key => {
        hashMap.forEach(node => {
            if (key.innerText === node.key) {
                while (key.hasChildNodes()) {
                    key.removeChild(key.firstChild)
                }
                key.innerText = node.key
                const img = document.createElement('img')
                img.src = node.url + node.logo
                key.appendChild(img)
                key.addEventListener('click', (e) => {
                    select.value = e.target.innerText
                    if (e.target.innerText === node.key) {
                        website.value = node.url
                    }
                    show()
                })
            }
            else {
                key.addEventListener('click', (e) => {
                    select.value = e.target.innerText
                    show()
                })
            }
        })
        key.addEventListener('mousedown', () => {
            key.classList.add('shadow-down')
        })
        key.addEventListener('mouseup', () => {
            key.classList.remove('shadow-down')
        })
        key.addEventListener('mouseout', () => {
            key.classList.remove('shadow-down')
        })
    })
}
render()

submit.addEventListener('click', () => {
    userKey = select.value
    userUrl = website.value
    hashMap.forEach((node, index) => {
        if (node.url === userUrl) {
            let usedNodeIndex = index
            hashMap.splice(usedNodeIndex, 1)
        }
        hashMap.push({ id: '3', key: userKey, url: userUrl, logo: '/favicon.ico' })
    })
    render()
    close()
})

window.onbeforeunload = () => {
    // 保证 key 不重复
    let uniqueHashMap = Object.values(
        hashMap.reduce((uniqueHashMap, item) => {
            uniqueHashMap[item.key] = item
            return uniqueHashMap
        }, [])
    )
    let string = JSON.stringify(uniqueHashMap);
    window.localStorage.setItem("siteStorage", string);
    hashMap = uniqueHashMap
};

// 关闭 | 显示 弹窗
function close() {
    mask.style.display = 'none'
    website.value = ""
}
function show() {
    document.removeEventListener('keypress', openWebsite, false)   // 删除 keypress 事件，防止输入时跳转。
    mask.style.display = 'block'
}
closeElement.addEventListener('click', () => {
    close()
})
cancel.addEventListener('click', () => {
    close()
    document.addEventListener('keypress', openWebsite, false)
})

// 清空 数据
clearButton.addEventListener('click', () => {
    hashMap = [{}]
    window.reload()
})

//  打开网页
let openWebsite = (e) => {
    console.log('2', 2)
    hashMap.forEach(node => {
        if (node.key.toLowerCase() === e.key) {
            if (node.key = e.key.toUpperCase()) {
                // window.open(node.url)
                location.assign(node.url)
            }
        }
    })
}
document.addEventListener('keypress', openWebsite, false)

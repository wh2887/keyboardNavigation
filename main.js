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
    { id: 0, key: 'B', url: 'https://baidu.com', logo: '/favicon.ico' },
    { id: 0, key: 'J', url: 'https://jingdong.com', logo: '/favicon.ico' },
]


const render = () => {
    keys.forEach(key => {
        hashMap.forEach(node => {
            if (key.innerText === node.key) {
                // 删除 key 原有的子元素 ，再更新子元素。
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
            } else {
                key.addEventListener('click', (e) => {
                    select.value = e.target.innerText
                    if (e.target.innerText === node.key) {
                        website.value = node.url
                    }
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
    hashMap.push({
        id: '3', key: userKey, url: userUrl, logo: '/favicon.ico'
    })
    render()
    close()
})


window.onbeforeunload = () => {
    // 保证 key 不重复
    let uniqueHashMap = Object.values(
        hashMap.reduce((uniqueHashMapMap, item) => {
            uniqueHashMapMap[item.key] = item
            return uniqueHashMapMap
        }, [])
    )
    let string = JSON.stringify(uniqueHashMap);
    window.localStorage.setItem("siteStorage", string);
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

setting.addEventListener('click', () => {
    show()
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

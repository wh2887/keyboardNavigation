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
            }
            let openWebsite = (e) => {
                console.log('e.key', e.key)   // 两层循环，导致了 log 出了 26*(e.key) 数量的东西
                if (e.key === node.key.toLowerCase()) {
                    window.open(node.url)
                    // location.assign(node.url)
                }
            }
            document.addEventListener('keypress', openWebsite, false)
            website.addEventListener('input', () => {
                document.removeEventListener('keypress', openWebsite)
            })
        })
        key.addEventListener('click', (e) => {
            const clickedElement = e.target
            select.value = e.target.innerText
            show()
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


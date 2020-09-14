const keys = document.querySelectorAll('.key')
let sites = window.localStorage.getItem("siteStorage")
let sitesObject = JSON.parse(sites)
let hashMap = sitesObject || [{ id: 'default', key: '#', url: 'testUrl', logo: 'noLogo' }]


const website = document.querySelector('.website')
const submit = document.querySelector('.submit')
const select = document.querySelector('.abc')
let userUrl = ""
let userKey = ""

const mask = document.querySelector('.mask')
const closeElement = document.querySelector('.close')
const cancel = document.querySelector('.cancel')
const setting = document.querySelector('.settings')

const render = () => {
    hashMap.forEach((node, i) => {
        keys.forEach((key, j) => {
            key.addEventListener('mousedown', () => {
                key.classList.add('shadow-down')
            })
            key.addEventListener('mouseup', () => {
                key.classList.remove('shadow-down')
            })
            key.addEventListener('mouseout', () => {
                key.classList.remove('shadow-down')
            })
            if (node.key === key.innerText) {
                const img = document.createElement('img')
                img.src = node.logo
                key.appendChild(img)
            }
        })
        let xxx = (e) => {
            if (e.key === node.key) {
                window.open(node.url)
                // location.assign(node.url)
            }
        }
        document.addEventListener('keypress', xxx)
    })
}
render()

window.onbeforeunload = () => {
    let string = JSON.stringify(hashMap);
    window.localStorage.setItem("siteStorage", string);
};


submit.addEventListener('click', () => {
    userUrl = website.value
    userKey = select.options[select.selectedIndex].text
    hashMap.forEach((node, index) => {
        if (node.key === userKey) {
            let repeat = index
            let result = window.confirm("按键已被设置，您确定要覆盖之前的设置吗？")

            if (result) {
                // 确定 要 覆盖
                hashMap.splice(repeat, 1, { id: '替换的', key: userKey, url: userUrl, logo: userUrl + '/favicon.ico' })
            } else { return }
        } else if (node.url === userUrl) {
            window.alert('输入的网址已经被设置了，请重新输入新的网址！')
        } else {
            hashMap.push({
                id: 0,
                key: userKey,
                url: userUrl,
                logo: userUrl + '/favicon.ico'
            })
            render()
            close()
        }
    })
    render()
})



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


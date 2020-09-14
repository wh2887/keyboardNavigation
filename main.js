const keys = document.querySelectorAll('.key')
let sites = window.localStorage.getItem("siteStorage")
let sitesObject = JSON.parse(sites)
let hashMap = sitesObject


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
    const abc = select.options[select.selectedIndex].text
    userUrl = website.value
    userKey = abc
    hashMap.push({
        id: 0,
        key: userKey,
        url: userUrl,
        logo: userUrl + '/favicon.ico'
    })
    render()
    close()
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

console.log('hashMap:', hashMap)

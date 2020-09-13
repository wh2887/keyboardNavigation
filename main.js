const keys = document.querySelectorAll('.key')
let sites = window.localStorage.getItem("siteStorage")
let sitesObject = JSON.parse(sites)
let hashMap = [
    {
        id: 0,
        key: 'g',
        url: 'https://www.google.com',
        logo: './images/谷歌.png'
    },
    {
        id: 1,
        key: 'b',
        url: 'https://www.bilibili.com',
        logo: './images/哔哩哔哩.png'
    },
]

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
        if (node.key === key.innerText.toLowerCase()) {
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

window.onbeforeunload = () => {
    let string = JSON.stringify(hashMap);
    window.localStorage.setItem("siteStorage", string);
};











const website = document.querySelector('.website')
const submit = document.querySelector('.submit')
const select = document.querySelector('.abc')


submit.addEventListener('click', () => {
    let url = ""
    let key = ""
    const abc = select.options[select.selectedIndex].text
    url = website.value
    key = abc
})















const setting = document.querySelector('.settings')
setting.onclick = function () {
    // document.removeEventListener('keypress', xxx)
    mask.style.display = 'block'
}
const close = document.querySelector('.close')
const cancel = document.querySelector('.cancel')
const mask = document.querySelector('.mask')
close.addEventListener('click', () => {
    mask.style.display = 'none'
})
cancel.addEventListener('click', () => {
    mask.style.display = 'none'
})




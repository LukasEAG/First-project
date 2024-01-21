//Navbar

const menuOpenBtns = document.querySelectorAll('.nav__mobile-menu-btn--open')
const menuCloseBtn = document.querySelector('.nav__mobile-menu-btn--close')
const mobileMenu = document.querySelector('.nav__menu')
const menuItems = document.querySelectorAll('.nav__menu-item')
const body = document.querySelector('body')

menuOpenBtns.forEach(btn =>
	btn.addEventListener('click', () => {
		mobileMenu.classList.add('active')
		btn.classList.add('hide-btn')
		menuCloseBtn.classList.add('show-btn')
		body.classList.add('stop-scrolling')
		langList.classList.remove('active-lang')
	})
)

menuCloseBtn.addEventListener('click', () => {
	mobileMenu.classList.remove('active')
	menuOpenBtns.forEach(btn => btn.classList.remove('hide-btn'))
	menuCloseBtn.classList.remove('show-btn')
	body.classList.remove('stop-scrolling')
})

menuItems.forEach(item => {
	item.addEventListener('click', () => {
		mobileMenu.classList.remove('active')
		menuOpenBtns.forEach(btn => btn.classList.remove('hide-btn'))
		menuCloseBtn.classList.remove('show-btn')
		body.classList.remove('stop-scrolling')
	})
})

// Multilanguage menu

const multiLangBtns = document.querySelectorAll('.nav__more-lang-btn')
const langList = document.querySelector('.nav__lang-list')

multiLangBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		langList.classList.toggle('active-lang')
		mobileMenu.classList.remove('active')
		menuOpenBtns.forEach(btn => btn.classList.remove('hide-btn'))
		menuCloseBtn.classList.remove('show-btn')
		body.classList.remove('stop-scrolling')
	})
})

const closeLang = () => {
	langList.classList.toggle('active-lang')
}

// const closeLangOutside = e => {
// 	if ( e.target.classList.contains('nav__more-lang-btn')) return

// 	closeLang()
// }

// window.addEventListener('click', closeLangOutside)

// Gallery carousel

const gallerySlider = document.querySelector('.showreel__gallery-img-box')
const buttons = document.querySelectorAll('[data-carousel-button]')
const galleryBox = document.querySelector('.showreel__gallery-img-box')

buttons.forEach(button => {
	button.addEventListener('click', () => {
		const offset = button.dataset.carouselButton === 'next' ? 1 : -1

		const imgPos = document.querySelectorAll('.showreel__position')

		imgPos.forEach((slide, index) => {
			const indexSlide = gallerySlider.querySelector(`[data-slide-${index}]`)

			let newSlide = [...imgPos].indexOf(indexSlide) + offset

			if (newSlide < 0) newSlide = imgPos.length - 1
			if (newSlide > imgPos.length - 1) newSlide = 0

			imgPos[newSlide].dataset[`slide-${index}`] = true
			delete indexSlide.dataset[`slide-${index}`]
		})
	})
})

const showRellMobileBtns = document.querySelectorAll('[data-show-btn]')
const nextBtn = document.querySelector('[data-show-btn="next"]')
const prevBtn = document.querySelector('[data-show-btn="prev"]')
let contentWidth = 1600

showRellMobileBtns.forEach(button => {
	button.addEventListener('click', () => {
		let counter = button.dataset.showBtn === 'next' ? 1 : -1

		const imgList = button.closest('[data-carousel]').querySelector('[data-carousel-imgs]')

		const activeImg = imgList.querySelector('[data-active]')

		let newActiveImg = (newActiveImg = [...imgList.children].indexOf(activeImg) + counter)

		if (newActiveImg < 0) newActiveImg = imgList.children.length - 1
		if (newActiveImg >= imgList.children.length) newActiveImg = 0

		imgList.children[newActiveImg].dataset.active = true
		delete activeImg.dataset.active
	})
})

window.addEventListener('resize', () => {
	let insetWindowWidth = window.innerWidth
	let boxWidth = insetWindowWidth / contentWidth
	galleryBox.style.transform = boxWidth >= 1 ? 'scale(1)' : `scale(${boxWidth})`
})
window.addEventListener('load', () => {
	let insetWindowWidth = window.innerWidth
	let boxWidth = insetWindowWidth / contentWidth
	galleryBox.style.transform = boxWidth >= 1 ? 'scale(1)' : `scale(${boxWidth})`
})

// Questions accordeon

const accordeon = document.querySelector('.questions__box-lists')
const accordeonBtns = document.querySelectorAll('.questions__accordeon-box-content')

function openAccordeonItems() {
	if (this.nextElementSibling.classList.contains('show-acc')) {
		this.nextElementSibling.classList.remove('show-acc')
		this.lastElementChild.classList.remove('active')
	} else {
		closeAccordeonItems()
		this.nextElementSibling.classList.toggle('show-acc')
		this.lastElementChild.classList.toggle('active')
	}
}

const closeAccordeonItems = () => {
	const allActiveItems = document.querySelectorAll('.questions__accordeon-info')
	allActiveItems.forEach(item => item.classList.remove('show-acc'))
	accordeonBtns.forEach(btn => {
		btn.lastElementChild.classList.remove('active')
	})
}

const clickOutsideAccordeon = e => {
	if (
		e.target.classList.contains('target') ||
		e.target.classList.contains('questions__accordeon-info') ||
		e.target.classList.contains('questions__accordeon-info-text')
	)
		return

	closeAccordeonItems()
}

accordeonBtns.forEach(btn => {
	btn.addEventListener('click', openAccordeonItems)
})

window.addEventListener('click', clickOutsideAccordeon)

// Contact form budget

const budgetBoxFrom = document.querySelector('.contact__budget-box--from')
const budgetBoxTo = document.querySelector('.contact__budget-box--to')
const budgetInputFrom = document.querySelector('#budget-from')
const budgetInputTo = document.querySelector('#budget-to')

budgetInputFrom.addEventListener('focusin', () => {
	budgetInputFrom.value = ''

	budgetBoxFrom.classList.add('active')
})

budgetInputTo.addEventListener('focusin', () => {
	budgetInputTo.value = ''
	budgetBoxTo.classList.add('active')
})

budgetInputFrom.addEventListener('focusout', () => {
	budgetBoxFrom.classList.remove('active')
	budgetBoxTo.classList.remove('active')
})
budgetInputTo.addEventListener('focusout', () => {
	budgetBoxTo.classList.remove('active')
})

//Multi language

const langBtns = document.querySelectorAll('.nav__lang-btn')

let MultiLang = function (url, lang, onload) {
	this.phrases = {}

	this.selectedLanguage = (lang || navigator.language || navigator.userLanguage).substring(0, 2)

	this.onLoad = onload

	if (typeof url !== 'undefined') {
		let obj = this
		let req = new XMLHttpRequest()

		req.open('GET', url, true)
		req.onreadystatechange = function (evt) {
			if (evt.target.readyState == 4 && evt.target.status == 200) {
				this.phrases = JSON.parse(evt.target.responseText)

				this.setLanguage(this.selectedLanguage)

				if (this.onLoad) {
					this.onLoad()
				}
			}
		}.bind(obj)
		req.addEventListener(
			'error',
			function (e) {
				console.log('MultiLang.js: Error reading json file.')
			},
			false
		)

		req.send(null)
	}

	this.setLanguage = function (langcode) {
		if (!this.phrases.hasOwnProperty(langcode)) {
			for (let key in this.phrases) {
				if (this.phrases.hasOwnProperty(key)) {
					langcode = key
					break
				}
			}
		}

		this.selectedLanguage = langcode
	}

	this.get = function (key) {
		let str
		if (this.phrases[this.selectedLanguage]) str = this.phrases[this.selectedLanguage][key]

		str = str || key
		return str
	}
}
let multilang

function onLoad() {
	multilang = new MultiLang('dataLang.json', 'pl')
}

function langSelectChange(sel) {
	multilang.setLanguage(sel.value)
	refreshLabels()
}

function refreshLabels() {
	let allnodes = document.querySelectorAll('[data-lang]')

	for (let i = 0, max = allnodes.length; i < max; i++) {
		let idname = allnodes[i].dataset.lang
		if (idname != '') {
			allnodes[i].textContent = multilang.get(idname)
		}
	}
}

langBtns.forEach(btn =>
	btn.addEventListener('click', e => {
		langSelectChange(e.target)
	})
)

body.addEventListener('load', onLoad())
langBtns.forEach(btn =>
	btn.addEventListener('click', () => {
		langList.classList.remove('active-lang')
	})
)

//Contact form input list 

const btnFileUpload = document.querySelector('.contact__attachments-btn')
const hideFileInput = document.querySelector('.contact__attachments-input')
const fileUploadLabel = document.querySelector('.contact__attachments-label')
const labelOutput = []


btnFileUpload.addEventListener('click', (e) => {
	e.preventDefault()
	hideFileInput.click()
	
})

hideFileInput.addEventListener('change', () => {

	const filenameList = Array.prototype.map.call(hideFileInput.files, file =>  {
        return file.name;
      });
	  fileUploadLabel.innerText = 'Wybrane pliki:'

	  filenameList.map( file => {
		const fileListItem = document.createElement('li')
		fileListItem.innerText = file
		fileUploadLabel.appendChild(fileListItem)
	  })
		 
})

//X post embede


// Footer current year

const footerYear = document.querySelector('.footer__foot-year')
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()

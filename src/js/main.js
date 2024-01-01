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

// Multilanguage

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
	let contentWidth = 1600
	let boxWidth = insetWindowWidth / contentWidth
	galleryBox.style.transform = boxWidth >= 1 ? 'scale(1)' : `scale(${boxWidth})`
})
window.addEventListener('load', () => {
	let insetWindowWidth = window.innerWidth
	let contentWidth = 1600
	let boxWidth = insetWindowWidth / contentWidth
	galleryBox.style.transform = `scale(${boxWidth})`
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

//Contact form slider

const fromSlider = document.querySelector('#fromSlider')
const toSlider = document.querySelector('#toSlider')
const fromInput = document.querySelector('#fromInput')
const toInput = document.querySelector('#toInput')

function controlFromSlider(fromSlider, toSlider, fromInput) {
	const [from, to] = getParsed(fromSlider, toSlider)
	fillSlider(fromSlider, toSlider, '#C6C6C6', '#b60732', toSlider)
	if (from > to) {
		fromSlider.value = to
		fromInput.innerText = `${to} zł`
	} else {
		fromInput.innerText = `${from} zł`
	}
}

function controlToSlider(fromSlider, toSlider, toInput) {
	const [from, to] = getParsed(fromSlider, toSlider)
	fillSlider(fromSlider, toSlider, '#C6C6C6', '#b60732', toSlider)
	setToggleAccessible(toSlider)
	if (from <= to) {
		toSlider.value = to
		toInput.innerText = `${to} zł`
	} else {
		toInput.innerText = `${from} zł`
		toSlider.value = from
	}
}

function getParsed(currentFrom, currentTo) {
	const from = parseInt(currentFrom.value, 10)
	const to = parseInt(currentTo.value, 10)
	return [from, to]
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
	const rangeDistance = to.max - to.min
	const fromPosition = from.value - to.min
	const toPosition = to.value - to.min
	controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`
}

function setToggleAccessible(currentTarget) {
	const toSlider = document.querySelector('#toSlider')
	if (Number(currentTarget.value) <= 0) {
		toSlider.style.zIndex = 2
	} else {
		toSlider.style.zIndex = 0
	}
}

fillSlider(fromSlider, toSlider, '#C6C6C6', '#b60732', toSlider)
setToggleAccessible(toSlider)

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput)
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput)


// Footer current year

const footerYear = document.querySelector('.footer__foot-year')
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()


//Multi language


const langBtns = document.querySelectorAll('.nav__lang-btn')			


let MultiLang = function(url, lang, onload)
{
	
	this.phrases = {};

	this.selectedLanguage = (lang || navigator.language || navigator.userLanguage).substring(0, 2);
	
	this.onLoad = onload;

	if (typeof url !== 'undefined') {
		let obj = this;
		let req = new XMLHttpRequest();

		req.open("GET", url, true);
		req.onreadystatechange = function (evt) {
			if (evt.target.readyState == 4 && evt.target.status == 200) 
			{
				this.phrases = JSON.parse( evt.target.responseText );

				this.setLanguage(this.selectedLanguage);
				
				if (this.onLoad) {
					this.onLoad();
				}

			};
		}.bind(obj);
		req.addEventListener("error", function(e) {
			console.log('MultiLang.js: Error reading json file.');
		}, false);
		
		req.send(null);
	};

	this.setLanguage = function(langcode) {
		if (!this.phrases.hasOwnProperty(langcode)) {
			for (let key in this.phrases) {
				if (this.phrases.hasOwnProperty(key)) {
					langcode = key; 
					break;
				};
			};
		};

		this.selectedLanguage = langcode;
	};

	this.get = function(key) {
		let str;
		if (this.phrases[this.selectedLanguage]) str = this.phrases[this.selectedLanguage][key];

    str = (str || key)
		return str;
}
}
let multilang;


function onLoad() {

  multilang = new MultiLang('dataLang.json', 'en');
}

function langSelectChange(sel) {
  multilang.setLanguage(sel.value);
  refreshLabels();
}

function refreshLabels() {
  let allnodes = document.querySelectorAll("[data-lang]");

  
  for (let i=0, max=allnodes.length; i < max; i++) {
    let idname = allnodes[i].dataset.lang;
    if (idname != '') {
      allnodes[i].textContent = multilang.get(idname);
    };
  };
}

  langBtns.forEach(btn => 
    btn.addEventListener('click', e => {
      langSelectChange(e.target)

  })
  )

  body.addEventListener('load', onLoad())

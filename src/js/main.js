//Navbar

const menuOpenBtn = document.querySelector('.nav__mobile-menu-btn--open')
const menuCloseBtn = document.querySelector('.nav__mobile-menu-btn--close')
const mobileMenu = document.querySelector('.nav__menu')

menuOpenBtn.addEventListener('click', () => {
	mobileMenu.classList.add('active')
	menuOpenBtn.classList.add('hide-btn')
	menuCloseBtn.classList.add('show-btn')
})

menuCloseBtn.addEventListener('click', () => {
	mobileMenu.classList.remove('active')
	menuOpenBtn.classList.remove('hide-btn')
	menuCloseBtn.classList.remove('show-btn')
})

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
	console.log(e.target);
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

// function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
//     const [from, to] = getParsed(fromInput, toInput);
//     fillSlider(fromInput, toInput, '#C6C6C6', '#b60732', controlSlider);
//     if (from > to) {
//         fromSlider.value = to;
//         fromInput.innerText = to + ` zł`;
//     } else {
//         fromSlider.innerText = from + ` zł`;
//     }

// }

// function controlToInput(toSlider, fromInput, toInput, controlSlider) {
//     const [from, to] = getParsed(fromInput, toInput);
//     fillSlider(fromInput, toInput, '#C6C6C6', '#b60732', controlSlider);
//     setToggleAccessible(toInput);
//     if (from <= to) {
//         toSlider.value = to;
//         toInput.innerText = to + ` zł`;
//     } else {
//         toInput.innerText = from + ` zł`;
//     }
// }

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
// fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
// toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);

// Footer current year

const footerYear = document.querySelector('.footer__foot-year')
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()

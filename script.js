import items from './gallery-items.js';
const refs = {
	gallery: document.querySelector('.js-gallery'),
	lightbox: document.querySelector('.js-lightbox'),
	lightbox__overlay: document.querySelector('.lightbox__overlay'),
	lightbox__image: document.querySelector('.lightbox__image'),
	lightbox__button: document.querySelector('.lightbox__button'),
};
let index = 0;
const createListEl = function (arr) {
	let itemEL = arr.map((item) => {
		// ! создание элементов
		let itemLi = document.createElement('li');
		let linkEl = document.createElement('a');
		let imgEl = document.createElement('img');
		// ! Добавление классов
		imgEl.classList.add('gallery__image');
		itemLi.classList.add('gallery__item');
		linkEl.classList.add('gallery__link');
		// ! Добавление атрибутов
		imgEl.src = item.preview;
		imgEl.dataset.source = item.original;
		imgEl.alt = item.description;
		imgEl.dataset.id = index += 1;
		// ! Формирование структуры
		itemLi.append(linkEl);
		linkEl.append(imgEl);
		return itemLi;
	});
	return itemEL;
};
refs.gallery.append(...createListEl(items));

function openModal() {
	refs.lightbox.classList.add('is-open');
	refs.lightbox__image.src = event.target.dataset.source;
    index = parseInt(event.target.dataset.id);
    
	window.addEventListener('keydown', pressESC);
	window.addEventListener('keydown', leafRight);
	window.addEventListener('keydown', leafLeft);
}

function closeModal() {
	refs.lightbox.classList.remove('is-open');
	refs.lightbox__image.src = '';

	window.removeEventListener('keydown', pressESC);
	window.removeEventListener('keydown', leafRight);
	window.removeEventListener('keydown', leafLeft);
}

function pressESC() {
	if (event.code === 'Escape') {
		closeModal();
	}
}

function leafLeft() {
	if (event.code === 'ArrowLeft') {
		if (index !== 1) {
			index -= 1;
			//console.log(index);
			refs.lightbox__image.src = items[index - 1].original;
		} else {
			index = items.length;
			//console.log(index);
			refs.lightbox__image.src = items[index - 1].original;
		}
	}
}
function leafRight() {
	if (event.code === 'ArrowRight') {
		if (index < items.length) {
			index += 1;
			// console.log(index);
			refs.lightbox__image.src = items[index - 1].original;
		} else {
			index = 1;
			refs.lightbox__image.src = items[index - 1].original;
		}
	}
}
refs.gallery.addEventListener('click', () => {
	event.preventDefault;
	if (event.target.nodeName !== 'IMG') {
		return;
	}
	openModal();
});

refs.lightbox__button.addEventListener('click', closeModal);
refs.lightbox__overlay.addEventListener('click', () => {
	if (event.target === event.currentTarget) {
		closeModal();
	}
});

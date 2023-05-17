"use strict";
const JSCCommon = { 

	modalCall() {
		const link = '.btn-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// // infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			type: 'html',
			dragToClose: false,
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			showClass: "fancybox-throwOutUp",
			hideClass: "fancybox-throwOutDown",
			l10n: {
				CLOSE: "Закрыть",
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
				MODAL: "Вы можете закрыть это модальное окно с помощью клавиши ESC.",
				ERROR: "Что-то пошло не так. Пожалуйста, повторите попытку позже",
				IMAGE_ERROR: "Изображение не найдено",
				ELEMENT_NOT_FOUND: "HTML-элемент не найден",
				AJAX_NOT_FOUND: "Ошибка при загрузке AJAX: не найдено",
				AJAX_FORBIDDEN: "Ошибка при загрузке AJAX: запрещено",
				IFRAME_ERROR: "Ошибка загрузки iframe",
			},
			on: {
				// "loading": fancybox => this.forEditor(fancybox, this.makeTinyMceEditor),
				// "close": fancybox => this.forEditor(fancybox, this.removeEditor),
			}
		});
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		// Fancybox.bind('[data-fancybox]', {
		// 	placeFocusBack: false,
		// });
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if(!element) return;
			let modal = document.querySelector(element.dataset.src);
			const data = element.dataset;
			console.log(modal.querySelector("textarea.textarea-js"));
			


			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	},
	// /modalCall
	toggleMenu() {
    const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
    const menu = document.querySelector('.menu-mobile--js');
    toggle.forEach((el) => el.classList.toggle('on'));
    menu.classList.toggle('active');
    [document.body, document.querySelector('html')].forEach((el) => el.classList.toggle('fixed'));
  },
  closeMenu() {
    const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
    const menu = document.querySelector('.menu-mobile--js');
    toggle.forEach((element) => element.classList.remove('on'));
    if (menu) {
      menu.classList.remove('active');
      [document.body, document.querySelector('html')].forEach((el) => el.classList.remove('fixed'));
    }
  },
  mobileMenu() {
    document.addEventListener('click', (event) => {
        let container = event.target.closest('.menu-mobile--js'); // (1)
        let toggle = event.target.closest('.toggle-menu-mobile--js'); // (1)
        if (toggle) this.toggleMenu();
        if (!container && !toggle) this.closeMenu();
      },
      { passive: true },
    );

    // window.addEventListener('resize', () => {
    //     if (window.matchMedia('(min-width: 992px)').matches) this.closeMenu();
    //   },
    //   { passive: true },
    // );
  },

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({"mask":"+9(999)999-99-99", showMaskOnHover: false}).mask(InputTel);
	},
	// /inputMask
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});


		// async function submitForm(event) {
		// 	event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
		// 	try {
		// 		// Формируем запрос
		// 		const response = await fetch(event.target.action, {
		// 			method: 'POST',
		// 			body: new FormData(event.target)
		// 		});
		// 		// проверяем, что ответ есть
		// 		if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
		// 		// проверяем, что ответ действительно JSON
		// 		const contentType = response.headers.get('content-type');
		// 		if (!contentType || !contentType.includes('application/json')) {
		// 			throw ('Ошибка обработки. Ответ не JSON');
		// 		}
		// 		// обрабатываем запрос
		// 		const json = await response.json();
		// 		if (json.result === "success") {
		// 			// в случае успеха
		// 			alert(json.info);
		// 		} else {
		// 			// в случае ошибки
		// 			console.log(json);
		// 			throw (json.info);
		// 		}
		// 	} catch (error) { // обработка ошибки
		// 		alert(error);
		// 	}
		// }
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		$('.dd-head-js').on('click', function () {
      let clickedHead = this;
      $(this).parent().toggleClass('active');
      $(this)
        .next()
        .slideToggle(function () {
          $(this).toggleClass('active');
        });
    });
		// let parents = document.querySelectorAll('.dd-group-js');
		// for (let parent of parents) {
		// 	if (parent) {
		// 		// childHeads, kind of funny))
		// 		let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
		// 		$(ChildHeads).click(function () {
		// 			let clickedHead = this;

		// 			$(ChildHeads).each(function () {
		// 				if (this === clickedHead) {
		// 					//parent element gain toggle class, style head change via parent
		// 					$(this.parentElement).toggleClass('active');
		// 					$(this.parentElement).find('.dd-content-js').slideToggle(function () {
		// 						$(this).toggleClass('active');
		// 					});
		// 				}
		// 				else {
		// 					$(this.parentElement).removeClass('active');
		// 					$(this.parentElement).find('.dd-content-js').slideUp(function () {
		// 						$(this).removeClass('active');
		// 					});
		// 				}
		// 			});

		// 		});
		// 	}
		// }
	},
	imgToSVG() {
    const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);
	
			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
	
						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;
	
						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};
	
		convertImages('.img-svg-js');
		convertImages('.nav-icon img');
  },
	disabledBtn(input = '.form-wrap__policy input', btn = ".form-wrap__btn", parent = ".form-wrap") {
		$(document).on("change", input, function () {
			let btnDisabled = $(this).parents(parent).find(btn)
			if (this.checked) {
				btnDisabled.removeAttr('disabled');
			}
			else {
				btnDisabled.attr('disabled', 'disabled');
			}
		})
	},
	makeTinyMceEditor(selector = 'textarea.textarea-js') {
		tinymce.init({
			selector,
			plugins: 'lists',
			placeholder: 'Здесь ваш отзыв',
			menubar: false,
			toolbar_location: 'bottom',
			toolbar: 'blockquote bold h1 italic bullist numlist'
		});
		},
	removeEditor(selector = "textarea"){
		tinymce.activeEditor.remove(selector); 
		},
	forEditor(fancybox, event){
			let text = `.${fancybox.container.className} .textarea-js`;
			if (!document.querySelector(text)) return;
			event(text);
		}

};
const $ = jQuery;

JSCCommon.modalCall();
function eventHandler() { 
	// JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.imgToSVG();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	JSCCommon.disabledBtn();

	JSCCommon.makeTinyMceEditor();
	// let modalwithTextarea = document.querySelectorAll("textarea.textarea-js");
	// for (const text of modalwithTextarea) {
	// 	console.log(text);
	// }
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	// var x = window.location.host;
	// let screenName;
	// screenName = 'screen/'+document.body.dataset.bg;
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(${screenName});"></div>`);
	// }


	function setFixedNav() {
		let topNav = document.querySelector('.header');
		if (!topNav) return;
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		// console.log(scrollTop);

		scrollTop > 160 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
		scrollTop > 250 ? topNav.classList.add('fixed-animate') : topNav.classList.remove('fixed-animate');
		scrollTop > 400 ? topNav.classList.add('fixed-show') : topNav.classList.remove('fixed-show');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}
	
	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});
	
	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	const sContentswiper = new Swiper('.sContent__slider--js', {
		slidesPerView: 'auto',
		spaceBetween: 16,
		freeMode: true,
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	});

	// modal window

	document.addEventListener('click', function(e) {
		let seachBlockTarget = e.target.closest('.search-block__content');
		let toggleTarget = e.target.closest('.search-block__toggle--js')
		let toggle = document.querySelector('.search-block__toggle--js');
		let deleteTextTarget = e.target.closest('.search-block__close');
		if(toggle) {
			if(toggleTarget) {
				toggle.nextElementSibling.classList.toggle('active');
			} 
			if(!seachBlockTarget && !toggleTarget) {
				toggle.nextElementSibling.classList.remove('active');
			}
			if(deleteTextTarget) {
				toggle.nextElementSibling.querySelector('input').value = '';
				toggle.nextElementSibling.querySelector('input').focus();
				console.log(deleteTextTarget);
			}
		}
	});

	$('.commentsSidebar').hcSticky({
    stickTo: $('.sContent'),
		top: 108,
		bottom: 20
  });

	$('.sContent__socials-wrap').hcSticky({
    stickTo: $('.sContent'),
		top: 108,
		bottom: 20,
		mobileFirst: true,
		disable: true,
		responsive: {
			998: {
				disable: false
			}
		}
  });

	const inputElements = document.querySelectorAll('.filepond');
	if (inputElements) {
		FilePond.registerPlugin(FilePondPluginImagePreview);
		for (const inputElement of inputElements) {
			const pond = FilePond.create(inputElement, {
				iconRemove: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12L4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
				labelIdle: `
					<div class='customText-wrap'>
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="40" height="40" rx="20" fill="white"/>
							<path d="M20.7539 13.4639L23.4432 16.1532C23.7361 16.4461 24.211 16.4461 24.5039 16.1532C24.7968 15.8603 24.7968 15.3855 24.5039 15.0926L20.711 11.2997C20.3205 10.9091 19.6873 10.9091 19.2968 11.2997L15.5039 15.0926C15.211 15.3855 15.211 15.8603 15.5039 16.1532C15.7968 16.4461 16.2717 16.4461 16.5646 16.1532L19.2539 13.4639V22.8426C19.2539 23.2568 19.5897 23.5926 20.0039 23.5926C20.4181 23.5926 20.7539 23.2568 20.7539 22.8426V13.4639Z" fill="black"/>
							<path d="M11 23.75C11 23.3358 11.3358 23 11.75 23C12.1642 23 12.5 23.3358 12.5 23.75V26.9999C12.5 27.2761 12.7239 27.4999 13 27.4999H27C27.2761 27.4999 27.5 27.2761 27.5 26.9999V23.75C27.5 23.3358 27.8358 23 28.25 23C28.6642 23 29 23.3358 29 23.75V26.9999C29 28.1045 28.1046 28.9999 27 28.9999H13C11.8954 28.9999 11 28.1045 11 26.9999V23.75Z" fill="black"/>
						</svg>
						<div class='h5'>Добавить фотографии или видео</div>
						<p>Перетащите файлы сюда или <span>нажмите чтобы загрузить</span></p>
					</div>
				`
			});

			const radioTemplate = (id) =>{
				return ` 
						<input type="radio" name="param[ID]" value="${id}"/>
				`
			}
			pond.on('addfile', (error, file) => {
				if (error) {
					console.log('Oh no');
					return;
				}

				document.querySelector(`#filepond--item-${file.id}`).insertAdjacentHTML("beforeend", radioTemplate(file.id));
				console.log('File added', file.id);
			});
		}

	}
	$('.custom-select--js').select2({
		minimumResultsForSearch: -1,
		templateResult: format,
		templateSelection: format,
		escapeMarkup: function(m) {
			return m;
		},
	}).val(null).trigger("change");

	function format(state) {
		if (!state.id) return state.text; // optgroup
		return '<img src="' + state.element.dataset.img + '"/>' + state.text;
	}
	// document.addEventListener('click', function(event) {
	// 	let modalTarget = event.target.closest('[data-fancybox]')
		
	// 	if(modalTarget) {
	// 	}
	// })

	$('.backToTop').on('click', function() {
		window.scroll(0, 0);
	});

	document.addEventListener('click', function(event) {
		let modalTarget = event.target.closest('[data-fancybox]');
		if(modalTarget) {
			try {
				let imgItems = document.querySelectorAll('.form-wrap__item');
				for (const imgItem of imgItems) {
					imgItem.querySelector('input').onchange = function (evt) {
						var tgt = evt.target || window.event.srcElement,
						files = tgt.files; 
						var fr = new FileReader();
						console.log(fr);
						if (FileReader && files && files.length) {
							fr.onload = function () {
								imgItem.querySelector('.form-wrap img').src = fr.result;
								imgItem.querySelector('.form-wrap__btn-delete').classList.add("active");
								imgItem.classList.add("active");
							}
							fr.readAsDataURL(files[0]); 
						}
						
					}
				
					imgItem.addEventListener("click", function(event){
						let target = event.target.closest(".form-wrap__btn-delete");
						if(this.classList.contains("active") || target) {
							event.stopPropagation();
							imgItem.querySelector('.form-wrap img').src = '#';
							this.classList.remove("active")
							imgItem.querySelector('.form-wrap__btn-delete').classList.remove("active");
							imgItem.src = "";
							imgItem.querySelector('input').value = "";
						} 
		
					})
		
			}
			} catch (error) {
				
			}
		}
	});


	// document.addEventListener('click', function(event) {
		// let modalTarget = event.target.closest('[data-fancybox');
		// if(modalTarget) {
	
		// }
	// });
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
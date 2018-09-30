//Waiting for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

	//Remove sal css link
	removeCSSLink();

	//Sal function
	sal({
		threshold: 1,
		once: true,
	})
	
	//Calling the funcitons
	addActiveClass();

	//addMenuActiveClassOnScrolling();
	
	scrollToTopBtn();

	toggleMobileNav();

	getYear();

});

//Function for adding active class to the navigation links
function addActiveClass() {

	//Variable (for all navigation links)
	let links = document.querySelectorAll('.grid__header--nav--imagelink, .grid__header--nav--item'); //Getting all links

	//Loop through the links and add active class to the current clicked link
	for (let i = 0; i < links.length; i++) {

		//Adding click event on the all links
		links[i].addEventListener('click', function() {

			//Link with active class
			let activeLink = document.getElementsByClassName('active'); //Find el. with active class on it

			//Removing active class from the previous link
			activeLink[0].className = activeLink[0].className.replace(' active', ''); //Replace active class wtih empty space on the el. with active class

			//Adding active class to the clicked link
			this.classList.add('active');
		});
	}
}

//Function for toggle mobile navigation
function toggleMobileNav() {

	//Getting the elements
	let hamburgerBtn = document.getElementById('mobileNav'),
		navigation = document.querySelector('.grid__header--nav'),
		mobileNavLink = document.querySelectorAll('.grid__header--nav--item');

	//Adding click event on the mobile menu button
	hamburgerBtn.addEventListener('click', function() {
		//Toggle classes on the mobile menu btn and main navigation
		hamburgerBtn.classList.toggle('active-mobile');
		navigation.classList.toggle('open');
	});

	//Looping thrught all navigation link and adding click event on them
	for (let i = 0; i < mobileNavLink.length; i++) {
		
		mobileNavLink[i].addEventListener('click', function() {
			//On click on the nav link remove open and active menu class
			navigation.classList.remove('open');
			hamburgerBtn.classList.remove('active-mobile');
		});
	}
}

//Function for seting date to the page
function getYear() {

	//Initate date
	let date = new Date(),
		dateElement = document.getElementById('siteDate'); //Get the time element from page

	dateElement.setAttribute('datetime', date); //Set datetiem attribute
	dateElement.innerHTML = date.getFullYear(); //Output current year to the page and inside time element
}

//Function for removing active class fro last nav el. and add active class to first nav el.
function scrollToTopBtn() {

	let topBtn = document.querySelector('.grid__footer--link'),
		navLinks = document.querySelectorAll('.grid__header--nav--item');

	topBtn.addEventListener('click', function() {
		navLinks[0].classList.add('active');
		navLinks[6].classList.remove('active');
	});
}

//Remove css link for sal.css on mobile devices
function removeCSSLink() {

	/*console.log(window.innerWidth)
	console.log(navigator.userAgent)
	console.log((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))*/

	if((window.innerWidth <= 425)) {
		let salStyleLink = document.querySelector('#sal');

		salStyleLink.remove();
	}

	window.addEventListener('resize', function() {
		if((window.innerWidth <= 425)) {
			let salStyleLink = document.querySelector('#sal');

			salStyleLink.remove();
		} else {

			let documentMainCSSLink = document.querySelector('#main'),
				domSalStyleLink = document.querySelector('#sal'),
				salStyleLink = '<link rel="stylesheet" href="assets/css/sal.css" id="sal">';

			if (!domSalStyleLink) {
				documentMainCSSLink.insertAdjacentHTML('beforebegin', salStyleLink);
			}
		}
	});
}

//Adding/removing actve class to the menu items when page is scrolling
/*function addMenuActiveClassOnScrolling() {

	window.addEventListener('scroll', function() {

		/*let scrollDistance = window.pageYOffset, //Scroll page offest
			pageSections = document.querySelectorAll('.resume__section'); //All page sections
			//navActiveLinks = document.querySelectorAll('.grid__header--nav--item');

		for (let i = 0; i < pageSections.length; i++) {

			if (pageSections[i].offsetTop <= scrollDistance) {
				
				$('.grid__header--nav .grid__header--nav--item.active').removeClass('active');
				$('.grid__header--nav .grid__header--nav--item').eq(i).addClass('active');
			} 
		}


		$('.resume__section').each(function(i) {
			if ($(this).position().top <= scrollDistance) {
				$('.grid__header--nav .grid__header--nav--item.active').removeClass('active');
				$('.grid__header--nav .grid__header--nav--item').eq(i).addClass('active');
			}
		});
	});
}

$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop();

		// Show/hide menu on scroll
		//if (scrollDistance >= 850) {
		//		$('nav').fadeIn("fast");
		//} else {
		//		$('nav').fadeOut("fast");
		//}
	
		// Assign active class to nav links while scolling
		$('.resume__section').each(function(i) {
			if ($(this).position().top <= scrollDistance) {
				$('.grid__header--nav .grid__header--nav--item.active').removeClass('active');
				$('.grid__header--nav .grid__header--nav--item').eq(i).addClass('active');
			}
		});
}).scroll();*/
//Waiting for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

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
		navigation = document.getElementsByClassName('grid__header--nav');

	//Adding click event on the mobile menu button
	hamburgerBtn.addEventListener('click', function() {
		//Toggle classes on the mobile menu btn and main navigation
		hamburgerBtn.classList.toggle('active-mobile');
		navigation[0].classList.toggle('open');
	});
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
		navLinks[5].classList.remove('active');
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
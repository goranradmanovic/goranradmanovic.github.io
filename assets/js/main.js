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

	addMenuActiveClassOnScrolling();

	scrollToTopBtn();

	toggleMobileNav();

	validateContact();

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

		if (salStyleLink) {
			salStyleLink.remove();
		}
	}

	window.addEventListener('resize', function() {
		if((window.innerWidth <= 425)) {
			let salStyleLink = document.querySelector('#sal');

			if (salStyleLink) {
				salStyleLink.remove();
			}
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


//Function for validationg contact form
function validateContact() {

	let formInputs = document.querySelectorAll('#name, #email, #message');

	for (let i = 0; i < formInputs.length; i++) {
		//Add event listener for watching for changes in the input field (changes of value)
		formInputs[i].addEventListener('input', function() {

			//If field is empty and entered value is smaller then 3 char.  If field has pattern attr and if RegExp is different from true (regexp is false)
			if (this.value.trim() == '' || this.value.length < 3 || (this.getAttribute("pattern") && !new RegExp(this.getAttribute("pattern")).test(this.value))) {
				console.log('Adding error class');
				this.classList.add('input__error');
			} else {
				console.log('Removing error class');
				this.classList.remove('input__error');
			}
		});
	}
}


//Adding/removing actve class to the menu items when page is scrolling
function addMenuActiveClassOnScrolling() {

	//Grab sections (targets) and menu links (trigers) for menu items to apply active links styles to
	const sections = document.querySelectorAll('.resume__section'),
		menu_links = document.querySelectorAll('.grid__header--nav--item');

	//Functions for adding and removing active class from links as appropriate
	const makeActive = link => menu_links[link].classList.add('active');

	const removeActive = link => menu_links[link].classList.remove('active');

	const removeAllActive = () => [...Array(sections.length).keys()].forEach(link => removeActive(link));

	// change the active link a bit above the actual section
	// this way it will change as you're approaching the section rather
	// than waiting until the section has passed the top of the screen
	const sectionMargin = 100;

	// keep track of the currently active link
  	// use this so as not to change the active link over and over
  	// as the user scrolls but rather only change when it becomes
  	// necessary because the user is in a new section of the page
	let currentActive = 0;

	window.addEventListener('scroll', () => {
		/*
			// check in reverse order so we find the last section
			// that's present - checking in non-reverse order would
			// report true for all sections up to and including
			// the section currently in view
			//
			// Data in play:
			// window.scrollY    - is the current vertical position of the window
			// sections          - is a list of the dom nodes of the sections of the page
			//                     [...sections] turns this into an array so we can
			//                     use array options like reverse() and findIndex()
			// section.offsetTop - is the vertical offset of the section from the top of the page
			//
			// basically this lets us compare each section (by offsetTop) against the
			// viewport's current position (by window.scrollY) to figure out what section
		*/

		// the user is currently viewing
		const current = sections.length - [...sections].reverse().findIndex(section => window.scrollY >= section.offsetTop - sectionMargin) - 1;

		// only if the section has changed
    	// remove active class from all menu links
    	// and then apply it to the link for the current section

		if (current !== currentActive) {
			removeAllActive();
			currentActive = current;
			makeActive(current);
		}
	}, false);
}
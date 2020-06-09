//Waiting for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

	//Info popup data
	const popupInfoData = [

		{
			img: './assets/images/popup/stealio.svg',
			title: 'Stealio',
			text: [
				'Stealio is project that I was building for Helium10 company from USA/California.',
				'Main goal of this project is to create cupon system for Amazon purches.',
				'I was mainly working on the front end part of the application, but also I was doing some backend and helping my team with PHP.'
			],
			tech: [
				'HTML & CSS',
				'JavaScript & jQuery',
				'PHP & MySQL',
				'Yii Framework',
				'GIT'
			]
		},

		{
			img: './assets/images/popup/aleabet.webp',
			title: 'Alea Control',
			text: [
				'Alea Control is IT company for creating online betting games and systems from Bosnia and Herzegovina.',
				'I was working there primarily as front end developer on online system for betting house.',
				'I had two projects that I was dedicated to, one was system of live online betting and second one was about creating betting lists for printing.'
			],
			tech: [
				'HTML & CSS',
				'JavaScript & AngularJS',
				'PHP & MySQL',
				'NodeJS',
				'GIT'
			]
		},

		{
			img: './assets/images/popup/aleabetlists.webp',
			title: 'AleaBet Lists',
			text: [
				'Aleabet lists is a project for betting house, I was working on web version and also on printing versions of those lists for daily or weekly sports events.',
				'Beside of aleabet lists I was working also on the admin panel for this lists, so that admin can configure output of the lists and some graphic elements.'
			],
			tech: [
				'HTML & CSS',
				'JavaScript & AngularJS',
				'PHP & MySQL',
				'NodeJS',
				'GIT'
			]
		},

		{
			img: './assets/images/popup/bplace.webp',
			title: 'Bplace',
			text: [
				'This was my final project on my advance PHP & MySQL course.',
				'My main goal on this project it was to create custom CMS with admin panel and with the front end part of the app.',
				'Everything on this project was built with plain PHP, MySQL and with little bit of JavaScript.'
			],
			tech: [
				'HTML & CSS',
				'PHP & MySQL',
				'JavaScript',
				'AJAX'
			]
		},

		{
			img: './assets/images/popup/einfo.webp',
			title: 'Einfo',
			text: [
				'E-info is IT company based in Bosnia and Herzegovina, with focus on creating and maintaining large databases for their clients.',
				'I was there on Internship, learning about MSSQL servers and SQL language.',
				'Also I created this presentation website for them as a sign of gratitude for everything they learned me.'
			],
			tech: [
				'HTML & CSS',
				'JavaScript',
				'AJAX'
			]
		},

		{
			img: './assets/images/popup/oldportfolio.webp',
			title: 'Old Portfolio',
			text: [
				'This is my old portfolio website.',
				'I was in need for good portfolio website to show my current state of knowledge and projects.',
				'On this website you can find some of my first ever created apps and websites.'
			],
			tech: [
				'HTML & CSS',
				'JavaScript',
				'AJAX'
			]
		},

		{
			img: './assets/images/popup/dynamiclayout.webp',
			title: 'Dynamic Layout',
			text: [
				'This is one of my example project.',
				'Goal of this project is to create SPA and admin panel with options to change order of page elements and also other page features.',
				'On this project I was able to improve my JavaScript ES6 skills.'
			],
			tech: [
				'PUG & SASS',
				'JavaScript',
				'ES6',
				'Gulp',
				'GIT'
			]
		},

		{
			img: './assets/images/popup/chatty.webp',
			title: 'Chatty',
			text: [
				'This is one of my example project.',
				'In this project I created simple realtime chat for everyone to use for fun, this is only example show case.',
				'In process of creating this app I was learning about VueJS and Firebase.'
			],
			tech: [
				'HTML & CSS',
				'JavaScript (ES6)',
				'VueJS',
				'Firebase',
				'Webpack',
				'GIT'
			]
		},

		{
			img: './assets/images/popup/mondrian.webp',
			title: 'Mondrian',
			text: [
				'This is one of my example project.',
				'In this project I tried to recreate two art pieces from Mondrian using web technologies, especially CSS grid.',
				'This is join of programming and art.'
			],
			tech: [
				'HTML & CSS',
				'JavaScript (ES6)',
				'GIT'
			]
		},

		{
			img: './assets/images/popup/rhmzrs.webp',
			title: 'RHMZRS',
			text: [
				'I was working on this project for hydrometeorological institute of Republic of Srpska.',
				'On this project I was working mainly as a front end developer, focusing on integrating google maps with hydrometeorological, seismic, air quality and other kind of data.',
				'I learned a lot about google map API working on this project.'
			],
			tech: [
				'HTML & CSS',
				'JavaScript (ES6)',
				'jQuery',
				'PHP',
				'WordPress',
				'Google Map API',
				'GIT'
			]
		},

		{
			img: './assets/images/popup/b2b.webp',
			title: 'B2B Platform',
			text: [
				'KompITenz GmbH is German IT company with office in Banja Luka, Bosnia and Herzegovina.',
				'I was working with them on B2B platform for German dairy industry, that platform connecting producers with buyers of milk.',
				'My main task is to maintain front end part of the application.'
			],
			tech: [
				'HTML & CSS',
				'JavaScript (ES6)',
				'jQuery',
				'SASS',
				'PHP & MySQL',
				'Laravel & VueJS',
				'GIT'
			]
		},

		{
			img: './assets/images/popup/oomovers.webp',
			title: 'OOMovers',
			text: [
				'OOMovers is Canadian transportation company based in Vancouver.',
				'I\'m working with them as a full stack web developer on their website and also for their transportation management system.',
				'As a full stack web developer I\'m working on variety of tasks.'
			],
			tech: [
				'HTML & CSS',
				'JavaScript (ES6)',
				'jQuery',
				'SASS',
				'PHP & YAML',
				'Silex',
				'GIT'
			]
		},

		{
			img: './assets/images/popup/jatheon.webp',
			title: 'Jatheon Cloud',
			text: [
				'This is a test project for Jatheon Cloud company.',
				'Main goal of this project was to create table with dynamic data and with options to manipulate with that data.',
				'On this project I was using JavaScript and VueJS framework for creating this project.'
			],
			tech: [
				'PUG & SASS',
				'JavaScript (ES6)',
				'VueJS',
				'Vuex',
				'Netlify',
				'GIT'
			]
		},

		{
			img: './assets/images/popup/keno.webp',
			title: 'Keno',
			text: [
				'This is a online bingo game.',
				'I was working on this project as a front end developer and with the team of developers.',
				'Also this is only sample of the game and it\'s not functional.'
			],
			tech: [
				'PUG & SASS',
				'JavaScript (ES6)',
				'VueJS',
				'Vuex & Vue Router',
				'Netlify',
				'GIT'
			]
		},

		{
			img: './assets/images/popup/nikom.webp',
			title: 'Nikom',
			text: [
				'Nikom is CNC company from Bosnia and Herzegovina.',
				'I created this presentational website for them with WordPress CMS.',
				'On this project I was mostly using WordPress and I was learning about new things from WP.'
			],
			tech: [
				'HTML & CSS',
				'PHP & MySQL',
				'JavaScript (ES6)',
				'jQuery',
				'WordPress'
			]
		},

		{
			img: './assets/images/popup/airquality.webp',
			title: 'Air Quality',
			text: [
				'This is one of my example application for monitoring air qualitiy in my hometown.',
				'With this project I wanted to help my neighbors and all city people to easily watch for air quality over winter days in our town.',
				'On this project I was learning about Nuxt.js.'
			],
			tech: [
				'PUG & SASS',
				'JavaScript (ES6)',
				'Nuxt.js',
				'Vuex & Vue Router',
				'Netlify',
				'GIT',
			]
		},

		{
			img: './assets/images/popup/thefruitsofthevillage.webp',
			title: 'The Fruits Of The Village',
			text: [
				//'It\'s connecting small and large agricultural producers with suppliers and local markets, and help to build businesses and agricultural clusters.',
				'This application helps to promote local organic product and manufacturer. On this project I was working as frontend developer for ministry of agriculture, forestry and water management.'
			],
			tech: [
				'PUG & SASS',
				'JavaScript (ES6)',
				'VueJS',
				'Vuex & Vue Router',
				'Google Map API',
				'GIT',
			]
		}
	];

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

	showMoreProjects();

	openProjectModal(popupInfoData);

	closeProjectModal();

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

//Function for opening project modal on info button click
function openProjectModal(allProjectsData) {

	let infoBtn = document.querySelectorAll('#infoBtn'),
			projectModal = document.querySelector('.infomodal');

	infoBtn.forEach(button => {
		button.addEventListener('click', function(event) {

			projectModal.classList.add('open');

			let projectName = event.target.dataset.projectName;

			let selectedProject = allProjectsData.filter(function(element) {
				return element.title === projectName;
			});

			addProjectModalContent(selectedProject[0]);
		});
	});
}

//Function for closing project modal on modal background click
function closeProjectModal() {

	let closeBtn = document.querySelector('#modal-close'),
			projectModal = document.querySelector('.infomodal');

	closeBtn.addEventListener('click', function() {
		projectModal.classList.remove('open');
		clearPopupFields();
	});
}

//Function for adding Project modal content
function addProjectModalContent(projectData) {

	let infoModalElements = document.querySelectorAll('.infomodal__card--img, .infomodal__card--content--title, .infomodal__card--content--textbox, .infomodal__card--content--list');

	infoModalElements[0].src = projectData.img;

	infoModalElements[1].textContent = projectData.title;

	(projectData.title == 'Stealio') ? infoModalElements[0].classList.add('img-contain') : infoModalElements[0].classList.remove('img-contain');

	let paragraphs = createNewElement('p', 'infomodal__card--content--textbox--text', projectData.text);
	infoModalElements[2].appendChild(paragraphs);

	let listItems = createNewElement('li', 'infomodal__card--content--list--item', projectData.tech);
	infoModalElements[3].appendChild(listItems);
}

//Function for creating new element and adding text to it
function createNewElement(element, elementClass, data) {
	let createdNodeElement = null,
			elementTextNode = null,
			elementsWrapper = document.createElement('span');

	data.forEach(function(item) {
		createdNodeElement = document.createElement(element);
		createdNodeElement.classList.add(elementClass);
		elementTextNode = document.createTextNode(item);
		createdNodeElement.appendChild(elementTextNode);
		elementsWrapper.appendChild(createdNodeElement);
	});

	return elementsWrapper;
}

//Function for clearing popup content for new popup content
function clearPopupFields() {
		let infoModalTextElements = document.querySelectorAll('.infomodal__card--content--title, .infomodal__card--content--textbox, .infomodal__card--content--list');

		infoModalTextElements.forEach(item => {
			item.innerHTML = '';
		});
}

//Show more porojects
function showMoreProjects() {
	let showMoreBtn = document.querySelector('#show-more'),
			projectsContainer = document.querySelector('.projects'),
			projectsButtonContainer = document.querySelector('.projects__btncontainer');

	showMoreBtn.addEventListener('click', function(event) {

		event.preventDefault();

		projectsContainer.classList.toggle('projects__open');
		projectsButtonContainer.classList.toggle('projects__btncontainer--open');
		event.target.textContent = (event.target.textContent === 'Show More') ? 'Show Less' : 'Show More';
	});
}

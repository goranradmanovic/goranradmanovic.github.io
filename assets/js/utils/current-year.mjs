//Function for seting date to the page
const currentYear = () => {
	//Initate date
	let date = new Date(),
		dateElement = document.getElementById('siteDate'); //Get the time element from page

	dateElement.setAttribute('datetime', date); //Set datetiem attribute
	dateElement.textContent = date.getFullYear(); //Output current year to the page and inside time element
}

export default currentYear
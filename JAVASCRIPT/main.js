// 1. Page Load Welcome
console.log("Welcome to the Community Portal");

window.addEventListener("load", function () {
	alert("Page is fully loaded");
});

// 2. Basic Event Setup
const eventName = "Community Hackathon";
const eventDate = "2025-07-10";
let availableSeats = 30;

function confirm() {
	let name = document.getElementById('name').value;
	let email = document.getElementById('email').value;
	let date = document.getElementById('date').value;
	let eventType = document.getElementById('eventtype').value;
	let message = document.getElementById('message').value || "No additional details";

	const output = document.querySelector('.output');

	if (name && email && date && eventType) {
    	if (availableSeats > 0) {
        	availableSeats--;
        	output.innerText = `Thank you, ${name}! You've registered for ${eventType} on ${date}.
Confirmation sent to ${email}. Seats remaining: ${availableSeats}`;
    	} else {
        	output.innerText = " Sorry, no more seats available.";
    	}
	} else {
    	output.innerText = " Please fill in all required fields.";
	}
}

// 3. Upcoming Events with Error Handling
let events = [
	{ name: "Tech Meetup", date: "2025-07-15", seats: 10 },
	{ name: "Design Thinking Workshop", date: "2024-05-01", seats: 0 },
	{ name: "Hackathon", date: "2025-09-20", seats: 5 },
];

function isUpcoming(dateStr) {
	const today = new Date();
	const eventDate = new Date(dateStr);
	return eventDate > today;
}

function displayValidEvents() {
	const eventList = document.getElementById("eventList");
	if (!eventList) return;
	eventList.innerHTML = "";
	events.forEach(event => {
    	if (isUpcoming(event.date) && event.seats > 0) {
        	const li = document.createElement("li");
        	li.textContent = `${event.name} on ${event.date} — Seats left: ${event.seats}`;
        	eventList.appendChild(li);
    	}
	});
}

function registerForEvent(eventName, userName) {
	try {
    	const event = events.find(e => e.name === eventName);
    	if (!event) throw new Error("Event not found");
    	if (!isUpcoming(event.date)) throw new Error("This event is in the past.");
    	if (event.seats <= 0) throw new Error("No seats available.");

    	event.seats--;
    	console.log(` ${userName} registered for ${eventName}. Seats left: ${event.seats}`);
	} catch (err) {
    	console.error(" Registration failed:", err.message);
	}
}

// 4. Closures & Higher Order Functions
function createRegistrationTracker() {
	const categoryCounts = {};
	return function registerUser(eventName, userName) {
    	const event = events.find(e => e.name === eventName);
    	if (!event) return console.error("Event not found.");
    	if (new Date(event.date) <= new Date()) return console.warn("This event has passed.");
    	if (event.seats <= 0) return console.warn("No seats left for this event.");

    	event.seats--;
    	categoryCounts[event.category] = (categoryCounts[event.category] || 0) + 1;
    	console.log(` ${userName} registered for ${event.name}. Remaining seats: ${event.seats}`);
    	console.log(` Total ${event.category} registrations: ${categoryCounts[event.category]}`);
	};
}

const registerUser = createRegistrationTracker();

function addEvent(name, date, category, seats) {
	events.push({ name, date, category, seats });
	console.log(` Event "${name}" added under "${category}" with ${seats} seats.`);
}

function filterEventsByCategory(callback) {
	return events.filter(callback);
}

// 5. Object & Prototypes
class Event {
	constructor(name, date, category, seats) {
    	this.name = name;
    	this.date = new Date(date);
    	this.category = category;
    	this.seats = seats;
	}

	checkAvailability() {
    	return this.seats > 0 && this.date > new Date();
	}
}

const event1 = new Event("Frontend Meetup", "2025-07-15", "Tech", 50);
const event2 = new Event("Startup Talk", "2024-05-10", "Business", 0);

function displayEventDetails(event) {
	console.log(` Event Details: ${event.name}`);
	Object.entries(event).forEach(([key, value]) => {
    	console.log(`${key}: ${value}`);
	});
	console.log(` Availability: ${event.checkAvailability() ? "Available" : "Unavailable"}`);
}

// 6. Arrays & Methods
const musicEvents = events.filter(e => e.category === "Music");
const formattedTitles = events.map(event => ` ${event.name} on ${new Date(event.date).toDateString()} (${event.category})`);

function renderFormattedEvents() {
	const list = document.getElementById("eventList");
	if (!list) return;
	list.innerHTML = "";
	formattedTitles.forEach(title => {
    	const li = document.createElement("li");
    	li.textContent = title;
    	list.appendChild(li);
	});
}

function renderMusicEvents() {
	const list = document.getElementById("musicEvents");
	if (!list) return;
	list.innerHTML = "";
	musicEvents.forEach(event => {
    	const li = document.createElement("li");
    	li.textContent = `${event.name} — ${new Date(event.date).toDateString()} — Seats: ${event.seats}`;
    	list.appendChild(li);
	});
}

// 7. DOM Manipulation - Event Cards
function renderEventCards(eventList) {
	const container = document.querySelector("#eventCards");
	if (!container) return;
	container.innerHTML = "";
	eventList.forEach(event => {
    	const card = document.createElement("div");
    	card.className = "event-card";
    	card.innerHTML = `
        	<h3>${event.name}</h3>
        	<p>${event.category} — ${new Date(event.date).toDateString()}</p>
        	<p>Seats: ${event.seats}</p>
        	<button class="register-btn">Register</button>
    	`;
    	card.querySelector(".register-btn").onclick = () => handleRegister(event);
    	container.appendChild(card);
	});
}

// 8. Event Handling
function handleRegister(event) {
	if (event.seats <= 0) return alert("No seats available");
	event.seats--;
	alert(`Registered for ${event.name}`);
	renderEventCards(events);
}

document.querySelector("#categoryFilter")?.addEventListener("change", e => {
	const selected = e.target.value;
	const filtered = selected === "All" ? events : events.filter(ev => ev.category === selected);
	renderEventCards(filtered);
});

document.querySelector("#searchInput")?.addEventListener("keydown", e => {
	if (e.key === "Enter") {
    	const term = e.target.value.toLowerCase();
    	const filtered = events.filter(ev => ev.name.toLowerCase().includes(term));
    	renderEventCards(filtered);
	}
});

// 9. Async/Await & Fetch
async function fetchEventsAsync() {
	const spinner = document.querySelector("#spinner");
	if (spinner) spinner.style.display = "block";
	try {
    	const res = await fetch("events.json");
    	const data = await res.json();
    	events = data.map(e => new Event(e.name, e.date, e.category, e.seats));
    	renderEventCards(events);
	} catch (err) {
    	console.error("Error:", err);
	} finally {
    	if (spinner) spinner.style.display = "none";
	}
}

// 10. Modern JS Features
function createEvent({ name, date, category = "General", seats = 20 }) {
	return new Event(name, date, category, seats);
}

const clonedEvents = [...events];

// 11. Working with Forms
const form = document.querySelector("#registrationForm");
form?.addEventListener("submit", e => {
	e.preventDefault();
	const { name, email, eventSelect } = e.target.elements;
	if (!name.value || !email.value) {
    	document.querySelector("#formError").textContent = "All fields required!";
    	return;
	}
	console.log(`Registered ${name.value} for ${eventSelect.value}`);
	document.querySelector("#formError").textContent = "";
});

// 12. AJAX Fetch
function submitRegistration(data) {
	fetch("https://mockapi.io/register", {
    	method: "POST",
    	headers: { "Content-Type": "application/json" },
    	body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(() => alert("Registration successful!"))
	.catch(() => alert("Registration failed."))
	.finally(() => setTimeout(() => console.log("Simulated delay"), 1000));
}

// 13. Debugging
console.log("Submitting form:", { name, email, event });

// 14. jQuery
$('#registerBtn').click(() => alert("You clicked register!"));
$('.event-card').fadeIn();
$('.event-card').fadeOut();
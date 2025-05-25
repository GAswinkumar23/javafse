// 1. JavaScript Basics & Setup
console.log("I'm working on question number 1");
console.log("Welcome to the Community Portal");
window.addEventListener('load', () => {
    alert("Page fully loaded");
});

// 2. Syntax, Data Types, and Operators
console.log("I'm working on question number 2");
const eventName = "Community Meetup";
const eventDate = "2023-12-15";
let availableSeats = 50;

function getEventInfo() {
    return `Event: ${eventName} on ${eventDate}. Seats available: ${availableSeats}`;
}

function registerForEvent() {
    if (availableSeats > 0) {
        availableSeats--;
        console.log(`Registration successful. Remaining seats: ${availableSeats}`);
        return true;
    }
    return false;
}

// 3. Conditionals, Loops, and Error Handling
console.log("I'm working on question number 3");
const events = [
    { name: "Workshop on Baking", date: "2023-12-20", seats: 10, category: "workshop" },
    { name: "Music Festival", date: "2023-11-10", seats: 0, category: "music" },
    { name: "Tech Conference", date: "2023-12-15", seats: 5, category: "tech" }
];

function displayValidEvents() {
    const currentDate = new Date().toISOString().split('T')[0];
    const validEvents = events.filter(event => 
        event.date >= currentDate && event.seats > 0
    );
    
    validEvents.forEach(event => {
        console.log(`${event.name} - ${event.date} (${event.seats} seats)`);
    });
}

function registerUser(eventName) {
    try {
        const event = events.find(e => e.name === eventName);
        if (!event) throw new Error("Event not found");
        if (event.seats <= 0) throw new Error("No seats available");
        event.seats--;
        console.log(`Registered for ${eventName}`);
    } catch (error) {
        console.error("Registration error:", error.message);
    }
}

// 4. Functions, Scope, Closures, Higher-Order Functions
console.log("I'm working on question number 4");
function createEventManager() {
    let totalRegistrations = 0;
    
    return {
        addEvent: (name, date, seats, category) => {
            events.push({ name, date, seats, category });
        },
        registerUser: (eventName) => {
            const event = events.find(e => e.name === eventName);
            if (event && event.seats > 0) {
                event.seats--;
                totalRegistrations++;
                return true;
            }
            return false;
        },
        filterEvents: (callback) => {
            return events.filter(callback);
        },
        getTotalRegistrations: () => totalRegistrations
    };
}

const eventManager = createEventManager();

// 5. Objects and Prototypes
console.log("I'm working on question number 5");
class Event {
    constructor(name, date, seats, category) {
        this.name = name;
        this.date = date;
        this.seats = seats;
        this.category = category;
    }
    
    checkAvailability() {
        return this.seats > 0;
    }
}

// 6. Arrays and Methods
console.log("I'm working on question number 6");
function addNewEvent(name, date, seats, category) {
    events.push(new Event(name, date, seats, category));
}

function getMusicEvents() {
    return events.filter(event => event.category === "music");
}

function formatEventCards() {
    return events.map(event => `${event.name} - ${event.category}`);
}

// 7. DOM Manipulation
console.log("I'm working on question number 7");
function renderEvents() {
    const eventsContainer = document.querySelector('#events-container');
    eventsContainer.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${event.date}</p>
            <p>Seats: ${event.seats}</p>
            <button onclick="handleRegistration('${event.name}')">Register</button>
        `;
        eventsContainer.appendChild(eventCard);
    });
}

// 8. Event Handling
console.log("I'm working on question number 8");
function handleRegistration(eventName) {
    if (eventManager.registerUser(eventName)) {
        alert(`Successfully registered for ${eventName}`);
        renderEvents();
    } else {
        alert(`Registration failed for ${eventName}`);
    }
}

function setupEventListeners() {
    document.querySelector('#category-filter').addEventListener('change', (e) => {
        const filtered = eventManager.filterEvents(event => event.category === e.target.value);
        console.log("Filtered events:", filtered);
    });
    
    document.querySelector('#search-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = eventManager.filterEvents(event => 
                event.name.toLowerCase().includes(searchTerm)
            );
            console.log("Searched events:", filtered);
        }
    });
}

// 9. Async JS, Promises, Async/Await
console.log("I'm working on question number 9");
async function fetchEvents() {
    try {
        document.querySelector('#loading-spinner').style.display = 'block';
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log("Fetched events:", data.slice(0, 3)); // Mock data
    } catch (error) {
        console.error("Error fetching events:", error);
    } finally {
        document.querySelector('#loading-spinner').style.display = 'none';
    }
}

// 10. Modern JavaScript Features
console.log("I'm working on question number 10");
function addEventWithDefaults(name, date = new Date().toISOString().split('T')[0], seats = 10, category = 'general') {
    const newEvent = { name, date, seats, category };
    events.push(newEvent);
    return newEvent;
}

function useDestructuring() {
    const [firstEvent] = events;
    const { name, date } = firstEvent;
    console.log(`First event: ${name} on ${date}`);
}

function cloneEvents() {
    const eventsCopy = [...events];
    console.log("Cloned events:", eventsCopy);
}

// 11. Working with Forms
console.log("I'm working on question number 11");
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const selectedEvent = form.elements['event'].value;
    
    if (!name || !email || !selectedEvent) {
        alert("Please fill all fields");
        return;
    }
    
    console.log(`User ${name} (${email}) registered for ${selectedEvent}`);
    form.reset();
}

// 12. AJAX & Fetch API
console.log("I'm working on question number 12");
async function submitRegistration(userData) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json'
            }
        });
        
        const data = await response.json();
        console.log("Registration successful:", data);
        return data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
}

// 13. Debugging and Testing
console.log("I'm working on question number 13");
function debugRegistration() {
    console.log("Starting registration process...");
    const formData = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value
    };
    console.log("Form data:", formData);
}

// 14. jQuery and JS Frameworks
console.log("I'm working on question number 14");
function setupJQuery() {
    if (typeof $ !== 'undefined') {
        $('#registerBtn').click(() => {
            console.log("Register button clicked (jQuery)");
        });
        
        $('.event-card').hover(
            () => $(this).fadeIn(),
            () => $(this).fadeOut()
        );
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing application...");
    renderEvents();
    setupEventListeners();
    fetchEvents();
});
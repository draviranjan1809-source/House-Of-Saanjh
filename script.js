// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2000);
});

// Particle animation
function createParticles() {
    const container = document.getElementById('heroParticles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 8) + 's';
        container.appendChild(particle);
    }
}

createParticles();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll reveal animation
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealElements);
revealElements();

// Chatbot functionality
const chatMessages = [
    { text: "Welcome to Saanjh Concierge! How can I assist you today?", sender: 'bot' },
    { text: "I can help you with product information, styling advice, and order details.", sender: 'bot' }
];

let messageIndex = 0;

function initializeChat() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    chatMessagesContainer.innerHTML = '';
    chatMessages.forEach((msg, index) => {
        setTimeout(() => {
            addMessage(msg.text, msg.sender);
        }, index * 500);
    });
    messageIndex = chatMessages.length;
}

function toggleChat() {
    const chatWindow = document.getElementById('chatbot-window');
    chatWindow.classList.toggle('open');
    
    if (chatWindow.classList.contains('open')) {
        if (messageIndex === 0) {
            initializeChat();
        }
        document.getElementById('chatInput').focus();
    }
}

function addMessage(text, sender) {
    const chatMessagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    chatMessagesContainer.appendChild(messageDiv);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const userMessage = chatInput.value.trim();

    if (userMessage === '') return;

    addMessage(userMessage, 'user');
    chatInput.value = '';

    // Simulate bot response
    setTimeout(() => {
        const botResponses = [
            "That's a great question! Let me help you with that.",
            "Our luxury collection features handcrafted pieces from Assam. Would you like to know more about a specific collection?",
            "We offer personalized styling sessions. Would you be interested in booking a consultation?",
            "Our products use premium materials like Banarasi silk, Kanjeevaram silk, and authentic hand embroidery.",
            "Thank you for your interest! You can explore our collections above or I can provide more details.",
            "Each piece is carefully crafted by skilled artisans. Quality is our priority.",
            "We ship internationally! Would you like to know about our shipping options?",
            "Feel free to ask me anything about our products, pricing, or styling tips!"
        ];
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        addMessage(randomResponse, 'bot');
    }, 800);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Product card interactions
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('click', () => {
        const productName = card.querySelector('.product-name').textContent;
        const productPrice = card.querySelector('.product-price').textContent;
        const message = `I'm interested in the ${productName} (${productPrice}). Can you provide more details?`;
        
        document.getElementById('chatInput').value = message;
        document.getElementById('chatbot-window').classList.add('open');
        if (messageIndex === 0) {
            initializeChat();
        }
        document.getElementById('chatInput').focus();
    });
});

// Accessory card interactions
const accessoryCards = document.querySelectorAll('.accessory-card');
accessoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const accessoryName = card.querySelector('.accessory-name').textContent;
        const accessoryPrice = card.querySelector('.accessory-price').textContent;
        const message = `I'm interested in the ${accessoryName} (${accessoryPrice}). Can you tell me more?`;
        
        document.getElementById('chatInput').value = message;
        document.getElementById('chatbot-window').classList.add('open');
        if (messageIndex === 0) {
            initializeChat();
        }
        document.getElementById('chatInput').focus();
    });
});

// Initialize chat on page load
window.addEventListener('load', () => {
    initializeChat();
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const serviceSelect = document.getElementById('service-select');
    const dateSelect = document.getElementById('date-select');
    const pickupDisplayBox = document.getElementById('pickup-display-box');
    const pickupDateText = document.getElementById('pickup-date-text');

    // Service duration mapping in days
    const serviceDurations = {
        'basic': 1,
        'premium': 2,
        'ceramic': 3
    };

    // Apply query string selection when arriving from the services page
    const queryParams = new URLSearchParams(window.location.search);
    const selectedServiceFromQuery = queryParams.get('service');
    if (selectedServiceFromQuery && serviceDurations[selectedServiceFromQuery]) {
        serviceSelect.value = selectedServiceFromQuery;
    }

    // Function to calculate and display the estimated pickup date
    function calculatePickupDate() {
        const selectedService = serviceSelect.value;
        const selectedDateStr = dateSelect.value;

        // Only calculate if both inputs have values
        if (selectedService && selectedDateStr) {
            const dropOffDate = new Date(selectedDateStr);
            const daysToAdd = serviceDurations[selectedService];

            // Add the days
            const pickupDate = new Date(dropOffDate);
            pickupDate.setDate(pickupDate.getDate() + daysToAdd);

            // Format date nicely (e.g., "Monday, Oct 15, 2026")
            const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
            const formattedDate = pickupDate.toLocaleDateString('en-US', options);

            // Update DOM
            pickupDateText.textContent = formattedDate;
            pickupDisplayBox.style.display = 'block'; // Reveal the box
        } else {
            pickupDisplayBox.style.display = 'none'; // Hide if incomplete
        }
    }

    // Attach event listeners so it updates instantly when either field changes
    serviceSelect.addEventListener('change', calculatePickupDate);
    dateSelect.addEventListener('change', calculatePickupDate);
    
    // Prevent past dates from being selected in the date picker
    const today = new Date().toISOString().split('T')[0];
    dateSelect.setAttribute('min', today);

    // Form submission handling (Prevent reload for demo purposes)
    const form = document.getElementById('booking-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your appointment request has been successfully submitted to Sodhi Garage.');
            form.reset();
            pickupDisplayBox.style.display = 'none';
        });
    }
});

/*****************/
/*   Variables   */
/*****************/

// Basic Section Variables
const name = document.querySelector('#name');
const email = document.querySelector('#mail')
const otherJob = document.querySelector('#other-title');
const title = document.querySelector('#title');
// T-Shirt Section Variables
const design = document.querySelector('#design');
const selectTheme = document.querySelector('#design option');
const color = document.querySelector('#color');
const colorOptions = document.querySelectorAll('#color option');
// Activities Section Variables
const activities = document.querySelector('.activities');
const activitiesInput = document.querySelectorAll('.activities input');
// Payment Section Variables
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');


/******************/
/*  Basic Section */
/******************/

// Focus on the first field when the page load
document.addEventListener('DOMContentLoaded', function() {
    name.focus();
});

// Hide the input field for "other job"
otherJob.style.display = 'none';

// Show 
title.addEventListener('change', (e) => {
    if(e.target.value === 'other') {
        otherJob.style.display = 'block';
    } else {
        otherJob.style.display = 'none';
    }
})

function nameValidator () {
    return /^[a-zA-Z]+$/.test(name.value);
}

function emailValidator () {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
}

/********************/
/*  T-Shirt Section */
/********************/

// Hide "select theme" option
selectTheme.style.display = 'none';

// Hide color options
for(i = 0; i < colorOptions.length; i++) {
    colorOptions[i].style.display = 'none';
}

const tShirtSelect = document.createElement('OPTION');
tShirtSelect.innerText = "Please select a T-shirt theme.";
tShirtSelect.setAttribute('hidden', true);
tShirtSelect.setAttribute('disabled', true);
tShirtSelect.setAttribute('selected', true);
color.appendChild(tShirtSelect);
design.addEventListener('change', (e) => {
    if(e.target.value === "js puns") {
        document.querySelector('option[value="cornflowerblue"]').style.display = 'block';
        document.querySelector('option[value="cornflowerblue"]').setAttribute('selected', true);
        document.querySelector('option[value="darkslategrey"]').style.display = 'block';
        document.querySelector('option[value="gold"]').style.display = 'block';
        document.querySelector('option[value="tomato"]').style.display = 'none';
        document.querySelector('option[value="tomato"]').removeAttribute('selected');
        document.querySelector('option[value="steelblue"]').style.display = 'none';
        document.querySelector('option[value="dimgrey"]').style.display = 'none';
    } else if(e.target.value === "heart js") {
        document.querySelector('option[value="tomato"]').style.display = 'block';
        document.querySelector('option[value="tomato"]').setAttribute('selected', true);
        document.querySelector('option[value="steelblue"]').style.display = 'block';
        document.querySelector('option[value="dimgrey"]').style.display = 'block';
        document.querySelector('option[value="cornflowerblue"]').style.display = 'none';
        document.querySelector('option[value="cornflowerblue"]').removeAttribute('selected');
        document.querySelector('option[value="darkslategrey"]').style.display = 'none';
        document.querySelector('option[value="gold"]').style.display = 'none';
    }
})


/*********************/
/*  Activity Section */
/*********************/

const totalActivityCost = document.createElement('H3');
activities.appendChild(totalActivityCost);
let total = 0;
activities.addEventListener('change', (e) => {
    const activityCost = parseInt(e.target.getAttribute('data-cost'));
    const activityDate = e.target.getAttribute('data-day-and-time');
    if(e.target.checked === true) {
        total += activityCost;
    } else if(e.target.checked === false) {
        total-= activityCost;
    }
    totalActivityCost.innerText = `Total: ${total}`;
    if(total === 0) {
        totalActivityCost.style.display = 'none';
    } else {
        totalActivityCost.style.display = 'block';
    }
    for(i = 0; i < activitiesInput.length; i++) {
        const currentActivity = activitiesInput[i].getAttribute('data-day-and-time');
        if(currentActivity === activityDate && activitiesInput[i] != e.target) {
            if(e.target.checked === true) {
                activitiesInput[i].setAttribute('disabled', true);
            } else if(e.target.checked === false){
                activitiesInput[i].removeAttribute('disabled');
            }
        }
    }
})

function activityValidator () {
    let checker = false;
    for(x = 0; x < activitiesInput.length; x ++) {
        if (activitiesInput[i].checked === true) {
            checker = true;
        }
    }
    return checker;
}

/********************/
/*  Payment Section */
/********************/

paypal.style.display = 'none';
bitcoin.style.display = 'none';
document.querySelector('option[value="select method"]').setAttribute('hidden', true);
document.querySelector('option[value="credit card"]').setAttribute('selected', true);
payment.addEventListener('change', (e) => {
    if(e.target.value === "credit card") {
        creditCard.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if(e.target.value === "paypal") {
        creditCard.style.display = 'none';
        paypal.style.display = 'block';
        bitcoin.style.display = 'none';
    } else if(e.target.value === "bitcoin") {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'block';
    }
})







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
const colorLabel = document.querySelector('label[for="color"]');
const colorOptions = document.querySelectorAll('#color option');
// Activities Section Variables
const activities = document.querySelector('.activities');
const activitiesInput = document.querySelectorAll('.activities input');
// Payment Section Variables
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const ccNum = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
// Submit Button
const submit = document.querySelector('button[type="submit"]');


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

// Create Validation Text
const nameError = document.createElement('P');
const emailError = document.createElement('P');
nameError.innerText = 'Please insert a valid name.';
emailError.innerText = 'Please insert a valid email address.';
nameError.style.color = '#FF5A46';
emailError.style.color = '#FF5A46';
name.parentNode.insertBefore(nameError, name);
email.parentNode.insertBefore(emailError, email);
nameError.style.display = 'none';
emailError.style.display = 'none';


// Name input validator
function nameValidator () {
    return /^[a-z]+$/i.test(name.value);
}

// Email input validator
function emailValidator () {
    return /^[^@]+@[^@.]+\.[a-z]{2,3}$/i.test(email.value);
}


/********************/
/*  T-Shirt Section */
/********************/

// Hide "select theme" option
selectTheme.style.display = 'none';

// Hide color options
color.style.display = 'none';
colorLabel.innerHTML = "Please select a T-shirt theme.";

design.addEventListener('change', (e) => {
    if(e.target.value === "js puns") {
        color.style.display = 'block';
        colorLabel.innerHTML = "Color:";
        document.querySelector('option[value="cornflowerblue"]').style.display = 'block';
        document.querySelector('option[value="cornflowerblue"]').setAttribute('selected', true);
        document.querySelector('option[value="darkslategrey"]').style.display = 'block';
        document.querySelector('option[value="gold"]').style.display = 'block';
        document.querySelector('option[value="tomato"]').style.display = 'none';
        document.querySelector('option[value="tomato"]').removeAttribute('selected');
        document.querySelector('option[value="steelblue"]').style.display = 'none';
        document.querySelector('option[value="dimgrey"]').style.display = 'none';
    } else if(e.target.value === "heart js") {
        color.style.display = 'block';
        colorLabel.innerHTML = "Color:";
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

// Create Validation Text
const activityError = document.createElement('P');
activityError.innerText = 'You must select at least one activity.';
activityError.style.color = '#FF5A46';
activities.parentNode.insertBefore(activityError, activities.nextSibling);
activityError.style.display = 'none';

function activityValidator () {
    let checker = false;
    for(x = 0; x < activitiesInput.length; x ++) {
        if (activitiesInput[x].checked) {
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
        document.querySelector('option[value="credit card"]').setAttribute('selected', true);
        creditCard.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if(e.target.value === "paypal") {
        document.querySelector('option[value="credit card"]').removeAttribute('selected');
        creditCard.style.display = 'none';
        paypal.style.display = 'block';
        bitcoin.style.display = 'none';
    } else if(e.target.value === "bitcoin") {
        document.querySelector('option[value="credit card"]').removeAttribute('selected');
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'block';
    }
})

// Create Validation Text
const ccNumError = document.createElement('P');
const zipError = document.createElement('P');
const cvvError = document.createElement('P');
ccNumError.innerText = 'Card Number must be long between 13 and 16 digits.';
zipError.innerText = 'Zip Code must be 5 digits long';
cvvError.innerText = 'cvv must be 3 digits long';
ccNumError.style.color = '#FF5A46';
zipError.style.color = '#FF5A46';
cvvError.style.color = '#FF5A46';
creditCard.parentNode.insertBefore(ccNumError, creditCard);
creditCard.parentNode.insertBefore(zipError, creditCard);
creditCard.parentNode.insertBefore(cvvError, creditCard);
ccNumError.style.display = 'none';
zipError.style.display = 'none';
cvvError.style.display = 'none';

// Credit Card Validator
function ccNumValidator () {
    return /^\d{13,16}$/.test(ccNum.value);
}

function zipValidator () {
    return /^\d{5}$/.test(zipCode.value);
}

function cvvValidator () {
    return /^\d{3}$/.test(cvv.value);
}


/*******************/
/*  Submit Button  */
/*******************/

submit.addEventListener('click', (e) => {
    if(nameValidator() === false) {
        nameError.style.display = 'block';
        e.preventDefault();
    } else {
        nameError.style.display = 'none';
    }
    if(emailValidator() === false) {
        emailError.style.display = 'block';
        e.preventDefault();
    } else {
        emailError.style.display = 'none';
    }
    if(activityValidator() === false) {
        activityError.style.display = 'block';
        e.preventDefault();
    } else {
        activityError.style.display = 'none';
    }
    if(document.querySelector('option[value="credit card"]').getAttribute('selected')) {
        if(ccNumValidator() === false) {
            ccNumError.style.display = 'block';
            e.preventDefault();
        } else {
            ccNumError.style.display = 'none';
        }
        if(zipValidator() === false) {
            zipError.style.display = 'block';
            e.preventDefault();
        } else {
            zipError.style.display = 'none';
        }
        if(cvvValidator() === false) {
            cvvError.style.display = 'block';
            e.preventDefault();
        } else {
            cvvError.style.display = 'none';
        }
    }
})






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


/*******************/
/*  Basic Section  */
/*******************/

// Focus on the first field when the page load
document.addEventListener('DOMContentLoaded', () => name.focus());

// Hide the input field for "other job"
otherJob.style.display = 'none';

// Show the input field for "other job" if "other" option is selected
title.addEventListener('change', (e) => {
    if(e.target.value === 'other') {
        otherJob.style.display = 'block';
    } else {
        otherJob.style.display = 'none';
    }
})

// Create Name and Email Validation Text
const nameError = document.createElement('P');
const emailError = document.createElement('P');
nameError.innerText = 'Name field is empty';
emailError.innerText = 'Email field is empty';
nameError.style.fontWeight = 'bold';
// nameError.style.textShadow = '2px 2px 4px #000000';
nameError.style.color = '#FF5A46';
emailError.style.color = '#FF5A46';
emailError.style.fontWeight = 'bold';
name.parentNode.insertBefore(nameError, name);
email.parentNode.insertBefore(emailError, email);
nameError.style.display = 'none';
emailError.style.display = 'none';

// Name input validator
const nameValidator = () => /^[a-z]+$/i.test(name.value);

// Real time validator for name
name.addEventListener('keyup', () => {
    if(name.value === '') {
        nameError.style.display = 'block';
        nameError.innerText = 'Name field is empty';
    } else if(nameValidator() === false) {
        nameError.style.display = 'block';
        nameError.innerText = 'Please insert a valid Name';
    } else {
        nameError.style.display = 'none';
    }
})

// Email input validator
const emailValidator = () => /^[^@]+@[^@.]+\.[a-z]{2,3}$/i.test(email.value);

// Real time validator for email
email.addEventListener('keyup', () => {
    if(email.value === '') {
        emailError.style.display = 'block';
        emailError.innerText = 'Email field is empty';
    } else if(emailValidator() === false) {
        emailError.style.display = 'block';
        emailError.innerText = 'Please insert a valid email address';
    } else {
        emailError.style.display = 'none';
    }
})


/*********************/
/*  T-Shirt Section  */
/*********************/

// Hide "select theme" option
selectTheme.style.display = 'none';

// Hide color options
color.style.display = 'none';
colorLabel.innerHTML = "Please select a T-shirt theme";

// Add event listener to "design" dropdown menu and update "color" dropdown menu
design.addEventListener('change', (e) => {
    if(e.target.value === "js puns") {
        // if "js puns" is selected "cornflowerblue", "darkslategrey" and "gold" is displayed
        color.style.display = 'block';
        colorLabel.innerText = "Color:";
        document.querySelector('option[value="cornflowerblue"]').style.display = 'block';
        document.querySelector('option[value="cornflowerblue"]').setAttribute('selected', true);
        document.querySelector('option[value="darkslategrey"]').style.display = 'block';
        document.querySelector('option[value="gold"]').style.display = 'block';
        document.querySelector('option[value="tomato"]').style.display = 'none';
        document.querySelector('option[value="tomato"]').removeAttribute('selected');
        document.querySelector('option[value="steelblue"]').style.display = 'none';
        document.querySelector('option[value="dimgrey"]').style.display = 'none';
    } else if(e.target.value === "heart js") {
        // if "heart js" is selected "tomato", "steelblue" and "dimgrey" is displayed
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


/**********************/
/*  Activity Section  */
/**********************/

// Create total cost text
const totalActivityCost = document.createElement('H3');
activities.appendChild(totalActivityCost);
let total = 0;
activities.addEventListener('change', (e) => {
    // Get activity cost and date
    const activityCost = parseInt(e.target.getAttribute('data-cost'));
    const activityDate = e.target.getAttribute('data-day-and-time');
    // If the activity is selected add the tost to total
    if(e.target.checked === true) {
        total += activityCost;
    // else subtracts the cost
    } else if(e.target.checked === false) {
        total-= activityCost;
    }
    // Show the total
    totalActivityCost.innerText = `Total cost: ${total}`;
    // If it's equal to zero hide the text and show error message
    if(total === 0) {
        activityError.style.display = 'block';
        totalActivityCost.style.display = 'none';
    } else {
        totalActivityCost.style.display = 'block';
        activityError.style.display = 'none';
    }
    // Check for the competing activities
    for(let i = 0; i < activitiesInput.length; i++) {
        const currentActivity = activitiesInput[i].getAttribute('data-day-and-time');
        if(currentActivity === activityDate && activitiesInput[i] != e.target) {
            if(e.target.checked === true) {
                activitiesInput[i].setAttribute('disabled', true);
                activitiesInput[i].parentNode.style.color = 'rgba(6, 49, 68, 0.1)';
            } else if(e.target.checked === false){
                activitiesInput[i].removeAttribute('disabled');
                activitiesInput[i].parentNode.style.color = '#000';
            }
        }
    }
})

// Create Activity Validation Text
const activityError = document.createElement('P');
activityError.innerText = 'You must select at least one activity';
activityError.style.color = '#FF5A46';
activityError.style.fontWeight = 'bold';
activities.parentNode.insertBefore(activityError, activities.nextSibling);
activityError.style.display = 'none';

// Activities Validator
const activityValidator = () => {
    let checker = false;
    for(x = 0; x < activitiesInput.length; x ++) {
        // If at least one activity is checked return true
        if (activitiesInput[x].checked) {
            checker = true;
        }
    }
    return checker;
}

/********************/
/*  Payment Section */
/********************/

// Hide paypal and bitcoin text
paypal.style.display = 'none';
bitcoin.style.display = 'none';
document.querySelector('option[value="select method"]').setAttribute('hidden', true);
document.querySelector('option[value="credit card"]').setAttribute('selected', true);
payment.addEventListener('change', (e) => {
    if(e.target.value === "credit card") {
        // If credit card is selected hide paypal and bitcoin text
        document.querySelector('option[value="credit card"]').setAttribute('selected', true);
        creditCard.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if(e.target.value === "paypal") {
        // If paypal is selected hide bitcoin text, credit card input field and all errors
        document.querySelector('option[value="credit card"]').removeAttribute('selected');
        creditCard.style.display = 'none';
        paypal.style.display = 'block';
        bitcoin.style.display = 'none';
        ccNumError.style.display = 'none';
        zipError.style.display = 'none';
        cvvError.style.display = 'none';
    } else if(e.target.value === "bitcoin") {
        // If bitcoin is selected hide paypal text, credit card input field and all errors
        document.querySelector('option[value="credit card"]').removeAttribute('selected');
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'block';
        ccNumError.style.display = 'none';
        zipError.style.display = 'none';
        cvvError.style.display = 'none';
    }
})

// Create Credit Card Validation Text
const ccNumError = document.createElement('P');
const zipError = document.createElement('P');
const cvvError = document.createElement('P');
ccNumError.innerText = 'Card Number field is empty';
zipError.innerText = 'Zip Code field is empty';
cvvError.innerText = 'CVV field is empty';
ccNumError.style.color = '#FF5A46';
ccNumError.style.fontWeight = 'bold';
zipError.style.color = '#FF5A46';
zipError.style.fontWeight = 'bold';
cvvError.style.color = '#FF5A46';
cvvError.style.fontWeight = 'bold';
creditCard.parentNode.insertBefore(ccNumError, creditCard);
creditCard.parentNode.insertBefore(zipError, creditCard);
creditCard.parentNode.insertBefore(cvvError, creditCard);
ccNumError.style.display = 'none';
zipError.style.display = 'none';
cvvError.style.display = 'none';

// Credit Card Number Validator
const ccNumValidator = () => /^\d{13,16}$/.test(ccNum.value);

// Real time validator for Card Number
ccNum.addEventListener('keyup', () => {
    if(ccNum.value === '') {
        // If field is empty
        ccNumError.style.display = 'block';
        ccNumError.innerText = 'Card Number field is empty';
    } else if(ccNumValidator() === false) {
        // If the format is invalid
        ccNumError.style.display = 'block';
        ccNumError.innerText = 'Card Number must be a number between 13 and 16 digits';
    } else {
        ccNumError.style.display = 'none';
    }
})

// Zip Code Validator
const zipValidator = () => /^\d{5}$/.test(zipCode.value);

// Real time validator for Zip Code
zipCode.addEventListener('keyup', () => {
    if(zipCode.value === '') {
        // If field is empty
        zipError.style.display = 'block';
        zipError.innerText = 'Zip Code field is empty';
    } else if(zipValidator() === false) {
        // If the format is invalid
        zipError.style.display = 'block';
        zipError.innerText = 'Zip Code must be a 5 digits number';
    } else {
        zipError.style.display = 'none';
    }
})

// CVV Validator
const cvvValidator = () => /^\d{3}$/.test(cvv.value);

// Real time validator for CVV
cvv.addEventListener('keyup', () => {
    if(cvv.value === '') {
        // If field is empty
        cvvError.style.display = 'block';
        cvvError.innerText = 'CVV field is empty';
    } else if(cvvValidator() === false) {
        // If the format is invalid
        cvvError.style.display = 'block';
        cvvError.innerText = 'CVV must be a 3 digits number';
    } else {
        cvvError.style.display = 'none';
    }
})


/*******************/
/*  Submit Button  */
/*******************/

// Show Error Function, take validator and error as arguments
const showError = (validator, error) => {
    if(validator === false) {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
}

// Master Validator function
const masterValidator = () => {
    // If name, email or activity field have errors return false
    if(nameValidator() === false || emailValidator() === false || activityValidator() === false) {
        return false;
    // Check if Credit Card is selected
    } else if (document.querySelector('option[value="credit card"]').getAttribute('selected')) {
        // If Credit Card Number, Zip Code or CVV field have errors return false
        if(ccNumValidator() === false || zipValidator() === false || cvvValidator() === false) {
            return false;
        }
    // Else return true
    } else {
        return true;
    }
}

// Event listener for click on submit
submit.addEventListener('click', (e) => {
    // Check for errors
    showError(nameValidator(), nameError);
    showError(emailValidator(), emailError);
    showError(activityValidator(), activityError);
    if(document.querySelector('option[value="credit card"]').getAttribute('selected')) {
        showError(ccNumValidator(), ccNumError);
        showError(zipValidator(), zipError);
        showError(cvvValidator(), cvvError);
    }
    // Call masterValidator function for checking if all information are valid
    
    if(masterValidator() === false) {
        e.preventDefault();
    }
})

'use strict'

//****************************************************
// LOGIN 
//****************************************************

//checks for token in local storage and shows the correct elements 
function checkLoginStatus(){
    if (localStorage.getItem('Token')){
        validRelogin();
    } else {
        toggleHeaderAndFooterAndWelcome();
    }
}

function toggleHeaderAndFooterAndWelcome(){
    $('header,footer').toggle();
    $('.welcome-page').toggle();
}

function validRelogin(){
    toggleHeaderAndFooterAndWelcome();
    setUpHeaders();
    getJournalEntries(); 
    showJournalDashboard(); 
}

//listen to toggle login modal 
function listenLogin() {
    $('.login-link').on('click', function () {
        toggleLoginModal();
    });
}

//closes login modal and clears the inputs
function listenLoginCloseButton() {
    $('.login-close-button').on('click', function () {
        toggleLoginModal();
        clearLoginInputs();
    });
}

function clearLoginInputs() {
    $('#js-login-username').val('');
    $('#js-login-password').val('');
    $('.login-error').text('');
    $('.signup-successful').text('');
}

function toggleLoginModal() {
    $('.login-modal').toggleClass('show-modal');
}

function listenLoginSubmit() {
    $('.login-form').submit(function (e) {
        e.preventDefault();
        const username = $('#js-login-username').val();
        const password = $('#js-login-password').val();
        clearLoginInputs();
        const userCreds = {
            username: username,
            password: password
        }
        login(userCreds);
    });
}

function login(userCreds) {
    //makes a post request to login user
    $.ajax({
        url: 'auth/login',
        method: 'POST',
        data: JSON.stringify(userCreds),
        crossDomain: true,
        contentType: 'application/json',
        success: validLogin,
        error: invalidLogin
    });
}

//clears login inputs, toggles login modal, sets the token, and shows dashboard
function validLogin(res) {
    clearLoginInputs();
    toggleLoginModal();
    localStorage.setItem('Token', res.authToken);
    setUpHeaders();
    showJournalDashboard();
    getJournalEntries(); 
}

function invalidLogin() {
    $('.login-error').text('Login error. Please try again.'); 
}

//toggles the signout, signup, and login links
function toggleNavLinks() {
    $('.login-link').toggle();
    $('.signup-link').toggle();
    $('.logout-link').toggle();
}

function showJournalDashboard() {
    toggleMainAndWelcomePage();
    toggleNavLinks();
    checkAlertBoxes();
    checkViewEntryBtns();
    checkIfJouranlEntriesAndButtonVisible();
}

function checkIfJouranlEntriesAndButtonVisible() {
    if (!$('.journal-entries-container').is(':visible')) {
        $('.journal-entries-container').toggle();
    };
    if (!$('.create-new-entry-btn').is(':visible')) {
        $('.create-new-entry-btn').toggle();
    };
}

function toggleMainAndWelcomePage() {
    $('.welcome-page').toggle();
    $('main').toggle();
}

function checkViewEntryBtns() {
    if ($('.back-entry-btn, .edit-entry-btn, .delete-entry-btn').is(':visible')) {
        $('.back-entry-btn, .edit-entry-btn, .delete-entry-btn').toggle();
    }
}

//sets up the headers for the ajax requests
function setUpHeaders() {
    let token = localStorage.getItem('Token');
    $.ajaxSetup({
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            Authorization: `Bearer ${token}`  
        }
    });
}

//makes a get request to grab all the entries 
function getJournalEntries() { 
    $.ajax({
        url: '/entries',
        method: 'GET',
        crossDomain: true,
        contentType: 'application/json',
        success: function (data){
            renderDashboardJournalEntries(data);
        },
        error: toggleErrorAlert
    });
}

function logOut() {
    $('.logout-link').on('click', function(){
        localStorage.removeItem('Token');
        toggleNavLinks();
        toggleMainAndWelcomePage();
        $('.journal-entries-container').empty();
        $('.entry-container').empty();
    });
}

//****************************************************
// HERO 
//****************************************************

function listenWelcomeSignUp() {
    $('.hero-signup-button').on('click', function () {
        toggleSignUpModal();
    });
}

//****************************************************
// ALERT BOXES - ERROR AND SUCCESS 
//****************************************************

function toggleErrorAlert() {
    $('.error-alert-box').toggle();
}

function toggleSuccessAlert() {
    $('.success-alert-box').toggle();
}
//listens for click on the close button on the error alert
function handleErrorAlertCloseButton() {
    $('.js-error-alert-close-btn').on('click',function(){
        toggleErrorAlert();
    });
}
//listens for click on the close button on the success alert
function handleSuccessAlertCloseButton() {
    $('.js-success-alert-close-btn').on('click', function(){
        toggleSuccessAlert();
    });
}

//****************************************************
// SIGNUP 
//****************************************************

//turns on modal when the signup button is clicked
function listenSignUp() {
    $('.signup-link').on('click', function (event) {
        toggleSignUpModal();
    });
}

//close the signup modal when close button is clicked
function listenSignUpCloseButton() {
    $('.signup-close-button').on('click', function () {
        toggleSignUpModal();
        clearSignupInputs();
    });
}

function toggleSignUpModal() {
    $('.signup-modal').toggleClass('show-modal');
}

//collects the signup info and pass it to the signup function 
function listenSignUpSubmit() {
    $('.signup-form').submit(function(e){
        e.preventDefault();
        const username = $('#js-signup-username').val();
        const password = $('#js-signup-password').val();
        const fullname = $('#js-signup-fullname').val();
        clearSignupInputs();
        const userInfo = {
            username: username,
            password: password,
            fullname: fullname
        }
        signup(userInfo);
    });
}

function signup(userInfo) {
    //makes a post request to create a new user 
    $.ajax({
        url: '/users',
        method: 'POST',
        data: JSON.stringify(userInfo),
        crossDomain: true,
        contentType: 'application/json',
        success: validSignup,
        error: function (res, status, error) {
            const err = JSON.parse(res.responseText);
            $('.signup-error').text(`${err.location} ${err.message}`);
        }
    });
}

function clearSignupInputs() {
    $('#js-signup-username').val('');
    $('#js-signup-password').val('');
    $('#js-signup-fullname').val('');
    $('.signup-error').text('');
}

//turns off signup modal and turns on login modal and tells user to login 
function validSignup() {
    toggleSignUpModal();
    toggleLoginModal();
    $('.signup-error').text('');
    $('.signup-successful').text('Signup successful, please login');
}

//checks to see if the alert boxes are visible is so toggle them off
function checkAlertBoxes() {
    if ($('.success-alert-box').is(':visible')) {
        $('.success-alert-box').toggle();
    }
    if ($('.error-alert-box').is(':visible')) {
        $('.error-alert-box').toggle();
    }
}
//****************************************************
// CREATE ENTRY
//****************************************************

//listens for a click on the add new entry button
function listenCreateEntry() {
    $('.create-new-entry-btn').on('click', function () {
        toggleCreateEntryModal();
        checkAlertBoxes();
        $('#js-create-entry-modal-content').scrollTop(0);
    });
}

//listens for a click on the close button on the create entry modal and toggles it off
function listenCreateEntryCloseButton() {
    $('.create-entry-close-button').on('click', function () {
        toggleCreateEntryModal();
        clearCreateInputs();
    });
}

function toggleCreateEntryModal() {
    $('.create-entry-modal').toggleClass('show-modal');
}

//collects the input from the create entry form and passes it to postNewEntry function
function createNewJournalEntry() {
    $('.create-entry-form').submit(e => {
        e.preventDefault();
        const image_url = $('.image-url-input').val();
        const meaningful_image = $('.meaning-image-input').val();
        const grateful = $('.grateful-input').val();
        const bestSelf = $('.bestself-input').val();
        clearCreateInputs();
        let newEntry = {
            image_url: image_url,
            photo_meaning: meaningful_image,
            grateful: grateful,
            best_self: bestSelf,
        }
        toggleCreateEntryModal();
        $('.entry-container').empty();
        checkViewEntryBtns();
        postNewEntry(newEntry);
    });
}

function clearCreateInputs() {
    $('.image-url-input').val('');
    $('.meaning-image-input').val('');
    $('.grateful-input').val('');
    $('.bestself-input').val('');
}

function postNewEntry(newEntry) {
    //makes a post request to entries to create a new entry
    $.ajax({
        url: '/entries',
        method: 'POST',
        data: JSON.stringify(newEntry),
        crossDomain: true,
        contentType: 'application/json',
        success: function(){
            getJournalEntries();
            toggleSuccessAlert();
            scrollToTop();
        },
        error: toggleErrorAlert
    });
}

//renders all the appropriate journal entries to the DOM
function renderDashboardJournalEntries(data) {
    
    let journalEntries = data.entries.map(entry => {
        return {
            id: entry.id,
            image_url: entry.image_url,
            created_date: moment(entry.created_date).format("dddd, MMMM Do YYYY"),
        };
    });
    
    let journalEntriesList = journalEntries.map( entry => {
        return `
            <div class="journal-entry-card" data-id="${entry.id}">
                <img src="${entry.image_url}" alt="image-${entry.id}" class="journal-entry-card-img"/>
                <p class="journal-entry-date">${entry.created_date}</p>
                <div class="overlay">
                <button class="entry-view-btn">View</button>
                 </div>
            </div> 
        `
    });
    $('.journal-entries-container').html(journalEntriesList);
}

//finds the data id attribute on the clicked card and passes it to viewRequest function
function getTheId() {
    $('.journal-entries-container').on('click', '.entry-view-btn', e => {
        checkAlertBoxes();
        const selectedId = $(e.currentTarget).parents('.journal-entry-card').attr('data-id');
        makeViewRequest(selectedId);
    });
}

function makeViewRequest(id) {
    //makes a get request for a specific entry by id 
    $.ajax({
        url: `/entries/${id}`,
        method: 'GET',
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            renderViewEntry(data);
        },
        error: toggleErrorAlert
    });
}

//renders the entry information to the DOM
function renderViewEntry(data) {
    $('.entry-container').html(
        `
      <span id="selected-id" data-id="${data.id}"></span>
      <img src="${data.image_url}" alt="meaningful-photo" class="meaningful-image-img"/>
        <h2 class="entry-meaningful-photo-heading">What does this photo mean to me?</h2>
        <p class="meaningful-photo-entry">${data.photo_meaning} </p>
        <h2 class="entry-grateful-heading">What 3 things am I grateful for?</h2>
        <p class="grateful-entry">${data.grateful} </p>
        <h2 class="entry-best-self-heading">What is my best self like today?</h2>
        <p class="best-self-entry"> ${data.best_self}</p>
    `)
    scrollToTop();
    toggleEntriesContainer();
    if (!$('.back-entry-btn, .edit-entry-btn, .delete-entry-btn').is(':visible')) {
        $('.back-entry-btn, .edit-entry-btn, .delete-entry-btn').toggle();
    }
}

function scrollToTop(){
    $('html,body').animate({ scrollTop: $('.main-container').offset().top }, 'slow');
}
//****************************************************
// EDIT ENTRY
//****************************************************

//listens for a click on the edit button and prepopulates the input boxes with the correct entry
function listenEditButton() {
    $('.edit-entry-btn').on('click', e => {
        toggleEditModal();
        $("#js-edit-entry-modal-content").scrollTop(0);
        const image_url = $('.meaningful-image-img').attr('src');
        const meaningful_photo = $('.meaningful-photo-entry').text();
        const grateful = $('.grateful-entry').text();
        const best_self =  $('.best-self-entry').text();
        $('.edit-image-url-input').val(image_url);
        $('.edit-meaning-image-input').val(meaningful_photo);
        $('.edit-grateful-input').val(grateful);
        $('.edit-bestself-input').val(best_self);
    });
}

//listens for a submit on the edit entry form, collects the input and passes it to the update function
function listenEditEntrySubmitButton() {
    $('.edit-entry-form').submit(e => {
        e.preventDefault();
        const updated_image_url = $('.edit-image-url-input').val();
        const updated_meaning_image = $('.edit-meaning-image-input').val();
        const updated_grateful = $('.edit-grateful-input').val();
        const updated_best_self = $('.edit-bestself-input').val();
        const selectedId = $('#selected-id').attr('data-id');
        const updatedEntry = {
            id: selectedId,
            image_url: updated_image_url,
            photo_meaning: updated_meaning_image,
            grateful: updated_grateful,
            best_self: updated_best_self,
        }
        toggleEditModal();
        toggleEntryContainer();
        toggleEntriesContainer();
        clearEditInputs();
        updateEntryRequest(updatedEntry);
    });
}

function clearEditInputs() {
    $('.edit-image-url-input').val('');
    $('.edit-meaning-image-input').val('');
    $('.edit-grateful-input').val('');
    $('.edit-bestself-input').val('');
}

function updateEntryRequest(updatedEntry) {
    //makes put request to update the entry
    $.ajax({
        url: `/entries/${updatedEntry.id}`,
        method: 'PUT',
        data: JSON.stringify(updatedEntry),
        crossDomain: true,
        contentType: 'application/json',
        success: function(){
            getJournalEntries();
            toggleSuccessAlert();
            scrollToTop();
        },
        error: toggleErrorAlert
    });
}

//closes the edit entry modal when the close button is clicked
function listenEditCloseButton() {
    $('.edit-entry-close-button').on('click', function () {
        toggleEditModal();
        clearEditInputs();
    });
}

function toggleEditModal() {
    $('.edit-entry-modal').toggleClass('show-modal');
}

//listens for a click on the back button which toggles the entry container and toggles the entries container
function listenBackButton() {
    $('.back-entry-btn').on('click', function () {
        toggleEntryContainer()
        toggleEntriesContainer();
    });
}

function toggleEntriesContainer() {
    $('.journal-entries-container').toggle();
    $('.create-new-entry-btn').toggle();
}

function toggleEntryContainer() {
    $('.entry-container').empty();
    $('.back-entry-btn, .edit-entry-btn, .delete-entry-btn').toggle();
}

//****************************************************
// DELETE ENTRY
//****************************************************

//listens for a click on the delete button - finds the data-id attribute and passes it to delete request function
function listenDeleteButton() {
    $('.delete-entry-btn').on('click', e => {
        const selectedId = $('#selected-id').attr('data-id');
        makeDeleteRequest(selectedId);
        toggleEntryContainer()
        toggleEntriesContainer();
    });
}

function makeDeleteRequest(id) {
    //makes a delete request to delete the specific entry
    $.ajax({
        url: `/entries/${id}`,
        method: 'DELETE',
        crossDomain: true,
        contentType: 'application/json',
        success: function(){
            getJournalEntries();
            toggleSuccessAlert();
            scrollToTop();
        }, 
        error: toggleErrorAlert
    });
}

//****************************************************
// START APP
//****************************************************

function startApp() {
    checkLoginStatus();
    listenWelcomeSignUp();
    listenLogin();
    listenLoginCloseButton();
    listenSignUp();
    listenSignUpCloseButton();
    handleErrorAlertCloseButton();
    handleSuccessAlertCloseButton()
    listenCreateEntry();
    listenCreateEntryCloseButton();
    createNewJournalEntry();
    getTheId();
    listenDeleteButton();
    listenEditButton();
    listenEditEntrySubmitButton();
    listenEditCloseButton();
    listenBackButton();
    listenLoginSubmit();
    listenSignUpSubmit();
    logOut();
}

$(startApp)

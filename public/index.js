'use strict'

//-------------Hero------------------//

function listenWelcomeSignUp() {
    $('.hero-signup-button').on('click', function () {
        toggleSignUpModal();
    })
}

//-----------------Login------------------//

function listenLogin() {
    $('.login-link').on('click', function () {
        toggleLoginModal();
    })
}

function listenLoginCloseButton() {
    $('.login-close-button').on('click', function () {
        toggleLoginModal();
        $('.login-error').text('')
    })
}

function toggleLoginModal() {
    $('.login-modal').toggleClass('show-modal')
}


function listenLoginSubmit() {
    $('.login-form').submit(function (e) {
        e.preventDefault();
        const username = $('#js-login-username').val();
        const password = $('#js-login-password').val();
        $('#js-login-username').val('');
        $('#js-login-password').val('');

        const userCreds = {
            username: username,
            password: password
        }

        login(userCreds)

    })
}

function login(userCreds) {
    $.ajax({
        url: 'auth/login',
        method: 'POST',
        data: JSON.stringify(userCreds),
        crossDomain: true,
        contentType: 'application/json',
        success: validLogin,
        error: invalidLogin
    })

}

function validLogin(res) {
    $('.login-error').text('')
    $('.signup-successful').text('')
    localStorage.setItem('Token', res.authToken); 
    setUpHeaders();
    showJournalDashboard();
    getJournalEntries(); 
}

function invalidLogin() {
    $('.login-error').text('Login error. Please try again.'); 
}

function showJournalDashboard() {
    $('.login-error').text('');
    $('.login-modal').toggleClass('show-modal')
    $('.welcome-page').toggle();
    $('main').toggle();
    $('.login-link').toggle();
    $('.signup-link').toggle();
    $('.logout-link').toggle();
}

function setUpHeaders() {
    let token = localStorage.getItem('Token')
    $.ajaxSetup({
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            Authorization: `Bearer ${token}`  
        }
    });
}

function getJournalEntries(){ 
    $.ajax({
        url: '/entries',
        method: 'GET',
        data: JSON.stringify(),
        crossDomain: true,
        contentType: 'application/json',
        success: function (data){
            renderDashboardJournalEntries(data);
        },
        error: handleJournalEntriesError
    })
}

function handleJournalEntriesError(){
    console.log('error')
}

function logOut(){
    $('.logout-link').on('click', function(){
        localStorage.removeItem('Token');
        $('.login-link').toggle();
        $('.signup-link').toggle();
        $('.logout-link').toggle();
        $('main').toggle();
        $('.welcome-page').toggle();
        $('.journal-entries-container').empty();
    })
}

//----------------Sign Up------------------//


function listenSignUp() {
    $('.signup-link').on('click', function (event) {
        toggleSignUpModal();
    })
}

function listenSignUpCloseButton() {
    $('.signup-close-button').on('click', function () {
        toggleSignUpModal();
        $('.signup-error').text('')
    })
}

function toggleSignUpModal() {
    $('.signup-modal').toggleClass('show-modal')
}

function listenSignUpSubmit(){
    $('.signup-form').submit(function(e){
        e.preventDefault();
        const username = $('#js-signup-username').val();
        const password = $('#js-signup-password').val();
        const fullname = $('#js-signup-fullname').val();
        $('#js-signup-username').val('');
        $('#js-signup-password').val('');
        $('#js-signup-fullname').val('');
    
        const userInfo = {
            username: username,
            password: password,
            fullname: fullname
        }

        signup(userInfo);
    })
}

function signup(userInfo){
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
    })

}

function validSignup(){
    $('.signup-modal').toggleClass('show-modal')
    $('.login-modal').toggleClass('show-modal')
    $('.signup-error').text('')
    $('.signup-successful').text('Signup successful, please login');
}


//----------------Create Entry------------------//

function listenCreateEntry() {
    $('.create-new-entry-btn').on('click', function () {
        toggleCreateEntryModal();
    });
}

function listenCreateEntryCloseButton() {
    $('.create-entry-close-button').on('click', function () {
        toggleCreateEntryModal()
    });
}

function toggleCreateEntryModal() {
    $('.create-entry-modal').toggleClass('show-modal')
}

function createNewJournalEntry() {
    $('.create-entry-form').submit(e => {
        e.preventDefault();
        const image_url = $('.image-url-input').val();
        const meaningful_image = $('.meaning-image-input').val();
        const grateful = $('.grateful-input').val();
        const bestSelf = $('.bestself-input').val();
        $('.image-url-input').val('');
        $('.meaning-image-input').val('');
        $('.grateful-input').val('');
        $('.bestself-input').val('');
        let newEntry = {
            image_url: image_url,
            photo_meaning: meaningful_image,
            grateful: grateful,
            best_self: bestSelf,
        }
        toggleCreateEntryModal();
        $('.entry-container').empty();
        if ($('.back-entry-btn, .edit-entry-btn, .delete-entry-btn').is(':visible')) {
            $('.back-entry-btn, .edit-entry-btn, .delete-entry-btn').toggle();
        }
        postNewEntry(newEntry);
    })
}

function postNewEntry(newEntry){
    $.ajax({
        url: '/entries',
        method: 'POST',
        data: JSON.stringify(newEntry),
        crossDomain: true,
        contentType: 'application/json',
        success: getJournalEntries,
        error: handleNewEntryError 
    })
}

function handleNewEntryError(){
    console.log('error');
}

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
    })
    $('.journal-entries-container').html(journalEntriesList);
}

function getTheId() {
    $('.journal-entries-container').on('click', '.entry-view-btn', e => {
        const selectedId = $(e.currentTarget).parents('.journal-entry-card').attr('data-id');
        makeViewRequest(selectedId);
    })
}

function makeViewRequest(id){
    $.ajax({
        url: `/entries/${id}`,
        method: 'GET',
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            renderViewEntry(data);
        },
        error: handleViewError
    })
}

function handleViewError(){
    console.log('error')
}

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
    $('html,body').animate({
        scrollTop: $('.main-container').offset().top
    }, 'slow');
    $('.create-new-entry-btn').toggle();
    toggleEditAndDeleteButtons();
    $('.journal-entries-container').toggle();
}

function toggleEditAndDeleteButtons() {
    if ($('.back-entry-btn, .edit-entry-btn, .delete-entry-btn').is(':visible')) {
        return;
    }
    $('.back-entry-btn, .edit-entry-btn, .delete-entry-btn').toggle();
}

//----------------Edit Entry------------------//

function listenEditButton() {
    $('.edit-entry-btn').on('click', e => {
        toggleEditModal();

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
        $('.entry-container').empty();
        $('.back-entry-btn, .edit-entry-btn, .delete-entry-btn').toggle();
        $('.journal-entries-container').toggle();
        $('.create-new-entry-btn').toggle(); 
        updateEntryRequest(updatedEntry)
    })

}

function updateEntryRequest(updatedEntry){
    $.ajax({
        url: `/entries/${updatedEntry.id}`,
        method: 'PUT',
        data: JSON.stringify(updatedEntry),
        crossDomain: true,
        contentType: 'application/json',
        success: getJournalEntries,
        error: handleEditError
    })
}

function handleEditError(){
    console.log('error')
}

function listenEditCloseButton() {
    $('.edit-entry-close-button').on('click', function () {
        toggleEditModal();
    })
}

function toggleEditModal() {
    $('.edit-entry-modal').toggleClass('show-modal')
}

//-------------Back------------------//

function listenBackButton() {
    $('.back-entry-btn').on('click', function () {
        $('.entry-container').empty();
        $('.back-entry-btn, .edit-entry-btn, .delete-entry-btn').toggle();

        if (!$('.journal-entries-container').is(':visible')) {
            $('.journal-entries-container').toggle();
        };

        if (!$('.create-new-entry-btn').is(':visible')) {
            $('.create-new-entry-btn').toggle(); /////////////
        };
    })
}




//-------------Delete------------------//

function listenDeleteButton() {
    $('.delete-entry-btn').on('click', e => {
        const selectedId = $('#selected-id').attr('data-id');
        makeDeleteRequest(selectedId);
        $('.entry-container').empty();
        $('.back-entry-btn, .edit-entry-btn, .delete-entry-btn').toggle();
        $('.journal-entries-container').toggle()
        $('.create-new-entry-btn').toggle();
    });
}

function makeDeleteRequest(id){
    $.ajax({
        url: `/entries/${id}`,
        method: 'DELETE',
        crossDomain: true,
        contentType: 'application/json',
        success: getJournalEntries,
        error: handleDeleteError
    })
}

function handleDeleteError(){
    console.log('hello')
}


//----------------Start App------------------//

function startApp() {
    listenWelcomeSignUp()
    listenLogin();
    listenLoginCloseButton();
    listenSignUp();
    listenSignUpCloseButton();
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


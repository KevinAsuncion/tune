'use strict'

const ENTRY = [
    {
        image_url: 'https://images.ctfassets.net/v3n26e09qg2r/5AIMm6UcI8cYIWMsU8AqEq/d88942bfb655b82e1e2edfbd1ea5dcb8/About-02-1008x1008.svg',
        photo_meaning: '1 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        grateful: '1 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        best_self: '1 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        created_date: moment().format("dddd, MMMM Do YYYY"),
        id: 1
    },
    {
        image_url: 'https://images.ctfassets.net/v3n26e09qg2r/5AIMm6UcI8cYIWMsU8AqEq/d88942bfb655b82e1e2edfbd1ea5dcb8/About-02-1008x1008.svg',
        photo_meaning: '2 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        grateful: '2 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        best_self: '2 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        created_date: moment().format("dddd, MMMM Do YYYY"),
        id: 2
    },
    {
        image_url: 'https://images.ctfassets.net/v3n26e09qg2r/5AIMm6UcI8cYIWMsU8AqEq/d88942bfb655b82e1e2edfbd1ea5dcb8/About-02-1008x1008.svg',
        photo_meaning: '3 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        grateful: '3 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        best_self: '3 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        created_date: moment().format("dddd, MMMM Do YYYY"),
        id: 3
    },
    {
        image_url: 'https://images.ctfassets.net/v3n26e09qg2r/5AIMm6UcI8cYIWMsU8AqEq/d88942bfb655b82e1e2edfbd1ea5dcb8/About-02-1008x1008.svg',
        photo_meaning: '4 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        grateful: '4 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        best_self: '4 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        created_date: moment().format("dddd, MMMM Do YYYY"),
        id: 4
    },
    {
        image_url: 'https://images.ctfassets.net/v3n26e09qg2r/5AIMm6UcI8cYIWMsU8AqEq/d88942bfb655b82e1e2edfbd1ea5dcb8/About-02-1008x1008.svg',
        photo_meaning: '5 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        grateful: '5 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        best_self: '5 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        created_date: moment().format("dddd, MMMM Do YYYY"),
        id: 5
    },
    {
        image_url: 'https://images.ctfassets.net/v3n26e09qg2r/5AIMm6UcI8cYIWMsU8AqEq/d88942bfb655b82e1e2edfbd1ea5dcb8/About-02-1008x1008.svg',
        photo_meaning: '6 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        grateful: '6 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        best_self: '6 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        created_date: moment().format("dddd, MMMM Do YYYY"),
        id: 6
    },
    {
        image_url: 'https://images.ctfassets.net/v3n26e09qg2r/5AIMm6UcI8cYIWMsU8AqEq/d88942bfb655b82e1e2edfbd1ea5dcb8/About-02-1008x1008.svg',
        photo_meaning: '7 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        grateful: '7 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        best_self: '7 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        created_date: moment().format("dddd, MMMM Do YYYY"),
        id: 7
    },
    {
        image_url: 'https://images.ctfassets.net/v3n26e09qg2r/5AIMm6UcI8cYIWMsU8AqEq/d88942bfb655b82e1e2edfbd1ea5dcb8/About-02-1008x1008.svg',
        photo_meaning: '8 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        grateful: '8 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        best_self: '8 Spicy jalapeno brisket sint leberkas lorem turducken culpa. Aliqua cupidatat duis filet mignon, deserunt leberkas tongue turkey occaecat enim shank meatloaf ut.',
        created_date: moment().format("dddd, MMMM Do YYYY"),
        id: 8
    }
]

function renderDashboardJournalEntries(entries){
    let journalEntries = entries.map(entry =>{
        return {
            image_url: entry.image_url,
            created_date: entry.created_date,
            id: entry.id
        };
    });
    let journalEntriesList = journalEntries.map(entry => {
        return `
            <div class="journal-entry-card" data-id="${entry.id}">
                <img src="${entry.image_url}"/>
                <p class="journal-entry-date">${entry.created_date}</p>
                <div class="overlay">
                <button class="entry-view-btn">View</button>
                 </div>
            </div> 
        `
    })
    $('.journal-entries-container').html(journalEntriesList);
}

function getTheId(){
    $('.journal-entries-container').on('click', '.entry-view-btn', event => {
        let selectedId = parseInt($(event.currentTarget).parents('.journal-entry-card').attr('data-id'));
        renderEntry(selectedId);
    })
}

//generateEntry
//generateEntryList
//renderEntries
//addEntryToList
//handleItemSubmit
//getItemID
//deleteItem

function createNewJournalEntry(){
    $('.create-entry-form').submit(function(e){
       e.preventDefault();
       const image_url = $('.image-url-input').val();
       const meaningful_image = $('.meaning-image-input').val();
       const grateful = $('.grateful-input').val();
       const bestSelf = $('.bestself-input').val();
       $('.image-url-input').val('');
       $('.meaning-image-input').val('');
       $('.grateful-input').val('');
       $('.bestself-input').val('');
       ENTRY.push({
           image_url: image_url,
           photo_meaning: meaningful_image,
           grateful: grateful,
           best_self: bestSelf,
           created_date: moment().format("dddd, MMMM Do YYYY"),
           id: 9
       })
       renderDashboardJournalEntries(ENTRY);
       toggleCreateEntryModal();
    })
}

function renderEntry(selectedId){
    console.log(selectedId)
   const selectedEntry = ENTRY.find(entry=>{
        return entry.id === selectedId;
    })
    $('.view-entry').html(
    `
    <div class="view-entry-container" data-id ="${selectedId}">
     <img src="${selectedEntry.image_url}" alt="meaningful-photo" class="meaningful-image-img"/>
        <h2 class="entry-meaningful-photo-heading">This photo means..</h2>
        <p class="meaningful-photo-entry">${selectedEntry.photo_meaning} </p>
        <h2 class="entry-grateful-heading">I am grateful for..</h2>
        <p class="grateful-entry">${selectedEntry.grateful} </p>
        <h2 class="entry-best-self-heading">My best self is..</h2>
        <p class="best-self-entry"> ${selectedEntry.best_self}</p>

        <div class="view-entry-btns">
            <button class="edit-entry-btn">Edit</button>
            <button class="delete-entry-btn">Delete</button>
            <button class="cancel-edit-entry-btn" hidden>Cancel</button>
            <button class="back-entry-btn">Back</button>
        </div>
    </div>
    `)
}



//-------------Hero------------------//

function listenWelcomeSignUp(){
    $('.hero-signup-button').on('click', function(){
        toggleSignUpModal();
    })
}

//-----------------Login------------------//

function listenLogin() {
    $('.login-link').on('click', function(){
        toggleLoginModal();
    })
}

function listenLoginCloseButton() {
    $('.login-close-button').on('click', function () {
        toggleLoginModal();
    })
}

function toggleLoginModal() {
    $('.login-modal').toggleClass('show-modal')
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
    })
}

function toggleSignUpModal() {
    $('.signup-modal').toggleClass('show-modal')
}


//----------------Create Entry------------------//

function listenCreateEntry(){
    $('.create-new-entry-btn').on('click', function(){
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


function startApp(){
    listenWelcomeSignUp()
    listenLogin();
    listenLoginCloseButton();
    listenSignUp();
    listenSignUpCloseButton();
    listenCreateEntry();
    listenCreateEntryCloseButton()
    renderDashboardJournalEntries(ENTRY);
    createNewJournalEntry()
    getTheId();
}

$(startApp)


//Client Side 

//Create 

//Update 



//Read 


//Delete 

//Server Side 

//Create

//Update

//Read 

//Delete


//store your id on the element as data-id attribute 

//Next step:  mock data all possile entries use that to style 
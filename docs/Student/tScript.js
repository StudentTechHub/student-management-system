const template = `
<div class="white">

    <!-- left Side Navigation  -->

    <div class="left-nav">
        <div firstdiv>
            <div class="site-logo">
                <span style=" font-size: 20px;">SMS</span>
            </div>
            <div class="menu-group">
                <a href='../Dashboard'>
                    <div>Dashboard</div>
                </a>
                <a href='../Announcements'>
                    <div>Announcements</div>
                </a>
                <a href='../LessonPlan'>
                    <div>Lesson Plan</div>
                </a>
                <a href='../Students'>
                    <div>Students</div>
                </a>
                <a href = '../Marks'>
                    <div>Marks</div>
                </a>
                <!-- <a href = '../Attendance'>
                    <div>Attendance</div>
                </a> -->
                <a href = '../Resources'>
                    <div>Resources</div>
                </a>
            </div>
        </div>

        <div>
            <div class="user-group">
                <div class="user-logo" style="display: flex; align-items: center;">
                    <img src="../../icons/student.svg" alt="logo">
                    <p style="margin-left: 10px;" class='logName'>Neeraj Antil</p>
                </div>
                
                <div class="logout-btn">
                    Logout
                </div>
            </div>
        </div>
    </div>

<!-- -----------Search and Notification---------- -->

    <div class="main">
        <div class="search-group">
            <div class="icon-search">
                <img src="../../icons/search.svg" alt="sIcon">
            </div>
            <div class="search">
                <input type="text" placeholder="Search">
            </div>
            <div class="notification">
                <img src="../../icons/bell.svg" alt="bellIcon" style="height: 20px;">
            </div>
        </div>
    </div>
</div>
`

document.head.innerHTML += `<link rel='stylesheet' href='../tStyle.css'>`;
const serverURL = 'http://localhost:2080';

const folder = window.location.pathname.slice(window.location.pathname.lastIndexOf('/', window.location.pathname.lastIndexOf('/')-1), window.location.pathname.lastIndexOf('/'));

const mainContent = document.body.children[0].outerHTML;

document.body.children[0].remove()
document.body.innerHTML = template
document.querySelector(".main").insertAdjacentHTML("beforeend", mainContent);
document.querySelector(".main").lastChild.classList.add("mainChild");
[...document.querySelector('.menu-group').children].forEach(child => child.href.includes(folder) ? child.classList.add('activeDiv') : 0)


let rollNo;
let loggedInStudent;
async function getStudent() {
    rollNo = await fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'loggedOnRoll'
        })
    }).then(res => res.json())

    if(!rollNo){
        window.location.href = '../../Login/';
    }

    loggedInStudent = await fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'student',
            rollNo: rollNo
        })
    }).then(res => res.json())

    document.querySelector('.logName').innerHTML = loggedInStudent.name;
}

getStudent();

document.querySelector('.logout-btn').addEventListener('click', async e => {
    fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'logoutStudent'
        })
    })
})


/**
 * `popup` function creates a popup for the given information
 * @param {String} header The heading of popup
 * @param {String} message The message to be displayed
 * @param {String} btnText The text on button
 * @param {Function} btnFunc The callback function for that button
 * @param {Boolean} html Specifies whether message is HTML or plain text.
 * @returns {void}
 */
function popup(header, message, btnText, btnFunc=e=>{}, html=false){
    const background = document.createElement('div');
    background.setAttribute('style', `
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        backdrop-filter: blur(5px);
        z-index: 1000;
        background: rgba(0,0,0,0.3);
    `)
    const popup = document.createElement('div');
    popup.classList.add('popup');

    const head = document.createElement('header');
    const heading = document.createElement('h3');
    heading.innerText = header;
    const cross = document.createElement('div');
    cross.classList.add('cross');
    cross.innerHTML = '&Cross;';
    cross.addEventListener('click', () => {
        popup.remove();
        background.remove();
    })
    head.append(heading, cross);

    const body = document.createElement('div');
    body.classList.add('body');
    body[`inner${html?'HTML':'Text'}`] = message;

    const btn = document.createElement('button');
    btn.innerText = btnText;
    btn.addEventListener('click', e => {
        popup.remove();
        background.remove();
        btnFunc(e, popup);
    });

    popup.append(head, body, btn);
    document.body.append(background, popup);
}

// search

const searchInput = document.querySelector('.search input');

document.querySelector('.icon-search').addEventListener('click', e => {
    searchInput.dispatchEvent(new Event('submit'));
});
searchInput.addEventListener('keydown', key => {
    if(key.code==='Enter'){
        searchInput.dispatchEvent(new Event('submit'));
    }
})

/**
 * Adds a listener to search input.
 * @param {Function} callback The callback function to call on search.
 * @return {void}
 */
function addSearchListener(callback){
    searchInput.addEventListener('submit', e => {
        e.preventDefault();
        callback(e);
    })
}

const logoutBtn = document.querySelector(".logout-btn");
logoutBtn.addEventListener("click", () => {
    window.location.href = "../../";
})
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
            <a href = '../Attendance'>
                <div>Attendance</div>
            </a>
            <a href = '../Resources'>
                <div>Resources</div>
            </a>
        </div>
    </div>

    <div>
        <div class="user-group">
            <div class="user-logo" style="display: flex; align-items: center;">
                <img src="../../icons/teacher.svg" alt="logo">
                <p style="margin-left: 10px;" class='logName'>Dr. Naresh Gill</p>
            </div>
            
            <div class="logout-btn" onclick='logout()'>
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

<!-- -------------------ADD Student Section---------------- -->

<div id="fade" class="blur-background">
    <div id="light" class="white_content">
        <form>
            <a cross href="javascript:void(0)"
                onclick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'">
                &Cross;
            </a>

            <div class="top-heading">
                <p>ADD STUDENT</p>
            </div>
            <div class="container">
                <div class="genedu cont">
                    <div class="general">
                        <h3>General Information</h3>
                        <div class="elements">
                            <label>Name</label>
                            <div>
                                <input type="text" placeholder='First Name' required>
                                <input type='text' placeholder='Last Name'>
                            </div>
                        </div>
                        <div class="elements">
                            <label>DOB and Gender</label>
                            <div>
                                <input type="date" required>
                                <select required>
                                    <option value=''>Gender</option>
                                    <option value="male">Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>
                        </div>
                        <div class="elements">
                            <label>Parents</label>
                            <div>
                                <input type="text" placeholder="Father's name" required>
                                <input type="text" placeholder="Mother's name" required>
                            </div>
                        </div>
                        <div class="elements">
                            <label for="rollNo">Roll No.</label>
                            <div>
                                <input id="rollNo" placeholder="Roll No." required type="number" >
                            </div>
                        </div>
                    </div>
                    <div class="education">
                        <h3>Education Information</h3>
                        <div class="elements">
                            <label>Batch and <br>Semester</label>
                            <div>
                                <input type='number' placeholder='Batch' required>
                                <select id="sem" required>
                                    <option value='' selected>Semester</option>
                                    <option value='I'>I</option>
                                    <option value='II'>II</option>
                                    <option value='III'>III</option>
                                    <option value='IV'>IV</option>
                                    <option value='V'>V</option>
                                    <option value='VI'>VI</option>                                    
                                </select>
                            </div>
                        </div>
                        <div class="elements">
                            <label for="admissionType">Admission<BR>Entry Type</label>
                            <div>
                                <select id="admissionType" required style='width: 100%'>
                                    <option value='DET'>DET</option>
                                    <option value='DET-L'>DET-L</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="locon cont">
                    <div class="location">
                        <h3>Location Information</h3>
                        <div class="elements">
                            <label for="state">State</label>
                            <div>
                                <select id="state" style = "width:100%">
                                    <optgroup label="States">
                                    </optgroup>
                                    <optgroup label="Union Territories">
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                        <div class="elements">
                            <label for="dist">District</label>
                            <div>
                                <select style="width: 100%" id="dist">
                                </select>
                            </div>
                        </div>
                        <div class="elements">
                            <label for="village">Village / H No</label>
                            <div>
                                <input id="village" required type="text">
                            </div>
                        </div>
                    </div>
                    <div class="contact">
                        <h3>Contact Information</h3>
                        <div class="elements">
                            <label for="email">Email ID</label>
                            <div>
                                <input id="email" required type="email">
                            </div>
                        </div>
                        <div class="elements">
                            <label for="sPhone">Student<BR>Phone No</label>
                            <div>
                                <input id="sPhone" required type="Number">
                            </div>
                        </div>
                        <div class="elements">
                            <label for="pPhone">Parents<BR>Phone No</label>
                            <div>
                                <input id="pPhone" required type="Number">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnContainer">
                <input type='button' value='Import from Excel' onclick='importExcel()'>
                <input type="submit" value="Add Student">
                <input type="button" value="Cancel" onclick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'">
            </div>
        </form>
    </div>
</div>`

document.head.innerHTML += `<link rel='stylesheet' href='../tStyle.css'>`;
const serverURL = 'http://localhost:2080';

const folder = window.location.pathname.slice(window.location.pathname.lastIndexOf('/', window.location.pathname.lastIndexOf('/')-1), window.location.pathname.lastIndexOf('/'));

const mainContent = document.body.children[0].outerHTML;

document.body.children[0].remove()
document.body.innerHTML = template
document.querySelector(".main").insertAdjacentHTML("beforeend", mainContent);
document.querySelector(".main").lastChild.classList.add("mainChild");
[...document.querySelector('.menu-group').children].forEach(child => child.href.includes(folder) ? child.classList.add('activeDiv') : 0);


function logout(){
    fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'logoutTeacher'
        })
    }).then(res => res.json())
    .then(data => {
        data.done?'':alert('logout unsuccessful');
    })
}


let uid;
let loggedInTeacher;
async function getTeacher() {
    uid = await fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'loggedOnTeacher'
        })
    }).then(res => res.json())

    if(!uid){
        window.location.href = '../../Login/';
    }

    loggedInTeacher = await fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'teacher',
            uid: uid
        })
    }).then(res => res.json())

    document.querySelector('.logName').innerHTML = loggedInTeacher.name;
}

getTeacher();

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

// Excel to JSON

function importExcel(){
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.addEventListener('change', e => {
        excelFileToJSON(e.target.files[0]);  
    })
    input.click();
}

function excelFileToJSON(file){
    try {
        const reader = new FileReader();
        reader.addEventListener('load', e => {
            const data = e.target.result;
            const workbook = XLSX.read(data, {
                type : 'binary'
            });
            const result = {};
            workbook.SheetNames.forEach(sheetName => {
                const roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            const json = JSON.stringify(result, null, 4);

            workbook.SheetNames.forEach(sheetName => {
                const studentsArr = JSON.parse(json)[sheetName];
                const studentObj = {};
                studentsArr.forEach(student => {
                    studentObj[student.rollNo] = student
                })
                addStudents(studentObj)
            })
        })
        reader.readAsBinaryString(file);
    }catch(e){
        console.error(e);
    }
}



// add student

const res = fetch(serverURL, {
    method: 'POST',
    body: JSON.stringify({
        requestFor: 'statesDistricts'
    })
})
.then(res => res.json())
.then(data => {
    const states = data.states;
    const uts = data.union_territories;
    states.forEach(state => {
        document.querySelector('optgroup[label="States"]').insertAdjacentHTML('beforeend', `<option value="${state.name}">${state.name}</option>`)
    })
    uts.forEach(ut => {
        document.querySelector('optgroup[label="Union Territories"]').insertAdjacentHTML('beforeend', `<option value="${ut.name}">${ut.name}</option>`)
    })
    document.querySelector("#state").addEventListener("change", e => {
        let isState, location;
        states.every(state => {
            if(e.target.value===state.name){
                isState=true;
                location=state
                return false
            }
            return true
        })
        if(!isState){
            uts.every(ut => {
                if(e.target.value===ut.name){
                    location = ut;
                    return false
                }
                return true
            })
        }

        const dist = document.querySelector('#dist');
        dist.innerHTML = '';
        location.districts.forEach(district => {
            dist.insertAdjacentHTML('beforeend', `<option value=${district}>${district}</option>`)
        })
    })
})


function addStudents(students){
    fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'addStudents',
            students: students
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.done){
            popup('Success', data.message, 'OK', (e, popup) => {
                popup.remove();
            })
        }else{
            popup('Error', data.message, 'Try Again', (e, popup) => {
                popup.remove();
                addStudents();               
            })
        }
    })
}

const addStudentForm = document.querySelector("#light form");

addStudentForm.addEventListener('submit', e => {
    e.preventDefault();

    // valdidation

    const inputs = [...addStudentForm.querySelectorAll('input, select')];
    let valid = true;
    
    if(!valid){
        popup('Error', 'Please fill all the fields.', 'OK')
        return;
    }

    // add student

    const students = {}
    students[addStudentForm.querySelector('[placeholder="Roll No."]').value] = {
        name: addStudentForm.querySelector('[placeholder="First Name"]').value + ' ' + addStudentForm.querySelector('[placeholder="Last Name"]').value,
        dob: addStudentForm.querySelector('[type="date"]').value,
        gender: addStudentForm.querySelector('select').value,
        fatherName: addStudentForm.querySelector('[placeholder="Father\'s name"]').value,
        motherName: addStudentForm.querySelector('[placeholder="Mother\'s name"]').value,
        batch: addStudentForm.querySelector('[placeholder="Batch"]').value,
        semester: addStudentForm.querySelector('#sem').value,
        admissionType: addStudentForm.querySelector('#admissionType').value,
        state: addStudentForm.querySelector('#state').value,
        district: addStudentForm.querySelector('#dist').value,
        village: addStudentForm.querySelector('#village').value,
        email: addStudentForm.querySelector('#email').value,
        address: `${addStudentForm.querySelector('#village').value}, ${addStudentForm.querySelector('#dist').value}, ${addStudentForm.querySelector('#state').value}`,
        rollNo: addStudentForm.querySelector('[placeholder="Roll No."]').value,
        studentPhone: addStudentForm.querySelector('#sPhone').value,
        parentPhone: addStudentForm.querySelector('#pPhone').value
    }
    addStudents(students)
})


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
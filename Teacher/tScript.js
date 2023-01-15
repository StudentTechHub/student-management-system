const template = `
<div class="white">

<!-- left Side Navigation  -->

<div class="left-nav">
    <div firstdiv>
        <div class="site-logo">
            <span style=" font-size: 30px;">SMS</span>
            <span style="color: rgba(64, 50, 187, 0.849);  font-size: 30px;">.com
            </span>
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
                <img src="../icons/teacher.svg" alt="logo">
                <p style="margin-left: 10px;">Sunita Lather</p>
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
                <img src="../icons/search.svg" alt="sIcon">
            </div>
            <div class="search">
                <input type="text" placeholder="Search">
            </div>
            <div class="notification">
                <img src="../icons/bell.svg" alt="bellIcon" style="height: 20px;">
            </div>
        </div>

        </div>
</div>

<!-- -------------------ADD Student Section---------------- -->

<div id="fade" class="blur-background">
<div id="light" class="white_content">
    <form action="">

        <a cross href="javascript:void(0)"
            onclick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'">
            <img src="../icons/delete.png" alt="close-logo" height="15px" width="15px" class="close-logo">
        </a>

        <div class="top-heading">
            <p>STUDENT DETAILS</p>
        </div>
        <div class="container">
            <div class="genedu cont">
                <div class="general">
                    <h3>General Information</h3>
                    <div class="elements">
                        <label for="text" required>First Name</label>
                        <input type="text">
                    </div>
                    <div class="elements">
                        <label for="text">Last Name</label>
                        <input type="text">
                    </div>
                    <div class="elements">
                        <label for="text" required>Roll No.</label>
                        <input type="number">
                    </div>
                </div>
                <div class="education">
                    <h3>Education Information</h3>
                    <div class="elements">
                        <label for="text" required>Semester</label>
                        <input type="text">
                    </div>
                    <div class="elements">
                        <label for="text">Group</label>
                        <input type="text">
                    </div>
                    <div class="elements">
                        <label for="text" required>Addmission<BR>Entry Type</label>
                        <input type="text">
                    </div>
                </div>
            </div>
            <div class="locon cont">
                <div class="location">
                    <h3>Location Information</h3>
                    <div class="elements">
                        <label for="text" required>State</label>
                        <input type="text">
                    </div>
                    <div class="elements">
                        <label for="text">District</label>
                        <input type="text">
                    </div>
                    <div class="elements">
                        <label for="text" required>Village / H No</label>
                        <input type="text">
                    </div>
                </div>
                <div class="contact">
                    <h3>Contact Information</h3>
                    <div class="elements">
                        <label for="text" required>Email ID</label>
                        <input type="email">
                    </div>
                    <div class="elements">
                        <label for="text">Student<BR>Phone No</label>
                        <input type="Number">
                    </div>
                    <div class="elements">
                        <label for="text" required>Parents<BR>Phone No</label>
                        <input type="Number">
                    </div>
                </div>
            </div>
        </div>
        <div class="btnContainer">
            <input type="submit" value="Add Student">
            <input type="button" value="Cancel">
        </div>
    </form>
</div>
</div>`

document.head.innerHTML = "<link rel='stylesheet' href='../tStyle.css'>\n<link rel='stylesheet' href='style.css'>"

const folder = window.location.pathname.slice(window.location.pathname.lastIndexOf('/', window.location.pathname.lastIndexOf('/')-1), window.location.pathname.lastIndexOf('/'));

const mainContent = document.body.children[0].outerHTML;

document.body.children[0].remove()
document.body.innerHTML = template
document.querySelector(".main").insertAdjacentHTML("beforeend", mainContent);
document.querySelector(".main").lastChild.classList.add("mainChild");
[...document.querySelector('.menu-group').children].forEach(child => child.href.includes(folder) ? child.classList.add('activeDiv') : 0)
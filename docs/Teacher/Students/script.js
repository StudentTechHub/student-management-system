function pointCreator(){
    const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttribute('r', '3');
    point.setAttribute('stroke', 'lightgray');
    point.addEventListener('mouseover', e => {
        if(point.label){
            const r = point.getBoundingClientRect();
            point.style.transformOrigin = `${point.getAttribute('cx')}px ${point.getAttribute("cy")}px`;
            const marks = document.createElement('p');
            marks.innerHTML = point.label;
            marks.setAttribute('style', `
                position: absolute;
                left: ${r.left}px;
                top: ${r.top-30}px;
                zIndex: 10000;
                padding: 5px;
                color: white;
                backdrop-filter: blur(3px);
                border-radius: 5px;
                background: rgba(0,0,0,0.3);
            `)
            point.style.scale='1.4';
            point.style.transition = 'scale .2s';
            point.style.stroke = 'white';
            document.body.append(marks);
            point.addEventListener('mouseout', e => {
                marks.remove();
                point.style.stroke='lightgray';
                point.style.scale='1';
            }, {once:true})
        }
    })

    return point
}

function studentDetails(e, data){

    ['rollNo', 'semester', 'batch', 'ranking', 'dob', 'motherName', 'fatherName', 'studentPhone', 'email', 'address'].forEach(key => {
        document.querySelector('.'+key).innerText = data[key];
    })

    const sd = document.querySelector('.studentDetails');
    sd.style.display = 'block';
    document.getElementById('fade').style.display='block';
    const name = sd.querySelector('.name');
    name.innerHTML = data.name;
    const img = sd.querySelector('.img figure img');
    img.setAttribute('src', data.imgurl);

    document.querySelector('[achievements] ul').innerHTML = '';

    (data.achievements.length>5?[{
        achievement: 'see more...', 
        style: 'list-style:none; cursor: pointer; text-decoration: underline', 
        onclick(){
            popup('Achievements', `<ul>${data.achievements.map(achievement => `<li>${achievement}</li>`).reverse().join('')}`, 'Close', (e, popup) => popup.remove(), true)
        }
    }].concat(...data.achievements.slice(data.achievements.length-5,data.achievements.length)):data.achievements).forEach(achievement => {
        const li = document.createElement('li');
        if(typeof achievement === 'object'){
            li.setAttribute('style', achievement.style);
            li.onclick = achievement.onclick;
            achievement = achievement.achievement;
        }
        li.innerHTML = achievement;
        sd.querySelector('[achievements] ul').insertAdjacentElement('afterbegin', li);
    })

    

    // Ye tera graph ke liye

    let maxVal=0, lengths=[];
    const keys = Object.keys(data.marks);
    for(let key in data.marks){
        if(Math.max(data.marks[key])>maxVal) maxVal = Math.max(data.marks[key])
        lengths.push(data.marks[key].length);
    }
    const distDiff = 400/(Math.max(...lengths)-1);   // yaha par 400 graph ki width hai, fixed rahegi vo, agar badhani pade to isse bhi change kar diyo nhi to sirf 400 tak hi graph plot hoga.
    const y = 155; // ye bhi fixed rahegi y values ke liye for coordinates on x axis of graph. agar upar niche kare go isse bhi badal diyo.
    for(let i = 0; i<Math.max(...lengths)-1; i++){
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('y', y);
        text.setAttribute('x', 20+distDiff*(i+1)); // yaha par 20 constant hai, ye hai graph ki x axis par origin(not 0, but initial or 0 x point uhmmm... search kar liyo samjhaya nhi jayega) se doori
        text.innerHTML = i+1;
        text.setAttribute('style', 'font-size: 14px; fill: white;')
        sd.querySelector('[marksGraph] svg').append(text);
    }
    let count=-1;
    const colors=['lightblue', 'red', 'lightgreen', 'orange', 'yellow', 'white', 'pink'];
    keys.forEach((key, index) => {
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('stroke', colors[index]);
        polyline.setAttribute('points', '');
        sd.querySelector('[marksGraph] svg').append(polyline);
        count+=1

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.innerHTML = key; // yaha par tujhe line break add karna hai aur count ko increment kar dena hai line break ke frequency se.
        text.setAttribute('style', `
            fill: #fff;
        `)
        text.setAttribute('x', 450);
        text.setAttribute('y', 20*(count+1));

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        [['x', 428], ['y', 20*(count+0.45)], ['height', '12.5px'], ['width', '12.5px'], ['fill', colors[index]], ['stroke', 'white'], ['stroke-width', '1.5'], ['rx', '10']].forEach(pair => rect.setAttribute(pair[0], pair[1]));


        sd.querySelector('[marksGraph] svg').append(rect, text);

        data.marks[key].forEach((marks, index) => {
            const y = 140-((marks/100)*130);
            const x = 20+distDiff*index;
            polyline.setAttribute("points", polyline.getAttribute('points') + `${x},${y} `);
            const point = pointCreator();
            point.setAttribute('cx', x)
            point.setAttribute('cy', y)
            point.setAttribute('fill', polyline.getAttribute('stroke'));
            point.label = marks+'%';
            sd.querySelector('[marksGraph] svg').append(point);
        })
    })
}

window.addEventListener('load', async e => {

    const add = document.querySelector('#add');
    function positionAddBtn(){
        add.style.marginTop = add.parentElement.getBoundingClientRect().height - add.getBoundingClientRect().height - 10 + 'px'
        add.style.marginLeft = add.parentElement.getBoundingClientRect().width - add.getBoundingClientRect().width - 10 + 'px';
    }
    window.addEventListener('resize', positionAddBtn)
    positionAddBtn();

    const res = await fetch(serverURL, {method: 'POST', body: JSON.stringify({requestFor: 'studentsList'})})
    const studentsArr = await res.json()

    // let students be an array of objects
    studentsArr.sort((a, b) => a.rollNo - b.rollNo).forEach(student => {
        document.querySelector('.students').insertAdjacentHTML('beforeend', `
            <div class="student">
                <div class="uImg">
                    <img src="Pictures/${student.gender==='male'?'':'fe'}male.png" height="100%" alt="sIcon" />
                </div>
                <div class="sDetails">
                    <p class="sName" style="font-family: 'Montserrat';">${student.name.split(' ')[0]}</p>
                    <p>${student.rollNo}</p>
                </div>
            </div>`
        )
    })

    document.body.append(document.querySelector('.studentDetails'))
    const students = [...document.querySelector('.students').children];
    students.forEach((student, index) => {
        // feed the database variables here in this object, baaki ka kaam vo khud sambhal lega.
        const data = {
            name: studentsArr[index].name, // isme daalne ki koi jarurat nhi hai
            fatherName: studentsArr[index].fatherName, 
            motherName: studentsArr[index].motherName, 
            studentPhone: studentsArr[index].studentPhone, 
            email: studentsArr[index].email, 
            dob: studentsArr[index].dob, 
            imgurl: `Pictures/${studentsArr[index].gender==='male'?'':'fe'}male.png`, // isme bhi daalne ki koi jarurat nhi hai
            address: `${studentsArr[index].village}, ${studentsArr[index].district}, ${studentsArr[index].state}`,
            achievements:['college mei pehla aaya tha, padhai mei', 'college mei pehla athlete', 'ye test achievements hai.', 'sabse last wali achievement sabse pehle aayegi, is baat ka dhyan rakhna', 'saastri ji', 'mr. India'],  // the last achievement will be shown first, reason - ek nayi achievement jab append hogi, to latest ko sabse upar dikhana sahi hai aur jo purani hoti jaye vo niche jaati jaye.
            marks: {
                "sample key 1":[40, 50, 80, 60, 70],               /** ya fir subject wise, semester wise, sessional wise etc. saaro ka ikatha bhi ho sakta hai, lekin fir usme subject wise include mat karna. */
                "sample key 2":[90, 30, 60, 90, 87, 30], 
                "sample key 3":[76, 83, 100, 95, 90]
            }, 
            rollNo: studentsArr[index].rollNo, 
            semester: studentsArr[index].semester, 
            batch: studentsArr[index].batch,
            ranking: undefined
        }

        student.addEventListener('click', e => studentDetails(e, data));
    })
})
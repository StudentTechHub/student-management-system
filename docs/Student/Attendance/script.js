window.addEventListener('load', async function(e) {
    const studentTable = document.querySelector('.studentsContainer');

    // ye api ek object[] return karega jisme har ek index par ek object hoga har ek student ko represent karte hue. us object mei uski details hogi jaise roll no., name, class/year/semester, etc.

    // search operations ke liye dob, phone, father's name etc be needed hai isliye unko hataiyo mat.

    // jab backend ho jaye to niche api/server ka link daal diyo aur uncomment kar diyo
    const res = await fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'studentsList',
            required: [
                'rollNo',
                'name',
                'semester',
                'dob',                    // aur ek baat ka dhyan rakhiyo dob mei DATE OBJECT(new Date() vala) ka use kariyo jisse agar kuch aur parameters chahiye ho (jaise day(tuesday, monday, etc.), date, month, year, matlab kuch bhi isse related) to koi dikkat nhi aaye.
                'phone',                 // aur ek baat ka dhyan rakhiyo phone mei ek Number[] aayega na ki single Number kyuki kisi ke do no. bhi ho sakte hai kya pata.
                'fName',
            ]
        }),
        // headers: {'Content-Type': 'application/json'}
    })
    const students = await res.json()

    students.sort((a,b)=>a.rollNo-b.rollNo).forEach((student, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index+1}</td>
            <td>${student.rollNo}</td>
            <td class="name">${student.name}</td>
            <td><input type='checkbox' height='100%' width='100%'></td>
            <td><input type='checkbox' height='100%' width='100%'></td>
        `;
        studentTable.querySelector("tbody").append(tr);  
    });
    addSearchListener((e) => {
        students
    })
});
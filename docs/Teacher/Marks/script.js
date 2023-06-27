window.addEventListener('load', async function(e) {
    const studentTable = document.querySelector('.studentsContainer');

    const res = await fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'studentsList',
            required: [
                'rollNo',
                'name',
                'semester',
                'dob',                    
                'phone', 
                'fName',
            ]
        }),
    })
    const students = await res.json(); 

    const rollNos = Object.keys(students);
    rollNos.sort((a,b)=>a-b).forEach((rollNo, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index+1}</td>
            <td>${rollNo}</td>
            <td class="name">${students[rollNo].name}</td>
            <td>${getRandomIntInclusive(15,20)}</td>
            <td>${getRandomIntInclusive(15,20)}</td>
            <td>${getRandomIntInclusive(15,20)}</td>
        `;
        studentTable.querySelector("tbody").append(tr);  
    });

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); 
      }

    addSearchListener((e) => {
        students
    })
});
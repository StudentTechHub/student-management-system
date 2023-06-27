async function getStudent(){
    const rollNo = await fetch('http://localhost:2080', {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'loggedOnRoll'
        })
    }).then(res => res.json())

    const student = await fetch('http://localhost:2080', {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'student',
            rollNo: rollNo 
        }),
    }).then(res => res.json())

    const repInnerHTML = (attr, data) => {
        document.querySelector('['+attr+']').innerHTML = data;
    }

    [['fatherName', student.fatherName], ['rollNo', student.rollNo], ['address', student.address], ['phone', student.studentPhone], ['studentName', student.name]].forEach(elem => repInnerHTML(elem[0], elem[1]));
}

getStudent()

setTimeout(e => {
    const toDownload = JSON.parse(new URL(window.location.href).searchParams.get('download'));

    if(toDownload){
        print();
        close();
    }
}, 1000)
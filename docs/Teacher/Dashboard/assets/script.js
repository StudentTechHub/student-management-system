async function getTeacher(){
    const uid = await fetch('http://localhost:2080', {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'loggedOnTeacher'
        })
    }).then(res => res.json())

    const teacher = await fetch('http://localhost:2080', {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'teacher',
            uid: uid 
        }),
    }).then(res => res.json())

    const repInnerHTML = (attr, data) => {
        document.querySelector('['+attr+']').innerText = data;
    }

    document.querySelector("[pfp]").setAttribute("src", teacher.imgurl);

    [['teacherName', teacher.name], ['branch', teacher.department], ['phone', teacher.phone], ['designation', teacher.designation]].forEach(elem => repInnerHTML(elem[0], elem[1]))
}

getTeacher()

// waiting for the image to load in 1s time.

setTimeout(e => {
    const toDownload = JSON.parse(new URL(window.location.href).searchParams.get('download'));

    if(toDownload){
        print();
        close();
    }
}, 1000)
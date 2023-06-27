window.onload = async e => {
    const teacher = await fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'teacher',
            uid: await fetch(serverURL, {
                method: 'POST',
                body: JSON.stringify({
                    requestFor: 'loggedOnTeacher'
                })
            }).then(res => res.json())
        })
    }).then(res => res.json())

    const subjects = teacher.subjects;

    const colors = ['lightblue', 'red', 'lightgreen', 'orange', 'yellow', 'white', 'pink', 'lightgrey'];

    const keys = Object.keys(subjects);
    
    const count = keys.length;

    for(let i=0;i<count;i++){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i+1}</td>
            <td style='text-align: left;'>${keys[i]?keys[i]:''}</td>
            <td>
                <div progressBar></div>
            </td>
            <td>
            <div style = 'display: flex;justify-content:center;align-items:center'>1&nbsp;
                <input type="checkbox">&nbsp;2&nbsp;
                <input type="checkbox">&nbsp;3&nbsp;
                <input type="checkbox">
                <div style='align-items:flex-end;'><img src='../../icons/addCircle.svg' height='25px' alt='add'></div></div>
            </td>
            <td><div>https://gpsonipat.ac.in/</div></td>
        `;
        // tr.style.height = document.querySelector(".mainChild").getBoundingClientRect().height/(count+1)+'px';
        tr.lastElementChild.children[0].addEventListener('click', e => window.location.href = e.target.innerHTML);
        document.querySelector('table').append(tr);
        const progressBar = document.querySelectorAll('[progressBar]')[i];
        // const progressDiv = document.querySelector('[progress]');
        progressBar.setAttribute('style', `
            background: ${colors[i]};
            height: 20px;
            width: 100%;
            border-radius: 1in;
            color: black;
            transition: box-shadow .4s;
        `);
        setTimeout(e => progressBar.style.boxShadow = `inset -${progressBar.getBoundingClientRect().width*(100-subjects[keys[i]])/100}px 0 0 rgba(0, 0, 0, 0.4)`, 100); // timeout isliye lagaya taaki transition dikh sake, nhi to kismat mei ho tab dikhta tha.
        progressBar.innerHTML = subjects[keys[i]]+'%';
    }
    
}
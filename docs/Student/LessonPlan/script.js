window.onload = e => {
    const subjects = {
        PHP: 75,
        'Data Communication': 40,
        'Digital Electronics': 65,
        Python: 90,
        MOAD: 80,
        'Network Security': 85,
        Java: 80,
        'Microprocessors and Peripheral Devices': 60
    }
    const colors = ['lightblue', 'red', 'lightgreen', 'orange', 'yellow', 'white', 'pink', 'lightgrey'];

    const count = Math.floor(document.querySelector('.mainChild').getBoundingClientRect().height/64);

    const keys = Object.keys(subjects)
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
            </td>
            <td><div>https://gpsonipat.ac.in/</div></td>
        `;
        tr.style.height = document.querySelector(".mainChild").getBoundingClientRect().height/(count+1)+'px';
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
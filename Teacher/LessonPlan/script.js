window.onload = e => {
    const subjects = ['PHP', 'Data Communication', 'Digital Electronics'];

    const count = Math.floor(document.querySelector('.mainChild').getBoundingClientRect().height/64);

    for(let i=0;i<count;i++){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i+1}</td>
            <td>${subjects[i]?subjects[i]:''}</td>
            <td></td>
            <td>
            <div style = 'display: flex;justify-content:center;align-items:center'>1&nbsp;
                <input type="checkbox">&nbsp;2&nbsp;
                <input type="checkbox">&nbsp;3&nbsp;
                <input type="checkbox">
                <div style='align-items:flex-end;'><img src='../icons/addCircle.svg' height='25px' alt='add'></div></div>
            </td>
            <td><div>https://gpsonipat.ac.in/</div></td>
        `;
        tr.style.height = document.querySelector(".mainChild").getBoundingClientRect().height/(count+1)+'px';
        tr.lastElementChild.children[0].addEventListener('click', e => window.location.href = e.target.innerHTML);
        document.querySelector('table').append(tr);
    }
}
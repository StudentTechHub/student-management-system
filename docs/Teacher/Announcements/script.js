window.addEventListener('load', e => {
    const children = [...document.querySelector('.nav').children].splice(1, 3);
    const slider = document.querySelector('.nav').firstElementChild;
    const announcements = [...document.querySelector('.announcements').children];

    children.forEach((child, ind) => child.addEventListener('click', function (e) {
        slider.style.height = child.getBoundingClientRect().height + 'px';
        slider.style.width = child.getBoundingClientRect().width + 'px';
        let width = 0;
        ([...children].splice(0, children.indexOf(child)).forEach(child => width+=child.getBoundingClientRect().width))
        slider.style.marginLeft = width + 'px';
        
        announcements[0].style.marginLeft = -announcements[0].parentElement.getBoundingClientRect().width*ind+'px';
        announcements[1].style.marginLeft = -announcements[0].parentElement.getBoundingClientRect().width*(ind-1>0?ind-1:0)+'px';
    }))

    children[0].click();

    // bete ko baap ke barabar lane ke liye

    const containers = [document.querySelector('.background'), document.querySelector('.create')];
    containers.forEach(container => document.body.append(container));
// Aligning Add Button

    const add = document.querySelector('#add');
    add.style.marginTop = add.parentElement.getBoundingClientRect().height - add.getBoundingClientRect().height - 10 + 'px'

    add.style.marginLeft = add.parentElement.getBoundingClientRect().width - add.getBoundingClientRect().width - 10 + 'px';

    // Announcement Form Aligner

    const form = document.querySelector('form[announcement]');

    form.addEventListener('submit', e => {
        const headers  = {
            'Content-Type': 'application/json',
        }
        const inputs = ['title', 'message', 'tags', 'imp', 'date', 'time'].map(id => document.querySelector(`#${id}`));
        fetch(serverURL, {
            method: 'POST', 
            body: JSON.stringify({
                requestFor: 'announcements',
                required: inputs.map(input => Object()[input.name] = input.value)
            }),
            headers: headers
        }).then(success => success.json())
        .then(data => {
            if(data.done){
                //successful
            }else{
                //unsuccesful
            }
        })
    });
})


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

    const containers = [document.querySelector('.background'), document.querySelector('.create')];
    containers.forEach(container => document.body.append(container));
    
    // Aligning Add Button

    const add = document.querySelector('#add');
    add.style.marginTop = add.parentElement.getBoundingClientRect().height - add.getBoundingClientRect().height - 10 + 'px'

    add.style.marginLeft = add.parentElement.getBoundingClientRect().width - add.getBoundingClientRect().width - 10 + 'px';

    // getting announcements from server.

    const eventsContainer = document.querySelector('.event');
    
    fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'announcements'
        })
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(announcement => {
            eventsContainer.insertAdjacentHTML('afterbegin', `
                <div class="announce">
                    <figure><img src="../../icons/announce.png" alt=""></figure>
                    <div>
                        <header>
                            <h2>${announcement.title}</h2>
                            <div class="time">${announcement.date} - ${announcement.time}</div>
                        </header>
                        <div style="display: flex;align-items: center;">
                            <div intro>${announcement.message}</div>
                            <div tags>${[announcement.imp?'<span>important</span>':'' , ...announcement.tags.map(tag => `<span>${tag}</span>`)].join('')}</div>
                        </div>
                    </div>
                </div>
            `)
        })
    })

    // Announcement Form

    const form = document.querySelector('form[announcement]');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const inputs = ['title', 'message', 'tags', 'imp', 'date', 'time'].map(id => document.querySelector(`#${id}`));
        fetch(serverURL, {
            method: 'POST',
            body: JSON.stringify({
                requestFor: 'addAnnouncement',
                announcement: Object.fromEntries(inputs.map(input => [input.name, input.name==='imp'?input.checked:input.name==='tags'?input.value.split(',').map(tag => tag.trim()):input.value]))
            })
        }).then(res => res.json())
        .then(data => {
            if(data.done){
                window.location.reload();
            }else{
                alert('Oops! Some error occured. Please try again.');
            }
        })
    });
})


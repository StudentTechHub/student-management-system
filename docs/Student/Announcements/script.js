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
    
})


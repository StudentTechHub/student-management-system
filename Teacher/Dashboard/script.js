function aligner(){
    const ourContainer = document.querySelector('.tcContainer');
    const ourP = document.querySelector('[something]');

    ourP.style.width = (([...ourContainer.children].reduce((accum, child)=>accum-child.getBoundingClientRect().width, ourContainer.getBoundingClientRect().width)/ourContainer.children.length) + ourContainer.firstElementChild.getBoundingClientRect().width+ourContainer.children[1].getBoundingClientRect().width) + 'px';
}


// Sometimes browser runs another script when one script takes time, and therefore, this leads to some errors or unwanted behaviour. To prevent this we can use window.addEventListener('load', function) to run the function only when the page is fully loaded.

window.addEventListener('load', aligner);
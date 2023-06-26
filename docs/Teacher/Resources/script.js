window.onload = async () => {
    const add = document.querySelector('#add');
    function positionAddBtn(){
        add.style.marginTop = add.parentElement.getBoundingClientRect().height - add.getBoundingClientRect().height - 10 + 'px'
        add.style.marginLeft = add.parentElement.getBoundingClientRect().width - add.getBoundingClientRect().width - 10 + 'px';
    }
    window.addEventListener('resize', positionAddBtn)
    positionAddBtn();

    const resources = await fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({
            requestFor: 'resources'
        })
    }).then(res => res.json())
    resources.forEach(resource => {
        document.querySelector('.resources').insertAdjacentHTML('beforeend', `
        <div class='resource'>
            <figure></figure>
            <div>
                <span>
                    ${resource.title}
                </span>
                <span>
                    ${resource.subject}
                </span>
            </div>
        </div>
        `)
    })

    const addResource = document.querySelector('.addResource');
    document.body.append(addResource);

    const title = document.querySelector('.title');
    const subject = document.querySelector('.subject');
    const fileInput = document.querySelector('.file');

    const form = addResource.querySelector('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const reader = new FileReader();

        reader.addEventListener('load', async e => {
            const resourceAdded = await fetch(serverURL, {
                method: 'POST',
                body: JSON.stringify({
                    requestFor: 'addResource',
                    resource: {
                        title: title.value,
                        subject: subject.value,
                        file: {
                            contents: e.target.result,
                            name: fileInput.files[0].name
                        }
                    }
                })
            }).then(res => res.json())
            if(!resourceAdded.done){
                alert('Oops! Some error occured. Try uploading again.')
            }
        })

        reader.readAsBinaryString(fileInput.files[0]);
    })
}
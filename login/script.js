const student = document.querySelector('.rectangle2');
const teacher = document.querySelector('.rectangle1');
const lights = [...document.querySelectorAll('.light')];
const base = {height: 405, width: 365};


// Input Element

function input(name, type, placeholder, required, ...classList){
  const input = document.createElement('input');
  input.name=name;
  input.type=type;
  input.placeholder=placeholder;
  input.required=required;
  input.classList.add(...classList)
  
  return input
}

[teacher, student].forEach(elem => 
  elem.addEventListener('click', e => {
    if(!elem.clicked){       
      // Styles
      const altElem = (elem===teacher?student:teacher);
      altElem.form?.remove();
      ['height', 'width'].forEach(dimen => {
        elem.style[dimen] = `${base[dimen] + 200}px`;
        altElem.style[dimen] = `${base[dimen] - 50}px`;
        altElem.style[`margin${altElem===student?'Left':'Right'}`] = `-150px`;
        elem.style[`margin${altElem===student?'Right':'Left'}`] = 0;
        altElem.style.transform = `perspective(300px) rotatey(${altElem===student?'-':''}35deg)`;
        elem.style.transform = '';
        elem.parentElement.style.zIndex = '10';
        altElem.parentElement.style.zIndex = '5';
        elem.children[2].style.scale = 0;
        elem.children[1].style.scale = .4;
        altElem.children[2].style.scale = altElem.children[1].style.scale = .6;
      })

      // Form 

      const form = document.createElement('form');
      form.classList.add('form');

      form.action = '../Teacher/Dashboard/';

      let input1, input2;
      if(elem===student){
        input1 = input('number', 'roll', 'Roll Number', true, 'input', 'roll');
        input2 = input('date', 'date', '', true, 'input', 'date');
      }else{
        input1 = input('text', 'uid', 'User ID', true, 'input');
        input2 = input('password', 'password', 'Password', true, 'input');
      }

      form.append(input1, input2);

      const submitParent = document.createElement('button');
      submitParent.classList.add('button');
      submitParent.innerHTML = `
        <div class="btn">
          <div class="text">Login</div>
          <div class="arrow">&rightarrow;</div>
        </div>
      `;

      form.append(submitParent)


      elem.append(form);
      elem.form=form;
      elem.clicked=true;
      altElem.clicked=false;
      altElem.children[2].innerHTML = (elem===teacher?'Student':'Teacher');
    }
  })
)

// for light with cursor

document.addEventListener('mousemove', e => 
  lights.forEach(light => {
    light.style.display = 'block';
    ['left', 'top'].forEach(dimen => light.style[dimen] = `${e[`client${dimen==='left'?'X':'Y'}`] - light.parentElement.getBoundingClientRect()[dimen]}px`)
  })

  // NOTE: the light elements are relatively positioned in order to follow overflow: hidden; therefore we had to subtract the parent element's top and left margins with cursor's X and Y positions respectively.
)


// Autofill

const params = new URL(window.location).searchParams;
if(params.get('user')==='teacher' && !teacher.click())
  ['uid', 'password'].forEach(param => {
    const elem = [...teacher.querySelectorAll('*')].filter(elem => elem.name===param)[0];      // got the element
    elem.value=params.get(param) ?? '';                                                        // set value
  })
else if(params.get('user')==='student' && !student.click())
  ['roll', 'date'].forEach(param => {
    const elem = [...student.querySelectorAll('*')].filter(elem => elem.name===param)[0];      // got the element
    elem.value=(param==='roll'?params.get(param)??'':params.get('date')?`${params.get('date').slice(4, 8)}-${params.get('date').slice(2, 4)}-${params.get('date').slice(0, 2)}`:'');   // set value
  })

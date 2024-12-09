document.addEventListener("DOMContentLoaded", function() {
    
    //1.Перестановка місцями block4 і block5
    const block4 = document.getElementById("block4");
    const block5 = document.getElementById("block5");

    const parent = block4.parentNode;

    parent.insertBefore(block5, block4);

    //2. Площа трикутника 
    document.getElementById("Calculate").addEventListener("click", function(){
        const a = 13;
        const h = 9;
        const square = (a * h)/2;
        document.getElementById("Square").textContent = `Площа трикутника : ${square}`;
    });

    //3.
   // Функція для збереження значення в cookies
 function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let nameEq = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

function handleFormSubmit(event) {
    event.preventDefault(); 

    const numbers = [
        parseFloat(document.getElementById('num1').value),
        parseFloat(document.getElementById('num2').value),
        parseFloat(document.getElementById('num3').value),
        parseFloat(document.getElementById('num4').value),
        parseFloat(document.getElementById('num5').value),
        parseFloat(document.getElementById('num6').value),
        parseFloat(document.getElementById('num7').value),
        parseFloat(document.getElementById('num8').value),
        parseFloat(document.getElementById('num9').value),
        parseFloat(document.getElementById('num10').value)
    ];

    const minNumber = Math.min(...numbers);

    alert(`Мінімальне число: ${minNumber}`);

    setCookie('minNumber', minNumber, 1);

    document.getElementById('min_value').style.display = 'none';
}

window.onload = function() {
    const savedMinNumber = getCookie('minNumber');

    if (savedMinNumber) {

        const confirmResult = confirm(`Збережене мінімальне число: ${savedMinNumber}. Після натискання "ОК" cookies будуть видалені.`);

        if (confirmResult) {

            deleteCookie('minNumber');


            alert('Cookies видалено.');


            location.reload();
        }
    } else {

        document.getElementById('min_value').style.display = 'block';
    }


    const form = document.getElementById('num_form');
    form.addEventListener('submit', handleFormSubmit);
};

//4.
window.addEventListener('load', function (){

    const sevedColor = localStorage.getItem('ChoiecedColor');

    if(sevedColor){
        document.getElementById('block3').style.color = sevedColor;
    }

    document.getElementById('colorInput').addEventListener('input', function(event) {

        const selectedColor = event.target.value;

        document.getElementById('block3').style.color = selectedColor;

        localStorage.setItem('ChoiecedColor', selectedColor);
    });

});

//5.
    function onBlockDblClick(event) {
        const block = event.target;
        const list = [];
        let newItem;

        do {
            newItem = prompt("Введіть елемент списку (залиште порожнім для завершення):");
            if (newItem) {
                list.push(newItem);
            }
        } while (newItem !== "");

        block.innerHTML = `<ul>${list.map(item => `<li>${item}</li>`).join('')}</ul>`;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Зберегти список';
        saveButton.classList.add('saveButton');  
        saveButton.style.display = 'block';
        saveButton.style.marginLeft = '5px';
        saveButton.style.width = '90%';
        saveButton.style.height = '10%';
        saveButton.style.overflowWrap = 'break-word'; 
        block.appendChild(saveButton);

        const itemList = block.querySelectorAll('ul li');
        itemList.forEach(item => {
            item.style.marginLeft = '20px'; 
            item.style.marginBottom = '5px'; 
            item.style.overflowWrap = 'break-word'; 
            item.style.wordBreak = 'break-word';
        });

        saveButton.addEventListener('click', function() {
            const listItems = block.querySelectorAll('ul li');
            const listData = Array.from(listItems).map(item => item.textContent);
            
            localStorage.setItem('listData', JSON.stringify(listData));
            alert('Список збережено!');

            saveButton.remove();

        });
    }

    for (let i = 1; i <= 6; i++) {
        document.getElementById(`block${i}`).addEventListener('dblclick', onBlockDblClick);
    }

    window.addEventListener('load', function() {
        const savedList = JSON.parse(localStorage.getItem('listData'));
        if (savedList) {
            savedList.forEach((listItem, index) => {
                const block = document.getElementById(`block${index + 1}`);
                block.innerHTML = `<ul>${listItem.map(item => `<li>${item}</li>`).join('')}</ul>`;
            });
        }
    });

});

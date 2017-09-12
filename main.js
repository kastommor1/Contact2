(function () {
    var doc = document;
    var addCont = doc.getElementById('add'),
        newContact = doc.getElementById('newContact'),
        modal = doc.getElementById("modal-win"),
        save = doc.getElementById('save'),
        saveCange = doc.getElementById('save_chan'),
        delCont= doc.getElementById('del'),
        findCont = doc.getElementById('find_inp'),
        addPhone = doc.getElementById('add-phone'),
        removePhone = doc.getElementById('remove-phone'),
        addEmail = doc.getElementById('add-email'),
        removeEmail = doc.getElementById('remove-email'),
        firstPhoneInp = doc.getElementById('phone0'),
        firstPhone = doc.getElementById('phone-warning'),
        nameWarning = doc.getElementById('name-warning'),
        lastNameWarning = doc.getElementById('lastname-warning');







    // Запрет ввода букв в первый  телефон
    firstPhoneInp.oninput = function () {this.value = this.value.replace (/\D/, '')};






    // ____________INPUT WINDOW______________
    var newSwitch = function () {
        newContact.classList.toggle('switch'); //переключить
    };

    var newSwitchOn = function () {
        newContact.classList.remove('switch'); //переключить
    };

    var newSwitchOff = function () {
        newContact.classList.add('switch'); //переключить
    };

    var saveNew = function () {
        save.classList.remove('switch'); //переключить
        saveCange.classList.add('switch'); //переключить
        delCont.classList.add('switch'); //переключить
    };

    var saveOld = function () {
        save.classList.add('switch'); //переключить
        saveCange.classList.remove('switch'); //переключить
        delCont.classList.remove('switch'); //переключить
    };

    // ____________MODAL WINDOW______________
    var modalOn = function () {
        modal.classList.remove('switch');
    };

    var modalOff = function () {
        modal.classList.add('switch');
    };

    // ______________ADD SECOND PHONE________________________
    var addNewPhone = function () {
        var inpSinglePhone = doc.getElementsByClassName('single-phone');
        var i = inpSinglePhone.length;
        var elem = doc.createElement("input");
        elem.id = 'phone' + i ; // ID-шник атрибут
        elem.className = 'single-phone input_zone';
        elem.placeholder = 'Phone' + (i+1);
        elem.oninput = function () {this.value = this.value.replace (/\D/, '')};
        var inputPhone = document.getElementById("inputPhone");
        inputPhone.appendChild(elem);
    }

    addPhone.addEventListener('click', addNewPhone);

    // ______________REMOVE SECOND PHONE________________________
    var removeNewPhone = function () {
        var inpSinglePhone = doc.getElementsByClassName('single-phone');

        if (inpSinglePhone.length > 1) {
            var i = inpSinglePhone.length - 1;
            var inputPhone = document.getElementById("inputPhone");
            var oldElem = doc.getElementById('phone' + i);
            inputPhone.removeChild(oldElem);
        }
    }

    removePhone.addEventListener('click', removeNewPhone);

    var delNewPhone = function () {
        var inpSinglePhone = doc.getElementsByClassName('single-phone');;

        if (inpSinglePhone.length > 1) {
            for (var i = 1; inpSinglePhone.length >= 2; i++) {
                var inputPhone = document.getElementById("inputPhone");
                var oldElem = doc.getElementById('phone' + i);
                inputPhone.removeChild(oldElem);
            }
        }
    }


    // ______________ADD SECOND EMAIL________________________
    var addNewEmail = function () {
        var inpSingleEmail = doc.getElementsByClassName('single-email');
        var i = inpSingleEmail.length;
        var elem = doc.createElement("input");
        var elem1 = doc.createElement("p");
        var content = document.createTextNode('*in the format email@site.com');
        elem1.appendChild(content);

        elem.id = 'email' + i ; // ID-шник атрибут
        elem1.id = 'warning' + i ; // ID-шник атрибут

        elem.className = 'single-email input_zone';
        elem1.className = 'warning switch';

        elem.placeholder = 'Email' + (i+1);
        var inputEmail = document.getElementById("inputEmail");
        inputEmail.appendChild(elem);
        inputEmail.appendChild(elem1);
    }

    addEmail.addEventListener('click', addNewEmail);

    // ______________REMOVE SECOND EMAIL________________________
    var removeNewEmail = function () {
        var inpSingleEmail = doc.getElementsByClassName('single-email');

        if (inpSingleEmail.length > 1) {
            var i = inpSingleEmail.length - 1;
            var inputEmail = document.getElementById("inputEmail");
            var oldElem = doc.getElementById('email' + i);
            var oldElem1 = doc.getElementById('warning' + i);
            inputEmail.removeChild(oldElem);
            inputEmail.removeChild(oldElem1);
        }
    }

    removeEmail.addEventListener('click', removeNewEmail);

    var delNewEmail = function () {
        var inpSingleEmail = doc.getElementsByClassName('single-email');;

        if (inpSingleEmail.length > 1) {
            for (var i = 1; inpSingleEmail.length >= 2; i++) {
                /*
                По перше не працюэ для циклыв оператор рівно "===" по друге
                якщо ми оріентуемося на довжину масива коли від нього віднімаємо по одному елементу
                Кількість віднятих елементів буде в половину меньша, оскільки с
                кожним видаленим єлементом масива кількість ітерацій зменшується на одну
                 */
                var inputEmail = document.getElementById("inputEmail");
                var oldElem = doc.getElementById('email' + i);
                var oldElem1 = doc.getElementById('warning' + i);

                inputEmail.removeChild(oldElem);
                inputEmail.removeChild(oldElem1);
            }
        }
    }


    // ________________ADD________________________
    var clearForms = function () {
        doc.getElementById("name").value = '';
        doc.getElementById("lastname").value = '';
        doc.getElementById("phone0").value = '';
        doc.getElementById("email0").value = '';
        doc.getElementById("email0").classList.remove('alarm');
        doc.getElementById("warning0").classList.add('switch');

        delNewEmail();
        delNewPhone();
        findCont.value = '';

        //Очищаем предупреждение и красные окна имени и фамилии
        nameWarning.classList.add('switch');
        doc.getElementById("name").classList.remove('alarm');
        lastNameWarning.classList.add('switch');
        doc.getElementById("lastname").classList.remove('alarm');
        firstPhone.classList.add('switch');
        firstPhoneInp.classList.remove('alarm');
    };

    addCont.addEventListener('click', clearForms);
    addCont.addEventListener('click', newSwitchOn);
    addCont.addEventListener('click', saveNew);
    addCont.addEventListener('click', modalOn);


    //____________CONTACT LIST_______________
    //обернуть в функцию вызывать после сохранения

    var contList = function () {
        var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));

        if(arrFromStorage !== null){
            for (var i=0; i<arrFromStorage.length; i++){
                var elem = doc.createElement("div"),
                    ins = arrFromStorage[i],
                    namLast =  ins.name + ' ' +  ins.lastname,
                    content = document.createTextNode(namLast);
                // ins.id =  i; // ID-шник свойство
                elem.appendChild(content);
                elem.id = i; // ID-шник атрибут
                elem.className = 'single_contact';
                var conList = document.getElementById("contact_list");
                conList.appendChild(elem);
            }
        }
    };

    contList();


    var contListDel = function () {
        var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));
        // console.log(arrFromStorage);


        if(arrFromStorage !== null){
            // var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));
            for (var i=0; i<arrFromStorage.length; i++){

                var conList = document.getElementById("contact_list");
                var oldElem = doc.getElementById(i);
                if (oldElem !== null) {
                    conList.removeChild(oldElem);
                }
            }
        }
    };

    var contListRefr = function () {
        var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));
        console.log(arrFromStorage);


        if(arrFromStorage !== null){
            // var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));
            for (var i=0; i<arrFromStorage.length; i++){
                var elem = doc.createElement("div"),
                    ins = arrFromStorage[i],
                    namLast =  ins.name + ' ' +  ins.lastname,
                    content = document.createTextNode(namLast),
                    oldElem = doc.getElementById(i);

                elem.appendChild(content);
                elem.id = i; // ID-шник атрибут
                elem.className = 'single_contact';
                var conList = document.getElementById("contact_list");
                conList.removeChild(oldElem);
                conList.appendChild(elem);
                // conList.replaceChild(elem);
            }
        }
    };


    var lastcontList =  function () {
        var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));
        // console.log(arrFromStorage);
        // console.log(arrFromStorage.length-1);

        var elem = doc.createElement("div"),
            i = (arrFromStorage.length - 1),
            ins = arrFromStorage[i],
            namLast =  ins.name + ' ' +  ins.lastname,
            content = document.createTextNode(namLast);
        elem.appendChild(content);
        elem.id = i; // ID-шник атрибут
        elem.className = 'single_contact';
        var conList = document.getElementById("contact_list");
        conList.appendChild(elem);
    }

    addCont.addEventListener('click', contListDel);
    addCont.addEventListener('click', contList);


    // ____________SAVE_____________________


    var saveContact = function () {
        var name = doc.getElementById("name").value;
        var lastname = doc.getElementById("lastname").value;

        // __Email arr_____
        var arrEmail = [];
        var emailValid = true;
        var emailValidRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;   //регуляное виражения для проверки валидности мейла

        // Очищаем предупреждение и красные окна мейла
        var inpSingleEmail = doc.getElementsByClassName('single-email');
        for (var i=0; i<inpSingleEmail.length; i++){
            inpSingleEmail[i].classList.remove("alarm");
            doc.getElementById('warning' + i).classList.add('switch');
        }
        //Очищаем предупреждение и красные окна имени и фамилии
        nameWarning.classList.add('switch');
        doc.getElementById("name").classList.remove('alarm');
        lastNameWarning.classList.add('switch');
        doc.getElementById("lastname").classList.remove('alarm');
        firstPhone.classList.add('switch');
        firstPhoneInp.classList.remove('alarm');




        for (var i=0; i<inpSingleEmail.length; i++){
            if(inpSingleEmail[i].value !== ""){
                if (emailValidRe.test(inpSingleEmail[i].value)){ //сравнение строки и рег. виражения валидности имейла
                    arrEmail.push(inpSingleEmail[i].value);
                }
                else {
                    // inpSingleEmail[i].value = "Где собака";
                    inpSingleEmail[i].classList.add("alarm");
                    doc.getElementById('warning' + i).classList.remove('switch');
                    emailValid = false;
                }
            }
        }

        // console.log(emailValid);


        // __phone arr_____
        var arrPhone = [];
        var inpSinglePhone = doc.getElementsByClassName('single-phone');
        for (var i=0; i<inpSinglePhone.length; i++){
            if(inpSinglePhone[i].value !== ""){
                arrPhone.push(inpSinglePhone[i].value);
            }
        }


        var tmparr = { name: name,
            lastname: lastname,
            phone: arrPhone,
            email: arrEmail
        };

        // console.log(tmparr);


        var emtyName = Boolean(name);
        if (!emtyName){
            nameWarning.classList.remove('switch');
            doc.getElementById("name").classList.add('alarm')
        }

        var emtyLastName = Boolean(lastname);
        if (!emtyLastName){
            lastNameWarning.classList.remove('switch');
            doc.getElementById("lastname").classList.add('alarm');
        }

        var emtyPhone = Boolean(firstPhoneInp.value);
        if (!emtyPhone){
            firstPhone.classList.remove('switch');
            firstPhoneInp.classList.add('alarm');
        }





        var arrContStor = JSON.parse(localStorage.getItem('arrContIn'));



        if(emtyName && emtyLastName && emtyPhone && emailValid){
            if(arrContStor === null){
                var arrCont = [];
                arrCont.push(tmparr);
                localStorage.setItem('arrContIn', JSON.stringify(arrCont));
                lastcontList();
            }
            else {
                arrContStor.push(tmparr);
                localStorage.setItem('arrContIn', JSON.stringify(arrContStor))
                lastcontList();
            }
            newSwitch();
            clearForms();
            modalOff();
        };
    };

    save.addEventListener('click', saveContact );


    // ______________SAVE CHANGE_________________________
    var saveContactChange = function () {
        var name = doc.getElementById("name").value;
        var lastname = doc.getElementById("lastname").value;

        // __Email arr_____
        var arrEmail = [];
        var emailValid = true;
        var emailValidRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;   //регуляное виражения для проверки валидности мейла
        // Очищаем предупреждение и красные окна мейла
        var inpSingleEmail = doc.getElementsByClassName('single-email');
        for (var i=0; i<inpSingleEmail.length; i++){
            inpSingleEmail[i].classList.remove("alarm");
            doc.getElementById('warning' + i).classList.add('switch');
        }
        //Очищаем предупреждение и красные окна имени и фамилии
        nameWarning.classList.add('switch');
        doc.getElementById("name").classList.remove('alarm');
        lastNameWarning.classList.add('switch');
        doc.getElementById("lastname").classList.remove('alarm');
        firstPhone.classList.add('switch');
        firstPhoneInp.classList.remove('alarm');




        for (var i=0; i<inpSingleEmail.length; i++){
            if(inpSingleEmail[i].value !== ""){
                if (emailValidRe.test(inpSingleEmail[i].value)){ //сравнение строки и рег. виражения валидности имейла
                    arrEmail.push(inpSingleEmail[i].value);
                }
                else {
                    // inpSingleEmail[i].value = "Где собака";
                    inpSingleEmail[i].classList.add("alarm");
                    doc.getElementById('warning' + i).classList.remove('switch');
                    emailValid = false;
                }
            }
        }

        // console.log(emailValid);


        // __phone arr_____
        var arrPhone = [];
        var inpSinglePhone = doc.getElementsByClassName('single-phone');
        for (var i=0; i<inpSinglePhone.length; i++){
            if(inpSinglePhone[i].value !== ""){
                arrPhone.push(inpSinglePhone[i].value);
            }
        }


        var tmparr = { name: name,
            lastname: lastname,
            phone: arrPhone,
            email: arrEmail
        };

        // console.log(tmparr);


        var emtyName = Boolean(name);
        if (!emtyName){
            nameWarning.classList.remove('switch');
            doc.getElementById("name").classList.add('alarm')
        }

        var emtyLastName = Boolean(lastname);
        if (!emtyLastName){
            lastNameWarning.classList.remove('switch');
            doc.getElementById("lastname").classList.add('alarm');
        }

        var emtyPhone = Boolean(firstPhoneInp.value);
        if (!emtyPhone){
            firstPhone.classList.remove('switch');
            firstPhoneInp.classList.add('alarm');
        }





        var arrContStor = JSON.parse(localStorage.getItem('arrContIn'));

        if(emtyName && emtyLastName && emtyPhone && emailValid){
            arrContStor[targetID] = tmparr;
            localStorage.setItem('arrContIn', JSON.stringify(arrContStor));

            newSwitch();
            clearForms();
            modalOff();
        }
    };

    saveCange.addEventListener('click', saveContactChange);






    // ____________CLOSE_____________________
    var close = doc.getElementById('close');
    close.addEventListener('click', clearForms);
    close.addEventListener('click', newSwitch);
    close.addEventListener('click', modalOff);
    close.addEventListener('click', contListDel);
    close.addEventListener('click', contList);

    // ____________CLOSE MODAL WINDOW______________

    var closeModal = function (event) {
        if (event.target == modal){
            modal.classList.add('switch'); //переключить
        }
    }

    window.addEventListener('click', closeModal);
    window.addEventListener('click', contListDel);
    window.addEventListener('click', contList);





    // ______________EXPAND________________________

    // Получим ID
    var contactListID = document.getElementById('contact_list');
    var expandCon = function (e) {
        clearForms();

        var e = e || event;
        var target = e.target || e.srcElement;
        targetID = target.id;
        // console.log(targetID);
        newContact.classList.remove('switch');
        var arrContStor = JSON.parse(localStorage.getItem('arrContIn'));
        var oneCont = arrContStor[targetID];

        doc.getElementById("name").value = oneCont.name;
        doc.getElementById("lastname").value = oneCont.lastname;

        // ___add phone from arr____

        if (oneCont.phone[0] !== undefined){
            doc.getElementById("phone0").value = oneCont.phone[0];
        }

        if (oneCont.phone.length > 1){
            for (var i = 1; i < oneCont.phone.length; i++ ){
                var elem = doc.createElement("input");
                elem.id = 'phone' + i ; // ID-шник атрибут
                elem.className = 'single-phone input_zone';
                elem.value = oneCont.phone[i];
                elem.oninput = function () {this.value = this.value.replace (/\D/, '')};
                var inputPhone = document.getElementById("inputPhone");
                inputPhone.appendChild(elem);
            }
        }

        // ___add email from arr____

        if (oneCont.email[0] !== undefined){
            doc.getElementById("email0").value = oneCont.email[0];
        }

        if (oneCont.email.length > 1){
            for (var i = 1; i < oneCont.email.length; i++ ){
                var elem = doc.createElement("input");
                var elem1 = doc.createElement("p");
                elem.id = 'email' + i ; // ID-шник атрибут
                elem1.id = 'warning' + i ; // ID-шник атрибут
                elem.className = 'single-email input_zone';
                elem1.className = 'warning switch';
                var content = document.createTextNode('*in the format email@site.com');
                elem1.appendChild(content);

                elem.value = oneCont.email[i];
                var inputEmail = document.getElementById("inputEmail");
                inputEmail.appendChild(elem);
                inputEmail.appendChild(elem1);
            }
        }

    };

    contactListID .addEventListener('click', expandCon);
    contactListID .addEventListener('click', saveOld);
    contactListID .addEventListener('click', modalOn);


    // ______________DELETE________________________

    var delOldCont = function () {
        var arrContStor = JSON.parse(localStorage.getItem('arrContIn'));

        arrContStor.splice(targetID,1);
        localStorage.setItem('arrContIn', JSON.stringify(arrContStor));
        window.location.reload();
    };

    delCont.addEventListener('click', delOldCont);


    // ______________FIND________________________
    var findContList = function () {
        var arrFromStorage =  JSON.parse(localStorage.getItem('arrContIn'));

        if(arrFromStorage !== null){
            for (var i=0; i<arrFromStorage.length; i++){
                var ins = arrFromStorage[i],
                    insNameReg = ins.name.toUpperCase(), //Убираем учет регистра
                    insLastReg = ins.lastname.toUpperCase(), //Убираем учет регистра
                    findReg = findCont.value.toUpperCase(),//Убираем учет регистра
                    findRegLen = findReg.length,//Считаем длинну в инпуте
                    insNameLen = insNameReg.substring(0, findRegLen) ,//Берем первые 'х' - букв из имени
                    insLastLen = insLastReg.substring(0, findRegLen);//Берем первые 'х' - букв из фамилии

                // Теперь сравним по букве имена и фамили со строкой поиска без учета регистра
                if (findCont.value === ''){
                    contListDel();
                    contList();
                }
                else if ((insNameLen === findReg ) || (insLastLen === findReg ) ) {
                    var elem = doc.createElement("div"),
                        namLast =  ins.name + ' ' +  ins.lastname,
                        content = document.createTextNode(namLast);
                    elem.appendChild(content);
                    elem.id = i; // ID-шник атрибут
                    elem.className = 'single_contact';
                    var conList = document.getElementById("contact_list");
                    conList.appendChild(elem);
                }
            }
        }
    };
    findCont.addEventListener('click', newSwitchOff);
    findCont.addEventListener('click', clearForms);
    findCont.addEventListener('input', contListDel);
    findCont.addEventListener('input', findContList);












})()


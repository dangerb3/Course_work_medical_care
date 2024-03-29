//Кнопка выход
let registration_request = document.querySelector('.btn');
let men = document.querySelector('.dropdown');
registration_request.onclick = () => {
    men.classList.toggle('active');
}
///

document.getElementsByClassName('add_diagnosis')[0].style.display = 'block';
document.getElementsByClassName('add_symptom')[0].style.display = 'none';
document.getElementsByClassName('add_analysis')[0].style.display = 'none';
document.getElementsByClassName('add_medicine')[0].style.display = 'none';
document.getElementsByClassName('add_brigade')[0].style.display = 'none';


document.getElementById("add_diagnosis_nav").addEventListener("click", function (e) {
    document.getElementById("add_diagnosis_nav").className = "nav__link nav_active";
    document.getElementById("add_symptom_nav").className = "nav__link";
    document.getElementById("add_analysis_nav").className = "nav__link";
    document.getElementById("add_medicine_nav").className = "nav__link";
    document.getElementById("add_brigade_nav").className = "nav__link";

    document.getElementsByClassName('add_diagnosis')[0].style.display = 'block';
    document.getElementsByClassName('add_symptom')[0].style.display = 'none';
    document.getElementsByClassName('add_analysis')[0].style.display = 'none';
    document.getElementsByClassName('add_medicine')[0].style.display = 'none';
    document.getElementsByClassName('add_brigade')[0].style.display = 'none';
})

document.getElementById("add_symptom_nav").addEventListener("click", function (e) {
    document.getElementById("add_diagnosis_nav").className = "nav__link";
    document.getElementById("add_symptom_nav").className = "nav__link nav_active";
    document.getElementById("add_analysis_nav").className = "nav__link";
    document.getElementById("add_medicine_nav").className = "nav__link";
    document.getElementById("add_brigade_nav").className = "nav__link";

    document.getElementsByClassName('add_diagnosis')[0].style.display = 'none';
    document.getElementsByClassName('add_symptom')[0].style.display = 'block';
    document.getElementsByClassName('add_analysis')[0].style.display = 'none';
    document.getElementsByClassName('add_medicine')[0].style.display = 'none';
    document.getElementsByClassName('add_brigade')[0].style.display = 'none';
})

document.getElementById("add_analysis_nav").addEventListener("click", function (e) {
    document.getElementById("add_diagnosis_nav").className = "nav__link";
    document.getElementById("add_symptom_nav").className = "nav__link";
    document.getElementById("add_analysis_nav").className = "nav__link nav_active";
    document.getElementById("add_medicine_nav").className = "nav__link";
    document.getElementById("add_brigade_nav").className = "nav__link";

    document.getElementsByClassName('add_diagnosis')[0].style.display = 'none';
    document.getElementsByClassName('add_symptom')[0].style.display = 'none';
    document.getElementsByClassName('add_analysis')[0].style.display = 'block';
    document.getElementsByClassName('add_medicine')[0].style.display = 'none';
    document.getElementsByClassName('add_brigade')[0].style.display = 'none';
})

document.getElementById("add_medicine_nav").addEventListener("click", function (e) {
    document.getElementById("add_diagnosis_nav").className = "nav__link";
    document.getElementById("add_symptom_nav").className = "nav__link";
    document.getElementById("add_analysis_nav").className = "nav__link";
    document.getElementById("add_medicine_nav").className = "nav__link nav_active";
    document.getElementById("add_brigade_nav").className = "nav__link";

    document.getElementsByClassName('add_diagnosis')[0].style.display = 'none';
    document.getElementsByClassName('add_symptom')[0].style.display = 'none';
    document.getElementsByClassName('add_analysis')[0].style.display = 'none';
    document.getElementsByClassName('add_medicine')[0].style.display = 'block';
    document.getElementsByClassName('add_brigade')[0].style.display = 'none';
})

document.getElementById("add_brigade_nav").addEventListener("click", function (e) {
    document.getElementById("add_diagnosis_nav").className = "nav__link";
    document.getElementById("add_symptom_nav").className = "nav__link";
    document.getElementById("add_analysis_nav").className = "nav__link";
    document.getElementById("add_medicine_nav").className = "nav__link";
    document.getElementById("add_brigade_nav").className = "nav__link nav_active";

    document.getElementsByClassName('add_diagnosis')[0].style.display = 'none';
    document.getElementsByClassName('add_symptom')[0].style.display = 'none';
    document.getElementsByClassName('add_analysis')[0].style.display = 'none';
    document.getElementsByClassName('add_medicine')[0].style.display = 'none';
    document.getElementsByClassName('add_brigade')[0].style.display = 'block';
})


document.getElementById("submit_add_diagnosis").addEventListener("click", function (e) {
    e.preventDefault();
    let diagnosis_name = document.getElementById('diagnosis_name');
    let symptom_name = document.getElementById('symptom_name');
    console.log(symptom_name);
    let diagnosis = JSON.stringify({
        diagnosis_name: diagnosis_name.value,
        symptom_name: $('#select_symptoms').val(),
    });
    console.log(diagnosis);
    let request = new XMLHttpRequest();
    request.open("POST", "/add_diagnosis_symptoms", true); // посылаем запрос на адрес "/user"
    request.setRequestHeader("Content-Type", "application/json");
    request.send(diagnosis);

    request.addEventListener("load", function () {
        // получаем и парсим ответ сервера
        let repeat = JSON.parse(request.response);
        //console.log(repeat.answer)
        if (repeat.answer == 1) {
            alert("Ошибка: диагноз уже есть в базе!")
        } else {
            alert("Диагноз успешно добавлен в базу")
        }
    });
})

document.getElementById("reload_diagnosis").addEventListener("click", function (e) {
    e.preventDefault();

    $('#select_symptoms').find('option').remove(); //удаление старых данных
    $("#select_symptoms").load("account" + " #select_symptoms>*", "");
    document.getElementById('diagnosis_name').value = ''

})


document.getElementById("submit_add_symptom").addEventListener("click", function (e) {
    e.preventDefault();
    console.log('hello')
    let symptomName = document.getElementById('addSymptom');
    console.log(symptomName.value)
    let symptom = JSON.stringify({
        symptom_name: symptomName.value,
    });
    console.log(symptom);
    let request = new XMLHttpRequest();
    request.open("POST", "/add_symptom", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(symptom);

    request.addEventListener("load", function () {
        // получаем и парсим ответ сервера
        let repeat = JSON.parse(request.response);
        console.log(repeat.answer)
        if (repeat.answer == 1) {
            alert("Ошибка! Такой симптом уже есть в базе")
        } else {
            alert("Симптом успешно добавлен в базу")
        }
    });
})

document.getElementById("reload_symptoms").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById('addSymptom').value = ''

})

document.getElementById("submit_add_analysis").addEventListener("click", function (e) {
    e.preventDefault();
    console.log('hello')
    let analysis_name = document.getElementById('add_analysis');
    let analysis = JSON.stringify({
        analysis_name: analysis_name.value,
    });
    console.log(analysis_name);
    let request = new XMLHttpRequest();
    request.open("POST", "/add_analysis", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(analysis);
    request.addEventListener("load", function () {
        // получаем и парсим ответ сервера
        let repeat = JSON.parse(request.response);
        console.log(repeat.answer)
        if (repeat.answer == 1) {
            alert("Такой анализ уже есть в базе")
        } else {
            alert("Анализ успешно добавлен в базу")
        }
    });
})

document.getElementById("reload_analysis").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById('add_analysis').value = ''
})

document.getElementById("submit_add_medicine").addEventListener("click", function (e) {
    e.preventDefault();
    let medicine_name = document.getElementById('name_medicine');
    let diagnosis_name = document.getElementById('diagnosis_name');
    console.log(medicine_name);
    console.log(diagnosis_name);
    let medicine = JSON.stringify({
        medicine_name: medicine_name.value,
        diagnosis: $('#select_diagnosis').val(),
    });
    console.log(medicine);
    let request = new XMLHttpRequest();
    request.open("POST", "/add_medicine", true); // посылаем запрос на адрес "/user"
    request.setRequestHeader("Content-Type", "application/json");
    request.send(medicine);
    request.addEventListener("load", function () {
        let repeat = JSON.parse(request.response);
        console.log(repeat.answer)
        if (repeat.answer == 1) {
            alert("Такое лекарство уже есть в базе")
        } else {
            alert("Лекарство успешно добавлено в базу")
        }
    });
})

document.getElementById("reload_medicine").addEventListener("click", function (e) {
    e.preventDefault();

    $('#select_diagnosis').find('option').remove(); //удаление старых данных
    $("#select_diagnosis").load("account" + " #select_diagnosis>*", "");
    document.getElementById('name_medicine').value = ''

})

document.getElementById("subsear").addEventListener("click", function (e) {
    e.preventDefault();
    let brigade_name1 = document.getElementById('surname');
    let brigade = JSON.stringify({
        brigade_name1: brigade_name1.value,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "/add_brigade", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(brigade);
    request.addEventListener("load", function () {
        let infDel = JSON.parse(request.response);
        if (infDel.flag == 'true') {
            alert('Добавление произошло успешно')
        } else {
            alert('Произошла ошибка с добавлением, данная бригада есть в базе.')
        }
    })
})

document.getElementById("reload_brigade").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById('surname').value = ''

})
document.getElementById("delete_analysis").addEventListener("click", function (e) {
    e.preventDefault();
    let analysis_name1 = document.getElementById('add_analysis');
    let analysis1 = JSON.stringify({
        analysis_name1: analysis_name1.value,
    });
    console.log(analysis_name1);
    let request1 = new XMLHttpRequest();
    request1.open("POST", "/delete_analysis", true);
    request1.setRequestHeader("Content-Type", "application/json");
    request1.send(analysis1);
    request1.addEventListener("load", function () {
        let infDel = JSON.parse(request1.response);
        if (infDel.flag) {
            alert('Удаление произошло успешно')
        } else {
            alert('Произошла ошибка с удалением, данного анализа нет в базе')
        }
    })
})

document.getElementById("delete_symptom").addEventListener("click", function (e) {
    e.preventDefault();
    let symptom_name1 = document.getElementById('addSymptom');
    let symptom1 = JSON.stringify({
        symptom_name1: symptom_name1.value,
    });
    let request1 = new XMLHttpRequest();
    request1.open("POST", "/delete_symptom", true);
    request1.setRequestHeader("Content-Type", "application/json");
    request1.send(symptom1);
    request1.addEventListener("load", function () {
        let infDel = JSON.parse(request1.response);
        if (infDel.flag) {
            alert('Удаление произошло успешно')
        } else {
            alert('Произошла ошибка с удалением, данного симптома нет в базе')
        }
    })
})

document.getElementById("delsear").addEventListener("click", function (e) {
    e.preventDefault();
    let brigade_name1 = document.getElementById('surname');
    let brigade1 = JSON.stringify({
        brigade_name1: brigade_name1.value,
    });
    let request1 = new XMLHttpRequest();
    request1.open("POST", "/delete_brigada", true);
    request1.setRequestHeader("Content-Type", "application/json");
    request1.send(brigade1);
    request1.addEventListener("load", function () {
        let infDel = JSON.parse(request1.response);
        if (infDel.flag) {
            alert('Удаление произошло успешно. Работники, относящиеся к бригаде уволены')
        } else {
            alert('Произошла ошибка с удалением, данной бригады нет в базе.')
        }
    })
})

document.getElementById("delete_medicine").addEventListener("click", function (e) {
    e.preventDefault();
    let medicine_name1 = document.getElementById('name_medicine');
    let medicine1 = JSON.stringify({
        medicine_name1: medicine_name1.value,
    });
    let request1 = new XMLHttpRequest();
    request1.open("POST", "/delete_medicine", true);
    request1.setRequestHeader("Content-Type", "application/json");
    request1.send(medicine1);
    request1.addEventListener("load", function () {
        let infDel = JSON.parse(request1.response);
        if (infDel.flag == 'true') {
            alert('Удаление произошло успешно')
        } else {
            alert('Произошла ошибка с удалением, данного лекарства нет в базе')
        }
    })
})

document.getElementById("delete_diag_medicine").addEventListener("click", function (e) {
    e.preventDefault();
    let medicine_name2 = document.getElementById('name_medicine');
    let symptom_name2 = document.getElementById('select_diagnosis')
    let medicine2 = JSON.stringify({
        medicine_name: medicine_name2.value,
        diagnosis: $('#select_diagnosis').val()
    });
    let request1 = new XMLHttpRequest();
    request1.open("POST", "/delete_medicine_diag", true);
    request1.setRequestHeader("Content-Type", "application/json");
    request1.send(medicine2);
    request1.addEventListener("load", function () {
        let infDel = JSON.parse(request1.response);
        if (infDel.flag) {
            alert('Удаление произошло успешно')
        } else {
            if (infDel.flag === 'false1') {
                alert('Произошла ошибка с удалением, данного лекарства нет в базе')
            } else {
                if (infDel.flag === 'false2') {
                    alert('Произошла ошибка с удалением, данного диагноза нет в базе')
                } else {
                    alert('Произошла ошибка с удалением, у данного лекарства нет такого диагноза')
                }

            }

        }
    })
})

document.getElementById("update_medicine").addEventListener("click", function (e) {
    e.preventDefault();
    let medicine_name2 = document.getElementById('name_medicine');
    let symptom_name2 = document.getElementById('select_diagnosis')
    let medicine2 = JSON.stringify({
        medicine_name: medicine_name2.value,
        diagnosis: $('#select_diagnosis').val()
    });
    let request1 = new XMLHttpRequest();
    request1.open("POST", "/update_medicine_diag", true);
    request1.setRequestHeader("Content-Type", "application/json");
    request1.send(medicine2);
    request1.addEventListener("load", function () {
        let infDel = JSON.parse(request1.response);
        if (infDel.flag === 'true') {
            alert('Добавление произошло успешно')
        } else {
            if (infDel.flag === 'false1') {
                alert('Произошла ошибка с добавлением, данного лекарства нет в базе. Нажмите на кнопку добавить')
            } else {
                if (infDel.flag === 'false2') {
                    alert('Произошла ошибка с добавлением, данного диагноза нет в базе')
                } else {
                    alert('Произошла ошибка с добавлением, данное лекарство уже связано с этим диагнозом')
                }

            }

        }
    })
})


document.getElementById("delete_diagnosis").addEventListener("click", function (e) {
    e.preventDefault();
    let diagnosis_name1 = document.getElementById('diagnosis_name');
    let diagnosis1 = JSON.stringify({
        diagnosis_name1: diagnosis_name1.value,
    });
    let request1 = new XMLHttpRequest();
    request1.open("POST", "/delete_diagnosis", true);
    request1.setRequestHeader("Content-Type", "application/json");
    request1.send(diagnosis1);
    request1.addEventListener("load", function () {
        let infDel = JSON.parse(request1.response);
        if (infDel.flag) {
            alert('Удаление произошло успешно')
        } else {
            alert('Произошла ошибка с удалением, данного диагноза нет в базе')
        }
    })
})

document.getElementById("delete_diag_symptom").addEventListener("click", function (e) {
    e.preventDefault();
    let diagnosis_name = document.getElementById('diagnosis_name');
    let symptom_name = document.getElementById('symptom_name');
    console.log(diagnosis_name);
    console.log(symptom_name);
    let diagnosis = JSON.stringify({
        diagnosis_name: diagnosis_name.value,
        symptom_name: $('#select_symptoms').val(),
    });
    console.log(diagnosis);
    let request = new XMLHttpRequest();
    request.open("POST", "/delete_diagnosis_symptoms", true); // посылаем запрос на адрес "/user"
    request.setRequestHeader("Content-Type", "application/json");
    request.send(diagnosis);
    request.addEventListener("load", function () {
        let infDel = JSON.parse(request.response);
        console.log("флаг")

        if (infDel.flag === 'true') {
            alert('Удаление произошло успешно')
        } else {
            if (infDel.flag === 'false1') {
                alert('Произошла ошибка с удалением, данного симптома у диагноза нет в базе')
            } else {
                if (infDel.flag === 'false2') {
                    alert('Произошла ошибка с удалением, данного симптома у диагноза нет в базе')
                }

            }

        }
        //ДАНЯ добавь обработку результата false-нет диагноза; false1-нет симптома из списка  false2-нет у диагноза данного симптома false3-не удалось удалить true -удалилось
    })
})

document.getElementById("update_diagnosis").addEventListener("click", function (e) {
    e.preventDefault();
    let diagnosis_name = document.getElementById('diagnosis_name');
    let symptom_name = document.getElementById('symptom_name');
    console.log(diagnosis_name);
    console.log(symptom_name);
    let diagnosis = JSON.stringify({
        diagnosis_name: diagnosis_name.value,
        symptom_name: $('#select_symptoms').val(),
    });
    console.log(diagnosis);
    let request = new XMLHttpRequest();
    request.open("POST", "/update_diagnosis", true); // посылаем запрос на адрес "/user"
    request.setRequestHeader("Content-Type", "application/json");
    request.send(diagnosis);
    request.addEventListener("load", function () {
        let infDel = JSON.parse(request.response);
        console.log(infDel.flag)
        switch (infDel.flag) {
            case 'false':
                alert('Нет такого диагноза')
                break
            case 'false1':
                alert('Нет такого симптома');
                break
            case 'false2':
                alert('Такой(-ие) симптом(-ы) уже привязан(-ы) к данному диагнозу')
                break
            case 'false3':
                alert('Ошибка добавления связи Диагноз-Симптом')
                break
            case 'true':
                alert('Симптом(-ы) успешно добавлен(-ы) к диагнозу')
                break;
        }
        //ДАНЯ добавь обработку результата false-нет диагноза; false1-нет симптома из списка  false2-нет у диагноза данного симптома false3-не удалось удалить true -удалилось
    })
})


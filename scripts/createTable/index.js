import changeRow from "../changeRow.js";
import addNavigationHandlers from "./addNavigationHandlers.js";
import initTable from "./initTable.js";

//создаем и експортируем всю таблицу
export const table = document.querySelector("table");

//строка, по которой кликнул пользователь
let currentRow;

//функция-обработчик клика по таблице (вместо создания обработчика по каждой строке используется делегирование) 
function createTableClickHandler(event) {
    //останавливаем распрострение клика, чтобы остановить всплытие события клика по документу и показать форму
    event.stopPropagation();
    //берем значения из выбранной строки
    const nameInput = document.querySelector("#name");
    const surnameInput = document.querySelector("#surname");
    const aboutInput = document.querySelector("#about");
    const eyeColorInput = document.querySelector("#eyeColor");
    const formHeading = document.querySelector(".form-heading");
    //если клик был по заголовку таблицы, то ничего не делать
    if (event.target.nodeName === "CAPTION") return;

    //записываем в currentRow строку, по которой был клик
    currentRow = event.target;

    //если клик был по дочернему элементу, а не по самой строке, то проходим по предкам, пока не дойдем до строки tr
    while (currentRow.nodeName !== "TR") {
        currentRow = currentRow.parentElement;
    }

    //если клик был не по строке с заголовками, то записываем данные из выбранной строки в форму
    if (!currentRow.classList.contains("table-heading")) {
        nameInput.value = currentRow.children[0].innerHTML;
        surnameInput.value = currentRow.children[1].innerHTML;
        aboutInput.value = currentRow.children[2].children[0].innerHTML;
        eyeColorInput.value = currentRow.children[3].children[0].firstChild.innerHTML;

        //показываем форму на экране
        form.style.display = "flex";
    }
}

//инициализируем таблицу в первый раз (создаем коллекцию pages - страниц, на которые был разбит исходный массив с данными)
let pages = initTable();

//добавляем на созданную таблицу обработчик клика
table.addEventListener("click", createTableClickHandler);

//создаем кнопки перехода между страницами
addNavigationHandlers(pages);

//получем форму редактирования данных строки
const form = document.querySelector("form");

//останавливаем распрострение клика, чтобы остановить всплытие события клика по документу и не закрыть форму
form.addEventListener("click", event => {
    event.stopPropagation();
})

//после сабмита формы создаем новую строку, вставляем ее вместо старой и закрываем форму
form.addEventListener("submit", function createformHandler(event) {
    //убираем действие по умолчанию, чтобы страница не перезагрузилась
    event.preventDefault();
    //узнаем текущий номер строки (это цифра до слеша в элементе с классом .current-page)
    let currentPageNumber = +document.querySelector(".current-page").innerHTML.split('/')[0] - 1;
    //вызываем функцию, заменяющую старую строку на новую
    changeRow(+currentRow.dataset.rowNumber, table, pages, currentPageNumber);
    //скрываем форму
    form.style.display = "none";
});

//добавляем обработчик на документ, чтобы при клике на пустую область закрывать форму
document.addEventListener("click", () => {
    form.style.display = "none";
});
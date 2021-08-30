import createRow from "./createRowFunction.js";

export default function changeRow(currentRowNumber, table, pages, currentPageNumber) {

    //получаем все input из формы
    const nameInput = document.querySelector("#name");
    const surnameInput = document.querySelector("#surname");
    const aboutInput = document.querySelector("#about");
    const eyeColorInput = document.querySelector("#eyeColor");

    //все строки таблицы без строки с заголовками столбцов
    let rows = Array.from(table.rows).slice(1);
    
    //создаем новую строку в таблице на основе данных, полученных от пользователя
    const newRow = createRow(nameInput.value, surnameInput.value, aboutInput.value, eyeColorInput.value, currentRowNumber);

    //определяем строку, в которой надо сделать изменения
    const currentRow = rows.filter(e => +e.dataset.rowNumber === currentRowNumber)[0];

    //получаем массив измененных строк на текущей странице
    let pageRows = pages.get(currentPageNumber).map(e => +e.dataset.rowNumber === currentRowNumber ? e = newRow : e);

    //заменяем изменяемую строку на новую в pages, чтобы при переходе между страницами изменения оставались
    pages.set(currentPageNumber, pageRows);

    //заменяем изменяемую троку на новую newRow
    currentRow.replaceWith(newRow);
}
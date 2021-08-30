import { table } from "./createTable/index.js";

//берем все кнопки, отвечающие за фильтры
const sortButtons = Array.from(document.querySelectorAll(".sort"));

//функция, блокирующая нажатую кнопку сортировки. Получает текущее состояние всех кнопок и нажатую кнопку.
function disableCurrentSortButton(buttons, selectedButton) {
    selectedButton.setAttribute("disabled", "disabled");
    //убираем блокировку со всех остальных кнопок
    const unselectedButtons = buttons.filter(e => e != selectedButton);
    unselectedButtons.map(button => button.removeAttribute("disabled"));
}

sortButtons.map(((button, i) => {
    button.addEventListener("click", () => {
        //присваиваем каждому столбцу свой номер
        const tableColumns = {
            name: 0,
            surname: 1,
            about: 2,
            eyeColor: 3
        };
        //берем все строки кроме первой
        const sortedRows = Array.from(table.rows).slice(1);
        //определяем номер столбца, по которому происходит сортировка (в button.parentElement.dataset.columnName содержется название текущего столбца)
        const tableColumnNumber = tableColumns[button.parentElement.parentElement.dataset.columnName];
        //смотрим в каком порядке надо отсортировать
        switch (button.dataset.order) {
            //если в порядке, обратном алфавитному
            case "descending":
                sortedRows.sort((rowA, rowB) => rowA.cells[tableColumnNumber].innerHTML > rowB.cells[tableColumnNumber].innerHTML ? -1 : 1);
                //блокируем только что нажатую кнопку
                disableCurrentSortButton(sortButtons, button);
                break;
                //если в алфавитном
            case "ascending":
                sortedRows.sort((rowA, rowB) => rowA.cells[tableColumnNumber].innerHTML > rowB.cells[tableColumnNumber].innerHTML ? 1 : -1);
                //блокируем только что нажатую кнопку
                disableCurrentSortButton(sortButtons, button);
                break;
        };
        //втавляем отсортированные строки в таблицу
        table.tBodies[0].append(...sortedRows);
    });
}));
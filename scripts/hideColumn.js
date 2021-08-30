import { table } from "./createTable/index.js";

// получаем кнопки, отвечающие за скрытие/показ столбца
const hideColumnButtons = Array.from(document.querySelectorAll("input[type='checkbox']"));

//вешаем на каждую кнопку обработчик нажатия
for (let i = 0; i < hideColumnButtons.length; i++) {
    hideColumnButtons[i].addEventListener("change", () => {
        //получаем все строки таблицы текущей страницы
        const tableRows = Array.from(table.rows);
        //в каждой строке скрываем/показываем нужную ячейку (tableRows[j].children[i] это ячейка в текущем толбце i на j строке)
        for (let j = 0; j < tableRows.length; j++) {
            let rowStyle = tableRows[j].children[i].style;
            rowStyle.display === "none" ? rowStyle.display = "table-cell" : rowStyle.display = "none";
        }
    });
};

document.querySelector(".hideColumnMenu").addEventListener("click", event => {
    event.stopPropagation();
});

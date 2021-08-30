import { table } from "./index.js";

//функция, создающая кнопки перехода между страницами
export default function addNavigationHandlers(pages) {
    //берем кнопки перехода между страницами
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");

    // получаем кнопки, отвечающие за скрытие/показ столбца
    const hideColumnButtons = Array.from(document.querySelectorAll("input[type='checkbox']"));
    //получаем заголовки столбцов
    const cellHeadings = Array.from(document.querySelectorAll("th"));

    //номер текущей страницы
    let pageNum = 0;

    //функция, убирающая текущую страницу 
    function clearTable(tbody) {
        //удаляем первую строку, пока она есть (удалаем 1, а не 0, т к нулевая строка - это заголовки столбцов)
        while (tbody.rows[1]) {
            tbody.deleteRow(1);
        }
    }

    //добавляем обработчик для компки перехода на следующую страницу
    next.addEventListener("click", () => {
        //разблокируем кнопку перехода на предыдущую страницу
        prev.removeAttribute("disabled");
        //устанвливаем все чекбоксы в true, т к показаны все столбцы
        hideColumnButtons.map(checkbox => checkbox.checked = true);
        //показываем заголовки если они были скрыты
        cellHeadings.map(cell => cell.style.display = "table-cell");
        //выполнится, если если имеется следующая страница
        if (pages.has(pageNum + 1)) {
            //убираем текущую страницу
            clearTable(table.tBodies[0]);

            //показываем следующую страницу (увеличиваем pageNum и берем массив строк из следущей страницы из коллекции страниц)
            table.tBodies[0].append(...Array.from(pages.get(++pageNum)));

            //получаем все ячейки текущей страницы
            const allCells = Array.from(document.querySelectorAll("td"));

            //показываем все ячейки
            allCells.map(cell => cell.style.display = "table-cell");

            //разблокируем все фильтры
            const sortButtons = Array.from(document.querySelectorAll(".sort"));
            sortButtons.map(button => button.removeAttribute("disabled"));

            //записываем номер текущей страницы в элемент ".current-page"
            document.querySelector(".current-page").innerHTML = pageNum + 1 + '/' + pages.size;

            //если нет следующего элемента, то заблокировать кнопку
            if (!pages.has(pageNum + 1)) next.setAttribute("disabled", "disabled");
        }
    });

    //добавляем обработчик для компки перехода на предыдущую страницу
    prev.addEventListener("click", () => {
        //разблокируем кнопку перехода на следующую страницу
        next.removeAttribute("disabled");
        //устанвливаем все чекбоксы в true, т к показаны все столбцы
        hideColumnButtons.map(checkbox => checkbox.checked = true);
        //показываем заголовки если они были скрыты
        cellHeadings.map(cell => cell.style.display = "table-cell");
        //выполнится, если если имеется предыдущая страница
        if (pages.has(pageNum - 1)) {
            //убираем текущую страницу
            clearTable(table.tBodies[0]);

            //записываем номер текущей страницы в элемент ".current-page"
            document.querySelector(".current-page").innerHTML = pageNum + '/' + pages.size;

            //показываем предыдущую страницу (уменьшаем pageNum и берем массив строк из предыдущей страницы из коллекции страниц)
            table.tBodies[0].append(...Array.from(pages.get(--pageNum)));

            //получаем все ячейки текущей страницы
            const allCells = Array.from(document.querySelectorAll("td"));

            //показываем все ячейки
            allCells.map(cell => cell.style.display = "table-cell");

            //разблокируем все фильтры
            const sortButtons = Array.from(document.querySelectorAll(".sort"));
            sortButtons.map(button => button.removeAttribute("disabled"));

            //если нет предыдущего элемента, то заблокировать кнопку
            if (!pages.has(pageNum - 1)) prev.setAttribute("disabled", "disabled");
        }
    });
}
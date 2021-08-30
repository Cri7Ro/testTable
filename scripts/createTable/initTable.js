import { info } from "../data.js";
import createRow from "../createRowFunction.js";
import { table } from "./index.js";

//функция, инициализирующая таблицу и возвращающая коллекцию страниц 
export default function initTable() {
    //коллекция страниц, получаемая разбиением исходного массива info
    const pages = new Map();
    //массив строк на текущей странице
    let currentPage = [];
    //номер текущей страницы
    let numberPage = 0;

    info.map((element, i) => {
        //создаем новую строку, со значениями из текущего элемента исходного массива
        let newRow = createRow(element.name.firstName, element.name.lastName, element.about, element.eyeColor, i);
        
        //выполнится, если елемент не нулевой и на текущей странице уже 10 строк
        if (i % 10 === 0 && i !== 0) {
            //записываем в коллекцию страницу с номером
            pages.set(numberPage, currentPage);
            //создаем другой массив для записи строк следующей страницы
            currentPage = [];
            //увеличиваем номер страницы
            numberPage++;
        }

        //записываем текущую строку в массив строк текущей страницы
        currentPage.push(newRow);
        //записываем в коллекцию последнюю страницу
        if (i === info.length - 1) pages.set(numberPage, currentPage);
    })

    //выводим таблицу с данными из первой стриницы 
    table.tBodies[0].append(...Array.from(pages.get(0)));
    //записываем в элемент .current-page номер страницы 1
    document.querySelector(".current-page").innerHTML = 1 + '/' + pages.size;
    return pages;
}
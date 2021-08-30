export default function createRow(nameValue, surnameValue, aboutValue, eyeColorValue, rowNumber) {

    //создаем новую строку
    let tr = document.createElement("tr");
    //создаем ячейки в новой строке, которые будут в строке
    let tdName = document.createElement("td");
    let tdSurname = document.createElement("td");
    let tdAbout = document.createElement("td");
    let tdEyeColor = document.createElement("td");
    //создаем div для хранения контента с инфориацией
    let aboutContent = document.createElement("div");
    //создаем div для пока цвета в таблице 
    let color = document.createElement("div");
    //цвет, заданный текстом
    let colorText = document.createElement("p");
    //добавляем текст цвета и div, показывающий цвет в один контейнер
    let cellEyeColor = document.createElement("div");

    //добавляем классы, для написания стилей 
    aboutContent.classList.add("about");
    color.classList.add("eyeColor");
    colorText.classList.add("colorText");
    cellEyeColor.classList.add("cellEyeColor");

    //в созданные ячейки записываем данные, полученные при вызове функции
    tdName.innerHTML = nameValue;
    tdSurname.innerHTML = surnameValue;
    aboutContent.innerHTML = aboutValue;
    tdAbout.append(aboutContent);
    colorText.innerHTML = eyeColorValue;
    //заливаем div цветом, которые соответствует тексту в colorText
    color.style.backgroundColor = eyeColorValue;
    //если цвет написан непраильно, то выводим полученное значение
    if (!color.style.backgroundColor) color.innerHTML = eyeColorValue;
    //добавляем в ячеку с цветом глаз контейнер с цветом
    cellEyeColor.append(colorText);
    cellEyeColor.append(color);
    tdEyeColor.append(cellEyeColor);

    //вставляем в строку созданные ячейки и номер, переданный при вызове фенкции
    tr.setAttribute("data-row-number", rowNumber);
    tr.append(tdName);
    tr.append(tdSurname);
    tr.append(tdAbout);
    tr.append(tdEyeColor);

    return tr;
}
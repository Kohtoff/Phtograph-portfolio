//берем элементы из хтмл
const mainPageBtn = document.querySelector(".info-box__button");
const bookBtn = document.body.querySelector(".book__btn");
const popup = document.body.querySelector(".popup");
const closeBtn = document.querySelector(".modal-form__close");
const form = document.querySelector(".modal-form");
const formInputs = document.querySelectorAll(".modal-form__input");
const submitBtn = document.querySelector(".modal-form__btn");

//функции открытия/закрытия формы путем изменения значения стиля дисплей
function showForm() {
  if (!popup.style.display) {
    popup.style.display = "flex";
  }
}

function closeForm() {
  if (popup.style.display === "flex") {
    popup.style.display = "none";
  }
}

//собираем дату каждый раз когда пользователь вводит что-либо в форме
function storeData() {
  const formData = new FormData(form);
  //из формДаты делаем обьект, что бы видеть что там наш пользователь написюкал
  //Создаем массив массивов(массивы имеют вид ключ, пара) из формДаты
  return Array.from(formData.entries()).reduce(
    //проходимся по массиву с массивами редьюсом, попутно вызывая колбэк функцию
    //которая принимате в качестве аргументов обьект, который на первой итерации пустой
    //и массив пары
    (obj, pair) => ({
      //возвразаем сразу же обьект, который с помощью диструктуризации заполняем обьектом,
      //который мы получили во время предыдущих итераций
      ...obj,
      //и новыми парами ключей-значений. Уже не в виде массива
      //джойн мы используем для того что бы достать значения,
      //которое до этого одиноко сидело в массиве
      [pair[0]]: [pair[1]].join(),
    }),
    {}
  );
}
formInputs.forEach((item) => item.addEventListener("input", storeData));
if (mainPageBtn) {
  mainPageBtn.addEventListener("click", showForm);
} else {
    bookBtn.addEventListener('click', showForm);
}

closeBtn.addEventListener("click", closeForm);
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeForm();
  alert("Thanks for your feedback");
  console.log(storeData());
});

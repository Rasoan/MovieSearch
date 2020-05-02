let buttonSearch = document.querySelector(".button-search");
let my_input_search = document.querySelector(".input-search");
let slider_container = document.querySelector(".container-slider");
const my_id = "812ef198";
let current_page = 1; // номер текущей страницы карточек которую обрабатывает слайдер
let cards_current_page = []; // все карточки текущей страницы
let my_input_search_value = ''; // текущее значение инпута
let my_input_search_value_translate = ''; // перевод содержимого инпута
let global_error = true; // тру это значит что всё хорошо и запрос удачен
let count_pages = 0; // сколько всего страниц по запросу







// функция которая возьмёт из инпута текст и переведёт его, запишет перевод текста и оригинал в глобальные переменные
async function translate() {

  try {
    my_input_search_value = my_input_search.value; // записали оригинал поиска

    if ( !my_input_search_value ) return;
    let response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T072125Z.5214d89f357d1ea0.9c96b2eed2559991b3730c16497d84b60b215622&text=${my_input_search_value}&lang=ru-en`);
    response = await response.json(); // запрос на перевод текста

    response = response.text[0]; // получили текст
    my_input_search_value_translate = response; // записали значение в глобальную переменную

    return response; // вернули промис в котором перевод слова
  } catch (error) {
    console.log(error);
  }

}







// запрос на фильмы, первый аргумент это текст запроса, второй аргумент это страница запроса
async function fetchAsyncTodos(number_page) {

  try {

    let response = await fetch(`http://www.omdbapi.com/?s=${my_input_search_value_translate}&page=${number_page}&apikey=${my_id}&s`);
    response = await response.json();

    return response; // возвращаем объект который содержит текущую страницу результат запроса в промисе
  } catch (error) {
    console.log(error);
  }

}


// запрос на подробную информацию конкретного фильма по айдишнику
async function fetch_current_kino(kino_id) {

  try {
    const response = await fetch(`http://www.omdbapi.com/?i=${kino_id}&apikey=${my_id}`)
    const data = await response.json(); // распарсить строку в джсон объект
    let k = await data;
    return k;
  } catch (error) {
    console.log(error);
  }

}






// функция запроса, по умолчанию получает первую страницу
async function get(number_page = '1') {
  cards_current_page.length = 0; // удаляем все карточки которые там есть в основном объекте



  let array_id = []; // массив айдишников фильмов текущей страницы по запросу



  let time_array = fetchAsyncTodos(number_page); //  содержимое инпута, номер страницы


  let global_error = await time_array; // работа с индикатором ошибки
  global_error = global_error.Response.toLowerCase() == "true" ? true : false; // присвоить этому индикатору значение


  if (!global_error) {
    console.log("Ошибка! Программа завершилась.");
    return; // если запрос завершился неудачно то выходим из этой функции
  }


  const data = await time_array; // промис в котором вся инфа
  count_pages = data.totalResults; // всего количество страниц



  data.Search.forEach(element => { // цикл по основной инфе страниц
    array_id.push(element.imdbID); // положили айдишник в отдельный массив айдишников
    cards_current_page.push( // положили объект отдельного фильма в массив фильмов (основной массив глобальный)
      {
        link: `https://www.imdb.com/title/${element.imdbID}`, // ссылка на фильм
        img: element.Poster // картинка фильма
      }
    )
  });

  let more_info_cards = []; // временный массив в котором вся инфа одного фильма, вся и нужная и не нужная
  array_id.forEach(element => { // по массиву айдишников выцепили дополнительные данные и положили их в массив
    more_info_cards.push(fetch_current_kino(element))
  });

  more_info_cards = await Promise.all(more_info_cards); // массив промисов стал массивом объектов

  for (let i = 0; i < more_info_cards.length; i++) { // в этом цикле мы добавляем основному объекту все нужную инфу по фильмам
    cards_current_page[i].imdbID = more_info_cards[i].imdbID;
    cards_current_page[i].title = more_info_cards[i].Title;
    cards_current_page[i].imdbRating = more_info_cards[i].imdbRating;
    cards_current_page[i].year = more_info_cards[i].Year;
    cards_current_page[i].genre = more_info_cards[i].Genre;
    cards_current_page[i].plot = more_info_cards[i].Plot;
  }

}

// просто индикатор
async function work() {
  console.log(count_pages);
}














buttonSearch.addEventListener('click', async element => {
  await translate();

  await get(1); // номер страницы, по умолчани первая

});
document.addEventListener("submit", element => element.preventDefault());









/*.......................................................*/
var appendNumber = 600;
var prependNumber = 1;
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  virtual: {
    slides: (function () {
      var slides = [];
      for (var i = 0; i < 600; i += 1) {
        slides.push('Slide ' + (i + 1));
      }
      return slides;
    }()),
  },
});
document.querySelector('.slide-1').addEventListener('click', function (e) {
  e.preventDefault();
  swiper.slideTo(0, 0);
});
document.querySelector('.slide-250').addEventListener('click', function (e) {
  e.preventDefault();
  swiper.slideTo(249, 0);
});
document.querySelector('.slide-500').addEventListener('click', function (e) {
  e.preventDefault();
  swiper.slideTo(499, 0);
});
document.querySelector('.prepend-2-slides').addEventListener('click', function (e) {
  e.preventDefault();
  swiper.virtual.prependSlide([
    'Slide ' + (--prependNumber),
    'Slide ' + (--prependNumber)
  ]);
});
document.querySelector('.append-slide').addEventListener('click', function (e) {
  e.preventDefault();
  swiper.virtual.appendSlide('Slide ' + (++appendNumber));
});
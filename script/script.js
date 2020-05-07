// swiper.slideNext() // перейти к следующему слайду
// swiper.slidePrev() // перейти к предыдущему слайду
// swiper.activeIndex // номер активного слайда
// swiper.update(); // обновить слайдер после манипуляций с его дом
// swiper.appendSlide ( слайды ); // добавить слайды
// swiper.removeAllSlides(); // удалить все слайды
let buttonSearch = document.querySelector(".button-search");
let my_input_search = document.querySelector(".input-search");
let slider_container = document.querySelector(".container-slider");
let message_block = document.querySelector(".message-text");

const my_id = "812ef198";
const my_yandex_translate_id = "trnsl.1.1.20200502T072125Z.5214d89f357d1ea0.9c96b2eed2559991b3730c16497d84b60b215622";
let cards_current_page = []; // массив в котором хранится 10 объектов с информацией по фильмам
let my_input_search_value = 'troy'; // текущий текст внутри инпута
let my_input_search_value_translate = 'troy'; // перевод содержимого инпута

let count_kino = 0; // сколько всего фильмов по запросу
let count_pages = 0; // сколько всего страниц по запросу
let count_slides_in_swiper = 0; // сколько страниц в слайдере на данный момент
let next_movie = 0; // номер следующего фильма который загрузим в слайдер их всего 9 штук
let count_fetch = 1; // количество запрошенных и добавленных в слайдер страниц по данному запросу инпута
let indicate_fetch = true; // индикатор фетчей, можно ли сделать следующий фетч? есть ли ещё страницы по данному запросу?
let stop_slide_changed_listener = false; // для слушателя события перелистывания слайдера
let swiper = new Swiper('.swiper-container', { // создаём слайдер
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
});

let global_error = true; // индикатор запроса
let translate_error = false;
let movie_search_fetch_error = false;



function messageToUser(message_text) {
  message_block.innerHTML = "Всего фильмов по запросу " + message_text + " " + count_kino;
}



// функция которая возьмёт из инпута текст и переведёт его, запишет перевод текста и оригинал в глобальные переменные
async function translate() {
  if (my_input_search.value == '') {
    messageToUser("Пустой инпут, конец");
    translate_error = true;
    return;
  }

  try {
    my_input_search_value = my_input_search.value; // записали оригинал поиска !!!тут подумай ещё!!!


    let response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${my_yandex_translate_id}&text=${my_input_search_value}&lang=ru-en`); // фетчим перевод слова которое в инпуте
    response = await response.json(); // получили объект из промиса
    response = response.text[0]; // получили перевод текста на английский
    my_input_search_value_translate = response; // записали перевод текста в глобальную переменную


    return response; // вернули промис в котором перевод слова
  } catch (error) {
    messageToUser("Это блок catch в функции translate, ОШИБКА!");
    translate_error = true;
  }

}







// запрос на фильмы, аргумент это номер запрашиваемой страницы
async function fetchAsyncTodos(number_page) {
  if (translate_error) { // проблемы в translate() выход
    return;
  }

  try {

    let response = await fetch(`https://www.omdbapi.com/?s=${my_input_search_value_translate}&page=${number_page}&apikey=${my_id}&s`);
    const data = await response.json(); // распарсили строку в объект


    if (data.Response == "False") { // если фетч ничего не смог вернуть возбуждаем ошибку
      throw Error();
    }

    return data; // возвращаем объект который содержит текущую страницу результат запроса в промисе
  } catch (error) {
    movie_search_fetch_error = true;
    console.log("ошибка в fetchAsyncTodos() ");
  }
}


// запрос на полную информацию по конкретному фильму, аргумент это айдишник фильма
async function fetch_current_kino(kino_id) {
  if (translate_error) { // проблемы в translate, выход
    return;
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${kino_id}&apikey=${my_id}`); // фетч
    console.log( response );
    const data = await response.json(); // распарсить строку в джсон объект

    
    return data; // вернуть промис в котором объект с основной инфой по фильму
  } catch (error) {

    movie_search_fetch_error = true;
    console.log("Ошибка в fetch_current_kino()");
  }
}




let isFetching = false; // это флаг, пока он true загружаем страницу и не позволяем ложить undefine в слайдер
// функция запроса, аргумент это номер страницы, которую будем фетчить
async function get(number_page) {




  isFetching = true; // запрещаем ложить карточки в слайдер, работает get()




  cards_current_page.length = 0; // удаляем все 10 карточек из массива объекстов-фильмов



  let array_id = []; // массив айдишников фильмов текущей страницы по запросу
  let data = await fetchAsyncTodos(number_page); // промис в котором вся инфа
  let global_error = data; // работа с индикатором ошибки

  if (translate_error || movie_search_fetch_error) {
    return;
  }



  count_pages = Math.ceil(data.totalResults / 10); // всего количество страниц, делим на 10 и округляем вверх
  count_kino = data.totalResults; // количество фильмов по текущему запросу всего



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
    cards_current_page[i].imdbRating = more_info_cards[i].imdbRating == "N/A" ? "not rating" : more_info_cards[i].imdbRating;
    cards_current_page[i].year = more_info_cards[i].Year;
    cards_current_page[i].genre = more_info_cards[i].Genre;
    cards_current_page[i].plot = more_info_cards[i].Plot;
    cards_current_page[i].img = cards_current_page[i].img == "N/A" ? "images/notimage.jpg" : cards_current_page[i].img;
  }




  isFetching = false; // разрешаем ложить карточки в слайдер, гет закончила работу
  if (number_page !== 1) addNextSlide(); // вот тут очень интересно


  count_fetch++; // увеличиваем счётчик фетчей на один что бы сделать следующий новый запрос
}




// функция которая добавит слайд
function addNextSlide() {

  if (translate_error || movie_search_fetch_error) {
    return;
  }





  if (swiper.activeIndex == count_slides_in_swiper - 1 && cards_current_page.length) { // если мы находимся на предпоследнем слайде
    swiper.appendSlide(`<div class="swiper-slide">
   <div class="swiper-contant-container">
    <a class="swiper-tittle" href="${cards_current_page[next_movie].link}">${cards_current_page[next_movie].title}</a>
    <p class="swiper-rating">${cards_current_page[next_movie].imdbRating}</p>
    <img class="swiper-img" src="${cards_current_page[next_movie].img}">
 </div>
  </div>`);

    next_movie++; // номер следующего добавленного фильма из массива фильмов +1
    count_slides_in_swiper++; // количество слайдов в слайдере +1
  }
}












// инициализация свайпера при загрузке страницы
async function init_swip() {
  if (translate_error || movie_search_fetch_error) {

    return;
  }



  for (let i = 0; i < cards_current_page.length; i++) { // добавить карточки в свайпер при загрузке страницы сразу
    swiper.appendSlide(`<div class="swiper-slide">
                         <div class="swiper-contant-container">
                         <a class="swiper-tittle" href="${cards_current_page[i].link}">${cards_current_page[i].title}</a>
                         <p class="swiper-rating">${cards_current_page[i].imdbRating}</p>
                         <img class="swiper-img" src="${cards_current_page[i].img}">
                        </div>
                        </div>`);

  }
  count_slides_in_swiper = cards_current_page.length; // кол-во слайдов в слайдере равно массиву фильмов
  if (count_kino < 11) {
    return;
  }
  await get(2); // после того как загрузили первые 10 карточек забираем новые 10 фильмов
}





// переведёт слово в инпуте, скачает первую страницу и загрузит её в слайдер, скачает вторую страницу на запас
async function initialize_swider() {

  await get(1); // фетч запрос первой страницы
  await init_swip(); // инициализация свайпера

}
initialize_swider(); // и вызвать сразу эту функцию







// слушатель события - стукнули по кнопке поисковика
buttonSearch.addEventListener('click', async element => {
  translate_error = false;
  movie_search_fetch_error = false;
  stop_slide_changed_listener = true; // пока true слушатель слайдера заткнут
  cards_current_page = []; // массив в котором хранится 10 объектов с информацией по фильмам
  my_input_search_value = 'troy'; // текущий текст внутри инпута
  my_input_search_value_translate = 'troy'; // перевод содержимого инпута
  global_error = true; // индикатор запроса
  count_kino = 0; // сколько всего фильмов по запросу
  count_pages = 0; // сколько всего страниц по запросу
  count_slides_in_swiper = 0; // сколько страниц в слайдере на данный момент
  next_movie = 0; // номер следующего фильма который загрузим в слайдер их всего 9 штук
  count_fetch = 1; // количество запрошенных и добавленных в слайдер страниц по данному запросу инпута
  indicate_fetch = true; // индикатор фетчей, можно ли сделать следующий фетч? есть ли ещё страницы по данному запросу?


  swiper.removeAllSlides(); // удалить все слайды из слайдера




  await translate(); // перевести слово
  await get(1); // фетч запрос первой страницы
  messageToUser(my_input_search.value);
  await init_swip(); // инициализировать слайдер новыми карточками
});
document.addEventListener("submit", element => element.preventDefault()); // отменить отправку формы








/*-----------------------------слушатель слайдера начало-----------------------------*/
swiper.on("slideChange", async () => { // добавить слушателя слайдеру
  if (translate_error || movie_search_fetch_error || isFetching || !indicate_fetch) {

    return;
  }


  if (stop_slide_changed_listener) {
    stop_slide_changed_listener = false;
    return;
  }





  await addNextSlide(); // вызвали асинхронно функцию которая добавит слайд

  if (count_slides_in_swiper == count_kino) {
    indicate_fetch = false; // запрещаем новые запросы, потому что нет чего больше запрашивать
    return;
  } // если количество страниц в слайдере равно максимуму страниц по запросу то exit

  if (next_movie == 10) { // если счётчик равен 10 и можно ещё сделать запрос, то сбрасываем счётчик следующего фильма
    next_movie = 0;


    await get(count_fetch); // делаем запрос на новые 10 фильмов   
  }


});
/*-----------------------------слушатель слайдера конец-----------------------------*/








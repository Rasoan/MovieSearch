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
const button_top = document.querySelector(".back-top");
const button_end = document.querySelector(".go-end");
const loading = document.getElementById("followingBallsG");
const indicator_slides = document.getElementById("swiper-pagination-id");
const clear_search = document.getElementById("form-search-clear-id");
const keyboard_search = document.getElementById("form-search-keyboard-id");


// const my_id = "812ef198"; // rasoian
// const my_id = "88afb97a"; // ipk
const my_id = "6670627"; // ipk2diplom
const my_yandex_translate_id = "trnsl.1.1.20200502T072125Z.5214d89f357d1ea0.9c96b2eed2559991b3730c16497d84b60b215622";
let cards_current_page = []; // массив в котором хранится 10 объектов с информацией по фильмам
let my_input_search_value = 'troy'; // текущий текст внутри инпута
let my_input_search_value_translate = 'troy'; // перевод содержимого инпута
let count_kino = 0; // сколько всего фильмов по запросу
let count_pages = 0; // сколько всего страниц по запросу
let count_slides_in_swiper = 0; // сколько страниц в слайдере на данный момент
let count_fetch = 1; // количество запрошенных и добавленных в слайдер страниц по данному запросу инпута
let indicate_fetch = true; // индикатор фетчей, можно ли сделать следующий фетч? есть ли ещё страницы по данному запросу?
let stop_slide_changed_listener = 0; // для слушателя события перелистывания слайдера
let movie_request_limit = false; // когда закончится возможно скачивать фильмы это станет тру
let translate_error = false; // ошибка в translate()
let movie_search_fetch_error = false;  // ошибка в поисковике фильмов
let start_page = false; // если страница только загрузилась заткнуть обработчика события slidechange
let key_up_flag = false; // запрещаем повторное нажатие по enter
let word_query = ''; // последний запрос


let swiper = new Swiper('.swiper-container', { // создаём слайдер
  slidesPerView: 4,
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





function messageToUser(message_text) {
  if (message_text == '') {
    message_block.innerHTML = "Для того что бы найти фильм, надо ввести в поле поиска его название.";
    return;
  }
  
  if ( movie_request_limit ) {
    message_block.innerHTML = "К сожалению лимит запросов на сервер www.omdbapi.com закончен, приходи завтра, найдём кинцо, а на сегодня всё.";
    return;
  }


  if (count_kino == 0) {
    message_block.innerHTML = "По данному запросу [ " + message_text + " ] ничего не найдено!";
    return;
  }

  message_block.innerHTML = "Всего " + count_kino + " фильма по запросу [ " + message_text + " ]";
}



// функция которая возьмёт из инпута текст и переведёт его, запишет перевод текста и оригинал в глобальные переменные
async function translate() {
  
  if (my_input_search.value == '') {
    messageToUser("Пустой инпут, конец");
    translate_error = true;
    return;
  }
  
  
  let check_in_english = my_input_search.value.match(/\w/gi);
  if ( check_in_english ) {
    my_input_search_value_translate = my_input_search.value;
    return;
  }

  try {
    my_input_search_value = my_input_search.value; // записали оригинал поиска 


    let response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${my_yandex_translate_id}&text=${my_input_search_value}&lang=ru-en`); // фетчим перевод слова которое в инпуте
    response = await response.json(); // получили объект из промиса
    response = response.text[0]; // получили перевод текста на английский
    my_input_search_value_translate = response; // записали перевод текста в глобальную переменную

    console.log("Сработала translate() и вернула " + response);
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
    

    if (data.Error == "Request limit reached!") {
      movie_request_limit = true; // если вышел лимит запросов то тру
      movie_search_fetch_error = true; // ошибка в запросе
      return;
    }

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
  loading.style.visibility = "visible";
  indicator_slides.style.visibility = "hidden";
 

  console.log("Сработала get(), это её начало");
  console.log("Номер страницы которую скачает get() = " + number_page);
  console.log("Запрос пойдёт по слову ", my_input_search_value_translate);




  isFetching = true; // запрещаем ложить карточки в слайдер, работает get()




  cards_current_page.length = 0; // удаляем все 10 карточек из массива объекстов-фильмов



  let array_id = []; // массив айдишников фильмов текущей страницы по запросу
  let data = await fetchAsyncTodos(number_page); // промис в котором вся инфа


  if (translate_error || movie_search_fetch_error) {
    loading.style.visibility = "hidden";
    indicator_slides.style.visibility = "visible";
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
  console.log( more_info_cards );
  for (let i = 0; i < more_info_cards.length; i++) { // в этом цикле мы добавляем основному объекту все нужную инфу по фильмам
    cards_current_page[i].imdbID = more_info_cards[i].imdbID; // айдишник 
    cards_current_page[i].title = more_info_cards[i].Title;   // название 
    cards_current_page[i].imdbRating = more_info_cards[i].imdbRating == "N/A" ? "" : more_info_cards[i].imdbRating; // рейтинг
    more_info_cards[i].Year = more_info_cards[i].Year.slice(0, 4);
    cards_current_page[i].year = more_info_cards[i].Year;  // дата выпуска 
    cards_current_page[i].genre = more_info_cards[i].Genre; // жанр
    cards_current_page[i].plot = more_info_cards[i].Plot; // описание 
    cards_current_page[i].img = cards_current_page[i].img == "N/A" ? "images/notimage.jpg" : cards_current_page[i].img; // картинка
  }



  
  isFetching = false; // разрешаем ложить карточки в слайдер, гет закончила работу
  

  console.log("count_fetch = " + count_fetch );
  count_fetch++; // увеличиваем счётчик фетчей на один что бы сделать следующий новый запрос
  console.log("count_fetch = " + count_fetch );
  

  console.log("Конец get(), массив фильмов = ", cards_current_page );
  loading.style.visibility = "hidden";
  indicator_slides.style.visibility = "visible";
}




// функция которая добавит слайд
 function addNextSlide() {
   console.log("Начало addNextSlide()");



  

  if (translate_error || movie_search_fetch_error) {
    console.log("addNextSlide() досрочно закрыта! ничего не добавлено.");
    return;
  }





    console.log("Пошла загрузка в слайдер карточек");
    
    
    
    for (let i = 0; i < cards_current_page.length; i++) {
      swiper.appendSlide(`<div class="swiper-slide">
      <div class="swiper-contant-container">
       <img class="swiper-img" src="${cards_current_page[i].img}">
       <a class="swiper-tittle" href="${cards_current_page[i].link}">${cards_current_page[i].title}</a>
       <p class="swiper-year">${cards_current_page[i].year}</p>
       <p class="swiper-rating">${cards_current_page[i].imdbRating}</p>
       <div class="swiper-additional-information">
         <p class="swiper-genre">${cards_current_page[i].genre}</p>
         <p class="swiper-plot">${cards_current_page[i].plot}</p>
       </div>
        </div>
        </div>`);
    

    
    count_slides_in_swiper++; // количество слайдов в слайдере +1

    console.log("В слайдер загрузилась " + Number(count_fetch - 1) + " страница"); 
  }

  
  
  




  console.log("Конец addnextslide().");
}


















// переведёт слово в инпуте, скачает первую страницу и загрузит её в слайдер, скачает вторую страницу на запас
async function initialize_swider() {

  await get(1); // фетч запрос первой страницы
  await addNextSlide();

  //await init_swip(); // инициализация свайпера

}
initialize_swider(); // и вызвать сразу эту функцию







// слушатель события - стукнули по кнопке поисковика
buttonSearch.addEventListener('click', async element => {
  translate_error = false;
  movie_search_fetch_error = false;
  stop_slide_changed_listener = 2; // пока true слушатель слайдера заткнут
  cards_current_page = []; // массив в котором хранится 10 объектов с информацией по фильмам
  word_query = my_input_search_value_translate; // запоминаем последний запрос
  count_kino = 0; // сколько всего фильмов по запросу
  count_pages = 0; // сколько всего страниц по запросу
  count_slides_in_swiper = 0; // сколько страниц в слайдере на данный момент
  count_fetch = 1; // количество запрошенных и добавленных в слайдер страниц по данному запросу инпута
  indicate_fetch = true; // индикатор фетчей, можно ли сделать следующий фетч? есть ли ещё страницы по данному запросу?
  start_page = true; // страница только начала загружатся повторно гет не вызывать
  movie_request_limit = false; // станет тру, когда  закончится лимит запрососв на фильмы


  




  await translate(); // перевести слово
  await get(1); // фетч запрос первой страницы
  messageToUser(my_input_search.value);
  

 
  if ( count_kino ) {
    translate_error = false;
    movie_search_fetch_error = false;
    swiper.removeAllSlides(); // удалить все слайды из слайдера
    await addNextSlide(); // инициализировать слайдер новыми карточками
  }
  else {
    translate_error = false;
    movie_search_fetch_error = false;
    my_input_search_value = word_query; // текущий текст внутри инпута
    my_input_search_value_translate = word_query; // перевод содержимого инпута
    await get(1); // фетч запрос первой страницы
    swiper.removeAllSlides(); // удалить все слайды из слайдера
    await addNextSlide(); // инициализировать слайдер новыми карточками
  }


});



// то же самое что и клик когда нажимаем на ентер
document.addEventListener("keydown", async element => {
  if ( element.code != "Enter" || key_up_flag ) return; // если нажали не по ентеру

  key_up_flag = true; // запрещаем повторное бесконечное нажатие enter

  // закрываем клавиатуру и выполняем запрос
  if ( !my_keyboard.classList.contains("display-none") ) {
    my_keyboard.classList.add("display-none");
  }



  translate_error = false;
  movie_search_fetch_error = false;
  stop_slide_changed_listener = 2; // пока true слушатель слайдера заткнут
  cards_current_page = []; // массив в котором хранится 10 объектов с информацией по фильмам
  word_query = my_input_search_value_translate; // запоминаем последний запрос
  count_kino = 0; // сколько всего фильмов по запросу
  count_pages = 0; // сколько всего страниц по запросу
  count_slides_in_swiper = 0; // сколько страниц в слайдере на данный момент
  count_fetch = 1; // количество запрошенных и добавленных в слайдер страниц по данному запросу инпута
  indicate_fetch = true; // индикатор фетчей, можно ли сделать следующий фетч? есть ли ещё страницы по данному запросу?
  start_page = true; // страница только начала загружатся повторно гет не вызывать
  movie_request_limit = false; // станет тру, когда  закончится лимит запрососв на фильмы

  alert( word_query );

  await translate(); // перевести слово
  await get(1); // фетч запрос первой страницы
  messageToUser(my_input_search.value);
  


  if ( count_kino ) {
    translate_error = false;
    movie_search_fetch_error = false;
    swiper.removeAllSlides(); // удалить все слайды из слайдера
    await addNextSlide(); // инициализировать слайдер новыми карточками
  }
  else {
    translate_error = false;
    movie_search_fetch_error = false;
    my_input_search_value = word_query; // текущий текст внутри инпута
    my_input_search_value_translate = word_query; // перевод содержимого инпута
    await get(1); // фетч запрос первой страницы
    swiper.removeAllSlides(); // удалить все слайды из слайдера
    await addNextSlide(); // инициализировать слайдер новыми карточками
  }

});










// когда отпущу enter флаг возвращаем в фолс
document.addEventListener("keyup", async element => {
  key_up_flag = false;
});



/*-----------------------------слушатель слайдера начало-----------------------------*/
swiper.on("slideChange", async () => { // добавить слушателя слайдеру
  console.log("------------Событие slideChange сработало-----------");

  // убрать виртуальную клавиатуру если свайпнули слайдер
  if ( !my_keyboard.classList.contains("display-none") ) { 
    my_keyboard.classList.add("display-none");
  }
  


  if (translate_error || movie_search_fetch_error || isFetching || !indicate_fetch) {
    console.log("Событие slideChange exit");
    return;
  }
  

  if (stop_slide_changed_listener) {
    console.log("Событие slideChange exit, при клике по инпуту!");
    stop_slide_changed_listener--;
    return;
  }




  if (swiper.activeIndex > count_slides_in_swiper - 6 && cards_current_page.length) {
    await get(count_fetch); // делаем запрос на новые фильмы
    await addNextSlide(); // вызвали асинхронно функцию которая добавит слайд
  }

  

  
  
  await ( () => {
    console.log("В слайдере слайдов = " + count_slides_in_swiper );
    console.log("Всего фильмов = " + count_kino );
  })();
  
  if (count_slides_in_swiper == count_kino) {
    console.log("Событие slideChange exit нет чего запрашивать");
    indicate_fetch = false; // запрещаем новые запросы, потому что нет чего больше запрашивать
    return;
  } // если количество страниц в слайдере равно максимуму страниц по запросу то exit

  



  
  
});
/*-----------------------------слушатель слайдера конец-----------------------------*/





// переход в начало слайдера
button_top.addEventListener("click", () => {
  stop_slide_changed_listener = 0; // для слушателя события перелистывания слайдера
  swiper.slideTo( 0  );
});

// переход в конец слайдера
button_end.addEventListener("click", () => {
  stop_slide_changed_listener = 0; // для слушателя события перелистывания слайдера
  swiper.slideTo( count_slides_in_swiper );
});

let my_keyboard = document.querySelector(".keyboard-container");
keyboard_search.addEventListener("click", () => {
  my_keyboard.classList.toggle("display-none");
});


clear_search.addEventListener("click", () => {
  my_input_search.value = '';
});



document.addEventListener('click', element => {
  if( element.target.closest(".keyboard-container") || element.target.classList.contains("form-search-keyboard") ||element.target.classList.contains("input-search") || element.target.classList.contains("form-search-clear")) 
  return;
  
  if ( !my_keyboard.classList.contains("display-none") ) {
    my_keyboard.classList.add("display-none");
  }
  
});

document.addEventListener('click', element => {
  if ( element.target.closest(".keyboard-container") ) {
    my_input_search.focus();
  }
});







// когда кликнули по кнопке enter на виртуальной клавиатуре
document.addEventListener('click', async element => {
  
 if( !element.target.classList.contains("key-enter") )  return; // если кликнули мышко не по ентеру то выходим из листенера
 
 // закрываем клавиатуру и выполняем запрос
 if ( !my_keyboard.classList.contains("display-none") ) {
  my_keyboard.classList.add("display-none");
}
  
 
 translate_error = false;
  movie_search_fetch_error = false;
  stop_slide_changed_listener = 2; // пока true слушатель слайдера заткнут
  cards_current_page = []; // массив в котором хранится 10 объектов с информацией по фильмам
  word_query = my_input_search_value_translate; // запоминаем последний запрос
  count_kino = 0; // сколько всего фильмов по запросу
  count_pages = 0; // сколько всего страниц по запросу
  count_slides_in_swiper = 0; // сколько страниц в слайдере на данный момент
  count_fetch = 1; // количество запрошенных и добавленных в слайдер страниц по данному запросу инпута
  indicate_fetch = true; // индикатор фетчей, можно ли сделать следующий фетч? есть ли ещё страницы по данному запросу?
  start_page = true; // страница только начала загружатся повторно гет не вызывать
  movie_request_limit = false; // станет тру, когда  закончится лимит запрососв на фильмы


  




  await translate(); // перевести слово
  await get(1); // фетч запрос первой страницы
  messageToUser(my_input_search.value);
  

  if ( count_kino ) {
    translate_error = false;
    movie_search_fetch_error = false;
    swiper.removeAllSlides(); // удалить все слайды из слайдера
    await addNextSlide(); // инициализировать слайдер новыми карточками
  }
  else {
    translate_error = false;
    movie_search_fetch_error = false;
    my_input_search_value = word_query; // текущий текст внутри инпута
    my_input_search_value_translate = word_query; // перевод содержимого инпута
    await get(1); // фетч запрос первой страницы
    swiper.removeAllSlides(); // удалить все слайды из слайдера
    await addNextSlide(); // инициализировать слайдер новыми карточками
  }

});






let buttonSearch = document.querySelector(".button-search");
let my_input_search = document.querySelector(".input-search");
let slider_container = document.querySelector(".container-slider");
const my_id = "812ef198";
const my_yandex_translate_id = "trnsl.1.1.20200502T072125Z.5214d89f357d1ea0.9c96b2eed2559991b3730c16497d84b60b215622";
let cards_current_page = []; // массив в котором хранится 10 объектов с информацией по фильмам
let my_input_search_value = 'troy'; // текущий текст внутри инпута
let my_input_search_value_translate = 'troy'; // перевод содержимого инпута
let global_error = true; // индикатор запроса
let count_kino = 0; // сколько всего фильмов по запросу
let count_pages = 0; // сколько всего страниц по запросу
let count_slides_in_swiper = 0; // сколько страниц в слайдере на данный момент
let swiper; // объект слайдер
let next_movie = 0; // номер следующего фильма который загрузим в слайдер их всего 9 штук
let count_fetch = 1; // количество запрошенных и добавленных в слайдер страниц по данному запросу инпута
let indicate_fetch = true; // индикатор фетчей, можно ли сделать следующий фетч? есть ли ещё страницы по данному запросу?
let stop_slide_changed = false;







// функция которая возьмёт из инпута текст и переведёт его, запишет перевод текста и оригинал в глобальные переменные
async function translate() {
  try {
    
    my_input_search_value = my_input_search.value; // записали оригинал поиска !!!тут подумай ещё!!!


    //if ( !my_input_search_value ) return; //  тут ещё тоже надо подумать !!!!!!!!!!!!!!!!
    

    let response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${my_yandex_translate_id}&text=${my_input_search_value}&lang=ru-en`); // фетчим перевод слова которое в инпуте
    response = await response.json(); // получили объект из промиса

    response = response.text[0]; // получили перевод текста на английский
    my_input_search_value_translate = response; // записали перевод текста в глобальную переменную
  
    return response; // вернули промис в котором перевод слова
  } catch (error) {
    global_error = true; // инпут пустой
    console.log("Инпут пустой, алё!");
  }
}







// запрос на фильмы, аргумент это номер запрашиваемой страницы
async function fetchAsyncTodos(number_page) {
  try {
    let response = await fetch(`https://www.omdbapi.com/?s=${my_input_search_value_translate}&page=${number_page}&apikey=${my_id}&s`);
    const data = await response.json(); // распарсили строку в объект
    return data; // возвращаем объект который содержит текущую страницу результат запроса в промисе
  } catch (error) {
    console.log(error);
  }
}


// запрос на полную информацию по конкретному фильму, аргумент это айдишник фильма
async function fetch_current_kino(kino_id) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${kino_id}&apikey=${my_id}`); // фетч
    const data = await response.json(); // распарсить строку в джсон объект
    return data; // вернуть промис в котором объект с основной инфой по фильму
  } catch (error) {
    console.log(error);
  }
}




let isFetching = false; // это флаг, пока он true загружаем страницу и не позволяем ложить undefine в слайдер
// функция запроса, аргумент это номер страницы, которую будем фетчить
async function get(number_page) {

  isFetching = true; // пока он true, слайды в слайдер ложиться не будут
  console.log("Номер страницы по текущему запросу " + number_page);
  console.log("сейчас все карточки удалю что бы вместо них fetch новые, их всего 10!");
  console.log("Массив из которого буду брать слайды сейчас пустой!")
  console.log("Началась загрузка данных с помощью fetch!!!!!");


     cards_current_page.length = 0; // удаляем все 10 карточек из массива объекстов-фильмов
     console.log("массив фильмов очищен", cards_current_page.length );


  let array_id = []; // массив айдишников фильмов текущей страницы по запросу
  let data = await fetchAsyncTodos(number_page); // промис в котором вся инфа
  let global_error = data; // работа с индикатором ошибки

  global_error = global_error.Response.toLowerCase() == "true" ? true : false; // присвоить этому индикатору значение


  if (!global_error) {
    console.log("Ошибка! Программа завершилась.");
    return; // если запрос завершился неудачно то выходим из этой функции
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

  console.log("Загрузка данных завершена массив наполнен, теперь можно добавлять новые слайды в слайдер!!!")
  console.log("Вывожу в консоль фильмы которые загрузятся в слайдер");
  console.log(cards_current_page); // массив с фильмами
  isFetching = false;
  if (number_page !== 1) addNextSlide(); // вот тут очень интересно
}

// просто индикатор
async function work() {
  console.log(count_pages);
}


// функция которая добавит слайд
function addNextSlide() {
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




// создать слайдер
swiper = new Swiper('.swiper-container', { // инициализация
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







// инициализация свайпера при загрузке страницы
async function init_swip() {
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
  await get(2); // после того как загрузили первые 10 карточек забираем новые 10 фильмов
  count_fetch++; // увеличили счётчик фетчей на один
}





// при загрузке страницы сразу прочитать карточки
async function initialize_swider() {
  console.log("Старт html страницы, загружаю первые 10 страниц по умолчанию в слайдер.");
  await translate();
  await get(1); // фетч запрос первой страницы
  await init_swip(); // инициализация свайпера
}
initialize_swider(); // и вызвать сразу эту функцию







// слушатель события - стукнули по кнопке поисковика
buttonSearch.addEventListener('click', async element => {
  stop_slide_changed = true;
  global_error = true; // индикатор запроса
  count_kino = 0; // сколько всего фильмов по запросу
  count_pages = 0; // сколько всего страниц по запросу
  count_slides_in_swiper = 0; // сколько страниц в слайдере на данный момент

  next_movie = 0; // номер следующего фильма который загрузим в слайдер их всего 9 штук
  count_fetch = 1; // количество запрошенных и добавленных в слайдер страниц по данному запросу инпута
  indicate_fetch = true; // индикатор фетчей, можно ли сделать следующий фетч? есть ли ещё страницы по данному запросу?

  swiper.removeAllSlides();       // удалить все слайды из слайдера
  my_input_search_value = my_input_search.value; // записали оригинал поиска !!!тут подумай ещё!!!


  await translate(); // перевести слово
  await get(1); // фетч запрос первой страницы
  await init_swip(); // инициализировать слайдер новыми карточками
});
document.addEventListener("submit", element => element.preventDefault()); // отменить отправку формы



/* swiper swiper swiper swiper swiper swiper swiper swiper swiper swiper swiper swiper swiper swiper swiper */

// swiper.slideNext() // перейти к следующему слайду
// swiper.slidePrev() // перейти к предыдущему слайду
// swiper.activeIndex // номер активного слайда
// swiper.update(); // обновить слайдер после манипуляций с его дом
// swiper.appendSlide ( слайды ); // добавить слайды
// swiper.removeAllSlides(); // удалить все слайды








/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------слушатель слайдера начало кода-----------------------------*/
swiper.on("slideChange", async () => { // добавить слушателя слайдеру
  if ( stop_slide_changed ) { 
    console.log("--------------------Смешно, обработчик события тут!!!!!!!!!!!!!!!!!!!!!!!!");
    stop_slide_changed = false;
    return;
  }

  console.log("----------------слушатель начал работу---------");

  if (isFetching) {
    console.log("Флаг true, обработчик свайпа слайдера резко завершён!");
    return;
  }

  console.log("Всего слайдов в слайдере =" + count_slides_in_swiper);
  console.log("Всего фильмов по запросу =" + count_kino);
  console.log("Номер активного слайда свайпера =" + swiper.activeIndex);
  console.log("Всего страниц по текущему запросу " + count_pages);
  console.log("номер  фильма в массиве фильмов который будем добавлять = " + next_movie);
  console.log("indicate_fetch = ", indicate_fetch);

  if (!indicate_fetch) { // заткнуть слушателя события перелистывания слайда если все страницы за-fetch-ены
    console.log("Все, больше нет чего запрашивать, фильмов нет, обработчик событий завершён");
    return; // закончили работу слушателя
  }

  await addNextSlide(); // вызвали асинхронно функцию которая добавит слайд
  
  if (count_slides_in_swiper == count_kino) {
    indicate_fetch = false; // запрещаем новые запросы, потому что нет чего больше запрашивать
    return;
  } // если количество страниц в слайдере равно максимуму страниц по запросу то exit

  if (next_movie == 10) { // если счётчик равен 10 и можно ещё сделать запрос, то сбрасываем счётчик следующего фильма
    next_movie = 0;
    count_fetch++; // увеличиваем счётчик фетчей на один что бы сделать следующий новый запрос

    await get(count_fetch); // делаем запрос на новые 10 фильмов   
  }

  console.log("---------слушатель закончил работу---------");
});
/*---------------------------------------------слушатель слайдера конец кода------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
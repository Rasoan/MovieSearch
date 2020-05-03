let buttonSearch = document.querySelector(".button-search");
let my_input_search = document.querySelector(".input-search");
let slider_container = document.querySelector(".container-slider");
const my_id = "812ef198";
let cards_current_page = []; // все карточки текущей страницы
let my_input_search_value = 'troy'; // текущее значение инпута
let my_input_search_value_translate = ''; // перевод содержимого инпута
let global_error = true; // тру это значит что всё хорошо и запрос удачен
let count_pages = 0; // сколько всего страниц по запросу
let count_slides_in_swiper = 0; // сколько страниц в слайдере на данный момент
let swiper; // объект слайдер
let next_movie = 0; // номер следующего фильма который загрузим в слайдер их всего 9 штук
let count_fetch = 1; // количество запрошенных и добавленных в слайдер страниц по данному запросу инпута
let indicate_fetch = true; // индикатор фетчей, можно ли сделать следующий фетч? есть ли ещё страницы по данному запросу?
let test_array = [];
let count_kino = 0;






// функция которая возьмёт из инпута текст и переведёт его, запишет перевод текста и оригинал в глобальные переменные
async function translate() {

  try {
    my_input_search_value = my_input_search.value ? my_input_search.value : my_input_search_value; // записали оригинал поиска
    console.log(my_input_search_value);
    if (!my_input_search_value) return;
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
    console.log("start fetch");
    let response = await fetch(`https://www.omdbapi.com/?s=${my_input_search_value_translate}&page=${number_page}&apikey=${my_id}&s`);
    console.log("end fetch");
    const data = await response.json();
    //console.log("response =", response );

    return data; // возвращаем объект который содержит текущую страницу результат запроса в промисе
  } catch (error) {
    console.log(error);
  }

}


// запрос на подробную информацию конкретного фильма по айдишнику
async function fetch_current_kino(kino_id) {

  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${kino_id}&apikey=${my_id}`)
    const data = await response.json(); // распарсить строку в джсон объект
    let k = await data;
    return k;
  } catch (error) {
    console.log(error);
  }

}




let isFetching = false;

// функция запроса, по умолчанию получает первую страницу
async function get(number_page = '1') {
  isFetching = true;
  console.log("Номер страницы по текущему запросу " + number_page);
  console.log("сейчас все карточки удалю что бы вместо них fetch новые, их всего 10!");
  console.log("Массив из которого буду брать слайды сейчас пустой!")
  console.log("Началась загрузка данных с помощью fetch, пока не разрешу загружать данные не должно быть console.log(), иначе произошла ошибка!!!!!");
  cards_current_page.length = 0; // удаляем все карточки которые там есть в основном объекте их всего 10






  let array_id = []; // массив айдишников фильмов текущей страницы по запросу



  let data = await fetchAsyncTodos(number_page);    // промис в котором вся инфа

  console.log( data );

  let global_error = data; // работа с индикатором ошибки
  global_error = global_error.Response.toLowerCase() == "true" ? true : false; // присвоить этому индикатору значение


  if (!global_error) {
    console.log("Ошибка! Программа завершилась.");
    return; // если запрос завершился неудачно то выходим из этой функции
  }



  count_pages = Math.ceil( data.totalResults / 10 ); // всего количество страниц, делим на 10 и округляем вверх
  count_kino = data.totalResults;


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
    cards_current_page[i].imdbRating = more_info_cards[i].imdbRating == "N/A" ? "not rating": more_info_cards[i].imdbRating;
    cards_current_page[i].year = more_info_cards[i].Year;
    cards_current_page[i].genre = more_info_cards[i].Genre;
    cards_current_page[i].plot = more_info_cards[i].Plot;
    cards_current_page[i].img = cards_current_page[i].img == "N/A" ? "images/notimage.jpg": cards_current_page[i].img;
  }

  console.log("Загрузка данных завершена массив наполнен, теперь можно добавлять новые слайды в слайдер!!!")
  console.log("Вывожу в консоль фильмы которые загрузятся в слайдер");
  console.log( cards_current_page ); // массив с фильмами
  isFetching = false;
  if (number_page !== 1) addNextSlide();
}

// просто индикатор
async function work() {
  console.log(count_pages);
}



function addNextSlide() {
  if( swiper.activeIndex == count_slides_in_swiper - 1 && cards_current_page.length ) { // если мы находимся на предпоследнем слайде
    swiper.appendSlide(`<div class="swiper-slide">
   <div class="swiper-contant-container">
    <a class="swiper-tittle" src="${cards_current_page[next_movie].link}">${cards_current_page[next_movie].title}</a>
    <p class="swiper-rating">${cards_current_page[next_movie].imdbRating}</p>
    <img class="swiper-img" src="${cards_current_page[next_movie].img}">
 </div>
  </div>`);

  next_movie++; // номер следующего добавленного фильма из массива фильмов +1

  count_slides_in_swiper++; // количество слайдов в слайдере увеличилось на 1
 }
}





// инициализация свайпера при загрузке страницы
async function init_swip() {

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



  for(let i = 0; i < cards_current_page.length; i++) { // добавить карточки в свайпер при загрузке страницы сразу
    swiper.appendSlide(`<div class="swiper-slide">
                         <div class="swiper-contant-container">
                         <a class="swiper-tittle" src="${cards_current_page[i].link}">${cards_current_page[i].title}</a>
                         <p class="swiper-rating">${cards_current_page[i].imdbRating}</p>
                         <img class="swiper-img" src="${cards_current_page[i].img}">
                        </div>
                        </div>`);

  }
  count_slides_in_swiper = cards_current_page.length;  // кол-во слайдов в слайдере равно массиву фильмов
  await get( 2  ); // после того как загрузили первые 10 карточек забираем новые 10 фильмов
  count_fetch++; // увеличили счётчик фетчей на один

/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------слушатель слайдера начало кода-----------------------------*/
  swiper.on("slideChange", async () => { // добавить слушателя слайдеру
    if (isFetching) return;

    console.log("------------------------------------------------------");

    console.log("Всего слайдов в слайдере =" + count_slides_in_swiper);
    console.log("Всего фильмов по запросу =" + count_kino);


    console.log("Номер активного слайда свайпера =" + swiper.activeIndex);

    console.log("Всего страниц по текущему запросу " + count_pages );
    console.log("номер  фильма в массиве фильмов который добавили только что = " + next_movie);

    if ( !indicate_fetch ) { // заткнуть слушателя события перелистывания слайда если все страницы за-fetch-ены
      console.log("Все, больше нет чего запрашивать, фильмов нет, обработчик событий завершён");
      return;
    }







     await addNextSlide();


    if ( count_slides_in_swiper ==  count_kino) {
      indicate_fetch = false; // запрещаем новые запросы, потому что нет чего больше запрашивать
      return;
    } // если количество страниц в слайдере равно максимуму страниц по запросу то exit




    if ( next_movie == 10 ) { // если счётчик равен 10 и можно ещё сделать запрос, то сбрасываем счётчик следующего фильма
      next_movie = 0;
      count_fetch++; // увеличиваем счётчик фетчей на один что бы сделать следующий новый запрос

      console.log("get start");
      await get( count_fetch   ); // делаем запрос на новые 10 фильмов
      console.log("get end");
    }




    console.log("---------------------------------------");
  });
/*---------------------------------------------слушатель слайдера конец кода------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------*/

}







// buttonSearch.addEventListener('click', async element => {
//   await translate();

//   await get(1); // номер страницы, по умолчани первая


// });
// document.addEventListener("submit", element => element.preventDefault());



/* swiper swiper swiper swiper swiper swiper swiper swiper swiper swiper swiper swiper swiper swiper swiper */

// swiper.slideNext() // перейти к следующему слайду
// swiper.slidePrev() // перейти к предыдущему слайду
// swiper.activeIndex // номер активного слайда
// swiper.update(); // обновить слайдер после манипуляций с его дом
// swiper.appendSlide ( слайды ); // добавить слайды
// swiper.removeAllSlides(); // удалить все слайды







// при загрузке страницы сразу прочитать карточки
(async function f() {
  await translate(); // переводчик слова
  console.log("Старт html страницы, загружаю первые 10 страниц по умолчанию в слайдер.");
  await get(1); // фетч запрос первой страницы
  await init_swip(); // инициализация свайпера
})();




























































































// import { inputSpinner, key } from './constants';

// async function getRaiding(prop) {
//   const { imdbID } = prop;
//   const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${key}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   Object.assign(prop, data);
//   return data;
// }

// function spinnerVisionToggler() {
//   inputSpinner.classList.toggle('d-none');
// }

// async function getMoviesPageData(name, pageNumber = 1) {
//   spinnerVisionToggler();
//   const url = `https://www.omdbapi.com/?s=${name}&apikey=${key}&page=${pageNumber}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   if (data.Response === 'True') {
//     const promises = data.Search.map(getRaiding);
//     await Promise.all(promises);
//   } else {
//     spinnerVisionToggler();
//     if (pageNumber > 1) {
//       return 'no more results';
//     }
//     console.log(`Ошибка  ${data.Error}`);
//     return data.Error.toLowerCase();
//   }
//   spinnerVisionToggler();
//   return data;
// }

// export default async function createData(state) {
//   const { searchWord, page, setLastPage } = state;
//   const firstPageData = await getMoviesPageData(searchWord, page).catch(alert);
//   if (typeof firstPageData !== 'string') {
//     setLastPage.call(state, Math.ceil(firstPageData.totalResults / 10));
//     if (page === 1 && Math.ceil(firstPageData.totalResults / 10) > 1) {
//       const SECONDPAGE = 2;
//       state.page = SECONDPAGE;
//       const secondPageData = await getMoviesPageData(searchWord, SECONDPAGE).catch(alert);
//       firstPageData.Search.push(...secondPageData.Search);
//     }
//     return firstPageData.Search;
//   }
//   return firstPageData;
// }
/* eslint-disable prefer-arrow-callback */
let section = document.querySelector("body");


 let button_keyboard_reference = document.createElement('button'); 
 button_keyboard_reference.classList.add('button_reference');
 button_keyboard_reference.innerHTML = "Инструкция по использованию виртуальной клавиатуры";
 section.append(button_keyboard_reference);

let reference_container = document.createElement('div');
reference_container.classList.add('reference', 'none');
reference_text = document.createElement('p');
reference_text.classList.add('reference__text');

reference_text.innerHTML = "Привет\n" + 
                            "1) Раскладки виртуальной клавиатуры и твоей физической должны совпадать;\n" +
                            "_______________________________\n" +
                            "2) Для переключения раскладки виртуальной клавиатуры используй сочетание клавишь Ctrl + Shift на твоей физической;\n" +
                            "_______________________________\n" +
                            "3) После проверки моей работы оставь пожалуйста свои контакты, telegram или вк или дискорд," +
                                "что бы можно было уточнить возникшие вопросы;\n" +
                                "_______________________________\n" +
                            "4) По вопросам можно писать мне в телеграмм,\nAraik Rasoyan\n(+375 25 664 30 70);\n" +
                            "_______________________________\n" +
                            "Спасибо за внимание.";
reference_container.append(reference_text);
section.append(reference_container);




let keyboardСontainer = document.createElement('div');
keyboardСontainer.classList.add("keyboard-container", "display-none");
keyboardСontainer.id = "keyboard-id";
section.append(keyboardСontainer);
for (let i = 0; i < 5; i++) {
  let keyboardRow = document.createElement('div');
  keyboardRow.classList.add('keyboard-row');
  keyboardСontainer.append(keyboardRow);
}

const modal_click = document.querySelector('.button_reference');

modal_click.addEventListener('click', element => {
    document.querySelector('.reference').classList.toggle('none');
})





let rows = document.getElementsByClassName('keyboard-row');
let keys = [];






let object_keys = {
  buttons: [
    [{
        code: 'Backquote',
        en: '`',
        ru: 'ё',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Digit1',
        en: '1',
        ru: '1',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Digit2',
        en: '2',
        ru: '2',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Digit3',
        en: '3',
        ru: '3',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Digit4',
        en: '4',
        ru: '4',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Digit5',
        en: '5',
        ru: '5',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Digit6',
        en: '6',
        ru: '6',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Digit7',
        en: '7',
        ru: '7',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Digit8',
        en: '8',
        ru: '8',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Digit9',
        en: '9',
        ru: '9',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Digit0',
        en: '0',
        ru: '0',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Minus',
        en: '-',
        ru: '-',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Equal',
        en: '=',
        ru: '=',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Backspace',
        en: 'Backspace',
        ru: 'Backspace',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      }
    ],
    [{
        code: 'Tab',
        en: 'Tab',
        ru: 'Tab',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyQ',
        en: 'q',
        ru: 'й',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyW',
        en: 'w',
        ru: 'ц',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyE',
        en: 'e',
        ru: 'у',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyR',
        en: 'r',
        ru: 'к',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyT',
        en: 't',
        ru: 'е',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyY',
        en: 'y',
        ru: 'н',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyU',
        en: 'u',
        ru: 'г',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyI',
        en: 'i',
        ru: 'ш',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyO',
        en: 'o',
        ru: 'щ',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyP',
        en: 'p',
        ru: 'з',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'BracketLeft',
        en: '[',
        ru: 'х',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'BracketRight',
        en: ']',
        ru: 'ъ',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Backslash',
        en: '\\',
        ru: '\\',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      }
    ],
    [{
        code: 'CapsLock',
        en: 'CapsLk',
        ru: 'CapsLk',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyA',
        en: 'a',
        ru: 'ф',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyS',
        en: 's',
        ru: 'ы',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyD',
        en: 'd',
        ru: 'в',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyF',
        en: 'f',
        ru: 'а',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyG',
        en: 'g',
        ru: 'п',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyH',
        en: 'h',
        ru: 'р',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyJ',
        en: 'j',
        ru: 'о',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyK',
        en: 'k',
        ru: 'л',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyL',
        en: 'l',
        ru: 'д',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Semicolon',
        en: ';',
        ru: 'ж',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Quote',
        en: '\'',
        ru: 'э',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Enter',
        en: 'Enter',
        ru: 'Enter',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      }
    ],
    [{
        code: 'ShiftLeft',
        en: 'Shift',
        ru: 'Shift',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyZ',
        en: 'z',
        ru: 'я',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyX',
        en: 'x',
        ru: 'ч',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyC',
        en: 'c',
        ru: 'с',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyV',
        en: 'v',
        ru: 'м',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyB',
        en: 'b',
        ru: 'и',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyN',
        en: 'n',
        ru: 'т',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'KeyM',
        en: 'm',
        ru: 'ь',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Comma',
        en: ',',
        ru: 'б',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Period',
        en: '.',
        ru: 'ю',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Slash',
        en: '\/',
        ru: '.',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'ArrowUp',
        en: '▲',
        ru: '▲',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'ShiftRight',
        en: 'Shift',
        ru: 'Shift',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      }
    ],
    [{
        code: 'ControlLeft',
        en: 'Ctrl',
        ru: 'Ctrl',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'MetaLeft',
        en: '&#65794;&#65794;<br>&#65794;&#65794;',
        ru: '&#65794;&#65794;<br>&#65794;&#65794;',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'AltLeft',
        en: 'Alt',
        ru: 'Alt',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Space',
        en: ' ',
        ru: ' ',
        print: true,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'AltRight',
        en: 'Alt',
        ru: 'Alt',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'ArrowLeft',
        en: '◄',
        ru: '◄',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'ArrowDown',
        en: '▼',
        ru: '▼',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'ArrowRight',
        en: '►',
        ru: '►',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      },
      {
        code: 'Delete',
        en: 'Del',
        ru: 'Del',
        print: false,
        returns(argument) {
          if (argument == "en") return this.en;
          else return this.ru
        }
      }
    ]
  ]
};




function inner_html(language) {


  for (let gg = 0; gg < 5; gg++) {
    let end;
    if (gg == 0 || gg == 1) {
      end = 14;
    } else if (gg == 2 || gg == 3) {
      end = 13;
    } else if (gg == 4) {
      end = 9;
    }



    let count_shift = 0;
    let count_alt = 0;
    for (let i = 0; i < end; i++) {
      keys.push(document.createElement('div'));
      keys[i].innerHTML = object_keys.buttons[gg][i].returns(language);
      switch (object_keys.buttons[gg][i].returns(language)) {
        case "Backspace":
          keys[i].classList.add('key', 'key-special', 'key-backspace');
          break;
        case "Tab":
          keys[i].classList.add('key', 'key-special', 'key-tab');
          break;
        case "CapsLk":
          keys[i].classList.add('key', 'key-special', 'key-capslk');
          break;
        case "Enter":
          keys[i].classList.add('key', 'key-special', 'key-enter');
          break;
        case "Shift":
          if (count_shift == 0) {
            keys[i].classList.add('key', 'key-special', 'key-shift-left');
            count_shift++;
          } else {
            keys[i].classList.add('key', 'key-special', 'key-shift-right');
            count_shift--;
          }
          break;
        case "▲":
          keys[i].classList.add('key', 'key-special', 'key-top');
          break;
        case "Ctrl":
          keys[i].classList.add('key', 'key-special', 'key-ctrl');
          break;
        case "&#65794;&#65794;<br>&#65794;&#65794;":
          keys[i].classList.add('key', 'key-special', 'key-win');
          break;
        case "Alt":
          if (count_alt == 0) {
            keys[i].classList.add('key', 'key-special', 'key-alt-left');
            count_alt++;
          } else {
            keys[i].classList.add('key', 'key-special', 'key-alt-right');
            count_alt--;
          }
          break;
        case " ":
          keys[i].classList.add('key', 'key-special', 'key-nbsp');
          break;
        case "◄":
          keys[i].classList.add('key', 'key-special', 'key-left');
          break;
        case "▼":
          keys[i].classList.add('key', 'key-special', 'key-bottom');
          break;
        case "►":
          keys[i].classList.add('key', 'key-special', 'key-right');
          break;
        case "Del":
          keys[i].classList.add('key', 'key-special', 'key-del');
          break;
        default:
          keys[i].classList.add('key');
      }

      rows[gg].append(keys[i]);
    }
    keys.length = 0;

  }


}
// добавить все клавиши

window.addEventListener("load", function () {
  if (localStorage.language == "ru" || localStorage.language == "en") {
    inner_html(localStorage.language);
  } else inner_html("en");


  document.querySelector('.entry-field').focus();
});

let body = document.querySelector('body');






let flag = false;
let key_div;










document.addEventListener('keydown', function (e) {
 

  if (e.shiftKey == true && e.altKey == true && flag == false && e.ctrlKey != true) {
    key_div = document.querySelectorAll('.keyboard-row');

    key_div.forEach(element => {
      element.innerHTML = "";
    });

    localStorage.language = "ru";
    inner_html("ru");
    document.querySelectorAll('.key').forEach(element => {
      if (element.classList.contains('key-shift-left') || element.classList.contains('key-alt-left')) {
        element.classList.add('key-active');
      }
    });
    flag = true;
    return;
  }

  if (e.shiftKey == true && e.altKey == true && flag == true && e.ctrlKey != true) {
    key_div = document.querySelectorAll('.keyboard-row');
    
    key_div.forEach(element => {
      element.innerHTML = "";
    });
    localStorage.language = "en";
    inner_html("en");
    document.querySelectorAll('.key').forEach(element => {
      if (element.classList.contains('key-shift-left') || element.classList.contains('key-alt-left')) {
        element.classList.add('key-active');
      }
    });
    flag = false;
    return;
  }
});




document.addEventListener('keydown', function (e) {
  document.querySelectorAll('.key').forEach(element => {

    if (element.innerHTML == e.key.toLowerCase() && element.innerHTML != "Shift" && element.innerHTML != "Alt")
      element.classList.add('key-active');

    if (element.innerHTML == "Tab" && e.code == "Tab") {
      e.preventDefault();
      element.classList.add('key-active');
      const keys_div = document.querySelectorAll('.key');
      let textarea_inp = document.querySelector('.entry-field');
      let array_textarea = [];
      let current_pos = textarea_inp.selectionStart;
      let new_array_textarea = [...textarea_inp.value];   // массив в который положили содержимое textarea до события клика по клавише
      new_array_textarea.splice(current_pos,0,"    ");    // добавили на позиции курсора букву из прожатой клавиши в временный массив
      textarea_inp.value = new_array_textarea.join('');   // положили обратно содержимое textarea в textarea но с новой буквой прожатой клавишы
      textarea_inp.selectionStart = current_pos+4;        // вернули курсор в прежнюю позицию + 1 символ
      textarea_inp.selectionEnd = current_pos+4;  
    }

    if (element.innerHTML == "𐄂𐄂<br>𐄂𐄂" && e.code == "MetaLeft")
      element.classList.add('key-active');

    if (element.innerHTML == "CapsLk" && e.code == "CapsLock")
      element.classList.add('key-active');

    if (element.innerHTML == "▲" && e.code == "ArrowUp")
      element.classList.add('key-active');

    if (element.classList.contains('key-shift-left') && e.code == "ShiftLeft")
      element.classList.add('key-active');

    if (element.classList.contains('key-shift-right') && e.code == "ShiftRight")
      element.classList.add('key-active');

    if (element.innerHTML == "Ctrl" && e.code == "ControlLeft" ) { 
      element.classList.add('key-active');
     
    }

    if (element.classList.contains('key-alt-left') && e.code == "AltLeft")
      element.classList.add('key-active');

    if (element.classList.contains('key-alt-right') && e.code == "AltRight") {
      element.classList.add('key-active');
    }

    if (element.classList.contains('key-ctrl') && e.code == "AltRight") {
      element.classList.remove('key-active');
    }

    if (element.innerHTML == '◄' && e.code == "ArrowLeft")
      element.classList.add('key-active');

    if (element.innerHTML == '▼' && e.code == "ArrowDown")
      element.classList.add('key-active');

    if (element.innerHTML == '►' && e.code == "ArrowRight")
      element.classList.add('key-active');

    if (element.classList.contains('key-del') && e.code == "Delete")
      element.classList.add('key-active');

    if (element.classList.contains('key-backspace') && e.code == "Backspace") 
      element.classList.add('key-active');

    if (element.classList.contains('key-enter') && e.code == "Enter") 
      element.classList.add('key-active');
  });
});

document.addEventListener('keyup', function (e) {
  document.querySelectorAll('.key').forEach(element => {
    element.classList.remove('key-active');
  });
});




document.addEventListener('keydown', function (e) {
  if (e.code == "CapsLock") {
    document.querySelectorAll('.key').forEach(element => {

      if (!element.classList.contains('key-special'))
        element.classList.toggle('key-style-toupper')
    });


  }
});







document.addEventListener('mousedown', function (e) {
  const keys_div = document.querySelectorAll('.key');
  let textarea_inp = document.querySelector('.entry-field');
  let array_textarea = [];
  let current_pos = textarea_inp.selectionStart;
  



  

  keys_div.forEach( element => {  // произошло событие клик
    
    if (  !e.target.classList.contains('key-special') && e.target.innerHTML == element.innerHTML  ) {  // если произошло событие клик по кнопке 
                                                                                                       // и это не специальная кнопка ( типа shift..)
       e.target.classList.add('key-active');               // добавили тогда этой клавише класс active
       let letter = element.innerText;                     // положили в временную переменную букву из клавиатуры по которой тыркнули мышкой
       let new_array_textarea = [...textarea_inp.value];   // массив в который положили содержимое textarea до события клика по клавише
       new_array_textarea.splice(current_pos,0,letter);    // добавили на позиции курсора букву из прожатой клавиши в временный массив
       textarea_inp.value = new_array_textarea.join('');   // положили обратно содержимое textarea в textarea но с новой буквой прожатой клавишы
       textarea_inp.selectionStart = current_pos+1;        // вернули курсор в прежнюю позицию + 1 символ
       textarea_inp.selectionEnd = current_pos+1;          // вернули курсор в прежнюю позицию + 1 символ (снять выделение)
    }
    else if (e.target.classList.contains('key-special')) {
      e.target.classList.add('key-active');
    }

    if ( e.target.classList.contains('key-enter') && e.target.innerHTML == element.innerHTML ) {
       let new_array_textarea = [...textarea_inp.value];   // массив в который положили содержимое textarea до события клика по клавише
       new_array_textarea.splice(current_pos,0,"\n");    // добавили на позиции курсора букву из прожатой клавиши в временный массив
       textarea_inp.value = new_array_textarea.join('');   // положили обратно содержимое textarea в textarea но с новой буквой прожатой клавишы
       textarea_inp.selectionStart = current_pos+1;        // вернули курсор в прежнюю позицию + 1 символ
       textarea_inp.selectionEnd = current_pos+1;  
    }

    if ( e.target.classList.contains('key-tab') && e.target.innerHTML == element.innerHTML ) {
      let new_array_textarea = [...textarea_inp.value];   // массив в который положили содержимое textarea до события клика по клавише
       new_array_textarea.splice(current_pos,0,"    ");    // добавили на позиции курсора букву из прожатой клавиши в временный массив
       textarea_inp.value = new_array_textarea.join('');   // положили обратно содержимое textarea в textarea но с новой буквой прожатой клавишы
       textarea_inp.selectionStart = current_pos+4;        // вернули курсор в прежнюю позицию + 1 символ
       textarea_inp.selectionEnd = current_pos+4;  
    }

    if ( e.target.classList.contains('key-backspace') && e.target.innerHTML == element.innerHTML && current_pos != 0 ) {
       let new_array_textarea = [...textarea_inp.value];   // массив в который положили содержимое textarea до события клика по клавише
       new_array_textarea.splice(current_pos-1, 1,"");    // добавили на позиции курсора букву из прожатой клавиши в временный массив
       textarea_inp.value = new_array_textarea.join('');   // положили обратно содержимое textarea в textarea но с новой буквой прожатой клавишы
       textarea_inp.selectionStart = current_pos-1;        // вернули курсор в прежнюю позицию + 1 символ
       textarea_inp.selectionEnd = current_pos-1;  
    }

    if ( e.target.classList.contains('key-nbsp') && e.target.innerHTML == element.innerHTML ) {
      let new_array_textarea = [...textarea_inp.value];   // массив в который положили содержимое textarea до события клика по клавише
       new_array_textarea.splice(current_pos, 0," ");    // добавили на позиции курсора букву из прожатой клавиши в временный массив
       textarea_inp.value = new_array_textarea.join('');   // положили обратно содержимое textarea в textarea но с новой буквой прожатой клавишы
       textarea_inp.selectionStart = current_pos+1;        // вернули курсор в прежнюю позицию + 1 символ
       textarea_inp.selectionEnd = current_pos+1;  
    }

    if ( e.target.classList.contains('key-del') && e.target.innerHTML == element.innerHTML ) {
       let new_array_textarea = [...textarea_inp.value];   // массив в который положили содержимое textarea до события клика по клавише
       new_array_textarea.splice(current_pos, 1,"");    // добавили на позиции курсора букву из прожатой клавиши в временный массив
       textarea_inp.value = new_array_textarea.join('');   // положили обратно содержимое textarea в textarea но с новой буквой прожатой клавишы
       textarea_inp.selectionStart = current_pos;        // вернули курсор в прежнюю позицию + 1 символ
       textarea_inp.selectionEnd = current_pos;  
    }

    

    if ( e.target.classList.contains('key-capslk') && e.target.innerHTML == element.innerHTML ) {
      document.querySelectorAll('.key').forEach(element => {
        if (!element.classList.contains('key-special'))
          element.classList.toggle('key-style-toupper')
      });
    }

  });
  
})

document.addEventListener('mouseup', function (e) {
  const keys_div = document.querySelectorAll('.key');
  keys_div.forEach( element => {
    element.classList.remove('key-active');
  });
});



// document.addEventListener('keydown', function (e) {
//   const keys_div = document.querySelectorAll('.key');
//   let textarea_inp = document.querySelector('.entry-field');
//   let array_textarea = [];
//   let current_pos = textarea_inp.selectionStart;
    
    
//   if (e.code == "ArrowLeft") {
//        e.preventDefault();
//        let letter = "◄";                     // положили в временную переменную букву из клавиатуры по которой тыркнули мышкой
//        let new_array_textarea = [...textarea_inp.value];   // массив в который положили содержимое textarea до события клика по клавише
//        new_array_textarea.splice(current_pos,0,letter);    // добавили на позиции курсора букву из прожатой клавиши в временный массив
//        textarea_inp.value = new_array_textarea.join('');   // положили обратно содержимое textarea в textarea но с новой буквой прожатой клавишы
//        textarea_inp.selectionStart = current_pos+1;        // вернули курсор в прежнюю позицию + 1 символ
//        textarea_inp.selectionEnd = current_pos+1;          // вернули курсор в прежнюю позицию + 1 символ (снять выделение)
//   }
    
//   if (e.code == "ArrowUp") {
//        e.preventDefault();
//        let letter = "▲";                     // положили в временную переменную букву из клавиатуры по которой тыркнули мышкой
//        let new_array_textarea = [...textarea_inp.value];   // массив в который положили содержимое textarea до события клика по клавише
//        new_array_textarea.splice(current_pos,0,letter);    // добавили на позиции курсора букву из прожатой клавиши в временный массив
//        textarea_inp.value = new_array_textarea.join('');   // положили обратно содержимое textarea в textarea но с новой буквой прожатой клавишы
//        textarea_inp.selectionStart = current_pos+1;        // вернули курсор в прежнюю позицию + 1 символ
//        textarea_inp.selectionEnd = current_pos+1;          // вернули курсор в прежнюю позицию + 1 символ (снять выделение)
//   }
  
//   if (e.code == "ArrowRight") {
//        e.preventDefault();
//        let letter = "►";                     // положили в временную переменную букву из клавиатуры по которой тыркнули мышкой
//        let new_array_textarea = [...textarea_inp.value];   // массив в который положили содержимое textarea до события клика по клавише
//        new_array_textarea.splice(current_pos,0,letter);    // добавили на позиции курсора букву из прожатой клавиши в временный массив
//        textarea_inp.value = new_array_textarea.join('');   // положили обратно содержимое textarea в textarea но с новой буквой прожатой клавишы
//        textarea_inp.selectionStart = current_pos+1;        // вернули курсор в прежнюю позицию + 1 символ
//        textarea_inp.selectionEnd = current_pos+1;          // вернули курсор в прежнюю позицию + 1 символ (снять выделение)
//   }
  
//   if (e.code == "ArrowDown") {
//        e.preventDefault();
//        let letter = "▼";                     // положили в временную переменную букву из клавиатуры по которой тыркнули мышкой
//        let new_array_textarea = [...textarea_inp.value];   // массив в который положили содержимое textarea до события клика по клавише
//        new_array_textarea.splice(current_pos,0,letter);    // добавили на позиции курсора букву из прожатой клавиши в временный массив
//        textarea_inp.value = new_array_textarea.join('');   // положили обратно содержимое textarea в textarea но с новой буквой прожатой клавишы
//        textarea_inp.selectionStart = current_pos+1;        // вернули курсор в прежнюю позицию + 1 символ
//        textarea_inp.selectionEnd = current_pos+1;          // вернули курсор в прежнюю позицию + 1 символ (снять выделение)
//   } 
    
    
  
// });



  document.addEventListener('keydown', function (e) {
   let flag = false;
      document.querySelectorAll('.key').forEach(element => {
  
        if ( element.innerHTML.toUpperCase() == e.key.toUpperCase() || e.key == "CapsLock" || e.key == "Control" || e.key == "Meta" || e.key == "ArrowLeft" || e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowRight" || e.key == "AltLeft" || e.key == "AltGraph" || e.key == "Alt") 
          flag = true;
        
      });
   if (flag) return;
   console.log('Клавиша не распознана, проверьте соответствие раскладки на вашей клавиатуре и на виртуальной, они должны совпадать.');
  });





// работа со стрелочками
document.addEventListener("click", element => {

  if ( element.target.classList.contains("key-left") && my_input_search.selectionEnd ) { // если клик по стрелке влево и есть символыв инпуте
    my_input_search.selectionEnd--;
    my_input_search.selectionStart = my_input_search.selectionEnd;  
  }

  if ( element.target.classList.contains("key-right") ) { // если клик по стрелке вправо
   my_input_search.selectionEnd++;
   my_input_search.selectionStart = my_input_search.selectionEnd;   
  }

  if ( element.target.classList.contains("key-top") ) { // если клик по стрелке вверх
    my_input_search.selectionStart = my_input_search.value.length; 
  }

  if ( element.target.classList.contains("key-bottom") ) { // если клик по стрелке вниз
    my_input_search.selectionEnd = 0; 
  }

});


   
document.addEventListener("keydown", element => {
  if ( element.code == "ArrowUp" ) {
    element.preventDefault();
    my_input_search.selectionStart = my_input_search.value.length; 
  }

  if ( element.code == "ArrowDown" ) {
    element.preventDefault();
    my_input_search.selectionEnd = 0; 
  }

  if ( !(element.code == "Escape") ) return; // если не нажали на esc то на этом всё

    
  if ( !my_keyboard.classList.contains("display-none") ) {
    my_keyboard.classList.add("display-none");
  }


  
});
  
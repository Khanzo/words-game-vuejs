<!-- Шаблон игры -->
<template>
  <div v-if="loading">Loading...</div>
  <div v-else class="game">
    <div v-show="erroring" v-bind:error = error
    class="alert alert-danger" role="alert">Ошибка запроса! {{ error }}</div>
    <Pole />
    <Keyboard />
    <confirm v-show="show"></confirm>
  </div>
</template>

<script>
// @ is an alias to /src
import Pole from '@/components/Pole.vue';
import Keyboard from '@/components/Keyboard.vue';
import confirm from '@/components/Confirm.vue';
import axios from 'axios';


export default {
  name: 'Game',
  components: {
    Pole, Keyboard, confirm,
  },
  data() {
    return {
      numbers: [],
      loading: true,
      erroring: false,
      error: '',
      randomText: '',
      counter: 0,
      show: false,
    };
  },
  methods: {
    closeModal() {
      // Переход в таблицу при закрытии модалки по кнопке Я устал
      this.show = false;
      this.modalShow('none');
      this.$root.$options.router.push({ name: 'Score' });
    },
    getStart() {
      // Старт новой игры
      this.show = false;
      this.counter = 0;
      const number = this.getNumber();
      this.modalShow('none');
      this.getTextFromAPI(number);
      this.$eventHub.$emit('game:Reset', true);
    },
    modalShow(style) {
      // Отображение/скрытие модалки
      const modal = document.getElementById('modalConfim');
      if (modal) {
        modal.style.display = style;
      }
    },
    getNumber() {
      // рандомный номер, исключая уже выпадавшие
      const min = 1;
      const max = 1368;
      let number = Math.floor(Math.random() * (max - min + 1)) + min;
      while (this.numbers.indexOf(number) > -1) {
        number = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      return number;
    },
    getTextFromAPI(number) {
      // получение слова по номеру
      const path = `https://apidir.pfdo.ru/v1/directory-program-activities/${number}`;
      axios.get(path)
        .then((response) => {
          if (response.data.result_code === 'LST01') {
            // получили ошибку, записываем номер в массив
            this.numbers.push(number);
            let newnumber = this.getNumber();
            this.counter += 1;
            if (this.counter > 10) {
              // если было более 10 попыток то = 50 (РАСТЕНИЕВОДСТВО)
              newnumber = 50;
            }
            this.getTextFromAPI(newnumber);
            return null;
          }
          if (response.data.data.status === 10) {
            // получили валидный статус
            if (number !== 50) {
              // записываем номер в массив, если он не равен 50 (РАСТЕНИЕВОДСТВО)
              this.numbers.push(number);
            }
            this.$nextTick()
              .then(() => {
                this.randomText = response.data.data.name.toUpperCase();
                // проверем слово в нашей таблице если он там есть то заного генерируем
                const score = JSON.parse(localStorage.getItem('words-game-score'));
                if (score !== null) {
                  const exist = score.find((element) => {
                    const result = element.name === this.randomText;
                    return result;
                  });
                  if (exist) {
                    const newnumber = this.getNumber();
                    this.getTextFromAPI(newnumber);
                  }
                }
                console.log(this.randomText);// в консоль оставил вывод подсказки
                this.$eventHub.$emit('update:gameText', this.randomText);
              });
          } else {
            this.numbers.push(number);
          }
          return null;
        })
        .catch((error) => {
          console.log(error);
          this.erroring = true;
          this.error = error;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.$eventHub.$on('confirm:show', () => {
      this.modalShow('block');
    });
  },
  beforeMount() {
    this.show = false;
    this.counter = 0;
    const number = this.getNumber();
    this.modalShow('none');
    this.getTextFromAPI(number);
  },
};
</script>

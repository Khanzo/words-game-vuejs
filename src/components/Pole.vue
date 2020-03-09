<!-- Шаблон поля с ячейками -->
<template>
  <div class="container-fluid">
    <div class="col-12" style="margin: auto;">
    <button type="button" class="btn btn-outline-primary fix38 pole"
      v:bind:isEmpty = true
      v-for="(word, index) in keys"
      v-bind:data = word
      v-bind:key="index">{{ word }}</button>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'Pole',
  data() {
    return {
      keys: [],
      gameText: '',
      nextSibling: 0,
      startTimer: 0,
    };
  },
  methods: {
    events() {
      // Формируем пустые ячейки если пришло слово
      // Запоминаем время начала
      this.$eventHub.$on('update:gameText', (data) => {
        this.gameText = data;
        this.startTimer = Date.now();
        this.keys = [].map.call(data.split(''), (index) => {
          this.keys[index] = '';
        });
        this.nextSibling = 0;
        return data;
      });

      // Сброс
      this.$eventHub.$on('send:clear', (data) => {
        this.gameText = data;
        this.nextSibling = 0;
        const buttons = document.getElementsByClassName('pole');
        [].map.call(buttons, (b) => {
          const button = b;
          button.setAttribute('isEmpty', true);
          button.innerHTML = '';
          return button;
        });
      });

      // Заполнем следующую ячеку если пришла буква
      // Проверяем выйгрыш
      this.$eventHub.$on('send:key', (key) => {
        const buttons = document.getElementsByClassName('pole');
        buttons[this.nextSibling].innerHTML = key;
        buttons[this.nextSibling].setAttribute('isEmpty', false);
        this.nextSibling += 1;
        if (this.nextSibling >= this.gameText.length) {
          const text = [].map.call(buttons, (b) => b.innerHTML).join('');
          if (text === this.gameText) {
            this.saveResult(this.gameText);
            // Вызов модального окна
            this.$eventHub.$emit('confirm:show');
          }
        }
      });
    },
    saveResult(text) {
      // Сохраняем результат в localstorage
      const gameText = text;
      const end = Date.now() - this.startTimer;
      let score = JSON.parse(localStorage.getItem('words-game-score'));
      if (score !== null) {
        const exist = score.find((element) => {
          const result = element.name === gameText;
          return result;
        });
        if (!exist) {
          score.push({ name: this.gameText, time: end });
        }
      } else {
        score = [];
        score.push({ name: this.gameText, time: end });
      }
      localStorage.setItem('words-game-score', JSON.stringify(score));
    },
  },
  mounted() {
    this.events();
  },
};
</script>

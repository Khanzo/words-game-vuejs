<!-- Шаблон клавиатуры с буквами -->
<template>
  <div class="container-fluid">
    <div class="col-6" style="margin: auto;">
    <button type="button" class="btn btn-outline-dark fix38"
      v-on:click="selectKey"
      v-for="(word, index) in keys"
      v-bind:data = word
      v:bind:isClicked = false
      v-bind:key="index">{{ word }}</button>
    </div>
    <div class="col-12" style="margin: auto; margin-top:20px;">
      <button type="button" class="btn btn-outline-danger"
      v-on:click="clearAll">Сбросить</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Keyboard',
  data() {
    return {
      keys: [],
      gameText: '',
    };
  },
  methods: {
    getKeys() {
      // Формируем ячейки если пришло слово, замешиваем
      this.$eventHub.$on('update:gameText', (data) => {
        this.gameText = data;
        this.keys = data.split('');
        let currentIndex = 0;
        const min = 0;
        const max = this.keys.length - 1;
        while (currentIndex < 20) {
          const i = Math.floor(Math.random() * (max - min + 1)) + min;
          const j = Math.floor(Math.random() * (max - min + 1)) + min;
          if (i !== j) {
            const key = this.keys[i];
            this.keys[i] = this.keys[j];
            this.keys[j] = key;
          }
          currentIndex += 1;
        }
        return data;
      });
      // Команда на сброс
      this.$eventHub.$on('game:Reset', () => {
        this.clearAll();
      });
    },
    selectKey(e) {
      // Клик по букве
      const event = e;
      this.$eventHub.$emit('send:key', event.target.getAttribute('data'));
      event.target.setAttribute('isClicked', true);
      event.target.style.visibility = 'hidden';
    },
    clearAll() {
      // Сбросить нажали
      this.isClicked = false;
      const buttons = document.getElementsByClassName('fix38');
      [].map.call(buttons, (b) => {
        const button = b;
        button.setAttribute('isClicked', false);
        button.style.visibility = '';
        return button;
      });
      this.$eventHub.$emit('send:clear', this.gameText);
    },
  },
  mounted() {
    this.getKeys();
  },
};
</script>

<style>
.fix38 {
  height: 38px;
  width: 38px;
  margin:5px;
}
</style>

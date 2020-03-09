<!-- Модальное окно выбора продолжения игры -->
<template>
  <div class="modal" tabindex="-1" role="dialog" aria-hidden="true" id="modalConfim">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <p>Вы выиграли! Повторить?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary"
        data-dismiss="modal" v-on:click="closeModal">Я уже устал</button>
        <button type="button" class="btn btn-primary"
        v-on:click="confirmModal">Конечно!</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Confirm',
  methods: {
    confirmModal() {
      this.$parent.getStart();
    },
    closeModal() {
      this.$parent.closeModal();
    },
  },
};
</script>

<!-- Таблица с результатами. Результаты формируются из localStorage. -->
<template>
  <div class="container-fluid">
    <b-table hover :items="all" :fields="fields" class="col-md-12" style="margin: auto;">
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'Score',
  data() {
    return {
      fields: [
        {
          key: 'id',
          label: '№',
          sortable: true,
        },
        {
          key: 'name',
          label: 'Слово',
          sortable: true,
        },
        {
          key: 'time',
          label: 'Время',
          sortable: true,
        },
      ],
      all: [],
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      const score = JSON.parse(localStorage.getItem('words-game-score'));
      if (score !== null) {
        this.all = score.map((row, index) => {
          const sec = row.time / 1000;
          const el = { id: index + 1, name: row.name, time: `${sec} сек.` };
          return el;
        });
      } else {
        this.all = [];
      }
    },
  },
};

</script>

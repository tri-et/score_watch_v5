<template>
  <div class="team-score">
    <div class="score">
      <div>
        <span>{{data[12]}}</span>
      </div>
      <div class="divided-circle" :class="setColor(data[26])">
        <div>
          <span>56</span>
        </div>
        <div>
          <span>Kickoff</span>
        </div>
      </div>
      <div>
        <span>{{data[13]}}</span>
      </div>
    </div>
    <div class="team">
      <div>
        <span>{{data[8]}}</span>
      </div>
      <div>
        <span>vs</span>
      </div>
      <div>
        <span>{{data[9]}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: [Array],
  },
  data() {
    return {
      activeStyle: 'knickoff',
    }
  },
  methods: {
    setColor(val) {
      var styleCl = ''
      switch (val) {
        case '-1':
          styleCl = 'knickoff'
          break
        case '2':
          styleCl = 'halfTime'
          break
        case '1':
        case '3':
          styleCl = 'live'
          break
        case '0':
          styleCl = 'knickoff'
          break
      }
      return styleCl
    },
  },
}
</script>
<style lang="scss" scoped>
$circle-diameter: 64px;
.halfTime {
  div:first-child {
    background-color: rgb(255, 146, 80);
  }
  div:last-child {
    background-color: rgb(255, 157, 97);
  }
}
.live {
  div:first-child {
    background-color: rgb(80, 210, 120);
  }
  div:last-child {
    background-color: rgb(97, 214, 133);
  }
}
.knickoff {
  div:first-child {
    background-color: rgb(240, 240, 240);
  }
  div:last-child {
    background-color: rgb(227, 227, 227);
  }
}
.divided-circle {
  width: $circle-diameter;
  height: $circle-diameter;
  display: grid;
  font-weight: 700;
  div:first-child,
  div:last-child {
    font-size: 14px !important;
    width: $circle-diameter;
    height: $circle-diameter/2;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  div:first-child {
    border-top-left-radius: $circle-diameter/2;
    border-top-right-radius: $circle-diameter/2;
  }
  div:last-child {
    border-bottom-left-radius: $circle-diameter/2;
    border-bottom-right-radius: $circle-diameter/2;
  }
}
.score {
  display: flex;
  align-items: center;
  padding: 0 24px;
  div:first-child {
    flex: 1;
    font-size: 28px;
  }
  div:last-child {
    flex: 1;
    text-align: right;
    font-size: 28px;
  }
}
.team {
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin-top: 10px;
  margin-bottom: 15px;
  div:first-child {
    flex: 1;
    font-size: 16px;
  }
  div:nth-child(2) {
    color: rgba(0, 0, 0, 0.34);
  }
  div:last-child {
    flex: 1;
    text-align: right;
    font-size: 16px;
  }
}
</style>



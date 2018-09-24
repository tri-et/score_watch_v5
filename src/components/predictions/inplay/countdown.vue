<template>
  <span>{{time}}</span>
</template>
<script>
export default {
  props: {
    item: [Object],
  },
  data() {
    return {
      time: '',
      countdown: 0,
    }
  },
  methods: {
    checkExpired() {
      var expTime = new Date().getTime() - new Date(this.item.time).getTime()
      if (parseInt(this.item.minutes) < 70) {
        if (expTime < 600000 && expTime > 0) {
          this.countdown = 600000 - expTime
          this.runcountdown()
        } else if (expTime > 600000 && expTime < 780000) {
          this.countdown = 780000 - expTime
          this.remainExpired()
        }
      } else {
        if (expTime < 180000 && expTime > 0) {
          this.countdown = 180000 - expTime
          this.runcountdown()
        } else if (expTime > 180000 && expTime < 360000) {
          this.countdown = 360000 - expTime
          this.remainExpired()
        }
      }
    },
    runcountdown() {
      var self = this
      var x = setInterval(function() {
        var distance = self.countdown - 1000
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        var seconds = Math.floor((distance % (1000 * 60)) / 1000)
        self.time = minutes + 'm ' + seconds + 's'
        self.countdown = distance
        if (distance < 0) {
          clearInterval(x)
          self.time = 'EXP 2m 59s'
          self.countdown = 180000
          self.remainExpired()
        }
      }, 1000)
    },
    remainExpired() {
      var self = this
      var x = setInterval(function() {
        var distance = self.countdown - 1000
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        var seconds = Math.floor((distance % (1000 * 60)) / 1000)
        self.time = 'EXP ' + minutes + 'm ' + seconds + 's'
        self.countdown = distance
        if (distance < 0) {
          clearInterval(x)
          self.time = 'Expired'
        }
      }, 1000)
    },
  },
  created() {
    this.checkExpired()
  },
}
</script>


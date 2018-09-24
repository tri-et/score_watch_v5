<template>
  <div class="calendar">
    <div class="left-arrow" @click="leftArrow()">
      <i class="material-icons">keyboard_arrow_left</i>
    </div>
    <div class="date-content">
      <ul>
        <li v-for="(item,index) in days" :key="index" :class="{'active-calendar-pre':getActiveCalendarPre==index,'futuredates':index>getActiveCalendarPre}" @click="selectDate(index,$event,item)">
          <div>
            <span>{{item|date}}</span>
            <span>{{item|day}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="right-arrow" @click="rightArrow()">
      <i class="material-icons">keyboard_arrow_right</i>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import {mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {
      days: [],
    }
  },
  computed: {
    ...mapGetters('calendarpre', ['getActiveCalendarPre']),
  },
  filters: {
    data() {
      return {
        days: [],
      }
    },
    date(val) {
      var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return month_names_short[val.getMonth()] + ' ' + val.getDate()
    },
    day(val) {
      var day_names_short = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      let today = new Date()
      if (
        val.getFullYear() == today.getFullYear() &&
        val.getMonth() == today.getMonth() &&
        val.getDate() == today.getDate()
      ) {
        return 'Today'
      }
      return day_names_short[val.getDay()]
    },
  },
  methods: {
    ...mapActions('calendarpre', ['activeCalendarPre']),
    renderDays() {
      var dateOfmonth = []
      for (var i = 16; i--; ) {
        var today = new Date()
        var preday = today.setDate(today.getDate() - i)
        dateOfmonth.push(new Date(preday))
      }
      var current = new Date()
      for (var i = 0; i < 15; i++) {
        var nextday = current.setDate(current.getDate() + 1)
        dateOfmonth.push(new Date(nextday))
      }
      this.days = dateOfmonth
    },
    leftArrow() {
      var el = this.$el.querySelector('.date-content')
      $(el).animate({scrollLeft: '-=64'})
    },
    rightArrow() {
      var el = this.$el.querySelector('.date-content')
      $(el).animate({scrollLeft: '+=64'})
    },
    setDateCenter(event) {
      var inner = this.$el.querySelector('.date-content')
      var outer = event.currentTarget.offsetLeft
      inner.scrollLeft = outer - (inner.offsetWidth / 2 + 1.5)
    },
    selectDate(index, event, date) {
      this.activeCalendarPre(index)
      this.setDateCenter(event)
      var dateselected =new Date(date).toISOString().split('T')[0]
      this.$root.GetData.getInPlayPreGame(this.$parent, dateselected)
    },
    setDateCenterFirsLoad() {
      var inner = this.$el.querySelector('.date-content')
      var outer = this.$el.querySelector('.active-calendar-pre')
      inner.scrollLeft = outer.offsetLeft - (inner.offsetWidth / 2 + 1.5)
    },
  },
  created() {
    this.renderDays()
    var seft = this
    this.$root.$on('browserResize', function(data) {
      seft.setDateCenterFirsLoad()
    })
  },
  mounted() {
    this.setDateCenterFirsLoad()
  },
}
</script>
<style lang="scss" scoped>
.calendar {
  height: 64px;
  background-color: #212121;
  display: flex;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: inline-flex;
    li {
      height: 64px;
      align-items: center;
      justify-content: center;
      text-align: center;
      display: inline-flex;
      font-size: 14px !important;
      color: #4e4e4e;
      font-weight: 500;
      width: 64px;
      &:not(.futuredates):hover {
        color: #fff;
        cursor: pointer;
        background-color: #333;
      }
    }
    li div {
      display: grid;
    }
  }
}
.date-content {
  flex: 1;
  display: inline-flex;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none !important;
  }
}

.active-calendar-pre {
  color: #fff !important;
  background-color: #333;
}
.left-arrow,
.right-arrow {
  width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
}
</style>



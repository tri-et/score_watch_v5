import Axios from 'axios'
import _ from 'lodash'
class GetData {
  constructor() {
    this.datePrediction = ''
    this.url = 'http://localhost:8000/score_watch_v5'
    // this.url = ''
  }
  getInPlay() {
    return Axios.get(`${this.url}/index.php/api/get_running/${this.datePrediction}/${new Date().getHours()}`, {
      timeout: 100000,
    })
  }
  getPreGame() {
    return Axios.get(`${this.url}/index.php/api/get_pregame/${this.datePrediction}/${new Date().getHours()}`, {
      timeout: 100000,
    })
  }
  getDataInplay(app) {
    var self = this
    Axios.get(`${this.url}/index.php/api/get_running/${this.datePrediction}/${new Date().getHours()}`, {
      timeout: 100000,
    }).then(function({data}) {
      var dataInplay = data
      dataInplay.map(match => {
        return Object.assign(match, {
          isExpired: self.isExpired(match.detail),
        })
      })
      app.setDataInplay(dataInplay)
      setTimeout(() => {
        self.getDataInplay(app)
      }, 3000)
    })
  }
  getDataPregame(app) {
    var self = this
    Axios.get(`${this.url}/index.php/api/get_pregame/${this.datePrediction}/${new Date().getHours()}`, {
      timeout: 100000,
    }).then(function({data}) {
      app.setDataPregame(data)
      setTimeout(() => {
        self.getDataPregame(app)
      }, 10000)
    })
  }

  getInPlayPreGame(app, datepre) {
    var self = this
    clearTimeout(self.timeInPlay)
    clearTimeout(self.timePregame)
    self.timeInPlay = null
    self.timePregame = null
    this.datePrediction = datepre
    Axios.all([this.getInPlay(), this.getPreGame()]).then(
      Axios.spread((inplay, pregame) => {
        var dataInplay = inplay.data
        var dataPregame = pregame.data
        var leagueInPlay = _.union(_.map(dataInplay, 'league'))
        var leaguePregame = _.union(_.map(dataPregame, 'league'))
        app.setLeague(_.union(_.concat(leagueInPlay, leaguePregame)))
        dataInplay.map(match => {
          return Object.assign(match, {
            isExpired: self.isExpired(match.detail),
          })
        })
        app.setDataInplay(dataInplay)
        app.setDataPregame(dataPregame)
        self.timeInPlay = setTimeout(() => {
          self.getDataInplay(app)
        }, 3000)
        self.timePregame = setTimeout(() => {
          self.getDataPregame(app)
        }, 10000)
      })
    )
  }
  getTimeLineData() {
    return Axios.get(
      'http://www.hasilskor.com/API/JSON.aspx?callback=callbackJSON&sport=soccerDA&s=26PDpiffaaBbGrBdfgnrK2pknndskc1f3IMeKLW6PqdprBMHMqSTQ7gcmlcx7jZMxmyeTTBXRqwDh5p044MJHrf&date=&lut=&isJSONP=true&_=1506409621930'
    )
  }
  getStatsData() {
    return Axios.get(
      'http://www.hasilskor.com/API/JSON.aspx?callback=callbackJSON&sport=soccerDB&s=26PDpiffaaBbGrBdfgnrK2pknndskc1f3IMeKLW6PqdprBMHMqSTQ7gcmlcx7jZMxmyeTTBXRqwDh5p044MJHrf&date=&lut=&isJSONP=true&_=1506412139882'
    )
  }
  getMatchLiveScore() {
    return Axios.get(
      'http://www.hasilskor.com/API/JSON.aspx?sport=soccer&s=26PDpiffaaBbGrBdfgnrK2pknndskc1f3IMeKLW6PqdprBMHMqSTQ7gcmlcx7jZMxmyeTTBXRqwDh5p044MJHrf'
    )
  }
  getLiveScore(app) {
    var self = this
    Axios.all([this.getTimeLineData(), this.getStatsData(), this.getMatchLiveScore()]).then(
      Axios.spread(function(timeline, stats, {data}) {
        var colLeftData = []
        var colRightData = []
        var leagueLiveScore = _.union(_.map(data.r, x => x[5]))
        leagueLiveScore.forEach(el => {
          var dataFilter = _.filter(data.r, {[5]: el})
          if (colLeftData.length == colRightData.length || colLeftData.length < colRightData.length) {
            colLeftData = _.concat(colLeftData, dataFilter)
          } else {
            colRightData = _.concat(colRightData, dataFilter)
          }
        })
        app.setLeagueLiveSocre(leagueLiveScore)
        app.setDataLiveScore({
          rightData: colRightData,
          leftData: colLeftData,
          matchStats: self.formatJsonP(stats.data),
          matchTimeLine: self.formatJsonP(timeline.data),
        })
        console.log(self.formatJsonP(timeline.data))
      })
    )
  }
  async getDataLiveScore() {
    const timeline = await Axios.get(
      'http://www.hasilskor.com/API/JSON.aspx?callback=callbackJSON&sport=soccerDA&s=26PDpiffaaBbGrBdfgnrK2pknndskc1f3IMeKLW6PqdprBMHMqSTQ7gcmlcx7jZMxmyeTTBXRqwDh5p044MJHrf&date=&lut=&isJSONP=true&_=1506409621930'
    )
    const stats = await Axios.get(
      'http://www.hasilskor.com/API/JSON.aspx?callback=callbackJSON&sport=soccerDB&s=26PDpiffaaBbGrBdfgnrK2pknndskc1f3IMeKLW6PqdprBMHMqSTQ7gcmlcx7jZMxmyeTTBXRqwDh5p044MJHrf&date=&lut=&isJSONP=true&_=1506412139882'
    )
  }
  isExpired(prediction) {
    var isExpired = false
    var minutes = parseInt(prediction.minutes)
    var predictionTime = new Date(prediction.time).getTime()
    var currentTime = new Date().getTime()
    if (minutes < 70) {
      if (currentTime - predictionTime > 13 * 60000) {
        isExpired = true
      }
    } else {
      if (currentTime - predictionTime > 6 * 60000) {
        isExpired = true
      }
    }
    return isExpired
  }
  formatJsonP(val) {
    return JSON.parse(val.replace('callbackJSON(', '').replace(/\)$/g, ''))
  }
}
export default GetData

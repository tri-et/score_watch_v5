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
  getInPlayPreGame(app, datepre) {
    var self = this
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
        // setTimeout(() => {
        //   self.getInPlayPreGame(app, self.datePrediction)
        // }, 3000)
      })
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
}
export default GetData

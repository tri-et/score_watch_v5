import Axios from 'axios'
import _ from 'lodash'
class GetData {
  constructor() {
    this.datePrediction = ''
    this.dateLiveScore = ''
    this.url = 'http://localhost:8000/score_watch_v5'
    // this.url = ''
  }
  getIpAddress(app) {
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection //compatibility for Firefox and chrome
    var pc = new RTCPeerConnection({iceServers: []}),
      noop = function() {}
    pc.createDataChannel('') //create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop) // create offer and set local description
    pc.onicecandidate = function(ice) {
      if (ice && ice.candidate && ice.candidate.candidate) {
        var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1]
        app.setIpAddress(myIP)
        pc.onicecandidate = noop
      }
    }
  }
  getLiveCast(match_id, ip_address, app) {
    Axios.get(`${this.url}/index.php/api/livecast/${match_id}/${ip_address}`).then(function(livecast) {
      app.setLinkLiveCast(livecast.data)
    })
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
    app.setHideLoading(true)
    Axios.all([this.getInPlay(), this.getPreGame()])
      .then(
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
          app.setHideLoading(false)
          self.timeInPlay = setTimeout(() => {
            self.getDataInplay(app)
          }, 3000)
          self.timePregame = setTimeout(() => {
            self.getDataPregame(app)
          }, 10000)
        })
      )
      .catch(function(err) {
        app.setHideLoading(false)
      })
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
  getMatchLiveScoreByDate() {
    return Axios.get(
      `http://www.hasilskor.com/API/JSON.aspx?date=${
        this.dateLiveScore
      }&sport=soccer&s=26PDpiffaaBbGrBdfgnrK2pknndskc1f3IMeKLW6PqdprBMHMqSTQ7gcmlcx7jZMxmyeTTBXRqwDh5p044MJHrf`
    )
  }
  getLiveScore(app, dateSelect) {
    var self = this
    this.dateLiveScore = dateSelect
    app.setHideLoadingLive(true)
    Axios.all([
      this.getTimeLineData(),
      this.getStatsData(),
      this.dateLiveScore == '' ? this.getMatchLiveScore() : this.getMatchLiveScoreByDate(),
    ]).then(
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
        app.setHideLoadingLive(false)
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
    var currentTime = new Date().getTime() - new Date(prediction.time).getTime()
    if (minutes < 70) {
      if (currentTime > 13 * 60000) {
        isExpired = true
      }
    } else {
      if (currentTime > 6 * 60000) {
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

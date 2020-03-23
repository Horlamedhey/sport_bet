new Vue({
  el: "#layout",
  data() {
    return {
      amount: 0,
      finalLeagues: [],
      games: [],
      sports: [
        {
          name: "Football",
          link: "en/sports/id_4/index.html"
        },
        {
          name: "Cricket",
          link: "en/sports/id_22/index.html"
        }
      ]
    };
  },
  mounted() {
    this.fetchFootballData();
    setInterval(() => {
      this.fetchFootballData();
    }, 300000);
  },
  computed: {
    totalOdds() {
      return this.games.reduce((r, v) => {
        r += parseFloat(v.value);
        return r;
      }, 0.0);
    },
    potentialWinnings() {
      let formatter = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN"
      });
      return formatter.format(this.amount * this.totalOdds);
    }
  },
  methods: {
    compare(a, b) {
      const date1 = `${a.date} ${a.time}`,
        date2 = `${b.date} ${b.time}`;

      let comparison = 0;
      if (new Date(date1) > new Date(date2)) {
        comparison = 1;
      } else if (new Date(date1) < new Date(date2)) {
        comparison = -1;
      }
      return comparison;
    },
    fetchFootballData() {
      let timezone = window.Intl.DateTimeFormat().resolvedOptions().timeZone,
        date = new Date(),
        today = date.toISOString().split("T")[0],
        endDate = date;
      endDate.setDate(date.getDate() + 3);
      endDate = endDate.toISOString().split("T")[0];
      fetch(
        `https://allsportsapi.com/api/football/?met=Fixtures&APIkey=b87c076ed73e28a0618f685e5e9631e3606151175d05e9ec3be0b79674fa4874&from=${today}&to=${endDate}&timezone=${timezone}`
      ).then(val => {
        val
          .json()
          .then(val => {
            let leagues = val.result
              .filter(
                v =>
                  v.event_status &&
                  v.event_status !== "Postponed" &&
                  v.event_status !== "Cancelled" &&
                  v.event_status !== "Finished"
              )
              .map(v => {
                const {
                  event_away_team: awayTeam,
                  event_home_team: homeTeam,
                  event_date: date,
                  event_time: time,
                  event_final_result: result,
                  league_name: league,
                  league_key: leagueId,
                  event_key: matchId,
                  event_status: status
                } = v;
                return {
                  awayTeam,
                  homeTeam,
                  league,
                  leagueId,
                  result,
                  matchId,
                  status,
                  date,
                  time
                };
              })
              .sort(this.compare);
            return leagues;
          })
          .then(val => {
            finalLeagues = [];
            val.forEach(v => {
              fetch(
                `https://allsportsapi.com/api/football/?met=Odds&APIkey=b87c076ed73e28a0618f685e5e9631e3606151175d05e9ec3be0b79674fa4874&from=${today}&to=${endDate}&matchId=${v.matchId}`
              ).then(val =>
                val.json().then(val => {
                  if (val.result) {
                    const { odd_1, odd_2, odd_x } = val.result[
                      `${v.matchId}`
                    ][0];
                    v.odds = { odd_1, odd_2, odd_x };
                    let item = finalLeagues.find(w => w.league === v.league);
                    if (item) {
                      item.matches.push(v);
                    } else {
                      finalLeagues.push({
                        league: v.league,
                        matches: [v]
                      });
                    }
                  }
                })
              );
            });
            return finalLeagues;
          })
          .then(val => {
            this.finalLeagues = val;
          });
      });
    },
    addGame(league, matchId, oddInfo) {
      let match = this.finalLeagues
          .find(v => v.league === league)
          .matches.find(v => v.matchId === matchId),
        game = this.games.find(
          v => v.oddType === oddInfo.oddType && v.matchId === matchId
        );
      if (game) {
        this.games.splice(this.games.indexOf(game), 1);
      } else {
        this.games.push({
          league,
          leagueId: match.leagueId,
          matchId,
          teams: `${match.homeTeam} - ${match.awayTeam}`,
          ...oddInfo
        });
      }
    },
    placeBet() {
      console.log({
        total: { odds: this.totalOdds, amount: this.amount },
        games: this.games
      });
    }
  }
});



// let formLeague = league => {
//   return `<div class="event-title-bar" style="background-color: #fbfbfb; color: #fbfbfb">
// 				<span class="title-text">
// 					<a class="hf" href="en/league-events/index3bc1.html?lid=4132">
//                         ${league}
//                     </a>
// 				</span>


// 				<span class="toggle-btn" id="event--4132"><img src="app-content/plugins/SportsFy/includes/images/down-arrow-16.png" alt="Move down"/></span>
// 			</div>`;
// },
//   formEvents = (homeTeam, awayTeam, date, time, odds) => {
    // return `<div class="event-container" id="event-container-4132" style="background-color: #fbfbfb">

	// 			<div class="bet-event-wrapper">
	// 				<div id="eev9799633" class="bet-event-title-bar" style="background-color: #fbfbfb; color: #fbfbfb">
	// 					<span class="title-text">
    //                         <a class="hf" href="en/league-events/index93c5.html?lid=4132&amp;event=9799633">
    //                             ${homeTeam} - ${awayTeam}
    //                         </a>
	// 					</span>

	// 					<span class="stream-stats">
	// 						<a class="stats" target="_new" href="en/sports/scoreboard/index1bff.html?event=9799633">
	// 							<i class="fa fa-bar-chart"></i>
	// 						</a>

	// 						<a class="stream" target="_new" href="en/sports/stream/index1bff.html?event=9799633">
	// 							<i class="fa fa-play-circle"></i>
	// 						</a>
	// 					</span>
    //                     <span class="evt-deadline">
    //                     ${date} ${time}
	// 					</span>
	// 					<span class="toggle-btn d" id="bet-event--9799633"><img class="tm0d" src="app-content/plugins/SportsFy/includes/images/down-arrow-16.png" alt="Move down"/></span>
	// 				</div>


	// 				<div class="bet-event-container" id="bet-event-container-9799633" style="background-color: ">

	// 					<div class="cat-wrapper cat_id">
	// 						<div class="cat-title-bar" style="background-color: #fbfbfb; color: #fbfbfb">
	// 							Match Result
	// 						</div>
	// 						<div class="cat-container" style="background-color: #fbfbfb">
	// 							<div class="bet-option-wrapper" id="bet-option-btn-1354140037" style="width: 33%;
	// 									                                                                                margin-left: 0%;
	// 									                                                                                background-color: #fbfbfb;
	// 									                                                                             color: #fbfbfb">
	// 								<div class="bet-option-title">
	// 									${homeTeam}
	// 								</div>
	// 								<div class="bet-option-odd">${odds.odd_1}</div>
	// 							</div>
	// 							<div class="bet-option-wrapper" id="bet-option-btn-1354140038" style="width: 33%;
	// 									                                                                                margin-left: 0%;
	// 									                                                                                background-color: #fbfbfb;
	// 									                                                                             color: #fbfbfb">
	// 								<div class="bet-option-title">
	// 									X
	// 								</div>
	// 								<div class="bet-option-odd">${odds.odd_x}</div>
	// 							</div>
	// 							<div class="bet-option-wrapper" id="bet-option-btn-1354140039" style="width: 33%;
	// 									                                                                                margin-left: 0%;
	// 									                                                                                background-color: #fbfbfb;
	// 									                                                                             color: #fbfbfb">
	// 								<div class="bet-option-title">
	// 									 ${awayTeam}
	// 								</div>
	// 								<div class="bet-option-odd">${odds.odd_2}</div>
	// 							</div>

	// 							<div class="clear"></div>
	// 						</div>
	// 					</div>

	// 				</div>


	// 			</div>


	// 		</div>`;
//   },
//   createEvents = events => {
//     return events
//       .map(v => {
//         return formEvents(v.homeTeam, v.awayTeam, v.date, v.time, v.odds);
//       })
//       .join("");
//   },
//   compare = (a, b) => {
//     const date1 = `${a.date} ${a.time}`,
//       date2 = `${b.date} ${b.time}`;

//     let comparison = 0;
//     if (new Date(date1) > new Date(date2)) {
//       comparison = 1;
//     } else if (new Date(date1) < new Date(date2)) {
//       comparison = -1;
//     }
//     return comparison;
//   },
//   renderMatches = val => {
//     setTimeout(() => {
//       for (let index = 0; index < val.length; index++) {
//         const finalLeague = val[index];
//         let content = `<div class="event-wrapper">
//              ${formLeague(finalLeague.league)}`;
//         content += `${createEvents(finalLeague.matches)}
//              </div>`;
//         document.querySelector("#sport-container-4").innerHTML = "";
//         setTimeout(() => {
//           document.querySelector("#sport-container-4").innerHTML += content;
//         }, 200);
//       }
//     }, 2000);
//   },
//   timezone = window.Intl.DateTimeFormat().resolvedOptions().timeZone,
//   date = new Date(),
//   today = date.toISOString().split("T")[0],
//   endDate = date;
// endDate.setDate(date.getDate() + 3);
// endDate = endDate.toISOString().split("T")[0];

// fetchFootballData = () => {
//   fetch(
//     `https://allsportsapi.com/api/football/?met=Fixtures&APIkey=b87c076ed73e28a0618f685e5e9631e3606151175d05e9ec3be0b79674fa4874&from=${today}&to=${endDate}&timezone=${timezone}`
//   ).then(val => {
//     val
//       .json()
//       .then(val => {
//         let leagues = val.result
//           .filter(
//             v =>
//               v.event_status &&
//               v.event_status !== "Postponed" &&
//               v.event_status !== "Cancelled" &&
//               v.event_status !== "Finished"
//           )
//           .map(v => {
//             const {
//               event_away_team: awayTeam,
//               event_home_team: homeTeam,
//               event_date: date,
//               event_time: time,
//               event_final_result: result,
//               league_name: league,
//               league_key: leagueId,
//               event_key: matchId,
//               event_status: status
//             } = v;
//             return {
//               awayTeam,
//               homeTeam,
//               league,
//               leagueId,
//               result,
//               matchId,
//               status,
//               date,
//               time
//             };
//           })
//           .sort(compare);
//         return leagues;
//       })
//       .then(val => {
//         finalLeagues = [];
//         val.forEach(v => {
//           fetch(
//             `https://allsportsapi.com/api/football/?met=Odds&APIkey=b87c076ed73e28a0618f685e5e9631e3606151175d05e9ec3be0b79674fa4874&from=${today}&to=${endDate}&matchId=${v.matchId}`
//           ).then(val =>
//             val.json().then(val => {
//               if (val.result) {
//                 const { odd_1, odd_2, odd_x } = val.result[`${v.matchId}`][0];
//                 v.odds = { odd_1, odd_2, odd_x };
//                 let item = finalLeagues.find(w => w.league === v.league);
//                 if (item) {
//                   item.matches.push(v);
//                 } else {
//                   finalLeagues.push({
//                     league: v.league,
//                     matches: [v]
//                   });
//                 }
//               }
//             })
//           );
//         });
//         return finalLeagues;
//       })
//       .then(val => {
//         renderMatches(val);
//       });
//   });
// }

// fetchFootballData();


// setInterval(() => {
//   fetchFootballData();
// }, 60000);
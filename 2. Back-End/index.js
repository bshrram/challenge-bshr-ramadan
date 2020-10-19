// const express = require('express');
// const bodyParser = require('body-parser');
const fs = require('fs')
const moment = require('moment')
// https://gist.githubusercontent.com/rodbegbie/9321897/raw/0468834c3044e5e4e6c2779bfca377d9f01d3abe/rest_hours.csv

/*

You can use whatever programming language you feel most comfortable in (replace “Javasccript Date” with whatever the native object is in the language to express a Date & Time).

Given the attached CSV data file, write a function findOpenRestaurants(csvFilename, searchDatetime) which takes as parameters a filename and a "Javascript Date" object and returns a list of restaurant names which are open on that date and time. Optimized solutions are nice, but correct solutions are more important!
Assumptions:

* If a day of the week is not listed, the restaurant is closed on that day
* All times are local — don’t worry about timezone-awareness
* The CSV file will be well-formed

If you have any questions, let me know. Submit your solution to your github account. Please use multiple commits so we can see your progress.

Bonus 1: create a server with an endpoint that allows a client to request open restaurants based on a datetime passed to the server.  Avoid the use of opinionated frameworks that use generators such as NestJS or Ruby on Rails.

Bonus 2: Design a database that stores restaurant name and restaurant open times in a normalized manner.  Also create a query that denormalizes the data in a user friendly format.

*/

/*

"Mon-Thu, Sun 11:30 am - 9 pm  / Fri-Sat 11:30 am - 9:30 pm"

[
  "Mon-Thu, Sun 11:30 am - 9 pm" --> find location of first number ->
  "Fri-Sat 11:30 am - 9:30 pm"
]
*/


// *** parseData(filename): return data in schema: [{name: String, hours: {day: {open: String, close: String} }]
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const parseData = (filename) => {
  const data = []
  const csvData = fs.readFileSync(filename)
    .toString().split('\n').map(e => e.trim()).map(e => e.replace('","', '",,"').split(',,').map(e => e.trim().split(' /')))

  const reseturantsNames = csvData.map(d => d[0][0].slice(1, -1))
  const initAppointments = csvData.map(d => d[1])
  const appointments = initAppointments.map((ia, ind) => {
    if (ia) {
      const daysClock = ia.map(a => {
        a = a.slice(1, -1)
        const i = a.search(/\d/)
        let days = a.substr(0, i - 1)
        let clocks = a.substr(i, a.length - i)
        let [open, close] = clocks.split(' - ')
        days = days.split(', ')
        const res = {}
        for (let dayIndex in days) {
          const day = days[dayIndex]
          let [lDay, RDay] = day.split('-')
          const lDayIndex = weekDays.findIndex(d => d === lDay)
          let RDayIndex = RDay ? weekDays.findIndex(d => d === RDay) : lDayIndex
          if (RDayIndex < lDayIndex)
            RDayIndex = 6 + RDayIndex + 1
          for (let dI = lDayIndex; dI <= RDayIndex; dI++) {
            const i = dI % 7
            res[weekDays[i]] = { open, close }
          }
        }
        return res
      })
      
      return daysClock.reduce((acc, x) => {
        for (let k in x) acc[k] = x[k]
        return acc
      })
    }
    return null
  })
  return reseturantsNames.map((r, i) => { 
    return { name: r, hours: appointments[i] } 
  })
}




const findOpenRestaurants = (csvFilename, searchDatetime) => {
  const data = parseData(csvFilename)
  const day = searchDatetime.getDay()
  const res = data.filter(d => {
    if (!d.hours || !d.hours[weekDays[day]]) return 0
    let {open, close} = d.hours[weekDays[day]]
    let openDate = moment(searchDatetime.toDateString()+ ' ' + open, "dddd MMMM Do YYYY h:mm a")
    let closeDate = moment(searchDatetime.toDateString()+ ' ' + close, "dddd MMMM Do YYYY h:mm a")
    openDate = openDate.toDate()
    closeDate = closeDate.toDate()
    return searchDatetime >= openDate && searchDatetime <= closeDate
  })
  return res

}

const d = new Date()
const r = findOpenRestaurants('data.csv', d)
console.log(r)

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.send('Hello Express!');
// });

// app.listen(80, () => console.log('Server listening.'));
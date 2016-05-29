define("services/g11n/default", [], function () {
  return {
    calendar: {
      days: {
        names: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        namesAbbr: [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat"
        ]
      },
      months: {
        names: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        namesAbbr: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      firstDay: 0
    },
    time: {
      AM: "am",
      PM: "pm",
      separator: ":",
      format: {
        duration: "mm:ss",
        "short": "h:mm tt",
        "long": "h:mm:ss tt"
      }
    },
    date: {
      separator: "/",
      format: {
        dayMonth: "M/d",
        dayMonthYear: "M/d/yy",
        dayAbbr: "dAbbr",
        dayName: "dName",
        dateAbbr: "mAbbr d yyyy",
        shortDateAbbr: "mAbbr d"
      }
    },
    dir: "ltr"
  };
});

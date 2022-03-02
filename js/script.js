const url = "http://worldtimeapi.org/api/timezone/";
const time = document.getElementById("time");
const city = document.getElementById("timezone-city")
const zone = document.getElementById("timezone-continent")
const utc = document.getElementById("UTC")
const dropdown = document.getElementById("dropdown");
const dst = document.getElementById("DST");

dropdown.addEventListener("change", () => {
  worldtimeapiFetch();
});

setInterval(function () {
  worldtimeapiFetch(url)
}, 1000);

function worldtimeapiFetch() {
  let realUrl = url + dropdown.value;
  fetch(realUrl)
    .then((res) => res.json())
    .then((res) => {
      let dateObj = new Date(res.utc_datetime);
      let offset = res.raw_offset / 60 / 60;    //offset in hours
      let dstoffset = res.dst_offset / 60 / 60;  //daytime saving offset in hours
      let zonecity = res.timezone;
      time.innerText = formatTime(dateObj, offset + dstoffset);
      if (zonecity != undefined) {
        let cityName = zonecity.split('/')[1];
        if (city.innerText != cityName) {
          zone.innerText = zonecity.split('/')[0];
          city.innerText = cityName;
          utc.innerText = res.utc_offset;
          if(res.dst){
            dst.innerText = "Daylight Savings: On"
          }else{
            dst.innerText = "Daylight Savings: Off"
          }
        }
      }
    })
}

function formatTime(dateObj, offset) {
  let result = '';
  let seconds = dateObj.getUTCSeconds();
  let hours = dateObj.getUTCHours() + offset;
  let minutes = dateObj.getUTCMinutes();
  if (hours > 24){
    hours = hours - 24;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  result += hours + ":";

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  result += minutes + ":";
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  result += seconds;

  return result;

}


/*{
"abbreviation": "CET",
"client_ip": "87.59.14.119",
"datetime": "2022-02-17T21:01:50.952225+01:00", <----
"day_of_week": 4,
"day_of_year": 48,
"dst": false,
"dst_from": null,
"dst_offset": 0,
"dst_until": null,
"raw_offset": 3600,
"timezone": "Europe/Copenhagen", <----
"unixtime": 1645128110,
"utc_datetime": "2022-02-17T20:01:50.952225+00:00",
"utc_offset": "+01:00", <----
"week_number": 7
  }*/

/*TODO: lav passende attributter ud fra de markerede JSON værdier som kan manipulerer med klokken  */
/* Altså vælg tidszone fra drop down, og set uret.

});

 */


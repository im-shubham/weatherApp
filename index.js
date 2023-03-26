const curDate = document.getElementById("date");

let weathercon = document.getElementById("weathercon");

const tempStatus = "{%tempstatus%}";

if(tempStatus == "Clear"){
    weathercon.innerHTML = `<i class="fas fa-sun" style="color: #eccc68;"></i>`;
}else if(tempStatus == "Clouds"){
    weathercon.innerHTML = `<i class="fas fa-cloud" style="color: #f1f2f6;"></i>`;
}else if(tempStatus == "Rain"){
    weathercon.innerHTML = `<i class="fas fa-cloud-rain" style="color: #a4b0be;"></i>`;
}else{
    weathercon.innerHTML = `<i class="fas fa-sun" style="color: #eccc68;"></i>`;
}


const getCurrentDay = () => {
  let weekDay = new Date().getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return days[weekDay];
}
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const getCurrentTime = () => {

    let currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var date = currentTime.getDate();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();

    var am = true;

    if(hours>12){
        am = false;
        hours = hours-12;
    }

    if(hours<10){
        hours = "0"+hours;
    }
    if(minutes<10){
        minutes = "0"+minutes;
    }
    return `${date} ${months[month-1]} | ${hours}:${minutes} ${am ? "AM" : "PM"}`;


}

curDate.innerHTML = `${getCurrentDay()} |  ${getCurrentTime()}`;
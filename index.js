$(document).ready(function(){
  var region;
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var temp;

  function url(lat, lon) {
    if (lat && lon){
      return "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=9e76b2a0a8206cf0d6a2b1729deac0de";
    } else {
      return "http://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&appid=9e76b2a0a8206cf0d6a2b1729deac0de";
    }
    
  }
  
  $.getJSON('http://ipinfo.io', function(data){ 
    $('#region').html(data.country);
    latlon = data.loc.split(",");
    lat = latlon[0];
    lon = latlon[1]
    // $('#city').html(lat);
    $.getJSON(url(lat,lon), weather);
  });


  function today(){
    var d = new Date();
    dayofw = d.getDay();
    month = d.getMonth();
    day = d.getDate();
    return (days[dayofw] + ", " + months[month] + " " + day)
  }
  function cel() {
    return Math.floor(temp - 273);
  }
  function far() {
    return Math.floor(1.8 *(temp - 273)+32);
  }

  var weather = function(data){
    $('.onload').remove();
    $('#city').text(data.name);
    $('#icon').html("<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'>");
    temp = data.main.temp
    $('#temp').html(cel() + "°");
    $('#cel').html("C |");
    $('#far').html("F");
    $('#cond').html(data.weather[0].description);
    $('#date').html(today() );
  }

  $('#cel').click(function(){
    $('#temp').html(cel() + "°");
  });
  $('#far').click(function(){
    $('#temp').html(far() + "°");
  });
});

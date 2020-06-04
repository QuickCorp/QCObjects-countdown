//QCObjects Date String Object

const DateStringObject = function (timezone, _date_, pattern){
  _date_ = (typeof _date_ === "undefined")?(new Date()):(_date_);
  const [dateString, hourString, gmtString] = new Date(_date_.toISOString()).toLocaleString("iso",{
    year:"numeric",
    month:"2-digit",
    day:"2-digit",
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit",
    timeZone:timezone, timeZoneName:"short", hour12:false}).replace(',','').split(' ');
  const [monthString, dayString, yearString] = dateString.split('/');
  const [hoursString, minutesString, secondsString] = hourString.split(':');
  const _date_object_ = {
    dateString, hourString, gmtString, monthString, dayString, yearString, hoursString, minutesString, secondsString
  };

  return Object.assign({
    pattern:pattern,
    formattedDate: (function (_date_object_){

    })(_date_object_)
  },_date_object_);
}

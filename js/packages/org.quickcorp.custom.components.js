'use strict';
Package('org.quickcorp.custom.components',[
  Class('CountdownComponent',Component,{
    name:'countdown',
    cached:false,
    _new_:function (o){
      global.set('countdownInstance',this);
      _super_('Component','_new_').call(this,o);
      var component = this;
      component.data = New(DDO,{
        instance:component,
        name:'data',
        value: {
          days: '5 days',
          hours: '1 hour',
          minutes: '2 minutes',
          seconds: '1 second'
        },
        fset:function (value){
          console.log(value);
          component.subcomponents.map(function (subcomponent){
            subcomponent.data = component.data;
            subcomponent.body.subelements('component[data-days]:not([data-days=""]) .card .container h1').forEach(element => {
              element.innerHTML = subcomponent.data.days;
            });
            subcomponent.body.subelements('component[data-hours]:not([data-hours=""]) .card .container h1').forEach(element => {
              element.innerHTML = subcomponent.data.hours;
            });
            subcomponent.body.subelements('component[data-minutes]:not([data-minutes=""]) .card .container h1').forEach(element => {
              element.innerHTML = subcomponent.data.minutes;
            });
            subcomponent.body.subelements('component[data-seconds]:not([data-seconds=""]) .card .container h1').forEach(element => {
              element.innerHTML = subcomponent.data.seconds;
            });

          })
        },
        fget: function (data){
          return data;
        }
      })
    }
  })
  

]);

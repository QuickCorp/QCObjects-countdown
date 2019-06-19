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
          days: '0 days',
          hours: '0 hour',
          minutes: '0 minutes',
          seconds: '0 second'
        },
        fset:function (value){
          console.log(value);
          component.subcomponents.map(function (subcomponent){
            subcomponent.data = component.data;
            var updateDigit = function (digit,data){
              var elementSelector = 'component[data-'+digit+']:not([data-'+digit+'=""]) .card .container h1';
              subcomponent.body.subelements(elementSelector).forEach(element => {
                element.innerHTML = subcomponent.data[digit];
                element.style.display = 'block';
              });
            }
            updateDigit('days',component.data);
            updateDigit('hours', component.data);
            updateDigit('minutes', component.data);
            updateDigit('seconds', component.data);

          })
        },
        fget: function (data){
          return data;
        }
      })
    }
  })
  

]);

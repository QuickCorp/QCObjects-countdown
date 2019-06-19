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
            var updateDigit = function (digit,data){
              var elementSelector = 'component[data-'+digit+']:not([data-'+digit+'=""]) .card .container h1';
              subcomponent.body.subelements(elementSelector).forEach(element => {
                element.innerHTML = subcomponent.data[digit];
                element.style.display = 'block';
                Fade.apply(element, 0, 1);
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

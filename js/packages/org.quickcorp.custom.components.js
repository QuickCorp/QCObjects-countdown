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
//          console.log(value);
          component.subcomponents.map(function (subcomponent){
            subcomponent.data = component.data;
            var updateDigit = function (digit,data){
              var elementSelector = 'component[data-'+digit+']:not([data-'+digit+'=""]) .card .container h1';
              subcomponent.body.subelements(elementSelector).forEach(element => {
                element.innerHTML = subcomponent.data[digit];
                element.style.display = 'block';
                RotateX.duration = 350;
                var effects = {
                                'days':function (){component.body.style.transformOrigin='top';RotateX.apply(component.body,240,360)},
                                'hours':function (){component.body.style.transformOrigin='center';RotateX.apply(component.body,180,0)},
                                'minutes':function (){component.body.style.transformOrigin='center';RotateX.apply(component.body,180,360)},
                                'seconds':function (){component.body.style.transformOrigin='bottom';RotateX.apply(component.body,360,0)},
                              };
                effects[digit].call(this);
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

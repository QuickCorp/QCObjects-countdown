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
        component.body.buildComponents(true);
      },
      fget: function (data){
        return data;
      }
    })
  }
  })
  

]);

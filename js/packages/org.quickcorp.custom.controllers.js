'use strict';
Import('installer');

Package('org.quickcorp.custom.controllers', [
  Class('MainController', Controller, {
    dependencies: [],
    component: null,
    _new_: function(o) {
      this.__new__(o);
      var controller = this;
      //TODO: Implement
    },
    done: function() {
      var controller = this;



    }
  }),
  Class('PWAController', Object, {
    component: null,
    _new_: function(o) {
      logger.debug('PWAController Element Initialized');
      this.component = o.component;
    },
    done: function() {
      document.head.innerHTML += this.component.body.innerHTML;
      this.component.body.innerHTML = "";
    }
  }),
  Class('SideNavController', Object, {
    dependencies: [],
    component: null,
    visibility: false,
    effect: null,
    open: function() {
      if (this.effect != null) {
        this.effect.apply(this.component.body, 0, 1);
      }
      this.component.body.style.width = "100%";
      this.component.body.style.overflowX = "visible";
      this.component.body.parentElement.subelements('.navbtn')[0].style.display = 'none';
      this.component.body.parentElement.subelements('.closebtn')[0].style.display = 'block';
      this.visibility = true;
      return this.visibility;
    },
    close: function() {
      if (this.effect != null) {
        this.effect.apply(this.component.body, 1, 0);
      }
      this.component.body.style.width = "0px";
      this.component.body.style.overflowX = "hidden";
      this.component.body.parentElement.subelements('.navbtn')[0].style.display = 'block';
      this.component.body.parentElement.subelements('.closebtn')[0].style.display = 'none';
      this.visibility = false;
      return this.visibility;
    },
    toggle: function() {
      if (this.visibility) {
        this.close();
      } else {
        this.open();
      }
    },
    _new_: function(o) {
      this.__new__(o);
      var controller = this;
      GLOBAL._sdk_.then(function() {
        controller.effect = New(Fade, {
          duration: 300
        });
      });
      GLOBAL.sideNavController = this;
      GLOBAL.sideNavController.close();
      //TODO: Implement

    },
    done: function() {}
  }),
  Class('HeaderController', Controller, {
    dependencies: [],
    component: null,
    installer: null,
    loadInstallerButton: function() {
      this.installer = new Installer(this.component.body.subelements('#installerbutton')[0]);
    },
    _new_: function(o) {
      this.__new__(o);
      //TODO: Implement
    },
    done: function() {
      this.loadInstallerButton();
    }
  }),
  Class('CountdownController', Controller, {
    dependencies: [],
    component: null,
    interval(remaining) {
      var controller = this;
      var component = controller.component;
      var intervalDate = new Date(1970, 0, 1);
      intervalDate.setSeconds(remaining);
      component.data = {
        days: Math.floor(intervalDate.valueOf() / 8.64e7).toString() + ' days',
        hours: intervalDate.getHours().toString() + ' hour',
        minutes: intervalDate.getMinutes().toString() + ' minute',
        seconds: intervalDate.getSeconds().toString() + ' seconds'
      }
    },
    _new_: function(o) {},
    done: function() {
      var controller = this;
      var component = controller.component;
      var dateTo = new Date('31 Dec 2019 00:00:00 GMT');
      var dateNow = new Date();
      Timer.alive = true;
      var duration = Math.abs(dateTo.valueOf() - dateNow.valueOf());
      this.thread = {
        duration: duration,
        timing(timeFraction, elapsed) {
          var tolerance = 0.0085; // change this in order to detect better a seconds interval
          component.data.elapsed = elapsed;
          var remaining = Math.round(Math.round(duration - elapsed) / 1000);
          var a_second = Math.abs((elapsed / 1000) - Math.round(elapsed / 1000)) < tolerance;
          if (a_second) {
            controller.interval(remaining);
          }
          return timeFraction;
        },
        intervalInterceptor(progress) {
          if (progress == 100) {
            Timer.alive = false;
          }
        }
      }
      Timer.thread(this.thread);
    }
  })
]);

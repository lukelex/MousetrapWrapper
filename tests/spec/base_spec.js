// Generated by CoffeeScript 1.6.2
(function() {
  describe('MousetrapWrapper.Base', function() {
    beforeEach(function() {
      return this.shortcutLibDouble = {
        bind: function() {},
        unbind: function() {}
      };
    });
    describe('#events', function() {
      return it('should not allow inheritance without implementing the events method', function() {
        var newObj,
          _this = this;

        newObj = {};
        newObj.prototype = MousetrapWrapper.Base.prototype;
        return (expect(function() {
          return newObj.events();
        })).toThrow();
      });
    });
    describe('#attach', function() {
      beforeEach(function() {
        this.base = new MousetrapWrapper.Base(this.shortcutLibDouble);
        (spyOn(this.base, 'events')).andReturn([[], []]);
        return spyOn(this.base, 'bindCallbackFor');
      });
      it('should mark itself as attached', function() {
        this.base.attach();
        return (expect(this.base.attached)).toBeTruthy();
      });
      return it('should attach each events', function() {
        this.base.attach();
        return (expect(this.base.bindCallbackFor.calls.length)).toEqual(2);
      });
    });
    describe('#reattach', function() {
      beforeEach(function() {
        return this.base = new MousetrapWrapper.Base(this.shortcutLibDouble);
      });
      it('should not allow to attach twice in a roll', function() {
        var _this = this;

        (spyOn(this.base, 'attach')).andCallFake(function() {
          return this.attached = true;
        });
        this.base.attach();
        return (expect(function() {
          return _this.base.reattach();
        })).toThrow();
      });
      return it('should call #attach', function() {
        spyOn(this.base, 'attach');
        this.base.reattach();
        return (expect(this.base.attach)).toHaveBeenCalled();
      });
    });
    describe('#detach', function() {
      beforeEach(function() {
        return this.base = new MousetrapWrapper.Base(this.shortcutLibDouble);
      });
      it('should not allow to detach if no yet attached', function() {
        var _this = this;

        return (expect(function() {
          return _this.base.dettach();
        })).toThrow();
      });
      return it('should unbind the event', function() {
        var events;

        spyOn(this.base, 'unbindCallbackFor');
        (spyOn(this.base, 'attach')).andCallFake(function() {
          return this.attached = true;
        });
        events = [['q', (function() {})]];
        (spyOn(this.base, 'events')).andReturn(events);
        this.base.attach();
        this.base.detach();
        return (expect(this.base.unbindCallbackFor)).toHaveBeenCalledWith(events[0]);
      });
    });
    describe('#bindCallbackFor', function() {
      beforeEach(function() {
        spyOn(this.shortcutLibDouble, 'bind');
        return this.base = new MousetrapWrapper.Base(this.shortcutLibDouble);
      });
      it('should not allow an undefined callback', function() {
        var _this = this;

        return (expect(function() {
          return _this.base.bindCallbackFor(['q', void 0]);
        })).toThrow();
      });
      it('should bind the event', function() {
        var event;

        event = ['q', (function() {})];
        this.base.bindCallbackFor(event);
        return (expect(this.shortcutLibDouble.bind)).toHaveBeenCalledWith * event;
      });
      return it('should bind an event with a modifier', function() {
        var eventWithModifier;

        eventWithModifier = ['q', (function() {}), 'modifier'];
        this.base.bindCallbackFor(eventWithModifier);
        return (expect(this.shortcutLibDouble.bind)).toHaveBeenCalledWith * eventWithModifier;
      });
    });
    return describe('unbindCallbackFor', function() {
      return it('should unbind the event', function() {
        var event;

        spyOn(this.shortcutLibDouble, 'unbind');
        this.base = new MousetrapWrapper.Base(this.shortcutLibDouble);
        event = ['q', function() {}];
        this.base.unbindCallbackFor(event);
        return (expect(this.shortcutLibDouble.bind)).toHaveBeenCalledWith * event;
      });
    });
  });

}).call(this);

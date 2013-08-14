describe 'MousetrapWrapper.Base', ->
  beforeEach ->
    @shortcutLibDouble =
      bind: ->
      unbind: ->

  describe '#events', ->
    it 'should not allow inheritance without implementing the events method', ->
      newObj = {}
      newObj.prototype = MousetrapWrapper.Base.prototype

      (expect =>
        newObj.events()
      ).toThrow()

  describe '#attach', ->
    beforeEach ->
      @base = new MousetrapWrapper.Base @shortcutLibDouble

      (spyOn @base, 'events').andReturn [[],[]]
      spyOn @base, 'bindCallbackFor'

    it 'should mark itself as attached', ->
      @base.attach()

      (expect @base.attached).toBeTruthy()

    it 'should attach each events', ->
      @base.attach()

      (expect @base.bindCallbackFor.calls.length).toEqual 2

  describe '#reattach', ->
    beforeEach ->
      @base = new MousetrapWrapper.Base @shortcutLibDouble

    it 'should not allow to attach twice in a roll', ->
      (spyOn @base, 'attach').andCallFake -> @attached = true

      @base.attach()

      (expect =>
        @base.reattach()
      ).toThrow()

    it 'should call #attach', ->
      spyOn @base, 'attach'

      @base.reattach()

      (expect @base.attach).toHaveBeenCalled()

  describe '#detach', ->
    beforeEach ->
      @base = new MousetrapWrapper.Base @shortcutLibDouble

    it 'should not allow to detach if no yet attached', ->
      (expect =>
        @base.dettach()
      ).toThrow()

    it 'should unbind the event', ->
      spyOn @base, 'unbindCallbackFor'
      (spyOn @base, 'attach').andCallFake -> @attached = true

      events = [['q', (->)]]
      (spyOn @base, 'events').andReturn events

      @base.attach()
      @base.detach()

      (expect @base.unbindCallbackFor).toHaveBeenCalledWith events[0]

  describe '#bindCallbackFor', ->
    beforeEach ->
      spyOn @shortcutLibDouble, 'bind'

      @base = new MousetrapWrapper.Base @shortcutLibDouble

    it 'should not allow an undefined callback', ->
      (expect =>
        @base.bindCallbackFor ['q', undefined]
      ).toThrow()

    it 'should bind the event', ->
      event = ['q', (->)]
      @base.bindCallbackFor event

      (expect @shortcutLibDouble.bind).toHaveBeenCalledWith *event

    it 'should bind an event with a modifier', ->
      eventWithModifier = ['q', (->), 'modifier']
      @base.bindCallbackFor eventWithModifier

      (expect @shortcutLibDouble.bind).toHaveBeenCalledWith *eventWithModifier

  describe 'unbindCallbackFor', ->
    it 'should unbind the event', ->
      spyOn @shortcutLibDouble, 'unbind'
      @base = new MousetrapWrapper.Base @shortcutLibDouble

      event = ['q', ->]
      @base.unbindCallbackFor event

      (expect @shortcutLibDouble.bind).toHaveBeenCalledWith *event

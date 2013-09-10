window.MousetrapWrapper = {}

class MousetrapWrapper.Base
  constructor: (@lib=Mousetrap) ->

  events: -> throw new Error 'Events method not implemented'

  attach: ->
    @attached = true

    @bindCallbackFor event for event in @events()

  reattach: ->
    throw new Error 'Events already attached' if @attached

    @attach()

  detach: ->
    throw new Error 'Events not yet attached' unless @attached

    @unbindCallbackFor event for event in @events()

    @attached = false

  bindCallbackFor: (event) ->
    unless event[1]
      throw new Error 'Trying to attach an unexisting callback'

    if event.length is 2
      @lib.bind event[0], event[1]
    else
      @lib.bind event[0], event[1], event[2]

  unbindCallbackFor: (event) ->
    @lib.unbind event[0]

var SuperDiamondEventListenersGlobalData = {
  functions: {
    SDAddEventListener: function(name, event, func, allowNormal) {
      this.SuperDiamondEventListenersObjectData.events[name] = {
        event: event,
        func: func,
        allowNormal: allowNormal
      };
      if (allowNormal) {
        if (!this.SuperDiamondEventListenersObjectData.InitalizedNormalEvents.includes(event)) {
          this.SuperDiamondEventListenersObjectData.InitalizedNormalEvents.push(event);
          this.addEventListener(event, this.SuperDiamondEventListenersObjectData.NormalEventHandler);
        }
      }
    },
    SDRemoveEventListener: function(name) {
      delete this.SuperDiamondEventListenersObjectData.events[name];
    },
    SDCallEvent: function(event, data) {
      for (let key in this.SuperDiamondEventListenersObjectData.events) {
        if (this.SuperDiamondEventListenersObjectData.events.hasOwnProperty(key)) {
          let eventObject = this.SuperDiamondEventListenersObjectData.events[key];
          if (eventObject.event === event) {
            eventObject.func(data, event);
          }
        }
      }
    },
    SDNormalEventHandler: function(event) {
      for (let key in this.SuperDiamondEventListenersObjectData.events) {
        if (this.SuperDiamondEventListenersObjectData.events.hasOwnProperty(key)) {
          let eventObject = this.SuperDiamondEventListenersObjectData.events[key];
          if (eventObject.event === event.type && eventObject.allowNormal) {
            eventObject.func(event, event.type);
          }
        }
      }
    }
  }
};

function InitalizeSDEventListeners(obj) {
 obj.SDCallEvent = SuperDiamondEventListenersGlobalData.functions.SDCallEvent.bind(obj)
 obj.SDRemoveEventListener = SuperDiamondEventListenersGlobalData.functions.SDRemoveEventListener.bind(obj)
 obj.SDAddEventListener = SuperDiamondEventListenersGlobalData.functions.SDAddEventListener.bind(obj)
 obj.SuperDiamondEventListenersObjectData = {}
 obj.SuperDiamondEventListenersObjectData.events = {}
 obj.SuperDiamondEventListenersObjectData.InitalizedNormalEvents = []
 obj.SuperDiamondEventListenersObjectData.SDNormalEventHandler = SuperDiamondEventListenersGlobalData.functions.SDNormalEventHandler.bind(obj)
 return obj
}

function ThisInitalizeSDEventListeners(obj) {
 this.SDCallEvent = SuperDiamondEventListenersGlobalData.functions.SDCallEvent.bind(this)
 this.SDRemoveEventListener = SuperDiamondEventListenersGlobalData.functions.SDRemoveEventListener.bind(this)
 this.SDAddEventListener = SuperDiamondEventListenersGlobalData.functions.SDAddEventListener.bind(this)
 this.SuperDiamondEventListenersObjectData = {}
 this.SuperDiamondEventListenersObjectData.events = {}
 this.SuperDiamondEventListenersObjectData.InitalizedNormalEvents = []
 this.SuperDiamondEventListenersObjectData.SDNormalEventHandler = SuperDiamondEventListenersGlobalData.functions.SDNormalEventHandler.bind(this)
}

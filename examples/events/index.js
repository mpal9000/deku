/** @jsx element */

import {element,render,tree} from 'deku'

var MouseOver = {
  render (component, setState) {
    let {props, state} = component
    function hover() {
      setState({ hover: true })
    }
    function blur() {
      setState({ hover: false })
    }
    var classes = {
      'box': true,
      'active': state.hover === true
    }
    return (
      <div class={classes} onMouseOver={hover} onMouseOut={blur}>
        Mouseover / Mouseout
      </div>
    )
  }
}

var MouseDown = component(function(props, state, send){
  function down() {
    send({ down: true });
  }
  function up() {
    send({ down: false });
  }
  var classes = {
    'active': state.down === true
  };
  return dom('div.box', { class: classes, onMouseDown: down, onMouseUp: up }, [
    'Mousedown / Mouseup'
  ]);
});

var MouseMove = component(function(props, state, send){
  var self = this;
  function move() {
    if (self.timer) clearTimeout(self.timer);
    self.timer = setTimeout(function(){
      send({ moving: false });
      self.timer = null;
    }, 50);
    send({
      moving: true
    });
  }
  var classes = {
    'active': state.moving === true
  };
  return dom('div.box', { class: classes, onMouseMove: move }, [
    'Mousemove'
  ]);
});

var BlurFocus = component(function(props, state, send){
  function focus(event) {
    send({ focused: true });
  }
  function blur() {
    send({ focused: false });
  }
  var classes = {
    'active': state.focused === true
  };
  return dom('div.box', { class: classes }, [
    dom('input', {
      type: 'text',
      onFocus: focus,
      onBlur: blur
    })
  ]);
});

var Click = component({
  initialState: function(){
    return {
      count: 0
    };
  },
  render: function(props, state, send){
    function click() {
      var count = state.count + 1;
      send({ count: count });
    }
    var classes = {
      'active': state.count % 2
    };
    return dom('div.box', { class: classes }, [
      'Clicked ' + state.count + ' times',
      dom('button', { onClick: click }, 'Click Me')
    ]);
  }
});

var DblClick = component({
  initialState: function(){
    return {
      count: 0
    };
  },
  render: function(props, state, send){
    function click() {
      var count = state.count + 1;
      send({ count: count });
    }
    var classes = {
      'active': state.count % 2
    };
    return dom('div.box', { class: classes, onDoubleClick: click }, [
      'Double clicked ' + state.count + ' times'
    ]);
  }
});

var FormSubmit = component({
  render: function(props, state, send){
    function submit(e) {
      e.preventDefault();
      send({ submitted: !state.submitted });
    }
    var classes = {
      'active': state.submitted
    };
    return dom('form.box', { class: classes, onSubmit: submit }, [
      dom('button', { type: 'submit' }, 'Submit')
    ]);
  }
});

var KeyDown = component(function(props, state, send){
  var self = this;
  function down(event) {
    if (self.timer) clearTimeout(self.timer);
    send({ active: true });
    self.timer = setTimeout(function(){
      send({ active: false });
    }, 100);
  }
  var classes = {
    'active': state.active
  };
  return dom('div.box', { class: classes }, [
    'onKeyDown',
    dom('input', {
      type: 'text',
      onKeyDown: down
    })
  ]);
});

var KeyUp = component(function(props, state, send){
  var self = this;
  function down(event) {
    if (self.timer) clearTimeout(self.timer);
    send({ active: true });
    self.timer = setTimeout(function(){
      send({ active: false });
    }, 100);
  }
  var classes = {
    'active': state.active
  };
  return dom('div.box', { class: classes }, [
    'onKeyUp',
    dom('input', {
      type: 'text',
      onKeyUp: down
    })
  ]);
});

var Input = component(function(props, state, send){
  var self = this;
  function down(event) {
    if (self.timer) clearTimeout(self.timer);
    send({ active: true });
    self.timer = setTimeout(function(){
      send({ active: false });
    }, 100);
  }
  var classes = {
    'active': state.active
  };
  return dom('div.box', { class: classes }, [
    'onInput',
    dom('input', {
      type: 'text',
      onInput: down
    })
  ]);
});

var ContextMenu = component(function(props, state, send){
  function down(event) {
    event.preventDefault();
    send({ active: !state.active });
  }
  var classes = {
    'active': state.active
  };
  return dom('div.box', { class: classes, onContextMenu: down }, [
    'Context Menu (Right click on me)'
  ]);
});

var Copy = component(function(props, state, send){
  function run(event) {
    send({ active: !state.active });
  }
  var classes = {
    'active': state.active
  };
  return dom('div.box', { class: classes, onCopy: run }, [
    'Copy Me'
  ]);
});

var CutPaste = component(function(props, state, send){
  function run(event) {
    send({ active: !state.active });
  }
  var classes = {
    'active': state.active
  };
  return dom('div.box', { class: classes }, [
    dom('input', { onPaste: run, onCut: run, onCopy: run, value: 'Cut/Copy/Paste Here' })
  ]);
});

var Draggable = component(function(props, state, send){
  function start(event) {
    event.dataTransfer.setData('text', 'asdasd');
    send({ active: true });
  }
  function end(event) {
    send({ active: false });
  }
  var attrs = {
    classes: {
      'active': state.active
    },
    draggable: true,
    onDragStart: start,
    onDragEnd: end
  };
  return dom('div.box', attrs, [
    'Drag Me'
  ]);
});

var Droppable = component(function(props, state, send){
  function over(event) {
    event.preventDefault();
    //console.log('droppable', 'over', event.target);
  }
  function drop(event) {
    event.preventDefault()
    console.log('droppable', 'drop', event.target);
    send({ dropped: true, active: false });
  }
  function enter(event) {
    event.preventDefault()
    console.log('draggable', 'enter', event.target);
    send({ active: true });
  }
  function leave(event) {
    console.log('draggable', 'leave', event.target);
    send({ active: false });
  }
  var attrs = {
    classes: {
      'active': state.active
    },
    onDragOver: over,
    onDrop: drop,
    onDragEnter: enter,
    onDragLeave: leave
  };
  return dom('div.box', attrs, [
    state.dropped ? 'Dropped' : 'Drop Here'
  ]);
});

var Scroll = component(function(props, state, send){
  function scroll(event) {
    send({ position: event.target.scrollTop });
  }
  var attrs = {
    onScroll: scroll,
    class: {
      'active': state.position > 100
    },
    style: {
      overflow: 'scroll'
    }
  };
  var innerAttrs = {
    style: {
      height: '500px',
      width: '100%'
    }
  };
  return dom('div.box', attrs, [
    dom('div', innerAttrs, 'Scroll Me')
  ]);
});

var Examples = {
  render() {
    return (
      <div class="App">
        <MouseOver />
        <MouseMove />
        <MouseDown />
        <BlurFocus />
        <Click />
        <FormSubmit />
        <KeyDown />
        <Input />
        <KeyUp />
        <ContextMenu />
        <DblClick />
        <Copy />
        <CutPaste />
        <Draggable />
        <Droppable />
        <Scroll />
      </div>
    )
  }
}

var app = tree(<Examples />)
render(app, document.querySelector('main'));
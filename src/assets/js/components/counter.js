import closest from 'closest'
import knot from 'knot.js'

export default function(el){
  const input = el.getElementsByTagName('input')[0]
  const min = input.getAttribute('min') ? parseInt(input.getAttribute('min'),10) : 0
  const max = input.getAttribute('max') ? parseInt(input.getAttribute('max'),10) : 9999

  const instance = Object.create(knot({
    min,
    max,
    destroy
  }), {
    value: {
      value: clamp(parseInt(input.value, 10)),
      writable: true
    }
  })

  const state = {
    store: {
      value: instance.value 
    },
    set value(val){
      val = typeof val === 'number' ? val : min;
      this.store.value = val
      input.value = val
      instance.value = val
    },
    get value(){
      return this.store.value
    }
  }

  function emit(val){
    if (!instance) return

    if (val === min) emit('min', val)
    if (val === max) emit('max', val)

    instance.emit('change', val)
  }

  function clamp(val){
    let _val

    if (val >= min && val <= max){
      _val = val 
    } else if (val >= max){
      _val = max
    } else if (val <= min){
      _val = min
    }

    emit(_val)

    return _val;
  }

  function clickHandler(e){
    let target = closest(e.target, 'button', true)
    let type = target.getAttribute('data-count')
    let val = type === '+' ? 1 : -1

    state.value = clamp(state.value + val)
  }

  function changeHandler(e){
    state.value = clamp(parseInt(e.target.value,10))
  }

  function destroy(){
    el.removeEventListener('click', clickHandler)
    input.removeEventListener('change', changeHandler)
  }

  el.addEventListener('click', clickHandler)

  input.addEventListener('change', changeHandler)

  return instance
}

import shipper from 'shopify-shipping-calculator'

export default (el) => {
  const calculator = document.getElementById('shippingCalculator')
  const calculatorResults = document.getElementById('shippingCalculatorResults')
  const calculatorToggle = document.getElementById('shippingCalculatorToggle')
  const calculatorProvince = document.getElementById('shippingProvince')

  const ship = shipper(el, {
    defaultCountry: 'United States'
  })

  window.shipper = ship

  const render = rates => {
    calculatorResults.innerHTML = ''

    calculatorResults.innerHTML = `
      <div>
        <p class="italic">There ${ rates.length > 1 ? `are ${rates.length} rates` : `is ${rates.length} rate`} available:</p>
        <p class="p0">
        ${ 
          (() => {
            let res = ''
            rates.map(r => res +=`<span class="bold">${r.type}:</span><span>$${r.price}</span><br>`) 
            return res
          })()
        }
        </p>
      </div>
    `
  }

  ship.on('success', render)
  ship.on('error', res => console.warn(res))
  ship.on('change', model => {
    !!model.province ? (
      calculatorProvince.style.display = 'block'
    ) : (
      calculatorProvince.style.display = 'none'
    )
  })

  calculatorToggle && calculatorToggle.addEventListener('click', e => {
    e.preventDefault()

    let enabled = calculator.classList.contains('is-enabled')

    if (enabled){
      e.target.innerHTML = 'Show shipping calculator.'
      calculator.classList.remove('is-enabled')
    } else {
      e.target.innerHTML = 'Hide shipping calculator.'
      calculator.classList.add('is-enabled')
    }
  })
}

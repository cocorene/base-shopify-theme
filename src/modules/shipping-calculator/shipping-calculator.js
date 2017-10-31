import shipper from 'shopify-shipping-calculator'

export default (el) => {
  const outer = el
  const results = document.getElementById('shippingResults')
  const province = document.getElementById('shippingProvince')
  const zip = document.getElementById('shippingZip')
  const provinceLabel = province.getElementsByTagName('label')[0]
  const zipLabel = zip.getElementsByTagName('label')[0]

  const ship = shipper(outer, {
    defaultCountry: 'United States'
  })

  window.shipper = ship

  const render = rates => (results.innerHTML = `
    <div>
      <p class="italic">There ${rates.length > 1 ? `are ${rates.length} rates` : `is ${rates.length} rate`} available:</p>
      <p class="p0">
      ${(rates.map(r => `<span class="bold">${r.type}:</span><span>$${r.price}</span><br>`).join(''))}
      </p>
    </div>
  `)

  ship.on('success', render)
  ship.on('error', res => console.warn(res))
  ship.on('change', model => {
    let meta = model.meta

    // Clear results for next call
    results.innerHTML = ''

    !!model.province ? (
      province.style.display = 'block'
    ) : (
      province.style.display = 'none'
    )

    !!meta.zip_required ? (
      zip.style.display = 'block'
    ) : (
      zip.style.display = 'none'
    )

    zipLabel.innerHTML = `${meta.zip_label}:`
    provinceLabel.innerHTML = `${meta.province_label}:`
  })
}

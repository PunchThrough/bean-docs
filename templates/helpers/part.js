'use strict'

let S = require('string')

module.exports = (context, partName, partQuantity, partLink) => {
  let htmlTemplate = ('<div class="part bg">' +
                      '<ul><li>' +
                      '<span class="kind-of-spaced">{{partName}}</span>' +
                      '<span class="really-spaced">x {{partQuantity}}</span>' +
                      '<span class="back-spaced"><a href="{{partLink}}" target="_blank">' +
                      '<i class="fa fa-shopping-cart"></i></a></span>' +
                      '</li>' +
                      '</ul>' +
                      '</div>')


  return S(htmlTemplate).template({
    partName: partName,  // Name of part
    partQuantity: partQuantity,  // Quantity of part
    partLink: partLink  // Link to the part's order page
  })

}

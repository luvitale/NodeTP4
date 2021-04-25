setTimeout(
  () => {
    let state = document.getElementById('product-state')
    if (state) state.style.display='none'
  }, 5000
)

$(document).ready(function () {
  $('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var productID = button.data('product-id') // Extract info from data-* attributes
    var modal = $(this)
    modal.find('.modal-body').text(`¿Estás seguro de eliminar el producto ${productID}?`)
    document.getElementById('delete-form').action = `/borrar/${productID}?_method=DELETE`
  })
})
import $ from 'jquery'

const duration = 500

function filterByCategoria(category) {
    $('[wm-category]').each(function (i, e) {
        const isTarget = $(this).attr('wm-category') === category 
            || category === null
        if (isTarget) {
            if($(e).attr('hide') === 'true'){
                $(e).removeAttr('hide')
                $(e).parent().removeAttr('hide')
                $(e).removeClass('d-none')
            }
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.categorySelect = function () {
    const categorys = new Set
    $('[wm-category]').each(function (i, e) {
        categorys.add($(e).attr('wm-category'))
    })

    const options = Array.from(categorys).map(category => {
        const option = $('<option>').val(category).html(category)
        return option
    })
    
    const todas = $('<option>').attr('selected', '').val(null).html('Todas')
    options.push(todas)

    $('#category').html(options)

    $('#category').change(() => {
        $('#category option:selected').each((i, e) => {
           if(e.value === ''){
                filterByCategoria(null)
           }else{
                filterByCategoria(e.value)
           }
        })
    })

    return $(this)
}
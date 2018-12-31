import $ from 'jquery'

import './categorySelect'

export function jScroll() {

    $('.load-more').click(e => {

        $('.load-more').addClass('fa-spin')

        setTimeout(() => {
            $('.load-more').removeClass('fa-spin')
            $("div[hide|='true']").each((i, e) => {
                if (i < $('[wm-cursos]').attr('data-limit')) {
                    $(e).removeClass('d-none')
                    $(e).removeAttr('hide')
                    $(e).parent().removeAttr('hide')
                }
            })
            $('[wm-category-select]').categorySelect()
        }, 500)

        if($("div[hide|='true']").length <= $('div[data-limit]').data("limit")){
            $('.load-more').addClass('d-none')
            $('.load-no-more').removeClass('d-none')
        }
    })
}
import $ from 'jquery'
import InfiniteScroll from 'infinite-scroll'
import './categorySelect'

export function jScroll() {

    $('.load-more').click(e => {
        $('.load-more').addClass('fa-spin')
        setTimeout(() => {
            $('.load-more').removeClass('fa-spin')
            $("div[hide|='true']").each((i, e) => {
                if (i < $('[wm-cursos]').attr('limit')) {
                    $(e).removeClass('d-none')
                    $(e).removeAttr('hide')
                    $(e).parent().removeAttr('hide')
                }
            })
            $('.d-none').each(e => { $(e) === null ? $('.load-more').addClass('d-none') : ''})
            $('[wm-category-select]').categorySelect()
        }, 500)
    })
}


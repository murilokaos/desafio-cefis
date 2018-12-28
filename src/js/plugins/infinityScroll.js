import $ from 'jquery'
import InfiniteScroll from 'infinite-scroll'
import './categorySelect'

export function jScroll() {

    $('.load-more').click(e => {
        $('.load-more').addClass('fa-spin')
        setTimeout(() => {
            $('.load-more').removeClass('fa-spin')
            $("div[style|='display:none']").each((i, e) => {
                if (i < $('[wm-cursos]').attr('limit')) {
                    $(e).attr('style', '')
                }
            })
            $('[wm-category-select]').categorySelect()
        }, 500)
    })
    if($("div[style|='display:none']").each()){
        $('.load-more').each((i, e) => $(e).attr('style', 'display:none'))
    }
    
}


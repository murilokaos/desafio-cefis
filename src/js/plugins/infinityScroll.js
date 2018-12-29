import $ from 'jquery'
import './categorySelect'

export function jScroll() {

    $('[wm-cursos]').each(() => {
        if($(this).children.length === 0){
           $('.load-more').addClass('fa-spin')
        }else{
            $('.load-more').removeClass('fa-spin')
        }
    })

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
            $('[wm-category-select]').categorySelect()
        }, 500)

        if($("div[hide|='true']").length === 0){
            $('.load-more').addClass('d-none')
            $('.load-no-more').removeClass('d-none')
        }
    })
}
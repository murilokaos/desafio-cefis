import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'
import { configurarLinks, marcarLinkComoSelecionado } from '../core/navigator'
import { jScroll } from './infinityScroll'
import { loadCurso } from './loadCurso'
import './categorySelect'

const url = 'https://cefis.com.br/api/v1/event'
let objCursos = JSON.parse(sessionStorage.getItem('cursos'))

export function loadUrl(u) {
    const cursos = $.ajax({
        url: u
    }).done(resp => resp)
    return cursos
}

$.fn.cursosDiv = function (limit) {
    if (objCursos === null) {
        new Promise((res, err) => { res(loadUrl(url)) 
        $('.load-more').addClass('fa-spin')
    })
            .then(resp => {
                sessionStorage.setItem('cursos', JSON.stringify(resp.data))
                objCursos = resp.data
                mapDiv(objCursos, $(this), limit)
            })
    } else {
        mapDiv(objCursos, $(this), limit)
    }
    return $(this)
}

function mapDiv(nArray, ts, limit){
    let hide = ''
    nArray.map((v, ix, array) => {
        const divCurso = `
                <div class="col-12 col-md-6 col-lg-3 mb-4" hide=${hide}>
                    <div class="produto" wm-category="${v.category}" hide=${hide}>
                        <a href="#/pages/curso.html?page=${v.id}" id="${v.id}" class="link">
                            <div class="info">
                                <div class="titulo">
                                    <h3>${v.title}</h3>
                                </div>
                                <div class="subtitulo">
                                    <h5>${v.subtitle}</h5>
                                </div>
                                <div class="nome-professor">
                                    <h6>com <span>${v.teachers_names}</span></h6>
                                </div>
                            </div>
                            <div class="banner-curso">
                                <img src="${v.banner}"
                                    alt="" class="img-fluid" />
                            </div>
                            <div class="buttonInfo">
                                VER TODO CONTEÚDO!
                            </div>
                        </a>
                    </div>
                </div>`
        if(ix < limit){
            ts.append(divCurso)
        }else{
            hide = 'true'
            ts.append(divCurso)
            $('[hide|=true]').addClass('d-none')
        }
        if(ix === array.length-1) {
            setTimeout(() => {$('.load-more').removeClass('fa-spin')}, 2000)
        }
    })
}

onLoadHtmlSuccess(function () {
    $('[wm-cursos]').cursosDiv(15)
    $('[wm-category-select]').categorySelect()
    marcarLinkComoSelecionado(location.hash)
    configurarLinks()
    jScroll()
    loadCurso()
})

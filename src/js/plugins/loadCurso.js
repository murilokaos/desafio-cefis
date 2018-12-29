import $ from 'jquery'
import { navegarViaAjax } from '../core/navigator'
import { loadUrl } from './loadCursos';

$('.link').click(function(){
    const url = this.href.split('#')
    navegarViaAjax(url[1], function () { 
        loadCurso()
    })
})

export function loadCurso() {
    const id = window.location.href.split('?page=')
    if(id[1] != undefined){
        $('[wm-curso]').cursoDiv(id[1])
    }
}

$.fn.cursoDiv = function (id) {
    const urlCurso = `https://cefis.com.br/api/v1/event/${id}?include=classes`
    new Promise((res, err) => {
        res(loadUrl(urlCurso))
    }).then(resp => {
        $('[wm-titulo]').html(`<i class="fa fa-book"></i> ${resp.data.title}`)
        const divCurso = `
                <div class="row">
                    <div class="col-12">
                        <div class="breadcrumb">
                            <a href="/" class="btn btn-default btn-secondary home"><i class="fa fa-home"></i></a>
                            <span title="${resp.data.category}" class="btn btn-default this-course">Curso da Área
                                ${resp.data.category}</span>
                            <span title="${resp.data.title}" class="btn btn-default this-course">${resp.data.title}</span>
                        </div>
                    </div>
                </div>
            <div class="row">
                <div class="col-12 col-lg-6 col-md-6 mb-4">
                    <div class="video">
                        <video controls title="Trailer do curso ${resp.data.id} - ${resp.data.title}">
                            <source src="${resp.data.video_promocional}">
                        </video>
                    </div>
                </div>
                <div class="col-12 col-lg-6 col-md-6 mb-4">
                    <div class="sobre-curso">
                        <div class="banner-curso mt-2">
                            <img src="${resp.data.banner}" alt="" class="img-fluid" />
                        </div>
                        <div class="titulo">
                            <h1>${resp.data.title}</h1>
                        </div>
                        <div class="nome-professor">
                            <h5><span>COM:</span> <b>${resp.data.teachers_names}</b></h5>
                        </div>
                        <div class="resume">
                            <!-- <p>Data: ${new Date(resp.data.data_gravacao).toLocaleDateString()}.</p>-->
                            <p>${resp.data.resume}</>
                        </div>
                    </div>
                </div>
            </div>`
        $(this).html(divCurso)
    })
}
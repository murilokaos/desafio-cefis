import $ from 'jquery'
import { navegarViaAjax } from '../core/navigator'
import { loadUrl } from './loadCursos';

export function loadCurso() {
    $('.link').click(function () {
        const url = this.href.split('#')
        console.log(this.href)
        const id = url[1].split('?page=')
        navegarViaAjax(url[1], function () { $('[wm-curso]').cursoDiv(id[1]) })
    })


}

$.fn.cursoDiv = function (id) {
    const urlCurso = `https://cefis.com.br/api/v1/event/${id}?include=classes`
    new Promise((res, err) => {
        res(loadUrl(urlCurso))
    }).then(resp => {
        const divCurso = `
        <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <div class="breadcrumb">
                            <a href="/" class="btn btn-default btn-secondary home"><i class="fa fa-home"></i></a>
                            <span title="${resp.data.category}" class="btn btn-default this-course">Curso da Área
                                ${resp.data.category}</span>
                            <span title="${resp.data.title}" class="btn btn-default this-course">${resp.data.title}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="container curso">
                    <div class="col-lg-6 col-md-6">
                        <div class="video">
                            <video width="640" height="360" controls title="Trailer do curso ${resp.data.id} - ${resp.data.title}">
                                <source src="${resp.data.video_promocional}" type="video/mp4">
                            </video>
                        </div>
                    </div>
                    <div class="sobre-curso col-lg-6 col-md-6">
                        <div class="data-curso mt-5">
                            <div class="banner-curso">
                                <img src="${resp.data.banner}" alt="" class="img-fluid" />
                            </div>
                            <div class="titulo">
                                <h1>${resp.data.title}</h1>
                            </div>
                            <div class="nome-professor">
                                <h5><span>COM:</span> <b>${resp.data.teachers_names}</b></h5>
                            </div>
                            <div class="resume">
                                <p>Data: ${new Date(resp.data.data_gravacao).toLocaleDateString()}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        $(this).html(divCurso)
    })
}
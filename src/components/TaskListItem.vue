<template>
    <div class="card mt-1 mb-1">
        <h5 class="card-header h5 p-1">
            <div class="row justify-content-between m-0">
                <div class="col-auto">{{ item.title }}</div>
                <div class="col-3 p-0 text-right">
                    <button type="button" class="btn btn-primary btn-sm mr-1">...</button>
                    <button type="button" class="btn btn-danger btn-sm mr-1">&times;</button>
                </div>
            </div>
            
        </h5>
        <div class="card-body pt-1">
            <div class="row">
                <div class="col-1"><div class="tag-green"></div></div>
                <div class="col-1"><div class="tag-yellow"></div></div>
                <div class="col-1"><div class="tag-red"></div></div>
            </div>
            <div class="p-1"></div>
            <p class="card-text text-left">With supporting text below as a natural lead-in to additional content.</p>
            <div class="row justify-content-right">
                <div class="col-2 p-0">
                    <figure class="m-0"><img src="https://media.licdn.com/dms/image/C4E03AQFBYTg5yAUuPA/profile-displayphoto-shrink_100_100/0?e=2159024400&v=beta&t=-3FToVy8-8T3jmVT9SFC7fPzTsP5CsH9e4CFEsNzp14" class="img-fluid" /></figure>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['item']
}
</script>
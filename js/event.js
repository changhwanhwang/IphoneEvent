$( function() {

    // background upload image
    $('input:radio[name="bg_img"]').on('change', function(){
        var bgVal = $('input:radio[name="bg_img"]:checked').val();
        
        if(bgVal.charAt(0) === '#') {
            $('.design_inner').css({'background-color': bgVal, 'background-image': ''});
        } else {
            $('.design_inner').css({'background-color': '', 'background-image': 'url('+ bgVal +')'});
        }
    });

    $("#imgUpload").on("change", function(event) {
        var file = event.target.files[0];
        var reader = new FileReader(); 
        reader.onload = function(e) {
            $('.design_inner').css({'background-color': '', 'background-image': 'url('+ e.target.result +')'});
        }
        reader.readAsDataURL(file);
    });

    // sticker img
    $('.icon_list button').on('click', function(){
        var stkImg = $(this).find('img').attr('src');

        stickerMake(stkImg);
    });

    // sticker text
    $('.txt_area textarea').on('click', function(){
        if($('.sticker.active').find('.text').length) {
            texSel();
        } else {
            stickerMake();
        }
    });

});


// design click open modal
$(document).ready(function() {
    $('.click').on('click', function() {
        $('.bg_img').toggleClass('on');
    });
});

$(document).ready(function() {
    $('.click').on('click', function() {
        $('.sticker_icons').toggleClass('on');
    });
});

$(".btn_close").click(function() {
    $("body").removeClass("fixed");
    $(".wrapper").removeClass("on");
});


function stickerMake(src) {

    selReset();

    var itemCount = $('.view_bg .sticker').length;
    itemCount = itemCount + 1;

    var itemId = itemCount.toString().length < 2 ? '0' + itemCount : itemCount;
    itemId = 'item_' + itemId;

    var itemHtml = '<div class="sticker active" id="'+ itemId +'"></div>';
    $('.view_bg').append(itemHtml);

    if(src) {
        $('#' + itemId).append('<img src="'+ src +'">');

        $('#' + itemId).resizable({
            aspectRatio: true,
            handles: "se",
        }).rotatable().draggable();
    } else {
        $('#' + itemId).append('<div class="text new"></div>');

        var fonSizVal = $('input:radio[name="font_size"]:checked').val();
        var fonColVal = $('input:radio[name="font_col"]:checked').val();
        $('#' + itemId).find('.text').css({'font-size':fonSizVal, 'color':fonColVal});

        $('#' + itemId).rotatable().draggable();
        
        texSel(itemId);
    }

    setTimeout(function() {
        var itemTop = ($('.view_bg').height() / 2) - ($('#' + itemId).height() / 2);
        var itemleft = ($('.view_bg').width() / 2) - ($('#' + itemId).width() / 2);
        $('#' + itemId).css({'left':itemleft, 'top':itemTop});
    }, 1);

    stickerSelect();

} // stickerMake()


function texSel(itemId) {

    $('input:radio[name="font_size"]').on('change', function(){
        var fonSizVal = $('input:radio[name="font_size"]:checked').val();

        $('.sticker.active').find('.text').css('font-size', fonSizVal);
    });

    $('input:radio[name="font_col"]').on('change', function(){
        var fonColVal = $('input:radio[name="font_col"]:checked').val();

        $('.sticker.active').find('.text').css('color', fonColVal);
    });

    $('.txt_area textarea').on('keyup', function(){
        var texVal = $(this).val();
        texVal = texVal.replaceAll("\n", "<br>");

        $('.sticker.active').find('.text').html(texVal);

        if($('.sticker.active').find('.text').hasClass('new')) {
            // console.log(st);
            var itemleft = ($('.view_bg').width() / 2) - ($('#' + itemId).width() / 2);
            $('.sticker.active').css({'left':itemleft});
        }
    });

} // texSel()


function stickerSelect() {

$('.sticker').on('click touchstart', function(){

    selReset();

    $(this).addClass('active');
    $('.view_bg').append($(this));

    if($(this).find('.text').length) {
        var texSel = $(this).find('.text').html();
        texSel = texSel.replaceAll("<br>", "\n");

        var texColVal = $(this).find('.text').css('color');
        texColVal = rgb2hex(texColVal);

        var texSizVal = $(this).find('.text').css('font-size');

        $('.txt_area textarea').val(texSel);
        $('input:radio[name="font_size"][value="'+ texSizVal +'"]').prop("checked", true);
        $('input:radio[name="font_col"][value="'+ texColVal +'"]').prop("checked", true);

        $('.sticker').find('.text').removeClass('new');
    }
});


$('.view_bg .design_inner').on('click', function(){
    selReset();
});
// $(document).on('click', function(e){
// 	if(!$(e.target).hasClass('sticker')) {
// 		selReset();
// 	}
// });

} // stickerSelect()


function selReset() {
    $('.sticker').removeClass('active');
    $('.txt_area textarea').val('');
    $('input:radio[name="font_size"]#fontSize02').prop("checked", true);
    $('input:radio[name="font_col"]#fontCol01').prop("checked", true);
} // selReset()


function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
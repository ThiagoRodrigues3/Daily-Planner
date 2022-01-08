$('#currentDay').text(moment().format('[Today\'s Date: ]dddd, MMMM Do, YYYY'));

$(function renderTextArea() {
    let timeBlockRows = $('.row');
    let currentTime = Number(moment().format('H'));

    timeBlockRows.each(function (i) {
        let rowText = $(this).children('textarea');
        let storedText = JSON.parse(localStorage.getItem('row ' + i))

        if (currentTime === $(this).data('time')) {
            $(this).children('textarea').addClass('present');
            $(this).prevAll().children('textarea').addClass('past');
            $(this).nextAll().children('textarea').addClass('future');
        }
        
        if (storedText === null) {
            return;
        }

        rowText.val(storedText);
    });

    if (currentTime < 9) {
        $('.container').find('textarea').addClass('future');

    } else if (currentTime > 17) {
        $('.container').find('textarea').addClass('past');
    }
});

$('.saveBtn').on('click', function () {
    let textArea = $(this).siblings('textarea').val();
    let rowIndex = $(this).parent().data('index');
    let textValue = textArea;

    localStorage.setItem('row ' + rowIndex, JSON.stringify(textValue));
})

$('.clearBtn').on('click', function () {
    localStorage.clear();
    location.reload();
})

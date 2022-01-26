// * This is Changing the text in the header in the p tag using Jquery as a selector and than using moment.js to inject the Day and time
$('#today').text(moment().format('[Today\'s Date: ]dddd, MMMM Do, YYYY'));

// * This function creates the rows and changes the color depending if it is nor present or past
$(function createTaskArea() {
    // * This selects the row and uses moment to format to just the hour for future use
    let timeRow = $('.row');
    let currentTime = Number(moment().format('H'));

    // * this function checks every time block and checks if any text is saved in local storage. It also uses a .each to run a for loop on ever timeRow
    timeRow.each(function (i) {
        let rowText = $(this).children('textarea');
        let storedText = JSON.parse(localStorage.getItem('row ' + i))

        // * This checks the time it currently is vs the time the block says
        if (currentTime === $(this).data('time')) {
            $(this).children('textarea').addClass('present');
            $(this).prevAll().children('textarea').addClass('past');
            $(this).nextAll().children('textarea').addClass('future');
        }

        // * This sets the value of the text are to whatever is save in local storage
        rowText.val(storedText);
    });

    // * This function is just resetting the colors at the end of the day/beginning of next day
    if (currentTime < 9) {
        $('.container').find('textarea').addClass('future');

    } else if (currentTime > 17) {
        $('.container').find('textarea').addClass('past');
    }
});

// * This event listener is listening in on the save buttons and committing to the values to local storage to be able to reload the info on webpage reload
$('.saveBtn').on('click', function () {
    let textArea = $(this).siblings('textarea').val();
    let rowIndex = $(this).parent().data('index');
    let textValue = textArea;

    localStorage.setItem('row ' + rowIndex, JSON.stringify(textValue));
})

// * This event listener is here to clear any and all tasks added and clear local storage 
$('.clearBtn').on('click', function () {
    localStorage.clear();
    location.reload();
})

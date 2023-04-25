$(document).ready(function () {

    // Get current date and load header//
    var now = moment().format("dddd, MMMM Do YYYY, h:mm a");
    document.getElementById("currentDay").textContent = (now);

    //other variables

    hour = moment().format("h:mm a");
    var hourVal = hour.split(':')[0]
    var ampm = (hour.split(':')[1]).split(' ')[1];
    console.log('hour ===', hour, hourVal, ampm);
    
    //create schedule array

    var timeblock = [
        {
            Hour: "7:00 am",
            tag: 7,
            toDo: ""
        },
        {
            Hour: "8:00 am",
            tag: 8,
            toDo: ""
        },
        {
            Hour: "9:00 am",
            tag: 9,
            toDo: ""
        },
        {
            Hour: "10:00 am",
            tag: 10,
            toDo: ""
        },
        {
            Hour: "11:00 am",
            tag: 11,
            toDo: ""
        },
        {
            Hour: "12:00 pm",
            tag: 12,
            toDo: ""
        },
        {
            Hour: "1:00 pm",
            tag: 1,
            toDo: ""
        },
        {
            Hour: "2:00 pm",
            tag: 2,
            toDo: ""
        },
        {
            Hour: "3:00 pm",
            tag: 3,
            toDo: ""
        },
        {
            Hour: "4:00 pm",
            tag: 4,
            toDo: ""
        },
        {
            Hour: "5:00 pm",
            tag: 5,
            toDo: ""
        },
        {
            Hour: "6:00 pm",
            tag: 6,
            toDo: ""
        }
    ]

    //store input
    console.log('timeblockData ===', localStorage.getItem('timeblockData'));
    if (localStorage.getItem('timeblockData')) {
        timeblock = JSON.parse(localStorage.getItem('timeblockData'))
    }

//create table, establish timecheck for color coding
    var htmlData = '<table class="table"><tbody>';
    for (let index = 0; index < timeblock.length; index++) {
        const element = timeblock[index];
        let hourCheck = '';
        var eleHourVal = element.Hour.split(':')[0]
        var eleAmpm = (element.Hour.split(':')[1]).split(' ')[1];
        
        if (hourVal == 12 && ampm == 'pm') {
            hourVal = 0;
        }

        if (eleHourVal == 12 && eleAmpm == 'pm') {
            eleHourVal = 0;
        }

        if (ampm == eleAmpm) {
            if (hourVal == eleHourVal) {
                console.log('same time');
                hourCheck = 'present';
            } else if (hourVal > eleHourVal) {
                console.log('past time');
                hourCheck = 'past'
            } else if (hourVal < eleHourVal) {
                console.log('future time');
                hourCheck = 'future'
            }
        } else if (ampm == 'am' && eleAmpm == 'pm') {
            hourCheck = 'future'
        } else if (ampm == 'pm' && eleAmpm == 'am') {
            hourCheck = 'past'
        }

        htmlData += '<tr width="20%" id="' + element.tag + '" ><td>' + element.Hour + '</td>' +
            '<td width="60%" class="todoInput ' + hourCheck + '">' + element.toDo + '</td>' +
            '<td width="20%"><button class="btn btn-info rows">save</button></td></tr>'
    }

    $("#table").html(htmlData)
//set up up button click to work on other element
    $("#table").delegate("tr td button.rows", "click", function() {
        console.log('save click ===', $(this).closest('tr').attr("id"));
        const id = $(this).closest('tr').attr("id");
        const textVal = $(`#text${id}`).val();
        console.log('text Val', textVal);
        if (textVal) {
            const idx = timeblock.findIndex(ele => ele.tag == id)
            timeblock[idx].toDo = textVal;
            localStorage.setItem('timeblockData', JSON.stringify(timeblock))
        } else {
            alert('input todo text!');
        }
    })

    $("#table").delegate("tr td.todoInput", "click", function() {
        console.log('input ===', $(this).closest('tr').attr("id"));
        const id = $(this).closest('tr').attr("id");
        if (!$(`#text${id}`).length) {
            $(this).append('<input type="text" id="text' + id + '">')
            $(`#text${id}`).focus();
        }
        
    })

})



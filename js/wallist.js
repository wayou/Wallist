//***************************************//
// No licence at present,feel free to play with
//Wayou 2013-7-15 21:31:26

//  status 0=under processing
// 	status 1=done


//generate id

function generateId() {
    //http://forumsblogswikis.com/2008/05/26/how-to-generate-a-unique-id-in-javascript/
    var newDate = new Date;
    return newDate.getTime();
}

//read data from json file

function readJsonEvents(jsonFile) {
    var data;
    $.ajaxSetup({
        async: false
    });
    $.get(jsonFile, function(events) {
        data = $.parseJSON(events);
    })
    return data;
}
// read data from HTML5 local storage
function readEvents() {
    if ('localStorage' in window && window['localStorage'] !== null) {
        window.localStorage.getItem("events");
    } else {
        alert('This browser does NOT support localStorage');
    }
}

//store data to local storeage

function storeEvents(eventsData) {
    var jsonString = JSON.stringify(eventsData)
    if ('localStorage' in window && window['localStorage'] !== null) {
        localStorage.setItem("events", jsonString);
    } else {
        alert('This browser does NOT support localStorage');
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeById(id) {
    //dont really remove but set the status from 0 to 1 so we can see them in history page
    if (events == null) {
        return
    };
    var targetEvent;
    $.each(events, function(i, item) {
        if (item.id == id) {
            item.status = 1;
            item.dateDone = (new Date).toLocaleString();
            storeEvents(events);
            $("#" + id).remove();
            console.log("delete success");
            return;
        }
    })
}

function getEventItemById(id){
    var events = $.parseJSON(localStorage.getItem("events"));
    var targetItem = {};
       $.each(events, function(i, item) {
        if (item.id == id) {
 targetItem=item;
        }
})
       return targetItem;
}
 

function storePosition(eventItem,x,y) {
     
    if (localStorage.getItem("events") == "undefined") return;
      var events = $.parseJSON(localStorage.getItem("events"));
       $.each(events, function(i, item) {
        if (item.id == eventItem.id) {
            item.x = x;
            item.y = y;
            storeEvents(events);
            console.log("position stored");
            return;
        }
    })
}   

function displayEvents(eventItem) {
    var px;
    var py;
    var eventDom;
    if (eventItem.status == 1) {
        return;
    }; //only display events with status 0
    //  create draggable item on the page for each event based on the importance
    switch (eventItem.importance) {
        case "0":
if (eventItem.x==-1) {
     $("#0").offset();
            px = getRandomInt($("#0").offset().left, $("#0").offset().left + $("#0").width() - 100);
            py = getRandomInt($("#0").offset().top, $("#0").offset().top + $("#0").height() - 100) + 10;
            storePosition(eventItem,px,py);
}else{
     px = eventItem.x;
            py = eventItem.y;
}
           
            eventDom = "<div class='event' id='" + eventItem.id + "' title='" + eventItem.detail + "' style='position:absolute;left:" + px + "px;top:" + py + "px;'>" + eventItem.subject + "<div class='deleteEvent'>X</div>" + "</div>";
            $("#0").append(eventDom);
            break;
        case "1":
        if (eventItem.x==-1) {
            px = getRandomInt($("#1").offset().left, $("#1").offset().left + $("#1").width() - 100);
            py = getRandomInt($("#1").offset().top, $("#1").offset().top + $("#1").height() - 100) + 10;
            storePosition(eventItem,px,py);
        }else{
     px = eventItem.x;
            py = eventItem.y;
}
            
            eventDom = "<div class='event' id='" + eventItem.id + "'title='" + eventItem.detail + "'  style='position:absolute;left:" + px + "px;top:" + py + "px;'>" + eventItem.subject + "<div class='deleteEvent'>X</div>" + "</div>";
            $("#1").append(eventDom);
            break;
        case "2":
         if (eventItem.x==-1) {
           px = getRandomInt($("#2").offset().left, $("#2").offset().left + $("#2").width() - 100);
            py = getRandomInt($("#2").offset().top, $("#2").offset().top + $("#2").height() - 100) + 10;
            storePosition(eventItem,px,py);
        }else{
     px = eventItem.x;
            py = eventItem.y;
}
           
            eventDom = "<div class='event' id='" + eventItem.id + "'title='" + eventItem.detail + "'  style='position:absolute;left:" + px + "px;top:" + py + "px;'>" + eventItem.subject + "<div class='deleteEvent'>X</div>" + "</div>";
            $("#2").append(eventDom);
            break;
        case "3":
          if (eventItem.x==-1) {
            px = getRandomInt($("#3").offset().left, $("#3").offset().left + $("#3").width() - 100);
            py = getRandomInt($("#3").offset().top, $("#3").offset().top + $("#3").height() - 100) + 10;
            storePosition(eventItem,px,py);
        }else{
     px = eventItem.x;
            py = eventItem.y;
}
          
            eventDom = "<div class='event' id='" + eventItem.id + "' title='" + eventItem.detail + "' style='position:absolute;left:" + px + "px;top:" + py + "px;'>" + eventItem.subject + "<div class='deleteEvent'>X</div>" + "</div>";
            $("#3").append(eventDom);
            break;
        default:
            console.log("Error happened while rendering events");
    }

};
var events = null;
//application start
$(function() {
    //append the arrows to the main page

    //   var topOfArrowX= $("#1").offset().top+$("#1").height();
    // var leftOfArrowX= $("#1").offset().left;
    // var widthOfArrowX=$("#1").width()*2+10;

    // var topOfArrowY= $("#1").offset().top;
    // var leftOfArrowY=$("#1").offset().left+ $("#1").width();
    // var heightOfArrowY=$("#1").height()*2+12
    // $('body').append("<img id='arrow-x' src='style/img/arrow-x.png' style='position:absolute;top:"+topOfArrowX+"px;left:"+leftOfArrowX+"px;width:"+widthOfArrowX+"px;'>");
    // $('body').append("<img id='arrow-y' src='style/img/arrow-y.png' style='position:absolute;top:"+topOfArrowY+"px;left:"+leftOfArrowY+"px;height:"+heightOfArrowY+"px!important;'>");
    $("#0").append("<span id='ylabel' style='position:absolute;color:#DDD;font-size:2em;padding-left:15px;'>Important</span>");
    $("#0").append("<span id='xlabel' style='position:absolute;color:#DDD;font-size:2em;padding-left:15px;top:" + ($("#1").height() + 20) + "px;right:30px;'>Urgent</span>");
    $("#1").append("<img id='arrow-y-l' src='style/img/arrow-y-l.png' style='float:right;'/>");
    $("#0").append("<img id='arrow-y-r' src='style/img/arrow-y-r.png' style='float:left;'/>");
    //$("#0").append("<img id='arrow-x-u' src='style/img/arrow-x-u.png' style='position:absolute;right:0;bottom:0;'/>").css('position','relative');
    $("#3").append("<img id='arrow-x-d' src='style/img/arrow-x-d.png' style='float:right;'/>");
    $("#0").append("<img id='arrow-x-u' src='style/img/arrow-x-u.png' style='z-index:222;margin-top:257px;float:right;'/>");

    // window.onresize = function(event) {
    //     var topOfArrowX= $("#1").offset().top+$("#1").height()-$("#arrow-x").height()/2;
    // var leftOfArrowX= $("#1").offset().left;
    // var widthOfArrowX=$("#1").width()*2+10;

    // var topOfArrowY= $("#1").offset().top;
    // var leftOfArrowY= $("#1").offset().left+$("#1").width()-$("#arrow-y").width()/2;
    // var heightOfArrowY=$("#1").height()*2+12;
    // $("#arrow-x").offset({top:topOfArrowX,left:leftOfArrowX}).css('width',widthOfArrowX+'px');
    // $("#arrow-y").offset({top:topOfArrowY,left:leftOfArrowY});
    // }

    // create event
    $("#createWindow").dialog();
    $("#confirmDel").dialog({
        autoOpen: false
    });

    // var sampleData=readJsonEvents("data/data.json");
    // storeEvents(sampleData);
    if (localStorage.getItem("events") == "undefined") {
        events = [];
    } else {
        events = $.parseJSON(localStorage.getItem("events"));
    };

    //initial application, read existing events into the page
    if (events !== null) {
        for (var i = events.length - 1; i >= 0; i--) {
            displayEvents(events[i]);
        }
    } else {
        events = [];
    };


    //bind event handler to create btn
    $("#create").button().click(function(e) {
        if (events == null) {
            events = [];
        };
        var suject = $("#subject-create");
        suject.change(function(e) {
            if ($.trim(suject.val()) !== "") {
                suject.removeClass("ui-state-error");
            };
        })
        var importance = $("#importance-create");
        var detail = $("#detail-create");
        $('#CreateWin').dialog({
            width: 360,
            modal: true,
            resizable: false,
            buttons: [{
                text: "Ok",
                click: function() {
                    //the subject field is required
                    if ($.trim(suject.val()) == "") {
                        suject.addClass("ui-state-error");
                        return;
                    };
                    //json items CRUD
                    //http://stackoverflow.com/questions/4538269/adding-removing-items-from-json-data-with-jquery

                    var newAddedEventItem = {};
                    newAddedEventItem.id = generateId();
                    newAddedEventItem.subject = suject.val();
                    newAddedEventItem.importance = importance.val();
                    newAddedEventItem.detail = detail.val();
                    newAddedEventItem.dateCreate = (new Date).toLocaleString();
                    newAddedEventItem.dateDone = "";
                    newAddedEventItem.status = "0";
                    newAddedEventItem.x =-1;
                    newAddedEventItem.y = -1;
                    // events.push({
                    //     id: eventId, subject: eventSubject, importance: eventImportance, detail: eventDetail,
                    //     dateCreate: eventDateCreate, dateDone: eventDateDone, status: eventStatus
                    // })
                    events.push(newAddedEventItem);
                    storeEvents(events);
                    // save the new event
                    $(this).dialog("close");

                    //display the new added item to the page
                    displayEvents(newAddedEventItem);

                    $("#"+newAddedEventItem.id).draggable({
                        containment: $("#main"),
                        start: function(event, ui) {
                            $(".event").removeClass("top");
                            // $(this).addClass("selected top").siblings().removeClass("top");
                            $(this).addClass("selected top").siblings().removeClass("top");
                        },
                        stop: function(event, ui) {
                            $(this).removeClass("selected");
                            var item= getEventItemById(newAddedEventItem.id);
                            
                            storePosition(item,$(this).offset().left,$(this).offset().top);
                        }
                    });
                    $("#"+newAddedEventItem.id).hover(function(e) {
                        console.log($(".event").length);
                        $(this).find(".deleteEvent").stop().fadeIn();
                    }, function(e) {
                        $(this).find(".deleteEvent").stop().fadeOut();
                    });

                    $("#"+newAddedEventItem.id+" .deleteEvent").click(function(e) {
                        var eventId = $(this).parent().attr("id");

                        $('#confirmDel').dialog({
                            modal: true,
                            resizable: false,
                            buttons: [{
                                text: "Ok",
                                click: function() {
                                    removeById(eventId);
                                    $(this).dialog("close");
                                    // location.reload();
                                }
                            }, {
                                text: "Cancel",
                                click: function() {
                                    $(this).dialog("close");
                                }
                            }],
                            open: function(event, ui) {
                                $(this).parent().find('button')[2].focus();
                            }
                        }).dialog("open");
                    });


                    //location.reload();//not using the page refreshing way to acchieve that
                }
            }, {
                text: "Cancel",
                click: function() {
                    $(this).dialog("close");
                }
            }],
            close: function() {
                //clear all value before close
                suject.val("").removeClass("ui-state-error");
                importance.val(0);
                detail.val("");
            }
        }).dialog("open");
    });

    $(".deleteEvent").click(function(e) {
        var eventId = $(this).parent().attr("id");

        $('#confirmDel').dialog({
            modal: true,
            resizable: false,
            buttons: [{
                text: "Ok",
                click: function() {
                    removeById(eventId);
                    $(this).dialog("close");
                    // location.reload();

                }
            }, {
                text: "Cancel",
                click: function() {
                    $(this).dialog("close");
                }
            }],
            open: function(event, ui) {
                $(this).parent().find('button')[2].focus();
            }
        }).dialog("open");
    });

    $(".navBtn").button().click(function(e) {
        window.location.href = $(this).find("a").attr("href");
    });


    //handle the drag drop and add the close cross to every event item

    $(".event").draggable({
        containment: $("#main"),
        start: function(event, ui) {
            $(".event").removeClass("top");
            // $(this).addClass("selected top").siblings().removeClass("top");
            $(this).addClass("selected top").siblings().removeClass("top");
        },
        stop: function(event, ui) {
            $(this).removeClass("selected");
             var item= getEventItemById($(this).attr('id'));
             storePosition(item,$(this).offset().left,$(this).offset().top);
        }
    });
    $(".section").droppable({
        over: function(event, ui) {
            $(this).addClass("dragIn");
        },
        out: function(event, ui) {
            $(this).removeClass("dragIn");
        },
        drop: function(event, ui) {
            $(this).removeClass("dragIn");
            var id = $(this).attr("id");
            var eventId = ui.draggable.attr("id");
            $.each(events, function(i, item) {
                if (item.id == eventId) {
                    item.importance = id;
                    storeEvents(events);
                };

            })
        }
    });

    $(".event").hover(function(e) {
        $(this).find(".deleteEvent").stop().fadeIn();
    }, function(e) {
        $(this).find(".deleteEvent").stop().fadeOut();
    });

});
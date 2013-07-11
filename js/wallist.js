// importance:
// 	il=important longuid
// 	iu=important urgent
// 	ul=unimportant longuid
//  status 0=under processing
// 	status 1=done


//generate id
function generateId() {
    //http://forumsblogswikis.com/2008/05/26/how-to-generate-a-unique-id-in-javascript/
    var newDate = new Date;
    return newDate.getTime();
}

//read data from json file
function readJsonEvents (jsonFile) {
    var data;
     $.ajaxSetup({ async: false });
    $.get(jsonFile,function(events){
        data=$.parseJSON(events);
    })
        return data;
}
// read data from HTML5 local storage
function readEvents(){
    if('localStorage' in window && window['localStorage'] !== null){
        window.localStorage.getItem("events");
}else{
 alert('This browser does NOT support localStorage');
}
}

//store data to local storeage
function storeEvents(jsonString){
    if('localStorage' in window && window['localStorage'] !== null){
       localStorage.setItem("events",jsonString);
}else{
 alert('This browser does NOT support localStorage');
}
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//application start
$(function() {
     // create event
    $("#createWindow").dialog();
    $("#confirmDel").dialog({autoOpen:false});

    // var sampleData=readJsonEvents("data/data.json");
    // storeEvents(JSON.stringify(sampleData));

    var events=$.parseJSON(localStorage.getItem("events"));

//initial application, read existing events into the page
if (events!==null) {
    for (var i = events.length - 1; i >= 0; i--) {
    var px;
    var py;
    var eventDom;
  //  create draggable item on the page for each event based on the importance
  switch(events[i].importance){
    case "0":
    $("#0").offset();
      px=getRandomInt($("#0").offset().left,$("#0").offset().left+$("#0").width()-100);
     py=getRandomInt($("#0").offset().top,$("#0").offset().top+$("#0").height()-100)+10;
     eventDom="<div class='event' id='"+events[i].id+"' style='position:absolute;left:"+px+"px;top:"+py+"px;'>"
    +events[i].importance+"<div class='deleteEvent'>X</div>"+"</div>";
    $("#0").append(eventDom);
    break;
     case "1":
       px=getRandomInt($("#1").offset().left,$("#1").offset().left+$("#1").width()-100);
     py=getRandomInt($("#1").offset().top,$("#1").offset().top+$("#1").height()-100)+10;
     eventDom="<div class='event' id='"+events[i].id+"' style='position:absolute;left:"+px+"px;top:"+py+"px;'>"
    +events[i].importance+"<div class='deleteEvent'>X</div>"+"</div>";
    $("#1").append(eventDom);
    break;
     case "2":
       px=getRandomInt($("#2").offset().left,$("#2").offset().left+$("#2").width()-100);
     py=getRandomInt($("#2").offset().top,$("#2").offset().top+$("#2").height()-100)+10;
     eventDom="<div class='event' id='"+events[i].id+"' style='position:absolute;left:"+px+"px;top:"+py+"px;'>"
    +events[i].importance+"<div class='deleteEvent'>X</div>"+"</div>";
    $("#2").append(eventDom);
    break;
     case "3":
       px=getRandomInt($("#3").offset().left,$("#3").offset().left+$("#3").width()-100);
     py=getRandomInt($("#3").offset().top,$("#3").offset().top+$("#3").height()-100)+10;
     eventDom="<div class='event' id='"+events[i].id+"' style='position:absolute;left:"+px+"px;top:"+py+"px;'>"
    +events[i].importance+"<div class='deleteEvent'>X</div>"+"</div>";
    $("#3").append(eventDom);
    break;
    default:
    console.log("Error happened while rendering events");
  }

};
}else{
    events=[];
};


$( "#create" ).button().click(function( e ) {
    var suject=$("#subject-create");
    suject.change(function(e){
         if ($.trim(suject.val())!=="") {
                    suject.removeClass("ui-state-error");
                };
    })
    var importance=$("#importance-create");
    var detail=$("#detail-create");
    $('#CreateWin').dialog({
            width:360,
            modal: true,
            buttons: [ { text: "Ok", click: function() {
                //the subject field is required
                if ($.trim(suject.val())=="") {
                    suject.addClass("ui-state-error");
                    return;
                };
                //json items CRUD
                //http://stackoverflow.com/questions/4538269/adding-removing-items-from-json-data-with-jquery
                var eventId=generateId();
                var eventSubject=suject.val();
                var eventImportance=importance.val();
                var eventDetail=detail.val();
                var eventDateCreate=new Date();
                var eventDateDone="";
                var eventStatus="0";
                events.push({id:eventId,subject:eventSubject,importance:eventImportance,detail:eventDetail,
                    dateCreate:eventDateCreate,dateDone:eventDateDone,status:eventStatus
                })
                storeEvents(JSON.stringify(events));


                // save the new event
             $( this ).dialog( "close" ); 
             location.reload();
         }},
            { text: "CANCEL", click: function() { $( this ).dialog( "close" ); }}] ,
             close: function() {
                //clear all value before close
                suject.val("").removeClass("ui-state-error");
                importance.val(0);
                detail.val("");
            }
          }).dialog("open");
      });   

$( ".deleteEvent" ).click(function( e ) {
         $('#confirmDel').dialog({
            modal: true,
            buttons: [ { text: "Ok", click: function() { $( this ).dialog( "close" ); }},
            { text: "CANCEL", click: function() { $( this ).dialog( "close" ); }}] 
          }).dialog("open");
      });   

$(".navBtn").button();
  
	$(".event").draggable({
        containment:$(".eventsTable"),
		start: function(event, ui) {
           $(this).addClass("selected top").siblings().removeClass("top");
		},
        stop:function(event,ui){
           $(this).removeClass("selected");
        }
	});
	$(".section").droppable({
		drop: function(event, ui) {
			console.log("dropped!")
		}
	});

$(".event").hover(function(e){
    $(this).find(".deleteEvent").fadeIn();
},function(e){
    $(this).find(".deleteEvent").fadeOut();
});
$(".deleteEvent").on('click',function(e){
//delete current item
});

});
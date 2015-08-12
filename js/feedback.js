// javascript

$(document).ready(function() {
  //alert("document ready occurred!");

  $('#myDropdown').ddslick({
        data:ddData,
        width:115,
        selectText: "Select your preferred social network",
        imagePosition:"left",
        onSelected: function(selectedData){
            //callback function: do something with selectedData;
        }   
  });
  $('textarea').autosize();
  $(".cmt-details").mouseenter(function(){
    $("#edit-comment").fadeIn();
    $("#delete-comment").fadeIn();
  });
  $(".cmt-details").mouseleave(function(){
    $("#edit-comment").fadeOut();
    $("#delete-comment").fadeOut();
  });
  $("#delete-comment").click(function(){
    //$(".commented-box").slideUp();
    $(".commented-box").animate({ height: 0, opacity: 0 }, 350);  
  });


  var approved = false;
  $("#approve-button").click(function(){

    $(this).empty();
    if (approved){
      $(this).html("approve");
      approved = false;
    }
    else{
      var str = "approved";
      var icon = '<li class="icon-ok"></li>' + str;
      $(this).append(icon);
      approved = true;
    }
    
 });
  $( ".arrow-to-left" ).click(function() {
      $( ".left-container" ).toggleClass( "left-container-hide", 300 );
      $( ".arrow-to-left" ).toggleClass( "arrow-to-right");
  });
  $(".thumb").click(function(e){
      $(".thumb").removeClass("active-thumb");
      $(e.target).addClass("active-thumb");
  });
  $(".mode").click(function(){
      $(".mode .arrow-up").hide();
      $(this).find(".arrow-up").show();
  });
  $('#cssmenu > ul > li ul').each(function(index, element){
    var count = $(element).find('li').length;
    var content = '<span class="cnt">' + count + '</span>';
    $(element).closest('li').children('a').append(content);
  });
  $('#cssmenu ul ul li:odd').addClass('even');
  $('#cssmenu ul ul li:even').addClass('even');

  //click event 

  $('#cssmenu > ul > li > a').click(function() {

  var checkElement = $(this).next();

  $('#cssmenu li').removeClass('active');
  $(this).closest('li').addClass('active'); 

  if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
    $(this).closest('li').removeClass('active');
    checkElement.slideUp('normal');
  }
  if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
    $('#cssmenu ul ul:visible').slideUp('normal');
    checkElement.slideDown('normal');
  }

  if($(this).closest('li').find('ul').children().length == 0) {
    return true;
  } else {
    return false; 
  }

});
       
});
//Dropdown plugin data
var ddData = [
    {
        text: "FEEDBACK",
        value: 1,
        selected: false,
        /*description: "Description with Facebook",
        imageSrc: "http://dl.dropbox.com/u/40036711/Images/facebook-icon-32.png"*/
    },
    {
        text: "suggession",
        value: 2,
        selected: false,
        /*description: "Description with Twitter",
        imageSrc: "http://dl.dropbox.com/u/40036711/Images/twitter-icon-32.png"*/
    },
    {
        text: "dev note",
        value: 3,
        selected: true
        /*description: "Description with LinkedIn",
        imageSrc: "http://dl.dropbox.com/u/40036711/Images/linkedin-icon-32.png"*/
    }
    
];

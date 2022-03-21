window.onload = () => {
  $("#sendbutton").click(() => {
    imagebox = $("#imagebox");
    videobox = $("#videobox");
    $("#loading").attr("src","https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif");
    $("#loading").css("visibility", "visible");
    link = $("#link");
    input = $("#imageinput")[0];
    if (input.files && input.files[0]) {
      let formData = new FormData();
      formData.append("video", input.files[0]);
      $.ajax({
        url: "/detect", // fix this to your liking
        type: "POST",
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        error: function (data) {
          console.log("upload error", data);
          console.log(data.getAllResponseHeaders());
        },
        success: function (data) {
          console.log(data);
          // bytestring = data["status"];
          // image = bytestring.split("'")[1];
          $("#link").css("visibility", "visible");
          $("#download").attr("href", "static/" + data);
          $("#loading").attr("src","../static/check mark.png");
          videobox.attr("src","static/" + data);
          imagebox.attr("src","static/" + data);     
          console.log(data);
        },
      });
    }
  });
  $("#webcambutton").click(() => {
    imagebox = $("#videobox");
    link = $("#link");
    //input = $("#imageinput")[0];
    //if (input.files && input.files[0]) {
      //let formData = new FormData();
      //formData.append("video", input.files[0]);
      $.ajax({
        url: "/detectwebcam", // fix this to your liking
        type: "POST",
        //data: formData,
        cache: false,
        processData: false,
        contentType: false,
        error: function (data) {
          console.log("upload error", data);
          console.log(data.getAllResponseHeaders());
        },
        success: function (data) {
          console.log(data);
          // bytestring = data["status"];
          // image = bytestring.split("'")[1];
          $("#link").css("visibility", "hidden");
          console.log(data);
        },
      });
    //}
  });
};
var fileTypes = ['m4v', 'mp4']; 
var isSuccess;
function readUrl(input) {
  if (input.files && input.files[0]) {
    $("#loading").css("visibility", "hidden");
    $("#link").css("visibility", "hidden");
    var extension = input.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
    isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
      if (isSuccess) { //yes
        let reader = new FileReader();
        reader.onload = function (e) {
          imagebox = $("#imagebox");
          videobox = $("#videobox");
          console.log(videobox);
          console.log("evoked readUrl");
          console.log(e.target);
          imagebox.height(0);
          imagebox.width(0);
          $("#imagebox").css("visibility", "hidden");
          $("#videobox").css("visibility", "visible");
          videobox.attr("src",e.target.result);
          videobox.height(500);
          videobox.width(800);
        };
        reader.readAsDataURL(input.files[0]);
      }

    else {
      let reader = new FileReader();
        reader.onload = function (e) {
          imagebox = $("#imagebox");
          videobox = $("#videobox");
          console.log(imagebox);
          console.log("evoked readUrl");
          console.log(e.target);
          imagebox.attr("src",e.target.result);
          imagebox.height(500);
          imagebox.width(800);
          videobox.height(0);
          videobox.width(0);
          $("#imagebox").css("visibility", "visible");
          $("#videobox").css("visibility", "hidden");
        };
        reader.readAsDataURL(input.files[0]);
    }
  }
}

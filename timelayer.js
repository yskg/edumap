

//加载时间图层
var time_info;
var time_layer = new Array();
var time_url = new Array();
 time_url[0] = null;//985时间图层
 time_url[1] = null;//211时间图层
 time_url[2] = null;//本科时间图层
 time_url[3] = null;//专科时间图层
require([
  "esri/toolbars/draw",
  "esri/symbols/SimpleFillSymbol",
  "esri/InfoTemplate",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/TimeExtent",
  "esri/dijit/TimeSlider",
  "dojo/_base/array"], function (Draw, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Color, Graphic, InfoTemplate,
    ArcGISDynamicMapServiceLayer, TimeExtent, TimeSlider, arrayUtils)
{
    var timeSlider;
    time_info = function () {
        var popupTemplate = new InfoTemplate("${学校名称}", "校区:${校区}<br/>地理位置:${地理位置}<br/>办学类型:${办学层次}<br/>联系电话:${联系电话}<br/>网址:${网址}<br/>");
        for (i =3; i>= 0; i--) {
            time_layer[i] = new ArcGISDynamicMapServiceLayer(time_url[i]);
            time_layer[i].setInfoTemplates({
                0: { infoTemplate: popupTemplate }
            });
            map.addLayer(time_layer[i]);//时间控制图层
            time_layer[i].hide();
        }
        timeSlider = new TimeSlider({
            style: "width: 100%;"
        },dojo.byId("time_slider"));
        map.setTimeSlider(timeSlider);
        // timeSlider.play();//开始播放
        //timeSlider.loop = true;//循环播放
      
        timeSlider.setThumbMovingRate(1000);//播放速度
        timeSlider.startup();
        var labels = arrayUtils.map(timeSlider.timeStops, function (timeStop, i) {
            if (i %1 === 0) {//数字除以几下标时间间隔就是几
                return timeStop.getUTCFullYear();
            } else {
                return "";
            }
        });
        timeSlider.setLabels(labels);//用来设置时间轴下的时间数字
        timeSlider.on("time-extent-change", function (evt) {
            myevent = evt;
            var endValString = evt.endTime.getUTCFullYear();
            dojo.byId("date_range").innerHTML = "<i>" + endValString + "年<\/i>";
        });
    }
})

//打开时间轴
var time_line = true;
function turn_timecontrol() {
    if (time_line) {
       
        time_line = false;
    }
    else {
        document.getElementById("time_control").style.visibility = "hidden";
        document.getElementById("time_info").style.visibility = "hidden";
        time_line = true;
    }
}
function close_timecontrol() {
    document.getElementById("time_control").style.visibility = "hidden";

}
function close_timeline() {
    document.getElementById("time_info").style.visibility = "hidden";
    map.infoWindow.hide();
    for (i = 0; i < time_layer.length; i++) {
        time_layer[i].hide();
    }
    document.getElementById("time_985").checked = false;
    document.getElementById("time_211").checked = false;
    document.getElementById("time_bk").checked = false;
    document.getElementById("time_zk").checked = false;
    //timeSlider.destroy();摧毁小部件
}
function timeline_control(para) {
    switch (para) {
        case "time_985":
            if (dojo.byId(para).checked) {
                time_layer[0].show();
                document.getElementById("time_info").style.visibility = "visible";
            }
   
        case "time_bk":
            if (dojo.byId(para).checked) {
                time_layer[2].show();
                document.getElementById("time_info").style.visibility = "visible";
            }
            else time_layer[2].hide();
            break;
        case "time_zk":
            if (dojo.byId(para).checked) {
                time_layer[3].show();
                document.getElementById("time_info").style.visibility = "visible";
            }
            else time_layer[3].hide();
            break;
    }

}
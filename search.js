
var search_execute, clear_search, position_Feature;
var search_symbol;
var search_url,search_field;
var search_layerid = new Array();

var table_execute;//用于高亮选择当前表格行数据

//根据输入的关键字进行findTask操作
require([
    "esri/tasks/FindTask",
    "esri/tasks/FindParameters",
   "esri/symbols/PictureMarkerSymbol",
   "esri/geometry/Point",
   "esri/InfoTemplate"
], function (FindTask, FindParameters, PictureMarkerSymbol, Point, InfoTemplate)
{
       search_execute=function (searchtext) {
        map.infoWindow.hide();
        //初始化查询
        var findTask = new FindTask(search_url);
        search_symbol = new PictureMarkerSymbol('school_image/location.png', 20, 20);
        //new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([0, 255, 0, 0.25]));
        findParams.searchText =searchtext;
        findTask.execute(findParams, search_Results);
    }

    function search_Results(results) {
        map.graphics.clear();
        var innerHtml = "";
        var symbol = search_symbol;
        for (var i = 0; i < results.length; i++) {
            var curFeature = results[i];
            var graphic = curFeature.feature;
            graphic.setSymbol(symbol);
        
            map.graphics.add(graphic);
            innerHtml += "<img src='school_image/location.png'/><a class='itemname' href='javascript:position_Feature(" + graphic.attributes.FID + ")'>" + graphic.attributes.学校名称 + "</a><br>" +"<span class='itemaddress'>"+ graphic.attributes.校区+"</span>" + "<br/>";
        }
        document.getElementById("search_results").style.display = "block";
        dojo.byId("search_items").innerHTML = innerHtml;
    }

    position_Feature =function(id) {
        var sGrapphic;
        //遍历地图的图形查找FID和点击行的FID相同的图形
        for (var i = 0; i < map.graphics.graphics.length; i++) {
            var cGrapphic = map.graphics.graphics[i];
            if ((cGrapphic.attributes) && cGrapphic.attributes.FID == id) {
                sGrapphic = cGrapphic;
                break;
            }
        }
        var sGeometry = sGrapphic.geometry;
        // 当点击的名称对应的图形为点类型时进行地图中心定位显示
        map.centerAndZoom(sGeometry,12);
     //  var  screenPoint= map.toScreen(sGeometry);  //p是一个对象包括了.x/.y获得投影坐标
        var iw = map.infoWindow;
     
    }
    clear_search =function() {
        map.graphics.clear();
        map.infoWindow.hide();
        document.getElementById("search_results").style.display = "none";
    }

    table_execute = function (searchtext) {
        map.infoWindow.hide();
        //初始化查询
        var findTask = new FindTask(search_url);
        findParams = new FindParameters();
      
        findParams.contains = false;//严格匹配输入的字段
        search_symbol = new PictureMarkerSymbol('school_image/table_search.gif', 20, 20);
        //new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([0, 255, 0, 0.25]));
        findTask.execute(findParams, search_Results1);
    }

    function search_Results1(results) {
        map.graphics.clear();
        var symbol = search_symbol;
        for (var i = 0; i < results.length; i++) {
            var curFeature = results[i];
           
            infoTemplate.setContent("校区:${校区}<br/>学校地址:${地理位置}<br/>学校类型:${办学层次}<br/>联系电话:${联系电话}<br/>网址:${校园门户网}<br/>");
            graphic.setInfoTemplate(infoTemplate);
            map.graphics.add(graphic);
        }
    }

})
var draw = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// tar.topDom.append(draw);
document.body.append(draw);
draw.style.width = "690px"
draw.style.height = "130px"
    // $(draw).css({ "width": "690px", "height": "130px" });
    // var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    // draw.appendChild(defs);
    // defs.appendChild(getSvgMarker("arrow1", "#7D7D7D")); //正常颜色
    // defs.appendChild(getSvgMarker("arrow2","#00CC8B"));//经过颜色


var json = {
    "start": { "state": "1", "x": 20, "y": 65, "r": 10, "M": 30, "L": 60, "name": "start" },
    "project": { "state": "1", "x": 60, "y": 50, "rx": 8, "ry": 8, "height": 30, "width": 70, "M": 130, "L": 165, "name": "新建项目" },
    "slave": { "state": "0", "x": 165, "y": 30, "rx": 8, "ry": 8, "height": 30, "width": 70, "M": 235, "L": 270, "name": "设备登记" },
    "pile": { "state": "0", "x": 165, "y": 80, "rx": 8, "ry": 8, "height": 30, "width": 70, "M": 235, "L": 270, "name": "桩位" },
    "task": { "state": "0", "x": 270, "y": 50, "rx": 8, "ry": 8, "height": 30, "width": 70, "M": 340, "L": 370, "name": "新建任务单" },
    "calValue": { "state": "0", "x": 370, "y": 50, "rx": 8, "ry": 8, "height": 30, "width": 70, "M": 440, "L": 470, "name": "标定" },
    "perfusion": { "state": "0", "x": 470, "y": 50, "rx": 8, "ry": 8, "height": 30, "width": 70, "M": 540, "L": 565, "name": "结束灌注" },
    "export": { "state": "0", "x": 565, "y": 50, "rx": 8, "ry": 8, "height": 30, "width": 80, "M": 645, "L": 670, "name": " 确认工作报告" },
    "end": { "state": "0", "x": 680, "y": 65, "r": 10, "M": 30, "L": 60, "name": "end" }
}

function createNode(k, v) {
    var node;
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    g.setAttribute("type", k);
    if (k == "start" || k == "end") {
        node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        node.setAttribute("cx", v.x); //圆点y坐标
        node.setAttribute("cy", v.y); //圆点x坐标
        node.setAttribute("r", v.r); //圆半径
        text.setAttribute("x", v.x);
        text.setAttribute("y", v.y - v.r);
        // if(v.state=="0"){
        text.setAttribute("fill", "#FB923F");
        // }else{
        //     text.setAttribute("fill","#00CC8B");
        // }
    } else {
        node = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        node.setAttribute("x", v.x); //矩形的左侧位置
        node.setAttribute("y", v.y); //矩形的顶部位置
        node.setAttribute("rx", v.rx); //圆角
        node.setAttribute("ry", v.ry); //圆角
        node.setAttribute("height", v.height); //矩形的高度
        node.setAttribute("width", v.width); //矩形的宽度
        text.setAttribute("x", v.x + v.width / 2);
        text.setAttribute("y", v.y + 20);
        text.setAttribute("fill", "white");
    }
    node.setAttribute("id", k);

    // if(v.state=="0"){
    node.setAttribute("fill", "#FB923F"); //0表示未通过矩形的填充颜色为黄
    // }else{
    //     node.setAttribute("fill","#00CC8B");//1表示通过矩形的填充颜色为黄
    // }
    text.setAttribute("text-anchor", "middle");
    text.style.fontSize = "0.9em";
    text.textContent = v.name;
    g.appendChild(node);
    g.appendChild(text);
    draw.appendChild(g);
}

function createLine(k, v, type) {
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var pathLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // if(v.state=="0"){//0表示未通过的线为灰色，箭头为灰色
    pathLine.setAttribute("marker-end", "url(#arrow1)");
    pathLine.setAttribute("stroke", "#CCC"); //线颜色
    // }else{
    //     pathLine.setAttribute("marker-end","url(#arrow2)");
    // pathLine.setAttribute("stroke","#00CC8B");//线颜色
    // }
    if (k == "start") {
        pathLine.setAttribute("d", "M" + v.M + " 65 L" + v.L + " 65");
    } else if (k == "project" && type == "up") {
        pathLine.setAttribute("d", "M" + v.M + " 60 L" + v.L + " 45");
    } else if (k == "project" && type == "down") {
        pathLine.setAttribute("d", "M" + v.M + " 70 L" + v.L + " 95");
    } else if (k == "slave") {
        pathLine.setAttribute("d", "M" + v.M + " 45 L" + v.L + " 60");
    } else if (k == "pile") {
        pathLine.setAttribute("d", "M" + v.M + " 95 L" + v.L + " 70");
    } else {
        pathLine.setAttribute("d", "M" + v.M + " 65 L" + v.L + " 65");
    }

    g.appendChild(pathLine);
    draw.appendChild(g);

}

for (var i in json) {
    var value = json[i];
    switch (i) {
        case "start":
            createNode(i, value);
            createLine(i, value);
            break;
        case "project":
            createNode(i, value);
            createLine(i, value, "up");
            createLine(i, value, "down");
            break;
        case "slave":
            createNode(i, value);
            createLine(i, value);
            break;
        case "pile":
            createNode(i, value);
            createLine(i, value);
            break;
        case "task":
            createNode(i, value);
            createLine(i, value);
            break;
        case "calValue":
            createNode(i, value);
            createLine(i, value);
            break;
        case "perfusion":
            createNode(i, value);
            createLine(i, value);
            break;
        case "export":
            createNode(i, value);
            createLine(i, value);
            break;
        case "end":
            createNode(i, value);
            break;
    }
}
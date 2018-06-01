<!DOCTYPE html>
<html>
<head>
<script>

    //fileName = new File("D:\\dajiang\\Projects\\lavarel\\blog\\public\\images\\googlelogo.png").getName()
function showPicture() {
    sourceOfPicture = new Image(101,140);
    sourceOfPicture.src = "public/images/googlelogo.png";
    //var sourceOfPicture = "http://img.tesco.com/Groceries/pi/118/5000175411118/IDShot_90x90.jpg";
    var img = document.getElementById('bigpic')
    img.src = "public/images/googlelogo.png";
    img.style.display = "block";
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
</script>
</head>

<body onload="startTime()">

    <div id="txt"></div>
    <img src="{{ asset('images/googlelogo.png') }}" />
    <button onclick="showPicture()">Enlarge</button>

</body>
</html>
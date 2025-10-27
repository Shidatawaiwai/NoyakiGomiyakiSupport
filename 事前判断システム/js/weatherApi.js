var CallApi = async function(latitude,longitude,key){
    //succes()内で呼び出される関数
    /*const Apikey = "cb4f0786051c1ef05a15bfdf0f84869a";*/
    
    var resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`); //APIの呼び出し
    var data = await resp.json();
    console.log(data);

    //風向の名前付け
    let deg_value = data.wind.deg/45;
    let degName;
    if(deg_value <= 1 || deg_value > 7){
        degName = "north";
    }else if(deg_value <= 3){
        degName = "east";
    }else if(deg_value <=5){
        degName = "south";
    }else if(deg_value <= 7){
        degName = "west";
    }



    var dataObj = {
        humidity : data.main.humidity,
        windP : data.wind.speed,
        windD_name : degName,
        windD_deg : data.wind.deg,
        //諸々のデータをオブジェクトにまとめる
    };
    
    return dataObj;
}
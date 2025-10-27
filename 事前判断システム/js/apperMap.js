
class apperMap{
    constructor(map_id,map_parent,view){
        //latitude:緯度;longitude:経度
        this.map_id = map_id;
        this.map_parent = map_parent;
        this.view = view;
        this.map = null;    //地図オブジェクト
        this.nowPosition = null;
    }
    
    mapDisappear(){
        if(this.map){
            this.map.remove();
            this.map = null;
        }
    }

    buildMap(lat,lon){
        //Elementの取得
        this.win = $(window);  //画面幅
        this.parent = $(this.map_parent);
        this.selector = $(`#${this.map_id}`);

        this.map_len = "500px";  //初期値

        if(this.win.width()>600){
            this.map_len = "500px";
        }else{
            this.map_len = `${this.parent.width()}px`;    //map_idの親要素のwidth
        }
        this.selector.width(this.map_len);
        this.selector.height(this.map_len);
        
    
        this.map = L.map(this.map_id).setView([lat,lon],this.view);
        const accessUrl = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const copyright = "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";
    
        L.tileLayer(accessUrl,{
            attribution:copyright
        }).addTo(this.map);
    }

    makePin(lat,lon){
        this.nowPosition = L.marker([lat,lon]).addTo(this.map);
        this.nowPosition.bindPopup("現在地").openPopup();
    }

    getPosition(e){
        if(this.nowPosition){
            this.map.removeLayer(this.nowPosition);
        }
        this.nowPosition = L.marker([ e.latlng.lat,e.latlng.lng]).addTo(this.map);
        return e.latlng;
    }

}
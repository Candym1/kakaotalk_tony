var scriptName = "토니 - 캐릭터정보";

/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
//함수 모음
//파일 저장 save(경로,파일이름,저장내용)
var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
var folder = new java.io.File(sdcard + "/메이플m/");
folder.mkdirs();
function save(folderName, fileName, str) {
  var c = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
  var d = new java.io.FileOutputStream(c);
  var e = new java.lang.String(str);
  d.write(e.getBytes());
  d.close();
}
//파일 읽기 read(경로,파일이름)
function read(folderName, fileName) {
  var b = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
  if (!(b.exists())) 
    return null;
  var c = new java.io.FileInputStream(b);
  var d = new java.io.InputStreamReader(c);
  var e = new java.io.BufferedReader(d);
  var f = e.readLine();
  var g = "";
  while ((g = e.readLine()) !== null) {
    f += "\n" + g;
  }
  c.close();
  d.close();
  e.close();
  return f.toString();
}

Jsoup = org.jsoup.Jsoup;
function dataslice(jsondata, chunksize){
  var ssg = jsondata.match(/\{[^\{\}]*\}/g); // {} 로 묶인 문자열 찾기
  var chunks = []
  var index = 0
  
  while(index < ssg.length){
    var chunk = ssg.slice(index, index + chunksize).map(JSON.parse)
    
    chunks.push(chunk)
    index += chunksize
  }
  return chunks
}
server = ["아케인","크로아","엘리시움","루나","스카니아","유니온","제니스"]

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  
  if(isGroupChat==true){
  if(msg.indexOf("!캐릭터정보 ")!=-1){

    var API_KEY = "test_74b115d46c6514ff7e78078d826610dc105ea8c8db3ddb2add2ca8406046189a18f069c32a720db87d2e87ba0584b627"
    var serverName = msg.split(" ")[1]
    var characterName = msg.split(" ")[2]
    if(server.indexOf(serverName)!=-1){
    var url = "https://open.api.nexon.com/maplestorym/v1"
    
    try{
    var ocid_data = org.jsoup.Jsoup.connect(url+"/id")
               .header("x-nxopen-api-key", API_KEY)
               .data("character_name", characterName)
               .data("world_name", serverName)
               .ignoreContentType(true)
               .execute()
               .body()
    }catch(err){
      replier.reply("서버에 해당 닉네임이 없대요🐰")
      return
    }
    ocid_data = ocid_data.split(':"')[1]
    ocid_data = ocid_data.split('"')[0]
    
    //기본정보 조회
    var normal_data = org.jsoup.Jsoup.connect(url+"/character/basic")
               .header("x-nxopen-api-key", API_KEY)
               .data("ocid", ocid_data)
               .ignoreContentType(true)
               .execute()
               .body()
    
    //장착아이템 조회
    var item_data = org.jsoup.Jsoup.connect(url+"/character/item-equipment")
               .header("x-nxopen-api-key", API_KEY)
               .data("ocid", ocid_data)
               .ignoreContentType(true)
               .execute()
               .body()
    try{
    var face = item_data.split('Forehead_Cash 얼굴장식","item_equipment_slot_name":"얼굴장식","item_name":"')[1]
    face = face.split(' (Cash)')[0]
    }catch(err){
      face = "없음"
    }
    try{
    var glove = item_data.split('Gloves_Cash 장갑","item_equipment_slot_name":"장갑","item_name":"')[1]
    glove = glove.split(' (Cash)')[0]
    }catch(err){
      glove = "없음"
    }
    try{
    var eye = item_data.split('EyeAcc_Cash 눈장식","item_equipment_slot_name":"눈장식","item_name":"')[1]
    eye = eye.split(' (Cash)')[0]
    }catch(err){
      eye = "없음"
    }
    try{
    var cap = item_data.split('Cap_Cash 모자","item_equipment_slot_name":"모자","item_name":"')[1]
    cap = cap.split(' (Cash)')[0]
    }catch(err){
      cap = "없음"
    }
    try{
    var cape = item_data.split('Cape_Cash 망토","item_equipment_slot_name":"망토","item_name":"')[1]
    cape = cape.split(' (Cash)')[0]
    }catch(err){
      cape = "없음"
    }
    try{
    var weapon = item_data.split('Weapon_Cash 무기","item_equipment_slot_name":"무기","item_name":"')[1]
    weapon = weapon.split(' (Cash)')[0]
    }catch(err){
      weapon = "없음"
    }
    try{
    var ear = item_data.split('EarAcc_Cash 귀고리","item_equipment_slot_name":"귀고리","item_name":"')[1]
    ear = ear.split(' (Cash)')[0]
    }catch(err){
      ear = "없음"
    }
    try{
    var shoes = item_data.split('Shoes_Cash 신발","item_equipment_slot_name":"신발","item_name":"')[1]
    shoes = shoes.split(' (Cash)')[0]
    }catch(err){
      shoes = "없음"
    }
    try{
    var longcoat = item_data.split('LongCoat_Cash 한벌옷","item_equipment_slot_name":"한벌옷","item_name":"')[1]
    longcoat = longcoat.split(' (Cash)')[0]
    }catch(err){
      longcoat = "없음"
    }
    try{
    var riding = item_data.split('"탈것","item_name":"')[1]
    riding = riding.split('"')[0]
    }catch(err){
      riding = "없음"
    }
    try{
    var chair = item_data.split('"의자","item_name":"')[1]
    chair = chair.split('"')[0]
    }catch(err){
      chair = "없음"
    }
    //캐릭터스탯 조회
    var stat_data = org.jsoup.Jsoup.connect(url+"/character/stat")
               .header("x-nxopen-api-key", API_KEY)
               .data("ocid", ocid_data)
               .ignoreContentType(true)
               .execute()
               .body()
    
    try{       
    //길드 조회
    var guild_data = org.jsoup.Jsoup.connect(url+"/character/guild")
               .header("x-nxopen-api-key", API_KEY)
               .data("ocid", ocid_data)
               .ignoreContentType(true)
               .execute()
               .body()
    
    var guildname = guild_data.split('name":"')[1]
    guildname = guildname.split('"')[0]
    }catch(err){
       var guildname = 1
    }       
    var nickname = normal_data.split('character_name":"')[1]
    nickname = nickname.split('"')[0]            
    var worldname = normal_data.split('world_name":"')[1]
    worldname = worldname.split('"')[0]
    var job = normal_data.split('job_name":"')[1]
    job = job.split('"')[0]
    var level = normal_data.split('level":')[1]
    level = level.split("}")[0]
    var power = stat_data.split('"전투력","stat_value":"')[1]
    power = power.split('"')[0]
    power = power.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    var n_power = stat_data.split('"물리 공격력","stat_value":"')[1]
    n_power = n_power.split('"')[0]
    n_power = n_power.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    var m_power = stat_data.split('"마법 공격력","stat_value":"')[1]
    m_power = m_power.split('"')[0]
    m_power = m_power.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    var hpmax = stat_data.split('"HP","stat_value":"')[1]
    hpmax = hpmax.split('"')[0]
    hpmax = hpmax.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    
    if(guildname == 1){
      replier.reply("⭐️캐릭터 정보⭐️\n\n•닉네임: "+ nickname + "  •서버명: "+worldname
      +"\n•직업: "+job+"  •레벨: "+level+"\n\n<스탯>\n•전투력: "+power+"  •피맥: "+hpmax+"\n•물공: "
      +n_power+"  •마공: "+m_power+"\n\n⭐️코디(옷) 정보\n•모자: "+cap+"\n•장갑: "+glove+"\n•한벌옷: "
      +longcoat+"\n•신발: "+shoes+"\n•망토: "+cape+"\n•무기: "+weapon+"\n\n⭐️코디(악세서리) 정보\n•얼굴장식: "+face+"\n•눈장식: "
      +eye+"\n•귀고리: "+ear+"\n•라이딩: "+riding+"\n•의자: "+chair
      +"\n\n\n⭐️길드가 없는 "+nickname+" 정보 끝!🐰")
      return
    }else{
      replier.reply("⭐️캐릭터 정보⭐️\n\n•닉네임: "+ nickname + "  •서버명: "+worldname
      +"\n•직업: "+job+"  •레벨: "+level+"\n\n<스탯>\n•전투력: "+power+"  •피맥: "+hpmax+"\n•물공: "
      +n_power+"  •마공: "+m_power+"\n\n⭐️코디(옷) 정보\n•모자: "+cap+"\n•장갑: "+glove+"\n•한벌옷: "
      +longcoat+"\n•신발: "+shoes+"\n•망토: "+cape+"\n•무기: "+weapon+"\n\n⭐️코디(악세서리) 정보\n•얼굴장식: "+face+"\n•눈장식: "
      +eye+"\n•귀고리: "+ear+"\n•라이딩: "+riding+"\n•의자: "+chair
      +"\n\n\n⭐️"+guildname+"⭐️ 길드에 있는 "+nickname+" 정보 끝!🐰")
      return
    }
    }else{
      replier.reply("서버를 제대로 입력하시쥬!?🐰")
      return
    }
      
    }
  }
  
}
function onNotificationPosted(sbn, sm) {
    var packageName = sbn.getPackageName();
    if (!packageName.startsWith("com.kakao.tal")) return;
    var actions = sbn.getNotification().actions;
    if (actions == null) return;
    var userId = sbn.getUser().hashCode();
    for (var n = 0; n < actions.length; n++) {
        var action = actions[n];
        if (action.getRemoteInputs() == null) continue;
        var bundle = sbn.getNotification().extras;

        var msg = bundle.get("android.text").toString();
        var sender = bundle.getString("android.title");
        var room = bundle.getString("android.subText");
        if (room == null) room = bundle.getString("android.summaryText");
        var isGroupChat = room != null;
        if (room == null) room = sender;
        var replier = new com.xfl.msgbot.script.api.legacy.SessionCacheReplier(packageName, action, room, false, "");
        var icon = bundle.getParcelableArray("android.messages")[0].get("sender_person").getIcon().getBitmap();
        var image = bundle.getBundle("android.wearable.EXTENSIONS");
        if (image != null) image = image.getParcelable("background");
        var imageDB = new com.xfl.msgbot.script.api.legacy.ImageDB(icon, image);
        com.xfl.msgbot.application.service.NotificationListener.Companion.setSession(packageName, room, action);
        if (this.hasOwnProperty("responseFix")) {
            responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName, userId != 0);
        }
    }
}

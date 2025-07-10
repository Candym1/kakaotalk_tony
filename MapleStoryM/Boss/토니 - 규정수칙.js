const scriptName = "토니 - 규정수칙";
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


//윌방
will = 0
will_check = 100

//진힐라방
heila = 0
heila_check = 100

//카루시카윌방
crcw = 0
crcw_check = 100

//듄켈방
dun = 0
dun_check = 100

//검마방
black = 0
black_check = 100

//세렌방
seren = 0
seren_check = 100

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if(isGroupChat==true){
  if(room === "[윌] 연습 트라이방"){
    try{
    //자동수칙 윌
      if(will == will_check){
        replier.reply("[윌] 연습 트라이방", "🍒 윌방 명단작성 필수 숙지 내용\n\n"+
        "1️⃣ 명단 내 적혀져 있는 메모 내용 및 조건에 맞춰 명단 작성\n"+
        "2️⃣ 명단 조건의 딜을 미충족  했을 경우\n"+
        "➖ 경고 1회 (2회 시 강퇴)\n"+
        "3️⃣ 숙코(숙련도코스프레)로 명단을 작성하여 파티를 망친 경우\n"+
        "➖ 7일 기간 강퇴\n\n"+
        "🚨 명단 작성 시 스펙 미기재 할 경우\n"+
        "➖ 명단 멘션 없이 운영진 임의 삭제 가능\n"+
        "➖ 임의 삭제에 있어 이의제기 불가")
        will = 0
      }
      will++
    }catch(e){
  
    }
  }
  if(room === "[진힐라] 연습 트라이방"){
    try{
    //자동수칙 진힐라
      if(heila == heila_check){
        replier.reply("[진힐라] 연습 트라이방", "🍒 진힐라방 명단작성 필수 숙지 내용\n\n"+
        "1️⃣ 명단 내 적혀져 있는 메모 내용 및 조건에 맞춰 명단 작성\n"+
        "2️⃣ 명단 조건의 딜을 미충족  했을 경우\n"+
        "➖ 경고 1회 (2회 시 강퇴)\n"+
        "3️⃣ 숙코(숙련도코스프레)로 명단을 작성하여 파티를 망친 경우\n"+
        "➖ 7일 기간 강퇴\n\n"+
        "🚨 명단 작성 시 스펙 미기재 할 경우\n"+
        "➖ 명단 멘션 없이 운영진 임의 삭제 가능\n"+
        "➖ 임의 삭제에 있어 이의제기 불가")
        heila = 0
      }
      heila++
    }catch(e){
      
    }
  }
  if(room === "[카루시,카윌] 연습 트라이방"){
    try{
    //자동수칙 카루카윌
      if(crcw == crcw_check){
        replier.reply("[카루시,카윌] 연습 트라이방", "🍒 카루시/카윌방 명단작성 필수 숙지 내용\n\n"+
        "1️⃣ 명단 내 적혀져 있는 메모 내용 및 조건에 맞춰 명단 작성\n"+
        "2️⃣ 명단 조건의 딜을 미충족  했을 경우\n"+
        "➖ 경고 1회 (2회 시 강퇴)\n"+
        "3️⃣ 숙코(숙련도코스프레)로 명단을 작성하여 파티를 망친 경우\n"+
        "➖ 7일 기간 강퇴\n\n"+
        "🚨 명단 작성 시 스펙 미기재 할 경우\n"+
        "➖ 명단 멘션 없이 운영진 임의 삭제 가능\n"+
        "➖ 임의 삭제에 있어 이의제기 불가")
        crcw = 0
      }
      crcw++
    }catch(e){
      
    }
  }
  if(room === "[듄켈] 연습 트라이방"){
    try{
    //자동수칙 듄켈
      if(dun == dun_check){
        replier.reply("[듄켈] 연습 트라이방", "🍒 듄켈방 명단작성 필수 숙지 내용\n\n"+
        "1️⃣ 명단 내 적혀져 있는 메모 내용 및 조건에 맞춰 명단 작성\n"+
        "2️⃣ 명단 조건의 딜을 미충족  했을 경우\n"+
        "➖ 경고 1회 (2회 시 강퇴)\n"+
        "3️⃣ 숙코(숙련도코스프레)로 명단을 작성하여 파티를 망친 경우\n"+
        "➖ 7일 기간 강퇴\n\n"+
        "🚨 명단 작성 시 스펙 미기재 할 경우\n"+
        "➖ 명단 멘션 없이 운영진 임의 삭제 가능\n"+
        "➖ 임의 삭제에 있어 이의제기 불가")
        dun = 0
      }
      dun++
    }catch(e){
      
    }
  }
  if(room === "[검마] 연습 트라이방"){
    try{
    //자동수칙 검마
      if(black == black_check){
        replier.reply("[검마] 연습 트라이방", "🍒 검마방 명단작성 필수 숙지 내용\n\n"+
        "1️⃣ 명단 내 적혀져 있는 메모 내용 및 조건에 맞춰 명단 작성\n"+
        "2️⃣ 명단 조건의 딜을 미충족  했을 경우\n"+
        "➖ 경고 1회 (2회 시 강퇴)\n"+
        "3️⃣ 숙코(숙련도코스프레)로 명단을 작성하여 파티를 망친 경우\n"+
        "➖ 7일 기간 강퇴\n\n"+
        "🚨 명단 작성 시 스펙 미기재 할 경우\n"+
        "➖ 명단 멘션 없이 운영진 임의 삭제 가능\n"+
        "➖ 임의 삭제에 있어 이의제기 불가")
        black = 0
      }
      black++
    }catch(e){
      
    }
  }
  if(room === "[세렌] 연습 트라이방"){
    try{
    //자동수칙 세렌
      if(seren == seren_check){
        replier.reply("[세렌] 연습 트라이방", "🍒 세렌방 명단작성 필수 숙지 내용\n\n"+
        "1️⃣ 명단 내 적혀져 있는 메모 내용 및 조건에 맞춰 명단 작성\n"+
        "2️⃣ 명단 조건의 딜을 미충족  했을 경우\n"+
        "➖ 경고 1회 (2회 시 강퇴)\n"+
        "3️⃣ 숙코(숙련도코스프레)로 명단을 작성하여 파티를 망친 경우\n"+
        "➖ 7일 기간 강퇴\n\n"+
        "🚨 명단 작성 시 스펙 미기재 할 경우\n"+
        "➖ 명단 멘션 없이 운영진 임의 삭제 가능\n"+
        "➖ 임의 삭제에 있어 이의제기 불가")
        seren = 0
      }
      seren++
    }catch(e){
      
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

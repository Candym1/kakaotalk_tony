var scriptName = "토니-확성기";

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

//줄이기
줄이기 ="\u200b".repeat(500);

//방이름
room_name = ["[진힐라] 연습 트라이방", "[윌] 연습 트라이방",
"[카루시,카윌] 연습 트라이방", "[듄켈] 연습 트라이방", "[검마] 연습 트라이방",
"[세렌] 연습 트라이방"]

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if(isGroupChat==true){
  if(sender.indexOf("뜡부")!=-1){
    try{
      
      if(msg.startsWith("!확성기 ")){
        var mesg = msg.substr(5)
        
        for(var g = 0; g < room_name.length; g++){
          
          replier.reply(room_name[g], mesg)
          java.lang.Thread.sleep(2000)
          
        }
        
        return
      }
    
      if(msg == "!닉네임펑"){
        var punk = '[{"테스트":"펑펑","토니":"당근"}]'
        
        save("/메이플m/", "/윌연습방/"+"/닉네임/"+"닉네임모음".trim() + ".txt", punk);
        java.lang.Thread.sleep(2000)
        save("/메이플m/", "/진힐라연습방/"+"/닉네임/"+"닉네임모음".trim() + ".txt", punk);
        java.lang.Thread.sleep(2000)
        save("/메이플m/", "/아칸연습방/"+"/닉네임/"+"닉네임모음".trim() + ".txt", punk);
        java.lang.Thread.sleep(2000)
        
        replier.reply("초기화 완료🐰")
        return
      }
    
    
    
    }catch(e){
      replier.reply("명령어 오류!!!\n"
      +"도움말 입력하여 봇사용법 보세요!\n"+
      "해결 안되면 뜡부 멘션주세요🐰")
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

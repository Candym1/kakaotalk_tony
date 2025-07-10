var scriptName = "토니-캔들어빌";

/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply("💖스카니아 캔들 가입문의방💖", message)
 * (boolean) replier.reply("💖스카니아 캔들 가입문의방💖", room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
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

//관리자
var master = []
var 블랙리스트 = [/*"스카 바씨 23n 비숍🕯"*/] //🕯뽀쪠 22n 엔버  , 스카 포레온 루☪미 21# 캔들, 스카 뜡부 23@ 에반 캔들

//줄이기
var 줄이기 ="\u200b".repeat(500);

//블랙, 골드
black = []
gold = []

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  try{
  if(isGroupChat==true){
  if((room=="💖스카니아 캔들 가입문의방💖" ) || (room=="Chansung")){
    
    if(msg.startsWith("!블랙 ")){
      
      var naming = msg.substr(4)  
      
      save("/메이플m/", "블랙.txt", naming)
      replier.reply("💖스카니아 캔들 가입문의방💖", "🐰 블랙인원 등록 완! ㅇ ㅅㅇ")
      return
    }
  
    if(msg.startsWith("!골드 ")){
      
      var naming_g = msg.substr(4)
       
      save("/메이플m/", "골드.txt", naming_g)
      replier.reply("💖스카니아 캔들 가입문의방💖", "🐰 골드인원 등록 완! ㅇ ㅅㅇ")
      return
    }
    
    if(msg == "인증"){
      
      var reple_black = read("/메이플m/", "블랙.txt")
      var reple_gold = read("/메이플m/", "골드.txt")
      
      var for_black = reple_black.split(",")
      var for_gold = reple_gold.split(",")
      
      for(var b = 0; b < for_black.length; b++){
        
        if(sender.indexOf(for_black[b])!=-1){
          var del_nam = for_black.splice(b, 1)
          var fin_black = for_black.join()
          
          if(fin_black == ""){
            save("/메이플m/", "블랙.txt", "No")
            replier.reply("💖스카니아 캔들 가입문의방💖", "🐰" + sender + "\n블랙 어빌 체크 완료!"+
            "\n\n⭐️ 남은 블랙 총 인원 : " + for_black.length + " 명!")
            return
          }else{
            save("/메이플m/", "블랙.txt", fin_black)
            replier.reply("💖스카니아 캔들 가입문의방💖", "🐰" + sender + "\n블랙 어빌 체크 완료!"+
            "\n\n⭐️ 남은 블랙 총 인원 : " + for_black.length + " 명!")
            return
          }
        }   
      }
      
      for(var g = 0; g < for_gold.length; g++){
        
        if(sender.indexOf(for_gold[g])!=-1){
          var del_nam_g = for_gold.splice(g, 1)
          var fin_gold = for_gold.join()
          
          if(fin_gold == ""){
            save("/메이플m/", "골드.txt", "No")
            replier.reply("💖스카니아 캔들 가입문의방💖", "🐰" + sender + "\n골드 어빌 체크 완료!"+
            "\n\n⭐️ 남은 골드 총 인원 : " + for_gold.length + " 명!")
            return
          }else{
            save("/메이플m/", "골드.txt", fin_gold)
            replier.reply("💖스카니아 캔들 가입문의방💖", "🐰" + sender + "\n골드 어빌 체크 완료!"+
            "\n\n⭐️ 남은 골드 총 인원 : " + for_gold.length + " 명!")
            return
          }
        }   
      }
      
      replier.reply("💖스카니아 캔들 가입문의방💖", "🚫 "+ sender +
      "\n블랙, 골드에서 찾을 수 없는데요 ㅇ ㅅㅇ?" +
      "\n이미 인증 끝냈거나 투표한 프로필 명으로 다시 오세요!"+
      "\n\n그 외엔 뜡부 멘션 주세요! 🐰")
      return
    }
    
    if(msg == "블랙확인"){
      var check_black = read("/메이플m/", "블랙.txt")
      
      if(check_black == "No"){
        replier.reply("💖스카니아 캔들 가입문의방💖", "🐰 모두 인증 했나봐요! 없어! ㅇ ㅅㅇ")
        return
      }else{
        var black_list = check_black.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, "\n🔹 ")
        var fin_ch_black = "🔹 " + black_list
        replier.reply("💖스카니아 캔들 가입문의방💖", "블랙 확인 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_ch_black)
        return
      } 
    }
    
    if(msg == "골드확인"){
      var check_gold = read("/메이플m/", "골드.txt")
      
      if(check_gold == "No"){
        replier.reply("💖스카니아 캔들 가입문의방💖", "🐰 모두 인증 했나봐요! 없어! ㅇ ㅅㅇ")
        return
      }else{
        var gold_list = check_gold.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, "\n🔹 ")
        var fin_ch_gold = "🔹 " + gold_list
        replier.reply("💖스카니아 캔들 가입문의방💖", "골드 확인 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_ch_gold)
        return 
      }  
    }
    
    if(msg == "초기화"){
      save("/메이플m/", "블랙.txt", "No")
      save("/메이플m/", "골드.txt", "No")
      
      replier.reply("💖스카니아 캔들 가입문의방💖", "초기화 완료! 🐰")
      return
    }
    
}
}

}catch(err){
  
  replier.reply("💖스카니아 캔들 가입문의방💖", "토니가 아플뻔 했어요!-ㅅ-🥕\n"+err)
  return
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

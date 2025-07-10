const scriptName = "토니-캔들수로";
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

fight_day = read("/메이플m/"+"/캔들수로/","전장회차.txt")

if(fight_day == 4){
  real_day = "전장 x"
}else{
  real_day = fight_day + " 회차"
}   

const H1 = 10, //시
      H2 = 14,
      H3 = 18,
      H4 = 22,
      H0 = 0,
      M1 = 0, //분
      S = 0, //초
      D0 = 0, //일요일
      D1 = 1, //월요일
      room_name = ["🔥캔들공지방🔥"]
      msg_content = "🚨금일 주간 수로/전장 마감일 입니다🚨\n\n" +
                    "👊수로 마감 시간 : 23시 29분까지\n" +
                    "시간 있다고 미루고 있다가 놓치게 되면\n" +
                    "[벌금] 발생되오니 확인 해주세요!\n\n" +
                    "🥕전장 : 금주는 " + "' " + real_day + " '" + " 입니다.\n\n" +
                    "요리사 한개보단 두개가 효율이 좋으니\n" +
                    "혼자 열고 진행하시기 보다 같이 여실분 찾아서 진행 부탁드리겠습니다.\n\n" +
                    "300gp는 금방 모이니 아끼지 마시고 적극 활용해주세요👏\n\n\n" +
                    "🐰비밀창고 잊지말고 진행하시어\nGp 꼭 챙겨가세요\n\n\n" +
                    "수로 6차/스탯활성화 및 강화로 위험합니다. 진심펀치 부탁드리겠습니다.👏\n\n" +
                    "1회 수로 인증 안한 경우 벌금 15억\n" +
                    "2회 수로 인증 안한 경우 벌금 30억\n" +
                    "3회 수로 인증 안한 경우 벌금 45억"
      
Device.acquireWakeLock(android.os.PowerManager.PARTIAL_WAKE_LOCK,"wakelock");
let a = setInterval(() => {
  date = new Date();
  if(date.getDate() && date.getDay() == D0 && date.getHours() == H1 && date.getMinutes() == M1 && date.getSeconds() == S){
    for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000); 
let b = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getDay() == D0 && date.getHours() == H2 && date.getMinutes() == M1 && date.getSeconds() == S){
  for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000);
let c = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getDay() == D0 && date.getHours() == H3 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000); 
let d = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getDay() == D0 && date.getHours() == H4 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  } 
}, 1000);
let e = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getDay() == D1 && date.getHours() == H0 && date.getMinutes() == M1 && date.getSeconds() == S){
  
  save("/메이플m/"+"/캔들수로/","수로체크.txt", 0);
  save("/메이플m/"+"/캔들수로/","체크인원.txt", ",");
  
  var new_fight_day = Number(fight_day) + 1
  if(new_fight_day == 5){
    save("/메이플m/"+"/캔들수로/","전장회차.txt", 1);        
  }else{
    save("/메이플m/"+"/캔들수로/","전장회차.txt", new_fight_day);
  }
  
  Api.replyRoom("⭐️캔들⭐️", "수로 체크 초기화 완료ㅇ ㅅㅇ!")
  java.lang.Thread.sleep(1000)
  }
}, 1000);

function onStartCompile() {
  clearInterval(a); 
  clearInterval(b);
  clearInterval(c);
  clearInterval(d);
  clearInterval(e);
}

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  
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

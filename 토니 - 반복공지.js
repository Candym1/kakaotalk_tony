const scriptName = "토니 - 반복공지";
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

const H1 = 2, //시
      H2 = 4,
      H3 = 6,
      H4 = 8,
      H5 = 10,
      H6 = 12,
      H7 = 14,
      H8 = 16,
      H9 = 18,
      H10 = 20,
      H11 = 22,
      H12 = 24,
      H13 = 0,
      M1 = 0, //분
      S = 0, //초
      room_name = ["[윌] 연습 트라이방", "[진힐라] 연습 트라이방",
                   "[카루시,카윌] 연습 트라이방", "[듄켈] 연습 트라이방", "[검마] 연습 트라이방",
                   "[세렌] 연습 트라이방"]
      msg_content = "🚨[신고접수 및 제재] 추가 내용\n\n" +
                    "최근 단판으로 파티를 터트리거나\n" +
                    "파티 목적과 다르게 무임승차 식으로\n" +
                    "클리어 하는 모습 다수 포착되어\n" +
                    "이에 3월 1일 부터 단판 신고제 도입\n\n" +
                    "1️⃣명단 내 단판 키워드 작성된 명단만 단판 신고 가능\n" +
                    "2️⃣트라이, 클리어 파티에만 단판신고 적용\n" +
                    "3️⃣메모에 단판신고 키워드 입력 없을 경우 단판신고 제재 불가\n" +
                    "➖➖➖➖➖➖➖➖➖➖➖\n" +
                    "🚨[방내 트러블 유발 채팅] 내용\n\n" +
                    "방내 발언수위가 세지는 트러블 채팅 내용 적발 시 이유 불문하고 채팅 유발자, 대응자 둘다 2차 경고 부여\n" +
                    "➖➖➖➖➖➖➖➖➖➖➖\n" +
                    "🚨[지속적인 사담 및 금지단어] 내용\n\n" +
                    "1️⃣방내 사담을 완전 금하는것은 아니지만 긴 시간동안 지속되는 사담 확인 시 경고\n" +
                    "2️⃣금지단어[욕설,음담패설 등] 사용 시 이유불문 전체방 추방\n\n" +
                    "⚠️단판 신고제 도입으로 채팅이 아닌 신고로 진행, 매너있는 방 이용 부탁드리겠습니다."
      
Device.acquireWakeLock(android.os.PowerManager.PARTIAL_WAKE_LOCK,"wakelock");
let a = setInterval(() => {
  date = new Date();
  if(date.getDate() && date.getHours() == H1 && date.getMinutes() == M1 && date.getSeconds() == S){
    for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000); 
let b = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getHours() == H2 && date.getMinutes() == M1 && date.getSeconds() == S){
  for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000);
let c = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getHours() == H3 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000); 
let d = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getHours() == H4 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  } 
}, 1000);
  let e = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getHours() == H5 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000);
let f = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getHours() == H6 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000);
 let g = setInterval(() => {
  date = new Date();
  if(date.getDate() && date.getHours() == H7 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000); 
let h = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getHours() == H8 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000);
 let i = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getHours() == H9 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000);
let j = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getHours() == H10 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  } 
}, 1000);
 let k = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getHours() == H11 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000);
let l = setInterval(() => {
  date = new Date();
if(date.getDate() && date.getHours() == H12 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000);
 let m = setInterval(() => {
  date = new Date();
  if(date.getDate() && date.getHours() == H13 && date.getMinutes() == M1 && date.getSeconds() == S){
for(var a = 0; a < room_name.length; a++){
      Api.replyRoom(room_name[a], msg_content)
      java.lang.Thread.sleep(1000)
    }
  }
}, 1000); 

function onStartCompile() {
  clearInterval(a); 
  clearInterval(b);
  clearInterval(c);
  clearInterval(d);
  clearInterval(e);
  clearInterval(f);
  clearInterval(g); 
  clearInterval(h);
  clearInterval(i);
  clearInterval(j);
  clearInterval(k);
  clearInterval(l);
  clearInterval(m);
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

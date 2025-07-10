const scriptName = "토니 - 금지단어 체크";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply("상위보스 경고처리방", message)
 * (boolean) replier.reply("상위보스 경고처리방", room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
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

//줄이기
줄이기 ="\u200b".repeat(500);

//금지단어 반응
check_will = false
check_heila = false
check_cr = false
check_dun = false
check_black = false
check_seren = false

check_send_will = false
check_send_heila = false
check_send_cr = false
check_send_dun = false
check_send_black = false
check_send_seren = false

//금지 시작 종료
starton = false

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if(isGroupChat==true){
  if(room == "상위보스 경고처리방" || room == "[윌] 연습 트라이방" || room == "[진힐라] 연습 트라이방" ||
     room == "[카루시,카윌] 연습 트라이방" || room == "[듄켈] 연습 트라이방" || room == "[검마] 연습 트라이방" ||
     room == "[세렌] 연습 트라이방" || room == "상위보스 통합 문의방"){
  try{
    /*
    if(msg == "!금지시작"){
      if(sender.indexOf("뜡부")!=-1){
        if(starton == false){
          starton = true
          replier.reply("상위보스 경고처리방", "금지단어 시작! 🐰")
          while(starton){*/
            if(check_will == true){
              var no_key_will = read("/메이플m/","/윌연습방/"+"금지인원"+".txt")
              replier.reply("상위보스 경고처리방", "🚫 금지단어 적발!!\n내용을 눌러 확인하세요!\n" + 줄이기 + "\n" + no_key_will)
              check_will = false
              check_send_will = false
            }
            if(check_heila == true){
              var no_key_helia = read("/메이플m/","/진힐라연습방/"+"금지인원"+".txt")
              replier.reply("상위보스 경고처리방", "🚫 금지단어 적발!!\n내용을 눌러 확인하세요!\n" + 줄이기 + "\n" + no_key_helia)
              check_heila = false
              check_send_heila = false
            }
            if(check_cr == true){
              var no_key_cr = read("/메이플m/","/카룻카윌연습방/"+"금지인원"+".txt")
              replier.reply("상위보스 경고처리방", "🚫 금지단어 적발!!\n내용을 눌러 확인하세요!\n" + 줄이기 + "\n" + no_key_cr)
              check_cr = false
              check_send_cr = false
            }
            if(check_dun == true){
              var no_key_dun = read("/메이플m/","/듄켈연습방/"+"금지인원"+".txt")
              replier.reply("상위보스 경고처리방", "🚫 금지단어 적발!!\n내용을 눌러 확인하세요!\n" + 줄이기 + "\n" + no_key_dun)
              check_dun = false
              check_send_dun = false
            }
            if(check_black == true){
              var no_key_black = read("/메이플m/","/검마연습방/"+"금지인원"+".txt")
              replier.reply("상위보스 경고처리방", "🚫 금지단어 적발!!\n내용을 눌러 확인하세요!\n" + 줄이기 + "\n" + no_key_black)
              check_black = false
              check_send_black = false
            }
            if(check_seren == true){
              var no_key_seren = read("/메이플m/","/세렌연습방/"+"금지인원"+".txt")
              replier.reply("상위보스 경고처리방", "🚫 금지단어 적발!!\n내용을 눌러 확인하세요!\n" + 줄이기 + "\n" + no_key_seren)
              check_seren = false
              check_send_seren = false
            }
            /*
            if(starton == false){
              break
            }
            java.lang.Thread.sleep(30000)
          }
        }else{
          replier.reply("상위보스 경고처리방", "이미 하고 있어요! ㅇ ㅅㅇ🐰")
          return
        }
      }else{
        replier.reply("상위보스 경고처리방", "뜡부 불러오세요! ㅇ ㅅㅇ🐰")
        return 
      }
    }*/
    
    /*
    if(msg == "!금지종료" || msg == "!금지중지"){
      if(sender.indexOf("뜡부")!=-1){
        if(starton == true){        
          replier.reply("상위보스 경고처리방", "금지단어 종료! 🐰")
          starton = false
          return
        }else{
          replier.reply("상위보스 경고처리방", "이미 끝나있어요 ㅇ ㅅㅇ! 🐰")
          return
        }
      }else{
        replier.reply("상위보스 경고처리방", "뜡부 불러오세요! ㅇ ㅅㅇ🐰")
        return
      }
    }*/
    
  }catch(e){
    
  }
}
  if(room === "[윌] 연습 트라이방"){
  try{
    if(check_send_will == false){
      var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
      var out_keyword2 = out_keyword.split("🔹 ")
    
      var date = new Date()
      var real_time = date.getFullYear() + ". " + (date.getMonth()+1) + ". " + date.getDate() + "  "
                    + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초"
    
      for(var a = 0; a < out_keyword2.length + 1; a++){
        if(msg.indexOf(out_keyword2[a].trim())!=-1){
          var out_key_mem = "🐰 [윌] 방\n🔹 " + sender + "\n" + real_time + "\n내용 : " + msg
          save("/메이플m/"+"/윌연습방/","금지인원.txt", out_key_mem)
        
          check_will = true
          check_send_will = true
        }
      }
    }else if(check_send_will == true){
      var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
      var out_keyword2 = out_keyword.split("🔹 ")
      var read_outmem = read("/메이플m/","/윌연습방/"+"금지인원"+".txt")
      var date = new Date()
      var real_time = date.getFullYear() + ". " + (date.getMonth()+1) + ". " + date.getDate() + "  "
                    + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초"
    
      for(var a = 0; a < out_keyword2.length + 1; a++){
        if(msg.indexOf(out_keyword2[a].trim())!=-1){
          var out_key_mem = "🐰 [윌] 방\n🔹 " + sender + "\n" + real_time + "\n내용 : " + msg
          var plus_out_mem = read_outmem + "\n➖➖➖➖➖➖➖➖➖\n" + out_key_mem
          save("/메이플m/"+"/윌연습방/","금지인원.txt", plus_out_mem)
        }
      }
      
    }
  }catch(e){
      
  }
}
  if(room === "[진힐라] 연습 트라이방"){
  try{
    if(check_send_heila == false){
      var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
      var out_keyword2 = out_keyword.split("🔹 ")
    
      var date = new Date()
      var real_time = date.getFullYear() + ". " + (date.getMonth()+1) + ". " + date.getDate() + "  "
                    + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초"
      
      for(var a = 0; a < out_keyword2.length + 1; a++){
        if(msg.indexOf(out_keyword2[a].trim())!=-1){
          var out_key_mem = "🐰 [진힐라] 방\n🔹 " + sender + "\n" + real_time + "\n내용 : " + msg
          save("/메이플m/"+"/진힐라연습방/","금지인원.txt", out_key_mem)
        
          check_heila = true
          check_send_heila = true
        }
      }
    }else if(check_send_heila == true){
      var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
      var out_keyword2 = out_keyword.split("🔹 ")
      var read_outmem = read("/메이플m/","/진힐라연습방/"+"금지인원"+".txt")
      var date = new Date()
      var real_time = date.getFullYear() + ". " + (date.getMonth()+1) + ". " + date.getDate() + "  "
                    + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초"
    
      for(var a = 0; a < out_keyword2.length + 1; a++){
        if(msg.indexOf(out_keyword2[a].trim())!=-1){
          var out_key_mem = "🐰 [진힐라] 방\n🔹 " + sender + "\n" + real_time + "\n내용 : " + msg
          var plus_out_mem = read_outmem + "\n➖➖➖➖➖➖➖➖➖\n" + out_key_mem
          save("/메이플m/"+"/진힐라연습방/","금지인원.txt", plus_out_mem)
        }
      } 
    } 
  }catch(e){
    
  }
}
  if(room === "[카루시,카윌] 연습 트라이방"){
  try{
    if(check_send_cr == false){
      var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
      var out_keyword2 = out_keyword.split("🔹 ")
    
      var date = new Date()
      var real_time = date.getFullYear() + ". " + (date.getMonth()+1) + ". " + date.getDate() + "  "
                    + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초"
      
      for(var a = 0; a < out_keyword2.length + 1; a++){
        if(msg.indexOf(out_keyword2[a].trim())!=-1){
          var out_key_mem = "🐰 [카루시,카윌] 방\n🔹 " + sender + "\n" + real_time + "\n내용 : " + msg
          save("/메이플m/"+"/카룻카윌연습방/","금지인원.txt", out_key_mem)
        
          check_cr = true
          check_send_cr = true
        }
      }
    }else if(check_send_cr == true){
      var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
      var out_keyword2 = out_keyword.split("🔹 ")
      var read_outmem = read("/메이플m/","/카룻카윌연습방/"+"금지인원"+".txt")
      var date = new Date()
      var real_time = date.getFullYear() + ". " + (date.getMonth()+1) + ". " + date.getDate() + "  "
                    + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초"
    
      for(var a = 0; a < out_keyword2.length + 1; a++){
        if(msg.indexOf(out_keyword2[a].trim())!=-1){
          var out_key_mem = "🐰 [카루시,카윌] 방\n🔹 " + sender + "\n" + real_time + "\n내용 : " + msg
          var plus_out_mem = read_outmem + "\n➖➖➖➖➖➖➖➖➖\n" + out_key_mem
          save("/메이플m/"+"/카룻카윌연습방/","금지인원.txt", plus_out_mem)
        }
      } 
    } 
  }catch(e){
    
  }
}
if(room === "[듄켈] 연습 트라이방"){
  try{
    if(check_send_dun == false){
      var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
      var out_keyword2 = out_keyword.split("🔹 ")
    
      var date = new Date()
      var real_time = date.getFullYear() + ". " + (date.getMonth()+1) + ". " + date.getDate() + "  "
                    + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초"
      
      for(var a = 0; a < out_keyword2.length + 1; a++){
        if(msg.indexOf(out_keyword2[a].trim())!=-1){
          var out_key_mem = "🐰 [듄켈] 방\n🔹 " + sender + "\n" + real_time + "\n내용 : " + msg
          save("/메이플m/"+"/듄켈연습방/","금지인원.txt", out_key_mem)
        
          check_dun = true
          check_send_dun = true
        }
      }
    }else if(check_send_dun == true){
      var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
      var out_keyword2 = out_keyword.split("🔹 ")
      var read_outmem = read("/메이플m/","/듄켈연습방/"+"금지인원"+".txt")
      var date = new Date()
      var real_time = date.getFullYear() + ". " + (date.getMonth()+1) + ". " + date.getDate() + "  "
                    + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초"
    
      for(var a = 0; a < out_keyword2.length + 1; a++){
        if(msg.indexOf(out_keyword2[a].trim())!=-1){
          var out_key_mem = "🐰 [듄켈] 방\n🔹 " + sender + "\n" + real_time + "\n내용 : " + msg
          var plus_out_mem = read_outmem + "\n➖➖➖➖➖➖➖➖➖\n" + out_key_mem
          save("/메이플m/"+"/듄켈연습방/","금지인원.txt", plus_out_mem)
        }
      } 
    } 
  }catch(e){
    
  }
}
if(room === "[검마] 연습 트라이방"){
  try{
    if(check_send_black == false){
      var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
      var out_keyword2 = out_keyword.split("🔹 ")
    
      var date = new Date()
      var real_time = date.getFullYear() + ". " + (date.getMonth()+1) + ". " + date.getDate() + "  "
                    + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초"
      
      for(var a = 0; a < out_keyword2.length + 1; a++){
        if(msg.indexOf(out_keyword2[a].trim())!=-1){
          var out_key_mem = "🐰 [검마] 방\n🔹 " + sender + "\n" + real_time + "\n내용 : " + msg
          save("/메이플m/"+"/검마연습방/","금지인원.txt", out_key_mem)
        
          check_black = true
          check_send_black = true
        }
      }
    }else if(check_send_black == true){
      var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
      var out_keyword2 = out_keyword.split("🔹 ")
      var read_outmem = read("/메이플m/","/검마연습방/"+"금지인원"+".txt")
      var date = new Date()
      var real_time = date.getFullYear() + ". " + (date.getMonth()+1) + ". " + date.getDate() + "  "
                    + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초"
    
      for(var a = 0; a < out_keyword2.length + 1; a++){
        if(msg.indexOf(out_keyword2[a].trim())!=-1){
          var out_key_mem = "🐰 [검마] 방\n🔹 " + sender + "\n" + real_time + "\n내용 : " + msg
          var plus_out_mem = read_outmem + "\n➖➖➖➖➖➖➖➖➖\n" + out_key_mem
          save("/메이플m/"+"/검마연습방/","금지인원.txt", plus_out_mem)
        }
      } 
    } 
  }catch(e){
    
  }
}
if(room === "[세렌] 연습 트라이방"){
  try{
    if(check_send_seren == false){
      var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
      var out_keyword2 = out_keyword.split("🔹 ")
    
      var date = new Date()
      var real_time = date.getFullYear() + ". " + (date.getMonth()+1) + ". " + date.getDate() + "  "
                    + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초"
      
      for(var a = 0; a < out_keyword2.length + 1; a++){
        if(msg.indexOf(out_keyword2[a].trim())!=-1){
          var out_key_mem = "🐰 [세렌] 방\n🔹 " + sender + "\n" + real_time + "\n내용 : " + msg
          save("/메이플m/"+"/세렌연습방/","금지인원.txt", out_key_mem)
        
          check_seren = true
          check_send_seren = true
        }
      }
    }else if(check_send_seren == true){
      var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
      var out_keyword2 = out_keyword.split("🔹 ")
      var read_outmem = read("/메이플m/","/세렌연습방/"+"금지인원"+".txt")
      var date = new Date()
      var real_time = date.getFullYear() + ". " + (date.getMonth()+1) + ". " + date.getDate() + "  "
                    + date.getHours() + "시 " + date.getMinutes() + "분 " + date.getSeconds() + "초"
    
      for(var a = 0; a < out_keyword2.length + 1; a++){
        if(msg.indexOf(out_keyword2[a].trim())!=-1){
          var out_key_mem = "🐰 [세렌] 방\n🔹 " + sender + "\n" + real_time + "\n내용 : " + msg
          var plus_out_mem = read_outmem + "\n➖➖➖➖➖➖➖➖➖\n" + out_key_mem
          save("/메이플m/"+"/세렌연습방/","금지인원.txt", plus_out_mem)
        }
      } 
    } 
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

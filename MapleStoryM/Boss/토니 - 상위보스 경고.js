var scriptName = "토니 - 상위보스 경고";

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

//포스레벨
fos_level = 700

// 1번 체크
one_check = []
one_check2 = []
one_check_weel = []
one_check_jin = []
one_check_a = []
one_check_cr = []
one_check_dun = []
one_check_black = []

//관리자
sender_m = ["뜡부", "제티", "꿀잠", "밉움", "꺼짐", "겸댕"]

//복귀
hellow_bok = []

//warning
warning1 = false
warning2 = false
warning3 = false
warning1_t = false
warning2_t = false



function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if(isGroupChat==true){
  if(room=="상위보스 경고처리방"){
  try{
    
    //문의방 다이렉트 입장
    if(msg == "문의방 입장"){
      replier.reply("상위보스 경고처리방", "https://open.kakao.com/o/gAQiFmYf")
      return
    }
    
    //금지단어 추가
    if(msg.startsWith("!금지단어 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var no_keyword = msg.substr(6)
          var no_keyword2 = "🔹 " + no_keyword
          var keyword_dic = read("/메이플m/","/경고/"+"금지단어"+".txt");
          if(keyword_dic == ","){
            save("/메이플m/"+"/경고/","금지단어.txt", no_keyword2)
            replier.reply("상위보스 경고처리방", "🐰 금지단어 " + no_keyword + "\n단어사전에 추가했어요!!")
            return
          }else{
            var sav_keyword = keyword_dic + "\n" + no_keyword2
            save("/메이플m/"+"/경고/","금지단어.txt", sav_keyword)
            replier.reply("상위보스 경고처리방", "🐰 금지단어 " + no_keyword + "\n단어사전에 추가했어요!!")
            return
          }
        }
      }
      replier.reply("상위보스 경고처리방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //금지단어 보기
    if(msg == "!금지리스트"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var noob_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt");
          if(noob_keyword == ","){
            replier.reply("상위보스 경고처리방", "금지단어가 없는데요 ㅇ ㅅㅇ?🐰")
            return
          }else{
            var noob_key = "🔹 " + noob_keyword
            replier.reply("상위보스 경고처리방", "금지단어 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + noob_key)
            return
          }
        }
      }
      replier.reply("상위보스 경고처리방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //금지단어 삭제
    if(msg.startsWith("!금지단어삭제 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var del_keyword = msg.substr(8)
          var del_keyword_dic = read("/메이플m/","/경고/"+"금지단어"+".txt");
          if(del_keyword_dic.indexOf("🔹 " + del_keyword)!=-1){
            var chan_del_key = "🔹 " + del_keyword + "\n"
            if(del_keyword_dic.indexOf(chan_del_key)!=-1){
              
              var fin_chan_key = del_keyword_dic.replace(chan_del_key, "")
              save("/메이플m/"+"/경고/","금지단어.txt", fin_chan_key)
              replier.reply("상위보스 경고처리방", "🐰 " + del_keyword + " 지웠어요!")
              return
            }else{
              var fin_chan_key3 = del_keyword_dic.replace("🔹 " + del_keyword, "")
              save("/메이플m/"+"/경고/","금지단어.txt", fin_chan_key3)
              replier.reply("상위보스 경고처리방", "🐰 " + del_keyword + " 지웠어요!")
              return
            }
          }else if(del_keyword_dic.indexOf(del_keyword)!=-1){
            var chan_del_key2 = del_keyword + "\n"
            var fin_chan_key2 = del_keyword_dic.replace(chan_del_key2, "")
            save("/메이플m/"+"/경고/","금지단어.txt", fin_chan_key2)
            replier.reply("상위보스 경고처리방", "🐰 " + del_keyword + " 지웠어요!")
            return
          }else{
            replier.reply("상위보스 경고처리방", "없는 단어인데요??ㅇ ㅅㅇ🐰")
            return
          }
        }
      }
      replier.reply("상위보스 경고처리방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }  
    
    //양식 보내기
    if(msg.indexOf("안녕하세요. 상위보스 경고방")!=-1){
      if(sender == "오픈채팅봇"){
        replier.reply("상위보스 경고처리방", "🐰신고 양식에 맞춰 상세히 적으세요!!\n\n"+
        "➖➖⚠️ 신고 양식 ⚠️➖➖"+
        "\n\n1. 보스방 이름 : "+
        "\n2. 진행한 명단 : [예시: 클리어3팀]"+
        "\n3. 신고할 닉네임 및 서버 : "+
        "\n4. 신고 내용 : "+
        "\n5. 총 진행 판수 : \n[🚨단판은 단판신고 파티만 신고 적용]\n\n"+
        "➖➖➖➖➖➖➖➖➖➖"+
        "\n🚨 신고 접수 반려처리 Case"+
        "\n\n1️⃣ 신고자 신원 확인 불가"+
        "\n➖ 보스방과 동일한 프로필로만 신고 진행"+
        "\n2️⃣ 신고 접수 후 답장 확인 없이 방 이탈"+
        "\n3️⃣ 보스방과 관련없는 신고내용")
        java.lang.Thread.sleep(2000)
        replier.reply("상위보스 경고처리방", "⚠️ 상위보스 경고방은 보스방과 관련된\n"+
        "딜미 및 숙코, 방내외 규정위반\n"+
        "신고만 받고 있습니다.\n"+
        "➖➖➖➖➖➖➖➖➖➖"+
        "\n위 신고 양식을 토대로\n"+
        "🚨[신고 내용 작성 및 상세히 상황설명] 후\n"+
        "멘션자 멘션 후 방 비우지 마시고\n"
        +"답장 기다려주세요!\n\n"+
        "🍒 1순위 멘션자 : 뜡부\n"+
        "🍒 2순위 멘션자 : 제티, 꿀잠, 겸댕, 꺼짐\n"+
        "➖➖➖➖➖➖➖➖➖➖"+
        "\n🚫일정시간 내용이 없거나\n"+
        "보스방과 관련없는 문의 시 추방 됩니다!")
        return
      }
    }
    
    //수동 양식보내기
    if(msg == "양식"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          replier.reply("상위보스 경고처리방", "🐰신고 양식에 맞춰 상세히 적으세요!!\n\n"+
          "➖➖⚠️ 신고 양식 ⚠️➖➖"+
          "\n\n1. 보스방 이름 : "+
          "\n2. 진행한 명단 : [예시: 클리어3팀]"+
          "\n3. 신고할 닉네임 및 서버 : "+
          "\n4. 신고 내용 : "+
          "\n5. 총 진행 판수 : \n[🚨단판은 단판신고 파티만 신고 적용]\n\n"+
          "➖➖➖➖➖➖➖➖➖➖"+
          "\n🚨 신고 접수 반려처리 Case"+
          "\n\n1️⃣ 신고자 신원 확인 불가"+
          "\n➖ 보스방과 동일한 프로필로만 신고 진행"+
          "\n2️⃣ 신고 접수 후 답장 확인 없이 방 이탈"+
          "\n3️⃣ 보스방과 관련없는 신고내용")
          java.lang.Thread.sleep(2000)
          replier.reply("상위보스 경고처리방", "⚠️ 상위보스 경고방은 보스방과 관련된\n"+
          "딜미 및 숙코, 방내외 규정위반\n"+
          "신고만 받고 있습니다.\n"+
          "➖➖➖➖➖➖➖➖➖➖"+
          "\n위 신고 양식을 토대로\n"+
          "🚨[신고 내용 작성 및 상세히 상황설명] 후\n"+
          "멘션자 멘션 후 방 비우지 마시고\n"
          +"답장 기다려주세요!\n\n"+
          "🍒 1순위 멘션자 : 뜡부\n"+
          "🍒 2순위 멘션자 : 제티, 꿀잠, 겸댕, 꺼짐\n"+
          "➖➖➖➖➖➖➖➖➖➖"+
          "\n🚫일정시간 내용이 없거나\n"+
          "보스방과 관련없는 문의 시 추방 됩니다!")
          return
        }
      }   
    }
    
    
    //경고 닉네임
    if(msg.startsWith("!경고 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          out_nick = msg.substr(4)
      
          replier.reply("상위보스 경고처리방", "서버명을 입력해주세요!\n"+
          "20초 내로 서버 풀네임으로 입력!!🐰\n\n"+
          "ex) 서버 : 스카니아 🍒")
          warning1 = true
          java.lang.Thread.sleep(20000)
          warning1 = false
          return
        }
      }
      replier.reply("상위보스 경고처리방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    
    //경고 서버
    if(msg.startsWith("서버 : ")){
      if(warning1 == true){
        warning1 = false
        var su_name = msg.substr(5)
        
        var out_one = read("/메이플m/","/경고/"+"1차스토리"+".txt")
        var out_two = read("/메이플m/","/경고/"+"2차스토리"+".txt")
        
        var su_nick = out_nick + "(" + su_name + ")"
        
        if(out_two.indexOf(su_nick)!=-1){
          replier.reply("상위보스 경고처리방", "이미 2경고로 추방당한 인원입니다!\n"+
          "닉네임과 서버를 다시 확인해주세요 ㅇ ㅅㅇ🐰")
          return
        }else if(out_one.indexOf(su_nick)!=-1){
          all_out_nick = su_nick
          replier.reply("상위보스 경고처리방", "🐰"+all_out_nick+" 님은 2차 경고입니다.\n룰에 따라 2회 경고 누적이며\n추방조치 해주세요!"+
          "\n추가로 사유를 30초내로 적어주세요!\n\nex) 사유 : 뜡부모욕죄🚫")
          
          warning2 = true
          java.lang.Thread.sleep(30000)
          warning2 = false
          
          return
        }else{
          all_out_nick = su_nick
          replier.reply("상위보스 경고처리방", "🐰"+all_out_nick+" 님은 1차 경고입니다.\n룰에 따라 1회 경고 누적입니다!"+
          "\n추가로 사유를 30초내로 적어주세요!\n\nex) 사유 : 뜡부모욕죄🚫")
          
          warning3 = true
          java.lang.Thread.sleep(30000)
          warning3 = false
          
          return
        }
      }else{
        replier.reply("상위보스 경고처리방", "20초가 지났어염 ㅇ ㅅㅇ\n"+
        "!경고 부터 다시 하세염 🐰")
        warning1 = false
        return
      }
    }
    
    //사유 적기
    if(msg.startsWith("사유 : ")){
      var story1 = msg.substr(5)
      var date = new Date()
      var real_time = date.getFullYear() + "년 " + (date.getMonth()+1) + "월 " + date.getDate() + "일"
      
      var sav_story = "🔹 " + all_out_nick + "\n사유 : " + story1 + "\n등록일 : " + real_time
      var read_story1 = read("/메이플m/","/경고/"+"1차스토리"+".txt")
       
      if(warning3 == true){
        warning3 = false
        if(read_story1 == "No"){
          save("/메이플m/"+"/경고/","1차스토리.txt", sav_story)
          replier.reply("상위보스 경고처리방", sav_story + "\n\n위 내용이 등록 됐어요!🐰")
          return
        }else{
          var saving = read_story1 + "\n" + sav_story
          save("/메이플m/"+"/경고/","1차스토리.txt", saving)
          replier.reply("상위보스 경고처리방", sav_story + "\n\n위 내용이 등록 됐어요!🐰")
          return
        }
      }else if(warning2 == true){
        warning2 = false
        var read_story2 = read("/메이플m/","/경고/"+"2차스토리"+".txt")
        
        var del_story1 = read_story1.split("🔹 " + all_out_nick)[1]
        var del_story2 = del_story1.split("🔹")[0].trim()
        var del_story3 = "🔹 " + all_out_nick + "\n" + del_story2 + "\n"
        
        if(read_story2.indexOf(del_story3)!=-1){
          var del_fin = read_story1.replace(del_story3, "")
          if(del_fin.indexOf("🔹")!=-1){
            save("/메이플m/"+"/경고/","1차스토리.txt", del_fin)
          }else{
            save("/메이플m/"+"/경고/","1차스토리.txt", "No")
          }
          
          if(read_story2 == "No"){
            replier.reply("상위보스 경고처리방", sav_story + "\n\n위 내용이 등록 됐어요!🐰")
            save("/메이플m/"+"/경고/","2차스토리.txt", sav_story)
            return
          }else{
            var saving = read_story2 + "\n" + sav_story
          
            replier.reply("상위보스 경고처리방", sav_story + "\n\n위 내용이 등록 됐어요!🐰")
            save("/메이플m/"+"/경고/","2차스토리.txt", saving) 
            return
          }
        }else{
          var del_fin_1 = read_story1.replace("🔹 " + all_out_nick + "\n" + del_story2, "")
          save("/메이플m/"+"/경고/","1차스토리.txt", del_fin_1)
        
          if(read_story2 == "No"){
            replier.reply("상위보스 경고처리방", sav_story + "\n\n위 내용이 등록 됐어요!🐰")
            save("/메이플m/"+"/경고/","2차스토리.txt", sav_story)
            return
          }else{
            var saving = read_story2 + "\n" + sav_story
          
            replier.reply("상위보스 경고처리방", sav_story + "\n\n위 내용이 등록 됐어요!🐰")
            save("/메이플m/"+"/경고/","2차스토리.txt", saving) 
            return
          }
        }   
      }else if(warning3 == false){
        replier.reply("상위보스 경고처리방", "30초가 지났네염?? ㅇ ㅅㅇ"+
        "사유를 다시 30초내로 입력해주세염! 🐰")
        warning3 = true
        java.lang.Thread.sleep(30000)
        warning3 = false
        return
      }else if(warning2 == false){
        replier.reply("상위보스 경고처리방", "30초가 지났네염?? ㅇ ㅅㅇ"+
        "사유를 다시 30초내로 입력해주세염! 🐰")
        warning2 = true
        java.lang.Thread.sleep(30000)
        warning2 = false
        return
      }
    }
    
    
    //2차 경고 닉네임
    if(msg.startsWith("!2차경고 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          out_nick_t = msg.substr(6)
      
          replier.reply("상위보스 경고처리방", "서버명을 입력해주세요!\n"+
          "20초 내로 서버 풀네임으로 입력!!🐰\n\n"+
          "ex) 2차서버 : 스카니아 🍒")
          warning1_t = true
          java.lang.Thread.sleep(20000)
          warning1_t = false
          return
        }
      }
      replier.reply("상위보스 경고처리방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    
    //경고 2차 서버
    if(msg.startsWith("2차서버 : ")){
      if(warning1_t == true){
        warning1_t = false
        var su_name_t = msg.substr(7)
        
        var out_two_t = read("/메이플m/","/경고/"+"2차스토리"+".txt")
        
        var su_nick_t = out_nick_t + "(" + su_name_t + ")"
        
        if(out_two_t.indexOf(su_nick_t)!=-1){
          replier.reply("상위보스 경고처리방", "이미 2경고로 추방당한 인원입니다!\n"+
          "닉네임과 서버를 다시 확인해주세요 ㅇ ㅅㅇ🐰")
          return
        }else{
          all_out_nick_t = su_nick_t
          replier.reply("상위보스 경고처리방", "🐰"+all_out_nick_t+" 님은 다이렉트 경고입니다.\n룰에 따라 추방해주세요!"+
          "\n추가로 사유를 30초내로 적어주세요!\n\nex) 2차사유 : 뜡부모욕죄🚫")
          
          warning2_t = true
          java.lang.Thread.sleep(30000)
          warning2_t = false
          
          return
        }
      }else{
        replier.reply("상위보스 경고처리방", "20초가 지났어염 ㅇ ㅅㅇ\n"+
        "!2차경고 부터 다시 하세염 🐰")
        warning1_t = false
        return
      }
    }
    
    
    //사유 2차 적기
    if(msg.startsWith("2차사유 : ")){
      var story1_t = msg.substr(7)
      var date = new Date()
      var real_time_t = date.getFullYear() + "년 " + (date.getMonth()+1) + "월 " + date.getDate() + "일"
      
      var sav_story_t = "🔹 " + all_out_nick_t + "\n사유 : " + story1_t + "\n등록일 : " + real_time_t
      
      if(warning2_t == true){
        warning2_t = false
        var read_story2_t = read("/메이플m/","/경고/"+"2차스토리"+".txt")
        
        if(read_story2_t == "No"){
          replier.reply("상위보스 경고처리방", sav_story_t + "\n\n위 내용이 등록 됐어요!🐰")
          save("/메이플m/"+"/경고/","2차스토리.txt", sav_story_t)
          return
        }else{
          var saving_t = read_story2_t + "\n" + sav_story_t
          
          replier.reply("상위보스 경고처리방", sav_story_t + "\n\n위 내용이 등록 됐어요!🐰")
          save("/메이플m/"+"/경고/","2차스토리.txt", saving_t) 
          return
        }
      }else if(warning2_t == false){
        replier.reply("상위보스 경고처리방", "30초가 지났네염?? ㅇ ㅅㅇ"+
        "사유를 다시 30초내로 입력해주세염! 🐰")
        warning2_t = true
        java.lang.Thread.sleep(30000)
        warning2_t = false
        return
      }
    }
    
    //경고 취소
    if(msg.startsWith("!경고취소 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var del_nick = msg.substr(6)
          var del_one = read("/메이플m/","/경고/"+"1차스토리"+".txt")
          var del_two = read("/메이플m/","/경고/"+"2차스토리"+".txt")
      
          if(del_two.indexOf(del_nick)!=-1){
            var del_two1 = del_two.split("🔹 " + del_nick)[1]
            var del_two2 = del_two1.split("🔹")[0].trim()
            var del_two3 = "🔹 " + del_nick + del_two2 + "\n"
            
            if(del_two.indexOf(del_two3)!=-1){
              var de_two = del_two.replace(del_two3, "")
        
              if(de_two.indexOf("🔹")!=-1){
                save("/메이플m/"+"/경고/","2차스토리.txt", de_two)
                replier.reply("상위보스 경고처리방", "🐰2차 경고인원\n'" +del_nick+ "' 님은 1차 경고로 바뀌었습니다! 🐰")
              }else{
                save("/메이플m/"+"/경고/","2차스토리.txt", "No")
                replier.reply("상위보스 경고처리방", "🐰2차 경고인원\n'" +del_nick+ "' 님은 1차 경고로 바뀌었습니다! 🐰")
              }
            }else{
              var de_two_1 = del_two.replace("🔹 " + del_nick + del_two2, "")
        
              if(de_two_1.indexOf("🔹")!=-1){
                save("/메이플m/"+"/경고/","2차스토리.txt", de_two_1)
                replier.reply("상위보스 경고처리방", "🐰2차 경고인원\n'" +del_nick+ "' 님은 1차 경고로 바뀌었습니다! 🐰")
              }else{
                save("/메이플m/"+"/경고/","2차스토리.txt", "No")
                replier.reply("상위보스 경고처리방", "🐰2차 경고인원\n'" +del_nick+ "' 님은 1차 경고로 바뀌었습니다! 🐰")
              }
            }
          
            if(del_one == "No"){
              save("/메이플m/"+"/경고/","1차스토리.txt", "🔹 " + del_nick + del_two2)
              return
            }else{
              var del_new_one = del_one + "\n" + "🔹 " + del_nick + del_two2
              save("/메이플m/"+"/경고/","1차스토리.txt", del_new_one)
              return
            }
          }else if(del_one.indexOf(del_nick)!=-1){
            var del_one1 = del_one.split("🔹 " + del_nick)[1]
            var del_one2 = del_one1.split("🔹")[0].trim()
            var del_one3 = "🔹 " + del_nick + del_one2 + "\n"
            
            if(del_one.indexOf(del_one3)!=-1){
              var de_one = del_one.replace(del_one3, "")
        
              if(de_one.indexOf("🔹")!=-1){
                save("/메이플m/"+"/경고/","1차스토리.txt", de_one)
                replier.reply("상위보스 경고처리방", "🐰1차 경고인원\n'" +del_nick+ "' 님을 지웠습니다!🐰")
          
                return
              }else{
                save("/메이플m/"+"/경고/","1차스토리.txt", "No")
                replier.reply("상위보스 경고처리방", "🐰1차 경고인원\n'" +del_nick+ "' 님을 지웠습니다!🐰")
          
                return
              }
            }else{
              var de_one_1 = del_one.replace("🔹 " + del_nick + del_one2, "")
        
              if(de_one_1.indexOf("🔹")!=-1){
                save("/메이플m/"+"/경고/","1차스토리.txt", de_one_1)
                replier.reply("상위보스 경고처리방", "🐰1차 경고인원\n'" +del_nick+ "' 님을 지웠습니다!🐰")
          
                return
              }else{
                save("/메이플m/"+"/경고/","1차스토리.txt", "No")
                replier.reply("상위보스 경고처리방", "🐰1차 경고인원\n'" +del_nick+ "' 님을 지웠습니다!🐰")
          
                return
              }
            }   
          }else{
            replier.reply("상위보스 경고처리방", "경고가 없는 닉네임인데요?ㅇ ㅅㅇ?🐰")
            return
          }
        }
      }
      replier.reply("상위보스 경고처리방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
        
    //2차 경고 취소
    if(msg.startsWith("!2차경고취소 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var del_nick_t = msg.substr(8)
          var del_two_t = read("/메이플m/","/경고/"+"2차스토리"+".txt")
      
          if(del_two_t.indexOf(del_nick_t)!=-1){
            var del_two1_t = del_two_t.split("🔹 " + del_nick_t)[1]
            var del_two2_t = del_two1_t.split("🔹")[0].trim()
            var del_two3_t = "🔹 " + del_nick_t + del_two2_t + "\n"
            
            if(del_two_t.indexOf(del_two3_t)!=-1){
              var de_two_t = del_two_t.replace(del_two3_t, "")
        
              if(de_two_t.indexOf("🔹")!=-1){
                save("/메이플m/"+"/경고/","2차스토리.txt", de_two_t)
                replier.reply("상위보스 경고처리방", "🐰2차 경고인원\n'" +del_nick_t+ "' 님은 다이렉트 경고 취소입니다!🐰")
                return
              }else{
                save("/메이플m/"+"/경고/","2차스토리.txt", "No")
                replier.reply("상위보스 경고처리방", "🐰2차 경고인원\n'" +del_nick_t+ "' 님은 다이렉트 경고 취소입니다!🐰")
                return
              }
            }else{
              var de_two_1_t = del_two_t.replace("🔹 " + del_nick_t + del_two2_t, "")
        
              if(de_two_1_t.indexOf("🔹")!=-1){
                save("/메이플m/"+"/경고/","2차스토리.txt", de_two_1_t)
                replier.reply("상위보스 경고처리방", "🐰2차 경고인원\n'" +del_nick_t+ "' 님은 다이렉트 경고 취소입니다!🐰")
                return
              }else{
                save("/메이플m/"+"/경고/","2차스토리.txt", "No")
                replier.reply("상위보스 경고처리방", "🐰2차 경고인원\n'" +del_nick_t+ "' 님은 다이렉트 경고 취소입니다!🐰")
                return
              }
            }
          }else{
            replier.reply("상위보스 경고처리방", "경고가 없는 닉네임인데요?ㅇ ㅅㅇ?🐰")
            return
          }
        }
      }
      replier.reply("상위보스 경고처리방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    
    //경고초기화
    if(msg == "!경고초기화"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          save("/메이플m/"+"/경고/","1차스토리.txt", "No")
          save("/메이플m/"+"/경고/","2차스토리.txt", "No")
      
          replier.reply("상위보스 경고처리방", "🐰모든 경고 명단을 초기화 했어요!")
          return
        }
      }
      replier.reply("상위보스 경고처리방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //경고인원 보기
    if(msg == "!경고리스트"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var emer1 = read("/메이플m/","/경고/"+"1차스토리"+".txt");
          var emer2 = read("/메이플m/","/경고/"+"2차스토리"+".txt");
      
          if(emer1 == "No"){
            var emer1 = ""
          }
          if(emer2 == "No"){
            var emer2 = ""
          }
      
          replier.reply("상위보스 경고처리방", "🐰경고 받은 인원 리스트 입니다!\n"+줄이기+"\n\n"+
          "⭐️1차 경고⭐️\n\n"+emer1+"\n\n⭐️2차 경고⭐️\n\n"+emer2)
      
          return
        }
      }
      replier.reply("상위보스 경고처리방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }  
    
    //추방추가(전체통제)
    if(msg.startsWith("!추방 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var by_mem_mtr = msg.substr(4)
          var by_read = read("/메이플m/","/경고/"+"추방"+".txt");
          if(by_read !== "No"){
            var plus_bye = by_read + "," + by_mem_mtr
            save("/메이플m/"+"/경고/","추방.txt", plus_bye)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","추방.txt", by_mem_mtr)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }
        }
      }
    }
     
    //추방취소
    if(msg.startsWith("!추방취소 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var can_by_mtr = msg.substr(6)
          var can_by_read = read("/메이플m/","/경고/"+"추방"+".txt");
          if(can_by_read.indexOf(can_by_mtr + ",")!=-1){
            var cancle_mem = can_by_read.replace(can_by_mtr + ",", "")
            save("/메이플m/"+"/경고/","추방.txt", cancle_mem)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)!=-1){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","추방.txt", cancle_mem2)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else if(can_by_read.indexOf(can_by_mtr)!=-1){
            var cancle_mem3 = can_by_read.replace(can_by_mtr, "No")
            save("/메이플m/"+"/경고/","추방.txt", cancle_mem3)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else{
            replier.reply("상위보스 경고처리방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
            return
          }
        }
      }
    }
    
    //추방리스트 보기
    if(msg == "!추방리스트"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var bye_mem_list = read("/메이플m/","/경고/"+"추방"+".txt")
          var by_list = bye_mem_list.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, "\n🔹 ")
          
          if(by_list == "No"){
            replier.reply("상위보스 경고처리방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 경고처리방", "추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
          return
        }
      }
    }
    
    
    //각 보스방 마다 체크 (추후 코드 통합 확인)
    //추방추가
    if(msg.startsWith("!윌추방 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var by_mem_mtr = msg.substr(5)
          var by_read = read("/메이플m/","/경고/"+"윌추방"+".txt");
          if(by_read !== "No"){
            var plus_bye = by_read + "," + by_mem_mtr
            save("/메이플m/"+"/경고/","윌추방.txt", plus_bye)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 윌방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","윌추방.txt", by_mem_mtr)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 윌방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }
        }
      }
    }
    
    if(msg.startsWith("!진힐라추방 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var by_mem_mtr = msg.substr(7)
          var by_read = read("/메이플m/","/경고/"+"진힐라추방"+".txt");
          if(by_read !== "No"){
            var plus_bye = by_read + "," + by_mem_mtr
            save("/메이플m/"+"/경고/","진힐라추방.txt", plus_bye)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 진힐라방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","진힐라추방.txt", by_mem_mtr)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 진힐라방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }
        }
      }
    }
    
    if(msg.startsWith("!카루시추방 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var by_mem_mtr = msg.substr(7)
          var by_read = read("/메이플m/","/경고/"+"카루시추방"+".txt");
          if(by_read !== "No"){
            var plus_bye = by_read + "," + by_mem_mtr
            save("/메이플m/"+"/경고/","카루시추방.txt", plus_bye)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 카루시방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","카루시추방.txt", by_mem_mtr)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 카루시방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }
        }
      }
    }
    
    if(msg.startsWith("!카윌추방 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var by_mem_mtr = msg.substr(6)
          var by_read = read("/메이플m/","/경고/"+"카윌추방"+".txt");
          if(by_read !== "No"){
            var plus_bye = by_read + "," + by_mem_mtr
            save("/메이플m/"+"/경고/","카윌추방.txt", plus_bye)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 카윌방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","카윌추방.txt", by_mem_mtr)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 카윌방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }
        }
      }
    }
    
    if(msg.startsWith("!듄켈추방 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var by_mem_mtr = msg.substr(6)
          var by_read = read("/메이플m/","/경고/"+"듄켈추방"+".txt");
          if(by_read !== "No"){
            var plus_bye = by_read + "," + by_mem_mtr
            save("/메이플m/"+"/경고/","듄켈추방.txt", plus_bye)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 듄켈방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","듄켈추방.txt", by_mem_mtr)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 듄켈방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }
        }
      }
    }
    
    if(msg.startsWith("!검마추방 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var by_mem_mtr = msg.substr(6)
          var by_read = read("/메이플m/","/경고/"+"검마추방"+".txt");
          if(by_read !== "No"){
            var plus_bye = by_read + "," + by_mem_mtr
            save("/메이플m/"+"/경고/","검마추방.txt", plus_bye)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 검마방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","검마추방.txt", by_mem_mtr)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 검마방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }
        }
      }
    }
    
    if(msg.startsWith("!세렌추방 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var by_mem_mtr = msg.substr(6)
          var by_read = read("/메이플m/","/경고/"+"세렌추방"+".txt");
          if(by_read !== "No"){
            var plus_bye = by_read + "," + by_mem_mtr
            save("/메이플m/"+"/경고/","세렌추방.txt", plus_bye)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 세렌방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","세렌추방.txt", by_mem_mtr)
            replier.reply("상위보스 경고처리방", by_mem_mtr + " 세렌방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }
        }
      }
    }
    
    //추방취소
    if(msg.startsWith("!윌추방취소 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var can_by_mtr = msg.substr(7)
          var can_by_read = read("/메이플m/","/경고/"+"윌추방"+".txt");
          if(can_by_read.indexOf(can_by_mtr + ",")!=-1){
            var cancle_mem = can_by_read.replace(can_by_mtr + ",", "")
            save("/메이플m/"+"/경고/","윌추방.txt", cancle_mem)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 윌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)!=-1){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","윌추방.txt", cancle_mem2)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 윌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else if(can_by_read.indexOf(can_by_mtr)!=-1){
            var cancle_mem3 = can_by_read.replace(can_by_mtr, "No")
            save("/메이플m/"+"/경고/","윌추방.txt", cancle_mem3)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 윌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else{
            replier.reply("상위보스 경고처리방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
            return
          }
        }
      }
    }
    
    if(msg.startsWith("!진힐라추방취소 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var can_by_mtr = msg.substr(9)
          var can_by_read = read("/메이플m/","/경고/"+"진힐라추방"+".txt");
          if(can_by_read.indexOf(can_by_mtr + ",")!=-1){
            var cancle_mem = can_by_read.replace(can_by_mtr + ",", "")
            save("/메이플m/"+"/경고/","진힐라추방.txt", cancle_mem)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 진힐라방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)!=-1){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","진힐라추방.txt", cancle_mem2)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 진힐라방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else if(can_by_read.indexOf(can_by_mtr)!=-1){
            var cancle_mem3 = can_by_read.replace(can_by_mtr, "No")
            save("/메이플m/"+"/경고/","진힐라추방.txt", cancle_mem3)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 진힐라방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else{
            replier.reply("상위보스 경고처리방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
            return
          }
        }
      }
    }
    
    if(msg.startsWith("!카루시추방취소 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var can_by_mtr = msg.substr(9)
          var can_by_read = read("/메이플m/","/경고/"+"카루시추방"+".txt");
          if(can_by_read.indexOf(can_by_mtr + ",")!=-1){
            var cancle_mem = can_by_read.replace(can_by_mtr + ",", "")
            save("/메이플m/"+"/경고/","카루시추방.txt", cancle_mem)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 카루시방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)!=-1){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","카루시추방.txt", cancle_mem2)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 카루시방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else if(can_by_read.indexOf(can_by_mtr)!=-1){
            var cancle_mem3 = can_by_read.replace(can_by_mtr, "No")
            save("/메이플m/"+"/경고/","카루시추방.txt", cancle_mem3)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 카루시방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else{
            replier.reply("상위보스 경고처리방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
            return
          }
        }
      }
    }
    
    if(msg.startsWith("!카윌추방취소 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var can_by_mtr = msg.substr(8)
          var can_by_read = read("/메이플m/","/경고/"+"카윌추방"+".txt");
          if(can_by_read.indexOf(can_by_mtr + ",")!=-1){
            var cancle_mem = can_by_read.replace(can_by_mtr + ",", "")
            save("/메이플m/"+"/경고/","카윌추방.txt", cancle_mem)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 카윌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)!=-1){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","카윌추방.txt", cancle_mem2)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 카윌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else if(can_by_read.indexOf(can_by_mtr)!=-1){
            var cancle_mem3 = can_by_read.replace(can_by_mtr, "No")
            save("/메이플m/"+"/경고/","카윌추방.txt", cancle_mem3)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 카윌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else{
            replier.reply("상위보스 경고처리방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
            return
          }
        }
      }
    }
    
    if(msg.startsWith("!듄켈추방취소 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var can_by_mtr = msg.substr(8)
          var can_by_read = read("/메이플m/","/경고/"+"듄켈추방"+".txt");
          if(can_by_read.indexOf(can_by_mtr + ",")!=-1){
            var cancle_mem = can_by_read.replace(can_by_mtr + ",", "")
            save("/메이플m/"+"/경고/","듄켈추방.txt", cancle_mem)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 듄켈방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)!=-1){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","듄켈추방.txt", cancle_mem2)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 듄켈방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else if(can_by_read.indexOf(can_by_mtr)!=-1){
            var cancle_mem3 = can_by_read.replace(can_by_mtr, "No")
            save("/메이플m/"+"/경고/","듄켈추방.txt", cancle_mem3)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 듄켈방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else{
            replier.reply("상위보스 경고처리방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
            return
          }
        }
      }
    }
    
    if(msg.startsWith("!검마추방취소 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var can_by_mtr = msg.substr(8)
          var can_by_read = read("/메이플m/","/경고/"+"검마추방"+".txt");
          if(can_by_read.indexOf(can_by_mtr + ",")!=-1){
            var cancle_mem = can_by_read.replace(can_by_mtr + ",", "")
            save("/메이플m/"+"/경고/","검마추방.txt", cancle_mem)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 검마방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)!=-1){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","검마추방.txt", cancle_mem2)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 검마방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else if(can_by_read.indexOf(can_by_mtr)!=-1){
            var cancle_mem3 = can_by_read.replace(can_by_mtr, "No")
            save("/메이플m/"+"/경고/","검마추방.txt", cancle_mem3)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 검마방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else{
            replier.reply("상위보스 경고처리방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
            return
          }
        }
      }
    }
    
    if(msg.startsWith("!세렌추방취소 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var can_by_mtr = msg.substr(8)
          var can_by_read = read("/메이플m/","/경고/"+"세렌추방"+".txt");
          if(can_by_read.indexOf(can_by_mtr + ",")!=-1){
            var cancle_mem = can_by_read.replace(can_by_mtr + ",", "")
            save("/메이플m/"+"/경고/","세렌추방.txt", cancle_mem)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 세렌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)!=-1){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","세렌추방.txt", cancle_mem2)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 세렌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else if(can_by_read.indexOf(can_by_mtr)!=-1){
            var cancle_mem3 = can_by_read.replace(can_by_mtr, "No")
            save("/메이플m/"+"/경고/","세렌추방.txt", cancle_mem3)
            replier.reply("상위보스 경고처리방", can_by_mtr + " 세렌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else{
            replier.reply("상위보스 경고처리방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
            return
          }
        }
      }
    }
     
    //추방리스트 보기
    if(msg == "!윌추방리스트"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var bye_mem_list = read("/메이플m/","/경고/"+"윌추방"+".txt")
          var by_list = bye_mem_list.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, "\n🔹 ")
          
          if(by_list == "No"){
            replier.reply("상위보스 경고처리방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 경고처리방", "윌방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
          return
        }
      }
    }
    
    if(msg == "!진힐라추방리스트"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var bye_mem_list = read("/메이플m/","/경고/"+"진힐라추방"+".txt")
          var by_list = bye_mem_list.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, "\n🔹 ")
          
          if(by_list == "No"){
            replier.reply("상위보스 경고처리방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 경고처리방", "진힐라방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
          return
        }
      }
    }
    
    if(msg == "!카루시추방리스트"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var bye_mem_list = read("/메이플m/","/경고/"+"카루시추방"+".txt")
          var by_list = bye_mem_list.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, "\n🔹 ")
          
          if(by_list == "No"){
            replier.reply("상위보스 경고처리방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 경고처리방", "카루시방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
          return
        }
      }
    }
    
    if(msg == "!카윌추방리스트"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var bye_mem_list = read("/메이플m/","/경고/"+"카윌추방"+".txt")
          var by_list = bye_mem_list.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, "\n🔹 ")
          
          if(by_list == "No"){
            replier.reply("상위보스 경고처리방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 경고처리방", "카윌방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
          return
        }
      }
    }
    
    if(msg == "!듄켈추방리스트"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var bye_mem_list = read("/메이플m/","/경고/"+"듄켈추방"+".txt")
          var by_list = bye_mem_list.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, "\n🔹 ")
          
          if(by_list == "No"){
            replier.reply("상위보스 경고처리방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 경고처리방", "듄켈방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
          return
        }
      }
    }
    
    if(msg == "!검마추방리스트"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var bye_mem_list = read("/메이플m/","/경고/"+"검마추방"+".txt")
          var by_list = bye_mem_list.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, "\n🔹 ")
          
          if(by_list == "No"){
            replier.reply("상위보스 경고처리방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 경고처리방", "검마방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
          return
        }
      }
    }
    
    if(msg == "!세렌추방리스트"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var bye_mem_list = read("/메이플m/","/경고/"+"세렌추방"+".txt")
          var by_list = bye_mem_list.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, "\n🔹 ")
          
          if(by_list == "No"){
            replier.reply("상위보스 경고처리방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 경고처리방", "세렌방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
          return
        }
      }
    }
    
    //경고내용 고지
    
    if(msg == "1차경고"){
      replier.reply("상위보스 경고처리방", "🚨1차 경고 내용은 추방은 없으나\n" +
      "경고기록은 30일 동안 유지가 되며\n" +
      "이의신청 하실 내용이 있다면\n" +
      "얼마든지 이의신청 가능하십니다!\n\n" +
      "🥕그러나 이의신청 하실 내용이 없다면\n" +
      "1차 경고로서 기록이 진행되며\n" +
      "향후 유지일 기간동안\n" +
      "추가로 경고가 누적된다면\n\n" +
      "🚫2차 경고로 진행\n" +
      "【7일 추방】 으로 진행될 수 있는 점\n\n" +
      "🐰참고하시어 주의 부탁드리며\n" +
      "내용 확인 되셨다면 방은 비워주세요!")
      return
    }
    
    if(msg == "2차경고"){
      replier.reply("상위보스 경고처리방", "🚨경고부여 및 추방은 단판으로는 판단하지 않고 복수판 이상으로 판단합니다!\n" +
      "【이유 : 환경적 요인, 실수와 같은 변수 등】\n\n" +
      "신고내용 확인 후 이의신청 필요하다면\n" +
      "얼마든지 이의신청 가능하시며\n" +
      "이의신청 하실 내용이 없다면\n\n" +
      "⚠️2차 경고로서 진행하게 됩니다.\n" +
      "【7일 추방 진행 및 경고기록 30일 유지】\n\n" +
      "추가로 경고기록 유지일(경고 후 30일)\n" +
      "이내로 추가 경고 발생할 경우엔\n" +
      "🚫【14일 / 30일 / 영구정지】\n" +
      "내용으로 올라갈 수 있기에 조심해주세요!\n\n" +
      "🚨단 연습,숙련 파티는 이용 가능합니다🚨\n\n" +
      "🐰내용 확인 되셨다면 방은 비워주세요!")
      return
    }
    
    //도움말
    if(msg == "도움말"){
  
    replier.reply("상위보스 경고처리방", "🐰토니의 사용법이에요 보세요!\n"+
    "명령어가 잘못 되었다면 반응하지 않아요\n\n"+
    "!경고 ••\n"+
    "!2차경고 ••\n"+
    "!경고취소 ••\n"+
    "!2차경고취소 ••\n"+
    "!경고초기화 (모든인원 초기화 명령어)\n"+
    "!경고리스트\n"+
    "!추방 ••\n"+
    "!추방취소 ••\n"+
    "!추방리스트\n"+
    "양식\n"+
    "1차경고, 2차경고")
    
    return
    }
    
    }catch(e){
      replier.reply("상위보스 경고처리방", "에러남 메롱 🐰")
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
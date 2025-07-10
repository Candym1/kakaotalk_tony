var scriptName = "토니 - 상위보스 통합 문의방";

/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply("상위보스 통합 문의방", message)
 * (boolean) replier.reply("상위보스 통합 문의방", room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
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
one_check_seren = []

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

//진힐라 스위치 온오프
jin_swich = true

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if(isGroupChat==true){
  if(room=="상위보스 통합 문의방"){
  try{
    
    /*
    //진힐라 스위칭
    if(msg == "진힐라 스위칭"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          if(jin_swich == true){
            jin_swich = false
            replier.reply("상위보스 통합 문의방", "🐰진힐라 2번방으로 변경 완료! ㅇ ㅅㅇ")
            return
          }else if(jin_swich == false){
            jin_swich = true
            replier.reply("상위보스 통합 문의방", "🐰진힐라 1번방으로 변경 완료! ㅇ ㅅㅇ")
            return
          }
        }
      }
    }
    */
    
    //윌 비번 설정
    if(msg.indexOf("!윌비밀번호 ")!=-1){
      if(sender.indexOf("뜡부")!=-1){
        var pass = msg.split("!윌비밀번호 ")[1]
        save("/메이플m/"+"/윌연습방/","password.txt", pass)
        replier.reply("상위보스 통합 문의방", "🐰비밀번호 "+pass+" 로 설정 완료!")
        return
      }else{
        replier.reply("상위보스 통합 문의방", "🐰뜡부 전용인데요 ㅇ ㅅㅇ??")
        return
      }
    }
    
    //진힐라 비번설정
    if(msg.indexOf("!진힐라비밀번호 ")!=-1){
      if(sender.indexOf("뜡부")!=-1){
        var pass = msg.split("!진힐라비밀번호 ")[1]
        save("/메이플m/"+"/진힐라연습방/","password.txt", pass)
        replier.reply("상위보스 통합 문의방", "🐰비밀번호 "+pass+" 로 설정 완료!")
        return
      }else{
        replier.reply("상위보스 통합 문의방", "🐰뜡부 전용인데요 ㅇ ㅅㅇ??")
        return
      }
    }
    
    //카루시,카윌 비번설정
    if(msg.indexOf("!카윌비밀번호 ")!=-1){
      if(sender.indexOf("뜡부")!=-1){
        var pass = msg.split("!카윌비밀번호 ")[1]
        save("/메이플m/"+"/카룻카윌연습방/","password.txt", pass)
        replier.reply("상위보스 통합 문의방", "🐰비밀번호 "+pass+" 로 설정 완료!")
        return
      }else{
        replier.reply("상위보스 통합 문의방", "🐰뜡부 전용인데요 ㅇ ㅅㅇ??")
        return
      }
    }
    
    //듄켈 비번설정
    if(msg.indexOf("!듄켈비밀번호 ")!=-1){
      if(sender.indexOf("뜡부")!=-1){
        var pass = msg.split("!듄켈비밀번호 ")[1]
        save("/메이플m/"+"/듄켈연습방/","password.txt", pass)
        replier.reply("상위보스 통합 문의방", "🐰비밀번호 "+pass+" 로 설정 완료!")
        return
      }else{
        replier.reply("상위보스 통합 문의방", "🐰뜡부 전용인데요 ㅇ ㅅㅇ??")
        return
      }
    }
    
    //검마 비번설정
    if(msg.indexOf("!검마비밀번호 ")!=-1){
      if(sender.indexOf("뜡부")!=-1){
        var pass = msg.split("!검마비밀번호 ")[1]
        save("/메이플m/"+"/검마연습방/","password.txt", pass)
        replier.reply("상위보스 통합 문의방", "🐰비밀번호 "+pass+" 로 설정 완료!")
        return
      }else{
        replier.reply("상위보스 통합 문의방", "🐰뜡부 전용인데요 ㅇ ㅅㅇ??")
        return
      }
    }
    
    //세렌 비번설정
    if(msg.indexOf("!세렌비밀번호 ")!=-1){
      if(sender.indexOf("뜡부")!=-1){
        var pass = msg.split("!세렌비밀번호 ")[1]
        save("/메이플m/"+"/세렌연습방/","password.txt", pass)
        replier.reply("상위보스 통합 문의방", "🐰비밀번호 "+pass+" 로 설정 완료!")
        return
      }else{
        replier.reply("상위보스 통합 문의방", "🐰뜡부 전용인데요 ㅇ ㅅㅇ??")
        return
      }
    }
    
    //경고방 다이렉트 입장
    if(msg == "경고방 입장"){
      replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/guYEJgbh")
      return
    }
    
    //보스 다이렉트 입장
    if(msg == "윌 입장" || msg == "진힐라 입장" || msg == "카윌 입장" || msg == "듄켈 입장" ||
    msg == "검마 입장" || msg == "세렌 입장"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var password_w = read("/메이플m/"+"/윌연습방/", "password.txt")
          var password_j = read("/메이플m/"+"/진힐라연습방/", "password.txt")
          var password_c = read("/메이플m/"+"/카룻카윌연습방/", "password.txt")
          var password_d = read("/메이플m/"+"/듄켈연습방/", "password.txt")
          var password_b = read("/메이플m/"+"/검마연습방/", "password.txt")
          var password_s = read("/메이플m/"+"/세렌연습방/", "password.txt")
        
          if(msg == "윌 입장"){
            replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/g1zrsmYf"
            +"\n\n🐰 안녕안녕 반가워요!"
            +"\n🍒비밀번호는 " +password_w+ " 입니다!"
            +"\n공지는 다시와도 꼭 확인 하시고!"
            +"\n\n⭐️입장되면 방 비워주세요!"+
            "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
            return
          }else if(msg == "진힐라 입장"){
            if(jin_swich == true){
              replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gxSaN5ug"
              +"\n\n🐰 안녕안녕 반가워요!"
              +"\n🍒비밀번호는 " +password_j+ " 입니다!"
              +"\n공지는 다시와도 꼭 확인 하시고!"
              +"\n\n⭐️입장되면 방 비워주세요!"+
              "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
              return
            }else if(jin_swich == false){
              replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gkmrg9bh"
              +"\n\n🐰 안녕안녕 반가워요!"
              +"\n🍒비밀번호는 " +password_j+ " 입니다!"
              +"\n공지는 다시와도 꼭 확인 하시고!"
              +"\n\n⭐️입장되면 방 비워주세요!"+
              "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
              java.lang.Thread.sleep(1500)
              replier.reply("상위보스 통합 문의방", "⚠️현재 진힐라1방은 입장 불가합니다⚠️"
              +"\n\n현재 진힐라1방은 인원수가"
              +"\n[🚨1500명 정원 만석에 근접하게 도달할 수 있는 문제] 로 인해"
              +" 일정 인원수의 여유가 남아도는 시점이 올 때까지는 입장이"
              +" 불가한 상태입니다."
              +"\n\n⚠️현재 진힐라1방과 2방은"
              +"\n명단 동기화를 통해 실시간으로 명단 공유되고 있어"
              +" 파티 구함에는 기존과 동일하니 진힐라2방으로 입장 해주세요!"
              +"\n\n🚫내용 숙지가 됐음에도 불구하고"
              +"\n진힐라1방 입장을 고집한다면 추방될 수 있습니다!")
              return
            }
          }else if(msg == "카윌 입장"){
            replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gj8jwB0g"
            +"\n\n🐰 안녕안녕 반가워요!"
            +"\n🍒비밀번호는 " +password_c+ " 입니다!"
            +"\n공지는 다시와도 꼭 확인 하시고!"
            +"\n\n⭐️입장되면 방 비워주세요!"+
            "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
            return
          }else if(msg == "듄켈 입장"){
            replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gVo0Zx5g"
            +"\n\n🐰 안녕안녕 반가워요!"
            +"\n🍒비밀번호는 " +password_d+ " 입니다!"
            +"\n공지는 다시와도 꼭 확인 하시고!"
            +"\n\n⭐️입장되면 방 비워주세요!"+
            "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
            return
          }else if(msg == "검마 입장"){
            replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/g07dHy5g"
            +"\n\n🐰 안녕안녕 반가워요!"
            +"\n🍒비밀번호는 " +password_b+ " 입니다!"
            +"\n공지는 다시와도 꼭 확인 하시고!"
            +"\n\n⭐️입장되면 방 비워주세요!"+
            "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
            return
          }else if(msg == "세렌 입장"){
            replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gcK6vuEh"
            +"\n\n🐰 안녕안녕 반가워요!"
            +"\n🍒비밀번호는 " +password_s+ " 입니다!"
            +"\n공지는 다시와도 꼭 확인 하시고!"
            +"\n\n⭐️입장되면 방 비워주세요!"+
            "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
            return
          }
        }
      }
    }
    
    //양식 보내기
    if(msg.indexOf("상위보스 통합")!=-1){
      if(sender == "오픈채팅봇"){
        replier.reply("상위보스 통합 문의방", "🐰무슨 문제가 있어서 왔나요?"+
        "\n아래 문의 내용을 보고 선택해주세요!"+
        "\n\n🥕예시 : 2번"+
        "\n\n1번 > 방입장 문의(외출복귀 포함)"+
        "\n2번 > 명단 인원 신고(숙코, 딜미 등)"+
        "\n3번 > 방내 규정위반 신고"+
        "\n4번 > 기타문의"+
        "\n\n🚫일정시간 내용이 없거나\n"+
        "보스방과 관련없는 문의 시 추방 됩니다!")
        
        return
      }
    }
    
    //양식 보내기 관리자버전
    if(msg == "전체양식"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          replier.reply("상위보스 통합 문의방", "🐰무슨 문제가 있어서 왔나요?"+
          "\n아래 문의 내용을 보고 선택해주세요!"+
          "\n\n🥕예시 : 2번"+
          "\n\n1번 > 방입장 문의(외출복귀 포함)"+
          "\n2번 > 명단 인원 신고(숙코, 딜미 등)"+
          "\n3번 > 방내 규정위반 신고"+
          "\n4번 > 기타문의"+
          "\n\n🚫일정시간 내용이 없거나\n"+
          "보스방과 관련없는 문의 시 추방 됩니다!")
          
          return
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //진힐라 입장양식
    if(msg == "진힐라 입장양식"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          replier.reply("상위보스 통합 문의방", "방입장 유저라면 양식 복사해서\n적어주세요! 양식 수정 ❌\n\n1.닉네임 :\n"+
          "2.직업 :\n"+
          "3.아케인 포스 :\n"+
          "4.템 세팅 및 스포 :\n"+
          "5.칠흑 장신구 갯수 :\n\n"+
          "➖➖🚫 지 우 지 마 세 요 🚫➖➖\n"+
          "🚫진힐라 입장 전용양식 이므로 반드시 전체 복붙해서 작성할것.")
      
          return  
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //윌 입장양식
    if(msg == "윌 입장양식"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          replier.reply("상위보스 통합 문의방", "방입장 유저라면 양식 복사해서\n적어주세요! 양식 수정 ❌\n\n1.닉네임 :\n"+
          "2.직업 :\n"+
          "3.아케인 포스 :\n"+
          "4.템 세팅 및 스포 :\n\n"+
          "➖➖🚫 지 우 지 마 세 요 🚫➖➖\n"+
          "🚫윌 입장 전용양식 이므로 반드시 전체 복붙해서 작성할것.")
      
          return
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return  
    }
    
    //카룻카윌 입장양식
    if(msg == "카윌 입장양식"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          replier.reply("상위보스 통합 문의방", "방입장 유저라면 양식 복사해서\n적어주세요! 양식 수정 ❌\n\n1.닉네임 :\n"+
          "2.직업 :\n"+
          "3.아케인 포스 :\n"+
          "4.템 세팅 및 스포 :\n"+
          "5.칠흑 장신구 갯수 :\n\n"+
          "➖➖🚫 지 우 지 마 세 요 🚫➖➖\n"+
          "🚫카루시,카윌 입장 전용양식 이므로 반드시 전체 복붙해서 작성할것.")
      
          return  
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //듄켈 입장양식
    if(msg == "듄켈 입장양식"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          replier.reply("상위보스 통합 문의방", "방입장 유저라면 양식 복사해서\n적어주세요! 양식 수정 ❌\n\n1.닉네임 :\n"+
          "2.직업 :\n"+
          "3.아케인 포스 :\n"+
          "4.템 세팅 및 스포 :\n"+
          "5.칠흑 장신구 갯수 :\n\n"+
          "➖➖🚫 지 우 지 마 세 요 🚫➖➖\n"+
          "🚫듄켈 입장 전용양식 이므로 반드시 전체 복붙해서 작성할것.")
      
          return  
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //검마 입장양식
    if(msg == "검마 입장양식"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          replier.reply("상위보스 통합 문의방", "방입장 유저라면 양식 복사해서\n적어주세요! 양식 수정 ❌\n\n1.닉네임 :\n"+
          "2.직업 :\n"+
          "3.아케인 포스 :\n"+
          "4.템 세팅 및 스포 :\n"+
          "5.칠흑 장신구 갯수 :\n\n"+
          "➖➖🚫 지 우 지 마 세 요 🚫➖➖\n"+
          "🚫검마 입장 전용양식 이므로 반드시 전체 복붙해서 작성할것.")
      
          return  
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //세렌 입장양식
    if(msg == "세렌 입장양식"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          replier.reply("상위보스 통합 문의방", "방입장 유저라면 양식 복사해서\n적어주세요! 양식 수정 ❌\n\n1.닉네임 :\n"+
          "2.직업 :\n"+
          "3.아케인 포스 :\n"+
          "4.템 세팅 및 스포 :\n"+
          "5.칠흑 장신구 갯수 :\n\n"+
          "➖➖🚫 지 우 지 마 세 요 🚫➖➖\n"+
          "🚫세렌 입장 전용양식 이므로 반드시 전체 복붙해서 작성할것.")
      
          return  
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //문의내용 선택
    if(msg == "1번" || msg == "2번" || msg == "3번" || msg == "4번" || msg == "5번"){
      if(msg == "1번"){
        var bye_mem_mtr = read("/메이플m/","/경고/"+"추방"+".txt");
        var bye_mem = bye_mem_mtr.split(",")
        //강퇴당한 사람들
        for(var w = 0; w < bye_mem.length + 1; w++){
          if(sender.indexOf(bye_mem[w])!=-1){
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n위 인원은 7일강퇴 제재 대상입니다.\n"
            +"문의사항 있다면 운영진 멘션주세요.")
            return
          }
        }
        one_check.push("ok")
        var mem_wait = read("/메이플m/"+"/윌연습방/", "문의입장.txt")
        if(mem_wait !== "No"){
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n"+
          mem_wait+" \n위 인원이 먼저 입장중입니다!"+
          "\n\n🚫입장종료 후 또는 20초 뒤에\n[1번] 을 다시 입력해주세요!!")
          return
        }else{
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n"+
          "현재 우리방은 모든 상위보스 관련"+
          "\n통합 문의방 입니다!"+
          "\n입장 하고자 하는 보스를 선택해주세요!"+
          "\n🚫 20초 내로 선택 해주세요!"+
          "\n늦었다면 1번 재입력!!"+
          "\n\n🥕예시 : 1 (숫자만)"+
          "\n\n1 > 윌"+
          "\n2 > 진힐라"+
          "\n3 > 카루시,카윌" +
          "\n4 > 듄켈" +
          "\n5 > 검마" +
          "\n6 > 세렌" +
          "\n\n🚫일정시간 내용이 없거나\n"+
          "보스방과 관련없는 문의 시 추방 됩니다!")
          save("/메이플m/"+"/윌연습방/","입장인원.txt", sender)
          
          save("/메이플m/"+"/윌연습방/","문의입장.txt", sender)
          java.lang.Thread.sleep(20000)
          save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
      
          return
        }
      }else if(msg == "2번"){
        var gomem = read("/메이플m/"+"/윌연습방/", "입장인원.txt")
        if(gomem == sender){
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n"+
          "입장문의로 하신거라면!!! \n"+
          "토니 예시대로 쓰셔야해요!!\n\n"+
          "🥕예시 : 1 ⭐️숫자만⭐️")
          return
        }else{
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
          "https://open.kakao.com/o/guYEJgbh"+
          "\n\n🐰인원 신고에 합당한 자료 준비 후에"+
          "\n경고방 입장 진행해주세요!"+
          "\n\n⚠️신고자료 기준 : 각방 공지내용 확인"+
          "\n\n🚫일정시간 내용이 없거나\n"+
          "보스방과 관련없는 문의 시 추방 됩니다!")
        
          return
        }
      }else if(msg == "3번"){
        var gomem = read("/메이플m/"+"/윌연습방/", "입장인원.txt")
        if(gomem == sender){
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n"+
          "입장문의로 하신거라면!!! \n"+
          "토니 예시대로 쓰셔야해요!!\n\n"+
          "🥕예시 : 1 ⭐️숫자만⭐️")
          return
        }else{
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
          "https://open.kakao.com/o/guYEJgbh"+
          "\n\n🐰인원 신고에 합당한 자료 준비 후에"+
          "\n경고방 입장 진행해주세요!"+
          "\n\n⚠️신고자료 기준 : 각방 공지내용 확인"+
          "\n\n🚫일정시간 내용이 없거나\n"+
          "보스방과 관련없는 문의 시 추방 됩니다!")
          
          return
        }
      }else if(msg == "4번"){
        var gomem = read("/메이플m/"+"/윌연습방/", "입장인원.txt")
        if(gomem == sender){
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
          "입장문의로 하신거라면!!! \n"+
          "토니 예시대로 쓰셔야해요!!\n\n"+
          "🥕예시 : 1 ⭐️숫자만⭐️")
          return
        }else{
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
          "기타문의를 선택 하셨군요!"+
          "\n\n방입장 방법으로 선택하신 거라면"+
          "\n[1번] 으로 입력해서 진행해주세요!"+
          "\n\n⚠️ 기타문의는 보스방과 관련된"+
          "\n기타문의만 받고 있습니다!"+
          "\n\n🚨[문의내용 상세히 작성 후에]"+
          "\n멘션자 멘션 후 답장 기다려주세요!"+
          "\n\n🍎 1순위 멘션자 : 뜡부"+
          "\n🍎 2순위 멘션자 : 겸댕, 제티, 꿀잠, 꺼짐"+
          "\n\n🚫일정시간 내용이 없거나\n"+
          "보스방과 관련없는 문의 시 추방 됩니다!")
          
          return
        }
      }else if(msg == "5번"){
        var gomem = read("/메이플m/"+"/윌연습방/", "입장인원.txt")
        if(gomem == sender){
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
          "입장문의로 하신거라면!!! \n"+
          "토니 예시대로 쓰셔야해요!!\n\n"+
          "🥕예시 : 1 ⭐️숫자만⭐️")
          return
        }
      }
    }
    
    //방입장 양식 제공
    if(msg == "1" || msg == "2" || msg == "3" || msg == "4" || msg == "5" || msg == "6"){
      save("/메이플m/"+"/윌연습방/","입장인원.txt", "No")
      if(one_check.indexOf("ok")!=-1){
        one_check = []
        var member = read("/메이플m/"+"/윌연습방/", "문의입장.txt")
        if(msg == "1"){
          if(member == sender){
            one_check2.push("ok")
            one_check_weel.push("ok")
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "외출복귀 유저라면 외출복귀"+
            "\n\n방입장 유저라면 양식 복사해서\n적어주세요! 양식 수정 ❌\n\n1.닉네임 :\n"+
            "2.직업 :\n"+
            "3.아케인 포스 :\n"+
            "4.템 세팅 및 스포 :\n\n"+
            "➖➖🚫 지 우 지 마 세 요 🚫➖➖\n"+
            "🚫윌 입장 전용양식 이므로 반드시 전체 복붙해서 작성할것.")
            java.lang.Thread.sleep(2000)
            replier.reply("상위보스 통합 문의방", "🥕 인증 예시 방법 🥕\n\n"+
            "⚠️ 카톡 프로필명을 본캐로 간주\n"+
            ": 작성 닉네임과 카톡 프로필명이 동일해야 입장 가능\n"+
            "⚠️ 본캐 스펙 안되지만 대리컨자 입장\n"+
            ": [대리컨인증] 입력\n\n"+
            "https://ibb.co/hDdPDHx")
            save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
            java.lang.Thread.sleep(20000)
            one_check_weel = []
            
            return
          }else if(member == "No"){
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "이런... 고민이 너무 길었어요!"+
            "\n20초가 지나 1번 부터 다시 입력해주세요!")
            return
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "첫문의 프로필명이랑 다르네요??"+
            "\n다시 1번 부터 입력해주세요!")
          
            save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
      
            return
          }
        }else if(msg == "2"){
          if(member == sender){
            one_check2.push("ok")
            one_check_jin.push("ok")
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "외출복귀 유저라면 외출복귀"+
            "\n\n방입장 유저라면 양식 복사해서\n적어주세요! 양식 수정 ❌\n\n1.닉네임 :\n"+
            "2.직업 :\n"+
            "3.아케인 포스 :\n"+
            "4.템 세팅 및 스포 :\n"+
            "5.칠흑 장신구 갯수 :\n\n"+
            "➖➖🚫 지 우 지 마 세 요 🚫➖➖\n"+
            "🚫진힐라 입장 전용양식 이므로 반드시 전체 복붙해서 작성할것.")
            java.lang.Thread.sleep(2000)
            replier.reply("상위보스 통합 문의방", "🥕 인증 예시 방법 🥕\n\n"+
            "⚠️ 카톡 프로필명을 본캐로 간주\n"+
            ": 작성 닉네임과 카톡 프로필명이 동일해야 입장 가능\n"+
            "⚠️ 본캐 스펙 안되지만 대리컨자 입장\n"+
            ": [대리컨인증] 입력\n\n"+
            "https://ibb.co/hDdPDHx")
            save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
            java.lang.Thread.sleep(20000)
            one_check_jin = []
            
            return
          }else if(member == "No"){
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "이런... 고민이 너무 길었어요!"+
            "\n20초가 지나 1번 부터 다시 입력해주세요!")
            return
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "첫문의 프로필명이랑 다르네요??"+
            "\n다시 1번 부터 입력해주세요!")
          
            save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
      
            return
          }
        }else if(msg == "3"){
          if(member == sender){
            one_check2.push("ok")
            one_check_cr.push("ok")
          
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "외출복귀 유저라면 외출복귀"+
            "\n\n방입장 유저라면 양식 복사해서\n적어주세요! 양식 수정 ❌\n\n1.닉네임 :\n"+
            "2.직업 :\n"+
            "3.아케인 포스 :\n"+
            "4.템 세팅 및 스포 :\n"+
            "5.칠흑 장신구 갯수 :\n\n"+
            "➖➖🚫 지 우 지 마 세 요 🚫➖➖\n"+
            "🚫카루시,카윌 입장 전용양식 이므로 반드시 전체 복붙해서 작성할것.")
            java.lang.Thread.sleep(2000)
            replier.reply("상위보스 통합 문의방", "🥕 인증 예시 방법 🥕\n\n"+
            "⚠️ 카톡 프로필명을 본캐로 간주\n"+
            ": 작성 닉네임과 카톡 프로필명이 동일해야 입장 가능\n"+
            "⚠️ 본캐 스펙 안되지만 대리컨자 입장\n"+
            ": [대리컨인증] 입력\n\n"+
            "https://ibb.co/hDdPDHx")
            save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
            java.lang.Thread.sleep(20000)
            one_check_cr = []
            
            return
          }else if(member == "No"){
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
            "이런... 고민이 너무 길었어요!"+
            "\n20초가 지나 1번 부터 다시 입력해주세요!")
            return
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
            "첫문의 프로필명이랑 다르네요??"+
            "\n다시 1번 부터 입력해주세요!")
          
            save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
      
            return
          }
        }else if(msg == "4"){
          if(member == sender){
            one_check2.push("ok")
            one_check_dun.push("ok")
            
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
            "외출복귀 유저라면 외출복귀"+
            "\n\n방입장 유저라면 양식 복사해서\n적어주세요! 양식 수정 ❌\n\n1.닉네임 :\n"+
            "2.직업 :\n"+
            "3.아케인 포스 :\n"+
            "4.템 세팅 및 스포 :\n"+
            "5.칠흑 장신구 갯수 :\n\n"+
            "➖➖🚫 지 우 지 마 세 요 🚫➖➖\n"+
            "🚫듄켈 입장 전용양식 이므로 반드시 전체 복붙해서 작성할것.")
            java.lang.Thread.sleep(2000)
            replier.reply("상위보스 통합 문의방", "🥕 인증 예시 방법 🥕\n\n"+
            "⚠️ 카톡 프로필명을 본캐로 간주\n"+
            ": 작성 닉네임과 카톡 프로필명이 동일해야 입장 가능\n"+
            "⚠️ 본캐 스펙 안되지만 대리컨자 입장\n"+
            ": [대리컨인증] 입력\n\n"+
            "https://ibb.co/hDdPDHx")
            save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
            java.lang.Thread.sleep(20000)
            one_check_dun = []
            
            return
          }else if(member == "No"){
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
            "이런... 고민이 너무 길었어요!"+
            "\n20초가 지나 1번 부터 다시 입력해주세요!")
            return
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "첫문의 프로필명이랑 다르네요??"+
            "\n다시 1번 부터 입력해주세요!")
          
            save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
      
            return
          }
        }else if(msg == "5"){
          if(member == sender){
            one_check2.push("ok")
            one_check_black.push("ok")
            
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
            "외출복귀 유저라면 외출복귀"+
            "\n\n방입장 유저라면 양식 복사해서\n적어주세요! 양식 수정 ❌\n\n1.닉네임 :\n"+
            "2.직업 :\n"+
            "3.아케인 포스 :\n"+
            "4.템 세팅 및 스포 :\n"+
            "5.칠흑 장신구 갯수 :\n\n"+
            "➖➖🚫 지 우 지 마 세 요 🚫➖➖\n"+
            "🚫검마 입장 전용양식 이므로 반드시 전체 복붙해서 작성할것.")
            java.lang.Thread.sleep(2000)
            replier.reply("상위보스 통합 문의방", "🥕 인증 예시 방법 🥕\n\n"+
            "⚠️ 카톡 프로필명을 본캐로 간주\n"+
            ": 작성 닉네임과 카톡 프로필명이 동일해야 입장 가능\n"+
            "⚠️ 본캐 스펙 안되지만 대리컨자 입장\n"+
            ": [대리컨인증] 입력\n\n"+
            "https://ibb.co/hDdPDHx")
            save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
            java.lang.Thread.sleep(20000)
            one_check_black = []
            
            return
          }else if(member == "No"){
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "이런... 고민이 너무 길었어요!"+
            "\n20초가 지나 1번 부터 다시 입력해주세요!")
            return
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
            "첫문의 프로필명이랑 다르네요??"+
            "\n다시 1번 부터 입력해주세요!")
          
            save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
      
            return
          }
        }else if(msg == "6"){
          if(member == sender){
            one_check2.push("ok")
            one_check_seren.push("ok")
            
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
            "외출복귀 유저라면 외출복귀"+
            "\n\n방입장 유저라면 양식 복사해서\n적어주세요! 양식 수정 ❌\n\n1.닉네임 :\n"+
            "2.직업 :\n"+
            "3.아케인 포스 :\n"+
            "4.템 세팅 및 스포 :\n"+
            "5.칠흑 장신구 갯수 :\n\n"+
            "➖➖🚫 지 우 지 마 세 요 🚫➖➖\n"+
            "🚫세렌 입장 전용양식 이므로 반드시 전체 복붙해서 작성할것.")
            java.lang.Thread.sleep(2000)
            replier.reply("상위보스 통합 문의방", "🥕 인증 예시 방법 🥕\n\n"+
            "⚠️ 카톡 프로필명을 본캐로 간주\n"+
            ": 작성 닉네임과 카톡 프로필명이 동일해야 입장 가능\n"+
            "⚠️ 본캐 스펙 안되지만 대리컨자 입장\n"+
            ": [대리컨인증] 입력\n\n"+
            "https://ibb.co/hDdPDHx")
            save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
            java.lang.Thread.sleep(20000)
            one_check_seren = []
            
            return
          }else if(member == "No"){
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "이런... 고민이 너무 길었어요!"+
            "\n20초가 지나 1번 부터 다시 입력해주세요!")
            return
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
            "첫문의 프로필명이랑 다르네요??"+
            "\n다시 1번 부터 입력해주세요!")
          
            save("/메이플m/"+"/윌연습방/","문의입장.txt", "No")
      
            return
          }
        }
      }
    }
    
    //대리컨인증
    if(msg == "대리컨인증"){
      replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
      "🥕 내용 준비 후 뜡부 및 운영진 멘션🥕\n\n"+
      "1. 대리컨 접속, 본캐 닉네임 채팅 스크린샷\n"+
      "2. 대리컨 계정 스펙 스크린샷\n\n"+
      "🚫 방내에서 문제 발생 시\n[대리컨 계정 + 대리컨자]\n"+
      "둘다 경고처리 되므로 주의\n\n"+
      "https://ibb.co/D5vd39N")
      return
    }
      
    //외출복귀
    if(msg == "외출복귀"){
      if(one_check2.indexOf("ok")!=-1){
        one_check2 = []
        var out_mem = read("/메이플m/"+"/윌연습방/", "외출.txt")
        var out_mem_2 = read("/메이플m/"+"/진힐라연습방/", "외출.txt")
        var out_mem_3 = read("/메이플m/"+"/아칸연습방/", "외출.txt")
        var out_mem_4 = read("/메이플m/"+"/카룻카윌연습방/", "외출.txt")
        var out_mem_5 = read("/메이플m/"+"/듄켈연습방/", "외출.txt")
        var out_mem_6 = read("/메이플m/"+"/검마연습방/", "외출.txt")
        var out_mem_7 = read("/메이플m/"+"/세렌연습방/", "외출.txt")
        
        if(one_check_weel.indexOf("ok")!=-1){
          one_check_weel = []
          if(out_mem.indexOf(sender)!=-1){
            var password = read("/메이플m/"+"/윌연습방/", "password.txt")
            replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/g1zrsmYf"
            +"\n\n🐰 "+sender+" 반가워요!"
            +"\n🍒비밀번호는 " +password+ " 입니다!"
            +"\n공지는 다시와도 꼭 확인 하시고!"
            +"\n\n⭐️입장되면 방 비워주세요!"+
            "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
        
            var de_out_nick = sender + ","
            if(out_mem.indexOf(de_out_nick)!=-1){
              var de_out = out_mem.replace(de_out_nick, "")
              save("/메이플m/"+"/윌연습방/","외출.txt", de_out)
              return
            }else{
              var de2_out = out_mem.replace("," + sender, "")
              save("/메이플m/"+"/윌연습방/","외출.txt", de2_out)
              return
            }
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "외출자 명단에 없네요!"+
            "\n양식대로 다시 작성해주세요!!"+
            "\n\n🍎외출 전 [외출] 이라고 작성 후 나가셔야"+
            " 외출자 명단에 등록되십니다!")
            return
          }
        }else if(one_check_jin.indexOf("ok")!=-1){
          one_check_jin = []
          if(out_mem_2.indexOf(sender)!=-1){
            var password = read("/메이플m/"+"/진힐라연습방/", "password.txt")
            if(jin_swich == true){
              replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gxSaN5ug"
              +"\n\n🐰 "+sender+" 반가워요!"
              +"\n🍒비밀번호는 " +password+ " 입니다!"
              +"\n공지는 다시와도 꼭 확인 하시고!"
              +"\n\n⭐️입장되면 방 비워주세요!"+
              "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            }else if(jin_swich == false){
              replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gkmrg9bh"
              +"\n\n🐰 "+sender+" 반가워요!"
              +"\n🍒비밀번호는 " +password+ " 입니다!"
              +"\n공지는 다시와도 꼭 확인 하시고!"
              +"\n\n⭐️입장되면 방 비워주세요!"+
              "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
              java.lang.Thread.sleep(1500)
              replier.reply("상위보스 통합 문의방", "⚠️현재 진힐라1방은 입장 불가합니다⚠️"
              +"\n\n현재 진힐라1방은 인원수가"
              +"\n[🚨1500명 정원 만석에 근접하게 도달할 수 있는 문제] 로 인해"
              +" 일정 인원수의 여유가 남아도는 시점이 올 때까지는 입장이"
              +" 불가한 상태입니다."
              +"\n\n⚠️현재 진힐라1방과 2방은"
              +"\n명단 동기화를 통해 실시간으로 명단 공유되고 있어"
              +" 파티 구함에는 기존과 동일하니 진힐라2방으로 입장 해주세요!"
              +"\n\n🚫내용 숙지가 됐음에도 불구하고"
              +"\n진힐라1방 입장을 고집한다면 추방될 수 있습니다!")
            }
        
            var de_out_nick = sender + ","
            if(out_mem_2.indexOf(de_out_nick)!=-1){
              var de_out = out_mem_2.replace(de_out_nick, "")
              save("/메이플m/"+"/진힐라연습방/","외출.txt", de_out)
              return
            }else{
              var de2_out = out_mem_2.replace("," + sender, "")
              save("/메이플m/"+"/진힐라연습방/","외출.txt", de2_out)
              return
            }
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
            "외출자 명단에 없네요!"+
            "\n양식대로 다시 작성해주세요!!"+
            "\n\n🍎외출 전 [외출] 이라고 작성 후 나가셔야"+
            " 외출자 명단에 등록되십니다!")
            return
          }
        }else if(one_check_cr.indexOf("ok")!=-1){
          one_check_cr = []
          if(out_mem_4.indexOf(sender)!=-1){
            var password = read("/메이플m/"+"/카룻카윌연습방/", "password.txt")
            replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gj8jwB0g"
            +"\n\n🐰 "+sender+" 반가워요!"
            +"\n🍒비밀번호는 " +password+ " 입니다!"
            +"\n공지는 다시와도 꼭 확인 하시고!"
            +"\n\n⭐️입장되면 방 비워주세요!"+
            "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
        
            var de_out_nick = sender + ","
            if(out_mem_4.indexOf(de_out_nick)!=-1){
              var de_out = out_mem_4.replace(de_out_nick, "")
              save("/메이플m/"+"/카룻카윌연습방/","외출.txt", de_out)
              return
            }else{
              var de2_out = out_mem_4.replace("," + sender, "")
              save("/메이플m/"+"/카룻카윌연습방/","외출.txt", de2_out)
              return
            }
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
            "외출자 명단에 없네요!"+
            "\n양식대로 다시 작성해주세요!!"+
            "\n\n🍎외출 전 [외출] 이라고 작성 후 나가셔야"+
            " 외출자 명단에 등록되십니다!")
            return
          }
        }else if(one_check_dun.indexOf("ok")!=-1){
          one_check_dun = []
          if(out_mem_5.indexOf(sender)!=-1){
            var password = read("/메이플m/"+"/듄켈연습방/", "password.txt")
            replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gVo0Zx5g"
            +"\n\n🐰 "+sender+" 반가워요!"
            +"\n🍒비밀번호는 " +password+ " 입니다!"
            +"\n공지는 다시와도 꼭 확인 하시고!"
            +"\n\n⭐️입장되면 방 비워주세요!"+
            "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
        
            var de_out_nick = sender + ","
            if(out_mem_5.indexOf(de_out_nick)!=-1){
              var de_out = out_mem_5.replace(de_out_nick, "")
              save("/메이플m/"+"/듄켈연습방/","외출.txt", de_out)
              return
            }else{
              var de2_out = out_mem_5.replace("," + sender, "")
              save("/메이플m/"+"/듄켈연습방/","외출.txt", de2_out)
              return
            }
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
            "외출자 명단에 없네요!"+
            "\n양식대로 다시 작성해주세요!!"+
            "\n\n🍎외출 전 [외출] 이라고 작성 후 나가셔야"+
            " 외출자 명단에 등록되십니다!")
            return
          }
        }else if(one_check_black.indexOf("ok")!=-1){
          one_check_black = []
          if(out_mem_6.indexOf(sender)!=-1){
            var password = read("/메이플m/"+"/검마연습방/", "password.txt")
            replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/g07dHy5g"
            +"\n\n🐰 "+sender+" 반가워요!"
            +"\n🍒비밀번호는 " +password+ " 입니다!"
            +"\n공지는 다시와도 꼭 확인 하시고!"
            +"\n\n⭐️입장되면 방 비워주세요!"+
            "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
        
            var de_out_nick = sender + ","
            if(out_mem_6.indexOf(de_out_nick)!=-1){
              var de_out = out_mem_6.replace(de_out_nick, "")
              save("/메이플m/"+"/검마연습방/","외출.txt", de_out)
              return
            }else{
              var de2_out = out_mem_6.replace("," + sender, "")
              save("/메이플m/"+"/검마연습방/","외출.txt", de2_out)
              return
            }
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "외출자 명단에 없네요!"+
            "\n양식대로 다시 작성해주세요!!"+
            "\n\n🍎외출 전 [외출] 이라고 작성 후 나가셔야"+
            " 외출자 명단에 등록되십니다!")
            return
          }
        }else if(one_check_seren.indexOf("ok")!=-1){
          one_check_seren = []
          if(out_mem_7.indexOf(sender)!=-1){
            var password = read("/메이플m/"+"/세렌연습방/", "password.txt")
            replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gcK6vuEh"
            +"\n\n🐰 "+sender+" 반가워요!"
            +"\n🍒비밀번호는 " +password+ " 입니다!"
            +"\n공지는 다시와도 꼭 확인 하시고!"
            +"\n\n⭐️입장되면 방 비워주세요!"+
            "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
        
            var de_out_nick = sender + ","
            if(out_mem_6.indexOf(de_out_nick)!=-1){
              var de_out = out_mem_7.replace(de_out_nick, "")
              save("/메이플m/"+"/세렌연습방/","외출.txt", de_out)
              return
            }else{
              var de2_out = out_mem_7.replace("," + sender, "")
              save("/메이플m/"+"/세렌연습방/","외출.txt", de2_out)
              return
            }
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "외출자 명단에 없네요!"+
            "\n양식대로 다시 작성해주세요!!"+
            "\n\n🍎외출 전 [외출] 이라고 작성 후 나가셔야"+
            " 외출자 명단에 등록되십니다!")
            return
          }
        }else{
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
          "시간이 너무 지연됐어요!!\n[1번]부터 다시 하세요!🐰")
          return
        }
      }
    }
    
    
    
    //윌양식 검증과정
    if(msg.indexOf("🚫윌 입장 전용양식")!=-1){
      if(msg.indexOf("닉네임 :")!=-1){
        var passw = read("/메이플m/"+"/윌연습방/", "password.txt")
        var s_nick = msg.split(":")[1]
        var s_nick2 = msg.substring(msg.indexOf(s_nick), msg.indexOf("2.직업"))
        var s_nick3 = s_nick2.replace(/\s/g, '')
        
        var s_fos = msg.split("3.아케인 포스 :")[1]
        var s_fos2 = msg.substring(msg.indexOf(s_fos), msg.indexOf("4.템 세팅"))
        var s_fos3 = s_fos2.replace(/[^0-9]/g, '')
        
        if(fos_level > s_fos3){
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
          "윌 기본 포스가 700입니다!"
          +"\n때문에 포스 제한으로 입장 불가하며\n"+
          "포스를 입력 안했다면 다시 입력하거나\n"+
          "잘못 입력했다면 다시 적어주세요\n"+
          "ex) 3.아케인 포스 : 1050 (숫자만)"
          +"\n\n이외에 다른 문의사항은"+
          "\n운영진 멘션 주세요!🐰")
          return
        }else{
          if(sender.indexOf(s_nick3)!=-1){
            replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/g1zrsmYf"
            +"\n\n🐰반가워요! "+sender
            +"\n🍒윌방 비밀번호는 "+ passw +" 입니다!"
            +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
            +"\n공지 미확인으로 인한 불이익에 대해선"
            +"\n책임지지 않습니다!"
            +"\n\n⭐️입장하면 방은 비워주세요!"+
            "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
            return
          }else{
            replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
            "🚫본인계정으로만 방입장 가능합니다!"
            +"\n\n⚠️ 카톡 프로필명을 본캐로 간주"
            +"\n: 아래 예시 사진을 보고 다시 입력"
            +"\n(작성 닉네임과 카톡 프로필명이 동일해야 입장 가능)"
            +"\n\n⚠️ 본캐가 아닌 대리컨자 입장"
            +"\n: [대리컨인증] 으로 입력! 🐰"
            +"\n\nhttps://ibb.co/hDdPDHx")
            return
          }
        }
      }
    }
    
    //진힐라양식 검증과정
    if(msg.indexOf("🚫진힐라 입장 전용양식")!=-1){
      if(msg.indexOf("닉네임 :")!=-1){
        var passw = read("/메이플m/"+"/진힐라연습방/", "password.txt")
        var s_nick = msg.split(":")[1]
        var s_nick2 = msg.substring(msg.indexOf(s_nick), msg.indexOf("2.직업"))
        var s_nick3 = s_nick2.replace(/\s/g, '')
        
        var s_fos = msg.split("3.아케인 포스 :")[1]
        var s_fos2 = msg.substring(msg.indexOf(s_fos), msg.indexOf("4.템 세팅"))
        var s_fos3 = s_fos2.replace(/[^0-9]/g, '')
        
        var item_set = msg.split("4.템 세팅 및 스포 :")[1]
        var item_set2 = msg.substring(msg.indexOf(item_set), msg.indexOf("5.칠흑 장신구"))
        var item_set3 = item_set2.replace(/\s/g, '')
        
        item_name = ["7앱", "2아케인", "2앜", "4아케인", "4앜", "1앜", "1아케인", "3앜", "3아케인",
        "5앜", "5아케인", "6앜", "6아케인", "7앜", "7아케인"]
        
        if(880 > s_fos3){
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
          "진힐라 기본 포스가 880입니다!"
          +"\n때문에 포스 제한으로 입장 불가하며\n"+
          "포스를 입력 안했다면 다시 입력하거나\n"+
          "잘못 입력했다면 다시 적어주세요\n"+
          "ex) 3.아케인 포스 : 1050 (숫자만)"
          +"\n\n이외에 다른 문의사항은"+
          "\n운영진 멘션 주세요!🐰")
          return
        }else{
          for(var a = 0; a < item_name.length; a++){
            if(item_set3.indexOf(item_name[a])!=-1){
              if(item_name[a] == "7앱"){
                if(item_set3.indexOf("풀")!=-1 || item_set3.indexOf("280")!=-1){
                  if(sender.indexOf(s_nick3)!=-1){
                    if(jin_swich == true){
                      replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gxSaN5ug"
                      +"\n\n🐰반가워요! "+sender
                      +"\n🍒진힐라 비밀번호는 "+ passw +" 입니다!"
                      +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
                      +"\n공지 미확인으로 인한 불이익에 대해선"
                      +"\n책임지지 않습니다!"
                      +"\n\n⭐️입장하면 방은 비워주세요!"+
                      "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
                      return
                    }else if(jin_swich == false){
                      replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gkmrg9bh"
                      +"\n\n🐰반가워요! "+sender
                      +"\n🍒진힐라 비밀번호는 "+ passw +" 입니다!"
                      +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
                      +"\n공지 미확인으로 인한 불이익에 대해선"
                      +"\n책임지지 않습니다!"
                      +"\n\n⭐️입장하면 방은 비워주세요!"+
                      "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
                      java.lang.Thread.sleep(1500)
                      replier.reply("상위보스 통합 문의방", "⚠️현재 진힐라1방은 입장 불가합니다⚠️"
                      +"\n\n현재 진힐라1방은 인원수가"
                      +"\n[🚨1500명 정원 만석에 근접하게 도달할 수 있는 문제] 로 인해"
                      +" 일정 인원수의 여유가 남아도는 시점이 올 때까지는 입장이"
                      +" 불가한 상태입니다."
                      +"\n\n⚠️현재 진힐라1방과 2방은"
                      +"\n명단 동기화를 통해 실시간으로 명단 공유되고 있어"
                      +" 파티 구함에는 기존과 동일하니 진힐라2방으로 입장 해주세요!"
                      +"\n\n🚫내용 숙지가 됐음에도 불구하고"
                      +"\n진힐라1방 입장을 고집한다면 추방될 수 있습니다!")
                      return
                    }
                  }else{
                    replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
                    "🚫본인계정으로만 방입장 가능합니다!"
                    +"\n\n⚠️ 카톡 프로필명을 본캐로 간주"
                    +"\n: 아래 예시 사진을 보고 다시 입력"
                    +"\n(작성 닉네임과 카톡 프로필명이 동일해야 입장 가능)"
                    +"\n\n⚠️ 본캐가 아닌 대리컨자 입장"
                    +"\n: [대리컨인증] 으로 입력! 🐰"
                    +"\n\nhttps://ibb.co/hDdPDHx")
            
                    return
                  }
                }else{
                  replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
                  "7앱은 풀스포만 입장 가능해요!\n"+
                  "\nex)풀스포 또는 280스포\n"+
                  "\n이외에 다른 문의사항은\n"+
                  "운영진 멘션 주세요!🐰")
                  return
                }
              }else{//2아케인 이상
                if(sender.indexOf(s_nick3)!=-1){
                  if(jin_swich == true){
                    replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gxSaN5ug"
                    +"\n\n🐰반가워요! "+sender
                    +"\n🍒진힐라 비밀번호는 "+ passw +" 입니다!"
                    +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
                    +"\n공지 미확인으로 인한 불이익에 대해선"
                    +"\n책임지지 않습니다!"
                    +"\n\n⭐️입장하면 방은 비워주세요!"+
                    "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
                    return
                  }else if(jin_swich == false){
                    replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gkmrg9bh"
                    +"\n\n🐰반가워요! "+sender
                    +"\n🍒진힐라 비밀번호는 "+ passw +" 입니다!"
                    +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
                    +"\n공지 미확인으로 인한 불이익에 대해선"
                    +"\n책임지지 않습니다!"
                    +"\n\n⭐️입장하면 방은 비워주세요!"+
                    "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
                    java.lang.Thread.sleep(1500)
                    replier.reply("상위보스 통합 문의방", "⚠️현재 진힐라1방은 입장 불가합니다⚠️"
                    +"\n\n현재 진힐라1방은 인원수가"
                    +"\n[🚨1500명 정원 만석에 근접하게 도달할 수 있는 문제] 로 인해"
                    +" 일정 인원수의 여유가 남아도는 시점이 올 때까지는 입장이"
                    +" 불가한 상태입니다."
                    +"\n\n⚠️현재 진힐라1방과 2방은"
                    +"\n명단 동기화를 통해 실시간으로 명단 공유되고 있어"
                    +" 파티 구함에는 기존과 동일하니 진힐라2방으로 입장 해주세요!"
                    +"\n\n🚫내용 숙지가 됐음에도 불구하고"
                    +"\n진힐라1방 입장을 고집한다면 추방될 수 있습니다!")
                    return
                  }
                }else{
                  replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
                  "🚫본인계정으로만 방입장 가능합니다!"
                  +"\n\n⚠️ 카톡 프로필명을 본캐로 간주"
                  +"\n: 아래 예시 사진을 보고 다시 입력"
                  +"\n(작성 닉네임과 카톡 프로필명이 동일해야 입장 가능)"
                  +"\n\n⚠️ 본캐가 아닌 대리컨자 입장"
                  +"\n: [대리컨인증] 으로 입력! 🐰"
                  +"\n\nhttps://ibb.co/hDdPDHx")
                  return
                }
              } 
            }
          }
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
          "진힐라 부터는 7앱솔 이상부터 가능하며"+
          " 조건에 맞았음에도 해당 문구가 보인다면 "+
          "예시처럼 다시 작성 해주세요!\n\n"+
          "ex) 4.템 세팅 및 스포 : 5앱2아케인(or 2앜)"+
          "\n\n이외에 다른 문의사항은\n"+
          "운영진 멘션 주세요!🐰")
              
          return   
          
        }
      }
    }
    
    //카루시,카윌 양식 검증과정
    if(msg.indexOf("🚫카루시,카윌 입장 전용양식")!=-1){
      if(msg.indexOf("닉네임 :")!=-1){
        var passw = read("/메이플m/"+"/카룻카윌연습방/", "password.txt")
        var s_nick = msg.split(":")[1]
        var s_nick2 = msg.substring(msg.indexOf(s_nick), msg.indexOf("2.직업"))
        var s_nick3 = s_nick2.replace(/\s/g, '')
        
        var s_fos = msg.split("3.아케인 포스 :")[1]
        var s_fos2 = msg.substring(msg.indexOf(s_fos), msg.indexOf("4.템 세팅"))
        var s_fos3 = s_fos2.replace(/[^0-9]/g, '')
        
        var item_set = msg.split("4.템 세팅 및 스포 :")[1]
        var item_set2 = msg.substring(msg.indexOf(item_set), msg.indexOf("5.칠흑 장신구"))
        var item_set3 = item_set2.replace(/\s/g, '')
        
        var sendtem = msg.split("5.칠흑 장신구 갯수 :")[1]
        var sendtem2 = msg.substring(msg.indexOf(sendtem), msg.indexOf("➖➖🚫"))
        var sendtem3 = sendtem2.replace(/[^0-9]/g, '')
        
        //포스 확인
        if(880 > s_fos3){
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
          "카루시,카윌 기본 포스가 880입니다!"
          +"\n때문에 포스 제한으로 입장 불가하며\n"+
          "포스를 입력 안했다면 다시 입력하거나\n"+
          "잘못 입력했다면 다시 적어주세요\n"+
          "ex) 3.아케인 포스 : 1050 (숫자만)"
          +"\n\n이외에 다른 문의사항은"+
          "\n운영진 멘션 주세요!🐰")
          return
        }
        
        item_name = ["2아케인", "2앜", "4아케인", "4앜", "3앜", "3아케인", "5앜", "5아케인", "6앜", "6아케인", "7앜", "7아케인"]
        
        // 템셋팅 확인
        for(var a = 0; a < item_name.length; a++){
          if(item_set3.indexOf(item_name[a])!=-1){
            if(item_name[a] == "2아케인" || item_name[a] == "2앜"){
              //if(item_set3.indexOf("풀")!=-1 || item_set3.indexOf("105")!=-1){
                if(4 <= sendtem3){
                  if(sender.indexOf(s_nick3)!=-1){
                    replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gj8jwB0g"
                    +"\n\n🐰반가워요! "+sender
                    +"\n🍒카루시,카윌 비밀번호는 "+ passw +" 입니다!"
                    +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
                    +"\n공지 미확인으로 인한 불이익에 대해선"
                    +"\n책임지지 않습니다!"
                    +"\n\n⭐️입장하면 방은 비워주세요!"+
                    "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
                    return
                  }else{
                    replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
                    "🚫본인계정으로만 방입장 가능합니다!"
                    +"\n\n⚠️ 카톡 프로필명을 본캐로 간주"
                    +"\n: 아래 예시 사진을 보고 다시 입력"
                    +"\n(작성 닉네임과 카톡 프로필명이 동일해야 입장 가능)"
                    +"\n\n⚠️ 본캐가 아닌 대리컨자 입장"
                    +"\n: [대리컨인증] 으로 입력! 🐰"
                    +"\n\nhttps://ibb.co/hDdPDHx")
                    return
                  }
                }else{
                  replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
                  "카루시,카윌 칠흑제한은 4개^ 입니다!"
                  +"\n때문에 갯수 제한으로 입장 불가하며\n"+
                  "칠흑 갯수를 입력 안했다면 다시 입력하거나 "+
                  "잘못 입력했다면 다시 적어주세요\n\n"+
                  "ex) 5.칠흑 장신구 갯수 : 5개(숫자 나오게)"
                  +"\n\n이외에 다른 문의사항은"+
                  "\n운영진 멘션 주세요!🐰")
                  return
                }
              /*}else{
                
                replier.reply("상위보스 통합 문의방", "🐰2앜은 풀스포만 입장 가능해요!\n"+
                "\nex)풀스포 또는 105스포\n"+
                "\n이외에 다른 문의사항은\n"+
                "운영진 멘션 주세요!🐰")
                return
                
              }*/
            }else{//3아케인 이상
              if(4 <= sendtem3){
                if(sender.indexOf(s_nick3)!=-1){
                  replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gj8jwB0g"
                  +"\n\n🐰반가워요! "+sender
                  +"\n🍒카루시,카윌 비밀번호는 "+ passw +" 입니다!"
                  +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
                  +"\n공지 미확인으로 인한 불이익에 대해선"
                  +"\n책임지지 않습니다!"
                  +"\n\n⭐️입장하면 방은 비워주세요!"+
                  "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
                  return
                }else{
                  replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
                  "🚫본인계정으로만 방입장 가능합니다!"
                  +"\n\n⚠️ 카톡 프로필명을 본캐로 간주"
                  +"\n: 아래 예시 사진을 보고 다시 입력"
                  +"\n(작성 닉네임과 카톡 프로필명이 동일해야 입장 가능)"
                  +"\n\n⚠️ 본캐가 아닌 대리컨자 입장"
                  +"\n: [대리컨인증] 으로 입력! 🐰"
                  +"\n\nhttps://ibb.co/hDdPDHx")
                  return
                }
              }else{
                replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
                "카루시,카윌 칠흑제한은 4개^ 입니다!"
                +"\n때문에 갯수 제한으로 입장 불가하며\n"+
                "칠흑 갯수를 입력 안했다면 다시 입력하거나 "+
                "잘못 입력했다면 다시 적어주세요\n\n"+
                "ex) 5.칠흑 장신구 갯수 : 5개(숫자 나오게)"
                +"\n\n이외에 다른 문의사항은"+
                "\n운영진 멘션 주세요!🐰")
                return
              } 
            }
          }
        }
        replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
        "카루시,카윌 부터는 2앜5앱 4칠^ 부터 가능하며"+
        " 조건에 맞았음에도 해당 문구가 보인다면 "+
        "예시처럼 다시 작성 해주세요!\n\n"+
        "ex) 4.템 세팅 및 스포 : 5앱2아케인(or 2앜)"+
        "\n\n이외에 다른 문의사항은\n"+
        "운영진 멘션 주세요!🐰")
              
        return 
      }
    }
    
    //듄켈 양식 검증과정
    if(msg.indexOf("🚫듄켈 입장 전용양식")!=-1){
      if(msg.indexOf("닉네임 :")!=-1){
        var passw = read("/메이플m/"+"/듄켈연습방/", "password.txt")
        var s_nick = msg.split(":")[1]
        var s_nick2 = msg.substring(msg.indexOf(s_nick), msg.indexOf("2.직업"))
        var s_nick3 = s_nick2.replace(/\s/g, '')
        
        var s_fos = msg.split("3.아케인 포스 :")[1]
        var s_fos2 = msg.substring(msg.indexOf(s_fos), msg.indexOf("4.템 세팅"))
        var s_fos3 = s_fos2.replace(/[^0-9]/g, '')
        
        var item_set = msg.split("4.템 세팅 및 스포 :")[1]
        var item_set2 = msg.substring(msg.indexOf(item_set), msg.indexOf("5.칠흑 장신구"))
        var item_set3 = item_set2.replace(/\s/g, '')
        
        var sendtem = msg.split("5.칠흑 장신구 갯수 :")[1]
        var sendtem2 = msg.substring(msg.indexOf(sendtem), msg.indexOf("➖➖🚫"))
        var sendtem3 = sendtem2.replace(/[^0-9]/g, '')
        
        //포스 확인
        if(880 > s_fos3){
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
          "듄켈 기본 포스가 880입니다!"
          +"\n때문에 포스 제한으로 입장 불가하며\n"+
          "포스를 입력 안했다면 다시 입력하거나\n"+
          "잘못 입력했다면 다시 적어주세요\n"+
          "ex) 3.아케인 포스 : 1050 (숫자만)"
          +"\n\n이외에 다른 문의사항은"+
          "\n운영진 멘션 주세요!🐰")
          return
        }
        
        item_name = ["4아케인", "4앜", "3앜", "3아케인", "5앜", "5아케인", "6앜", "6아케인", "7앜", "7아케인"]
        
        // 템셋팅 확인
        for(var a = 0; a < item_name.length; a++){
          if(item_set3.indexOf(item_name[a])!=-1){
            if(item_name[a] == "2아케인" || item_name[a] == "2앜"){
              /*if(item_set3.indexOf("풀")!=-1 || item_set3.indexOf("105")!=-1){
                if(5 <= sendtem3){
                  if(sender.indexOf(s_nick3)!=-1){
                    replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gVo0Zx5g"
                    +"\n\n🐰반가워요! "+sender
                    +"\n🍒듄켈 비밀번호는 "+ passw +" 입니다!"
                    +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
                    +"\n공지 미확인으로 인한 불이익에 대해선"
                    +"\n책임지지 않습니다!"
                    +"\n\n⭐️입장하면 방은 비워주세요!"+
                    "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
                    return
                  }else{
                    replier.reply("상위보스 통합 문의방", "🐰본인계정으로만 방입장 가능합니다!"
                    +"\n또는 대표캐릭 1개닉만 작성(서버도x)"
                    +"\nex) 1.닉네임 : 뜡부"
                    +"\n\n이외에 다른 문의사항은"
                    +"\n운영진 멘션 주세요!🐰")
                    return
                  }
                }else{
                  replier.reply("상위보스 통합 문의방", "🐰듄켈 칠흑제한은 5개^ 입니다!"
                  +"\n때문에 갯수 제한으로 입장 불가하며\n"+
                  "칠흑 갯수를 입력 안했다면 다시 입력하거나 "+
                  "잘못 입력했다면 다시 적어주세요\n\n"+
                  "ex) 5.칠흑 장신구 갯수 : 5개(숫자 나오게)"
                  +"\n\n이외에 다른 문의사항은"+
                  "\n운영진 멘션 주세요!🐰")
                  return
                }
              }else{
                replier.reply("상위보스 통합 문의방", "🐰2앜은 풀스포만 입장 가능해요!\n"+
                "\nex)풀스포 또는 105스포\n"+
                "\n이외에 다른 문의사항은\n"+
                "운영진 멘션 주세요!🐰")
                return
              }*/
            }else{//3아케인 이상
              if(6 <= sendtem3){
                if(sender.indexOf(s_nick3)!=-1){
                  replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gVo0Zx5g"
                  +"\n\n🐰반가워요! "+sender
                  +"\n🍒듄켈 비밀번호는 "+ passw +" 입니다!"
                  +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
                  +"\n공지 미확인으로 인한 불이익에 대해선"
                  +"\n책임지지 않습니다!"
                  +"\n\n⭐️입장하면 방은 비워주세요!"+
                  "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
                  return
                }else{
                  replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
                  "🚫본인계정으로만 방입장 가능합니다!"
                  +"\n\n⚠️ 카톡 프로필명을 본캐로 간주"
                  +"\n: 아래 예시 사진을 보고 다시 입력"
                  +"\n(작성 닉네임과 카톡 프로필명이 동일해야 입장 가능)"
                  +"\n\n⚠️ 본캐가 아닌 대리컨자 입장"
                  +"\n: [대리컨인증] 으로 입력! 🐰"
                  +"\n\nhttps://ibb.co/hDdPDHx")
                  return
                }
              }else{
                replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
                "듄켈 칠흑제한은 6개^ 입니다!"
                +"\n때문에 갯수 제한으로 입장 불가하며\n"+
                "칠흑 갯수를 입력 안했다면 다시 입력하거나 "+
                "잘못 입력했다면 다시 적어주세요\n\n"+
                "ex) 5.칠흑 장신구 갯수 : 5개(숫자 나오게)"
                +"\n\n이외에 다른 문의사항은"+
                "\n운영진 멘션 주세요!🐰")
                return
              } 
            }
          }
        }
        replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
        "듄켈 부터는 3앜4앱 6칠^ 부터 가능하며"+
        " 조건에 맞았음에도 해당 문구가 보인다면 "+
        "예시처럼 다시 작성 해주세요!\n\n"+
        "ex) 4.템 세팅 및 스포 : 5앱2아케인(or 2앜)"+
        "\n\n이외에 다른 문의사항은\n"+
        "운영진 멘션 주세요!🐰")
              
        return 
      }
    }
    
    //검마 양식 검증과정
    if(msg.indexOf("🚫검마 입장 전용양식")!=-1){
      if(msg.indexOf("닉네임 :")!=-1){
        var passw = read("/메이플m/"+"/검마연습방/", "password.txt")
        var s_nick = msg.split(":")[1]
        var s_nick2 = msg.substring(msg.indexOf(s_nick), msg.indexOf("2.직업"))
        var s_nick3 = s_nick2.replace(/\s/g, '')
        
        var s_fos = msg.split("3.아케인 포스 :")[1]
        var s_fos2 = msg.substring(msg.indexOf(s_fos), msg.indexOf("4.템 세팅"))
        var s_fos3 = s_fos2.replace(/[^0-9]/g, '')
        
        var item_set = msg.split("4.템 세팅 및 스포 :")[1]
        var item_set2 = msg.substring(msg.indexOf(item_set), msg.indexOf("5.칠흑 장신구"))
        var item_set3 = item_set2.replace(/\s/g, '')
        
        var sendtem = msg.split("5.칠흑 장신구 갯수 :")[1]
        var sendtem2 = msg.substring(msg.indexOf(sendtem), msg.indexOf("➖➖🚫"))
        var sendtem3 = sendtem2.replace(/[^0-9]/g, '')
        
        //포스 확인
        if(1320 > s_fos3){
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
          "검마 기본 포스가 1320입니다!"
          +"\n때문에 포스 제한으로 입장 불가하며\n"+
          "포스를 입력 안했다면 다시 입력하거나\n"+
          "잘못 입력했다면 다시 적어주세요\n"+
          "ex) 3.아케인 포스 : 1050 (숫자만)"
          +"\n\n이외에 다른 문의사항은"+
          "\n운영진 멘션 주세요!🐰")
          return
        }
        
        item_name = ["5앜", "5아케인", "6앜", "6아케인", "7앜", "7아케인"]
        
        // 템셋팅 확인
        for(var a = 0; a < item_name.length; a++){
          if(item_set3.indexOf(item_name[a])!=-1){
            if(item_name[a] == "2아케인" || item_name[a] == "2앜"){
              /*if(item_set3.indexOf("풀")!=-1 || item_set3.indexOf("105")!=-1){
                if(5 <= sendtem3){
                  if(sender.indexOf(s_nick3)!=-1){
                    replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/g07dHy5g"
                    +"\n\n🐰반가워요! "+sender
                    +"\n🍒검마 비밀번호는 "+ passw +" 입니다!"
                    +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
                    +"\n공지 미확인으로 인한 불이익에 대해선"
                    +"\n책임지지 않습니다!"
                    +"\n\n⭐️입장하면 방은 비워주세요!"+
                    "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
                    return
                  }else{
                    replier.reply("상위보스 통합 문의방", "🐰본인계정으로만 방입장 가능합니다!"
                    +"\n또는 대표캐릭 1개닉만 작성(서버도x)"
                    +"\nex) 1.닉네임 : 뜡부"
                    +"\n\n이외에 다른 문의사항은"
                    +"\n운영진 멘션 주세요!🐰")
                    return
                  }
                }else{
                  replier.reply("상위보스 통합 문의방", "🐰검마 칠흑제한은 5개^ 입니다!"
                  +"\n때문에 갯수 제한으로 입장 불가하며\n"+
                  "칠흑 갯수를 입력 안했다면 다시 입력하거나 "+
                  "잘못 입력했다면 다시 적어주세요\n\n"+
                  "ex) 5.칠흑 장신구 갯수 : 5개(숫자 나오게)"
                  +"\n\n이외에 다른 문의사항은"+
                  "\n운영진 멘션 주세요!🐰")
                  return
                }
              }else{
                replier.reply("상위보스 통합 문의방", "🐰2앜은 풀스포만 입장 가능해요!\n"+
                "\nex)풀스포 또는 105스포\n"+
                "\n이외에 다른 문의사항은\n"+
                "운영진 멘션 주세요!🐰")
                return
              }*/
            }else{//5아케인 이상
              if(6 <= sendtem3){
                if(sender.indexOf(s_nick3)!=-1){
                  replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/g07dHy5g"
                  +"\n\n🐰반가워요! "+sender
                  +"\n🍒검마 비밀번호는 "+ passw +" 입니다!"
                  +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
                  +"\n공지 미확인으로 인한 불이익에 대해선"
                  +"\n책임지지 않습니다!"
                  +"\n\n⭐️입장하면 방은 비워주세요!"+
                  "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
                  return
                }else{
                  replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
                  "🚫본인계정으로만 방입장 가능합니다!"
                  +"\n\n⚠️ 카톡 프로필명을 본캐로 간주"
                  +"\n: 아래 예시 사진을 보고 다시 입력"
                  +"\n(작성 닉네임과 카톡 프로필명이 동일해야 입장 가능)"
                  +"\n\n⚠️ 본캐가 아닌 대리컨자 입장"
                  +"\n: [대리컨인증] 으로 입력! 🐰"
                  +"\n\nhttps://ibb.co/hDdPDHx")
                  return
                }
              }else{
                replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
                "검마 칠흑제한은 6개^ 입니다!"
                +"\n때문에 갯수 제한으로 입장 불가하며\n"+
                "칠흑 갯수를 입력 안했다면 다시 입력하거나 "+
                "잘못 입력했다면 다시 적어주세요\n\n"+
                "ex) 5.칠흑 장신구 갯수 : 5개(숫자 나오게)"
                +"\n\n이외에 다른 문의사항은"+
                "\n운영진 멘션 주세요!🐰")
                return
              } 
            }
          }
        }
        replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
        "검마 부터는 5앜2앱 6칠^ 부터 가능하며"+
        " 조건에 맞았음에도 해당 문구가 보인다면 "+
        "예시처럼 다시 작성 해주세요!\n\n"+
        "ex) 4.템 세팅 및 스포 : 5앱2아케인(or 2앜)"+
        "\n\n이외에 다른 문의사항은\n"+
        "운영진 멘션 주세요!🐰")
              
        return 
      }
    }
    
    //세렌 양식 검증과정
    if(msg.indexOf("🚫세렌 입장 전용양식")!=-1){
      if(msg.indexOf("닉네임 :")!=-1){
        var passw = read("/메이플m/"+"/세렌연습방/", "password.txt")
        var s_nick = msg.split(":")[1]
        var s_nick2 = msg.substring(msg.indexOf(s_nick), msg.indexOf("2.직업"))
        var s_nick3 = s_nick2.replace(/\s/g, '')
        
        var s_fos = msg.split("3.아케인 포스 :")[1]
        var s_fos2 = msg.substring(msg.indexOf(s_fos), msg.indexOf("4.템 세팅"))
        var s_fos3 = s_fos2.replace(/[^0-9]/g, '')
        
        var item_set = msg.split("4.템 세팅 및 스포 :")[1]
        var item_set2 = msg.substring(msg.indexOf(item_set), msg.indexOf("5.칠흑 장신구"))
        var item_set3 = item_set2.replace(/\s/g, '')
        
        var sendtem = msg.split("5.칠흑 장신구 갯수 :")[1]
        var sendtem2 = msg.substring(msg.indexOf(sendtem), msg.indexOf("➖➖🚫"))
        var sendtem3 = sendtem2.replace(/[^0-9]/g, '')
        
        //포스 확인
        if(1320 > s_fos3){
          replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
          "세렌 기본 포스가 1320입니다!"
          +"\n때문에 포스 제한으로 입장 불가하며\n"+
          "포스를 입력 안했다면 다시 입력하거나\n"+
          "잘못 입력했다면 다시 적어주세요\n"+
          "ex) 3.아케인 포스 : 1050 (숫자만)"
          +"\n\n이외에 다른 문의사항은"+
          "\n운영진 멘션 주세요!🐰")
          return
        }
        
        item_name = ["7앜", "7아케인"]
        
        // 템셋팅 확인
        for(var a = 0; a < item_name.length; a++){
          if(item_set3.indexOf(item_name[a])!=-1){
            if(item_name[a] == "2아케인" || item_name[a] == "2앜"){
              /*if(item_set3.indexOf("풀")!=-1 || item_set3.indexOf("105")!=-1){
                if(5 <= sendtem3){
                  if(sender.indexOf(s_nick3)!=-1){
                    replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/g07dHy5g"
                    +"\n\n🐰반가워요! "+sender
                    +"\n🍒검마 비밀번호는 "+ passw +" 입니다!"
                    +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
                    +"\n공지 미확인으로 인한 불이익에 대해선"
                    +"\n책임지지 않습니다!"
                    +"\n\n⭐️입장하면 방은 비워주세요!"+
                    "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
                    return
                  }else{
                    replier.reply("상위보스 통합 문의방", "🐰본인계정으로만 방입장 가능합니다!"
                    +"\n또는 대표캐릭 1개닉만 작성(서버도x)"
                    +"\nex) 1.닉네임 : 뜡부"
                    +"\n\n이외에 다른 문의사항은"
                    +"\n운영진 멘션 주세요!🐰")
                    return
                  }
                }else{
                  replier.reply("상위보스 통합 문의방", "🐰검마 칠흑제한은 5개^ 입니다!"
                  +"\n때문에 갯수 제한으로 입장 불가하며\n"+
                  "칠흑 갯수를 입력 안했다면 다시 입력하거나 "+
                  "잘못 입력했다면 다시 적어주세요\n\n"+
                  "ex) 5.칠흑 장신구 갯수 : 5개(숫자 나오게)"
                  +"\n\n이외에 다른 문의사항은"+
                  "\n운영진 멘션 주세요!🐰")
                  return
                }
              }else{
                replier.reply("상위보스 통합 문의방", "🐰2앜은 풀스포만 입장 가능해요!\n"+
                "\nex)풀스포 또는 105스포\n"+
                "\n이외에 다른 문의사항은\n"+
                "운영진 멘션 주세요!🐰")
                return
              }*/
            }else{//7아케인 이상
              if(7 <= sendtem3){
                if(sender.indexOf(s_nick3)!=-1){
                  replier.reply("상위보스 통합 문의방", "https://open.kakao.com/o/gcK6vuEh"
                  +"\n\n🐰반가워요! "+sender
                  +"\n🍒세렌 비밀번호는 "+ passw +" 입니다!"
                  +"\n\n앞으로 잘 부탁드리고 공지 꼭 읽어주세요!"
                  +"\n공지 미확인으로 인한 불이익에 대해선"
                  +"\n책임지지 않습니다!"
                  +"\n\n⭐️입장하면 방은 비워주세요!"+
                  "\n🚫일정시간 까지 남을 경우 추방 됩니다!")
            
                  return
                }else{
                  replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
                  "🚫본인계정으로만 방입장 가능합니다!"
                  +"\n\n⚠️ 카톡 프로필명을 본캐로 간주"
                  +"\n: 아래 예시 사진을 보고 다시 입력"
                  +"\n(작성 닉네임과 카톡 프로필명이 동일해야 입장 가능)"
                  +"\n\n⚠️ 본캐가 아닌 대리컨자 입장"
                  +"\n: [대리컨인증] 으로 입력! 🐰"
                  +"\n\nhttps://ibb.co/hDdPDHx")
                  return
                }
              }else{
                replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" + 
                "세렌 칠흑제한은 7개^ 입니다!"
                +"\n때문에 갯수 제한으로 입장 불가하며\n"+
                "칠흑 갯수를 입력 안했다면 다시 입력하거나 "+
                "잘못 입력했다면 다시 적어주세요\n\n"+
                "ex) 5.칠흑 장신구 갯수 : 7개(숫자 나오게)"
                +"\n\n이외에 다른 문의사항은"+
                "\n운영진 멘션 주세요!🐰")
                return
              } 
            }
          }
        }
        replier.reply("상위보스 통합 문의방", "🐰 " + sender + "\n\n" +
        "세렌 부터는 7앜 7칠^ 부터 가능하며"+
        " 조건에 맞았음에도 해당 문구가 보인다면 "+
        "예시처럼 다시 작성 해주세요!\n\n"+
        "ex) 4.템 세팅 및 스포 : 7아케인(or 7앜)"+
        "\n\n이외에 다른 문의사항은\n"+
        "운영진 멘션 주세요!🐰")
              
        return 
      }
    }
    
    //경고 닉네임
    if(msg.startsWith("!경고 ")){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          out_nick = msg.substr(4)
      
          replier.reply("상위보스 통합 문의방", "서버명을 입력해주세요!\n"+
          "20초 내로 서버 풀네임으로 입력!!🐰\n\n"+
          "ex) 서버 : 스카니아 🍒")
          warning1 = true
          java.lang.Thread.sleep(20000)
          warning1 = false
          return
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
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
          replier.reply("상위보스 통합 문의방", "이미 2경고로 추방당한 인원입니다!\n"+
          "닉네임과 서버를 다시 확인해주세요 ㅇ ㅅㅇ🐰")
          return
        }else if(out_one.indexOf(su_nick)!=-1){
          all_out_nick = su_nick
          replier.reply("상위보스 통합 문의방", "🐰"+all_out_nick+" 님은 2차 경고입니다.\n룰에 따라 2회 경고 누적이며\n추방조치 해주세요!"+
          "\n추가로 사유를 30초내로 적어주세요!\n\nex) 사유 : 뜡부모욕죄🚫")
          
          warning2 = true
          java.lang.Thread.sleep(30000)
          warning2 = false
          
          return
        }else{
          all_out_nick = su_nick
          replier.reply("상위보스 통합 문의방", "🐰"+all_out_nick+" 님은 1차 경고입니다.\n룰에 따라 1회 경고 누적입니다!"+
          "\n추가로 사유를 30초내로 적어주세요!\n\nex) 사유 : 뜡부모욕죄🚫")
          
          warning3 = true
          java.lang.Thread.sleep(30000)
          warning3 = false
          
          return
        }
      }else{
        replier.reply("상위보스 통합 문의방", "20초가 지났어염 ㅇ ㅅㅇ\n"+
        "!경고 부터 다시 하세염 🐰")
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
          replier.reply("상위보스 통합 문의방", sav_story + "\n\n위 내용이 등록 됐어요!🐰")
          return
        }else{
          var saving = read_story1 + "\n" + sav_story
          save("/메이플m/"+"/경고/","1차스토리.txt", saving)
          replier.reply("상위보스 통합 문의방", sav_story + "\n\n위 내용이 등록 됐어요!🐰")
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
            replier.reply("상위보스 통합 문의방", sav_story + "\n\n위 내용이 등록 됐어요!🐰")
            save("/메이플m/"+"/경고/","2차스토리.txt", sav_story)
            return
          }else{
            var saving = read_story2 + "\n" + sav_story
          
            replier.reply("상위보스 통합 문의방", sav_story + "\n\n위 내용이 등록 됐어요!🐰")
            save("/메이플m/"+"/경고/","2차스토리.txt", saving) 
            return
          }
        }else{
          var del_fin_1 = read_story1.replace("🔹 " + all_out_nick + "\n" + del_story2, "")
          save("/메이플m/"+"/경고/","1차스토리.txt", del_fin_1)
        
          if(read_story2 == "No"){
            replier.reply("상위보스 통합 문의방", sav_story + "\n\n위 내용이 등록 됐어요!🐰")
            save("/메이플m/"+"/경고/","2차스토리.txt", sav_story)
            return
          }else{
            var saving = read_story2 + "\n" + sav_story
          
            replier.reply("상위보스 통합 문의방", sav_story + "\n\n위 내용이 등록 됐어요!🐰")
            save("/메이플m/"+"/경고/","2차스토리.txt", saving) 
            return
          }
        }   
      }else if(warning3 == false){
        replier.reply("상위보스 통합 문의방", "30초가 지났네염?? ㅇ ㅅㅇ"+
        "사유를 다시 30초내로 입력해주세염! 🐰")
        warning3 = true
        java.lang.Thread.sleep(30000)
        warning3 = false
        return
      }else if(warning2 == false){
        replier.reply("상위보스 통합 문의방", "30초가 지났네염?? ㅇ ㅅㅇ"+
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
      
          replier.reply("상위보스 통합 문의방", "서버명을 입력해주세요!\n"+
          "20초 내로 서버 풀네임으로 입력!!🐰\n\n"+
          "ex) 2차서버 : 스카니아 🍒")
          warning1_t = true
          java.lang.Thread.sleep(20000)
          warning1_t = false
          return
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
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
          replier.reply("상위보스 통합 문의방", "이미 2경고로 추방당한 인원입니다!\n"+
          "닉네임과 서버를 다시 확인해주세요 ㅇ ㅅㅇ🐰")
          return
        }else{
          all_out_nick_t = su_nick_t
          replier.reply("상위보스 통합 문의방", "🐰"+all_out_nick_t+" 님은 다이렉트 경고입니다.\n룰에 따라 추방해주세요!"+
          "\n추가로 사유를 30초내로 적어주세요!\n\nex) 2차사유 : 뜡부모욕죄🚫")
          
          warning2_t = true
          java.lang.Thread.sleep(30000)
          warning2_t = false
          
          return
        }
      }else{
        replier.reply("상위보스 통합 문의방", "20초가 지났어염 ㅇ ㅅㅇ\n"+
        "!2차경고 부터 다시 하세염 🐰")
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
          replier.reply("상위보스 통합 문의방", sav_story_t + "\n\n위 내용이 등록 됐어요!🐰")
          save("/메이플m/"+"/경고/","2차스토리.txt", sav_story_t)
          return
        }else{
          var saving_t = read_story2_t + "\n" + sav_story_t
          
          replier.reply("상위보스 통합 문의방", sav_story_t + "\n\n위 내용이 등록 됐어요!🐰")
          save("/메이플m/"+"/경고/","2차스토리.txt", saving_t) 
          return
        }
      }else if(warning2_t == false){
        replier.reply("상위보스 통합 문의방", "30초가 지났네염?? ㅇ ㅅㅇ"+
        "사유를 다시 30초내로 입력해주세염! 🐰")
        warning2 = true
        java.lang.Thread.sleep(30000)
        warning2 = false
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
                replier.reply("상위보스 통합 문의방", "🐰2차 경고인원\n'" +del_nick+ "' 님은 1차 경고로 바뀌었습니다! 🐰")
              }else{
                save("/메이플m/"+"/경고/","2차스토리.txt", "No")
                replier.reply("상위보스 통합 문의방", "🐰2차 경고인원\n'" +del_nick+ "' 님은 1차 경고로 바뀌었습니다! 🐰")
              }
            }else{
              var de_two_1 = del_two.replace("🔹 " + del_nick + del_two2, "")
        
              if(de_two_1.indexOf("🔹")!=-1){
                save("/메이플m/"+"/경고/","2차스토리.txt", de_two_1)
                replier.reply("상위보스 통합 문의방", "🐰2차 경고인원\n'" +del_nick+ "' 님은 1차 경고로 바뀌었습니다! 🐰")
              }else{
                save("/메이플m/"+"/경고/","2차스토리.txt", "No")
                replier.reply("상위보스 통합 문의방", "🐰2차 경고인원\n'" +del_nick+ "' 님은 1차 경고로 바뀌었습니다! 🐰")
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
                replier.reply("상위보스 통합 문의방", "🐰1차 경고인원\n'" +del_nick+ "' 님을 지웠습니다!🐰")
          
                return
              }else{
                save("/메이플m/"+"/경고/","1차스토리.txt", "No")
                replier.reply("상위보스 통합 문의방", "🐰1차 경고인원\n'" +del_nick+ "' 님을 지웠습니다!🐰")
          
                return
              }
            }else{
              var de_one_1 = del_one.replace("🔹 " + del_nick + del_one2, "")
        
              if(de_one_1.indexOf("🔹")!=-1){
                save("/메이플m/"+"/경고/","1차스토리.txt", de_one_1)
                replier.reply("상위보스 통합 문의방", "🐰1차 경고인원\n'" +del_nick+ "' 님을 지웠습니다!🐰")
          
                return
              }else{
                save("/메이플m/"+"/경고/","1차스토리.txt", "No")
                replier.reply("상위보스 통합 문의방", "🐰1차 경고인원\n'" +del_nick+ "' 님을 지웠습니다!🐰")
          
                return
              }
            }   
          }else{
            replier.reply("상위보스 통합 문의방", "경고가 없는 닉네임인데요?ㅇ ㅅㅇ?🐰")
            return
          }
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
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
                replier.reply("상위보스 통합 문의방", "🐰2차 경고인원\n'" +del_nick_t+ "' 님은 다이렉트 경고 취소입니다!🐰")
                return
              }else{
                save("/메이플m/"+"/경고/","2차스토리.txt", "No")
                replier.reply("상위보스 통합 문의방", "🐰2차 경고인원\n'" +del_nick_t+ "' 님은 다이렉트 경고 취소입니다!🐰")
                return
              }
            }else{
              var de_two_1_t = del_two_t.replace("🔹 " + del_nick_t + del_two2_t, "")
        
              if(de_two_1_t.indexOf("🔹")!=-1){
                save("/메이플m/"+"/경고/","2차스토리.txt", de_two_1_t)
                replier.reply("상위보스 통합 문의방", "🐰2차 경고인원\n'" +del_nick_t+ "' 님은 다이렉트 경고 취소입니다!🐰")
                return
              }else{
                save("/메이플m/"+"/경고/","2차스토리.txt", "No")
                replier.reply("상위보스 통합 문의방", "🐰2차 경고인원\n'" +del_nick_t+ "' 님은 다이렉트 경고 취소입니다!🐰")
                return
              }
            }
          }else{
            replier.reply("상위보스 통합 문의방", "경고가 없는 닉네임인데요?ㅇ ㅅㅇ?🐰")
            return
          }
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    
    //경고초기화
    if(msg == "!경고초기화"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          save("/메이플m/"+"/경고/","1차스토리.txt", "No")
          save("/메이플m/"+"/경고/","2차스토리.txt", "No")
      
          replier.reply("상위보스 통합 문의방", "🐰모든 경고 명단을 초기화 했어요!")
          return
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
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
      
          replier.reply("상위보스 통합 문의방", "🐰경고 받은 인원 리스트 입니다!\n"+줄이기+"\n\n"+
          "⭐️1차 경고⭐️\n\n"+emer1+"\n\n⭐️2차 경고⭐️\n\n"+emer2)
      
          return
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
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
            replier.reply("상위보스 통합 문의방", "🐰 금지단어 " + no_keyword + "\n단어사전에 추가했어요!!")
            return
          }else{
            var sav_keyword = keyword_dic + "\n" + no_keyword2
            save("/메이플m/"+"/경고/","금지단어.txt", sav_keyword)
            replier.reply("상위보스 통합 문의방", "🐰 금지단어 " + no_keyword + "\n단어사전에 추가했어요!!")
            return
          }
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //금지단어 보기
    if(msg == "!금지리스트"){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var noob_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt");
          if(noob_keyword == ","){
            replier.reply("상위보스 통합 문의방", "금지단어가 없는데요 ㅇ ㅅㅇ?🐰")
            return
          }else{
            var noob_key = "🔹 " + noob_keyword
            replier.reply("상위보스 통합 문의방", "금지단어 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + noob_key)
            return
          }
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
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
              replier.reply("상위보스 통합 문의방", "🐰 " + del_keyword + " 지웠어요!")
              return
            }else{
              var fin_chan_key3 = del_keyword_dic.replace("🔹 " + del_keyword, "")
              save("/메이플m/"+"/경고/","금지단어.txt", fin_chan_key3)
              replier.reply("상위보스 통합 문의방", "🐰 " + del_keyword + " 지웠어요!")
              return
            }
          }else if(del_keyword_dic.indexOf(del_keyword)!=-1){
            var chan_del_key2 = del_keyword + "\n"
            var fin_chan_key2 = del_keyword_dic.replace(chan_del_key2, "")
            save("/메이플m/"+"/경고/","금지단어.txt", fin_chan_key2)
            replier.reply("상위보스 통합 문의방", "🐰 " + del_keyword + " 지웠어요!")
            return
          }else{
            replier.reply("상위보스 통합 문의방", "없는 단어인데요??ㅇ ㅅㅇ🐰")
            return
          }
        }
      }
      replier.reply("상위보스 통합 문의방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
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
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","추방.txt", by_mem_mtr)
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
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
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","추방.txt", cancle_mem2)
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else{
            replier.reply("상위보스 통합 문의방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
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
            replier.reply("상위보스 통합 문의방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 통합 문의방", "추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
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
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 윌방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","윌추방.txt", by_mem_mtr)
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 윌방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
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
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 진힐라방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","진힐라추방.txt", by_mem_mtr)
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 진힐라방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
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
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 카윌방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","카윌추방.txt", by_mem_mtr)
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 카윌방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
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
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 듄켈방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","듄켈추방.txt", by_mem_mtr)
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 듄켈방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
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
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 검마방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","검마추방.txt", by_mem_mtr)
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 검마방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
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
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 세렌방 추방 완료\n착하게 사세요 ㅇ ㅅㅇ🐰")
            return
          }else{
            save("/메이플m/"+"/경고/","세렌추방.txt", by_mem_mtr)
            replier.reply("상위보스 통합 문의방", by_mem_mtr + " 세렌방 추방 완료!\n착하게 사세요 ㅇ ㅅㅇ🐰")
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
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 윌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","윌추방.txt", cancle_mem2)
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 윌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else{
            replier.reply("상위보스 통합 문의방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
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
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 진힐라방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","진힐라추방.txt", cancle_mem2)
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 진힐라방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else{
            replier.reply("상위보스 통합 문의방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
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
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 카윌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","카윌추방.txt", cancle_mem2)
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 카윌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else{
            replier.reply("상위보스 통합 문의방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
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
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 듄켈방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","듄켈추방.txt", cancle_mem2)
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 듄켈방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else{
            replier.reply("상위보스 통합 문의방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
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
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 검마방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","검마추방.txt", cancle_mem2)
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 검마방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else{
            replier.reply("상위보스 통합 문의방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
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
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 세렌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return
          }else if(can_by_read.indexOf("," + can_by_mtr)){
            var cancle_mem2 = can_by_read.replace("," + can_by_mtr, "")
            save("/메이플m/"+"/경고/","세렌추방.txt", cancle_mem2)
            replier.reply("상위보스 통합 문의방", can_by_mtr + " 세렌방 취소 완료\n갱생됐길 바랍니다? ㅇ ㅅㅇ🐰")
            return  
          }else{
            replier.reply("상위보스 통합 문의방", "없는 인원인데염?? ㅇ ㅅㅇ?🐰")
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
            replier.reply("상위보스 통합 문의방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 통합 문의방", "윌방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
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
            replier.reply("상위보스 통합 문의방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 통합 문의방", "진힐라방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
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
            replier.reply("상위보스 통합 문의방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 통합 문의방", "카윌방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
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
            replier.reply("상위보스 통합 문의방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 통합 문의방", "듄켈방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
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
            replier.reply("상위보스 통합 문의방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 통합 문의방", "검마방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
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
            replier.reply("상위보스 통합 문의방", "아무도 없어여! ㅇ ㅅㅇ🐰")
            return
          }
          
          var fin_list = "🔹 " + by_list
          replier.reply("상위보스 통합 문의방", "세렌방 추방 리스트에요!!\n눌러서 확인하세요!🐰\n" + 줄이기 + "\n" + fin_list)
          return
        }
      }
    }
    
    //도움말
    if(msg == "도움말"){
  
    replier.reply("상위보스 통합 문의방", "🐰토니의 사용법이에요 보세요!\n"+
    "명령어가 잘못 되었다면 반응하지 않아요\n\n"+
    "!금지단어 ••\n"+
    "!금지리스트\n"+
    "!금지단어삭제 ••\n"+
    "전체양식\n"+
    "보스명 입장양식\n"+
    "보스명 입장(다이렉트)\n"+
    "경고방 입장\n"+
    "진힐라 스위칭(1번방 2번방 변경)")
    
    return
    }
    
    }catch(e){
      replier.reply("상위보스 통합 문의방", "에러남 메롱 🐰")
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

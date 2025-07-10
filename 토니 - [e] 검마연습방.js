var scriptName = "토니-검마연습방";

/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply("[검마] 연습 트라이방", message)
 * (boolean) replier.reply("[검마] 연습 트라이방", room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
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

// 팀추가
function plus_team(msg, wait_team, create){
  if(msg == 1){
    var party = " 연습팟"
  }else if(msg == 2){
    var party = " 숙련팟"
  }else if(msg == 3){
    var party = " 트라이팟"
  }else{
    var party = " 클팟"
  }
  if(msg == 1 || msg == 2){
    var boss = "[검마]"
    var title_team = "[" + wait_team + " 🐰]"
    var nomar_team = title_team +
    "\n🥕" + boss + party +
    "\n⭐️ [시간] ex) !•팀시간 ••" +
    "\n🥕생성자는 초행가능팟, 숙련팟, 딜체크팟, 템포스 스펙기준 등 파티의 목적을 메모에 기재 해주세요!" +
    "\n📌 서버통합으로 인해 명단에 서버작성 필수" +
    "\n[명단 생성자 : " + create + "]" +
    "\n\n1️⃣(초대:)\n2️⃣\n3️⃣\n4️⃣\n5️⃣\n6️⃣\n7️⃣\n8️⃣(리프:)\n9️⃣(은월:)\n🔟(숍:)" +
    "\n\n🥕메모 : "
    save("/메이플m/"+"/검마연습방/"+"/명단/", wait_team.trim()+".txt", nomar_team)
    
    return
  }else if(msg == 3 || msg == 4){
    var boss = "[검마]"
    var title_team = "[" + wait_team + " 🐰]"
    var nomar_team = title_team +
    "\n🥕" + boss + party +
    "\n⭐️ [시간] ex) !•팀시간 ••" +
    "\n🥕생성자는 초행가능팟, 숙련팟, 딜체크팟, 템포스 스펙기준 등 파티의 목적을 메모에 기재 해주세요!" +
    "\n📌 서버통합으로 인해 명단에 서버작성 필수" +
    "\n[명단 생성자 : " + create + "]" +
    "\n\n1️⃣(초대:)\n2️⃣\n3️⃣\n4️⃣\n5️⃣\n6️⃣\n7️⃣\n8️⃣(리프:)\n9️⃣(은월:)\n🔟(숍:)" +
    "\n\n🥕메모 : \n🚨단판신고 원할경우🚨\n메모작성 시 【단판신고】 키워드\n반드시 꼭 넣어주세요!🐰\n\n" +
    "⚠️키워드가 없다면 단판신고 안돼요!"
    save("/메이플m/"+"/검마연습방/"+"/명단/", wait_team.trim()+".txt", nomar_team)
    
    return
  }
}

//팀 추가 번호
practice = []
trypar = []
try_c = []
clear = []

real_numbering = []

//팀 추가 번호 구하는 함수
function team_numbering(difficult){
  
  var test = Array(70).fill(1).map((n, idx) => n + idx)
      
  var all_team_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("\n");
  all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
  all_team_list = all_team_list.replace(/\.txt/g,"")
      
  var rr = all_team_list.split("\n")
  
  if(difficult == 1){
    for(var a = 0; a < rr.length; a++){
      if(rr[a].indexOf("연습")!=-1){
        var party_num = rr[a].replace(/[^0-9]/g, "")
        var num_party = Number(party_num)
        practice.push(num_party)
      }
    }
    var qq = test.filter(x => !practice.includes(x))
    real_numbering.push(qq[0])
    practice = []
    return
  }else if(difficult == 2){
    for(var a = 0; a < rr.length; a++){
      if(rr[a].indexOf("숙련")!=-1){
        var party_num = rr[a].replace(/[^0-9]/g, "")
        var num_party = Number(party_num)
        trypar.push(num_party)
      }
    }
    var qq = test.filter(x => !trypar.includes(x))
    real_numbering.push(qq[0])
    trypar = []
    return
  }else if(difficult == 3){
    for(var a = 0; a < rr.length; a++){
      if(rr[a].indexOf("트라이")!=-1){
        var party_num = rr[a].replace(/[^0-9]/g, "")
        var num_party = Number(party_num)
        try_c.push(num_party)
      }
    }
    var qq = test.filter(x => !try_c.includes(x))
    real_numbering.push(qq[0])
    try_c = []
    return
  }else if(difficult == 4){
    for(var a = 0; a < rr.length; a++){
      if(rr[a].indexOf("클리어")!=-1){
        var party_num = rr[a].replace(/[^0-9]/g, "")
        var num_party = Number(party_num)
        clear.push(num_party)
      }
    }
    var qq = test.filter(x => !clear.includes(x))
    real_numbering.push(qq[0])
    clear = []
    return
  }
}

//줄이기
줄이기 ="\u200b".repeat(500);

//팀 숫자
numbering = ["","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]

//대기명단
wait_name = []
wait_dic = {}

//외출
out_name = []

//대기 및 생성자
create_mem = []
team_wait = []

//네 대기쿨타임
yes_time = false

//전체명단 쿨타임
down_time = false
//관리자
sender_m = ["뜡부", "채비", "꿀잠", "밉움", "꺼짐", "겸댕"]

//스펙
item_spec = ["1아케인", "2아케인", "3아케인", "4아케인", "5아케인", "6아케인", "7아케인",
"1앱솔", "2앱솔", "3앱솔", "4앱솔", "5앱솔", "6앱솔", "7앱솔",
"1앜", "2앜", "3앜", "4앜", "5앜", "6앜", "7앜",
"1앱", "2앱", "3앱", "4앱", "5앱", "6앱", "7앱",
"시아", "격", "가능", "오더", "뚝", "바인드", "팔라", "꼽", "컵"]

//예외처리
exception = ["시아", "격", "가능", "오더", "뚝", "바인드", "팔라", "꼽", "컵"]

//예외반응
unique = false

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if(isGroupChat==true){
  if(room=="[검마] 연습 트라이방"){
    try{
    
    //금지단어 먼저 체크
    var out_keyword = read("/메이플m/","/경고/"+"금지단어"+".txt")
    var out_keyword2 = out_keyword.split("🔹 ")
    
    for(var no_k = 0; no_k < out_keyword2.length; no_k++){
      var real_no = out_keyword2[no_k].trim()
      if(msg.indexOf(real_no)!=-1){
        replier.reply("[검마] 연습 트라이방", sender + " 님\n" 
                      + "금지단어 적발! 채팅을 제한합니다🐰\n\n"
                      + "🚨경고방 자동 보고 시스템 진행🚨\n곧 운영진이 멘션 할거에요ㅡㅅㅡ")
        return
      }
    }
    
    //제재 안내
    if(msg == "!1차경고"){
      if(sender.indexOf("뜡부")!=-1){
        replier.reply("[검마] 연습 트라이방", "🚨신고 접수되어 선제재 적용됩니다🚨\n\n" 
                      + "🚨경고내용 : 1차경고\n\n"
                      + "자세한 경고내용 확인 원하실 경우 경고방 입장 후 뜡부 멘션 부탁드립니다.\n\n"
                      + "https://open.kakao.com/o/guYEJgbh")
        return
      }
    }
    
    if(msg == "!2차경고"){
      if(sender.indexOf("뜡부")!=-1){
        replier.reply("[검마] 연습 트라이방", "🚨신고 접수되어 선제재 적용됩니다🚨\n\n" 
                      + "🚨경고내용 : 2차경고(7일 명단작성x)\n\n"
                      + "자세한 경고내용 확인 원하실 경우 경고방 입장 후 뜡부 멘션 부탁드립니다.\n\n"
                      + "https://open.kakao.com/o/guYEJgbh")
        return
      }
    }
    
    //닉네임등록
    if(msg.startsWith("닉네임등록 ")){
      var nick = msg.substr(6)
      var r_nick = read("/메이플m/","/검마연습방/"+"/닉네임/"+"닉네임모음.txt")
      if(r_nick.indexOf("}]")!=-1){
        var rr_nick = JSON.parse(r_nick)
        rr_nick[0][sender] = nick
          
        var re_nick = JSON.stringify(rr_nick)
        save("/메이플m/", "/검마연습방/"+"/닉네임/"+"닉네임모음".trim() + ".txt", re_nick);
        
        replier.reply("[검마] 연습 트라이방", sender + " 님의 닉네임\n" + nick + " 으로 등록 되었슘다🐰")
        return
      }else{
        replier.reply("[검마] 연습 트라이방", "뜡부를 멘션해주세요! 🐰")
        return
      }
    }
    
    //닉네임연동
    if(msg == "닉네임연동"){
      var tunel_nick = read("/메이플m/","/검마연습방/"+"/닉네임/"+"닉네임모음.txt")
      tunel_nick = JSON.parse(tunel_nick)
      var tunel_nick2 = tunel_nick[0][sender]
      
      if(tunel_nick2 == undefined){
        replier.reply("[검마] 연습 트라이방", "🐰연동할 닉네임이 없는데여?ㅇ ㅅㅇ")
        return
      }else{
        var t_nick = read("/메이플m/","/검마연습방/"+"/닉네임/"+"닉네임모음.txt")
        if(t_nick.indexOf("}]")!=-1){
          var tt_nick = JSON.parse(t_nick)
          tt_nick[0][sender] = tunel_nick2
          
          var te_nick = JSON.stringify(tt_nick)
          save("/메이플m/", "/검마연습방/"+"/닉네임/"+"닉네임모음".trim() + ".txt", te_nick);
        
          replier.reply("[검마] 연습 트라이방", sender + " 님의 닉네임\n" + tunel_nick2 + " 으로 연동완료!🐰")
          return
        }
      }
    }
    
    //외출관리
    if(msg == "외출"){
      var out_mem = read("/메이플m/"+"/검마연습방/", "외출.txt")
      if(out_mem.indexOf(sender)!=-1){
        replier.reply("[검마] 연습 트라이방", "🐰이미 외출명단 등록 하셨습니다!")
        return
      }else{
        out_name.push(out_mem)
      
        out_name.push(sender)
        var string_out = out_name.join()
        save("/메이플m/"+"/검마연습방/","외출.txt", string_out)
        out_name = [] 
        replier.reply("[검마] 연습 트라이방", "🐰외출자 명단 등록하셨습니다!"+
        "\n또 놀러와염 ㅇ ㅅㅇ")
        return
      } 
    }
    
    //명단수리
    if(msg == "명단수리"){
      down_time = false
      replier.reply("[검마] 연습 트라이방", "오키오키 ㅇ ㅅㅇ🐰")
      return
    }
     
    //전체명단
    if(msg == "전체명단" || msg == "명단" || msg == "연습명단"
      || msg == "숙련명단" || msg == "트라이명단" || msg == "클리어명단"){
      if(down_time == false){
        down_time = true
        var list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("");
        list = list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
      
        var to = list.split(".txt")
        var ten = to.sort()
      
        //null값 제거
        ten = ten.filter(function(non){
          return non !== null && non !== undefined && non !== ""
        })
        
        //순서정렬
        ten_parc = []
        ten_sk = []
        ten_try = []
        ten_cle = []
        
        for(var t = 0; t < ten.length; t++){
          if(ten[t].indexOf("연습")!=-1){
            ten_parc.push(ten[t])
          }else if(ten[t].indexOf("숙련")!=-1){
            ten_sk.push(ten[t])
          }else if(ten[t].indexOf("트라이")!=-1){
            ten_try.push(ten[t])
          }else{
            ten_cle.push(ten[t])
          }
        }
        ten_parc.sort(
        function(a, b){
          return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
        })
        ten_sk.sort(
        function(a, b){
          return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
        })
        ten_try.sort(
        function(a, b){
          return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
        })
        ten_cle.sort(
        function(a, b){
          return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
        })
        
        if(ten_parc.length == 0){
          ten_parc.push("팡")
        }
        if(ten_sk.length == 0){
          ten_sk.push("팡")
        }
        if(ten_try.length == 0){
          ten_try.push("팡")
        }
        if(ten_cle.length == 0){
          ten_cle.push("팡")
        }
        
        if(msg == "전체명단" || msg == "명단"){
          ten = ten_parc.join() + "," + ten_sk.join() + "," + ten_try.join() + "," + ten_cle.join()
          for(var g = 0; g < 4; g++){
            ten = ten.replace(",팡", "")
          }
          ten = ten.replace("팡,", "")
          ten = ten.split(",")
          
          if(ten == "팡"){
            replier.reply("[검마] 연습 트라이방", "아무런 명단이 없어용🐰")
            down_time = false
            return
          }else{
            for(var i = 0; i < ten.length; i++){
              var all = read("/메이플m/","/검마연습방/"+"전체명단.txt")

              if(all.indexOf("---")!=-1){
                var one = read("/메이플m/","/검마연습방/"+"/명단/"+ ten[i].trim() + ".txt")
                var real_one = all + "\n\n---------------\n\n" + one
                save("/메이플m/", "/검마연습방/"+"전체명단.txt", real_one);   
              }else{
                var one2 = read("/메이플m/","/검마연습방/"+"/명단/"+ ten[i].trim() + ".txt")
                save("/메이플m/", "/검마연습방/"+"전체명단.txt", "\n---🥕🐰🥕---\n\n" + one2);
              }
            }
            var allteam = read("/메이플m/"+"/검마연습방/","전체명단.txt")
            replier.reply("[검마] 연습 트라이방", "🐰전체명단이에요!🐰\n닉등록 및 명단작성은\n닉네임(직업)템셋 포스 기재!🥕"+줄이기+"\n\n"+allteam)
            save("/메이플m/", "/검마연습방/"+"전체명단.txt", ",");
          
            java.lang.Thread.sleep(3000)
            down_time = false
            return
          }
        }else if(msg == "연습명단"){
          if(ten_parc == "팡"){
            replier.reply("[검마] 연습 트라이방", "아무런 명단이 없어용🐰")
            down_time = false
            return
          }else{
            for(var i = 0; i < ten_parc.length; i++){
              var all_parc = read("/메이플m/","/검마연습방/"+"연습명단.txt")

              if(all_parc.indexOf("---")!=-1){
                var one_parc = read("/메이플m/","/검마연습방/"+"/명단/"+ ten_parc[i].trim() + ".txt")
                var real_one_parc = all_parc + "\n\n---------------\n\n" + one_parc
                save("/메이플m/", "/검마연습방/"+"연습명단.txt", real_one_parc);   
              }else{
                var one2_parc = read("/메이플m/","/검마연습방/"+"/명단/"+ ten_parc[i].trim() + ".txt")
                save("/메이플m/", "/검마연습방/"+"연습명단.txt", "\n---🥕🐰🥕---\n\n" + one2_parc);
              }
            }
            var allteam_parc = read("/메이플m/"+"/검마연습방/","연습명단.txt")
            replier.reply("[검마] 연습 트라이방", "🐰연습명단이에요!🐰\n닉등록 및 명단작성은\n닉네임(직업)템셋 포스 기재!🥕"+줄이기+"\n\n"+allteam_parc)
            save("/메이플m/", "/검마연습방/"+"연습명단.txt", ",");
          
            java.lang.Thread.sleep(3000)
            down_time = false
            return
          }
        }else if(msg == "숙련명단"){
          if(ten_sk == "팡"){
            replier.reply("[검마] 연습 트라이방", "아무런 명단이 없어용🐰")
            down_time = false
            return
          }else{
            for(var i = 0; i < ten_sk.length; i++){
              var all_sk = read("/메이플m/","/검마연습방/"+"숙련명단.txt")

              if(all_sk.indexOf("---")!=-1){
                var one_sk = read("/메이플m/","/검마연습방/"+"/명단/"+ ten_sk[i].trim() + ".txt")
                var real_one_sk = all_sk + "\n\n---------------\n\n" + one_sk
                save("/메이플m/", "/검마연습방/"+"숙련명단.txt", real_one_sk);   
              }else{
                var one2_sk = read("/메이플m/","/검마연습방/"+"/명단/"+ ten_sk[i].trim() + ".txt")
                save("/메이플m/", "/검마연습방/"+"숙련명단.txt", "\n---🥕🐰🥕---\n\n" + one2_sk);
              }
            }
            var allteam_sk = read("/메이플m/"+"/검마연습방/","숙련명단.txt")
            replier.reply("[검마] 연습 트라이방", "🐰숙련명단이에요!🐰\n닉등록 및 명단작성은\n닉네임(직업)템셋 포스 기재!🥕"+줄이기+"\n\n"+allteam_sk)
            save("/메이플m/", "/검마연습방/"+"숙련명단.txt", ",");
          
            java.lang.Thread.sleep(3000)
            down_time = false
            return
          }
        }else if(msg == "트라이명단"){
          if(ten_try == "팡"){
            replier.reply("[검마] 연습 트라이방", "아무런 명단이 없어용🐰")
            down_time = false
            return
          }else{
            for(var i = 0; i < ten_try.length; i++){
              var all_try = read("/메이플m/","/검마연습방/"+"트라이명단.txt")

              if(all_try.indexOf("---")!=-1){
                var one_try = read("/메이플m/","/검마연습방/"+"/명단/"+ ten_try[i].trim() + ".txt")
                var real_one_try = all_try + "\n\n---------------\n\n" + one_try
                save("/메이플m/", "/검마연습방/"+"트라이명단.txt", real_one_try);   
              }else{
                var one2_try = read("/메이플m/","/검마연습방/"+"/명단/"+ ten_try[i].trim() + ".txt")
                save("/메이플m/", "/검마연습방/"+"트라이명단.txt", "\n---🥕🐰🥕---\n\n" + one2_try);
              }
            }
            var allteam_try = read("/메이플m/"+"/검마연습방/","트라이명단.txt")
            replier.reply("[검마] 연습 트라이방", "🐰트라이명단이에요!🐰\n닉등록 및 명단작성은\n닉네임(직업)템셋 포스 기재!🥕"+줄이기+"\n\n"+allteam_try)
            save("/메이플m/", "/검마연습방/"+"트라이명단.txt", ",");
          
            java.lang.Thread.sleep(3000)
            down_time = false
            return
          }
        }else if(msg == "클리어명단"){
          if(ten_cle == "팡"){
            replier.reply("[검마] 연습 트라이방", "아무런 명단이 없어용🐰")
            down_time = false
            return
          }else{
            for(var i = 0; i < ten_cle.length; i++){
              var all_cle = read("/메이플m/","/검마연습방/"+"클리어명단.txt")

              if(all_cle.indexOf("---")!=-1){
                var one_cle = read("/메이플m/","/검마연습방/"+"/명단/"+ ten_cle[i].trim() + ".txt")
                var real_one_cle = all_cle + "\n\n---------------\n\n" + one_cle
                save("/메이플m/", "/검마연습방/"+"클리어명단.txt", real_one_cle);   
              }else{
                var one2_cle = read("/메이플m/","/검마연습방/"+"/명단/"+ ten_cle[i].trim() + ".txt")
                save("/메이플m/", "/검마연습방/"+"클리어명단.txt", "\n---🥕🐰🥕---\n\n" + one2_cle);
              }
            }
            var allteam_cle = read("/메이플m/"+"/검마연습방/","클리어명단.txt")
            replier.reply("[검마] 연습 트라이방", "🐰클리어명단이에요!🐰\n닉등록 및 명단작성은\n닉네임(직업)템셋 포스 기재!🥕"+줄이기+"\n\n"+allteam_cle)
            save("/메이플m/", "/검마연습방/"+"클리어명단.txt", ",");
          
            java.lang.Thread.sleep(3000)
            down_time = false
            return
          }
        }
      }else if(down_time == true){
        replier.reply("[검마] 연습 트라이방", "전체명단 작동 대기시간 3초 입니다!\n"+
        "3초뒤에 다시 입력해주세요 🐰")
        return
      }
    }
    
    //명단추가
    if(msg == "명단생성"){
      if(team_wait.indexOf("팀")!=-1){
        replier.reply("[검마] 연습 트라이방", "팀 생성 딜레이가 있어요!\n10초만 기다렸다 다시 꼬!🐰")
        return  
      }else{
        replier.reply("[검마] 연습 트라이방", "원하는 팀을 선택해주세요!🐰\n"
        +"🥕 10초 내로 1~4 숫자만 입력\n"
        +"1. 검마 연습팟\n"
        +"2. 검마 숙련팟\n"
        +"3. 검마 트라이팟\n"
        +"4. 검마 클팟")
        
        create_mem.push(sender)
        team_wait.push("팀")
        
        java.lang.Thread.sleep(10000)
        
        create_mem = []
        team_wait = []
        
        return;
      }
    }
    
    
    // 명단 숫자 고르기
    if(msg == "1" || msg == "2" || msg == "3" || msg == "4"){
      if(team_wait.indexOf("팀")!=-1){
        if(msg == "1"){
          team_numbering(1)
          var real_wait_team = "연습" + real_numbering + "팀"
      
          var create = create_mem[0]
          
          plus_team(msg, real_wait_team, create)
          var open_team = read("/메이플m/"+"/검마연습방/"+"/명단/", real_wait_team.trim()+".txt")
          replier.reply("[검마] 연습 트라이방", open_team)
          
          create_mem = []
          team_wait = []
          real_numbering = []
          
          return
        }else if(msg == "2"){
          team_numbering(2)
          var real_wait_team = "숙련" + real_numbering + "팀"
          
          var create = create_mem[0]
          
          plus_team(msg, real_wait_team, create)
          var open_team = read("/메이플m/"+"/검마연습방/"+"/명단/", real_wait_team.trim()+".txt")
          replier.reply("[검마] 연습 트라이방", open_team)
          
          create_mem = []
          team_wait = []
          real_numbering = []
          
          return
        }else if(msg == "3"){
          team_numbering(3)
          var real_wait_team = "트라이" + real_numbering + "팀"
          
          var create = create_mem[0]
          
          plus_team(msg, real_wait_team, create)
          var open_team = read("/메이플m/"+"/검마연습방/"+"/명단/", real_wait_team.trim()+".txt")
          replier.reply("[검마] 연습 트라이방", open_team)
          
          create_mem = []
          team_wait = []
          real_numbering = []
          
          return
        }else if(msg == "4"){
          team_numbering(4)
          var real_wait_team = "클리어" + real_numbering + "팀"
          
          var create = create_mem[0]
          
          plus_team(msg, real_wait_team, create)
          var open_team = read("/메이플m/"+"/검마연습방/"+"/명단/", real_wait_team.trim()+".txt")
          replier.reply("[검마] 연습 트라이방", open_team)
          
          create_mem = []
          team_wait = []
          real_numbering = []
          
          return
        }              
      }
    }
    
    //명단보기
    if(msg.indexOf("팀 명단")!=-1){
      var team_num = msg.split(" 명단")[0]
      var all_team_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("\n");
      all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
      all_team_list = all_team_list.replace(/\.txt/g,"")
      
      var rr = all_team_list.split("\n")

      real_list = []
      real_list.push(rr)
      
      if(real_list[0].find(element => element == team_num)){
     
        var see_team = read("/메이플m/"+"/검마연습방/"+"/명단/", team_num.trim() + ".txt")
        replier.reply("[검마] 연습 트라이방", see_team)
        real_list = []
        return
      }else{
        replier.reply("[검마] 연습 트라이방", "롸??? 뭔팀이요??? 🐰")
        real_list = []
        return
      }
    }else if(msg.indexOf("팀명단")!=-1){
      replier.reply("[검마] 연습 트라이방", "○팀 명단 으로 치세염ㅇㅅㅇ🐰")
      return
    }
    
    
    //명단삭제
    if (msg.indexOf("팀 삭제")!=-1){
      var all_team_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("\n");
      all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
      all_team_list = all_team_list.replace(/\.txt/g,"")
      var rr = all_team_list.split("\n")

      real_list = []
      real_list.push(rr)
      
      var del_team = msg.split(" 삭제")[0]
      if(real_list[0].find(element => element == del_team)){
        new java.io.File(sdcard+"/메이플m/"+"검마연습방/"+"/명단/"+ del_team.trim() + ".txt").delete();
        replier.reply("[검마] 연습 트라이방", del_team + "이 삭제됐어요 🐰");
        real_list = []
        return;
      }else{
        replier.reply("[검마] 연습 트라이방", "그런팀은 없습니다만?? ㅇ ㅅㅇ🐰");
        real_list = []
        return;
      }
    }
 
 
    //시간변경
    if((msg.indexOf("!")!=-1) && (msg.indexOf("팀시간 ")!=-1)){
      var all_team_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("\n");
      all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
      all_team_list = all_team_list.replace(/\.txt/g,"")
      
      var rr = all_team_list.split("\n")

      real_list = []
      real_list.push(rr)
      
      var team_time_name = msg.split("시간 ")[0]
      var real_team_time_name = team_time_name.split("!")[1]
      
      var time_content = msg.split("팀시간 ")[1]
      
      if(real_list[0].find(element => element == real_team_time_name)){
        if(time_content.indexOf("욜")!=-1 || time_content.indexOf("모출")!=-1){
          var list_team = read("/메이플m/"+"/검마연습방/"+"/명단/", real_team_time_name.trim() + ".txt");
          if(list_team.indexOf("⭐️ [시간] ex)")!= -1){
            if((time_content.indexOf("고정")!=-1) || time_content.indexOf("매주")!=-1){
              var change_time = list_team.replace("⭐️ [시간] ex) !•팀시간 ••","⭐️ "+time_content);
              save("/메이플m/"+"/검마연습방/"+"/명단/", real_team_time_name.trim() + ".txt", change_time);
        
              replier.reply("[검마] 연습 트라이방", change_time);
              real_list = []
              return;
            }else{
              var change_time = list_team.replace("⭐️ [시간] ex) !•팀시간 ••","⭐️ "+time_content + " [🍒D+1]");
              save("/메이플m/"+"/검마연습방/"+"/명단/", real_team_time_name.trim() + ".txt", change_time);
        
              replier.reply("[검마] 연습 트라이방", change_time);
              real_list = []
              return;
            }
          }else{
            var change_material = list_team.split("⭐️ ")[1]
            var change_material2 = change_material.split("🥕생성자")[0].trim()
            if((time_content.indexOf("고정")!=-1) || time_content.indexOf("매주")!=-1){
              var change_2 = list_team.replace(change_material2, time_content);
              save("/메이플m/"+"/검마연습방/"+"/명단/", real_team_time_name.trim() + ".txt", change_2);
          
              replier.reply("[검마] 연습 트라이방", change_2);
              real_list = []
              return
            }else{
              var change_2 = list_team.replace(change_material2, time_content + " [🍒D+1]");
              save("/메이플m/"+"/검마연습방/"+"/명단/", real_team_time_name.trim() + ".txt", change_2);
          
              replier.reply("[검마] 연습 트라이방", change_2);
              real_list = []
              return
            }
          }
        }else{
          replier.reply("[검마] 연습 트라이방", "날짜,요일,시간을 적어주세요 ㅡㅅㅡ\n"+
          "모출은 모출만 적어도 돼요!\n\n"+
          "ex) 11.20 화욜 2100\n요일은 욜로 통일[월욜, 화욜, 수욜] 🐰")
          return
        }
      }else{
      replier.reply("[검마] 연습 트라이방", "없는팀 입니다만? ㅇ ㅅㅇ🐰");
      real_list = []
      return
      }
    }
    
    
    //팀 메모 추가
 
    if(msg.indexOf("팀메모 ")!=-1){
      var team_name = msg.split("메모 ")[0]
      var memo_content = msg.split("팀메모 ")[1]
      if(memo_content.indexOf("🥕메모 :")!=-1){
        replier.reply("[검마] 연습 트라이방", "메모내용에 빼야할게 있어요!\n🥕메모 : << 이건 빼야해요🐰")
        return
      }else{
        var all_team_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("\n");
        all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
        all_team_list = all_team_list.replace(/\.txt/g,"")
      
        var rr = all_team_list.split("\n")

        real_list = []
        real_list.push(rr)
      
        if(real_list[0].find(element => element == team_name)){
          var team_content = read("/메이플m/"+"/검마연습방/"+"/명단/", team_name.trim() + ".txt");
          var memo_carrot = team_content.split("🥕메모 : ")[1]
          var memo_complite = team_content.replace("🥕메모 : " + memo_carrot, "🥕메모 : " + memo_content)
          
          //고정 매주 추가 시 카운팅 삭제
          if((memo_content.indexOf("고정")!=-1) || memo_content.indexOf("매주")!=-1){
            var change_memt = memo_complite.split("⭐️ ")[1]
            var change_memt2 = change_memt.split("🥕생성자")[0].trim()
            
            if(change_memt2.indexOf("🍒D+")!=-1){
              var tt_time = change_memt2.split(" [🍒D+")[0]
              var memo_complite_t = memo_complite.replace(change_memt2, tt_time)
              
              save("/메이플m/"+"/검마연습방/"+"/명단/", team_name.trim() + ".txt", memo_complite_t);
              
              replier.reply("[검마] 연습 트라이방", memo_complite_t);
              real_list = []
              return
            }
          }
          
          save("/메이플m/"+"/검마연습방/"+"/명단/", team_name.trim() + ".txt", memo_complite);
        
          replier.reply("[검마] 연습 트라이방", memo_complite);
          real_list = []
          return
        }else{
          replier.reply("[검마] 연습 트라이방", "없는팀인데요 ㅇ ㅅㅇ?🐰");
          real_list = []
          return
        }
      }
    }
    
    
    //팀 메모 삭제
    if(msg.indexOf("팀 메모삭제")!=-1){
      var team_name1 = msg.split(" 메모삭제")[0]
      var all_team_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("\n");
      all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
      all_team_list = all_team_list.replace(/\.txt/g,"")
      
      var rr = all_team_list.split("\n")

      real_list = []
      real_list.push(rr)
      
      if(real_list[0].find(element => element == team_name1)){
        var team_content1 = read("/메이플m/"+"/검마연습방/"+"/명단/", team_name1.trim() + ".txt");
        var memo_carrot1 = team_content1.split("🥕메모 : ")[1]
        var memo_complite1 = team_content1.replace("🥕메모 : " + memo_carrot1, "🥕메모 : " + "")
        save("/메이플m/"+"/검마연습방/"+"/명단/", team_name1.trim() + ".txt", memo_complite1);
        
        replier.reply("[검마] 연습 트라이방", memo_complite1);
        real_list = []
        return
      }else{
        replier.reply("[검마] 연습 트라이방", "없는팀인데요 ㅇ ㅅㅇ?🐰");
        real_list = []
        return
      }
    }
    
    
    //팀명 변경하기
    if(msg.indexOf("팀팀명 ")!=-1){
      var team_name2 = msg.split("팀명")[0]
      var team_change_name = msg.split("팀명 ")[1]
      if(team_change_name.indexOf("팀")!=-1){
        
      }else{
        var team_change_name = msg.split("팀명 ")[1] + "팀"
      }
      var all_team_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("\n");
      all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
      all_team_list = all_team_list.replace(/\.txt/g,"")
      var rr = all_team_list.split("\n")

      real_list = []
      real_list.push(rr)
      
      if(real_list[0].find(element => element == team_name2)){
        var team_content2 = read("/메이플m/"+"/검마연습방/"+"/명단/", team_name2.trim() + ".txt");
        var team_change_material = team_content2.split(" 🐰")[0]
        var team_change_complite = team_content2.replace(team_change_material,"[" + team_change_name)
        save("/메이플m/"+"/검마연습방/"+"/명단/", team_change_name.trim()+".txt", team_change_complite)
        replier.reply("[검마] 연습 트라이방", team_change_complite)
        new java.io.File(sdcard+"/메이플m/"+"검마연습방/"+"/명단/"+ team_name2.trim() + ".txt").delete();
        real_list = []
        return
      }else {
        replier.reply("[검마] 연습 트라이방", "없는팀인데요 ㅇ ㅅㅇ?🐰");
        real_list = []
        return
      }
    }
    
    
    //명단등록
    if((msg.indexOf("팀")!=-1) && (msg.indexOf("번")!=-1)){
      var bye_mem_mtr = read("/메이플m/","/경고/"+"추방"+".txt");
      var bye_mem = bye_mem_mtr.split(",")
      var bye_mem_mtr2 = read("/메이플m/","/경고/"+"검마추방"+".txt");
      var bye_mem2 = bye_mem_mtr2.split(",")
      
      if(msg.indexOf("취소")!=-1){
        var num1 = msg.split("팀")[1]
        var num2 = num1.split("취소")[0].trim().replace(/[^0-9]/g, "")
        
        var team2 = msg.split("팀")[0]
        var team2 = team2 + "팀"
        
        var all_team_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("\n");
        all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
        all_team_list = all_team_list.replace(/\.txt/g,"")
        var rr = all_team_list.split("\n")

        real_list = []
        real_list.push(rr)
        
        if(real_list[0].find(element => element == team2)){
          var content_team = read("/메이플m/"+"/검마연습방/"+"/명단/", team2.trim() + ".txt");
          num2 = Number(num2)
          var num3 = num2 + 1
          var i_num = numbering[num2]
          var i_num2 = numbering[num3]
          var push_material = content_team.split(i_num)[1]
          
          if(content_team.indexOf(i_num + "(")!=-1){
            var overlap_push = push_material.split(i_num2)[0].trim()
            var overlap_push2 = overlap_push.split(")")[1]
            var carrotover = push_material.split("🥕메모 :")[0].trim()
            var carrotover2 = carrotover.split(")")[1]
            if(num2 == 10){
              if(carrotover2 == ""){
                replier.reply("[검마] 연습 트라이방", "이미 빈칸이에요 ㅇㅅㅇ🐰")
                real_list = []
                return
              }else{
                var memo_name = carrotover.split(" ")[0]
                var carrotover3 = carrotover.split(memo_name)[1].trim()
                
                var del_name = content_team.replace(carrotover3, "")
                replier.reply("[검마] 연습 트라이방", del_name)
                save("/메이플m/"+"/검마연습방/"+"/명단/", team2.trim() + ".txt", del_name);
                         
                real_list = []
                return
              }
            }else{
              if(overlap_push2 == ""){
                replier.reply("[검마] 연습 트라이방", "이미 빈칸이에요 ㅇㅅㅇ🐰")
                real_list = []
                return
              }else{
                var memo_name_1 = overlap_push.split(" ")[0]
                var overlap_push3 = overlap_push.split(memo_name_1)[1].trim()
                
                var del_name_1 = content_team.replace(overlap_push3, "")
                replier.reply("[검마] 연습 트라이방", del_name_1)
                save("/메이플m/"+"/검마연습방/"+"/명단/", team2.trim() + ".txt", del_name_1);
                
                real_list = []
                return
              }   
            }
          }else{
            var overlap_push_v = push_material.split(i_num2)[0].trim()
            if(overlap_push_v == ""){
              replier.reply("[검마] 연습 트라이방", "이미 빈칸이에요 ㅇㅅㅇ🐰")
              real_list = []
              return      
            }else{
              var del_name_2 = content_team.replace(overlap_push_v, "")
              replier.reply("[검마] 연습 트라이방", del_name_2)
              save("/메이플m/"+"/검마연습방/"+"/명단/", team2.trim() + ".txt", del_name_2);
                
              real_list = []
              return
              }
          }
        }else{
          replier.reply("[검마] 연습 트라이방", "없는 팀인데여...?ㅇㅅ ㅇ🐰")
          real_list = []
          return
        }
      }else if(msg.indexOf("삭제")!=-1){
        replier.reply("[검마] 연습 트라이방", "○팀○번 취소\n위 내용처럼 해야해요🐰")
        real_list = []
        return
      }else{ //명단작성
        var nick_name = msg.split("번")[1].trim()
        var list_nick = read("/메이플m/","/검마연습방/"+"/닉네임/"+"닉네임모음.txt")
        list_nick = JSON.parse(list_nick)
        var number1 = msg.split("팀")[1]
        var number2 = number1.split(nick_name)[0].trim().replace(/[^0-9]/g, "")
        var number2_non = number1.split("번")[0].trim()
        var nick_name = msg.split(number2_non + "번")[1].trim()
        
        var team1 = msg.split("팀")[0]
        var team2 = team1 + "팀"
        
        //강퇴당한 사람들
        for(var w = 0; w < bye_mem.length + 1; w++){
          if(nick_name.indexOf(bye_mem[w])!=-1){
            replier.reply("[검마] 연습 트라이방", "🐰 " + nick_name + "\n위 인원은 강퇴 제재 대상입니다.\n"
            +"문의사항 있다면 문의방 방문해주세요.")
            return
          }else if(sender.indexOf(bye_mem[w])!=-1){
            replier.reply("[검마] 연습 트라이방", "🐰 " + sender + "\n위 인원은 강퇴 제재 대상입니다.\n"
            +"문의사항 있다면 문의방 방문해주세요.")
            return
          }
        }
        
        if((team1.indexOf("트라이")!=-1) || (team1.indexOf("클리어")!=-1)){
        
          for(var y = 0; y < bye_mem2.length + 1; y++){
            if(nick_name.indexOf(bye_mem2[y])!=-1){
              replier.reply("[검마] 연습 트라이방", "🐰 " + nick_name + "\n위 인원은 강퇴 제재 대상입니다.\n"
              +"문의사항 있다면 문의방 방문해주세요.")
              return
            }else if(sender.indexOf(bye_mem2[y])!=-1){
              replier.reply("[검마] 연습 트라이방", "🐰 " + sender + "\n위 인원은 강퇴 제재 대상입니다.\n"
              +"문의사항 있다면 문의방 방문해주세요.")
              return
            }
          }
        }else{
          
        }
        
        //스펙 강제 (아케인/앱솔)
        if(nick_name !== ""){
          for(var pec = 0; pec < item_spec.length - 1; pec++){
            var last_num = item_spec.length - 1
            if(nick_name.indexOf(item_spec[pec])!=-1){
              break
            }else{
              if(item_spec[pec] == item_spec[last_num]){
                if(nick_name.indexOf(item_spec[last_num])!=-1){
              
                }else{
                  replier.reply("[검마] 연습 트라이방", "🐰" + sender + "\n\n" +
                  "⚠️스펙을 작성 해주세요ㅡㅅㅡ!!\n"+
                  "스펙을 작성 했지만 이 안내가 나왔다면\n"+
                  "아래 내용처럼 작성 해주세요!\n\n"+
                  "🍒예시: 2앜 5앱 풀풀 6칠\n"+
                  "【아케인(앜), 앱솔(앱), 칠흑(칠) 포함 필수】")
                  return
                }
              }
            }
          }
          
          for(var exc = 0; exc < exception.length +1; exc++){
            if(nick_name.indexOf(exception[exc])!=-1){
              unique = true
              break
            }
          }
          
          if(unique == true){
            unique = false
          }else if(unique == false){
            if(nick_name.indexOf("칠")!=-1){
              
            }else{
              replier.reply("[검마] 연습 트라이방", "🐰" + sender + "\n\n" +
              "⚠️스펙을 작성 해주세요ㅡㅅㅡ!!\n"+
              "스펙을 작성 했지만 이 안내가 나왔다면\n"+
              "아래 내용처럼 작성 해주세요!\n\n"+
              "🍒예시: 2앜 5앱 풀풀 6칠\n"+
              "【아케인(앜), 앱솔(앱), 칠흑(칠) 포함 필수】")
              
              return
            }
          }
        }
        
        save("/메이플m/"+"/검마연습방/", "팀명".trim() + ".txt", team2);
        save("/메이플m/"+"/검마연습방/", "팀번호".trim() + ".txt", number2);
        save("/메이플m/"+"/검마연습방/", "팀닉넴".trim() + ".txt", nick_name);
        var all_team_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("\n");
        all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
        all_team_list = all_team_list.replace(/\.txt/g,"")
        var rr = all_team_list.split("\n")

        real_list = []
        real_list.push(rr)
        
        if(real_list[0].find(element => element == team2)){
          number2 = Number(number2)
          var number3 = number2 + 1
          var team_content3 = read("/메이플m/"+"/검마연습방/"+"/명단/", team2.trim() + ".txt");
          var i_number = numbering[number2]
          var i_number2 = numbering[number3]
          var push_material = team_content3.split(i_number)[1]
          
          //닉등록 한 사람 
          if(nick_name == ""){
            var nick_name2 = list_nick[0][sender]
            
            //강퇴당한 사람들
            if(nick_name2 !== undefined){
              for(var w = 0; w < bye_mem.length + 1; w++){
                if(nick_name2.indexOf(bye_mem[w])!=-1){
                  replier.reply("[검마] 연습 트라이방", "🐰 " + nick_name2 + "\n위 인원은 강퇴 제재 대상입니다.\n"
                  +"문의사항 있다면 문의방 방문해주세요.")
                  
                  real_list = []
                  return
                }else if(sender.indexOf(bye_mem[w])!=-1){
                  replier.reply("[검마] 연습 트라이방", "🐰 " + sender + "\n위 인원은 강퇴 제재 대상입니다.\n"
                  +"문의사항 있다면 문의방 방문해주세요.")
                  
                  real_list = []
                  return
                }
              }
              
              if((team1.indexOf("트라이")!=-1) || (team1.indexOf("클리어")!=-1)){
        
                for(var y = 0; y < bye_mem2.length + 1; y++){
                  if(nick_name2.indexOf(bye_mem2[y])!=-1){
                    replier.reply("[검마] 연습 트라이방", "🐰 " + nick_name2 + "\n위 인원은 강퇴 제재 대상입니다.\n"
                    +"문의사항 있다면 문의방 방문해주세요.")
                  
                    real_list = []
                    return
                  }else if(sender.indexOf(bye_mem2[y])!=-1){
                    replier.reply("[검마] 연습 트라이방", "🐰 " + sender + "\n위 인원은 강퇴 제재 대상입니다.\n"
                    +"문의사항 있다면 문의방 방문해주세요.")
                  
                    real_list = []
                    return
                  }
                }
              }else{
                
              }
            }
            
            if(nick_name2 !== undefined){
              
              //스펙 강제 (아케인/앱솔)
              for(var pec = 0; pec < item_spec.length +1; pec++){
                var last_num = item_spec.length - 1
                if(nick_name2.indexOf(item_spec[pec])!=-1){
                  break
                }else{
                  if(item_spec[pec] == item_spec[last_num]){
                    if(nick_name2.indexOf(item_spec[last_num])!=-1){
              
                    }else{
                      replier.reply("[검마] 연습 트라이방", "🐰" + sender + "\n\n" +
                      "⚠️스펙을 작성 해주세요ㅡㅅㅡ!!\n"+
                      "스펙을 작성 했지만 이 안내가 나왔다면\n"+
                      "아래 내용처럼 작성 해주세요!\n\n"+
                      "🍒예시: 2앜 5앱 풀풀 6칠\n"+
                      "【아케인(앜), 앱솔(앱), 칠흑(칠) 포함 필수】")
                      
                      real_list = []
                      return
                    }
                  }
                }
              }
              if(nick_name2.indexOf("칠")!=-1){
          
              }else{
                replier.reply("[검마] 연습 트라이방", "🐰" + sender + "\n\n" +
                "⚠️스펙을 작성 해주세요ㅡㅅㅡ!!\n"+
                "스펙을 작성 했지만 이 안내가 나왔다면\n"+
                "아래 내용처럼 작성 해주세요!\n\n"+
                "🍒예시: 2앜 5앱 풀풀 6칠\n"+
                "【아케인(앜), 앱솔(앱), 칠흑(칠) 포함 필수】")
                
                real_list = []
                return
              }
            }
        
            number2_non = Number(number2_non)
            var number3_non = number2_non + 1
            var i_number_non = numbering[number2_non]
            var i_number2_non = numbering[number3_non]
            var push_material_non = team_content3.split(i_number_non)[1]
            save("/메이플m/"+"/검마연습방/", "팀번호".trim() + ".txt", number2_non);
            save("/메이플m/"+"/검마연습방/", "팀닉넴".trim() + ".txt", nick_name2);
            
            //진짜 등록인지 체크
            if(nick_name2 !== undefined){
              if(team_content3.indexOf(i_number_non + "(")!=-1){
                var overlap_push = push_material_non.split(i_number2_non)[0].trim()
                var overlap_push2 = overlap_push.split(")")[1]
                var carrotover = push_material_non.split("🥕메모 :")[0].trim()
                var carrotover2 = carrotover.split(")")[1]
                if(number2_non == 10){
                  if(carrotover2 == ""){
                    var push_nick = team_content3.replace(carrotover, carrotover + " " + nick_name2)
                    replier.reply("[검마] 연습 트라이방", push_nick)
                    save("/메이플m/"+"/검마연습방/"+"/명단/", team2.trim()+".txt", push_nick)
                    real_list = []
                    return
                  }else{
                    var memo_name = carrotover.split(" ")[0]
                    var carrotover3 = carrotover.split(memo_name)[1].trim()
                    save("/메이플m/"+"/검마연습방/", "변경".trim() + ".txt", carrotover3);
                    
                    //명단덮기
                    replier.reply("[검마] 연습 트라이방", carrotover3 + " 님의 자리!\n진짜 바꿔요?\n바꾼다면 10초내로 '네' 입력🐰")
                    wait_dic[sender] = team2 + " " + number2_non + "번 " + carrotover3 + "자리 " + nick_name2
                    java.lang.Thread.sleep(10000)
                    delete wait_dic[sender]
                    real_list = []
                    return
                  }
                }else{
                  if(overlap_push2 == ""){
                    var push_nick = team_content3.replace(overlap_push, overlap_push + " " + nick_name2)
                    replier.reply("[검마] 연습 트라이방", push_nick)
                    save("/메이플m/"+"/검마연습방/"+"/명단/", team2.trim()+".txt", push_nick)
                    real_list = []
                    return
                  }else{
                    var memo_name_1 = overlap_push.split(" ")[0]
                    var overlap_push3 = overlap_push.split(memo_name_1)[1].trim()
                    save("/메이플m/"+"/검마연습방/", "변경".trim() + ".txt", overlap_push3);
                    
                    //명단덮기
                    replier.reply("[검마] 연습 트라이방", overlap_push3 + " 님의 자리!\n진짜 바꿔요?\n바꾼다면 10초내로 '네' 입력🐰")
                    wait_dic[sender] = team2 + " " + number2_non + "번 " + overlap_push3 + "자리 " + nick_name2
                    java.lang.Thread.sleep(10000)
                    delete wait_dic[sender]
                    real_list = []
                    return
                  }
                }
              }else{
                var overlap_push_v = push_material_non.split(i_number2_non)[0].trim()
                if(overlap_push_v == ""){
                  var push_nick2 = team_content3.replace(i_number_non, i_number_non + " " + nick_name2)
                  replier.reply("[검마] 연습 트라이방", push_nick2)
                  save("/메이플m/"+"/검마연습방/"+"/명단/", team2.trim()+".txt", push_nick2)
                  real_list = []
                  return      
                }else{
                  save("/메이플m/"+"/검마연습방/", "변경".trim() + ".txt", overlap_push_v);
                  
                  //명단덮기
                  replier.reply("[검마] 연습 트라이방", overlap_push_v + " 님의 자리!\n진짜 바꿔요?\n바꾼다면 10초내로 '네' 입력🐰")
                  wait_dic[sender] = team2 + " " + number2_non + "번 " + overlap_push_v + "자리 " + nick_name2
                  java.lang.Thread.sleep(10000)
                  delete wait_dic[sender]
                  real_list = []
                  return
                }
              }
            }else{
              replier.reply("[검마] 연습 트라이방", "없는 닉네임입니다?!\n닉네임등록 후 이용하시지요?ㅇㅅㅇ🐰")
              real_list = []
              return
            }
          
          //닉등록 안한 사람
          }else{
            var nick_null = msg.split("번 ")[1]
            if(nick_null == ""){
              replier.reply("[검마] 연습 트라이방", "번 뒤에 띄어쓰기 하지 마세여!\n○팀○번 으로 다시 작성!🐰")
              return
            }
            if(team_content3.indexOf(i_number + "(")!=-1){
              var overlap_push = push_material.split(i_number2)[0].trim()
              var overlap_push2 = overlap_push.split(")")[1]
              var carrotover = push_material.split("🥕메모 :")[0].trim()
              var carrotover2 = carrotover.split(")")[1]
              if(number2 == 10){
                if(carrotover2 == ""){
                  var push_nick = team_content3.replace(carrotover, carrotover + " " + nick_name)
                  replier.reply("[검마] 연습 트라이방", push_nick)
                  save("/메이플m/"+"/검마연습방/"+"/명단/", team2.trim()+".txt", push_nick)
                  real_list = []
                  return
                }else{
                  var memo_name = carrotover.split(" ")[0]
                  var carrotover3 = carrotover.split(memo_name)[1].trim()
                  save("/메이플m/"+"/검마연습방/", "변경".trim() + ".txt", carrotover3);
                  //명단덮기 
                  replier.reply("[검마] 연습 트라이방", carrotover3 + " 님의 자리!\n진짜 바꿔요?\n바꾼다면 10초내로 '네' 입력🐰")
                  wait_dic[sender] = team2 + " " + number2 + "번 " + carrotover3 + "자리 " + nick_name
                  java.lang.Thread.sleep(10000)
                  delete wait_dic[sender]
                  real_list = []
                  return
                }
              }else{
                if(overlap_push2 == ""){
                  var push_nick = team_content3.replace(overlap_push, overlap_push + " " + nick_name)
                  replier.reply("[검마] 연습 트라이방", push_nick)
                  save("/메이플m/"+"/검마연습방/"+"/명단/", team2.trim()+".txt", push_nick)
                  real_list = []
                  return
                }else{
                  var memo_name_1 = overlap_push.split(" ")[0]
                  var overlap_push3 = overlap_push.split(memo_name_1)[1].trim()
                  save("/메이플m/"+"/검마연습방/", "변경".trim() + ".txt", overlap_push3);
                  //명단덮기
                  replier.reply("[검마] 연습 트라이방", overlap_push3 + " 님의 자리!\n진짜 바꿔요?\n바꾼다면 10초내로 '네' 입력🐰")
                  wait_dic[sender] = team2 + " " + number2 + "번 " + overlap_push3 + "자리 " + nick_name
                  java.lang.Thread.sleep(10000)
                  delete wait_dic[sender]
                  real_list = []
                  
                  return
                }
              }
            }else{
              var overlap_push_v = push_material.split(i_number2)[0].trim()
              if(overlap_push_v == ""){
                var push_nick2 = team_content3.replace(i_number, i_number + " " + nick_name)
                replier.reply("[검마] 연습 트라이방", push_nick2)
                save("/메이플m/"+"/검마연습방/"+"/명단/", team2.trim()+".txt", push_nick2)
                real_list = []
                return      
              }else{
                save("/메이플m/"+"/검마연습방/", "변경".trim() + ".txt", overlap_push_v);
                
                //명단덮기
                replier.reply("[검마] 연습 트라이방", overlap_push_v + " 님의 자리!\n진짜 바꿔요?\n바꾼다면 10초내로 '네' 입력🐰")
                wait_dic[sender] = team2 + " " + number2 + "번 " + overlap_push_v + "자리 " + nick_name
                java.lang.Thread.sleep(10000)
                delete wait_dic[sender]
                real_list = []
                return
              }
            }
          }
        }else{
          replier.reply("[검마] 연습 트라이방", "없는 팀인데요? ㅇ ㅅㅇ?🐰")
          real_list = []
          return
        }
      }
    }
    
    //명단 덮기
    if(msg == "네"){
      if(wait_dic[sender] !== undefined){
        for(var g = 0; g < 50; g++){
          if(yes_time == false){
            yes_time = true
            var team_nname = wait_dic[sender].split(" ")[0]
            var num_mate = wait_dic[sender].split("번 ")[0]
            var dic_team_num = num_mate.split("팀 ")[1]
            var ic_num = numbering[dic_team_num]
            
            var team_nick = wait_dic[sender].split("자리 ")[1]
            var team_content4 = read("/메이플m/"+"/검마연습방/"+"/명단/", team_nname.trim() + ".txt")
            var out_mate = wait_dic[sender].split("자리 ")[0]
            var team_out_name = out_mate.split("번 ")[1]
            var team_real_name = team_content4.split(ic_num)[1]
        
            var change_name = team_real_name.replace(team_out_name, team_nick)
            var change_name2 = team_content4.replace(team_real_name, change_name)
            save("/메이플m/"+"/검마연습방/"+"/명단/", team_nname.trim() + ".txt", change_name2)
            replier.reply("[검마] 연습 트라이방", change_name2)
          
            delete wait_dic[sender]
            yes_time = false
            break
          }
        }
      }
      return
    }
    
    
    
    //명단초기화
    if((msg.indexOf("팀")!=-1) && (msg.indexOf(" 초기화")!=-1)){
      var del_team_name = msg.split("팀")[0]
      var del_team_name = del_team_name + "팀"
      var reset_chec = del_team_name + " "
      var reset_chec_fin = msg.split(reset_chec)[1]
      
      if(reset_chec_fin == "초기화"){
        var all_team_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("\n");
        all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
        all_team_list = all_team_list.replace(/\.txt/g,"")
        var rr = all_team_list.split("\n")

        real_list = []
        real_list.push(rr)
      
        if(real_list[0].find(element => element == del_team_name)){
          var load_team = read("/메이플m/"+"/검마연습방/"+"/명단/", del_team_name.trim() + ".txt")
          var boss_name = load_team.split("🥕[")[1]
          var boss_name2 = boss_name.split("]")[0]
          var boss_mod = boss_name.split("] ")[1]
          var boss_mod2 = boss_mod.split("팟")[0]
        
          var time_material = load_team.split("⭐️ ")[1]
          var real_time = time_material.split("🥕생성자")[0].trim()
        
          var create_del1 = load_team.split("[명단 생성자 : ")[1]
          var create_del2 = create_del1.split("]")[0]
        
          var memo_material = load_team.split("🥕메모 : ")[1]
        
          if(boss_name2 == "검마"){
            var a = 0
            if(boss_mod2 == "연습"){
              var a = a + 1
              var normal_memo = "🥕메모 : "
            }else if(boss_mod2 == "숙련"){
              var a = a + 2
              var normal_memo = "🥕메모 : "
            }else if(boss_mod2 == "트라이"){
              var a = a + 3
              var normal_memo = "🥕메모 : \n🚨단판신고 원할경우🚨\n메모작성 시 【단판신고】 키워드\n반드시 꼭 넣어주세요!🐰\n\n" +
                                "⚠️키워드가 없다면 단판신고 안돼요!"
            }else{
              var a = a + 4
              var normal_memo = "🥕메모 : \n🚨단판신고 원할경우🚨\n메모작성 시 【단판신고】 키워드\n반드시 꼭 넣어주세요!🐰\n\n" +
                                "⚠️키워드가 없다면 단판신고 안돼요!"
            }
            plus_team(a, del_team_name, create_del2)
            var load_team2 = read("/메이플m/"+"/검마연습방/"+"/명단/", del_team_name.trim() + ".txt")
            var changes1 = load_team2.replace("⭐️ [시간] ex) !•팀시간 ••","⭐️ "+real_time)
            var changes2 = changes1.replace(normal_memo, "🥕메모 : " + memo_material)
          
            replier.reply("[검마] 연습 트라이방", changes2)
            save("/메이플m/"+"/검마연습방/"+"/명단/", del_team_name.trim() + ".txt", changes2)
            real_list = []
            return
          }
        }else{
          replier.reply("[검마] 연습 트라이방", "없는 팀인데요? ㅇ ㅅㅇ?🐰")
          real_list = []
          return
        }
      }
    }
    
    //생성자 변경
    if(msg.indexOf("팀생성자 ")!=-1){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var crea_team = msg.split("생성자")[0]
          var team_create_name = msg.split("팀생성자 ")[1]
          var all_team_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("\n");
          all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
          all_team_list = all_team_list.replace(/\.txt/g,"")
          var rr = all_team_list.split("\n")

          real_list = []
          real_list.push(rr)
      
          if(real_list[0].find(element => element == crea_team)){
            var crea_content = read("/메이플m/"+"/검마연습방/"+"/명단/", crea_team.trim() + ".txt");
            var crea_change_material = crea_content.split("[명단 생성자 : ")[1]
            var crea_change_material2 = crea_change_material.split("]")[0]
            var crea_change_complite = crea_content.replace(crea_change_material2, team_create_name)
            save("/메이플m/"+"/검마연습방/"+"/명단/", crea_team.trim()+".txt", crea_change_complite)
            replier.reply("[검마] 연습 트라이방", crea_change_complite)
            
            real_list = []
            return
          }else {
            replier.reply("[검마] 연습 트라이방", "없는팀인데요 ㅇ ㅅㅇ?🐰");
            real_list = []
            return
          }
        }else{
          replier.reply("[검마] 연습 트라이방", "관리자 불러오세여 ㅇㅅ ㅇ🐰")
          return
        }
      }
    }
    
    //가르치기
    if(msg.indexOf("!가르치기") ==0){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          var study0 = msg.substring(6,msg.length)
          var study1 = study0.split("=")
          var suy1 = study1[0]
          var suy2 = study1[1]
       
          replier.reply("[검마] 연습 트라이방", "🐰 토니가 아래내용을 기억해요"+줄이기+"\n"+suy1 +"을(를) " + suy2 +"(으)로 배웠어요🐰")
          save("/메이플m/"+"/검마연습방/"+"/생각집/",suy1.trim()+".txt", suy2)
          return
        }
      }
      replier.reply("[검마] 연습 트라이방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //가르치기 대답
    var talk = read("/메이플m/"+"/검마연습방/"+"/생각집/",msg+".txt")
    if(talk !== null){
  
      replier.reply("[검마] 연습 트라이방", talk+" 🐰")
      return
    }
 
    //생각지우기
    if(msg.indexOf("!생각지우기") ==0){
      for(var a = 0; a < sender_m.length; a++){
        if(sender.indexOf(sender_m[a])!=-1){
          replier.reply("[검마] 연습 트라이방", msg.substr(7) + "의 생각내용 : " + read("/메이플m/"+"/검마연습방/"+"/생각집/",msg.substr(7) + ".txt"));
          var talk2 = read("/메이플m/"+"/검마연습방/"+"/생각집/",msg.substr(7)+".txt")
          if(talk2 == null){
    
            replier.reply("[검마] 연습 트라이방", "토니가 지울 생각이 없어요🐰")
            return
          }else if(talk2 !== null){
            new java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/생각집/" + msg.substr(7) + ".txt").delete()
            replier.reply("[검마] 연습 트라이방", "토니가 "+"''"+msg.substr(7)+"''" + " 생각을 지웠어요🐰")
            return
          }
        }
      }
      replier.reply("[검마] 연습 트라이방", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //생각모음
    
    if(msg=='!생각모음'){
      var list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/생각집/").listFiles().join("\n");
      list = list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/생각집\//g,"");
      list = list.replace(/\.txt/g,"")
      
      replier.reply("[검마] 연습 트라이방", "🐰토니의 생각들이에요\n"+줄이기+"\n\n"+list)
      return
    }
    
    //위치기능
    if(msg.startsWith("!위치 ")){
      your_pl = []
      var pl_name = msg.split("!위치 ")[1]
      
      var pl_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("");
      pl_list = pl_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
      
      if(pl_list == ""){
        replier.reply("[검마] 연습 트라이방", "아무런 명단이 없어요!ㅇ ㅅㅇ🐰")
        return
      }
      
      var pl_to = pl_list.split(".txt")
      var pl_ten = pl_to.sort()
      
      //null값 제거
      pl_ten = pl_ten.filter(function(non){
        return non !== null && non !== undefined && non !== ""
      })
      
      //순서정렬
      pl_ten_parc = []
      pl_ten_sk = []
      pl_ten_try = []
      pl_ten_cle = []
        
      for(var t = 0; t < pl_ten.length; t++){
        if(pl_ten[t].indexOf("연습")!=-1){
          pl_ten_parc.push(pl_ten[t])
        }else if(pl_ten[t].indexOf("숙련")!=-1){
          pl_ten_sk.push(pl_ten[t])
        }else if(pl_ten[t].indexOf("트라이")!=-1){
          pl_ten_try.push(pl_ten[t])
        }else{
          pl_ten_cle.push(pl_ten[t])
        }
      }
      pl_ten_parc.sort(
      function(a, b){
        return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
      })
      pl_ten_sk.sort(
      function(a, b){
        return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
      })
      pl_ten_try.sort(
      function(a, b){
        return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
      })
      pl_ten_cle.sort(
      function(a, b){
        return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
      })
      
      if(pl_ten_parc.length == 0){
        pl_ten_parc.push("팡")
      }
      if(pl_ten_sk.length == 0){
        pl_ten_sk.push("팡")
      }
      if(pl_ten_try.length == 0){
        pl_ten_try.push("팡")
      }
      if(pl_ten_cle.length == 0){
        pl_ten_cle.push("팡")
      }
      
      pl_ten = pl_ten_parc.join() + "," + pl_ten_sk.join() + "," + pl_ten_try.join() + "," + pl_ten_cle.join()
      for(var g = 0; g < 4; g++){
        pl_ten = pl_ten.replace(",팡", "")
      }
      pl_ten = pl_ten.replace("팡,", "")
      pl_ten = pl_ten.split(",")
      
      
      for(var i = 0; i < pl_ten.length; i++){
        var check_pl = read("/메이플m/","/검마연습방/"+"/명단/"+ pl_ten[i].trim() + ".txt")
        var del_creat = check_pl.split("[명단 생성자 : ")[1]
        var del_creat2 = del_creat.split("]")[0]
        var pl_complt = check_pl.replace(del_creat2, "")
        var pl_time = check_pl.split("⭐️")[1]
        var pl_time2 = pl_time.split("🥕")[0]
        
        if(pl_complt.indexOf(pl_name)!=-1){
          your_pl.push(pl_ten[i] + "  " + pl_time2)
        }
      }
      
      if(your_pl.length == 0){
        replier.reply("[검마] 연습 트라이방", "아무팀에도 없는데여 ㅇㅅㅇ?🐰")
        return
      }
      var pl_send = "➖" + your_pl.join("\n➖")
      
      
      replier.reply("[검마] 연습 트라이방", "🍒 [" + pl_name + "] 의 팀이에요!!\n\n"+
      pl_send+"\n\n"+
      "이제 그만 까먹으시죠 ㅇ ㅅㅇ 🐰\n\n"+
      "🚫 주의\n서버만 다른 동일닉, 동일 문구가 들어가는 영문명은 "+
      "본인이 속한 명단이 아니더라도 표기될 수 있습니다!")
      
      your_pl = []
      
      return
    }
    
    //파티검색
    if(msg.startsWith("!파티찾기 ")){
      
      party_pl = []
      var pl_party = msg.substr(6)
      
      var partytt = ["월", "화", "수", "목", "금", "토", "일", "모출"]
      if(partytt.indexOf(pl_party)!=-1){
        
        var pl_list = java.io.File(sdcard+"/메이플m/"+"/검마연습방/"+"/명단/").listFiles().join("");
        pl_list = pl_list.replace(/\/storage\/emulated\/0\/메이플m\/검마연습방\/명단\//g,"");
        
        if(pl_list == ""){
        replier.reply("[검마] 연습 트라이방", "아무런 명단이 없어요!ㅇ ㅅㅇ🐰")
        return
        }
      
        var pl_to = pl_list.split(".txt")
        var pl_ten = pl_to.sort()
      
        //null값 제거
        pl_ten = pl_ten.filter(function(non){
          return non !== null && non !== undefined && non !== ""
        })
      
        //순서정렬
        pl_ten_parc = []
        pl_ten_sk = []
        pl_ten_try = []
        pl_ten_cle = []
        
        for(var t = 0; t < pl_ten.length; t++){
          if(pl_ten[t].indexOf("연습")!=-1){
            pl_ten_parc.push(pl_ten[t])
          }else if(pl_ten[t].indexOf("숙련")!=-1){
            pl_ten_sk.push(pl_ten[t])
          }else if(pl_ten[t].indexOf("트라이")!=-1){
            pl_ten_try.push(pl_ten[t])
          }else{
            pl_ten_cle.push(pl_ten[t])
          }
        }
        pl_ten_parc.sort(
        function(a, b){
          return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
        })
        pl_ten_sk.sort(
        function(a, b){
          return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
        })
        pl_ten_try.sort(
        function(a, b){
          return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
        })
        pl_ten_cle.sort(
        function(a, b){
          return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
        })
      
        if(pl_ten_parc.length == 0){
          pl_ten_parc.push("팡")
        }
        if(pl_ten_sk.length == 0){
          pl_ten_sk.push("팡")
        }
        if(pl_ten_try.length == 0){
          pl_ten_try.push("팡")
        }
        if(pl_ten_cle.length == 0){
          pl_ten_cle.push("팡")
        }
      
        pl_ten = pl_ten_parc.join() + "," + pl_ten_sk.join() + "," + pl_ten_try.join() + "," + pl_ten_cle.join()
        for(var g = 0; g < 4; g++){
          pl_ten = pl_ten.replace(",팡", "")
        }
        pl_ten = pl_ten.replace("팡,", "")
        pl_ten = pl_ten.split(",") 
      
      
        for(var i = 0; i < pl_ten.length; i++){
          var check_pl = read("/메이플m/","/검마연습방/"+"/명단/"+ pl_ten[i].trim() + ".txt")
          var pl_time = check_pl.split("⭐️")[1]
          var pl_time2 = pl_time.split("🥕")[0]
          
          if(pl_time2.indexOf(pl_party)!=-1){
            if(pl_party == "일"){
              if(pl_time2.indexOf("월요일")!=-1){
                  
              }else if(pl_time2.indexOf("화요일")!=-1){
                
              }else if(pl_time2.indexOf("수요일")!=-1){
                
              }else if(pl_time2.indexOf("목요일")!=-1){
                
              }else if(pl_time2.indexOf("금요일")!=-1){
                
              }else if(pl_time2.indexOf("토요일")!=-1){
                
              }else{
                
                for(var check = 1; check < 11; check++){
              
                  if(check !== 10){
                    var r_number = Number(check)
                    var r_number2 = r_number + 1
                    var i_c_number = numbering[r_number]
                    var i_c_number2 = numbering[r_number2]
              
                    var no_name = check_pl.split(i_c_number)[1]
                    var no_name2 = no_name.split(i_c_number2)[0].trim()
              
                    if(check == 1){
                      var no_name2 = no_name2.replace("(초대:)", "")
                    }else if(check == 8){
                      var no_name2 = no_name2.replace("(리프:)", "")
                    }else if(check == 9){
                      var no_name2 = no_name2.replace("(은월:)", "")
                    }
              
                    if(no_name2 == ""){
                      party_pl.push(pl_ten[i])
                      break
                    }
                  }else{
                    var r_number = Number(check)
                    var i_c_number = numbering[r_number]
                
                    var no_name = check_pl.split(i_c_number)[1]
                    var no_name2 = no_name.split("🥕메모 : ")[0].trim()
                
                    var no_name2 = no_name2.replace("(숍:)", "")
                
                    if(no_name2 == ""){
                      party_pl.push(pl_ten[i])
                    }
                  }        
                }       
              }
            }else{
              for(var check = 1; check < 11; check++){
              
                if(check !== 10){
                  var r_number = Number(check)
                  var r_number2 = r_number + 1
                  var i_c_number = numbering[r_number]
                  var i_c_number2 = numbering[r_number2]
              
                  var no_name = check_pl.split(i_c_number)[1]
                  var no_name2 = no_name.split(i_c_number2)[0].trim()
              
                  if(check == 1){
                    var no_name2 = no_name2.replace("(초대:)", "")
                  }else if(check == 8){
                    var no_name2 = no_name2.replace("(리프:)", "")
                  }else if(check == 9){
                    var no_name2 = no_name2.replace("(은월:)", "")
                  }
              
                  if(no_name2 == ""){
                    party_pl.push(pl_ten[i])
                    break
                  }
                }else{
                  var r_number = Number(check)
                  var i_c_number = numbering[r_number]
                
                  var no_name = check_pl.split(i_c_number)[1]
                  var no_name2 = no_name.split("🥕메모 : ")[0].trim()
                
                  var no_name2 = no_name2.replace("(숍:)", "")
                
                  if(no_name2 == ""){
                    party_pl.push(pl_ten[i])
                  }
                }
              }        
            }
          }
        }
        
        if(pl_party == "모출"){
        
        }else{
          pl_party = pl_party + "요일"
        }
        
        if(party_pl.length == 0){
          replier.reply("[검마] 연습 트라이방", pl_party + "은 아무도 안가나봐요\n아니면 풀방이거나?! ㅇ ㅅㅇ🐰")
          return
        }else{
          for(var i = 0; i < party_pl.length; i++){
            var w_all = read("/메이플m/","/검마연습방/"+"파티찾기.txt")

            if(w_all.indexOf("---")!=-1){
              var w_one = read("/메이플m/","/검마연습방/"+"/명단/"+ party_pl[i].trim() + ".txt")
              var w_real_one = w_all + "\n\n---------------\n\n" + w_one
              save("/메이플m/", "/검마연습방/"+"파티찾기.txt", w_real_one);   
            }else{
              var w_one2 = read("/메이플m/","/검마연습방/"+"/명단/"+ party_pl[i].trim() + ".txt")
              save("/메이플m/", "/검마연습방/"+"파티찾기.txt", "\n---🥕🐰🥕---\n\n" + w_one2);
            }
          }
          var w_allteam = read("/메이플m/"+"/검마연습방/","파티찾기.txt")
          replier.reply("[검마] 연습 트라이방", "🐰 [" + pl_party + "] 빈자리 팀이에요!!🐰\n\n생성자는 요일 안적으면\n"+
          "파티찾기로 명단안나옵니당ㅇㅅㅇ!🥕"+
          "\n\n🚫주의\n일요일은 •월 •일 도 포함이니 확인 필수!"+줄이기+"\n\n"+w_allteam)
          save("/메이플m/", "/검마연습방/"+"파티찾기.txt", ",");

          party_pl = []
          return
        }
      }else{
        replier.reply("[검마] 연습 트라이방", "월화수목금토일 모출\n위 단어로만 검색해주세요! 🐰")
        return
      }
    }
     
    //도움말
    if(msg == "도움말"){
  
    replier.reply("[검마] 연습 트라이방", "🐰토니의 사용법이에요 보세요!\n"+
    "명령어가 잘못 되었다면 반응하지 않아요\n\n"+
    "• 닉네임등록 토니\nex) 토니(토끼)7아케인 2000포스\n"+
    "• 닉네임연동\n"+
    "• 전체명단or명단\n"+
    "• 팀 생성 > 명단생성\n"+
    "• 팀 삭제 > ○팀 삭제\n"+
    "• 팀시간 변경 > !○팀시간 --\n"+
    "• 팀메모 내용 > ○팀메모 --\n"+
    "• 팀 메모삭제 > ○팀 메모삭제\n"+
    "• 팀명 변경 > ○팀팀명 --\n"+
    "• 명단넣기 > ○팀○번\n"+
    "• 명단넣기 > ○팀○번 닉네임\n"+
    "• 명단빼기 > ○팀○번 취소\n"+
    "• 명단리셋 > ○팀 초기화\n"+
    "• 명단확인 > ○팀 명단\n"+
    "• 팀위치 확인 > !위치 뜡부\n"+
    "• 파티찾기 > !파티찾기 요일\n"+
    "• 토니 Gpt > #토니 ---\n"+
    "내용이 정확하게 나오지 않는다면\n학습 시켜주세요!")
    
    return
    }
    
    
    }catch(e){
      replier.reply("[검마] 연습 트라이방", "명령어 오류!!!\n"
      +"도움말 입력하여 봇사용법 보세요!\n"+
      "해결 안되면 뜡부 멘션주세요🐰"+e)
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

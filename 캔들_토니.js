var scriptName = "토니-캔들";

/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply("⭐️캔들⭐️", message)
 * (boolean) replier.reply("⭐️캔들⭐️", room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
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

//팀 숫자
numbering = ["","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]

//대기명단
wait_name = []

//초기화저장 닉
reset_nick = {}

//내 해쉬코드
ddung_hash = -1277576667

// 팀추가
function plus_team(wait_team){
  
  var title_team = "[" + wait_team + " 명단 🐰]"
  var nomar_team = title_team +
  "\n⭐️ [시간] ex) !•팀시간 ••" +
  "\n🥕토니는 귀여워요!" +
  "\n\n1️⃣(초대:)\n2️⃣\n3️⃣\n4️⃣\n5️⃣\n6️⃣\n7️⃣\n8️⃣(팬텀/격:)\n9️⃣(은월/격:)\n🔟(숍/격:)" +
  "\n\n🥕메모 : "
  save("/메이플m/"+"/명단모음/", wait_team.trim()+".txt", nomar_team)
  return
}


black = []
gold = []
except = []
blacktotal = 23
goldtotal = 20

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  try{
  if(isGroupChat==true){
  if((room=="⭐️캔들⭐️" ) || (room=="Chansung")){
    
    //관리자등록
    if(msg.startsWith("관리자등록 ")){
      if(sender.indexOf("뜡부")!=-1){
        var mas_nick = msg.substr(6)
        var mas_data_nick = read("/메이플m/","관리자.txt")
        master.push(mas_data_nick)
        var real_master = mas_data_nick.split(",")
        var check_nick = real_master.find(name => name == mas_nick)
        if(check_nick !== undefined){
          replier.reply("⭐️캔들⭐️", "이미 관리잔데요?ㅇ ㅅㅇ🐰")
          master = []
          return
        }else{
          master.push(mas_nick)
          var good_master = master.join()
          save("/메이플m/", "관리자.txt", good_master);
          replier.reply("⭐️캔들⭐️", mas_nick + " 님은 이제부터\n토니 당근담당 입니다 🐰")
          master = []
          return
        }
      }else{
        replier.reply("⭐️캔들⭐️", "솔솔 전용 명령어에요 🐰")
        return
      }
    }
    
    
    //닉네임등록
    if(msg.startsWith("닉네임등록 ")){
      var nick = msg.substr(6)
      var r_nick = read("/메이플m/"+"/캔들닉넴/","닉네임.txt")
      if(r_nick.indexOf("}]")!=-1){
        var rr_nick = JSON.parse(r_nick)
        rr_nick[0][sender] = nick
          
        var re_nick = JSON.stringify(rr_nick)
        save("/메이플m/"+"/캔들닉넴/","닉네임.txt", re_nick);
        
        replier.reply("⭐️캔들⭐️", sender + " 님은 이제부터\n" + nick + " 으로 되었슘다🐰")
        return
        }else{
          replier.reply("⭐️캔들⭐️", "뜡부에게 연락 기기🐰")
          return
        }
      }
      
    //명단생성
    if(msg.indexOf("팀 생성")!=-1){
      var team_name = msg.split(" 생성")[0]
      var all_team_list = java.io.File(sdcard+"/메이플m/"+"/명단모음/").listFiles().join("\n");
      all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/명단모음\//g,"");
      all_team_list = all_team_list.replace(/\.txt/g,"")
      
      var rr = all_team_list.split("\n")
      real_list = []
      real_list.push(rr)
      
      if(real_list[0].find(element => element == team_name)){
        replier.reply("⭐️캔들⭐️", "이미 있는 팀입니다! 🐰")
        real_list = []
        return
      }else{
        plus_team(team_name)
        var open_team = read("/메이플m/"+"/명단모음/", team_name.trim()+".txt")
        replier.reply("⭐️캔들⭐️", open_team)
        real_list = []
        return;
      }
    }

    //명단보기
    if(msg.indexOf("팀 명단")!=-1){
      var team_n = msg.split(" 명단")[0]
      var all_team_list = java.io.File(sdcard+"/메이플m/"+"/명단모음/").listFiles().join("\n");
      all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/명단모음\//g,"");
      all_team_list = all_team_list.replace(/\.txt/g,"")
      
      var rr = all_team_list.split("\n")

      real_list = []
      real_list.push(rr)
      
      if(real_list[0].find(element => element == team_n)){
     
        var see_team = read("/메이플m/"+"/명단모음/", team_n.trim() + ".txt")
        replier.reply("⭐️캔들⭐️", see_team)
        real_list = []
        return
      }else{
        replier.reply("⭐️캔들⭐️", "롸??? 뭔팀이요??? 🐰")
        real_list = []
        return
      }
    }else if(msg.indexOf("팀명단")!=-1){
      replier.reply("⭐️캔들⭐️", "○팀 명단 으로 치세염ㅇㅅㅇ🐰")
      return
    }

    //명단삭제
    if(msg.indexOf("팀 삭제")!=-1){
      var all_team_list = java.io.File(sdcard+"/메이플m/"+"/명단모음/").listFiles().join("\n");
      all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/명단모음\//g,"");
      all_team_list = all_team_list.replace(/\.txt/g,"")
      var rr = all_team_list.split("\n")

      real_list = []
      real_list.push(rr)
      
      var del_t = msg.split(" 삭제")[0]
      if(real_list[0].find(element => element == del_t)){
        new java.io.File(sdcard+"/메이플m/"+"/명단모음/"+ del_t.trim() + ".txt").delete();
        replier.reply("⭐️캔들⭐️", del_t + "이 삭제됐어요 🐰");
        real_list = []
        return;
      }else{
        replier.reply("⭐️캔들⭐️", "그런팀은 없습니다만?? ㅇ ㅅㅇ🐰");
        real_list = []
        return;
      }
    }

    //전체명단
    if(msg == "전체명단" || msg == "명단"){
      
      var list = java.io.File(sdcard+"/메이플m/"+"/명단모음/").listFiles().join("");
      list = list.replace(/\/storage\/emulated\/0\/메이플m\/명단모음\//g,"");
      
      var to = list.split(".txt")
      var ten = to.sort()
      
      //null값 제거
      ten = ten.filter(function(non){
        return non !== null && non !== undefined && non !== ""
      })
      
      if(ten.length === 0){
        replier.reply("⭐️캔들⭐️", "아무런 명단이 없어용🐰")
        return
      }else{
        for(var i = 0; i < ten.length; i++){
          var all = read("/메이플m/","전체명단.txt")

          if(all.indexOf("---")!=-1){
            var one = read("/메이플m/"+"/명단모음/", ten[i].trim() + ".txt")
            var real_one = all + "\n\n---------------\n\n" + one
            save("/메이플m/","전체명단.txt", real_one);   
          }else{
            var one2 = read("/메이플m/"+"/명단모음/", ten[i].trim() + ".txt")
            save("/메이플m/","전체명단.txt", "\n---🥕🐰🥕---\n\n" + one2);
          }
        }
        var allteam = read("/메이플m/","전체명단.txt")
        replier.reply("⭐️캔들⭐️", "🐰전체명단이에요!🐰\n"+줄이기+"\n\n"+allteam)
        save("/메이플m/","전체명단.txt", ",");
        return
      }
    }

    
    //명단등록
    if((msg.indexOf("팀")!=-1) && (msg.indexOf("번")!=-1)){
      if(msg.indexOf("취소")!=-1){
        var num1 = msg.split("팀")[1]
        var num2 = num1.split("취소")[0].trim().replace(/[^0-9]/g, "")
        
        var team2 = msg.split("팀")[0]
        var team2 = team2 + "팀"
        
        var all_team_list = java.io.File(sdcard+"/메이플m/"+"/명단모음/").listFiles().join("\n");
        all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/명단모음\//g,"");
        all_team_list = all_team_list.replace(/\.txt/g,"")
        var rr = all_team_list.split("\n")

        real_list = []
        real_list.push(rr)
        
        if(real_list[0].find(element => element == team2)){
          var content_team = read("/메이플m/"+"/명단모음/", team2.trim() + ".txt");
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
                replier.reply("⭐️캔들⭐️", "이미 빈칸이에요 ㅇㅅㅇ🐰")
                real_list = []
                return
              }else{
                var memo_name = carrotover.split(" ")[0]
                var carrotover3 = carrotover.split(memo_name)[1].trim()
                
                var del_name = content_team.replace(carrotover3, "")
                replier.reply("⭐️캔들⭐️", del_name)
                save("/메이플m/"+"/명단모음/", team2.trim() + ".txt", del_name);
                         
                real_list = []
                return
              }
            }else{
              if(overlap_push2 == ""){
                replier.reply("⭐️캔들⭐️", "이미 빈칸이에요 ㅇㅅㅇ🐰")
                real_list = []
                return
              }else{
                var memo_name_1 = overlap_push.split(" ")[0]
                var overlap_push3 = overlap_push.split(memo_name_1)[1].trim()
                
                var del_name_1 = content_team.replace(overlap_push3, "")
                replier.reply("⭐️캔들⭐️", del_name_1)
                save("/메이플m/"+"/명단모음/", team2.trim() + ".txt", del_name_1);
                
                real_list = []
                return
              }   
            }
          }else{
            var overlap_push_v = push_material.split(i_num2)[0].trim()
            if(overlap_push_v == ""){
              replier.reply("⭐️캔들⭐️", "이미 빈칸이에요 ㅇㅅㅇ🐰")
              real_list = []
              return      
            }else{
              var del_name_2 = content_team.replace(overlap_push_v, "")
              replier.reply("⭐️캔들⭐️", del_name_2)
              save("/메이플m/"+"/명단모음/", team2.trim() + ".txt", del_name_2);
                
              real_list = []
              return
              }
          }
        }else{
          replier.reply("⭐️캔들⭐️", "없는 팀인데여...?ㅇㅅ ㅇ🐰")
          real_list = []
          return
        }
      }else if(msg.indexOf("삭제")!=-1){
        replier.reply("⭐️캔들⭐️", "○팀○번 취소\n위 내용처럼 해야해요🐰")
        real_list = []
        return
      }else{ //명단작성
        var nick_name = msg.split("번")[1].trim()
        var list_nick = read("/메이플m/"+"/캔들닉넴/","닉네임.txt")
        list_nick = JSON.parse(list_nick)
        var number1 = msg.split("팀")[1]
        var number2 = number1.split(nick_name)[0].trim().replace(/[^0-9]/g, "")
        var number2_non = number1.split("번")[0].trim()
        var nick_name = msg.split(number2_non + "번")[1].trim()
        
        var team1 = msg.split("팀")[0]
        var team2 = team1 + "팀"
            
        save("/메이플m/", "팀명".trim() + ".txt", team2);
        save("/메이플m/", "팀번호".trim() + ".txt", number2);
        save("/메이플m/", "팀닉넴".trim() + ".txt", nick_name);
        var all_team_list = java.io.File(sdcard+"/메이플m/"+"/명단모음/").listFiles().join("\n");
        all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/명단모음\//g,"");
        all_team_list = all_team_list.replace(/\.txt/g,"")
        var rr = all_team_list.split("\n")

        real_list = []
        real_list.push(rr)
        
        if(real_list[0].find(element => element == team2)){
          number2 = Number(number2)
          var number3 = number2 + 1
          var team_content3 = read("/메이플m/"+"/명단모음/", team2.trim() + ".txt");
          var i_number = numbering[number2]
          var i_number2 = numbering[number3]
          var push_material = team_content3.split(i_number)[1]
               
          if(nick_name == ""){
            var nick_name2 = list_nick[0][sender]
            
            number2_non = Number(number2_non)
            var number3_non = number2_non + 1
            var i_number_non = numbering[number2_non]
            var i_number2_non = numbering[number3_non]
            var push_material_non = team_content3.split(i_number_non)[1]
            save("/메이플m/", "팀번호".trim() + ".txt", number2_non);
            save("/메이플m/", "팀닉넴".trim() + ".txt", nick_name2);
            if(nick_name2 !== undefined){
              if(team_content3.indexOf(i_number_non + "(")!=-1){
                var overlap_push = push_material_non.split(i_number2_non)[0].trim()
                var overlap_push2 = overlap_push.split(")")[1]
                var carrotover = push_material_non.split("🥕메모 :")[0].trim()
                var carrotover2 = carrotover.split(")")[1]
                if(number2_non == 10){
                  if(carrotover2 == ""){
                    var push_nick = team_content3.replace(carrotover, carrotover + " " + nick_name2)
                    replier.reply("⭐️캔들⭐️", push_nick)
                    save("/메이플m/"+"/명단모음/", team2.trim()+".txt", push_nick)
                    real_list = []
                    return
                  }else{
                    var memo_name = carrotover.split(" ")[0]
                    var carrotover3 = carrotover.split(memo_name)[1].trim()
                    save("/메이플m/", "변경".trim() + ".txt", carrotover3);
        
                    replier.reply("⭐️캔들⭐️", carrotover3 + " 님의 자리!\n진짜 바꿔요?\n바꾼다면 10초내로 '네' 입력🐰")
                    wait_name.push(sender)
                    java.lang.Thread.sleep(10000)
                    wait_name.filter((element) => element !== sender)
                    real_list = []
                    return
                  }
                }else{
                  if(overlap_push2 == ""){
                    var push_nick = team_content3.replace(overlap_push, overlap_push + " " + nick_name2)
                    replier.reply("⭐️캔들⭐️", push_nick)
                    save("/메이플m/"+"/명단모음/", team2.trim()+".txt", push_nick)
                    real_list = []
                    return
                  }else{
                    var memo_name_1 = overlap_push.split(" ")[0]
                    var overlap_push3 = overlap_push.split(memo_name_1)[1].trim()
                    save("/메이플m/", "변경".trim() + ".txt", overlap_push3);
                    
                    replier.reply("⭐️캔들⭐️", overlap_push3 + " 님의 자리!\n진짜 바꿔요?\n바꾼다면 10초내로 '네' 입력🐰")
                    wait_name.push(sender)
                    java.lang.Thread.sleep(10000)
                    wait_name.filter((element) => element !== sender)
                    real_list = []
                    return
                  }
                }
              }else{
                var overlap_push_v = push_material_non.split(i_number2_non)[0].trim()
                if(overlap_push_v == ""){
                  var push_nick2 = team_content3.replace(i_number_non, i_number_non + " " + nick_name2)
                  replier.reply("⭐️캔들⭐️", push_nick2)
                  save("/메이플m/"+"/명단모음/", team2.trim()+".txt", push_nick2)
                  real_list = []
                  return      
                }else{
                  save("/메이플m/", "변경".trim() + ".txt", overlap_push_v);
                  
                  replier.reply("⭐️캔들⭐️", overlap_push_v + " 님의 자리!\n진짜 바꿔요?\n바꾼다면 10초내로 '네' 입력🐰")
                  wait_name.push(sender)
                  java.lang.Thread.sleep(10000)
                  wait_name.filter((element) => element !== sender)
                  real_list = []
                  return
                }
              }
            }else{
              replier.reply("⭐️캔들⭐️", "없는 닉네임입니다?!\n닉네임등록 후 이용하시지요?ㅇㅅㅇ🐰")
              real_list = []
              return
            }
          }else{
            var nick_null = msg.split("번 ")[1]
            if(nick_null == ""){
              replier.reply("⭐️캔들⭐️", "번 뒤에 띄어쓰기 하지 마세여!\n○팀○번 으로 다시 작성!🐰")
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
                  replier.reply("⭐️캔들⭐️", push_nick)
                  save("/메이플m/"+"/명단모음/", team2.trim()+".txt", push_nick)
                  real_list = []
                  return
                }else{
                  var memo_name = carrotover.split(" ")[0]
                  var carrotover3 = carrotover.split(memo_name)[1].trim()
                  save("/메이플m/", "변경".trim() + ".txt", carrotover3);
                    
                  replier.reply("⭐️캔들⭐️", carrotover3 + " 님의 자리!\n진짜 바꿔요?\n바꾼다면 10초내로 '네' 입력🐰")
                  wait_name.push(sender)
                  java.lang.Thread.sleep(10000)
                  wait_name.filter((element) => element !== sender)
                  real_list = []
                  return
                }
              }else{
                if(overlap_push2 == ""){
                  var push_nick = team_content3.replace(overlap_push, overlap_push + " " + nick_name)
                  replier.reply("⭐️캔들⭐️", push_nick)
                  save("/메이플m/"+"/명단모음/", team2.trim()+".txt", push_nick)
                  real_list = []
                  return
                }else{
                  var memo_name_1 = overlap_push.split(" ")[0]
                  var overlap_push3 = overlap_push.split(memo_name_1)[1].trim()
                  save("/메이플m/", "변경".trim() + ".txt", overlap_push3);
                  //에러자리
                  replier.reply("⭐️캔들⭐️", overlap_push3 + " 님의 자리!\n진짜 바꿔요?\n바꾼다면 10초내로 '네' 입력🐰")
                  wait_name.push(sender)
                  java.lang.Thread.sleep(10000)
                  wait_name.filter((element) => element !== sender)
                  real_list = []
                  
                  return
                }
              }
            }else{
              var overlap_push_v = push_material.split(i_number2)[0].trim()
              if(overlap_push_v == ""){
                var push_nick2 = team_content3.replace(i_number, i_number + " " + nick_name)
                replier.reply("⭐️캔들⭐️", push_nick2)
                save("/메이플m/"+"/명단모음/", team2.trim()+".txt", push_nick2)
                real_list = []
                return      
              }else{
                save("/메이플m/", "변경".trim() + ".txt", overlap_push_v);
                
                replier.reply("⭐️캔들⭐️", overlap_push_v + " 님의 자리!\n진짜 바꿔요?\n바꾼다면 10초내로 '네' 입력🐰")
                wait_name.push(sender)
                java.lang.Thread.sleep(10000)
                wait_name.filter((element) => element !== sender)
                real_list = []
                return
              }
            }
          }
        }else{
          replier.reply("⭐️캔들⭐️", "없는 팀인데요? ㅇ ㅅㅇ?🐰")
          real_list = []
          return
        }
      }
    }
    
    //명단 덮기
    if(msg == "네"){
      if(wait_name.indexOf(sender)!=-1){
        
        var team_nname =  read("/메이플m/", "팀명".trim() + ".txt");
        var team_nick = read("/메이플m/", "팀닉넴".trim() + ".txt");
        var team_content4 = read("/메이플m/"+"/명단모음/", team_nname.trim() + ".txt")
        var team_out_name = read("/메이플m/", "변경".trim() + ".txt")
        var team_real_name = team_content4.split("(초대:")[1]
        
        var change_name = team_real_name.replace(team_out_name, team_nick)
        var change_name2 = team_content4.replace(team_real_name, change_name)
        save("/메이플m/"+"/명단모음/", team_nname.trim() + ".txt", change_name2)
        replier.reply("⭐️캔들⭐️", change_name2)
        return
      }
    }
    
    
    
    //명단초기화
    if((msg.indexOf("팀")!=-1) && (msg.indexOf(" 초기화")!=-1)){
      var del_team_name = msg.split("팀")[0]
      var del_team_name = del_team_name + "팀"
      var reset_chec = del_team_name + " "
      var reset_chec_fin = msg.split(reset_chec)[1]
      
      if(reset_chec_fin == "초기화"){
        var all_team_list = java.io.File(sdcard+"/메이플m/"+"/명단모음/").listFiles().join("\n");
        all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/명단모음\//g,"");
        all_team_list = all_team_list.replace(/\.txt/g,"")
        var rr = all_team_list.split("\n")

        real_list = []
        real_list.push(rr)
      
        if(real_list[0].find(element => element == del_team_name)){
          var load_team = read("/메이플m/"+"/명단모음/", del_team_name.trim() + ".txt")
        
          var time_material = load_team.split("⭐️ ")[1]
          var real_time = time_material.split("🥕토니는 귀여워요!")[0].trim()
        
          var memo_material = load_team.split("🥕메모 :")[1]
          
          for(var f_nick = 1; f_nick < 11; f_nick++){
            var c_number = numbering[f_nick]
            if(f_nick == 10){
              var c_num_mem = load_team.split(c_number)[1]
              var c_num_mem2 = c_num_mem.split("🥕메모 :")[0].trim()
              
              if(c_num_mem2.indexOf("고정")!=-1){
                reset_nick[c_number] = c_num_mem2
              } 
            }else{
              var c_number2 = numbering[f_nick + 1]
              var c_num_memo = load_team.split(c_number)[1]
              var c_num_memo2 = c_num_memo.split(c_number2)[0].trim()
              
              if(c_num_memo2.indexOf("고정")!=-1){
                reset_nick[c_number] = c_num_memo2
              }  
            }        
          }
          
          plus_team(del_team_name)
          var load_team2 = read("/메이플m/"+"/명단모음/", del_team_name.trim() + ".txt")
          
          for(var fix = 1; fix < 11; fix++){
            var f_number = numbering[fix]
            var chec_f = reset_nick[f_number]
            if(chec_f == undefined){
              
            }else{
              if(fix == 1){
                load_team2 = load_team2.replace("(초대:)", chec_f)
              }else if(fix == 8){
                load_team2 = load_team2.replace("(팬텀/격:)", chec_f)
              }else if(fix == 9){
                load_team2 = load_team2.replace("(은월/격:)", chec_f)
              }else if(fix == 10){
                load_team2 = load_team2.replace("(숍/격:)", chec_f)
              }else{
                load_team2 = load_team2.replace(f_number, f_number + " " + chec_f)
              }
            }     
          }
          
          var changes1 = load_team2.replace("⭐️ [시간] ex) !•팀시간 ••","⭐️ "+real_time)
          var changes2 = changes1.replace("🥕메모 : ", "🥕메모 : " + memo_material)  
          
          replier.reply("⭐️캔들⭐️", changes2)
          save("/메이플m/"+"/명단모음/", del_team_name.trim() + ".txt", changes2)
          real_list = []
          reset_nick = {}
          return
        }else{
          replier.reply("⭐️캔들⭐️", "없는 팀인데요? ㅇ ㅅㅇ?🐰")
          real_list = []
          reset_nick = {}
          return
        }
      }
    }
 
    //시간변경
    if((msg.indexOf("!")!=-1) && (msg.indexOf("팀시간 ")!=-1)){
      var all_team_list = java.io.File(sdcard+"/메이플m/"+"/명단모음/").listFiles().join("\n");
      all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/명단모음\//g,"");
      all_team_list = all_team_list.replace(/\.txt/g,"")
      
      var rr = all_team_list.split("\n")

      real_list = []
      real_list.push(rr)
      
      var team_time_name = msg.split("시간 ")[0]
      var real_team_time_name = team_time_name.split("!")[1]
      
      var time_content = msg.split("팀시간 ")[1]
      if(real_list[0].find(element => element == real_team_time_name)){
        var list_team = read("/메이플m/"+"/명단모음/", real_team_time_name.trim() + ".txt");
        if(list_team.indexOf("⭐️ [시간] ex)")!= -1){
          var change_time = list_team.replace("⭐️ [시간] ex) !•팀시간 ••","⭐️ "+time_content);
          save("/메이플m/"+"/명단모음/", real_team_time_name.trim() + ".txt", change_time);
        
          replier.reply("⭐️캔들⭐️", change_time);
          real_list = []
          return;
        }else{
          var change_material = list_team.split("⭐️ ")[1]
          var change_material2 = change_material.split("🥕토니는 귀여워요!")[0].trim()
          var change_2 = list_team.replace(change_material2, time_content);
          save("/메이플m/"+"/명단모음/", real_team_time_name.trim() + ".txt", change_2);
          
          replier.reply("⭐️캔들⭐️", change_2);
          real_list = []
          return
        }
      }else{
      replier.reply("⭐️캔들⭐️", "없는팀 입니다만? ㅇ ㅅㅇ🐰");
      real_list = []
      return
      }
    }
    
    
    //팀 메모 추가
 
    if(msg.indexOf("팀메모 ")!=-1){
      var team_name = msg.split("메모 ")[0]
      var memo_content = msg.split("팀메모 ")[1]
      if(memo_content.indexOf("🥕메모 :")!=-1){
        replier.reply("⭐️캔들⭐️", "메모내용에 빼야할게 있어요!\n🥕메모 : << 이건 빼야해요🐰")
        return
      }else{
        var all_team_list = java.io.File(sdcard+"/메이플m/"+"/명단모음/").listFiles().join("\n");
        all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/명단모음\//g,"");
        all_team_list = all_team_list.replace(/\.txt/g,"")
      
        var rr = all_team_list.split("\n")

        real_list = []
        real_list.push(rr)
      
        if(real_list[0].find(element => element == team_name)){
          var team_content = read("/메이플m/"+"/명단모음/", team_name.trim() + ".txt");
          var memo_carrot = team_content.split("🥕메모 : ")[1]
          var memo_complite = team_content.replace("🥕메모 : " + memo_carrot, "🥕메모 : " + memo_content)
          save("/메이플m/"+"/명단모음/", team_name.trim() + ".txt", memo_complite);
        
          replier.reply("⭐️캔들⭐️", memo_complite);
          real_list = []
          return
        }else{
          replier.reply("⭐️캔들⭐️", "없는팀인데요 ㅇ ㅅㅇ?🐰");
          real_list = []
          return
        }
      }
    }
    
    
    //팀 메모 삭제
    if(msg.indexOf("팀 메모삭제")!=-1){
      var team_name1 = msg.split(" 메모삭제")[0]
      var all_team_list = java.io.File(sdcard+"/메이플m/"+"/명단모음/").listFiles().join("\n");
      all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/명단모음\//g,"");
      all_team_list = all_team_list.replace(/\.txt/g,"")
      
      var rr = all_team_list.split("\n")

      real_list = []
      real_list.push(rr)
      
      if(real_list[0].find(element => element == team_name1)){
        var team_content1 = read("/메이플m/"+"/명단모음/", team_name1.trim() + ".txt");
        var memo_carrot1 = team_content1.split("🥕메모 : ")[1]
        var memo_complite1 = team_content1.replace("🥕메모 : " + memo_carrot1, "🥕메모 : " + "")
        save("/메이플m/"+"/명단모음/", team_name1.trim() + ".txt", memo_complite1);
        
        replier.reply("⭐️캔들⭐️", memo_complite1);
        real_list = []
        return
      }else{
        replier.reply("⭐️캔들⭐️", "없는팀인데요 ㅇ ㅅㅇ?🐰");
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
      var all_team_list = java.io.File(sdcard+"/메이플m/"+"/명단모음/").listFiles().join("\n");
      all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/명단모음\//g,"");
      all_team_list = all_team_list.replace(/\.txt/g,"")
      var rr = all_team_list.split("\n")

      real_list = []
      real_list.push(rr)
      
      if(real_list[0].find(element => element == team_name2)){
        var team_content2 = read("/메이플m/"+"/명단모음/", team_name2.trim() + ".txt");
        var team_change_material = team_content2.split(" 🐰")[0]
        var team_change_complite = team_content2.replace(team_change_material,"[" + team_change_name)
        save("/메이플m/"+"/명단모음/", team_change_name.trim()+".txt", team_change_complite)
        replier.reply("⭐️캔들⭐️", team_change_complite)
        new java.io.File(sdcard+"/메이플m/"+"/명단모음/"+ team_name2.trim() + ".txt").delete();
        real_list = []
        return
      }else {
        replier.reply("⭐️캔들⭐️", "없는팀인데요 ㅇ ㅅㅇ?🐰");
        real_list = []
        return
      }
    }
    
    //명단수리 (명단 이상 없는데 에러날 경우)
    if((msg.indexOf("!")!=-1) && (msg.indexOf(" 수리")!=-1)){
      var repair_team = msg.split("!")[1]
      var repair_team2 = repair_team.split(" 수리")[0]
      var all_team_list = java.io.File(sdcard+"/메이플m/"+"/명단모음/").listFiles().join("\n");
      all_team_list = all_team_list.replace(/\/storage\/emulated\/0\/메이플m\/명단모음\//g,"");
      all_team_list = all_team_list.replace(/\.txt/g,"")
      
      var rr = all_team_list.split("\n")

      real_list = []
      real_list.push(rr)
      
      if(real_list[0].find(element => element == repair_team2)){
     
        var repair_con = read("/메이플m/"+"/명단모음/", repair_team2.trim() + ".txt")
        new java.io.File(sdcard+"/메이플m/"+"/명단모음/"+ repair_team2.trim() + ".txt").delete();
        save("/메이플m/"+"/명단모음/", repair_team2.trim() + ".txt", repair_con)
        replier.reply("⭐️캔들⭐️", repair_team2 + " 명단을 수리했어요"+
        "\n수리 했는데도 에러나면 뜡부 멘션🐰") 
        return 
      }else{
        replier.reply("⭐️캔들⭐️", "롸? 뭔팀이요?!?! ㅇ ㅅㅇ🐰")
        return
      }
    }
    
    /* 
    //가르치기
    if(msg.indexOf("!가르치기") ==0){
      var good_mas = read("/메이플m/","관리자.txt");
      var real_master = good_mas.split(",")
      for(var a = 0; a < real_master.length; a++){
        if(sender.indexOf(real_master[a])!=-1){
          var study0 = msg.substring(6,msg.length)
          var study1 = study0.split("=")
          var suy1 = study1[0]
          var suy2 = study1[1]
       
          replier.reply("⭐️캔들⭐️", "🐰 토니가 아래내용을 기억해요"+줄이기+"\n"+suy1 +"을(를) " + suy2 +"(으)로 배웠어요🐰")
          save("/메이플m/"+"/생각집/",suy1.trim()+".txt", suy2)
          return
        }
      }
      replier.reply("⭐️캔들⭐️", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    */
    //확률가르치기
    if(msg.indexOf("/가르치기")==0){
      var r = Math.floor(Math.random()*100)+1;
      if(r<=5){
        var study0 = msg.substring(6,msg.length)
        var study1 = study0.split("=")
        var suy1 = study1[0]
        var suy2 = study1[1]
     
        replier.reply("⭐️캔들⭐️", "🐰 토니가 아래내용을 기억해요"+줄이기+"\n"+suy1 +"을(를) " + suy2 +"(으)로 배웠어요🐰")
        save("/메이플m/"+"/생각집/",suy1.trim()+".txt", suy2)
        return
      }else{
        replier.reply("⭐️캔들⭐️", "🐰''"+sender+"(이)가\n🥕95%🥕 확률로 \n가르치기 실패했어요ㅇ ㅅㅇㅋ")
        return
      }
    } 
       
    //가르치기 대답
    var talk = read("/메이플m/"+"/생각집/",msg+".txt")
    if(talk !== null){
  
      replier.reply("⭐️캔들⭐️", talk+"🐰")
      return
    }
 
    //생각지우기
    if(msg.indexOf("!생각지우기") ==0){
      var good_mas = read("/메이플m/","관리자.txt");
      var real_master = good_mas.split(",")
      for(var a = 0; a < real_master.length; a++){
        if(sender.indexOf(real_master[a])!=-1){
          replier.reply("⭐️캔들⭐️", msg.substr(7) + "의 생각내용 : " + read("/메이플m/"+"/생각집/",msg.substr(7) + ".txt"));
          var talk2 = read("/메이플m/"+"/생각집/",msg.substr(7)+".txt")
          if(talk2 == null){
    
            replier.reply("⭐️캔들⭐️", "토니가 지울 생각이 없어요🐰")
            return
          }else if(talk2 !== null){
            new java.io.File(sdcard+"/메이플m/"+"/생각집/" + msg.substr(7) + ".txt").delete()
            replier.reply("⭐️캔들⭐️", "토니가 "+"''"+msg.substr(7)+"''" + " 생각을 지웠어요🐰")
            return
          }
        }
      }
      replier.reply("⭐️캔들⭐️", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }
    
    //생각모음
    
    if(msg=='!생각모음'){
      var list = java.io.File(sdcard+"/메이플m/"+"/생각집/").listFiles().join("\n");
      list = list.replace(/\/storage\/emulated\/0\/메이플m\/생각집\//g,"");
      list = list.replace(/\.txt/g,"")
      
      replier.reply("⭐️캔들⭐️", "🐰토니의 생각들이에요\n"+줄이기+"\n\n"+list)
      return
    }
      
    //날씨정보
    if (msg.startsWith("!날씨")) {
      let weather = msg.slice(4);
      if (isNaN(weather)){
        try{
          let url = org.jsoup.Jsoup.connect("https://www.google.com/search?q=" + weather + " 날씨").get();
          let resultDC = url.select("#wob_dc").text(); //상태?
          let resultPP = url.select("#wob_pp").text(); //강수확률
          let resultTM = url.select("#wob_tm").text(); //온도
          let resultWS = url.select("#wob_ws").text(); //풍속
          let resultHM = url.select("#wob_hm").text(); //습도
          if(resultDC==""){
            replier.reply("⭐️캔들⭐️", "🐰지금 현재 " + weather + "의 날씨를 모르겠어용.");
            return;
          }
          replier.reply("⭐️캔들⭐️", "🐰지금 현재 "+weather+"의 날씨는 \n\""+resultDC + "\"이야! \n🐰그리고~ 온도는 "+resultTM+"°C랭\n\n🐰강수확률: " + resultPP + "\n🐰풍속: " + resultWS + "\n🐰습도: " + resultHM +"\n\n🐰''"+sender+"'' 날씨 참고해! \n우산일지 양산일지는 본인 선택이야!");
          return
        }catch(e){
          replier.reply("⭐️캔들⭐️", "🐰불러올 수 없는 지역이거나 지원되지 않는 지역인데 북한사니?");
          return;
        }
      }else{
        replier.reply("⭐️캔들⭐️", "🐰지역을 잘못 나타냈어(EX.!날씨 \"조회할 지역\")");
        return;
      }
    }
      
    //주사위   
    if(msg=='!주사위'){
      var r = Math.floor(Math.random()*100)+1;
  
      replier.reply("⭐️캔들⭐️", "🐰''"+sender+"'' 의 결과 : "+r)
      return
    }  
   
    //수로 닉네임 삭제 및 수정
    if(msg.startsWith("#수로등록 ")){
      var my_hash = java.lang.String(imageDB.getProfileImage()).hashCode()
      if(my_hash == ddung_hash){
        var nick_text = msg.substr(6)
        save("/메이플m/"+"/캔들수로/","수로닉.txt", nick_text);
        
        replier.reply("⭐️캔들⭐️", "🐰수로 닉네임 등록 완료!")
        return
      }else{
        replier.reply("⭐️캔들⭐️", "🐰뜡부 불러 오세요!! 사칭범씨!!")
        return
      }
    }

    if(msg.startsWith("#수로추가 ")){
      var my_hash = java.lang.String(imageDB.getProfileImage()).hashCode()
      if(my_hash == ddung_hash){
        var plus_nick = msg.substr(6)
        var read_nick = read("/메이플m/"+"/캔들수로/","수로닉.txt")
        var com_nick = read_nick + "," + plus_nick

        save("/메이플m/"+"/캔들수로/","수로닉.txt", com_nick);
        replier.reply("⭐️캔들⭐️", "🐰수로 닉네임 추가 완료!")
        return
      }else{
        replier.reply("⭐️캔들⭐️", "🐰뜡부 불러 오세요!! 사칭범씨!!")
        return
      }
    }

    if(msg.startsWith("#수로삭제 ")){
      var my_hash = java.lang.String(imageDB.getProfileImage()).hashCode()
      if(my_hash == ddung_hash){
        var del_nick = msg.substr(6)
        var del_nick2 = read("/메이플m/"+"/캔들수로/","수로닉.txt")
        
        var center_nick = "," + del_nick + ","
        var first_nick = del_nick + ","
        var last_nick = "," + del_nick

        if(del_nick2.indexOf(center_nick)!=-1){
          var fix_nick = del_nick2.replace(center_nick, ",")
          save("/메이플m/"+"/캔들수로/","수로닉.txt", fix_nick);
          
          replier.reply("⭐️캔들⭐️", "🐰요청 인원 삭제 완료!")
          return
        }else if(del_nick2.indexOf(first_nick)!=-1){
          var fix_nick2 = del_nick2.replace(first_nick, "")
          save("/메이플m/"+"/캔들수로/","수로닉.txt", fix_nick2);
          
          replier.reply("⭐️캔들⭐️", "🐰요청 인원 삭제 완료!")
          return
        }else if(del_nick2.indexOf(last_nick)!=-1){
          var fix_nick3 = del_nick2.replace(last_nick, "")
          save("/메이플m/"+"/캔들수로/","수로닉.txt", fix_nick3);
          
          replier.reply("⭐️캔들⭐️", "🐰요청 인원 삭제 완료!")
          return
        }else{
          replier.reply("⭐️캔들⭐️", "🐰삭제 하려는 인원이 없어요!\n닉네임 다시 체크 해보세염!ㅇ ㅅㅇ")
          return
        }

      }else{
        replier.reply("⭐️캔들⭐️", "🐰뜡부 불러 오세요!! 사칭범씨!!")
        return
      }
    }

    //수로인원 및 현재까지 등록한 인원 확인
    if(msg == "#수로확인"){
      var good_mas = read("/메이플m/","관리자.txt");
      var good_mas2 = good_mas.split(",")

      for(var mas = 0; mas < good_mas2.length; mas++){
        if(sender.indexOf(good_mas2[mas])!=-1){
          var m_check_num = read("/메이플m/"+"/캔들수로/","수로체크.txt")
          var m_check_nick = read("/메이플m/"+"/캔들수로/","수로닉.txt")
          var m_all_num = m_check_nick.split(",").length
        
          var check_name = read("/메이플m/"+"/캔들수로/","체크인원.txt")
          var no_nick = read("/메이플m/"+"/캔들수로/","수로닉.txt")

          if(check_name == ","){
            var check_name2 = "없음"
          }else{
            var check_name2 = check_name.split(",")
          }
        
          if(check_name2 != "없음"){
            for(var ch2 = 0; ch2 < check_name2.length; ch2++){
              var ch_center = "," + check_name2[ch2] + ","
              var ch_first = check_name2[ch2] + ","
              var ch_last = "," + check_name2[ch2]

              if(no_nick.indexOf(ch_center)!=-1){
                var no_nick = no_nick.replace(ch_center, ",")
              }else if(no_nick.indexOf(ch_first)!=-1){
                var no_nick = no_nick.replace(ch_first, "")
              }else if(no_nick.indexOf(ch_last)!=-1){
                var no_nick = no_nick.replace(last_nick, "")
              }
            }
          }else if(check_name2 == "없음"){
            var no_nick = "모든 인원 (전체)"
          }
        
          if(no_nick != "모든 인원 (전체)"){
            var no_nick_num = no_nick.split(",").length
          }else if(no_nick == "모든 인원 (전체)"){
            var no_nick_num = m_all_num
          }

          replier.reply("⭐️캔들⭐️", "🐰수로 정보 확인하세요!🐰\n"+줄이기+"\n\n"+"🍒총 인원\n" + m_check_nick + "\n\n" +
                        "🍒총 인원 수 : " + m_all_num + "명\n\n" +
                        "🍒현재까지 수로 체크 완료된 인원 : " + m_check_num + "명\n" +
                        "➖➖➖➖➖➖➖➖➖➖\n" + 
                        "🚫현재까지 수로 체크 안된 인원\n" +
                        no_nick + "\n\n" +
                        "🚫수로 체크 안한 인원 수 : " + no_nick_num + "명\n" +
                        "➖➖➖➖➖➖➖➖➖➖\n" +
                        "이상 수로 정보 확인 끝! ㅇㅅ ㅇ🐰")
          return
        }
      }
      replier.reply("⭐️캔들⭐️", "🐰운영진만 사용 가능한 명령어에요!")
      return
    }




    //수로체크 (new version)
    if(msg == "#수로완"){
      var read_nick = read("/메이플m/"+"/캔들수로/","수로닉.txt")
      var suro_nick = read_nick.split(",")
      
      for(var suro = 0; suro < suro_nick.length; suro++){
        if(sender.indexOf(suro_nick[suro])!=-1){
          var check_num = read("/메이플m/"+"/캔들수로/","수로체크.txt")
          var check_name = read("/메이플m/"+"/캔들수로/","체크인원.txt")
          var check_num2 = Number(check_num) + 1
          save("/메이플m/"+"/캔들수로/","수로체크.txt", check_num2);
          
          if(check_name == ","){
            save("/메이플m/"+"/캔들수로/","체크인원.txt", suro_nick[suro]);

            replier.reply("⭐️캔들⭐️", "🐰" + sender + "\n수로 쳤음 확인 완료!")
            return
          }else{
            var check_p_n = check_name + "," + suro_nick[suro]
            save("/메이플m/"+"/캔들수로/","체크인원.txt", check_p_n);

            replier.reply("⭐️캔들⭐️", "🐰" + sender + "\n수로 쳤음 확인 완료!")
            return
          }
        }
      }
      replier.reply("⭐️캔들⭐️", "🐰" + sender + "\n수로 명단 닉네임에 등록이 안된거 같은데!?ㅇ ㅅㅇ\n\n뜡부 멘션해서 확인 요청 해봐!🐰")
      return
    }
    
    //대리수로체크
    if(msg.startsWith("#대리수로 ")){
      var deputy_nick = msg.substr(6)
      var read_nick = read("/메이플m/"+"/캔들수로/","수로닉.txt")
      var suro_nick = read_nick.split(",")
      
      for(var suro = 0; suro < suro_nick.length; suro++){
        if(deputy_nick.indexOf(suro_nick[suro])!=-1){
          var check_num = read("/메이플m/"+"/캔들수로/","수로체크.txt")
          var check_name = read("/메이플m/"+"/캔들수로/","체크인원.txt")
          var check_num2 = Number(check_num) + 1
          save("/메이플m/"+"/캔들수로/","수로체크.txt", check_num2);
          
          if(check_name == ","){
            save("/메이플m/"+"/캔들수로/","체크인원.txt", suro_nick[suro]);

            replier.reply("⭐️캔들⭐️", "🐰" + sender + "\n수로 쳤음 확인 완료!")
            return
          }else{
            var check_p_n = check_name + "," + suro_nick[suro]
            save("/메이플m/"+"/캔들수로/","체크인원.txt", check_p_n);

            replier.reply("⭐️캔들⭐️", "🐰" + sender + "\n수로 쳤음 확인 완료!")
            return
          }
        }
      }
      replier.reply("⭐️캔들⭐️", "🐰" + sender + "\n수로 명단 닉네임에 등록이 안된거 같은데!?ㅇ ㅅㅇ\n\n뜡부 멘션해서 확인 요청 해봐!🐰")
      return
    }

/*
// 수로 체크용
if(msg=="!수로설문"){
  if(마스터.indexOf(sender)!=-1){
    var sheetid = '1HAFELrrCy_c6fAy9eksRjReal8SIaZstZZXFx3MCg4o'
    var sheetname = 'tony'
    var url = 'https://opensheet.vercel.app/'+sheetid+'/'+sheetname
        
    var doc = Utils.getWebText(url) //점수표
    .replace(/<([^>]+)>/g, "") //html 태그 제거
    .trim()
     
    var jsondata = doc
    var chunksize = 1
        
    var real_score = dataslice(jsondata, chunksize)
          
    outnick = []
    for(var v=1; v<real_score.length; v++){
      var getst = JSON.stringify(real_score[v])
      var getscore1 = getst.split('undefined":"')[1]
      var getscore2 = getscore1.split('"')[0]
      if(isNaN(getscore2)){
        outnick.push(getscore2)
      }
    }
        
    replier.reply("⭐️캔들⭐️", "누가 수로설문을 안했는지 알려줄께!🐰\n\n"
                  +"------🥕수로 체크 List🥕-----\n"
                  +outnick+"\n-----🥕빨 리 하 세 요 ! !🥕-----"
                  +"\n\n"
                  +"여기있는 분들이 수로설문을 안했대요🐰")
    outnick = []
    return
  }else{
    replier.reply("⭐️캔들⭐️", "🐰관리자 불러오세요ㅇㅅㅇ")
    return
  }
}
*/
/*
    //어빌 체크용
    if(msg=="!어빌체크"){
      var good_mas = read("/메이플m/","관리자.txt");
      var real_master = good_mas.split(",")
      for(var a = 0; a < real_master.length; a++){
        if(sender.indexOf(real_master[a])!=-1){
        
          var sheetid_abil = '1HAFELrrCy_c6fAy9eksRjReal8SIaZstZZXFx3MCg4o'
          var sheetname_abil = 'tony_abil'
          var url_abil = 'https://opensheet.elk.sh/'+sheetid_abil+'/'+sheetname_abil+'!C3:C90'
        
          var doc_abil = Utils.getWebText(url_abil) //점수표
          .replace(/<([^>]+)>/g, "") //html 태그 제거
          .trim()
  
    
          doc_abil = doc_abil.replace(/{}/gi, "") // = replaceall
          for(v=0; v<5; v++){
            doc = doc_abil.replace(/,,/gi, ",")
          }
  
          var jsondata_abil = doc_abil
          var chunksize = 1
          outnick_abil = []
          try{
            var real_abil = dataslice(jsondata_abil, chunksize)
          
            for(var v=0; v<real_abil.length; v++){
              var getab = JSON.stringify(real_abil[v])
              var getabil1 = getab.split('닉네임":"')[1]
              var getabil2 = getabil1.split('"')[0]

              if(isNaN(getabil2)){
                outnick_abil.push(getabil2)
              }
            }
          }catch(err){
  
          }
          var blc = read("/메이플m/","블랙"+".txt");
          for(b=0; b<blacktotal+1; b++){
            var blackp = blc.split(",")[b]
            if(blackp == ""){
          
            }else if(blackp == undefined){
              break
            }else{
              black.push(blackp)
            }
          }
          var goold = read("/메이플m/","골드"+".txt");
          for(g=0; g<goldtotal+1; g++){
            var goldp = goold.split(",")[g]
            if(goldp == ""){
          
            }else if(goldp == undefined){
              break
            }else{
              gold.push(goldp)
            }
          }
    
          var black_abil = black.filter(x => !outnick_abil.includes(x))
          var gold_abil = gold.filter(x => !outnick_abil.includes(x))
          var except_abil = read("/메이플m/","제외"+".txt")
    
          replier.reply("⭐️캔들⭐️", "누가 어빌설문을 안했는지 알려줄께!🐰\n\n"
                        +"------🥕어빌 체크 List🥕-----\n\n"
                        +"⭐️블랙 돌멩이\n\n"+black_abil+"\n\n⭐️골드 돌멩이\n\n"+gold_abil+"\n\n⭐️제외 인원\n\n"+except_abil+"\n\n-----🥕빨 리 하 세 요 ! !🥕-----"
                        +"\n\n"
                        +"여기있는 분들이 어빌을 안했대요🐰")
          black = []
          gold = []
          outnick_abil = []
          return
        }
      }
      replier.reply("⭐️캔들⭐️", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }

    //어빌 투표용

    if(msg.indexOf("!어빌투표 ")!= -1){
      var abil_stone = msg.split(" ")[1]
      var abil_nick = msg.split(" ")[2]
    
      if(abil_stone == '블랙'){
        var blc = read("/메이플m/","블랙"+".txt");
        for(b=0; b<blacktotal+1; b++){
          var blackp = blc.split(",")[b]
          if(blackp == ""){
          
          }else if(blackp == undefined){
            break
          }else{
            black.push(blackp)
          }
        }
        if(black.length >= blacktotal){
          replier.reply("⭐️캔들⭐️", "🐰블랙은 꽉 찼어요!!\n늦었으니 골드로 가세요!!🐰")
          return
        }
        var guld = read("/메이플m/","골드"+".txt")
        var exex = read("/메이플m/","제외"+".txt")
        var blec = read("/메이플m/","블랙"+".txt")
        if(guld.indexOf(abil_nick)!= -1){
          replier.reply("⭐️캔들⭐️", "🐰이미 골드투표 했는데요...?\n변경 원하면 !어빌취소 닉네임 쓰세요!\n변덕쟁이씨!! ㅡㅅㅡ🐰")
          return
        }else if(exex.indexOf(abil_nick)!= -1){
          replier.reply("⭐️캔들⭐️", "🐰이미 제외투표 했는데요...?\n변경 원하면 !어빌취소 닉네임 쓰세요!\n변덕쟁이씨!! ㅡㅅㅡ🐰")
          return
        }else if(blec.indexOf(abil_nick)!= -1){
          replier.reply("⭐️캔들⭐️", "🐰이미 블랙투표 했는데요...?\n변경 원하면 !어빌취소 닉네임 쓰세요!\n변덕쟁이씨!! ㅡㅅㅡ🐰")
          black = []
          return
        }else{
          black.push(abil_nick)
          FileStream.write(sdcard+"/메이플m/"+"블랙".trim()+".txt",black)

          var blackout = blacktotal - black.length
          replier.reply("⭐️캔들⭐️", "🐰블랙 남은 갯수! : "+ blackout + " 개")
          black = []
          return
        }
      }else if(abil_stone == '골드'){
        var goold = read("/메이플m/","골드"+".txt");
        for(g=0; g<goldtotal+1; g++){
          var goldp = goold.split(",")[g]
          if(goldp == ""){
          
          }else if(goldp == undefined){
            break
          }else{
            gold.push(goldp)
          }
        }
        if(gold.length >= goldtotal){
          replier.reply("⭐️캔들⭐️", "🐰골드는 꽉 찼어요!!\n늦었으니 블랙으로 가세요!!🐰")
          return
        }
        var blec = read("/메이플m/","블랙"+".txt")
        var exex = read("/메이플m/","제외"+".txt")
        var guld = read("/메이플m/","골드"+".txt")
        if(blec.indexOf(abil_nick)!= -1){
          replier.reply("⭐️캔들⭐️", "🐰이미 블랙투표 했는데요...?\n변경 원하면 !어빌취소 닉네임 쓰세요!\n변덕쟁이씨!! ㅡㅅㅡ🐰")
          return
        }else if(exex.indexOf(abil_nick)!= -1){
          replier.reply("⭐️캔들⭐️", "🐰이미 제외투표 했는데요...?\n변경 원하면 !어빌취소 닉네임 쓰세요!\n변덕쟁이씨!! ㅡㅅㅡ🐰")
          return
        }else if(guld.indexOf(abil_nick)!= -1){
          replier.reply("⭐️캔들⭐️", "🐰이미 골드투표 했는데요...?\n변경 원하면 !어빌취소 닉네임 쓰세요!\n변덕쟁이씨!! ㅡㅅㅡ🐰")
          gold = []
          return
        }else{
          gold.push(abil_nick)
          FileStream.write(sdcard+"/메이플m/"+"골드".trim()+".txt",gold)

          var goldout = goldtotal - gold.length
          replier.reply("⭐️캔들⭐️", "🐰골드 남은 갯수! "+ goldout + " 개")
          gold = []
          return
        }
      }else if(abil_stone == '제외'){
        var excep = read("/메이플m/","제외"+".txt")
        for(g=0; g<30; g++){
          var excepp = excep.split(",")[g]
          if(excepp == ""){
          
          }else if(excepp == undefined){
            break
          }else{
            except.push(excepp)
          }
        }
        var guld = read("/메이플m/","골드"+".txt")
        var blec = read("/메이플m/","블랙"+".txt")
        var exex = read("/메이플m/","제외"+".txt")
        if(guld.indexOf(abil_nick)!= -1){
          replier.reply("⭐️캔들⭐️", "🐰이미 골드투표 했는데요...?\n변경 원하면 !어빌취소 닉네임 쓰세요!\n변덕쟁이씨!! ㅡㅅㅡ🐰")
          return
        }else if(blec.indexOf(abil_nick)!= -1){
          replier.reply("⭐️캔들⭐️", "🐰이미 블랙투표 했는데요...?\n변경 원하면 !어빌취소 닉네임 쓰세요!\n변덕쟁이씨!! ㅡㅅㅡ🐰")
          return
        }else if(exex.indexOf(abil_nick)!= -1){
          replier.reply("⭐️캔들⭐️", "🐰이미 제외투표 했는데요...?\n변경 원하면 !어빌취소 닉네임 쓰세요!\n변덕쟁이씨!! ㅡㅅㅡ🐰")
          except = []
          return
        }else{
          except.push(abil_nick)
          FileStream.write(sdcard+"/메이플m/"+"제외".trim()+".txt",except)
    
          var except_total = except.length
          replier.reply("⭐️캔들⭐️", "🐰현재까지 제외투표 인원! "+ except_total + " 명!")
          except = []
          return
        }
      }else{
        replier.reply("⭐️캔들⭐️", '🐰골드or블랙or제외 정확하게 작성하세요!')
        return
      }  
    }

    //어빌취소
    if(msg.indexOf("!어빌취소 ")!=-1){
      var del_nick = msg.split(" ")[1]
      var del_gold = read("/메이플m/","골드"+".txt")
      var del_black = read("/메이플m/","블랙"+".txt")
      var del_except = read("/메이플m/","제외"+".txt")
  
      if(del_gold.indexOf(del_nick)!=-1){
        var de_nick = del_nick + ","
        if(del_gold.indexOf(de_nick)!=-1){
          var de_gold = del_gold.replace(de_nick, "")
          FileStream.write(sdcard+"/메이플m/"+"골드".trim()+".txt",de_gold)
    
          replier.reply("⭐️캔들⭐️", "🐰골드에 있길래 지웠엉!!\n다시 투표해! 변덕쟁이씨ㅇㅅㅇ🐰")
          return
        }else{
          var de2_gold = del_gold.replace("," + del_nick, "")
          FileStream.write(sdcard+"/메이플m/"+"골드".trim()+".txt",de2_gold)
    
          replier.reply("⭐️캔들⭐️", "🐰골드에 있길래 지웠엉!!\n다시 투표해! 변덕쟁이씨ㅇㅅㅇ🐰")
          return
        }
    
      }else if(del_black.indexOf(del_nick)!=-1){
        var de_nick = del_nick + ","
        if(del_black.indexOf(de_nick)!=-1){
          var de_black = del_black.replace(de_nick, "")
          FileStream.write(sdcard+"/메이플m/"+"블랙".trim()+".txt",de_black)
    
          replier.reply("⭐️캔들⭐️", "🐰블랙에 있길래 지웠엉!!\n다시 투표해! 변덕쟁이씨ㅇㅅㅇ🐰")
          return
        }else{
          var de2_black = del_black.replace("," + del_nick, "")
          FileStream.write(sdcard+"/메이플m/"+"블랙".trim()+".txt",de2_black)
    
          replier.reply("⭐️캔들⭐️", "🐰블랙에 있길래 지웠엉!!\n다시 투표해! 변덕쟁이씨ㅇㅅㅇ🐰")
          return
        }
      }else if(del_except.indexOf(del_nick)!=-1){
        var de_nick = del_nick + ","
        if(del_except.indexOf(de_nick)!=-1){
          var de_except = del_except.replace(de_nick, "")
          FileStream.write(sdcard+"/메이플m/"+"제외".trim()+".txt",de_except)
    
          replier.reply("⭐️캔들⭐️", "🐰제외에 있길래 지웠엉!!\n다시 투표해! 변덕쟁이씨ㅇㅅㅇ🐰")
          return
        }else{
          var de2_except = del_except.replace("," + del_nick, "")
          FileStream.write(sdcard+"/메이플m/"+"제외".trim()+".txt",de2_except)
    
          replier.reply("⭐️캔들⭐️", "🐰제외에 있길래 지웠엉!!\n다시 투표해! 변덕쟁이씨ㅇㅅㅇ🐰")
          return
        }
      }else{
        replier.reply("⭐️캔들⭐️", "🐰아무런곳에도 없는뎁숑?? ㅇ ㅅㅇ")
        return
      }
    }

    //어빌종료
    if(msg=="!어빌종료"){
      var good_mas = read("/메이플m/","관리자.txt");
      var real_master = good_mas.split(",")
      for(var a = 0; a < real_master.length; a++){
        if(master.indexOf(sender)!=-1){
          var blc = read("/메이플m/","블랙"+".txt");
          var goold = read("/메이플m/","골드"+".txt");
          var exc = read("/메이플m/","제외"+".txt");
          blc = ","
          goold = ","
          exc = ","
          FileStream.write(sdcard+"/메이플m/"+"블랙".trim()+".txt",blc)
          FileStream.write(sdcard+"/메이플m/"+"골드".trim()+".txt",goold)
          FileStream.write(sdcard+"/메이플m/"+"제외".trim()+".txt",exc)
          replier.reply("⭐️캔들⭐️", "🐰모든 어빌 명단을 초기화 했어요!")
          return
        }
      }
      replier.reply("⭐️캔들⭐️", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }

    //어빌갯수
    if(msg.indexOf("!어빌갯수 ")!= -1){
      var good_mas = read("/메이플m/","관리자.txt");
      var real_master = good_mas.split(",")
      for(var a = 0; a < real_master.length; a++){
        if(sender.indexOf(real_master[a])!=-1){
          var btotal1 = msg.split(" ")[1]
          var btotal2 = msg.split(" ")[2]
    
          if(btotal1 == "블랙"){
            blacktotal = btotal2
            replier.reply("⭐️캔들⭐️", "🐰블랙 갯수 설정 완료!")
            return
          }else if(btotal1 == "골드"){
            goldtotal = btotal2
            replier.reply("⭐️캔들⭐️", "🐰골드 갯수 설정 완료!")
            return
          }else{
            replier.reply("⭐️캔들⭐️", "🐰블랙or골드 를 정확하게 쓰세요!")
            return
          }
        }
      }
      replier.reply("⭐️캔들⭐️", "🐰 관리자 불러오세요 ㅇㅅㅇ")
      return
    }

    //미투표 잡기
    if(msg == "!투표체크"){
      var good_mas = read("/메이플m/","관리자.txt");
      var real_master = good_mas.split(",")
      for(var a = 0; a < real_master.length; a++){
        if(sender.indexOf(real_master[a])!=-1){
          var sheetid_abil = '1HAFELrrCy_c6fAy9eksRjReal8SIaZstZZXFx3MCg4o'
          var sheetname_abil = 'tony_abil'
          var url_abil = 'https://opensheet.vercel.app/'+sheetid_abil+'/'+sheetname_abil+'!B3:B90'
        
          var doc_abil = Utils.getWebText(url_abil) //점수표
          .replace(/<([^>]+)>/g, "") //html 태그 제거
          .trim()
  
    
          doc_abil = doc_abil.replace(/{}/gi, "") // = replaceall
          for(v=0; v<5; v++){
            doc = doc_abil.replace(/,,/gi, ",")
          }
    
    
          var jsondata_abil = doc_abil
          var chunksize = 1
          outnick_allabil = []
    
          var real_abil = dataslice(jsondata_abil, chunksize)
          var getab = JSON.stringify(real_abil[0])
     
          for(var v=0; v<real_abil.length; v++){
            var getab = JSON.stringify(real_abil[v])
            var getabil1 = getab.split('undefined":"')[1]
            var getabil2 = getabil1.split('"')[0]
            if(isNaN(getabil2)){
              outnick_allabil.push(getabil2)
            }
          }
  
          all_abil = []
  
          var all_blc = read("/메이플m/","블랙"+".txt");
          for(b=0; b<50; b++){
            var blackp = all_blc.split(",")[b]
            if(blackp == ""){
          
            }else if(blackp == undefined){
              break
            }else{
              all_abil.push(blackp)
            }
          }
          var all_goold = read("/메이플m/","골드"+".txt");
          for(g=0; g<50; g++){
            var goldp = all_goold.split(",")[g]
            if(goldp == ""){
          
            }else if(goldp == undefined){
              break
            }else{
              all_abil.push(goldp)
            }
          }
          var all_excep = read("/메이플m/","제외"+".txt");
          for(e=0; e<50; e++){
            var excepq = all_excep.split(",")[e]
            if(excepq == ""){
          
            }else if(excepq == undefined){
              break
            }else{
              all_abil.push(excepq)
            }
          }
  
          var all_out = outnick_allabil.filter(x => !all_abil.includes(x))
  
          replier.reply("⭐️캔들⭐️", "🐰투표를 아직 안한 사람들이에요!\n\n⭐️어 빌 투 표 하 세 요!⭐️\n"
          + all_out + "\n\n🐰골드or블랙or제외 꼭 꼭!! 투표!!🐰")
  
          all_abil = []
          return
        }
      }
      replier.reply("⭐️캔들⭐️", "🐰관리자 불러오세요 ㅇㅅㅇ")
      return
    }
*/

 //도움말
  if(msg == "!도움말"){
  
  replier.reply("⭐️캔들⭐️", "🐰토니의 사용법이에요 보시요!\n"+
  "명령어가 잘못 되었거나 닉네임이 없다면 반응하지 않아요🐰\n\n"+
  "🐰인원들의 사용법\n"+
  "전체명단\n"+
  "닉네임등록 뜡부\n"+
  "○○팀 ○번 (닉 등록자만 적용)\n"+
  "○○팀 ○번 임뜡부\n"+
  "○○팀 ○번 취소\n"+
  "어빌투표 블랙 뜡부\n"+
  "어빌취소 뜡부\n\n"+
  "🐰토니 GPT 사용법\n"+
  "#토니 질문내용\n\n"+
  "🐰닉네임은 닉네임(직업)으로 등록!")
  return
  }
//관리자도움말
 if(msg == "!관리자도움말"){
   
   replier.reply("⭐️캔들⭐️", "🐰금지단어 절대 쓰지 마세요!토니 아파해요!\n\n"+
   "🐰관리자의 사용법\n"+
  "○○팀 생성\n"+
  "○○팀 삭제\n"+
  "○○팀 초기화\n"+
  "!○○팀시간 🥕\n"+
  "○○팀메모 🥕\n"+
  "○○팀 메모삭제\n"+
  "○○팀팀명 🥕\n"+
  "어빌체크\n"+
  "어빌갯수 블랙 35\n"+
  "어빌종료\n\n") 
  
  return
  }
 }
}

}catch(err){
  
  replier.reply("⭐️캔들⭐️", "토니가 아플뻔 했어요!-ㅅ-🥕\n"+err)
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

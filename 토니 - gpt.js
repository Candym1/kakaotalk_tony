const scriptName = "토니-gpt";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */

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
// save와 read 예시
/*

save("/메이플m/", "판매상품".trim() + ".txt", title4);

var read_me2 = read("/메이플m/", "패치노트.txt")

*/
//api key

let key = "api key"
/* 
messages = [{
            "role" : "system",
            "content" : "10초 이내로 어린아이처럼 반말로 답변해주세요."
                      + "당신은 토끼이며 이름은 토니입니다."
                      + "당신은 메이플스토리m 게임에 대해서 전문가입니다."
                      + "당신은 www.naver.com 에서 주로 검색합니다."
                      + "당신은 미안합니다와 죄송합니다 처럼 사과하지 않습니다"
            }]
*/

//limits_bar
function limit_bar(limits){
  if(limits < 10){
    var limits_bar = "█••••••••••••••••••••(💵최대 20$)"
  }else if(10 < limits < 20){
    var limits_bar = "██••••••••••••••••••(💵최대 20$)"
  }else if(20 < limits < 30){
    var limits_bar = "███••••••••••••••••(💵최대 20$)"
  }else if(30 < limits < 40){
    var limits_bar = "████••••••••••••••(💵최대 20$)"
  }else if(40 < limits < 50){
    var limits_bar = "█████••••••••••••(💵최대 20$)"
  }else if(50 < limits < 60){
    var limits_bar = "██████••••••••••(💵최대 20$)"
  }else if(60 < limits < 70){
    var limits_bar = "███████••••••••(💵최대 20$)"
  }else if(70 < limits < 80){
    var limits_bar = "███████••••••••(💵최대 20$)"
  }else if(80 < limits < 90){
    var limits_bar = "████████••••••(💵최대 20$)"
  }else if(90 < limits < 98){
    var limits_bar = "█████████•••(💵최대 20$)"
  }else if(98 < limits < 100){
    var limits_bar = "██████████(💵최대 20$)"
  }
  
  return limits_bar
}


starton = true
tony_deal = false
//date
var date = new Date()
real_time = date.getFullYear()+"년"+(date.getMonth()+1)+"월"+date.getDate()+"일"+date.getHours()+"시"+ date.getMinutes()+"분"

//넘버링
numbering = ["","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
//줄이기
줄이기 ="\u200b".repeat(500);

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if(isGroupChat==true){
    if(msg == "간단gpt on"){
      if((sender.indexOf("뜡부")!=-1)||(sender.indexOf("Chansung")!=-1)
      || sender.indexOf("밉움")!=-1){
        replier.reply("간단토니 GPT On 🐰")
        starton = true
        return
      }else{
        replier.reply("뜡부 불러오세요!! ㅇ ㅅㅇ🐰")
        return
      }
    }
    
    if(msg == "간단gpt off"){
      if((sender.indexOf("뜡부")!=-1)||(sender.indexOf("Chansung")!=-1)
      || sender.indexOf("밉움")!=-1){
        replier.reply("간단토니 GPT Off 🐰")
        starton = false
        return
      }else{
        replier.reply("뜡부 불러오세요!! ㅇ ㅅㅇ🐰")
        return
      }
    }
    
    if(msg == "간단초기화"){
      if((sender.indexOf("뜡부")!=-1)||(sender.indexOf("Chansung")!=-1)
      || sender.indexOf("밉움")!=-1){
        var reset_memory = read("/메이플m/", "간단기억모음집.txt")
        var split_memo = ',{"role":"user"'
        var check_memory = reset_memory.split(split_memo)[0]
        var check_memory2 = check_memory + "]"
        
        if(reset_memory.indexOf("user")!=-1){
          save("/메이플m/", "간단기억모음집".trim() + ".txt", check_memory2);
          
          replier.reply("간단기억 초기화 완료!! 🐰")
          return
        }else{
          replier.reply("이미 초기화 되어 있는데요?! ㅇ ㅅㅇ🐰")
          return
        }
      }else{
        replier.reply("뜡부 불러오세요!! ㅇ ㅅㅇ🐰")
        return 
      }
    }
    
    //프롬프트 엔지니어링
    if(msg == "prompt_간단친구"){
      if((sender.indexOf("뜡부")!=-1)||(sender.indexOf("Chansung")!=-1)){
        var prom_memory_fr = '[' +
        '{"role":"system","content":"당신은 토끼이며 이름은 토니 입니다."},' +
        '{"role":"system","content":"당신은 게임과 관련된 질문에는 학습된 내용만을 답변 해줍니다."},' +
        '{"role":"system","content":"질문자 닉네임:질문내용 형식으로 진행됩니다."},' +
        '{"role":"system","content":"어조: 10살짜리 친구처럼, 반말로 답변"}'
        
        var normal_memory_fr = read("/메이플m/", "간단기억모음집.txt")
        var s_memo_fr = ',{"role":"user"'
        var c_memory_fr = normal_memory_fr.split(s_memo_fr)[0]
        
        if(normal_memory_fr.indexOf("user")!=-1){
          var change_memory_fr = normal_memory_fr.replace(c_memory_fr, prom_memory_fr)
          save("/메이플m/", "간단기억모음집".trim() + ".txt", change_memory_fr);
          
          replier.reply("간단토니의 기억 변경 완료!🐰\n\n"+
          "[prompt : 어린아이 같은 친구토끼]")
          return
        }else{
          var cc_memory_fr = normal_memory_fr.split("]")[0]
          var chan_memory_fr = normal_memory_fr.replace(cc_memory_fr, prom_memory_fr)
          
          save("/메이플m/", "간단기억모음집".trim() + ".txt", chan_memory_fr);
          
          replier.reply("간단토니의 기억 변경 완료!🐰\n\n"+
          "[prompt : 어린아이 같은 친구토끼]")
          return
        } 
      }
    }
    
    if(msg == "prompt_카테고리"){
      if((sender.indexOf("뜡부")!=-1)||(sender.indexOf("Chansung")!=-1)){
        var prom_memory_fr = '[' +
        '{"role":"system","content":"당신은 판별자 입니다."},' +
        '{"role":"system","content":"당신은 질문의 내용을 카테고리 별로 구별할 수 있으며 답변은 카테고리 리스트 내용으로만 답변합니다."},' +
        '{"role":"system","content":"카테고리 리스트: 게임, 일상대화, 검색, 지하철시간, 동영상"},' +
        '{"role":"system","content":"지하철시간 카테고리 일 경우 검색역에 대한 추가 정보를 답변합니다."},' +
        '{"role":"system","content":"지하철시간 추가 정보 답변: 지히철시간 / 검색역[봉천], 지하철시간 / 검색역[신림]."},' +
        '{"role":"system","content":"역명은 [봉천], [강남], [신림] 처럼 답변합니다."},' +
        '{"role":"system","content":"동영상 카테고리 검색어에 대한 추가 정보를 답변합니다."},' +
        '{"role":"system","content":"동영상 추가 정보 답변: 동영상 / qeury[메이플m 패턴], 동영상 / qeury[카오스윌 패턴]"},' +
        '{"role":"system","content":"당신은 검색 단어가 들어간 질문에는 검색 카테고리로 적용합니다."}' 
        
        var normal_memory_fr = read("/메이플m/", "카테고리pt.txt")
  
        if(normal_memory_fr.indexOf("user")!=-1){
          var s_memo_fr = ',{"role":"user"'
          var c_memory_fr = normal_memory_fr.split(s_memo_fr)[0]
          var change_memory_fr = normal_memory_fr.replace(c_memory_fr, prom_memory_fr)
          save("/메이플m/", "카테고리pt".trim() + ".txt", change_memory_fr);
          
          replier.reply("간단토니의 기억 변경 완료!🐰\n\n"+
          "[prompt : 카테고리 변경]")
          return
        }else{
          var cc_memory_fr = normal_memory_fr.split("]")[0]
          var chan_memory_fr = normal_memory_fr.replace(cc_memory_fr, prom_memory_fr)
          
          save("/메이플m/", "카테고리pt".trim() + ".txt", chan_memory_fr);
          
          replier.reply("간단토니의 기억 변경 완료!🐰\n\n"+
          "[prompt : 카테고리 변경]")
          return
        } 
      }
    }
    
    //테스트옹
    if(msg == "코딩질문"){
      if((sender.indexOf("뜡부")!=-1)||(sender.indexOf("Chansung")!=-1)){
        var prom_memory_fr = '[' +
        '{"role":"system","content":"당신은 코딩 전문가 입니다."},' +
        '{"role":"system","content":"당신은 자바, 자바스크립트 전문가 입니다."},' +
        '{"role":"system","content":"질문자 닉네임:질문내용 형식으로 진행됩니다."}'
        
        var normal_memory_fr = read("/메이플m/", "코딩질문.txt")
  
        if(normal_memory_fr.indexOf("user")!=-1){
          var s_memo_fr = ',{"role":"user"'
          var c_memory_fr = normal_memory_fr.split(s_memo_fr)[0]
          var change_memory_fr = normal_memory_fr.replace(c_memory_fr, prom_memory_fr)
          save("/메이플m/", "코딩질문".trim() + ".txt", change_memory_fr);
          
          replier.reply("간단토니의 기억 변경 완료!🐰\n\n"+
          "[prompt : 어린아이 같은 친구토끼]")
          return
        }else{
          var cc_memory_fr = normal_memory_fr.split("]")[0]
          var chan_memory_fr = normal_memory_fr.replace(cc_memory_fr, prom_memory_fr)
          
          save("/메이플m/", "코딩질문".trim() + ".txt", chan_memory_fr);
          
          replier.reply("간단토니의 기억 변경 완료!🐰\n\n"+
          "[prompt : 어린아이 같은 친구토끼]")
          return
        } 
      }
    }
    
    if(msg == "질문초기화"){
      if((sender.indexOf("뜡부")!=-1)||(sender.indexOf("Chansung")!=-1)){
        var reset_memory = read("/메이플m/", "코딩질문.txt")
        var split_memo = ',{"role":"user"'
        var check_memory = reset_memory.split(split_memo)[0]
        var check_memory2 = check_memory + "]"
        
        if(reset_memory.indexOf("user")!=-1){
          save("/메이플m/", "코딩질문".trim() + ".txt", check_memory2);
          
          replier.reply("간단기억 초기화 완료!! 🐰")
          return
        }else{
          replier.reply("이미 초기화 되어 있는데요?! ㅇ ㅅㅇ🐰")
          return
        }
      }else{
        replier.reply("뜡부 불러오세요!! ㅇ ㅅㅇ🐰")
        return 
      }
    }
    
    if(msg == "간단친구"){
      if((sender.indexOf("뜡부")!=-1)||(sender.indexOf("Chansung")!=-1)){
        var prom_memory = '[' +
        '{"role":"system","content":"당신은 10살짜리 여자 어린아이 입니다."}' +
        '}]'   
      }
    }
    
    if(msg == "간단친구"){
      if((sender.indexOf("뜡부")!=-1)||(sender.indexOf("Chansung")!=-1)){
        var prom_memory = '[' +
        '{"role":"system","content":"당신은 10살짜리 여자 어린아이 입니다."}' +
        '}]'   
      }
    }
    
    if(msg == "간단친구"){
      if((sender.indexOf("뜡부")!=-1)||(sender.indexOf("Chansung")!=-1)){
        var prom_memory = '[' +
        '{"role":"system","content":"당신은 10살짜리 여자 어린아이 입니다."}' +
        '}]'   
      }
    }
    
    if(msg.startsWith("#토니 ")){
      if(starton == true){
        if(tony_deal == false){
          tony_deal = true
          qna = msg.substr(4)
          
          var r = Math.floor(Math.random()*100)+1;
          if(r < 30){
            var tony_state = "해피해피"
            var state2 = "😆" + tony_state
          }else if(30 < r < 60){
            var tony_state = "우당탕탕"
            var state2 = "😛" + tony_state
          }else if(60 < r){
            var tony_state = "훌쩍훌쩍"
            var state2 = "🥺" + tony_state
          }
          good_token = 0
          
          var [categori, c_token_pt] = categoriGpt(qna)
          
          good_token += c_token_pt
          
          if(categori.indexOf("지하철시간")!=-1){
            
            var search_station = categori.split("[")[1]
            var search_station2 = search_station.split("]")[0]
            var categori = categori.split(" /")[0]
            
            var subway_g = subway(search_station2)
            
            prompt_list(categori)
            
            var [s_answer, s_token_pt, s_token_com] = subwayGpt(qna, sender, subway_g)
            
            var token_read = read("/메이플m/", "토큰사용.txt")
            
            var usetoken = good_token + s_token_pt + s_token_com
            var num_token = Number(token_read)
            var total_token = num_token + good_token + s_token_pt + s_token_com
            
            var usetoken = parseFloat(usetoken).toFixed(6)
            var total_token = parseFloat(total_token).toFixed(6)
            
            var limits = parseFloat((total_token / 20) * 100)
            var limits = limits.toFixed(6)
            var li_bar = limit_bar(limits)
            save("/메이플m/", "토큰사용".trim() + ".txt", total_token);
            
            /*
            replier.reply(sender + "에게 답변중•°•°\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            "답변이 나오기까지 시간이 걸릴 수 있어요!\n\n" +
            "『질문의 카테고리는 【" + categori + "】 입니다!🐰』")
            java.lang.Thread.sleep(2000)
            */
            replier.reply("💌 띠롱띠롱 답변 도착 ♫•*¨*•.¸¸♪✧\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            state2 + " 토니\n\n『" +
            s_answer.trim() + "🐰』\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            "💵이번달 총 사용량\n" +
            ": " + total_token + "$ (+" + usetoken + "$)\n\n" +
            "⚠️Usage_Limits 도달수치\n"+
            li_bar + "\n" +
            "현재 : " + limits + "%")
            
            tony_deal = false
            return
            
          }else if(categori.indexOf("동영상")!=-1){
            
            var search_query = categori.split("[")[1]
            var search_query2 = search_query.split("]")[0]
            var categori = categori.split(" /")[0]
            
            var get_video = getyoutube(search_query2)
            prompt_list(categori)
            
            var [y_answer, y_token_pt, y_token_com] = smallGpt(get_video)
            
            
            var token_read = read("/메이플m/", "토큰사용.txt")
            
            var usetoken = good_token + y_token_pt + y_token_com
            var num_token = Number(token_read)
            var total_token = num_token + good_token + y_token_pt + y_token_com
            
            var usetoken = parseFloat(usetoken).toFixed(6)
            var total_token = parseFloat(total_token).toFixed(6)
            
            var limits = parseFloat((total_token / 20) * 100)
            var limits = limits.toFixed(6)
            var li_bar = limit_bar(limits)
            save("/메이플m/", "토큰사용".trim() + ".txt", total_token);
            
            /*
            replier.reply(sender + "에게 답변중•°•°\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            "답변이 나오기까지 시간이 걸릴 수 있어요!\n\n" +
            "『질문의 카테고리는 【" + categori + "】 입니다!🐰』")
            java.lang.Thread.sleep(2000)
            */ 
            replier.reply("💌 띠롱띠롱 답변 도착 ♫•*¨*•.¸¸♪✧\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            state2 + " 토니\n\n『" +
            y_answer + "🐰』\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            "💵이번달 총 사용량\n" +
            ": " + total_token + "$ (+" + usetoken + "$)\n\n" +
            "⚠️Usage_Limits 도달수치\n"+
            li_bar + "\n" +
            "현재 : " + limits + "%")
            
            tony_deal = false
            return
            
          }else if(categori !== "검색"){
            prompt_list(categori)
            
            var [answer, a_token_pt, a_token_com] = getChatGPTResponse(qna, sender) 
            
            var token_read = read("/메이플m/", "토큰사용.txt")
            
            var usetoken = good_token + a_token_pt + a_token_com
            var num_token = Number(token_read)
            var total_token = num_token + good_token + a_token_pt + a_token_com
            
            var usetoken = parseFloat(usetoken).toFixed(6)
            var total_token = parseFloat(total_token).toFixed(6)
            
            var limits = parseFloat((total_token / 20) * 100)
            var limits = limits.toFixed(6)
            var li_bar = limit_bar(limits)
            save("/메이플m/", "토큰사용".trim() + ".txt", total_token);
            
            /*
            replier.reply(sender + "에게 답변중•°•°\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            "답변이 나오기까지 시간이 걸릴 수 있어요!\n\n" +
            "『질문의 카테고리는 【" + categori + "】 입니다!🐰』")
            java.lang.Thread.sleep(2000)
            */
            replier.reply("💌 띠롱띠롱 답변 도착 ♫•*¨*•.¸¸♪✧\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            state2 + " 토니\n\n『" +
            answer + "🐰』\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            "💵이번달 총 사용량\n" +
            ": " + total_token + "$ (+" + usetoken + "$)\n\n" +
            "⚠️Usage_Limits 도달수치\n"+
            li_bar + "\n" +
            "현재 : " + limits + "%")
            
            tony_deal = false
            return
            
          }else{
            var [answer, r_url, g_token_pt, g_token_com] = getgemini(qna, sender)
            
            var token_read = read("/메이플m/", "토큰사용.txt")
            
            var usetoken = good_token + g_token_pt + g_token_com
            var num_token = Number(token_read)
            var total_token = num_token + good_token + g_token_pt + g_token_com
            
            var usetoken = parseFloat(usetoken).toFixed(6)
            var total_token = parseFloat(total_token).toFixed(6)
            
            var limits = parseFloat((total_token / 20) * 100)
            var limits = limits.toFixed(6)
            var li_bar = limit_bar(limits)
            save("/메이플m/", "토큰사용".trim() + ".txt", total_token);
            
            /*
            replier.reply(sender + "에게 답변중•°•°\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            "답변이 나오기까지 시간이 걸릴 수 있어요!\n\n" +
            "『질문의 카테고리는 【" + categori + "】 입니다!🐰』")
            java.lang.Thread.sleep(2000)
            */
            replier.reply("💌 띠롱띠롱 답변 도착 ♫•*¨*•.¸¸♪✧\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            state2 + " 토니\n\n『" +
            answer.trim() + "🐰』\n\n" +
            "Reference Url : 준비중🍒\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            "💵이번달 총 사용량\n" +
            ": " + total_token + "$ (+" + usetoken + "$)\n\n" +
            "⚠️Usage_Limits 도달수치\n"+
            li_bar + "\n" +
            "현재 : " + limits + "%")
            
            tony_deal = false
            return
          }
        }else if(tony_deal == true){
          replier.reply("토니가 답변을 완료하면\n" +
          "그때 이용해주세요!! ㅇ ㅅㅇ🐰")
          return
        }
      }else{
        replier.reply("뜡부 불러오세요!! ㅇ ㅅㅇ🐰")
        return
      }
    }
    
    //질문
    if(msg.startsWith("#gg ")){
        qna = msg.substr(4)
        replier.reply(codemaster(qna, sender))
        return
    }
    
    
    //잼미니
    if(msg.startsWith("#잼민 ")){
        qna = msg.substr(4)
        var answer = testGem(qna, sender)
        replier.reply(answer)
        //replier.reply(getgemini(qna, sender))
        return
    }
    
    //텟 링크
    if(msg.startsWith("#링크 ")){
      qna = msg.substr(4)
      
      replier.reply("유튜브 검색 결과" + 줄이기 + "\n\n" + qna)
      //replier.reply(getgemini(qna, sender))
      return
    }
    /*
    //유튭테스트
    if(msg.startsWith("#유튭 ")){
      qna = msg.substr(4)
      var [url,title] = getyoutube(qna)
      replier.reply(url + "\n\n" + title)
      return
    }
    */
    /*
    //검색테스트
    if(msg.startsWith("#검색 ")){
      var query = msg.substr(4)
      var key_q = "key_q"
      var cx = "a4e5001667ba24b66"
    
      try{
      var url = "https://www.googleapis.com/customsearch/v1" +
      "?q=" + query + "&key=" + key_q + "&cx=" + cx + "&sort=date"
      
      var response = org.jsoup.Jsoup.connect(url)
      .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
      .ignoreContentType(true)
      .ignoreHttpErrors(true)
      .timeout(20000)
      .execute()
      
      var json_body = JSON.parse("[" + response.body() + "]")
      replier.reply(response.body())
            
      return
      var search_text = ""
      
      for(var a = 0; a < 5; a++){
        var items_title = json_body[0]["items"][a]["title"]
        var items_snippet = json_body[0]["items"][a]["snippet"]
        var items_link = json_body[0]["items"][a]["link"]
        
        if(items_snippet == undefined){
          var items_snippet_real = ""
        }else{
          var items_snippet_real = items_snippet + "\n\n"
        }
        
        var text_number = Number(a) + 1
        var real_t_n = numbering[text_number]
        
        search_text += "🍒Title : " + items_title + "\n\n" +
        items_snippet_real +  real_t_n + "Link : " + items_link + "\n➖➖➖➖➖➖➖➖➖➖➖\n"
      }
      
      replier.reply("🐰검색 해왔어요!\n최상단 5개 까지만\n조회 가능해요!🥕"+줄이기+"\n\n"+search_text)
            
      return
      }catch(e){
        replier.reply(e)
        return
      }
    }
    */
/*
//지하철 실시간
if(msg.startsWith("#전철 ")){
  var station = msg.substr(4)
  var t_key = "t_key"
  var t_url = "http://swopenapi.seoul.go.kr/api/subway/" + t_key + "/json/realtimeStationArrival/0/99/" + station
      
      
  var response = org.jsoup.Jsoup.connect(t_url)
  .ignoreContentType(true)
  .ignoreHttpErrors(true)
  .timeout(20000)
  .execute()
      
  var s_response_body = response.body()
  var code_check = s_response_body.split('"code":"')[1]
  var code_check2 = code_check.split('"')[0]
        
  if(code_check2 == "INFO-000"){
    var json_s = JSON.parse(s_response_body)
    var json_s_length = json_s.errorMessage.total
    
    var result_real_date = json_s.realtimeArrivalList[0].recptnDt //데이터 생성 시간
    
    var out_text = "현재 정보 검색 역:" + station + "\n" +
                   "데이터 생성시간:" + result_real_date + "\n"
          
    var id_number = {"1001":"1호선", "1002":"2호선", "1003":"3호선", "1004":"4호선", "1005":"5호선", "1006":"6호선", "1007":"7호선",
                     "1008":"8호선", "1009":"9호선", "1061":"중앙선", "1063":"경의중앙선", "1065":"공항철도", "1067":"경춘선",
                     "1075":"수의분당선", "1077":"신분당선", "1092":"우이신설선", "1093":"서해선", "1081":"경강선", "1032":"GTX-android"}
        
    var id_run = {"0":"진입", "1":"도착", "2":"출발", "3":"전역출발", "4":"전역진입", "5":"전역도착", "99":"운행중"}
    
    var line_leng = json_s.realtimeArrivalList[0].subwayList.split(",")
    
    for(var line = 0; line < line_leng.length; line++){
      var line_name_num = line_leng[line]
      
      for(var sub = 0; sub < json_s_length; sub++){
        if(json_s.realtimeArrivalList[sub] == undefined){
          break
        }
        var result_subid = json_s.realtimeArrivalList[sub].subwayId
        if(result_subid == line_name_num){ //호선 동일할때
          var result_subid2 = id_number[result_subid] // •호선
          var result_next = json_s.realtimeArrivalList[sub].trainLineNm
          var result_next2 = result_next.split("- ")[1]
          var result_next3 = result_next2.split("방면")[0] //다음역
          var result_up = json_s.realtimeArrivalList[sub].updnLine // 상행/내선 하행/외선
          var result_btrain = json_s.realtimeArrivalList[sub].btrainSttus + "열차" //일반,급행 정보
          var result_barv = json_s.realtimeArrivalList[sub].barvlDt
          
          var result_min = parseInt(result_barv / 60) 
          var result_sec = result_barv % 60
          var last_time_s = result_min + "분 " + result_sec + "초" //도착까지 남은 시간
          
          var result_arvl2 = json_s.realtimeArrivalList[sub].arvlMsg2 //첫 도착메세지
          var result_arvl3 = json_s.realtimeArrivalList[sub].arvlMsg3 + "역"//두번째 역
          var result_arvlc = json_s.realtimeArrivalList[sub].arvlCd 
          var result_arvlc2 = id_run[result_arvlc] //도착코드
          var result_last = json_s.realtimeArrivalList[sub].lstcarAt
          if(result_last == 1){
            var result_last2 = "막차"
          }else{
            var result_last2 = "막차아님"
          }
      
          if(result_barv == 0){
            var last_time_s = result_arvl2
            var result_arvl3 = ""
          }
          
          if(out_text.indexOf("다음역:" + result_next3)!=-1){ //다음역 체크
            var out_view = out_text.split("다음역:" + result_next3)[1]
            var out_view2 = out_view.split("\n\n")[0]
            
            var overlap_time = out_view2.split("남은시간:")[1]
            var overlap_time2 = overlap_time.split("•막차여부")[0]
          
            var overlap_last = out_view2.split("막차여부:")[1]
            
            if(out_view2.indexOf("사당 도착")!=-1){
              if(result_last2 == "막차"){
                if(out_text.indexOf("막차아님")!=-1){
                  out_text = out_text.replace(overlap_last, overlap_last + "," + result_last2)
                }else{
            
                }
              }
            }else{
              out_text = out_text.replace(overlap_time2, overlap_time2 + last_time_s + " (" + result_arvl3 + "),\n")
          
              if(result_arvl3 == ""){
                out_text = out_text.replace("()", "")
              }
          
              if(result_last2 == "막차"){
                if(out_text.indexOf("막차아님")!=-1){
                  out_text = out_text.replace(overlap_last, overlap_last + "," + result_last2)
                }else{
            
                }
              }
            }
          }else{
            out_text += "•호선:" + result_subid2 + ", •구분:" + result_up + ",\n" +
                    "•다음역:" + result_next3 + "역, •열차정보:" + result_btrain + ",\n" +
                    "•검색역 도착까지 남은시간:" + last_time_s + " (" + result_arvl3 + "),\n" +
                    "•막차여부:" + result_last2 + "\n\n"
            if(result_arvl3 == ""){
              out_text = out_text.replace("()", "")
            }
          }
        }else{ //list 첫번째 호선이 동일하지 않을때
          
        }
      }
    }
        
    var out_text = out_text.trim()
   
    replier.reply(out_text)     
    return
        
  }else if(code_check2 == "INFO-200"){
    var out_text = "전철이 운행을 하지 않고 있음"
        
    return out_text
  }else{
    var out_text = "에러내용 :" + code_check[0]["message"]
        
    return out_text
  }
}
*/

  }
}

// prompt list

//지하철 실시간
function subway(search) {
  var station = search
  var t_key = "key"
  var t_url = "http://swopenapi.seoul.go.kr/api/subway/" + t_key + "/json/realtimeStationArrival/0/99/" + station
      
      
  var response = org.jsoup.Jsoup.connect(t_url)
  .ignoreContentType(true)
  .ignoreHttpErrors(true)
  .timeout(20000)
  .execute()
      
  var s_response_body = response.body()
  var code_check = s_response_body.split('"code":"')[1]
  var code_check2 = code_check.split('"')[0]
        
  if(code_check2 == "INFO-000"){
    var json_s = JSON.parse(s_response_body)
    var json_s_length = json_s.errorMessage.total
        
    var result_real_date = json_s.realtimeArrivalList[0].recptnDt //데이터 생성 시간
    
    var out_text = "현재 정보 검색 역:" + station + "\n" +
                   "데이터 생성시간:" + result_real_date + "\n"
          
    var id_number = {"1001":"1호선", "1002":"2호선", "1003":"3호선", "1004":"4호선", "1005":"5호선", "1006":"6호선", "1007":"7호선",
                     "1008":"8호선", "1009":"9호선", "1061":"중앙선", "1063":"경의중앙선", "1065":"공항철도", "1067":"경춘선",
                     "1075":"수의분당선", "1077":"신분당선", "1092":"우이신설선", "1093":"서해선", "1081":"경강선", "1032":"GTX-android"}
        
    var id_run = {"0":"진입", "1":"도착", "2":"출발", "3":"전역출발", "4":"전역진입", "5":"전역도착", "99":"운행중"}
    
    var line_leng = json_s.realtimeArrivalList[0].subwayList.split(",")
    
    for(var line = 0; line < line_leng.length; line++){
      var line_name_num = line_leng[line]
      
      for(var sub = 0; sub < json_s_length; sub++){
        if(json_s.realtimeArrivalList[sub] == undefined){
          break
        }
        var result_subid = json_s.realtimeArrivalList[sub].subwayId
        if(result_subid == line_name_num){ //호선 동일할때
          var result_subid2 = id_number[result_subid] // •호선
          var result_next = json_s.realtimeArrivalList[sub].trainLineNm
          var result_next2 = result_next.split("- ")[1]
          var result_next3 = result_next2.split("방면")[0] //다음역
          var result_up = json_s.realtimeArrivalList[sub].updnLine // 상행/내선 하행/외선
          var result_btrain = json_s.realtimeArrivalList[sub].btrainSttus + "열차" //일반,급행 정보
          var result_barv = json_s.realtimeArrivalList[sub].barvlDt
          
          var result_min = parseInt(result_barv / 60) 
          var result_sec = result_barv % 60
          var last_time_s = result_min + "분 " + result_sec + "초" //도착까지 남은 시간
          
          var result_arvl2 = json_s.realtimeArrivalList[sub].arvlMsg2 //첫 도착메세지
          var result_arvl3 = json_s.realtimeArrivalList[sub].arvlMsg3 + "역"//두번째 역
          var result_arvlc = json_s.realtimeArrivalList[sub].arvlCd 
          var result_arvlc2 = id_run[result_arvlc] //도착코드
          var result_last = json_s.realtimeArrivalList[sub].lstcarAt
          if(result_last == 1){
            var result_last2 = "막차"
          }else{
            var result_last2 = "막차아님"
          }
      
          if(result_barv == 0){
            var last_time_s = result_arvl2
            var result_arvl3 = ""
          }
          
          if(out_text.indexOf("다음역:" + result_next3)!=-1){ //다음역 체크
            var out_view = out_text.split("다음역:" + result_next3)[1]
            var out_view2 = out_view.split("\n\n")[0]
            
            var overlap_time = out_view2.split("남은시간:")[1]
            var overlap_time2 = overlap_time.split("•막차여부")[0]
          
            var overlap_last = out_view2.split("막차여부:")[1]
            
            if(out_view2.indexOf("사당 도착")!=-1){
              if(result_last2 == "막차"){
                if(out_text.indexOf("막차아님")!=-1){
                  out_text = out_text.replace(overlap_last, overlap_last + "," + result_last2)
                }else{
            
                }
              }
            }else{
              out_text = out_text.replace(overlap_time2, overlap_time2 + last_time_s + " (" + result_arvl3 + "),\n")
          
              if(result_arvl3 == ""){
                out_text = out_text.replace("()", "")
              }
          
              if(result_last2 == "막차"){
                if(out_text.indexOf("막차아님")!=-1){
                  out_text = out_text.replace(overlap_last, overlap_last + "," + result_last2)
                }else{
            
                }
              }
            }
          }else{
            out_text += "🍒호선:" + result_subid2 + ", •구분:" + result_up + ",\n" +
                    "•다음역:" + result_next3 + "역, •열차정보:" + result_btrain + ",\n" +
                    "•검색역 도착까지 남은시간:" + last_time_s + " (" + result_arvl3 + "),\n" +
                    "•막차여부:" + result_last2 + "\n\n"
            if(result_arvl3 == ""){
              out_text = out_text.replace("()", "")
            }
          }
        }else{ //list 첫번째 호선이 동일하지 않을때
          
        }
      }
    }
        
    var out_text = out_text.trim()
        
    return out_text
        
  }else if(code_check2 == "INFO-200"){
    var out_text = "전철이 운행을 하지 않고 있음"
        
    return out_text
  }else{
    var out_text = "에러내용 :" + code_check[0]["message"]
        
    return out_text
  }
}

//게임, 일상대화, 검색(지하철시간 정보), 검색(일반검색)"}'
function prompt_list(categori) {
  
  var normal_memory_fr = read("/메이플m/", "간단기억모음집.txt")
    
  if(categori == "일상대화"){
    //categori = 일상대화
    var prom_memory_fr = '[' +
    '{"role":"system","content":"당신은 토끼이며 이름은 토니 입니다."},' +
    '{"role":"system","content":"당신은 상대방에게 죄송하다는 답변을 하지 않습니다."},' +
    '{"role":"system","content":"당신은 가장 마지막줄의 질문에 대한 답변을 해줍니다."},' +
    '{"role":"system","content":"당신에게 시간을 물어본다면 ' + real_time + ' 으로 답변 해줍니다."},' +
    '{"role":"system","content":"질문자 닉네임:질문내용 형식으로 진행됩니다."},' +
    '{"role":"system","content":"어조: 10살짜리 친구처럼, 반말로 답변"}'
         
    if(normal_memory_fr.indexOf("user")!=-1){
      var s_memo_fr = ',{"role":"user"'
      var c_memory_fr = normal_memory_fr.split(s_memo_fr)[0] 
      var change_memory_fr = normal_memory_fr.replace(c_memory_fr, prom_memory_fr)
      save("/메이플m/", "간단기억모음집".trim() + ".txt", change_memory_fr);
    
      return
    }else{
      var cc_memory_fr = normal_memory_fr.split("]")[0]
      var chan_memory_fr = normal_memory_fr.replace(cc_memory_fr, prom_memory_fr)
          
      save("/메이플m/", "간단기억모음집".trim() + ".txt", chan_memory_fr);
        
      return
    }
  }else if(categori == "게임"){
    //categori = 게임
    var prom_memory_fr = '[' +
    '{"role":"system","content":"당신은 토끼이며 이름은 토니 입니다."},' +
    '{"role":"system","content":"당신은 게임과 관련된 질문에는 학습된 내용만을 답변 해줍니다."},' +
    '{"role":"system","content":"당신은 게임과 관련된 질문에는 학습되지 않은 내용은 잘 모른다고 답변 해줍니다."},' +
    '{"role":"system","content":"추가로 당신은 뜡부, 밉움 두사람이 학습권자이니 학습을 요청 해보라고 답변 해줍니다."},' +
    '{"role":"system","content":"당신은 가장 마지막줄의 질문에 대한 답변을 해줍니다."},' + 
    '{"role":"system","content":"당신에게 시간을 물어본다면 ' + real_time + ' 으로 답변 해줍니다."},' +
    '{"role":"system","content":"질문자 닉네임:질문내용 형식으로 진행됩니다."},' +
    '{"role":"system","content":"어조: 10살짜리 친구처럼, 반말로 답변"}'
      
    if(normal_memory_fr.indexOf("user")!=-1){
      var s_memo_fr = ',{"role":"user"'
      var c_memory_fr = normal_memory_fr.split(s_memo_fr)[0]
      var change_memory_fr = normal_memory_fr.replace(c_memory_fr, prom_memory_fr)
      save("/메이플m/", "간단기억모음집".trim() + ".txt", change_memory_fr);
    
      return
    }else{
      var cc_memory_fr = normal_memory_fr.split("]")[0]
      var chan_memory_fr = normal_memory_fr.replace(cc_memory_fr, prom_memory_fr)
          
      save("/메이플m/", "간단기억모음집".trim() + ".txt", chan_memory_fr);
        
      return
    }
  }else if(categori == "지하철시간"){
    //categori = 검색(지하철시간 정보)
    var prom_memory_fr = '[' +
    '{"role":"system","content":"당신은 토끼이며 이름은 토니 입니다."},' +
    '{"role":"system","content":"당신은 호선, 구분, 다음역, 열차정보, 남은시간은 반드시 포함해서 답변 해줍니다."},' +
    '{"role":"system","content":"당신은 [남은시간] 단어는 한번만 작성하며 남은시간이 여러개 있다면 한줄씩 정렬해서 답변 해줍니다.(예시: 남은시간: [줄바꿈]➖내용)"},' +
    '{"role":"system","content":"당신은 질문자가 보기 편하게 줄바꿈과 • 으로 구분을 나눠서 답변 해줍니다."},' +
    '{"role":"system","content":"당신은 전철이 운행을 안한다면 구분없이 답변 해줍니다."},' +
    '{"role":"system","content":"당신에게 시간을 물어본다면 ' + real_time + ' 으로 답변 해줍니다."},' +
    '{"role":"system","content":"질문자 닉네임:질문내용 형식으로 진행됩니다."},' +
    '{"role":"system","content":"어조: 10살짜리 친구처럼, 반말로 답변"}'
      
    if(normal_memory_fr.indexOf("user")!=-1){
      var s_memo_fr = ',{"role":"user"'
      var c_memory_fr = normal_memory_fr.split(s_memo_fr)[0]
      var change_memory_fr = normal_memory_fr.replace(c_memory_fr, prom_memory_fr)
      save("/메이플m/", "간단기억모음집".trim() + ".txt", change_memory_fr);
    
      return
    }else{
      var cc_memory_fr = normal_memory_fr.split("]")[0]
      var chan_memory_fr = normal_memory_fr.replace(cc_memory_fr, prom_memory_fr)
          
      save("/메이플m/", "간단기억모음집".trim() + ".txt", chan_memory_fr);
        
      return
    }
  }else if(categori == "동영상"){
    //categori = 검색(지하철시간 정보)
    var prom_memory_fr = '[' +
    '{"role":"system","content":"당신은 토끼이며 이름은 토니 입니다."},' +
    '{"role":"system","content":"당신은 각 번호의 영상 타이틀과 링크를 정리해서 답변 해줍니다.(예시: 1번 타이틀 [링크])"},' +
    '{"role":"system","content":"당신은 질문자가 보기 편하게 줄바꿈과 • 으로 구분을 나눠서 답변 해줍니다."},' +
    '{"role":"system","content":"당신은 질문에 없는 단어가 들어간 입력정보는 삭제해서 답변 해줍니다."},' + 
    '{"role":"system","content":"삭제 예시: 카윌 패턴 알려줘! -> 아칸 가이드 삭제."},' + 
    '{"role":"system","content":"당신은 가장 마지막줄의 질문에 대한 답변을 해줍니다."},' +
    '{"role":"system","content":"당신에게 시간을 물어본다면 ' + real_time + ' 으로 답변 해줍니다."},' +
    '{"role":"system","content":"질문자 닉네임:질문내용 형식으로 진행됩니다."},' +
    '{"role":"system","content":"어조: 10살짜리 친구처럼, 반말로 답변"}'
      
    if(normal_memory_fr.indexOf("user")!=-1){
      var s_memo_fr = ',{"role":"user"'
      var c_memory_fr = normal_memory_fr.split(s_memo_fr)[0]
      var change_memory_fr = normal_memory_fr.replace(c_memory_fr, prom_memory_fr)
      save("/메이플m/", "간단기억모음집".trim() + ".txt", change_memory_fr);
    
      return
    }else{
      var cc_memory_fr = normal_memory_fr.split("]")[0]
      var chan_memory_fr = normal_memory_fr.replace(cc_memory_fr, prom_memory_fr)
          
      save("/메이플m/", "간단기억모음집".trim() + ".txt", chan_memory_fr);
        
      return
    }
  }/*else if(categori == "검색"){
    //categori = 검색
    var prom_memory_fr = '[' +
    '{"role":"system","content":"당신은 토끼이며 이름은 토니 입니다."},' +
    '{"role":"system","content":"당신은 아직 검색기능이 구현되질 않다고 답변 해줍니다."},' +
    '{"role":"system","content":"추가로 당신은 검색기능은 곧 구현될 예정이라고 답변 해줍니다."},' +
    '{"role":"system","content":"질문자 닉네임:질문내용 형식으로 진행됩니다."},' +
    '{"role":"system","content":"어조: 10살짜리 친구처럼, 반말로 답변"}'
      
    if(normal_memory_fr.indexOf("user")!=-1){
      var s_memo_fr = ',{"role":"user"'
      var c_memory_fr = normal_memory_fr.split(s_memo_fr)[0]
      var change_memory_fr = normal_memory_fr.replace(c_memory_fr, prom_memory_fr)
      save("/메이플m/", "간단기억모음집".trim() + ".txt", change_memory_fr);
    
      return
    }else{
      var cc_memory_fr = normal_memory_fr.split("]")[0]
      var chan_memory_fr = normal_memory_fr.replace(cc_memory_fr, prom_memory_fr)
          
      save("/메이플m/", "간단기억모음집".trim() + ".txt", chan_memory_fr);
        
      return
    }
  }*/
}

//검증모델

function categoriGpt(msg) {
    let json;
    let result;
      
      //JSON 파일 불러오기(문자열)
      var memory = read("/메이플m/", "카테고리pt.txt")
      memory = memory.split("}]")[0]
      
      messages_user = [{"role" : "user",
                        "content" : msg}]
      var messages_user = JSON.stringify(messages_user)
      messages_user = messages_user.split("[{")[1]
      
      var ob_memory = memory + "},{" + messages_user
      
      // JSON 문자열 객체로 전환
      var messages = JSON.parse(ob_memory)
      
      let data = {
          "model": "gpt-4o-mini", //gpt-3.5-turbo-16k / gpt-4-1106-preview
          "messages" : messages,
          "temperature": 0.9,
          "max_tokens": 500,
          "top_p": 1,
          "frequency_penalty": 0.0,
          "presence_penalty": 0.0
        };
      
      let response = org.jsoup.Jsoup.connect("https://api.openai.com/v1/chat/completions")
          .header("Authorization", "Bearer " + key) // Open ai 토큰값
          .header("Content-Type", "application/json")
          .requestBody(JSON.stringify(data))
          .ignoreContentType(true)
          .ignoreHttpErrors(true)
          .timeout(200000)
          .post();
      
      
      json = JSON.parse(response.text())
      result = json.choices[0].message.content;
      
      /*
      var d_memo = ',{"role":"user"'
      var d_memory = ob_memory.split(d_memo)[0]
      var del_memory1 = d_memory + "]"
      
      save("/메이플m/", "카테고리pt".trim() + ".txt", del_memory1);
      */ 
      
      token_pt = json.usage.prompt_tokens * 0.00000015
  
      return [result, token_pt]
}

//장기저장 답변모델
function getChatGPTResponse(msg, sender) {
    let json;
    let result;
    
    try {
      
      //JSON 파일 불러오기(문자열)
      
      var memory = read("/메이플m/", "간단기억모음집.txt")
      memory = memory.split("}]")[0]
      
      messages_user = [{"role" : "user",
                        "content" : sender + " : " + msg}]
      var messages_user = JSON.stringify(messages_user)
      messages_user = messages_user.split("[{")[1]
      save("/메이플m/", "간단기억모음집".trim() + ".txt", memory + "},{" + messages_user);
      
      var ob_memory = read("/메이플m/", "간단기억모음집.txt")
      
      // JSON 문자열 객체로 전환
      var messages = JSON.parse(ob_memory)
      
      /*
      //토니 추천 배치사이즈 처리
      
      const batchSize = 20
      const mlist = []
      
      const regex = new RegExp('{[^{}]*}', 'g'); //{data} 패턴 찾는 정규식
      const matches = ob_memory.match(regex)
      
      for(let i = 0; i < matches.length; i += batchSize){
        
        var batch = matches.slice(i, i + batchSize)
        var batchpad = "[" + batch + "]"
        
        var parsedata = JSON.parse(batchpad)
        mlist.push(parsedata)
        }
        
      let messages = []
      mlist.forEach((element) => {
         messages = messages.concat(element)
       })
      */
      let data = {
          "model": "gpt-4o-mini", //gpt-3.5-turbo-16k / gpt-4-1106-preview
          "messages" : messages,
          "temperature": 0.9,
          "max_tokens": 500,
          "top_p": 1,
          "frequency_penalty": 0.0,
          "presence_penalty": 0.0
        };
      
      let response = org.jsoup.Jsoup.connect("https://api.openai.com/v1/chat/completions")
          .header("Authorization", "Bearer " + key) // Open ai 토큰값
          .header("Content-Type", "application/json")
          .requestBody(JSON.stringify(data))
          .ignoreContentType(true)
          .ignoreHttpErrors(true)
          .timeout(200000)
          .post();
      
      json = JSON.parse(response.text())
      result = json.choices[0].message.content;
      
      token_pt = json.usage.prompt_tokens * 0.00000015
      token_com = json.usage.completion_tokens * 0.0000006
      
      
      //JSON 객체에서 문자열로 변경
      var messages_assistant = JSON.stringify(messages)
      messages_assistant = messages_assistant.split("}]")[0]
      messages_assi = [{"role" : "assistant",
                     "content" : result}]
      var messages_as = JSON.stringify(messages_assi)
      messages_as = messages_as.split("[{")[1]
      save("/메이플m/", "간단기억모음집".trim() + ".txt", messages_assistant + "},{" + messages_as);
      
     
    } catch(e){
        var error_memory = read("/메이플m/", "간단기억모음집.txt")
      
        const regex = new RegExp('{[^{}]*}', 'g'); //{data} 패턴 찾는 정규식
        const error_data = error_memory.match(regex) //13
        const del_num = 21 // -1개가 삭제됨
      
        var error_check = []
        var del_real = error_data.slice(1, del_num)
        error_check.push(del_real)
      
        var del_memory = error_memory.replace(error_check +",", "")
        save("/메이플m/", "간단기억모음집".trim() + ".txt", del_memory)
        var messages = JSON.parse(del_memory)
      
        let data = {
          "model": "gpt-4o-mini",
          "messages" : messages,
          "temperature": 0.9,
          "max_tokens": 500,
          "top_p": 1,
          "frequency_penalty": 0.0,
          "presence_penalty": 0.0
          };
      
        let response = org.jsoup.Jsoup.connect("https://api.openai.com/v1/chat/completions")
          .header("Authorization", "Bearer " + key) // Open ai 토큰값
          .header("Content-Type", "application/json")
          .requestBody(JSON.stringify(data))
          .ignoreContentType(true)
          .ignoreHttpErrors(true)
          .timeout(200000)
          .post();
      
          json = JSON.parse(response.text())
          result = json.choices[0].message.content;
          
          token_pt = json.usage.prompt_tokens * 0.00000015
          token_com = json.usage.completion_tokens * 0.0000006
          
          //JSON 객체에서 문자열로 변경
          var messages_assistant = JSON.stringify(messages)
          messages_assistant = messages_assistant.split("}]")[0]
          messages_assi = [{"role" : "assistant",
                            "content" : result}]
          var messages_as = JSON.stringify(messages_assi)
          messages_as = messages_as.split("[{")[1]
          save("/메이플m/", "간단기억모음집".trim() + ".txt", messages_assistant + "},{" + messages_as);
    }
    
    
    return [result, token_pt, token_com]
}

//단답모델(기억저장x)
function smallGpt(msg, sender, data) {
    let json;
    let result;
      
      //JSON 파일 불러오기(문자열)
      var memory = read("/메이플m/", "간단기억모음집.txt")
      memory = memory.split("}]")[0]
      
      messages_user = [{"role" : "user",
                        "content" : sender + " : " + msg}]
      var messages_user = JSON.stringify(messages_user)
      messages_user = messages_user.split("[{")[1]
      
      var ob_memory = memory + "},{" + messages_user
      
      // JSON 문자열 객체로 전환
      var messages = JSON.parse(ob_memory)
      
      let data = {
          "model": "gpt-4o-mini", //gpt-3.5-turbo-16k / gpt-4-1106-preview
          "messages" : messages,
          "temperature": 0.9,
          "max_tokens": 500,
          "top_p": 1,
          "frequency_penalty": 0.0,
          "presence_penalty": 0.0
        };
      
      let response = org.jsoup.Jsoup.connect("https://api.openai.com/v1/chat/completions")
          .header("Authorization", "Bearer " + key) // Open ai 토큰값
          .header("Content-Type", "application/json")
          .requestBody(JSON.stringify(data))
          .ignoreContentType(true)
          .ignoreHttpErrors(true)
          .timeout(200000)
          .post();
      
      json = JSON.parse(response.text())
      result = json.choices[0].message.content;
      
      token_pt = json.usage.prompt_tokens * 0.000000125
      token_com = json.usage.completion_tokens * 0.00000025
      
      /*
      var d_memo = ',{"role":"user"'
      var d_memory = ob_memory.split(d_memo)[0]
      var del_memory1 = d_memory + "]"
      
      save("/메이플m/", "카테고리pt".trim() + ".txt", del_memory1);
      */
      return [result, token_pt, token_com]
}

//gemini grounding
function getgemini(msg, sender) {
    let json;
    let result;
      
      var ge_prompt = "당신은 토끼이며 이름은 토니 입니다.\n" +
                      "당신은 항상 실시간 검색 후 답변 해줍니다.\n" +
                      "당신은 검색된 정보를 기반으로 답변 해줍니다.\n" +
                      "당신에게 시간을 물어본다면 " + real_time + " 으로 답변 해줍니다.\n" +
                      "당신은 답변에 이모티콘을 사용하지 않으며 한국어로 답변 해줍니다.\n" +
                      "당신은 최대한 짧게 답변 해줍니다.\n" +
                      "어조: 10살짜리 친구처럼, 반말로 답변\n" +
                      "질문자 닉네임 : " + sender + "\n" +
                      "질문내용 : " + msg
                      
      
      var ge_data = {
          "contents" : [{
            "parts" : [{
              "text" : ge_prompt
            }]
          }],
          "generationConfig" : {
            "temperature": 0.9,
            "maxOutputTokens": 500,
            "top_p": 1,
          },
          "tools" : [{
            "google_search_retrieval" : {
              /*
              "dynamic_retrieval_config" : {
                "mode" : "MODE_DYNAMIC",
                "dynamic_threshold" : 0.9,
              }
              */
            }
          }]
        };
      
      var ge_key = "gemini_key"
      var ge_model = "gemini-1.5-flash-002"
      var url = "https://generativelanguage.googleapis.com/v1alpha/models/" + ge_model +":generateContent?key=" + ge_key
      
      let response = org.jsoup.Jsoup.connect(url)
          .header("Content-Type", "application/json")
          .requestBody(JSON.stringify(ge_data))
          .ignoreContentType(true)
          .ignoreHttpErrors(true)
          .timeout(200000)
          .post();
      
      json = JSON.parse(response.body().text())
      result = json.candidates[0].content.parts[0].text
      
      token_pt = json.usageMetadata.promptTokenCount * 0.000000075    
      token_com = json.usageMetadata.candidatesTokenCount * 0.0000003
      
      var check_url = JSON.stringify(json.candidates[0].groundingMetadata.searchEntryPoint.renderedContent)
      
      var check_url2 = check_url.split('href=')[1]
      var check_url3 = check_url2.split('\\">')[0]
      
      check_url3 = check_url3.replace('\\"', "")
      
      return [result, check_url3, token_pt, token_com]
}

//지하철 답변
function subwayGpt(msg, sender, sub_way) {
    let json;
    let result;
      
      //JSON 파일 불러오기(문자열)
      var memory = read("/메이플m/", "간단기억모음집.txt")
      memory = memory.split("}]")[0]
      
      messages_user = [{"role" : "user",
                        "content" : sender + " : " + msg},
                       {"role" : "user",
                        "content" : "전철정보" + " : " + sub_way}]
      var messages_user = JSON.stringify(messages_user)
      messages_user = messages_user.split("[{")[1]
      
      var ob_memory = memory + "},{" + messages_user
      
      // JSON 문자열 객체로 전환
      var messages = JSON.parse(ob_memory)
      
      let data = {
          "model": "gpt-4o-mini", //gpt-3.5-turbo-16k / gpt-4-1106-preview
          "messages" : messages,
          "temperature": 0.9,
          "max_tokens": 500,
          "top_p": 1,
          "frequency_penalty": 0.0,
          "presence_penalty": 0.0
        };
      
      let response = org.jsoup.Jsoup.connect("https://api.openai.com/v1/chat/completions")
          .header("Authorization", "Bearer " + key) // Open ai 토큰값
          .header("Content-Type", "application/json")
          .requestBody(JSON.stringify(data))
          .ignoreContentType(true)
          .ignoreHttpErrors(true)
          .timeout(200000)
          .post();
      
      json = JSON.parse(response.text())
      result = json.choices[0].message.content;
      
      token_pt = json.usage.prompt_tokens * 0.000000125
      token_com = json.usage.completion_tokens * 0.00000025
      
      /*
      var d_memo = ',{"role":"user"'
      var d_memory = ob_memory.split(d_memo)[0]
      var del_memory1 = d_memory + "]"
      
      save("/메이플m/", "카테고리pt".trim() + ".txt", del_memory1);
      */
      return [result, token_pt, token_com]
}


//youtube api
function getyoutube(query){
  var yout_key = "yout_key"
  var max_results = 10
  var query = query
  
  var url = "https://www.googleapis.com/youtube/v3/search?part=snippet" + "&maxResults=" + max_results +
  "&q=" + query + "&type=video" + "&key=" + yout_key
      
  var response = org.jsoup.Jsoup.connect(url)
      .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
      .ignoreContentType(true)
      .ignoreHttpErrors(true)
      .timeout(20000)
      .execute()
  
  json = JSON.parse(response.body()) 
  
  result_video = "동영상 정보\n"
  
  for(var leng = 0; leng < 5; leng++){
    var num_leng = leng + 1
    var you_id = json.items[leng].id.videoId
    if(you_id != undefined){     
      result_video += num_leng + "번 " + json.items[leng].snippet.title + "\n"
      result_video += "http://youtube.com/watch?v=" + you_id + " \n"   
    }  
  }
  
  return result_video
}


//코딩질문 모델
function codemaster(msg, sender) {
    let json;
    let result;
    
    try {
      
      //JSON 파일 불러오기(문자열)
      
      var memory = read("/메이플m/", "코딩질문.txt")
      memory = memory.split("}]")[0]
      
      messages_user = [{"role" : "user",
                        "content" : sender + " : " + msg}]
      var messages_user = JSON.stringify(messages_user)
      messages_user = messages_user.split("[{")[1]
      save("/메이플m/", "코딩질문".trim() + ".txt", memory + "},{" + messages_user);
      
      var ob_memory = read("/메이플m/", "코딩질문.txt")
      
      // JSON 문자열 객체로 전환
      var messages = JSON.parse(ob_memory)
      
      /*
      //토니 추천 배치사이즈 처리
      
      const batchSize = 20
      const mlist = []
      
      const regex = new RegExp('{[^{}]*}', 'g'); //{data} 패턴 찾는 정규식
      const matches = ob_memory.match(regex)
      
      for(let i = 0; i < matches.length; i += batchSize){
        
        var batch = matches.slice(i, i + batchSize)
        var batchpad = "[" + batch + "]"
        
        var parsedata = JSON.parse(batchpad)
        mlist.push(parsedata)
        }
        
      let messages = []
      mlist.forEach((element) => {
         messages = messages.concat(element)
       })
      */
      let data = {
          "model": "gpt-4o-mini", //gpt-3.5-turbo-16k / gpt-4-1106-preview
          "messages" : messages,
          "temperature": 0.9,
          "max_tokens": 500,
          "top_p": 1,
          "frequency_penalty": 0.0,
          "presence_penalty": 0.0
        };
      
      let response = org.jsoup.Jsoup.connect("https://api.openai.com/v1/chat/completions")
          .header("Authorization", "Bearer " + key) // Open ai 토큰값
          .header("Content-Type", "application/json")
          .requestBody(JSON.stringify(data))
          .ignoreContentType(true)
          .ignoreHttpErrors(true)
          .timeout(200000)
          .post();
      
      json = JSON.parse(response.text())
      result = json.choices[0].message.content;
      
     
      //JSON 객체에서 문자열로 변경
      var messages_assistant = JSON.stringify(messages)
      messages_assistant = messages_assistant.split("}]")[0]
      messages_assi = [{"role" : "assistant",
                     "content" : result}]
      var messages_as = JSON.stringify(messages_assi)
      messages_as = messages_as.split("[{")[1]
      save("/메이플m/", "코딩질문".trim() + ".txt", messages_assistant + "},{" + messages_as);
      
     
    } catch(e){
        var error_memory = read("/메이플m/", "코딩질문.txt")
      
        const regex = new RegExp('{[^{}]*}', 'g'); //{data} 패턴 찾는 정규식
        const error_data = error_memory.match(regex) //13
        const del_num = 21 // -1개가 삭제됨
      
        var error_check = []
        var del_real = error_data.slice(1, del_num)
        error_check.push(del_real)
      
        var del_memory = error_memory.replace(error_check +",", "")
        save("/메이플m/", "코딩질문".trim() + ".txt", del_memory)
        var messages = JSON.parse(del_memory)
      
        let data = {
          "model": "gpt-4o-mini",
          "messages" : messages,
          "temperature": 0.9,
          "max_tokens": 500,
          "top_p": 1,
          "frequency_penalty": 0.0,
          "presence_penalty": 0.0
          };
      
        let response = org.jsoup.Jsoup.connect("https://api.openai.com/v1/chat/completions")
          .header("Authorization", "Bearer " + key) // Open ai 토큰값
          .header("Content-Type", "application/json")
          .requestBody(JSON.stringify(data))
          .ignoreContentType(true)
          .ignoreHttpErrors(true)
          .timeout(200000)
          .post();
      
          json = JSON.parse(response.text())
          result = json.choices[0].message.content;
          
          //JSON 객체에서 문자열로 변경
          var messages_assistant = JSON.stringify(messages)
          messages_assistant = messages_assistant.split("}]")[0]
          messages_assi = [{"role" : "assistant",
                            "content" : result}]
          var messages_as = JSON.stringify(messages_assi)
          messages_as = messages_as.split("[{")[1]
          save("/메이플m/", "코딩질문".trim() + ".txt", messages_assistant + "},{" + messages_as);
    }
    
    return result;
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
const scriptName = "악사 - gpt";
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
var folder = new java.io.File(sdcard + "/마비노기/");
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

save("/마비노기/", "판매상품".trim() + ".txt", title4);

var read_me2 = read("/마비노기/", "패치노트.txt")

*/

//api key
let key = "api key"

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
   
    if(msg == "마비_간단초기화"){
      if((sender.indexOf("뚱부")!=-1)||(sender.indexOf("Chansung")!=-1)){
        var reset_memory = read("/마비노기/", "간단기억모음집.txt")
        var split_memo = ',{"role":"user"'
        var check_memory = reset_memory.split(split_memo)[0]
        var check_memory2 = check_memory + "]"
        
        if(reset_memory.indexOf("user")!=-1){
          save("/마비노기/", "간단기억모음집".trim() + ".txt", check_memory2);
          
          replier.reply("간단기억 초기화 완료!!🫧")
          return
        }else{
          replier.reply("이미 초기화 되어 있는데요?!🫧")
          return
        }
      }else{
        replier.reply("뚱부 멘션 해주세요!!🫧")
        return 
      }
    }
    
    //프롬프트 엔지니어링 (openAI)
    if(msg == "마비_prompt_간단친구"){
      if((sender.indexOf("뚱부")!=-1)||(sender.indexOf("Chansung")!=-1)){
        var prom_memory_fr = '[' +
        '{"role":"system","content":"당신은 "어린아이" 이며 이름은 "악사" 입니다."},' +
        '{"role":"system","content":"질문자 닉네임:질문내용 형식으로 진행됩니다."},' +
        '{"role":"system","content":"어조: 10살짜리 친구처럼, 반말로 답변"}'
        
        var normal_memory_fr = read("/마비노기/", "간단기억모음집.txt")
        var s_memo_fr = ',{"role":"user"'
        var c_memory_fr = normal_memory_fr.split(s_memo_fr)[0]
        
        if(normal_memory_fr.indexOf("user")!=-1){
          var change_memory_fr = normal_memory_fr.replace(c_memory_fr, prom_memory_fr)
          save("/마비노기/", "간단기억모음집".trim() + ".txt", change_memory_fr);
          
          replier.reply("간단악사의 기억 변경 완료!🫧\n\n"+
          "[prompt : 어린아이 같은 친구토끼]")
          return
        }else{
          var cc_memory_fr = normal_memory_fr.split("]")[0]
          var chan_memory_fr = normal_memory_fr.replace(cc_memory_fr, prom_memory_fr)
          
          save("/마비노기/", "간단기억모음집".trim() + ".txt", chan_memory_fr);
          
          replier.reply("간단악사의 기억 변경 완료!🫧\n\n"+
          "[prompt : 어린아이 같은 친구토끼]")
          return
        } 
      }
    }
    
    if(msg == "마비_prompt_카테고리"){
      if((sender.indexOf("뚱부")!=-1)||(sender.indexOf("Chansung")!=-1)){
        var prom_memory_fr = '[' +
        '{"role":"system","content":"당신은 판별자 입니다."},' +
        '{"role":"system","content":"당신은 질문의 내용을 카테고리 별로 구별할 수 있으며 답변은 카테고리 리스트 내용으로만 답변합니다."},' +
        '{"role":"system","content":"카테고리 리스트: 일상대화, 검색"},'
        
        var normal_memory_fr = read("/마비노기/", "카테고리pt.txt")
  
        if(normal_memory_fr.indexOf("user")!=-1){
          var s_memo_fr = ',{"role":"user"'
          var c_memory_fr = normal_memory_fr.split(s_memo_fr)[0]
          var change_memory_fr = normal_memory_fr.replace(c_memory_fr, prom_memory_fr)
          save("/마비노기/", "카테고리pt".trim() + ".txt", change_memory_fr);
          
          replier.reply("간단악사의 기억 변경 완료!🫧\n\n"+
          "[prompt : 카테고리 변경]")
          return
        }else{
          var cc_memory_fr = normal_memory_fr.split("]")[0]
          var chan_memory_fr = normal_memory_fr.replace(cc_memory_fr, prom_memory_fr)
          
          save("/마비노기/", "카테고리pt".trim() + ".txt", chan_memory_fr);
          
          replier.reply("간단악사의 기억 변경 완료!🫧\n\n"+
          "[prompt : 카테고리 변경]")
          return
        } 
      }
    }
    
    //일상대화, 검색
    if(msg.startsWith("#악사 ")){
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
          
          if(categori.indexOf("일상대화")!=-1){
            prompt_list(categori)
            
            var [answer, a_token_pt, a_token_com] = getChatGPTResponse(qna, sender) 
            
            var token_read = read("/마비노기/", "토큰사용.txt")
            
            var usetoken = good_token + a_token_pt + a_token_com
            var num_token = Number(token_read)
            var total_token = num_token + good_token + a_token_pt + a_token_com
            
            var usetoken = parseFloat(usetoken).toFixed(6)
            var total_token = parseFloat(total_token).toFixed(6)
            
            var limits = parseFloat((total_token / 20) * 100)
            var limits = limits.toFixed(6)
            var li_bar = limit_bar(limits)
            save("/마비노기/", "토큰사용".trim() + ".txt", total_token);

            replier.reply("💌 띠롱띠롱 답변 도착 ♫•*¨*•.¸¸♪✧\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            state2 + " 악사\n\n『" +
            answer + "🫧』\n" +
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
            
            var token_read = read("/마비노기/", "토큰사용.txt")
            
            var usetoken = good_token + g_token_pt + g_token_com
            var num_token = Number(token_read)
            var total_token = num_token + good_token + g_token_pt + g_token_com
            
            var usetoken = parseFloat(usetoken).toFixed(6)
            var total_token = parseFloat(total_token).toFixed(6)
            
            var limits = parseFloat((total_token / 20) * 100)
            var limits = limits.toFixed(6)
            var li_bar = limit_bar(limits)
            save("/마비노기/", "토큰사용".trim() + ".txt", total_token);
  
            replier.reply("💌 띠롱띠롱 답변 도착 ♫•*¨*•.¸¸♪✧\n" +
            "➖➖➖➖➖➖➖➖➖➖➖\n" +
            state2 + " 악사\n\n『" +
            answer.trim() + "🫧』\n\n" +
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
          replier.reply("악사가 답변을 완료하면\n" +
          "그때 이용해주세요!! ㅇ ㅅㅇ🫧")
          return
        }
      }else{
        replier.reply("뜡부 불러오세요!! ㅇ ㅅㅇ🫧")
        return
      }
    }
  }
}

//prompt list

//일상대화, 검색
function prompt_list(categori) {
  
  var normal_memory_fr = read("/마비노기/", "간단기억모음집.txt")
    
  if(categori == "일상대화"){
    //categori = 일상대화
    var prom_memory_fr = '[' +
    '{"role":"system","content":"당신은 "어린아이" 이며 이름은 "악사" 입니다."},' +
    '{"role":"system","content":"당신은 상대방에게 죄송하다는 답변을 하지 않습니다."},' +
    '{"role":"system","content":"당신은 가장 마지막줄의 질문에 대한 답변을 해줍니다."},' +
    '{"role":"system","content":"당신에게 시간을 물어본다면 ' + real_time + ' 으로 답변 해줍니다."},' +
    '{"role":"system","content":"질문자 닉네임:질문내용 형식으로 진행됩니다."},' +
    '{"role":"system","content":"어조: 10살짜리 친구처럼, 반말로 답변"}'
         
    if(normal_memory_fr.indexOf("user")!=-1){
      var s_memo_fr = ',{"role":"user"'
      var c_memory_fr = normal_memory_fr.split(s_memo_fr)[0] 
      var change_memory_fr = normal_memory_fr.replace(c_memory_fr, prom_memory_fr)
      save("/마비노기/", "간단기억모음집".trim() + ".txt", change_memory_fr);
    
      return
    }else{
      var cc_memory_fr = normal_memory_fr.split("]")[0]
      var chan_memory_fr = normal_memory_fr.replace(cc_memory_fr, prom_memory_fr)
          
      save("/마비노기/", "간단기억모음집".trim() + ".txt", chan_memory_fr);
        
      return
    }
  }else if(categori == "검색"){
    //categori = 검색
    var prom_memory_fr = '[' +
    '{"role":"system","content":"당신은 "어린아이" 이며 이름은 "악사" 입니다."},' +
    '{"role":"system","content":"당신은 가장 마지막줄의 질문에 대한 답변을 해줍니다."},' + 
    '{"role":"system","content":"당신에게 시간을 물어본다면 ' + real_time + ' 으로 답변 해줍니다."},' +
    '{"role":"system","content":"질문자 닉네임:질문내용 형식으로 진행됩니다."},' +
    '{"role":"system","content":"어조: 10살짜리 친구처럼, 반말로 답변"}'
      
    if(normal_memory_fr.indexOf("user")!=-1){
      var s_memo_fr = ',{"role":"user"'
      var c_memory_fr = normal_memory_fr.split(s_memo_fr)[0]
      var change_memory_fr = normal_memory_fr.replace(c_memory_fr, prom_memory_fr)
      save("/마비노기/", "간단기억모음집".trim() + ".txt", change_memory_fr);
    
      return
    }else{
      var cc_memory_fr = normal_memory_fr.split("]")[0]
      var chan_memory_fr = normal_memory_fr.replace(cc_memory_fr, prom_memory_fr)
          
      save("/마비노기/", "간단기억모음집".trim() + ".txt", chan_memory_fr);
        
      return
    }
  }
}

//검증모델

function categoriGpt(msg) {
    let json;
    let result;
      
      //JSON 파일 불러오기(문자열)
      var memory = read("/마비노기/", "카테고리pt.txt")
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
      
      token_pt = json.usage.prompt_tokens * 0.00000015
  
      return [result, token_pt]
}

//장기저장 답변모델(일상대화)
function getChatGPTResponse(msg, sender) {
    let json;
    let result;
    
    try {
      
      //JSON 파일 불러오기(문자열)
      var memory = read("/마비노기/", "간단기억모음집.txt")
      
      //input data 정제
      if(memory.indexOf("user")!=-1){
        var check_memory = ',{"role":"user"'
        var main_prompt = memory.split(check_memory)[0]
        var main_prompt = main_prompt + "]"

        if(memory.indexOf(sender)!=-1){
          var get_length_nick = memory.split(sender).length
        
          var one_material = memory.split(sender)[0]
          var one_material = one_material.split('},')[1]
          var one_material = one_material + sender

          for(var cc = 1; cc < get_length_nick; cc++){
            var two_material = memory.split(sender)[cc]
            if(two_material.indexOf("user")!=-1){
              var two_material = two_material.split(',{"role":"user"')[0]
            }else{
              var two_material = two_material.split('}]')[0]
              var two_material = two_material + "}"
            }
            var get_material = one_material + two_material
            
            if(cc == 1){
              var main_prompt = main_prompt.split("}]")[0]
              last_material = main_prompt + "}," + get_material
            }else{
              last_material = last_material + "," + get_material
            }
          }

          var final_material = last_material + "]"
          var final_material = final_material.split("}]")[0]
          var messages_user = [{"role" : "user",
                                "content" : sender + " : " + msg}]
          var messages_user = JSON.stringify(messages_user)
          var messages_user = messages_user.split("[{")[1]
          save("/마비노기/", "인풋데이터".trim() + ".txt", final_material + "},{" + messages_user);
        
        }else{
          var main_prompt = main_prompt.split("}]")[0]
          var messages_user = [{"role" : "user",
                                "content" : sender + " : " + msg}]
          var messages_user = JSON.stringify(messages_user)
          var messages_user = messages_user.split("[{")[1]
          save("/마비노기/", "인풋데이터".trim() + ".txt", main_prompt + "},{" + messages_user);
        }
      }else{
        var memory = memory.split("}]")[0]
        var messages_user = [{"role" : "user",
                          "content" : sender + " : " + msg}]
        var messages_user = JSON.stringify(messages_user)
        var messages_user = messages_user.split("[{")[1]
        save("/마비노기/", "인풋데이터".trim() + ".txt", memory + "},{" + messages_user);
      }
      
      //전체 데이터 저장
      memory = memory.split("}]")[0]
      messages_user = [{"role" : "user",
                        "content" : sender + " : " + msg}]
      var messages_user = JSON.stringify(messages_user)
      messages_user = messages_user.split("[{")[1]
      save("/마비노기/", "간단기억모음집".trim() + ".txt", memory + "},{" + messages_user);

      var ob_memory = read("/마비노기/", "인풋데이터.txt")
      
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
      
      token_pt = json.usage.prompt_tokens * 0.00000015
      token_com = json.usage.completion_tokens * 0.0000006
      
      
      //JSON 객체에서 문자열로 변경
      var messages_assistant = JSON.stringify(messages)
      messages_assistant = messages_assistant.split("}]")[0]
      messages_assi = [{"role" : "assistant",
                       "content" : result}]
      var messages_as = JSON.stringify(messages_assi)
      messages_as = messages_as.split("[{")[1]
      save("/마비노기/", "간단기억모음집".trim() + ".txt", messages_assistant + "},{" + messages_as);
      
      
    }catch(e){
        var error_memory = read("/마비노기/", "간단기억모음집.txt")
      
        const regex = new RegExp('{[^{}]*}', 'g'); //{data} 패턴 찾는 정규식
        const error_data = error_memory.match(regex) //13
        const del_num = 21 // -1개가 삭제됨
      
        var error_check = []
        var del_real = error_data.slice(1, del_num)
        error_check.push(del_real)
      
        var del_memory = error_memory.replace(error_check +",", "")
        save("/마비노기/", "간단기억모음집".trim() + ".txt", del_memory)

        var memory = read("/마비노기/", "간단기억모음집.txt")
        //input data 정제
        if(memory.indexOf("user")!=-1){
          var check_memory = ',{"role":"user"'
          var main_prompt = memory.split(check_memory)[0]
          var main_prompt = main_prompt + "]"

          if(memory.indexOf(sender)!=-1){
            var get_length_nick = memory.split(sender).length
          
            var one_material = memory.split(sender)[0]
            var one_material = one_material.split('},')[1]
            var one_material = one_material + sender

            for(var cc = 1; cc < get_length_nick; cc++){
              var two_material = memory.split(sender)[cc]
              if(two_material.indexOf("user")!=-1){
                var two_material = two_material.split(',{"role":"user"')[0]
              }else{
                var two_material = two_material.split('}]')[0]
                var two_material = two_material + "}"
              }
              var get_material = one_material + two_material
              
              if(cc == 1){
                var main_prompt = main_prompt.split("}]")[0]
                last_material = main_prompt + "}," + get_material
              }else{
                last_material = last_material + "," + get_material
              }
            }

            var final_material = last_material + "]"
            var final_material = final_material.split("}]")[0]
            var messages_user = [{"role" : "user",
                                  "content" : sender + " : " + msg}]
            var messages_user = JSON.stringify(messages_user)
            var messages_user = messages_user.split("[{")[1]
            save("/마비노기/", "인풋데이터".trim() + ".txt", final_material + "},{" + messages_user);
          
          }else{
            var main_prompt = main_prompt.split("}]")[0]
            var messages_user = [{"role" : "user",
                                  "content" : sender + " : " + msg}]
            var messages_user = JSON.stringify(messages_user)
            var messages_user = messages_user.split("[{")[1]
            save("/마비노기/", "인풋데이터".trim() + ".txt", main_prompt + "},{" + messages_user);
          }
        }

        //전체 데이터 저장
        memory = memory.split("}]")[0]
        messages_user = [{"role" : "user",
                          "content" : sender + " : " + msg}]
        var messages_user = JSON.stringify(messages_user)
        messages_user = messages_user.split("[{")[1]
        save("/마비노기/", "간단기억모음집".trim() + ".txt", memory + "},{" + messages_user);

        var ob_memory = read("/마비노기/", "인풋데이터.txt")

        var messages = JSON.parse(ob_memory)
      
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
          save("/마비노기/", "간단기억모음집".trim() + ".txt", messages_assistant + "},{" + messages_as);
    }
    
    
    return [result, token_pt, token_com]
}


//gemini grounding
function getgemini(msg, sender) {
    let json;
    let result;
    
    var ge_prompt = "당신은 '어린아이' 이며 이름은 '악사' 입니다.\n" +
                    "당신은 항상 실시간으로 검색된 정보를 답변 해줍니다.\n" +
                    "당신은 마비노기 모바일 게임에 대한 전문가입니다.\n" +
                    "당신은 https://gall.dcinside.com/mgallery/board/lists/?id=mabinogimobile 에서 많은 정보를 얻습니다.\n" +
                    "당신에게 시간을 물어본다면 " + real_time + " 으로 답변 해줍니다.\n" +
                    "당신은 답변에 이모티콘을 사용하지 않으며 한국어로 답변 해줍니다.\n" +
                    "당신은 최대한 짧게 답변 해줍니다.\n" +
                    "어조: 10살짜리 친구처럼, 반말로 답변\n" +
                    "질문자 닉네임:" + sender + "\n" +
                    "질문내용:" + msg

    //JSON 파일 불러오기(문자열)
    var memory = read("/마비노기/", "간단기억모음집.txt")
    
    //input data 정제
    if(memory.indexOf("user")!=-1){
      var check_memory = ',{"role":"user"'
      var main_prompt = memory.split(check_memory)[0]
      var main_prompt = main_prompt + "]"

      if(memory.indexOf(sender)!=-1){
        var get_length_nick = memory.split(sender).length

        for(var cc = 1; cc < get_length_nick; cc++){
          var main_material = memory.split(sender)[cc]
          var one_material = main_material.split(": ")[1]
          var one_material = one_material.split('"}')[0]

          var two_material = main_material.split('"assistant","content":"')[1]
          var two_material = two_material.split('"}')[0]
          if(cc == 1){
            last_material = "당신은 '어린아이' 이며 이름은 '악사' 입니다.\n" +
                            "당신은 항상 실시간으로 검색된 정보를 답변 해줍니다.\n" +
                            "당신은 마비노기 모바일 게임에 대한 전문가입니다.\n" +
                            "당신은 https://gall.dcinside.com/mgallery/board/lists/?id=mabinogimobile 에서 많은 정보를 얻습니다.\n" +
                            "당신은 가장 마지막줄의 질문에 대한 답변을 해줍니다.\n" +
                            "당신에게 시간을 물어본다면 " + real_time + " 으로 답변 해줍니다.\n" +
                            "당신은 답변에 이모티콘을 사용하지 않으며 한국어로 답변 해줍니다.\n" +
                            "당신은 최대한 짧게 답변 해줍니다.\n" +
                            "어조: 10살짜리 친구처럼, 반말로 답변\n" +
                            "질문자 닉네임:" + sender + "\n" +
                            "질문내용:" + one_material + "\n" +
                            "당신의 답변:" + two_material
          }else{
            last_material = last_material + "\n" +
                            "질문자 닉네임:" + sender + "\n" +
                            "질문내용:" + one_material + "\n" +
                            "당신의 답변:" + two_material
          }
        }

        var ge_prompt = last_material
        
      }else{
        var ge_prompt = "당신은 '어린아이' 이며 이름은 '악사' 입니다.\n" +
                        "당신은 항상 실시간으로 검색된 정보를 답변 해줍니다.\n" +
                        "당신은 마비노기 모바일 게임에 대한 전문가입니다.\n" +
                        "당신은 https://gall.dcinside.com/mgallery/board/lists/?id=mabinogimobile 에서 많은 정보를 얻습니다.\n" +
                        "당신에게 시간을 물어본다면 " + real_time + " 으로 답변 해줍니다.\n" +
                        "당신은 답변에 이모티콘을 사용하지 않으며 한국어로 답변 해줍니다.\n" +
                        "당신은 최대한 짧게 답변 해줍니다.\n" +
                        "어조: 10살짜리 친구처럼, 반말로 답변\n" +
                        "질문자 닉네임:" + sender + "\n" +
                        "질문내용:" + msg
      }
    }else{
      var ge_prompt = "당신은 '어린아이' 이며 이름은 '악사' 입니다.\n" +
                      "당신은 항상 실시간으로 검색된 정보를 답변 해줍니다.\n" +
                      "당신은 마비노기 모바일 게임에 대한 전문가입니다.\n" +
                      "당신은 https://gall.dcinside.com/mgallery/board/lists/?id=mabinogimobile 에서 많은 정보를 얻습니다.\n" +
                      "당신에게 시간을 물어본다면 " + real_time + " 으로 답변 해줍니다.\n" +
                      "당신은 답변에 이모티콘을 사용하지 않으며 한국어로 답변 해줍니다.\n" +
                      "당신은 최대한 짧게 답변 해줍니다.\n" +
                      "어조: 10살짜리 친구처럼, 반말로 답변\n" +
                      "질문자 닉네임:" + sender + "\n" +
                      "질문내용:" + msg
    }

    //전체 데이터 저장
    memory = memory.split("}]")[0]
    messages_user = [{"role" : "user",
                      "content" : sender + " : " + msg}]
    var messages_user = JSON.stringify(messages_user)
    messages_user = messages_user.split("[{")[1]
    save("/마비노기/", "간단기억모음집".trim() + ".txt", memory + "},{" + messages_user);
    
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
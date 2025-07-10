const scriptName = "토니 - 상위공지";
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

Jsoup = org.jsoup.Jsoup;
const filter_keywords = ["제재"]
var title = "";

//자동공지 시작버튼
starton = false;

//방이름
room_name = ["[윌] 연습 트라이방", "[진힐라] 연습 트라이방",
"[카루시,카윌] 연습 트라이방", "[듄켈] 연습 트라이방", "[검마] 연습 트라이방",
"[세렌] 연습 트라이방", "⭐️캔들⭐️"]

function responseFix(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if(isGroupChat==true){
    try{
      /* 
      //공지시작
      if(msg == "!공지시작"){
        if(sender.indexOf("뜡부")!=-1){
          if(starton == true){
            replier.reply("이미 공지 진행중이에요! 🐰")
            return
          }else{
            starton = true
            replier.reply("공지 시작합니다! 🐰")
            //자동공지
            while(starton){*/
      var doc = Utils.getWebText("https://forum.nexon.com/api/v1/board/1211/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1677578987860")
        .replace(/<([^>]+)>/g, "") //html 태그 제거
        .trim()
      var doc2 = Utils.getWebText("https://forum.nexon.com/api/v1/board/1215/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687836980278")
        .replace(/<([^>]+)>/g, "") //html 태그 제거
        .trim()
      var doc3 = Utils.getWebText("https://forum.nexon.com/api/v1/board/1378/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837267269")
        .replace(/<([^>]+)>/g, "") //html 태그 제거
        .trim()
      var doc4 = Utils.getWebText("https://forum.nexon.com/api/v1/board/1217/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837232543")
        .replace(/<([^>]+)>/g, "") //html 태그 제거
        .trim()
      var doc5 = Utils.getWebText("https://forum.nexon.com/api/v1/board/1216/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837128112")
        .replace(/<([^>]+)>/g, "") //html 태그 제거
        .trim()
   
      //공지사항  
      var title = doc.split('title":"')[1]
      title = title.split('"')[0]
      var read_me = read("/메이플m/","/윌연습방/"+"공지.txt")
    
      //패치노트
      var title2 = doc2.split('title":"')[1]
      title2 = title2.split('"')[0]
      var read_me2 = read("/메이플m/","/윌연습방/"+"패치노트.txt")
  
      //이벤트
      var title3 = doc3.split('title":"')[1]
      title3 = title3.split('"')[0]
      var read_me3 = read("/메이플m/","/윌연습방/"+ "이벤트.txt")
  
      //판매상품
      var title4 = doc4.split('title":"')[1]
      title4 = title4.split('"')[0]
      var read_me4 = read("/메이플m/","/윌연습방/"+ "판매상품.txt")
  
      //Gm소식
      var title5 = doc5.split('title":"')[1]
      title5 = title5.split('"')[0]
      var read_me5 = read("/메이플m/","/윌연습방/"+ "gm소식.txt") 
  
      if(title != read_me){
		      var iscash=0;
		      for(var a=0;a<filter_keywords.length;a++){
			       if(title.includes(filter_keywords[a])){
            iscash=1;
          }
        }
			     if(iscash==0){
          save("/메이플m/","/윌연습방/"+"공지".trim() + ".txt", title);
          var threadid = doc.split('threadId":"')[1]
          threadid = threadid.split('",')[0]
          var boardid = doc.split('boardId":"')[1]
          boardid = boardid.split('",')[0]
          var gm_nick = doc.split('nickname":"')[1]
          gm_nick = gm_nick.split('",')[0]
				      var url = "https://forum.nexon.com/maplestorym/board_view?board="+boardid+"&thread="+threadid
				              
          for(var t = 0; t < room_name.length; t++){
            replier.reply(room_name[t], "🐰토니가 새로운 공지를 물어왔어요!\n\n"+title+"\n\n[🥕]작성자 : "+gm_nick+"\n[🥕]당근칩 먹고 싶당\n\n"+url);
            java.lang.Thread.sleep(2000)
          }
        }
      } //공지사항
      if(title2 != read_me2){
		      var iscash=0;
		      for(var a=0;a<filter_keywords.length;a++){
			       if(title2.includes(filter_keywords[a])){
            iscash=1;
          }
        }
			     if(iscash==0){
          save("/메이플m/","/윌연습방/"+ "패치노트".trim() + ".txt", title2);
          var threadid2 = doc2.split('threadId":"')[1]
          threadid2 = threadid2.split('",')[0]
          var boardid2 = doc2.split('boardId":"')[1]
          boardid2 = boardid2.split('",')[0]
          var gm_nick2 = doc2.split('nickname":"')[1]
          gm_nick2 = gm_nick2.split('",')[0]
				      var url2 = "https://forum.nexon.com/maplestorym/board_view?board="+boardid2+"&thread="+threadid2
				              
          for(var t = 0; t < room_name.length; t++){
            replier.reply(room_name[t], "🐰토니가 새로운 공지를 물어왔어요!\n\n"+title2+"\n\n[🍎]작성자 : "+gm_nick2+"\n[🍎]사과칩 먹고 싶당\n\n"+url2);
            java.lang.Thread.sleep(2000)
          }
        }
      } //패치노트
      if(title3 != read_me3){
		      var iscash=0;
		      for(var a=0;a<filter_keywords.length;a++){
			       if(title3.includes(filter_keywords[a])){
            iscash=1;
          }
        }
			     if(iscash==0){
          save("/메이플m/","/윌연습방/"+"이벤트".trim() + ".txt", title3);
          var threadid3 = doc3.split('threadId":"')[1]
          threadid3 = threadid3.split('",')[0]
          var boardid3 = doc3.split('boardId":"')[1]
          boardid3 = boardid3.split('",')[0]
          var gm_nick3 = doc3.split('nickname":"')[1]
          gm_nick3 = gm_nick3.split('",')[0]
				      var url3 = "https://forum.nexon.com/maplestorym/board_view?board="+boardid3+"&thread="+threadid3
				              
          for(var t = 0; t < room_name.length; t++){
            replier.reply(room_name[t], "🐰토니가 새로운 공지를 물어왔어요!\n\n"+title3+"\n\n[🍌]작성자 : "+gm_nick3+"\n[🍌]바나나칩 먹고 싶당\n\n"+url3);
            java.lang.Thread.sleep(2000)
          }
        }
      } //이벤트
      if(title4 != read_me4){
		      var iscash=0;
		      for(var a=0;a<filter_keywords.length;a++){
			       if(title4.includes(filter_keywords[a])){
            iscash=1;
          }
        }
			     if(iscash==0){
          save("/메이플m/","/윌연습방/"+ "판매상품".trim() + ".txt", title4);
          var threadid4 = doc4.split('threadId":"')[1]
          threadid4 = threadid4.split('",')[0]
          var boardid4 = doc4.split('boardId":"')[1]
          boardid4 = boardid4.split('",')[0]
          var gm_nick4 = doc4.split('nickname":"')[1]
          gm_nick4 = gm_nick4.split('",')[0]
				      var url4 = "https://forum.nexon.com/maplestorym/board_view?board="+boardid4+"&thread="+threadid4
				              
          for(var t = 0; t < room_name.length; t++){
            replier.reply(room_name[t], "🐰토니가 새로운 공지를 물어왔어요!\n\n"+title4+"\n\n[🥝]작성자 : "+gm_nick4+"\n[🥝]키위칩 먹고 싶당\n\n"+url4);
            java.lang.Thread.sleep(2000)
          }
        }
      } //판매상품
      if(title5 != read_me5){
		      var iscash=0;
		      for(var a=0;a<filter_keywords.length;a++){
			       if(title5.includes(filter_keywords[a])){
            iscash=1;
          }
        }
        if(title5.indexOf("업데이트")!=-1){
			       if(iscash==0){
            save("/메이플m/","/윌연습방/"+ "gm소식".trim() + ".txt", title5);
            var threadid5 = doc5.split('threadId":"')[1]
            threadid5 = threadid5.split('",')[0]
            var boardid5 = doc5.split('boardId":"')[1]
            boardid5 = boardid5.split('",')[0]
            var gm_nick5 = doc5.split('nickname":"')[1]
            gm_nick5 = gm_nick5.split('",')[0]
				        var url5 = "https://forum.nexon.com/maplestorym/board_view?board="+boardid5+"&thread="+threadid5
				                
            for(var t = 0; t < room_name.length; t++){
              replier.reply(room_name[t], "🐰토니가 새로운 공지를 물어왔어요!\n\n"+title5+"\n\n[🍓]작성자 : "+gm_nick5+"\n[🍓]딸기칩 먹고 싶당\n\n"+url5);
              java.lang.Thread.sleep(2000)
            }
          }
        }
      } //gm소식
      /*
              java.lang.Thread.sleep(30000)
              if(starton == false){
                break
              }
            }
          }
        }else{
          replier.reply("뜡부 불러와요!! ㅇ ㅅㅇ🐰")
          return
        } 
      }
      */
      /*
      //공지종료
      if(msg == "!공지종료" || msg == "!공지중지"){
        if(sender.indexOf("뜡부")!=-1){
          if(starton == false){
            replier.reply("이미 종료됐는데요? ㅇ ㅅㅇ🐰")
            return
          }else{
            starton = false
                   
            replier.reply("공지 종료합니다! 🐰")
            return
          }
        }else{
          replier.reply("뜡부 불러와요!! ㅇ ㅅㅇ🐰")
          return
        }
      }*/
    }catch(e){ 
  }
}
/*
  if(room ==="[진힐라] 연습 트라이방"){
    try{
      
      //공지시작
      if(msg == "!공지시작"){
        if(sender.indexOf("뜡부")!=-1){
          if(starton_jin == true){
            replier.reply("이미 공지 진행중이에요! 🐰")
            return
          }else{
            starton_jin = true
            replier.reply("공지 시작합니다! 🐰")
            //자동공지 진힐라
            while(starton_jin){
              var doc_jin = Utils.getWebText("https://forum.nexon.com/api/v1/board/1211/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1677578987860")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc2_jin = Utils.getWebText("https://forum.nexon.com/api/v1/board/1215/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687836980278")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc3_jin = Utils.getWebText("https://forum.nexon.com/api/v1/board/1378/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837267269")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc4_jin = Utils.getWebText("https://forum.nexon.com/api/v1/board/1217/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837232543")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc5_jin = Utils.getWebText("https://forum.nexon.com/api/v1/board/1216/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837128112")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
   
              //공지사항  
              var title_jin = doc_jin.split('title":"')[1]
              title_jin = title_jin.split('"')[0]
              var read_me_jin = read("/메이플m/","/진힐라연습방/"+"공지.txt")
    
              //패치노트
              var title2_jin = doc2_jin.split('title":"')[1]
              title2_jin = title2_jin.split('"')[0]
              var read_me2_jin = read("/메이플m/","/진힐라연습방/"+"패치노트.txt")
  
              //이벤트
              var title3_jin = doc3_jin.split('title":"')[1]
              title3_jin = title3_jin.split('"')[0]
              var read_me3_jin = read("/메이플m/","/진힐라연습방/"+ "이벤트.txt")
  
              //판매상품
              var title4_jin = doc4_jin.split('title":"')[1]
              title4_jin = title4_jin.split('"')[0]
              var read_me4_jin = read("/메이플m/","/진힐라연습방/"+ "판매상품.txt")
  
              //Gm소식
              var title5_jin = doc5_jin.split('title":"')[1]
              title5_jin = title5_jin.split('"')[0]
              var read_me5_jin = read("/메이플m/","/진힐라연습방/"+ "gm소식.txt") 
  
              if(title_jin != read_me_jin){
		              var iscash_jin = 0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title_jin.includes(filter_keywords[a])){
                    iscash_jin = 1;
                  }
                }
			             if(iscash_jin == 0){
                  save("/메이플m/","/진힐라연습방/"+"공지".trim() + ".txt", title_jin);
                  var threadid_jin = doc_jin.split('threadId":"')[1]
                  threadid_jin = threadid_jin.split('",')[0]
                  var boardid_jin = doc_jin.split('boardId":"')[1]
                  boardid_jin = boardid_jin.split('",')[0]
                  var gm_nick_jin = doc_jin.split('nickname":"')[1]
                  gm_nick_jin = gm_nick_jin.split('",')[0]
				              var url_jin = "https://forum.nexon.com/maplestorym/board_view?board="+boardid_jin+"&thread="+threadid_jin
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title_jin+"\n\n[🥕]작성자 : "+gm_nick_jin+"\n[🥕]당근칩 먹고 싶당\n\n"+url_jin);
                  java.lang.Thread.sleep(1000)
                }
              } //공지사항
              if(title2_jin != read_me2_jin){
		              var iscash_jin =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title2_jin.includes(filter_keywords[a])){
                    iscash_jin =1;
                  }
                }
			             if(iscash_jin ==0){
                  save("/메이플m/","/진힐라연습방/"+ "패치노트".trim() + ".txt", title2_jin);
                  var threadid2_jin = doc2_jin.split('threadId":"')[1]
                  threadid2_jin = threadid2_jin.split('",')[0]
                  var boardid2_jin = doc2_jin.split('boardId":"')[1]
                  boardid2_jin = boardid2_jin.split('",')[0]
                  var gm_nick2_jin = doc2_jin.split('nickname":"')[1]
                  gm_nick2_jin = gm_nick2_jin.split('",')[0]
				              var url2_jin = "https://forum.nexon.com/maplestorym/board_view?board="+boardid2_jin+"&thread="+threadid2_jin
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title2_jin+"\n\n[🍎]작성자 : "+gm_nick2_jin+"\n[🍎]사과칩 먹고 싶당\n\n"+url2_jin);
                  java.lang.Thread.sleep(1000)
                }
              } //패치노트
              if(title3_jin != read_me3_jin){
		              var iscash_jin =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title3_jin.includes(filter_keywords[a])){
                    iscash_jin =1;
                  }
                }
			             if(iscash_jin ==0){
                  save("/메이플m/","/진힐라연습방/"+"이벤트".trim() + ".txt", title3_jin);
                  var threadid3_jin = doc3_jin.split('threadId":"')[1]
                  threadid3_jin = threadid3_jin.split('",')[0]
                  var boardid3_jin = doc3_jin.split('boardId":"')[1]
                  boardid3_jin = boardid3_jin.split('",')[0]
                  var gm_nick3_jin = doc3_jin.split('nickname":"')[1]
                  gm_nick3_jin = gm_nick3_jin.split('",')[0]
				              var url3_jin = "https://forum.nexon.com/maplestorym/board_view?board="+boardid3_jin+"&thread="+threadid3_jin
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title3_jin+"\n\n[🍌]작성자 : "+gm_nick3_jin+"\n[🍌]바나나칩 먹고 싶당\n\n"+url3_jin);
                  java.lang.Thread.sleep(1000)
                }
              } //이벤트
              if(title4_jin != read_me4_jin){
		              var iscash_jin =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title4_jin.includes(filter_keywords[a])){
                    iscash_jin =1;
                  }
                }
			             if(iscash_jin ==0){
                  save("/메이플m/","/진힐라연습방/"+ "판매상품".trim() + ".txt", title4_jin);
                  var threadid4_jin = doc4_jin.split('threadId":"')[1]
                  threadid4_jin = threadid4_jin.split('",')[0]
                  var boardid4_jin = doc4_jin.split('boardId":"')[1]
                  boardid4_jin = boardid4_jin.split('",')[0]
                  var gm_nick4_jin = doc4_jin.split('nickname":"')[1]
                  gm_nick4_jin = gm_nick4_jin.split('",')[0]
				              var url4_jin = "https://forum.nexon.com/maplestorym/board_view?board="+boardid4_jin+"&thread="+threadid4_jin
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title4_jin+"\n\n[🥝]작성자 : "+gm_nick4_jin+"\n[🥝]키위칩 먹고 싶당\n\n"+url4_jin);
                  java.lang.Thread.sleep(1000)
                }
              } //판매상품
              if(title5_jin != read_me5_jin){
		              var iscash_jin =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title5_jin.includes(filter_keywords[a])){
                    iscash_jin =1;
                  }
                }
                if(title5_jin.indexOf("업데이트")!=-1){
			               if(iscash_jin ==0){
                    save("/메이플m/","/진힐라연습방/"+ "gm소식".trim() + ".txt", title5_jin);
                    var threadid5_jin = doc5_jin.split('threadId":"')[1]
                    threadid5_jin = threadid5_jin.split('",')[0]
                    var boardid5_jin = doc5_jin.split('boardId":"')[1]
                    boardid5_jin = boardid5_jin.split('",')[0]
                    var gm_nick5_jin = doc5_jin.split('nickname":"')[1]
                    gm_nick5_jin = gm_nick5_jin.split('",')[0]
				                var url5_jin = "https://forum.nexon.com/maplestorym/board_view?board="+boardid5_jin+"&thread="+threadid5_jin
				                replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title5_jin+"\n\n[🍓]작성자 : "+gm_nick5_jin+"\n[🍓]딸기칩 먹고 싶당\n\n"+url5_jin);
                    java.lang.Thread.sleep(1000)
                  }
                }
              } //gm소식
              java.lang.Thread.sleep(30000)
              if(starton_jin == false){
                break
              }
            }
          }
        }else{
          replier.reply("뜡부 불러와요!! ㅇ ㅅㅇ🐰")
          return
        } 
      }
      
      //공지종료
      if(msg == "!공지종료" || msg == "!공지중지"){
        if(sender.indexOf("뜡부")!=-1){
          if(starton_jin == false){
            replier.reply("이미 종료됐는데요? ㅇ ㅅㅇ🐰")
            return
          }else{
            starton_jin = false
            replier.reply("공지 종료합니다! 🐰")
            return
          }
        }else{
          replier.reply("뜡부 불러와요!! ㅇ ㅅㅇ🐰")
          return
        }
      }
    }catch(e){ 
  }
}

  if(room ==="[아칸] 연습 트라이방"){
    try{
      
      //공지시작
      if(msg == "!공지시작"){
        if(sender.indexOf("뜡부")!=-1){
          if(starton_a == true){
            replier.reply("이미 공지 진행중이에요! 🐰")
            return
          }else{
            starton_a = true
            replier.reply("공지 시작합니다! 🐰")
            //자동공지 아칸
            while(starton_a){
              var doc_a = Utils.getWebText("https://forum.nexon.com/api/v1/board/1211/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1677578987860")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc2_a = Utils.getWebText("https://forum.nexon.com/api/v1/board/1215/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687836980278")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc3_a = Utils.getWebText("https://forum.nexon.com/api/v1/board/1378/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837267269")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc4_a = Utils.getWebText("https://forum.nexon.com/api/v1/board/1217/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837232543")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc5_a = Utils.getWebText("https://forum.nexon.com/api/v1/board/1216/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837128112")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
   
              //공지사항  
              var title_a = doc_a.split('title":"')[1]
              title_a = title_a.split('"')[0]
              var read_me_a = read("/메이플m/","/아칸연습방/"+"공지.txt")
    
              //패치노트
              var title2_a = doc2_a.split('title":"')[1]
              title2_a = title2_a.split('"')[0]
              var read_me2_a = read("/메이플m/","/아칸연습방/"+"패치노트.txt")
  
              //이벤트
              var title3_a = doc3_a.split('title":"')[1]
              title3_a = title3_a.split('"')[0]
              var read_me3_a = read("/메이플m/","/아칸연습방/"+ "이벤트.txt")
  
              //판매상품
              var title4_a = doc4_a.split('title":"')[1]
              title4_a = title4_a.split('"')[0]
              var read_me4_a = read("/메이플m/","/아칸연습방/"+ "판매상품.txt")
  
              //Gm소식
              var title5_a = doc5_a.split('title":"')[1]
              title5_a = title5_a.split('"')[0]
              var read_me5_a = read("/메이플m/","/아칸연습방/"+ "gm소식.txt") 
  
              if(title_a != read_me_a){
		              var iscash_a = 0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title_a.includes(filter_keywords[a])){
                    iscash_a = 1;
                  }
                }
			             if(iscash_a == 0){
                  save("/메이플m/","/아칸연습방/"+"공지".trim() + ".txt", title_a);
                  var threadid_a = doc_a.split('threadId":"')[1]
                  threadid_a = threadid_a.split('",')[0]
                  var boardid_a = doc_a.split('boardId":"')[1]
                  boardid_a = boardid_a.split('",')[0]
                  var gm_nick_a = doc_a.split('nickname":"')[1]
                  gm_nick_a = gm_nick_a.split('",')[0]
				              var url_a = "https://forum.nexon.com/maplestorym/board_view?board="+boardid_a+"&thread="+threadid_a
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title_a+"\n\n[🥕]작성자 : "+gm_nick_a+"\n[🥕]당근칩 먹고 싶당\n\n"+url_a);
                  java.lang.Thread.sleep(1000)
                }
              } //공지사항
              if(title2_a != read_me2_a){
		              var iscash_a =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title2_a.includes(filter_keywords[a])){
                    iscash_a =1;
                  }
                }
			             if(iscash_a ==0){
                  save("/메이플m/","/아칸연습방/"+ "패치노트".trim() + ".txt", title2_a);
                  var threadid2_a = doc2_a.split('threadId":"')[1]
                  threadid2_a = threadid2_a.split('",')[0]
                  var boardid2_a = doc2_a.split('boardId":"')[1]
                  boardid2_a = boardid2_a.split('",')[0]
                  var gm_nick2_a = doc2_a.split('nickname":"')[1]
                  gm_nick2_a = gm_nick2_a.split('",')[0]
				              var url2_a = "https://forum.nexon.com/maplestorym/board_view?board="+boardid2_a+"&thread="+threadid2_a
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title2_a+"\n\n[🍎]작성자 : "+gm_nick2_a+"\n[🍎]사과칩 먹고 싶당\n\n"+url2_a);
                  java.lang.Thread.sleep(1000)
                }
              } //패치노트
              if(title3_a != read_me3_a){
		              var iscash_a =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title3_a.includes(filter_keywords[a])){
                    iscash_a =1;
                  }
                }
			             if(iscash_a ==0){
                  save("/메이플m/","/아칸연습방/"+"이벤트".trim() + ".txt", title3_a);
                  var threadid3_a = doc3_a.split('threadId":"')[1]
                  threadid3_a = threadid3_a.split('",')[0]
                  var boardid3_a = doc3_a.split('boardId":"')[1]
                  boardid3_a = boardid3_a.split('",')[0]
                  var gm_nick3_a = doc3_a.split('nickname":"')[1]
                  gm_nick3_a = gm_nick3_a.split('",')[0]
				              var url3_a = "https://forum.nexon.com/maplestorym/board_view?board="+boardid3_a+"&thread="+threadid3_a
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title3_a+"\n\n[🍌]작성자 : "+gm_nick3_a+"\n[🍌]바나나칩 먹고 싶당\n\n"+url3_a);
                  java.lang.Thread.sleep(1000)
                }
              } //이벤트
              if(title4_a != read_me4_a){
		              var iscash_a =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title4_a.includes(filter_keywords[a])){
                    iscash_a =1;
                  }
                }
			             if(iscash_a ==0){
                  save("/메이플m/","/아칸연습방/"+ "판매상품".trim() + ".txt", title4_a);
                  var threadid4_a = doc4_a.split('threadId":"')[1]
                  threadid4_a = threadid4_a.split('",')[0]
                  var boardid4_a = doc4_a.split('boardId":"')[1]
                  boardid4_a = boardid4_a.split('",')[0]
                  var gm_nick4_a = doc4_a.split('nickname":"')[1]
                  gm_nick4_a = gm_nick4_a.split('",')[0]
				              var url4_a = "https://forum.nexon.com/maplestorym/board_view?board="+boardid4_a+"&thread="+threadid4_a
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title4_a+"\n\n[🥝]작성자 : "+gm_nick4_a+"\n[🥝]키위칩 먹고 싶당\n\n"+url4_a);
                  java.lang.Thread.sleep(1000)
                }
              } //판매상품
              if(title5_a != read_me5_a){
		              var iscash_a =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title5_a.includes(filter_keywords[a])){
                    iscash_a =1;
                  }
                }
                if(title5_a.indexOf("업데이트")!=-1){
			               if(iscash_a ==0){
                    save("/메이플m/","/아칸연습방/"+ "gm소식".trim() + ".txt", title5_a);
                    var threadid5_a = doc5_a.split('threadId":"')[1]
                    threadid5_a = threadid5_a.split('",')[0]
                    var boardid5_a = doc5_a.split('boardId":"')[1]
                    boardid5_a = boardid5_a.split('",')[0]
                    var gm_nick5_a = doc5_a.split('nickname":"')[1]
                    gm_nick5_a = gm_nick5_a.split('",')[0]
				                var url5_a = "https://forum.nexon.com/maplestorym/board_view?board="+boardid5_a+"&thread="+threadid5_a
				                replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title5_a+"\n\n[🍓]작성자 : "+gm_nick5_a+"\n[🍓]딸기칩 먹고 싶당\n\n"+url5_a);
                    java.lang.Thread.sleep(1000)
                  }
                }
              } //gm소식
              java.lang.Thread.sleep(30000)
              if(starton_a == false){
                break
              }
            }
          }
        }else{
          replier.reply("뜡부 불러와요!! ㅇ ㅅㅇ🐰")
          return
        } 
      }
      
      //공지종료
      if(msg == "!공지종료" || msg == "!공지중지"){
        if(sender.indexOf("뜡부")!=-1){
          if(starton_a == false){
            replier.reply("이미 종료됐는데요? ㅇ ㅅㅇ🐰")
            return
          }else{
            starton_a = false
            replier.reply("공지 종료합니다! 🐰")
            return
          }
        }else{
          replier.reply("뜡부 불러와요!! ㅇ ㅅㅇ🐰")
          return
        }
      }
    }catch(e){ 
  }
}
  
  if(room ==="헤네시스 보스방"){
    try{
      
      //공지시작
      if(msg == "!공지시작"){
        if(sender.indexOf("뜡부")!=-1){
          if(starton_he == true){
            replier.reply("이미 공지 진행중이에요! 🐰")
            return
          }else{
            starton_he = true
            replier.reply("공지 시작합니다! 🐰")
            //자동공지 헤네시스
            while(starton_he){
              var doc_he = Utils.getWebText("https://forum.nexon.com/api/v1/board/1211/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1677578987860")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc2_he = Utils.getWebText("https://forum.nexon.com/api/v1/board/1215/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687836980278")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc3_he = Utils.getWebText("https://forum.nexon.com/api/v1/board/1378/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837267269")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc4_he = Utils.getWebText("https://forum.nexon.com/api/v1/board/1217/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837232543")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc5_he = Utils.getWebText("https://forum.nexon.com/api/v1/board/1216/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837128112")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
   
              //공지사항  
              var title_he = doc_he.split('title":"')[1]
              title_he = title_he.split('"')[0]
              var read_me_he = read("/메이플m/","/헤네시스방/"+"공지.txt")
    
              //패치노트
              var title2_he = doc2_he.split('title":"')[1]
              title2_he = title2_he.split('"')[0]
              var read_me2_he = read("/메이플m/","/헤네시스방/"+"패치노트.txt")
  
              //이벤트
              var title3_he = doc3_he.split('title":"')[1]
              title3_he = title3_he.split('"')[0]
              var read_me3_he = read("/메이플m/","/헤네시스방/"+ "이벤트.txt")
  
              //판매상품
              var title4_he = doc4_he.split('title":"')[1]
              title4_he = title4_he.split('"')[0]
              var read_me4_he = read("/메이플m/","/헤네시스방/"+ "판매상품.txt")
  
              //Gm소식
              var title5_he = doc5_he.split('title":"')[1]
              title5_he = title5_he.split('"')[0]
              var read_me5_he = read("/메이플m/","/헤네시스방/"+ "gm소식.txt") 
  
              if(title_he != read_me_he){
		              var iscash_he = 0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title_he.includes(filter_keywords[a])){
                    iscash_he = 1;
                  }
                }
			             if(iscash_he == 0){
                  save("/메이플m/","/헤네시스방/"+"공지".trim() + ".txt", title_he);
                  var threadid_he = doc_he.split('threadId":"')[1]
                  threadid_he = threadid_he.split('",')[0]
                  var boardid_he = doc_he.split('boardId":"')[1]
                  boardid_he = boardid_he.split('",')[0]
                  var gm_nick_he = doc_he.split('nickname":"')[1]
                  gm_nick_he = gm_nick_he.split('",')[0]
				              var url_he = "https://forum.nexon.com/maplestorym/board_view?board="+boardid_he+"&thread="+threadid_he
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title_he+"\n\n[🥕]작성자 : "+gm_nick_he+"\n[🥕]당근칩 먹고 싶당\n\n"+url_he);
                  java.lang.Thread.sleep(1000)
                }
              } //공지사항
              if(title2_he != read_me2_he){
		              var iscash_he =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title2_he.includes(filter_keywords[a])){
                    iscash_he =1;
                  }
                }
			             if(iscash_he ==0){
                  save("/메이플m/","/헤네시스방/"+ "패치노트".trim() + ".txt", title2_he);
                  var threadid2_he = doc2_he.split('threadId":"')[1]
                  threadid2_he = threadid2_he.split('",')[0]
                  var boardid2_he = doc2_he.split('boardId":"')[1]
                  boardid2_he = boardid2_he.split('",')[0]
                  var gm_nick2_he = doc2_he.split('nickname":"')[1]
                  gm_nick2_he = gm_nick2_he.split('",')[0]
				              var url2_he = "https://forum.nexon.com/maplestorym/board_view?board="+boardid2_he+"&thread="+threadid2_he
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title2_he+"\n\n[🍎]작성자 : "+gm_nick2_he+"\n[🍎]사과칩 먹고 싶당\n\n"+url2_he);
                  java.lang.Thread.sleep(1000)
                }
              } //패치노트
              if(title3_he != read_me3_he){
		              var iscash_he =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title3_he.includes(filter_keywords[a])){
                    iscash_he =1;
                  }
                }
			             if(iscash_he ==0){
                  save("/메이플m/","/헤네시스방/"+"이벤트".trim() + ".txt", title3_he);
                  var threadid3_he = doc3_he.split('threadId":"')[1]
                  threadid3_he = threadid3_he.split('",')[0]
                  var boardid3_he = doc3_he.split('boardId":"')[1]
                  boardid3_he = boardid3_he.split('",')[0]
                  var gm_nick3_he = doc3_he.split('nickname":"')[1]
                  gm_nick3_he = gm_nick3_he.split('",')[0]
				              var url3_he = "https://forum.nexon.com/maplestorym/board_view?board="+boardid3_he+"&thread="+threadid3_he
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title3_he+"\n\n[🍌]작성자 : "+gm_nick3_he+"\n[🍌]바나나칩 먹고 싶당\n\n"+url3_he);
                  java.lang.Thread.sleep(1000)
                }
              } //이벤트
              if(title4_he != read_me4_he){
		              var iscash_he =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title4_he.includes(filter_keywords[a])){
                    iscash_he =1;
                  }
                }
			             if(iscash_he ==0){
                  save("/메이플m/","/헤네시스방/"+ "판매상품".trim() + ".txt", title4_he);
                  var threadid4_he = doc4_he.split('threadId":"')[1]
                  threadid4_he = threadid4_he.split('",')[0]
                  var boardid4_he = doc4_he.split('boardId":"')[1]
                  boardid4_he = boardid4_he.split('",')[0]
                  var gm_nick4_he = doc4_he.split('nickname":"')[1]
                  gm_nick4_he = gm_nick4_he.split('",')[0]
				              var url4_he = "https://forum.nexon.com/maplestorym/board_view?board="+boardid4_he+"&thread="+threadid4_he
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title4_he+"\n\n[🥝]작성자 : "+gm_nick4_he+"\n[🥝]키위칩 먹고 싶당\n\n"+url4_he);
                  java.lang.Thread.sleep(1000)
                }
              } //판매상품
              if(title5_he != read_me5_he){
		              var iscash_he =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title5_he.includes(filter_keywords[a])){
                    iscash_he =1;
                  }
                }
                if(title5_he.indexOf("업데이트")!=-1){
			               if(iscash_he ==0){
                    save("/메이플m/","/헤네시스방/"+ "gm소식".trim() + ".txt", title5_he);
                    var threadid5_he = doc5_he.split('threadId":"')[1]
                    threadid5_he = threadid5_he.split('",')[0]
                    var boardid5_he = doc5_he.split('boardId":"')[1]
                    boardid5_he = boardid5_he.split('",')[0]
                    var gm_nick5_he = doc5_he.split('nickname":"')[1]
                    gm_nick5_he = gm_nick5_he.split('",')[0]
				                var url5_he = "https://forum.nexon.com/maplestorym/board_view?board="+boardid5_he+"&thread="+threadid5_he
				                replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title5_he+"\n\n[🍓]작성자 : "+gm_nick5_he+"\n[🍓]딸기칩 먹고 싶당\n\n"+url5_he);
                    java.lang.Thread.sleep(1000)
                  }
                }
              } //gm소식
              java.lang.Thread.sleep(30000)
              if(starton_he == false){
                break
              }
            }
          }
        }else{
          replier.reply("뜡부 불러와요!! ㅇ ㅅㅇ🐰")
          return
        } 
      }
      
      //공지종료
      if(msg == "!공지종료" || msg == "!공지중지"){
        if(sender.indexOf("뜡부")!=-1){
          if(starton_he == false){
            replier.reply("이미 종료됐는데요? ㅇ ㅅㅇ🐰")
            return
          }else{
            starton_he = false
            replier.reply("공지 종료합니다! 🐰")
            return
          }
        }else{
          replier.reply("뜡부 불러와요!! ㅇ ㅅㅇ🐰")
          return
        }
      }
    }catch(e){ 
  }
}

  if(room ==="[카루시,카윌] 연습 트라이방"){
    try{
      
      //공지시작
      if(msg == "!공지시작"){
        if(sender.indexOf("뜡부")!=-1){
          if(starton_cr == true){
            replier.reply("이미 공지 진행중이에요! 🐰")
            return
          }else{
            starton_cr = true
            replier.reply("공지 시작합니다! 🐰")
            //자동공지 카룻카윌
            while(starton_cr){
              var doc_cr = Utils.getWebText("https://forum.nexon.com/api/v1/board/1211/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1677578987860")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc2_cr = Utils.getWebText("https://forum.nexon.com/api/v1/board/1215/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687836980278")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc3_cr = Utils.getWebText("https://forum.nexon.com/api/v1/board/1378/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837267269")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc4_cr = Utils.getWebText("https://forum.nexon.com/api/v1/board/1217/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837232543")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
              var doc5_cr = Utils.getWebText("https://forum.nexon.com/api/v1/board/1216/threads?alias=maplestorym&pageNo=1&paginationType=PAGING&pageSize=15&blockSize=5&_=1687837128112")
                .replace(/<([^>]+)>/g, "") //html 태그 제거
                .trim()
   
              //공지사항  
              var title_cr = doc_cr.split('title":"')[1]
              title_cr = title_cr.split('"')[0]
              var read_me_cr = read("/메이플m/","/카룻카윌연습방/"+"공지.txt")
    
              //패치노트
              var title2_cr = doc2_cr.split('title":"')[1]
              title2_cr = title2_cr.split('"')[0]
              var read_me2_cr = read("/메이플m/","/카룻카윌연습방/"+"패치노트.txt")
  
              //이벤트
              var title3_cr = doc3_cr.split('title":"')[1]
              title3_cr = title3_cr.split('"')[0]
              var read_me3_cr = read("/메이플m/","/카룻카윌연습방/"+ "이벤트.txt")
  
              //판매상품
              var title4_cr = doc4_cr.split('title":"')[1]
              title4_cr = title4_cr.split('"')[0]
              var read_me4_cr = read("/메이플m/","/카룻카윌연습방/"+ "판매상품.txt")
  
              //Gm소식
              var title5_cr = doc5_cr.split('title":"')[1]
              title5_cr = title5_cr.split('"')[0]
              var read_me5_cr = read("/메이플m/","/카룻카윌연습방/"+ "gm소식.txt") 
  
              if(title_cr != read_me_cr){
		              var iscash_cr = 0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title_cr.includes(filter_keywords[a])){
                    iscash_cr = 1;
                  }
                }
			             if(iscash_cr == 0){
                  save("/메이플m/","/카룻카윌연습방/"+"공지".trim() + ".txt", title_cr);
                  var threadid_cr = doc_cr.split('threadId":"')[1]
                  threadid_cr = threadid_cr.split('",')[0]
                  var boardid_cr = doc_cr.split('boardId":"')[1]
                  boardid_cr = boardid_cr.split('",')[0]
                  var gm_nick_cr = doc_cr.split('nickname":"')[1]
                  gm_nick_cr = gm_nick_cr.split('",')[0]
				              var url_cr = "https://forum.nexon.com/maplestorym/board_view?board="+boardid_cr+"&thread="+threadid_cr
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title_cr+"\n\n[🥕]작성자 : "+gm_nick_cr+"\n[🥕]당근칩 먹고 싶당\n\n"+url_cr);
                  java.lang.Thread.sleep(1000)
                }
              } //공지사항
              if(title2_cr != read_me2_cr){
		              var iscash_cr =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title2_cr.includes(filter_keywords[a])){
                    iscash_cr =1;
                  }
                }
			             if(iscash_cr ==0){
                  save("/메이플m/","/카룻카윌연습방/"+ "패치노트".trim() + ".txt", title2_cr);
                  var threadid2_cr = doc2_cr.split('threadId":"')[1]
                  threadid2_cr = threadid2_cr.split('",')[0]
                  var boardid2_cr = doc2_cr.split('boardId":"')[1]
                  boardid2_cr = boardid2_cr.split('",')[0]
                  var gm_nick2_cr = doc2_cr.split('nickname":"')[1]
                  gm_nick2_cr = gm_nick2_cr.split('",')[0]
				              var url2_cr = "https://forum.nexon.com/maplestorym/board_view?board="+boardid2_cr+"&thread="+threadid2_cr
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title2_cr+"\n\n[🍎]작성자 : "+gm_nick2_cr+"\n[🍎]사과칩 먹고 싶당\n\n"+url2_cr);
                  java.lang.Thread.sleep(1000)
                }
              } //패치노트
              if(title3_cr != read_me3_cr){
		              var iscash_cr =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title3_cr.includes(filter_keywords[a])){
                    iscash_cr =1;
                  }
                }
			             if(iscash_cr ==0){
                  save("/메이플m/","/카룻카윌연습방/"+"이벤트".trim() + ".txt", title3_cr);
                  var threadid3_cr = doc3_cr.split('threadId":"')[1]
                  threadid3_cr = threadid3_cr.split('",')[0]
                  var boardid3_cr = doc3_cr.split('boardId":"')[1]
                  boardid3_cr = boardid3_cr.split('",')[0]
                  var gm_nick3_cr = doc3_cr.split('nickname":"')[1]
                  gm_nick3_cr = gm_nick3_cr.split('",')[0]
				              var url3_cr = "https://forum.nexon.com/maplestorym/board_view?board="+boardid3_cr+"&thread="+threadid3_cr
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title3_cr+"\n\n[🍌]작성자 : "+gm_nick3_cr+"\n[🍌]바나나칩 먹고 싶당\n\n"+url3_cr);
                  java.lang.Thread.sleep(1000)
                }
              } //이벤트
              if(title4_cr != read_me4_cr){
		              var iscash_cr =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title4_cr.includes(filter_keywords[a])){
                    iscash_cr =1;
                  }
                }
			             if(iscash_cr ==0){
                  save("/메이플m/","/카룻카윌연습방/"+ "판매상품".trim() + ".txt", title4_cr);
                  var threadid4_cr = doc4_cr.split('threadId":"')[1]
                  threadid4_cr = threadid4_cr.split('",')[0]
                  var boardid4_cr = doc4_cr.split('boardId":"')[1]
                  boardid4_cr = boardid4_cr.split('",')[0]
                  var gm_nick4_cr = doc4_cr.split('nickname":"')[1]
                  gm_nick4_cr = gm_nick4_cr.split('",')[0]
				              var url4_cr = "https://forum.nexon.com/maplestorym/board_view?board="+boardid4_cr+"&thread="+threadid4_cr
				              replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title4_cr+"\n\n[🥝]작성자 : "+gm_nick4_cr+"\n[🥝]키위칩 먹고 싶당\n\n"+url4_cr);
                  java.lang.Thread.sleep(1000)
                }
              } //판매상품
              if(title5_cr != read_me5_cr){
		              var iscash_cr =0;
		              for(var a=0;a<filter_keywords.length;a++){
			               if(title5_cr.includes(filter_keywords[a])){
                    iscash_cr =1;
                  }
                }
                if(title5_cr.indexOf("업데이트")!=-1){
			               if(iscash_cr ==0){
                    save("/메이플m/","/카룻카윌연습방/"+ "gm소식".trim() + ".txt", title5_cr);
                    var threadid5_cr = doc5_cr.split('threadId":"')[1]
                    threadid5_cr = threadid5_cr.split('",')[0]
                    var boardid5_cr = doc5_cr.split('boardId":"')[1]
                    boardid5_cr = boardid5_cr.split('",')[0]
                    var gm_nick5_cr = doc5_cr.split('nickname":"')[1]
                    gm_nick5_cr = gm_nick5_cr.split('",')[0]
				                var url5_cr = "https://forum.nexon.com/maplestorym/board_view?board="+boardid5_cr+"&thread="+threadid5_cr
				                replier.reply("🐰토니가 새로운 공지를 물어왔어요!\n\n"+title5_cr+"\n\n[🍓]작성자 : "+gm_nick5_cr+"\n[🍓]딸기칩 먹고 싶당\n\n"+url5_cr);
                    java.lang.Thread.sleep(1000)
                  }
                }
              } //gm소식
              java.lang.Thread.sleep(30000)
              if(starton_cr == false){
                break
              }
            }
          }
        }else{
          replier.reply("뜡부 불러와요!! ㅇ ㅅㅇ🐰")
          return
        } 
      }
      
      //공지종료
      if(msg == "!공지종료" || msg == "!공지중지"){
        if(sender.indexOf("뜡부")!=-1){
          if(starton_cr == false){
            replier.reply("이미 종료됐는데요? ㅇ ㅅㅇ🐰")
            return
          }else{
            starton_cr = false
            replier.reply("공지 종료합니다! 🐰")
            return
          }
        }else{
          replier.reply("뜡부 불러와요!! ㅇ ㅅㅇ🐰")
          return
        }
      }
    }catch(e){ 
  }
}

*/
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

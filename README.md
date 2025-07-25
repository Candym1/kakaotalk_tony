# KaKaoTalk Tony_MapleStoryM Boss List Control_MessengerBot R

모바일게임 메이플스토리m 의 보스 명단 관리 및 오픈카카오톡 방 관리의 자동활성화 봇 (명칭 : 토니)

## :sunny: 제작 및 서비스 기간
* 2023_12_17일 오픈카카오톡 [윌] 연습 트라이방 을 시작점으로 현재 진행형

## :wrench: 환경

* JavaScript Rhino Engine (레거시)
* Framework : Messengerbot_R (ver.0.7.29a/92)

## :pencil2: 내용

* **메이플스토리m 상위보스 통합 문의방 (https://open.kakao.com/o/gAQiFmYf)**
  
  * 멤버들의 목적에 따른 보스방 연결의 허브 역할
    
  * 25_07_10 기준 보스 목록

    1. 윌
    2. 진힐라
    3. 카오스(루시드/윌)
    4. 듄켈
    5. 검은마법사
    6. 세렌

  * 보스방 연결 외 방내 명단인원 신고, 규정위반 신고, 기타문의 등 경고방 연결 안내
---
* **메이플스토리m 상위보스 경고방**
  
  * 방내 명단인원 신고, 규정위반 신고, 기타문의와 같은 방내 이슈사항에 대해 인원관리 및 체크
    
  * 경고제 도입으로 인한 각 보스방 비매너 유저 및 트롤링 유저 관리 진행
    
    * 2차경고 이상을 받은 인원에 한해 각 보스방 또는 운영중인 전체 보스방 이용권한 해제

  * 방내 금지단어 설정 및 금지단어 작성인원 채팅로그 체크 및 출력
---
* **메이플스토리m 공지출력**

  * 메이플스토리m 공식홈페이지에 등록되는 공지내용 실시간 크롤링하여 각 보스방내에 자동출력
---
* **각 보스방 내 규정수칙 자동출력 및 보스명단 자동화 관리**
  
  * 설정된 시간 도래 시 방내 규정수칙 전체 보스방으로 자동출력
    
  * 각 보스방의 보스트라이 진행 후 삭제되지 않은 보스명단 및 에러명단 카운팅 부여 및 자동삭제
---
* **[Boss Name] 연습 트라이방**

  * 멤버들이 직접 주어진 명령어를 이용해 명단데이터 생성
    
  * 생성된 명단데이터를 활용한 멤버들의 스케쥴 관리 및 트롤링 방지를 위한 명단 기입조건 명시

  * 해당 보스방에서 생성된 명단데이터 전체조회 가능

    * 명령어 전체명단, 명단을 통한 명단데이터 전체조회 기능

    * 명령어 !위치 닉네임, !파티찾기 요일 과 같이 명단데이터 내 검색 기능

      1. !위치 닉네임 : 본인이 기입한 명단 확인
     
      2. !파티찾기 요일 : 명단데이터 내 스케쥴데이터를 조회하여 원하는 요일의 명단 확인
---
### :paperclip: 서브내용

* GPT API, Google Gemini 를 통한 기본적 AI 기능 구현

* 운영진 확성기를 통한 전체방 일괄 공지 및 내용 전달

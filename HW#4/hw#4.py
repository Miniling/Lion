from cgitb import html
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
import smtplib

header = {
    'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39'
}

# 크롤링 페이지 주소
url = 'https://movie.naver.com/movie/sdb/rank/rmovie.naver?sel=cnt&date=20220523'

response = requests.get(url, headers=header)
soup = BeautifulSoup(response.text, 'html.parser')

# html 파일 생성
html_file = open("Movies.html", "w", encoding='utf8')
html_file.write(response.text)
html_file.close()

rank = 1

results = soup.select(
    '#old_content > table > tbody > tr > td.title > div > a')

search_rank_file = open("rankresult.txt", "w")

print(datetime.today().strftime("%Y년 %m월 %d일의 실시간 영화 랭킹입니다.\n"))

for result in results:
    search_rank_file.write(str(rank) + "위:" + result.get_text() + "\n")
    print(rank, "위: ", result.get_text(), "\n")
    rank = rank + 1
    if rank > 20:
        break

search_rank_file.close()

# 로그인
s = smtplib.SMTP('smtp.gmail.com', 587)

# TLS
s.starttls()

s.login('bsm980310@gmail.com', 'edxkioubiaxilqcc')

# 메일 기본 정보 설정
msg = MIMEMultipart()
msg["Subject"] = f"크롤링해서 메일보내기[백승민]"
msg["From"] = "bsm980310@gmail.com"
msg["To"] = "bsm3925@likelion.org"

# 메일 내용 쓰기
content = "오늘의 영화 랭킹입니다!"
content_part = MIMEText(content, "plain")
msg.attach(content_part)

# 데이터 파일 첨부하기
file_name = "rankresult.txt"
with open(file_name, 'rb') as txt_file:
    attachment = MIMEApplication(txt_file.read())
    # 첨부파일의 정보를 헤더로 추가
    attachment.add_header('Content-Disposition',
                          'attachment', filename=file_name)
    msg.attach(attachment)

# 메일 보내고 서버 끄기
s.sendmail(msg["From"], msg["To"], msg.as_string())

print("전송 완료.")

s.quit()

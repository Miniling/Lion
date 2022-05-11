from distutils.command.build import build
import random
import time
from turtle import up


Map = []

dic = {"맵 크기": "", "폭탄 개수": ""}

for k in dic.keys():
    print(k, end="")
    dic[k] = int(input(" : "))

size = dic["맵 크기"]
bumbs = dic["폭탄 개수"]
print(dic)


def moveDir(userPos, user):
    y = userPos["y"]
    x = userPos["x"]
    if user == 1:   # 위
        tmp = Map[y][x]
        Map[y][x] = Map[y-1][x]
        Map[y-1][x] = tmp
        userPos["y"] = y-1
    elif user == 2:  # 아래
        tmp = Map[y][x]
        Map[y][x] = Map[y+1][x]
        Map[y+1][x] = tmp
        userPos["y"] = y+1
    elif user == 3:  # 오른쪽
        tmp = Map[y][x]
        Map[y][x] = Map[y][x+1]
        Map[y][x+1] = tmp
        userPos["x"] = x+1
    else:           # 왼쪽
        tmp = Map[y][x]
        Map[y][x] = Map[y][x-1]
        Map[y][x-1] = tmp
        userPos["x"] = x-1


def makeMap(size, bumbs):
    for i in range(int(size)):
        line = []
        for j in range(int(size)):
            line.append(0)
        Map.append(line)

    bumbidx = random.sample(range(1, size*size), bumbs+1)

    for i in range(len(bumbidx)):
        y, x = divmod(bumbidx[i], size)

        if(i >= bumbs):
            Map[y][x] = 3
        else:
            Map[y][x] = 2


def designMap(size):
    for i in range(int(size)):
        for j in range(int(size)):
            if Map[i][j] == 1:
                Map[i][j] = '🔳'
            elif Map[i][j] == 2:
                Map[i][j] = '🔺'
            elif Map[i][j] == 3:
                Map[i][j] = '💠'
            else:
                Map[i][j] = '⬜'
            print(Map[i][j], end='')
        print("")


def remakeMap(size):
    for i in range(int(size)):
        for j in range(int(size)):
            if Map[i][j] == '🔳':
                Map[i][j] = 1
            elif Map[i][j] == '🔺':
                Map[i][j] = 2
            elif Map[i][j] == '💠':
                Map[i][j] = 3
            else:
                Map[i][j] = 0


def startGame(size):
    Map[0][0] = 1
    userPos = {"x": 0, "y": 0}

    while True:
        designMap(size)
        print("")
        print("1. 위로 이동")
        print("2. 아래로 이동")
        print("3. 오른쪽 이동")
        print("4. 왼쪽 이동")
        print("5. 게임 종료")
        user = int(input("원하는 숫자를 입력하여 주세요 : "))
        print("")
        print("")

        y = userPos["y"]
        x = userPos["x"]

        if user == 1:       # 위
            if userPos["y"] == 0:
                print("이동 불가!")
            elif Map[y-1][x] == '🔺':
                print("!!!!!붐!!!!!")
                break
            elif Map[y-1][x] == '💠':
                print("~~~~~~~~~~게임 클리어!~~~~~~~~~~~~")
                break
            else:
                moveDir(userPos, user)
        elif user == 2:     # 아래
            if userPos["y"] == (size-1):
                print("이동 불가!")
            elif Map[y+1][x] == '🔺':
                print("!!!!!붐!!!!!")
                break
            elif Map[y+1][x] == '💠':
                print("~~~~~~~~~~게임 클리어!~~~~~~~~~~~~")
                break
            else:
                moveDir(userPos, user)
        elif user == 3:     # 오른쪽
            if userPos["x"] == (size-1):
                print("이동 불가!")
            elif Map[y][x+1] == '🔺':
                print("!!!!!붐!!!!!")
                break
            elif Map[y][x+1] == '💠':
                print("~~~~~~~~~~게임 클리어!~~~~~~~~~~~~")
                break
            else:
                moveDir(userPos, user)
        elif user == 4:     # 왼쪽
            if userPos["x"] == 0:
                print("이동 불가!")
            elif Map[y][x-1] == '🔺':
                print("!!!!!붐!!!!!")
                break
            elif Map[y][x-1] == '💠':
                print("~~~~~~~~~~게임 클리어!~~~~~~~~~~~~")
                break
            else:
                moveDir(userPos, user)
        elif user == 5:
            break
        else:
            print("잘못된 입력입니다.")

        remakeMap(size)


makeMap(size, bumbs)
print("===============게임을 시작합니다.====================")
startGame(size)
print("===============게임을 종료합니다.====================")

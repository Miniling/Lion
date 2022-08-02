// // 문제10
// var input = prompt("입력")
// let cnt = input
// console.log("입력 : ${input}")
// console.log("출력")
// for (var i = 0; i < input; i++) {
//     console.log(" ".repeat(cnt - 1) + "*".repeat(2 * i + 1) + " ".repeat(cnt - 1))
//     cnt--;
// }


// // 문제42
// var a = prompt("월")
// var b = prompt("일")

// const dateIs = (a, b) => {
//     let day = new Date(2022, a - 1, b).toString();
//     day = day.slice(0, 3)

//     return day
// }

// console.log(`2022년 ${a}월 ${b}일은 ${dateIs(a, b)}입니다.`)


// // 문제44
// let num = prompt("양의 정수 입력")
// let ans = 0
// console.log(`입력: ${num}`)
// for (var i = 0; i < num.length; i++) {
//     let tmp = num.slice(i, i + 1)
//     ans += parseInt(tmp)
// }
// console.log(`출력: ${ans}`)


// // 문제57
// let cnt = 0;

// const count = (dev, num) => {
//     let len = toString(dev).length
//     for (var i = 0; i < len; i++) {
//         if (parseInt(num / dev) == "1") cnt++
//         num = num % dev
//         dev = dev / 10
//     }
// }

// for (var i = 0; i <= 1000; i++) {
//     let num = i;

//     if (i < 10) {
//         if (i == "1") cnt++
//     }
//     else if (i < 100) {
//         count(10, num)
//     }
//     else if (i < 1000) {
//         count(100, num)
//     }
//     else if (i < 10000) {
//         count(1000, num)
//     }
// }
// console.log(cnt)


// // 문제54
// let stamp = prompt("스탬프")
// let ans = true
// console.log(`입력: ${stamp}`)
// stamp = stamp.replace(/(\s*)/g, "");

// const array = []
// for (var i = 0; i < stamp.length; i++) {
//     array.push(stamp.slice(i, i + 1))
//     if ((array.length > 1) && (array[i] - 1 != array[i - 1])) {
//         ans = false;
//     }

// }
// ans = ans ? "Yes" : "NO"
// console.log(`출력: ${ans}`)


// // 문제58
// let money = prompt("정산 금액")
// const pos = []
// for (var i = 3; i < money.length; i += 3) {
//     pos.push(money.length - i)
// }

// for (var i = 0; i < pos.length; i++) {
//     money = [money.slice(0, pos[i]), ",", money.slice(pos[i])].join("");
// }
// console.log(money)


// // 문제59
// let lenMax = 50
// let text = prompt("문자열")
// let result = ''

// console.log(`입력: ${text}`)

// if (text.length > lenMax) console.log("제한 초과!!!")
// else {
//     let start = parseInt(lenMax / 2) - parseInt((text.length) / 2)
//     for (var i = 0; i < start; i++) {
//         result = result.concat('=')
//     }
//     result = result.concat(text)
//     for (var i = result.length; i < lenMax; i++) {
//         result = result.concat('=')
//     }
// }
// console.log(`출력:\n${result}`)


// // 문제60
// const students = ['강은지', '김유정', '박현서', '최성훈', '홍유진', '박지호', '권윤일',
//     '김채리', '한지호', '김진이', '김민호', '강채연']
// console.log(`데이터\n${students}`)

// students.sort()
// console.log("출력")
// for (var i = 0; i < students.length; i++) {
//     console.log(`번호: ${i + 1}, 이름: ${students[i]}`)
// }


// // 문제61
// let str = prompt("입력")
// let ans = ""
// console.log(`입력\n${str}`)

// let cnt = 1;
// for (var i = 0; i < str.length; i++) {
//     if (str[i] == str[i + 1]) cnt++
//     else {
//         ans = ans.concat(str[i], cnt)
//         cnt = 1;
//     }
// }
// console.log(`출력\n${ans}`)


// // 문제63
// let str = prompt("입력")
// console.log(`입력\n${str}`)

// const pos = []
// let idx = str.indexOf(" ")
// while (idx != -1) {
//     pos.push(idx)
//     idx = str.indexOf(" ", idx + 1)
// }

// let ans = str[0]
// for (var i = 0; i < pos.length; i++) {
//     ans = ans.concat(str[pos[i] + 1])
// }
// console.log(`출력\n${ans}`)
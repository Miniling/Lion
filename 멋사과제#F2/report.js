const numbers = [1,1,1,2,2,3,3,3,3,9,3,4,4,5,5,5,6,9,6,7,7,7,8,8,9,9]
const newNumbers = [];

// 과제 1번
// numbers 배열을 기본 반복문 (for,while)을 통해 중복인 숫자를 제거하여 새로운 배열로 만들기 ! 
// ( 제한 : 내장 함수 사용 금지 ! )

for(var i=0; i<numbers.length; i++) {
	if(!(newNumbers.includes(numbers[i])))
        newNumbers.push(numbers[i])
}
console.log(newNumbers)


// --------------------------------------------------------------------

// 과제 2번
// numbers 배열을 기본 반복문 (for,while)을 통해 숫자 9의 개수가 몇 개인지 출력하기 ! 
// ( 제한 : 내장 함수 사용 금지 ! )

let count = 0
for(var i=0; i<numbers.length; i++) {
    if(numbers[i] == 9)
        count++
}
console.log(count)


// --------------------------------------------------------------------

// 과제 3번
// Math.random( ), Math.floor( 값 )함수를 이용하여 중복없는 숫자 10개를 새로운 배열 만들기 !
// : Math.random( )은 0.0~0.999...의 수를 램덤으로 하나 부여하는 함수 !
// : Math.floor(  )은 (  )안에 값을 실수의 값을 넣으면 실수의 최대 정수를 반환하는 함수 !

const randArr = []

function makeNum() {
    let randNum = Math.random()
    randNum = Math.floor(randNum*100)

    return randNum
}

while(randArr.length<10) {
    let num = makeNum()
    if(!(randArr.includes(num)))
        randArr.push(num)
}
console.log(randArr)


// --------------------------------------------------------------------

const bookCafe_arr = ["아메리카노","바닐라라떼","카라멜모카","카페모카","카푸치노","카페라떼","에스프레소"];

const bookCafe_obj = [ { name : "아메리카노", price : 2200 }, { name : "바닐라라떼", price : 2600 }, { name : "카라멜모카" , price : 2700 },
		{ name : "카페모카" , price : 2700 }, { name : "카푸치노" , price : 2500 }, { name : "카페라떼" , price : 2500 },
		{ name : "에스프레소" , price : 2000 } ] 

// --------------------------------------------------------------------

// 과제 4번
// forEach 순회로 북카페 메뉴 배열 복사하기 !

const menu = []
bookCafe_arr.forEach((ele) => {menu.push(ele)});
console.log(menu)


//----------------------------------------------------------------------

// 과제 5번 
// forEach 함수로 includes 함수 구현하기 ! ( 메뉴는 _arr 배열 내 아무거나 선택 가능 ! )

let ans = false
bookCafe_arr.forEach(ele => {
    if(ele == "바닐라라떼")
		ans = true
})
console.log(ans)


//----------------------------------------------------------------------

// 과제 6번 
// findIndex 함수로 _obj의 가격이 2000인 메뉴 찾고 index를 이용하여 메뉴 이름 출력하기 !

var idx = bookCafe_obj.findIndex(ele => {
	return ele.price == 2000;
})
console.log(idx)

var imenu = bookCafe_obj.find(function(ele, index, arr){
	return index == idx
});
console.log(imenu);


//----------------------------------------------------------------------

// 과제 7번 
// filter 함수로 _obj 북카페 메뉴 2700 인 것 분류하기 !

const menu27 = []
let len = bookCafe_obj.filter((ele) => {
    if(ele.price === 2700) {
        menu27.push(ele)
    }
})
console.log(menu27)


//----------------------------------------------------------------------

// 과제 8번 
// sort 함수로 _obj 북카페 메뉴 낮은 가격 기준으로 정렬하기 !  

bookCafe_obj.sort((ele1, ele2)=> {
	el1 = ele1.price
	el2 = ele2.price

    if(el1 > el2) {
        return 1;
    }
    else if(el2 > el1) {
        return -1;
    }
    else {
        return 0;
    }
})
console.log(bookCafe_obj)


//----------------------------------------------------------------------

// 과제 9번
// sort 함수로 _obj 북카페 메뉴 이름을 사전식으로 정렬하기 !

bookCafe_obj.sort((ele1, ele2)=> {
	el1 = ele1.name
	el2 = ele2.name

    if(el1 > el2) {
        return 1;
    }
    else if(el2 > el1) {
        return -1;
    }
    else {
        return 0;
    }
})
console.log(bookCafe_obj)
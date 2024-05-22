// 이메일
function handleDomainListChange() {
    const emailDomainList = document.getElementById("email-domain-list");
    const emailSuffixInput = document.getElementById("email-suffix");

    // 요소가 존재하는지 확인
    if (emailDomainList && emailSuffixInput) {
        emailDomainList.addEventListener("change", function () {
            const selectedOption = emailDomainList.options[emailDomainList.selectedIndex].value;

            if (selectedOption !== "type") {
                emailSuffixInput.value = selectedOption;
                emailSuffixInput.placeholder = "";
            } else {
                emailSuffixInput.value = "";
                emailSuffixInput.placeholder = "직접 입력";
            }
        });
    }
}

function handlePhonePrefixChange() {
    const phonePrefix = document.getElementById("phone-prefix");
    const phoneSuffix1 = document.getElementById("phone-suffix1");
    const phoneSuffix2 = document.getElementById("phone-suffix2");

    // 요소가 존재하는지 확인
    if (phonePrefix && phoneSuffix1 && phoneSuffix2) {
        phonePrefix.addEventListener("change", function () {
            const selectedPrefix = phonePrefix.value;
            // Do something with the selected prefix, if needed
        });
    }
}

function init() {
    handleDomainListChange();
    handlePhonePrefixChange();
}

init(); // 페이지 로드 시 초기화 함수 호출


// 이전페이지로 돌아가는
document.addEventListener('DOMContentLoaded', function() {
    var backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
        //console.log("작동됨"); // 이 부분이 정상적으로 실행되지 않는다면 문제가 있을 수 있습니다.
        window.history.back();
    });
});

// 3개이상 못고르게하면서 값 출력되도록
document.addEventListener('DOMContentLoaded', function() {
    const genreLikeInput = document.querySelector("input[name='genreLike']");
    const buttons = document.querySelectorAll('.btn-staez3');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('selected')) {
                button.classList.remove('selected');
            } else {
                const selectedButtons = document.querySelectorAll('.btn-staez3.selected');
                if (selectedButtons.length < 3) {
                    button.classList.add('selected');
                }
            }
            updateInput();
        });
    });
    
    function updateInput() {
        const selectedButtons = document.querySelectorAll('.btn-staez3.selected');
        const selectedGenres = Array.from(selectedButtons).map(button => button.getAttribute('data-genre'));
        genreLikeInput.value = selectedGenres.join(' ');
    }
});

// 사용자 아이디 중복 체크
document.addEventListener('DOMContentLoaded', function() {
    const userIdInput = document.querySelector("#userId");
    const userIdCheckButton = document.getElementById("idcheckButton");
    const userIdCheckResult = document.getElementById("checkResultId");

    if (userIdInput && userIdCheckButton && userIdCheckResult) {
        userIdCheckButton.addEventListener('click', function() {
            const str = userIdInput.value;
            if (str.trim().length >= 5) {
                //console.log("아이디 전송"); // 디버깅용 콘솔 로그
                $.ajax({
                    url: "idCheck.me",
                    data: { checkId: str },
                    success: function (result) {
                        userIdCheckResult.style.display = "block";
                        if (result === "NNNNN") {
                            userIdCheckResult.style.color = "red";
                            userIdCheckResult.innerText = "이미 사용중인 아이디입니다.";
                        } else {
                            userIdCheckResult.style.color = "green";
                            userIdCheckResult.innerText = "사용가능한 아이디입니다.";
                        }
                    },
                    error: function () {
                        console.log("아이디 중복체크 ajax 실패");
                    }
                });
            } else {
                userIdCheckResult.style.display = "none";
            }
        });
    } else {
        console.log("아이디 체크 요소 중 하나가 누락되었습니다.");
    }

    // 닉네임 중복 체크
    const nicknameInput = document.querySelector("#nickname");
    const nicknameCheckButton = document.getElementById("nickNameCheckButton");
    const nicknameCheckResult = document.getElementById("checkResultNick");

    if (nicknameInput && nicknameCheckButton && nicknameCheckResult) {
        nicknameCheckButton.addEventListener('click', function() {
            const str = nicknameInput.value;
            if (str.trim().length >= 1) {
                //console.log("닉네임 전송"); // 디버깅용 콘솔 로그
                $.ajax({
                    url: "nickCheck.me",
                    data: { checkNick: str },
                    success: function (result) {
                        nicknameCheckResult.style.display = "block";
                        if (result === "NNNNN") {
                            nicknameCheckResult.style.color = "red";
                            nicknameCheckResult.innerText = "이미 사용중인 닉네임입니다.";
                        } else {
                            nicknameCheckResult.style.color = "green";
                            nicknameCheckResult.innerText = "사용가능한 닉네임입니다.";
                        }
                    },
                    error: function () {
                        console.log("닉네임 중복체크 ajax 실패");
                    }
                });
            } else {
                nicknameCheckResult.style.display = "none";
            }
        });
    } else {
        console.log("닉네임 체크 요소 중 하나가 누락되었습니다.");
    }
});

var timeout; // 전역 범위에 timeout 변수를 선언합니다.

// 비밀번호 / 비밀번호 확인이 서로 틀릴 경우를 처리하는 함수
function validatePassword() {
    clearTimeout(timeout); // 이전에 예약된 작업이 있다면 취소합니다.

    timeout = setTimeout(function() {
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;

        // 입력값이 모두 비어있으면 메시지를 숨깁니다.
        if (password1 === "" && password2 === "") {
            document.getElementById("passwordMessage").innerHTML = "";
            return;
        }

        // 비밀번호가 서로 다른 경우
        if (password1 !== password2) {
            document.getElementById("passwordMessage").innerHTML = "비밀번호가 다릅니다.";
            document.getElementById("passwordMessage").classList.remove("passwordCorrect");
            document.getElementById("passwordMessage").classList.add("passwordIncorrect");
            
            // 비밀번호가 다를 경우 입력값을 모두 지웁니다.
            document.getElementById("password1").value = "";
            document.getElementById("password2").value = "";
        } else {
            // 비밀번호가 일치하는 경우
            document.getElementById("passwordMessage").innerHTML = "비밀번호가 일치합니다.";
            document.getElementById("passwordMessage").classList.remove("passwordIncorrect");
            document.getElementById("passwordMessage").classList.add("passwordCorrect");
        }
    }, 2000); // 2초 뒤에 실행합니다.
}

// 핸드폰 번호 전송 처리
function sendPhoneNumber() {
    // phone-prefix 요소가 존재하는지 확인
    var prefixElement = document.getElementById("phone-prefix");
    if (!prefixElement) {
        console.error("phone-prefix 요소를 찾을 수 없습니다.");
        return;
    }

    // 010 부분 가져오기
    var prefix = prefixElement.innerText;

    // 각 번호 입력란의 값 가져오기
    var suffix1 = document.getElementById("phone-suffix1").value;
    var suffix2 = document.getElementById("phone-suffix2").value;

    // 전체 번호 조합하여 표시
    var phoneNumber = prefix + suffix1 + suffix2;
    console.log(phoneNumber); // 번호 확인용, 실제 사용시 주석처리해도 됩니다.
}

// 우편번호 팝업 열기
function openPostalCodePopup() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 주소 입력란에 우편번호와 주소 채우기
            document.getElementById("addressInput").value = data.address;
        }
    }).open();
}

// 주소 확인
function checkAddress() {
    // 주소 입력란 값과 자세한 주소 값을 합침
    var address = document.getElementById("addressInput").value;
    var detailAddress = document.getElementById("detailAddressInput").value;
    var fullAddress = address + " " + detailAddress;
    
    // 합쳐진 주소를 알림으로 표시 (또는 다른 처리)
    alert("입력한 주소: " + fullAddress);
}

document.addEventListener('DOMContentLoaded', function() {
    // 이전페이지로 돌아가는
    backPage();
    // 이메일
    sgininemail();
    // 이메일 인증 전송 버튼 이벤트 리스너 등록
    const emailCheckButton = document.getElementById("emailCheckButton");
    if (emailCheckButton) {
        emailCheckButton.addEventListener('click', (ev) => {
            ev.preventDefault(); // 버튼 클릭 시 기본 동작 막기
            const nameInput = $("#input-value-id").val();
            const emailInput = $("#input-value-email").val(); // 이메일 입력값 가져오기
            document.getElementById("emailCheckButton").disabled = true;
            verifyNameAndEmail(nameInput, emailInput); // 이메일 인증 요청 보내는 함수 호출
            alert("인증번호가 전송되었습니다 잠시만 기다려주세요.");
        });
    }
    // UUID 이메일 체크
    emailSecretCode();
    // 버튼 클릭 시 색상변경
    checkButton();
    // 비밀번호 관련 이벤트 리스너 추가
    newPwd();
// 핸드폰 번호 전송 처리
    signinPhoneNumber();
    
});


// 핸드폰 번호 전송 처리
function signinPhoneNumber (){
    const prefixElement = document.getElementById("phone-prefix");
    const suffix1Element = document.getElementById("phone-suffix1");
    const suffix2Element = document.getElementById("phone-suffix2");
    const inputValueElement = document.getElementById("input-value-phone");

    function updatePhoneNumber() {
        const prefix = prefixElement.innerText;
        const suffix1 = suffix1Element.value;
        const suffix2 = suffix2Element.value;
        const phoneNumber = prefix + suffix1 + suffix2;
        inputValueElement.value = phoneNumber;
    }
    suffix1Element.addEventListener('input', updatePhoneNumber);
    suffix2Element.addEventListener('input', updatePhoneNumber);
}
// 핸드폰 번호 전송 처리
function sendPhoneNumber() {
    // input-value-phone 요소를 가져옵니다.
    var inputValueElement = document.getElementById("input-value-phone");
    if (!inputValueElement) {
        console.error("input-value-phone 요소를 찾을 수 없습니다.");
        return;
    }
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

    // input-value-phone 필드에 번호 설정
    inputValueElement.value = phoneNumber;
}

// 이전페이지로 돌아가는
function backPage() {
    var backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
        window.history.back();
    });
}

let authNo;

// 폰 인증
function phoneClick() {
    const phoneInputValue = document.getElementById("input-value-phone").value;
    var verificationPhoneTr = document.getElementById("verificationPhoneTr");
    var PverificationMessage = document.getElementById("Pverification-message");

    authNo = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    $('#phoneCheck').prop('checked', false);
    verificationPhoneTr.style.display = "table-row";

    sendPhoneAuthNoAjax({ authNo, PhoneInput: phoneInputValue }, function(res) {
        if (res === "NNNNY") {
            verificationPhoneTr.style.display = "table-row";
            PverificationMessage.style.color = "green";
            PverificationMessage.innerHTML = "인증번호가 전송되었습니다.";
            console.log('인증번호 : ' + authNo);
            console.log('전송한 휴대폰번호 : ' + phoneInputValue);

            startPTimer(); // 1분 타이머 시작
            $("#check_PhoneSecretBtn").prop('disabled', false); // 인증확인 버튼 활성화
        } else {
            verificationPhoneTr.style.display = "table-row";
            PverificationMessage.style.color = "red";
            PverificationMessage.innerHTML = "전송에 실패했습니다. 핸드폰 번호를 다시 한번 확인해주세요.";
        }
    });
}

// 폰 인증 확인
function checkAuthNum() {
    const inputCode = document.getElementById("Pverification-code").value;
    var checkResultPhoneTr = document.getElementById("checkResultPhoneTr");
    var userPhoneErrorMessage = document.getElementById("userPhoneErrorMessage");
    if (authNo !== inputCode) {
        checkResultPhoneTr.style.display = "table-row";
        userPhoneErrorMessage.style.color = "red";
        userPhoneErrorMessage.innerHTML = "인증 실패 다시 한번 확인해주세요.";
    } else {
        checkResultPhoneTr.style.display = "table-row";
        userPhoneErrorMessage.style.color = "green";
        userPhoneErrorMessage.innerHTML = "인증에 성공하였습니다";

        clearInterval(ptimer); // 타이머 정지
        $("#check_PhoneSecretBtn").prop('disabled', true); // 인증확인 버튼 비활성화
        $("#phoneCheckButton").prop('disabled', true); // 인증번호 전송 버튼 비활성화
        $("#Pverification-code").prop('readonly', true); // 인증번호 입력 필드 읽기 전용
        $('#phone-suffix1').prop('readonly', true); // 전화번호 필드 읽기 전용
        $('#phone-suffix2').prop('readonly', true); // 전화번호 필드 읽기 전용
    }
}

// 이메일 인증 코드 전송 함수
function sendVerificationCode() {
    const emailInput = document.getElementById("input-value-email").value;
    const nameInput = document.getElementById("input-value-name").value;

    if (nameInput.trim().length > 0 && emailInput.trim().length > 0) {
        verifyNameAndEmail(nameInput, emailInput); // 이름과 이메일 검증 함수 호출
    }
}

// 서버로부터의 이메일 인증 응답을 처리
function handleEmailCheckResponse(response) {
    console.log("handleEmailCheckResponse 응답: " + response); // 응답 로그 추가
    const emailCheckResult = document.getElementById("verificationEmailTr");
    emailCheckResult.style.display = "table-row";
    const verificationMessage = document.getElementById("verification-message");

    if (response === "emailCheck No") {
        document.getElementById("emailCheckButton").disabled = false;
        verificationMessage.style.color = "red";
        verificationMessage.innerText = "인증번호 전송이 실패했습니다 다시 입력해주세요!";
    } else if (response === "emailCheck Yes") {
        document.getElementById("emailCheckButton").disabled = true;
        verificationMessage.style.color = "green";
        verificationMessage.innerText = "인증번호가 성공적으로 전송되었습니다!";
        startTimer();
    } else if (response === "emailCheck Invalid") {
        document.getElementById("emailCheckButton").disabled = false;
        verificationMessage.style.color = "red";
        verificationMessage.innerText = "해당 정보가 없습니다 다시 입력해주세요!";
    }
}

// UUID 이메일 체크 콜백
function callbackEmailSecret(result, emailSecretCheckResult, check_emailSecretBtn) {
    const userEmailErrorMessage = document.getElementById("userEmailErrorMessage");
    const findEmailCheck = document.getElementById("findEmailCheck");
    const userPhoneErrorMessage = document.getElementById("userPhoneErrorMessage");
    emailSecretCheckResult.style.display = "table-row";

    if (result === "emailSecretCodeCheck No") {
        userEmailErrorMessage.style.color = "red";
        userEmailErrorMessage.innerText = "인증 코드가 일치하지 않습니다.";
    } else if (result === "emailSecretCodeCheck Yes") {
        userEmailErrorMessage.style.color = "green";
        userEmailErrorMessage.innerText = "인증이 확인되었습니다.";
        if (userPhoneErrorMessage.innerHTML === "인증에 성공하였습니다") {
            findEmailCheck.disabled = false;
        } else {
            findEmailCheck.disabled = true;
        }
    } else {
        userEmailErrorMessage.style.color = "red";
        userEmailErrorMessage.innerText = "인증을 확인할 수 없습니다.";
        findEmailCheck.disabled = true;
    }
}

// UUID 이메일 체크
function emailSecretCode() {
    const checkButton = document.getElementById("check_emailSecretBtn");
    const checkEmail = document.getElementById("input-value-email");
    const verificationCodeInput = document.getElementById("verification-code");
    const emailSecretCheckResult = document.getElementById("checkResultEmailTr");
    const emailSecretErrorMessage = document.getElementById("userEmailErrorMessage");

    checkButton.addEventListener("click", function() {
        const verificationCodeValue = verificationCodeInput.value.trim();

        if (verificationCodeValue.length === 6) {
            const emailValue = checkEmail.value;
            emailCheckCode({ "authNo": verificationCodeValue, "email": emailValue }, function(result) {
                callbackEmailSecret(result, emailSecretCheckResult, verificationCodeInput, emailSecretErrorMessage);
            });
        } else {
            emailSecretCheckResult.style.display = "table-row";
            emailSecretErrorMessage.style.color = "red";
            emailSecretErrorMessage.innerText = "인증코드는 6자리여야 합니다.";
        }
    });
}
let timer; // 전역 변수로 타이머 변수를 선언합니다.
let ptimer; 

// 핸드폰 타이머 시작 함수
function startPTimer() {
    clearInterval(ptimer); // 기존 타이머가 있으면 제거

    let duration = 3 * 60;
    const ptimerDisplay = document.getElementById('Ptimer');

    ptimer = setInterval(function() {
        const minutes = parseInt(duration / 60, 10);
        const seconds = parseInt(duration % 60, 10);

        ptimerDisplay.textContent = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
        duration--;

        if (duration < 0) {
            clearInterval(ptimer);
            ptimerDisplay.textContent = "시간 초과";

            // 시간 초과 시 인증 실패 메시지 표시
            var checkResultPhoneTr = document.getElementById("checkResultPhoneTr");
            var userPhoneErrorMessage = document.getElementById("userPhoneErrorMessage");
            checkResultPhoneTr.style.display = "table-row";
            userPhoneErrorMessage.style.color = "red";
            userPhoneErrorMessage.innerHTML = "인증 실패 다시 한번 확인해주세요.";

            //$("#check_PhoneSecretBtn").prop('disabled', true); // 인증확인 버튼 비활성화
            document.getElementById("check_PhoneSecretBtn").disabled = true;
        }
    }, 1000);
}

// "인증번호 전송" 버튼 클릭 이벤트 핸들러 등록
const phoneCheckButton = document.getElementById("phoneCheckButton");
if (phoneCheckButton) {
    phoneCheckButton.addEventListener("click", function() {
        phoneClick();
        //$("#check_PhoneSecretBtn").prop('disabled', false); // 인증확인 버튼 활성화
        document.getElementById("check_PhoneSecretBtn").disabled = false;
    });
}

// "인증확인" 버튼 클릭 이벤트 핸들러 등록
const checkPhoneSecretBtn = document.getElementById("check_PhoneSecretBtn");
if (checkPhoneSecretBtn) {
    checkPhoneSecretBtn.addEventListener("click", function() {
        checkAuthNum();
    });
}

// 카운트 다운 시작 함수
function startTimer() {
    clearInterval(timer); // 이전에 실행 중이던 타이머를 초기화합니다.

    var duration = 3 * 60;
    var timerDisplay = document.getElementById('timer');

    // 카운트 다운 시작
    timer = setInterval(function () {
        var minutes = parseInt(duration / 60, 10);
        var seconds = parseInt(duration % 60, 10);

        // 남은 시간을 표시
        timerDisplay.textContent = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);

        // 시간을 1초씩 감소
        duration--;

        // 카운트 다운이 끝나면 clearInterval을 호출하여 타이머를 멈춤
        if (duration < 0) {
            clearInterval(timer);
            timerDisplay.textContent = "시간 초과";
        }
    }, 1000);
}
// 이메일
function sgininemail() {
    // 필요한 요소들을 가져옵니다.
    const prefixElement = document.getElementById("email-prefix");
    const suffixElement = document.getElementById("email-suffix");
    const domainList = document.getElementById("email-domain-list");
    const inputValueElement = document.getElementById("input-value-email");

    // 이메일 주소를 업데이트하는 함수를 정의합니다.
    function updateEmail() {
        const prefix = prefixElement.value;
        const suffix = suffixElement.value;
        const domain = domainList.value;

        if (domain !== "type") {
            inputValueElement.value = prefix + "@" + domain;
        } else if (prefix && suffix) {
            inputValueElement.value = prefix + "@" + suffix;
        } else {
            inputValueElement.value = "";
        }
    }
    // 도메인 리스트 변경 시 처리하는 함수를 정의합니다.
    function handleDomainListChange() {
        const selectedOption = domainList.options[domainList.selectedIndex].value;

        if (selectedOption !== "type") {
            suffixElement.value = selectedOption;
            suffixElement.placeholder = "";
            suffixElement.disabled = true;
        } else {
            suffixElement.value = "";
            suffixElement.placeholder = "직접 입력";
            suffixElement.disabled = false;
        }
        updateEmail(); // 이메일 업데이트 함수를 호출하여 이메일 값을 업데이트합니다.
    }
    // 초기화 함수를 정의합니다.
    function init() {
        handleDomainListChange(); // 도메인 리스트 변경 처리 함수를 호출합니다.
        prefixElement.addEventListener('input', updateEmail); // 프리픽스 입력 시 이메일 업데이트 함수를 호출합니다.
        suffixElement.addEventListener('input', updateEmail); // 서픽스 입력 시 이메일 업데이트 함수를 호출합니다.
        domainList.addEventListener('change', handleDomainListChange); // 도메인 리스트 변경 시 처리하는 함수를 호출합니다.
    }
    init(); // 페이지 로드 시 초기화 함수를 호출합니다.
}
// 비밀번호 관련 이벤트 리스너 추가
function newPwd(){
    const newPasswordInput = document.getElementById("newPassword");
    const confirmNewPasswordInput = document.getElementById("confirmNewPassword");

    if (newPasswordInput && confirmNewPasswordInput) {
        newPasswordInput.addEventListener('input', validatePassword);
        confirmNewPasswordInput.addEventListener('input', validatePassword);
    }

    const pwdImgElement = document.getElementById("pwdImg");
    if (pwdImgElement) {
        pwdImgElement.addEventListener("mousedown", function() {
            togglePasswordVisibility(newPasswordInput, true);
        });
        pwdImgElement.addEventListener("mouseup", function() {
            togglePasswordVisibility(newPasswordInput, false);
        });
    }
}

// 비번 바꾸기 전 아이디 핸드폰 이메일 확인 맞는지
function clickIdPhoneEmail() {
    let id = document.getElementById("input-value-id").value;
    let phone = document.getElementById("input-value-phone").value;
    let email = document.getElementById("input-value-email").value;

    clickIdPhoneEmailSelect({ userId: id, phone: phone, email: email}, function(res) {
        if (res.trim() === "New Pwd Go") {
            // 모달을 보이게 함
            $('#myModal').modal('show');
        } else {
            // 모달을 숨김
            $('#myModal').modal('hide');
            alert("사용자 정보를 찾을 수 없습니다.");
        }
    });
}

// 전역 범위에 timeout 변수를 선언합니다.
var timeout;

// 비밀번호 / 비밀번호 확인이 서로 틀릴 경우를 처리하는 함수
function validatePassword() {
    clearTimeout(timeout); // 이전에 예약된 작업이 있다면 취소합니다.

    timeout = setTimeout(function() {
        var newPassword = document.getElementById("newPassword").value;
        var confirmNewPassword = document.getElementById("confirmNewPassword").value;

        // 비밀번호가 서로 다른 경우
        if (newPassword !== confirmNewPassword) {
            document.getElementById("passwordMessage").innerHTML = "비밀번호가 다릅니다.";
            document.getElementById("passwordMessage").classList.remove("passwordCorrect");
            document.getElementById("passwordMessage").classList.add("passwordIncorrect");
        } else {
            // 비밀번호가 일치하는 경우
            // 비밀번호 유효성 검사: 영문, 숫자, 특수문자 포함, 8글자 이상
            var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
            if (!regex.test(newPassword)) {
                document.getElementById("passwordMessage").innerHTML = "영문, 숫자, 특수문자를 넣어주세요";
                document.getElementById("passwordMessage").classList.remove("passwordCorrect");
                document.getElementById("passwordMessage").classList.add("passwordIncorrect");
            } else {
                document.getElementById("passwordMessage").innerHTML = "비밀번호가 일치합니다.";
                document.getElementById("passwordMessage").classList.remove("passwordIncorrect");
                document.getElementById("passwordMessage").classList.add("passwordCorrect");
            }
        }
    });
}

// 비밀번호 클릭시 보이도록 (마우스가 눌린 상태에서만)
function togglePasswordVisibility(inputField, isMouseDown) {
    if (isMouseDown && inputField.type === "password") {
        inputField.type = "text";
    } else {
        inputField.type = "password";
    }
}

// 비밀번호 변경
function clickNewPwd() {
    let newPassword = document.getElementById("newPassword").value;
    let confirmNewPassword = document.getElementById("confirmNewPassword").value;

    if (newPassword !== confirmNewPassword) {
        alert("새 비밀번호가 일치하지 않습니다.");
        return;
    }

    // 비밀번호 유효성 검사
    var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!regex.test(newPassword)) {
        alert("비밀번호는 영문, 숫자, 특수문자를 포함한 8글자 이상이어야 합니다.");
        return;
    }

    let id = document.getElementById("input-value-id").value;
    let phone = document.getElementById("input-value-phone").value;
    let email = document.getElementById("input-value-email").value;
    let userName = document.getElementById("user_name").value;

    clickNewPwdInsert({ userId: id, phone: phone, email: email,userName:userName, newPassword: newPassword }, function(res) {

        if (res.trim() === "Password Changed") {
            alert("비밀번호가 성공적으로 변경되었습니다.");
            window.location.href = "/staez/loginForm.me"; // 변경 성공 시 로그인 페이지로 이동
        } else {
            alert("비밀번호 변경에 실패했습니다.");
        }
    });
}

// 버튼 클릭 시 색상 변경
function checkButton() {
    var buttons = document.querySelectorAll(".check_button");

    // 각 버튼에 대해 반복
    buttons.forEach(function(button) {
        // 클릭 이벤트 리스너 추가
        button.addEventListener("mousedown", function() {
            // 버튼에 clicked 클래스 추가
            button.classList.add("clicked");
        });
        
        // 마우스 버튼에서 떼었을 때
        button.addEventListener("mouseup", function() {
            // 버튼에 clicked 클래스 제거
            button.classList.remove("clicked");
        });
    });
}

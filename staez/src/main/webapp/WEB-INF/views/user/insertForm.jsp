<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <!-- css -->
    <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/user/insertForm.css">
    <!-- js -->
    <script src="${contextPath}/resources/js/user/insertForm.js"></script>
    <!-- Bootstrap 4 Tutorial -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    <title>회원가입</title>
</head>
<body onload="init()">
    <header>
        <jsp:include page="/WEB-INF/views/common/header.jsp" />
    </header>
    <main>
        <div class="image-container">
            <img src="${contextPath}/resources/img/user/dlatl.png" alt="광고배너">
        </div>
        <h1 class="signin-h1">정보입력</h1>
        <hr>
        <form id="enrollForm" action="" method="post">
            <div class="insert-member">
                <table class="insert-member-table">
                    <tr>
                        <th>닉네임</th>
                        <td colspan="2"><input type="text" placeholder="8~16자" name="nickname" id="nickname"></td>
                        <td><input type="button" class="check_button" value="중복검사" ></td>
                    </tr>                  
                    <tr>
                        <th>아이디</th>
                        <td colspan="2"><input type="text" placeholder="8~16자" name="userId" id="userId"></td>
                        <td><input type="button" class="check_button" value="중복검사" ></td>
                    </tr>
                    <tr>
                        <th>비밀번호
                        </th>
                        <td colspan="2"><input type="password" placeholder="8~16자"></td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인
                        </th>
                        <td colspan="2"><input type="password"></td>
                    </tr>
                    <tr>
                        <th>휴대폰 번호</th>
                        <td colspan="6" class="email-container">
                            <div id="td-div">
                                <select class="box" id="phone-prefix">
                                    <option value="010" selected>010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="018">018</option>
                                    <option value="019">019</option>
                                </select>
                                <span id="phone-prefix-shift2">-</span>
                                <input type="text" id="phone-suffix1">
                                <span id="phone-prefix-shift2">-</span>
                                <input type="text" id="phone-suffix2">
                                <td colspan="1"><input type="button" class="check_button" value="인증번호 전송"></td>
                            </div>
                        </td>                       
                    </tr>
                    <tr>
                        <th></th>
                        <td><input type="text"></td>
                        <td><input type="button" class="check_button" value="인증확인"></td>
                    </tr>
                    <tr>
                        <th>생년월일</th>
                        <td class="email-container">
                            <div id="td-div">
                                <input type="text" id="birthday-year" placeholder="2024">
                                <span id="birthday-prefix-shift2">년</span>
                                <input type="text" id="birthday-month" placeholder="01">
                                <span id="birthday-prefix-shift2">월</span>
                                <input type="text" id="birthday-day" placeholder="01">
                                <span id="birthday-prefix-shift2">일</span>
                            </div>
                        </td>   
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td colspan="5" class="email-container">
                            <div id="td-div">
                                <input type="text" id="email-prefix">
                                <span id="email-prefix-shift2">@</span>
                                <input type="text" id="email-suffix" placeholder="직접 입력">
                            </div>
                        </td>
                        <td>
                            <select class="box" id="email-domain-list">
                                <option value="type">직접 입력</option>
                                <option value="naver.com">naver.com</option>
                                <option value="google.com">google.com</option>
                                <option value="hanmail.net">hanmail.net</option>
                                <option value="nate.com">nate.com</option>
                                <option value="kakao.com">kakao.com</option>
                            </select>
                        </td>                
                    </tr>                    
                    <tr>
                        <th>성별</th>
                        <td colspan="2">
                            <input type="checkbox" name="gender" value="남" id="man">
                            <label for="man" id="label-man">남</label>
                            <input type="checkbox" name="gender" value="여" id="female">
                            <label for="female">여</label>
                        </td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td colspan="2"><input type="text"></td>
                        <td><input type="button" class="check_button" value="우편번호"></td>
                    </tr>
                    <tr>
                        <th></th>
                        <td colspan="2"><input type="text" placeholder="자세한주소"></td>
                    </tr>
                    <tr>
                        <th>관심장르(택3)</th>
                        <td colspan="4" id="genre-buttons">
                            <button class="btn-staez3" data-genre="클래식"><h3>클래식</h3></button>
                            <button class="btn-staez3" data-genre="국악"><h3>국악</h3></button>
                            <button class="btn-staez3" data-genre="대중음악"><h3>대중음악</h3></button>
                            <button class="btn-staez3" data-genre="기타"><h3>기타</h3></button>
                            <button class="btn-staez3" data-genre="뮤지컬"><h3>뮤지컬</h3></button>
                            <button class="btn-staez3" data-genre="연극"><h3>연극</h3></button>
                            <button class="btn-staez3" data-genre="서커스/마술"><h3>서커스/마술</h3></button>
                        </td>
                    </tr>
                </table>
            </div>
        </form>
        <div class="insert-member-div">
            <button type="button" id="backButton">이전</button>
            <button type="submit">다음</button>
        </div>
    </main>
    <footer>
        <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    </footer>   
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${contextPath}/resources/css/mypage/paymentsLog.css">
<title>Insert title here</title>
</head>

<body onload="init()">
	<header>
		<jsp:include page="../common/header.jsp" />
	</header>
	<main>
        <div class="title">
            마이페이지
        </div>

        <div class="main-section">
            <div class="side">
                <div class="profile">
                    <img src="${contextPath}/resources/img/mypage/profile_img_temp.png" alt="">
                    <div id="profile-text">
                        <span>00님</span><br>
                        <span>환영합니다</span>
                    </div>
                </div>
                <div class="side-menu">
                    <div class="small-title">마이페이지</div>
                    <ul>
                        <li><a href="${contextPath}/payment.my">결제내역</a></li>
                        <li><a href="${contextPath}/save.my">찜목록</a></li>
                        <li><a href="${contextPath}/review.my">한줄평</a></li>
                    </ul>
                    <ul>
                        <li class="side-menu-title">커뮤니티 관리</li>
                        <li><a href="${contextPath}/board.my">나의 게시글</a></li>
                        <li><a href="${contextPath}/like.my">좋아요</a></li>
                    </ul>
                    <ul>
                        <li class="side-menu-title">설정</li>
                        <li><a href="${contextPath}/update.my">회원정보 변경</a></li>
                    </ul>
                    <ul>
                        <li><a href="${contextPath}/inquire.my">1:1 문의 내역</a></li>
                    </ul>
                        
                </div>
            </div>
            <div class="main-content">
                <div class="main-title">
                    <h2>결제내역</h2>
                </div>
                <table>
                    <tr class="tb-title">
                        <th colspan="2" id="concert-info">공연정보</th>
                        <th id="reserve-info">예약정보</th>
                    </tr>
                    <c:forEach var="i" begin="0" end="4">
                    <tr class="tb-content">
                        <td>
                            <img src="${contextPath}/resources/img/mypage/chicago.gif" alt="">
                        </td>
                        <td id="content">
                            <h3>꽃 별이지나</h3>
                            <h5>서경대학교 공연예술센터 스콘 1관</h5>
                            <h4>2024.04.15 (수) 15:00 (100분)</h4>
                        </td>
                        <td>
                            <h5>
                                예약번호: 22222222 <br>
                                2024.04.01 <br>
                                2매 200,000￦
                            </h5>
                        </td>
                    </tr>
                    </c:forEach>
                </table>

                <div class="page-list">
                    <div class="pagination">
                        <img src="${contextPath}/resources/img/main/before.png">
                    </div>
                    <div class="pagination current"><h4>1</h4></div>
                    <div class="pagination"><h4>2</h4></div>
                    <div class="pagination"><h4>3</h4></div>
                    <div class="pagination"><h4>4</h4></div>
                    <div class="pagination"><h4>5</h4></div>
                    <div class="pagination"><h4>6</h4></div>
                    <div class="pagination"><h4>7</h4></div>
                    <div class="pagination"><h4>8</h4></div>
                    <div class="pagination"><h4>9</h4></div>
                    <div class="pagination"><h4>10</h4></div>
                    <div class="pagination">
                        <img src="${contextPath}/resources/img/main/after.png">
                    </div>
                </div>

            </div>
        
        </div>

	</main>
	<footer>
		<jsp:include page="../common/footer.jsp" />
	</footer>
</body>
</html>
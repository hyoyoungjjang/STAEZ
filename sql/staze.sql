------------------------------테이블 삭제------------------------------------
DROP TABLE public.email_auth CASCADE;
DROP TABLE public.concert_category CASCADE;
DROP TABLE public.tag CASCADE;
DROP TABLE public.board_category CASCADE;
DROP TABLE public.category CASCADE;
DROP TABLE public.reserve CASCADE;
DROP TABLE public.concert_review CASCADE;
DROP TABLE public.concert_schedule CASCADE;
DROP TABLE public.impossible_seat CASCADE;
DROP TABLE public.theater CASCADE;
DROP TABLE public.concert_attachment CASCADE; 
DROP TABLE public.seat CASCADE;
DROP TABLE public.concert_like CASCADE;
DROP TABLE public.concert CASCADE;
DROP TABLE public.reply_like CASCADE;
DROP TABLE public.reply CASCADE;
DROP TABLE public.board_like CASCADE;
DROP TABLE public.board_attachment CASCADE;
DROP TABLE public.board CASCADE;
DROP TABLE public.profile_img CASCADE;
DROP TABLE public.staez_user CASCADE;

------------------------------시퀀스 삭제------------------------------------
DROP SEQUENCE seq_user;
DROP SEQUENCE seq_profile_img;

DROP SEQUENCE seq_board;
DROP SEQUENCE seq_board_like;
DROP SEQUENCE seq_board_attachment;
DROP SEQUENCE seq_category;

DROP SEQUENCE seq_reply;
DROP SEQUENCE seq_reply_like;

DROP SEQUENCE seq_concert;
DROP SEQUENCE seq_concert_attachment;
DROP SEQUENCE seq_concert_like;
DROP SEQUENCE seq_concert_schedule;
DROP SEQUENCE seq_theater;
DROP SEQUENCE seq_reserve;
DROP SEQUENCE seq_seat;
DROP SEQUENCE seq_impossible_seat;
DROP SEQUENCE seq_concert_review;

------------------------------시퀀스 생성------------------------------------
CREATE SEQUENCE seq_user START 1;
CREATE SEQUENCE seq_profile_img START 1;

CREATE SEQUENCE seq_board START 1;
CREATE SEQUENCE seq_board_like START 1;
CREATE SEQUENCE seq_board_attachment START 1;
CREATE SEQUENCE seq_category START 1;

CREATE SEQUENCE seq_reply START 1;
CREATE SEQUENCE seq_reply_like START 1;

CREATE SEQUENCE seq_concert START 1;
CREATE SEQUENCE seq_concert_attachment START 1;
CREATE SEQUENCE seq_concert_like START 1;
CREATE SEQUENCE seq_concert_schedule START 1;
CREATE SEQUENCE seq_theater START 1;
CREATE SEQUENCE seq_reserve START 1;
CREATE SEQUENCE seq_seat START 1;
CREATE SEQUENCE seq_impossible_seat START 1;
CREATE SEQUENCE seq_concert_review START 1;


------------------------------테이블 생성------------------------------------
/*회원 테이블*/
CREATE TABLE public.staez_user
(
    user_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_user'),
    user_id character varying(20) NOT NULL UNIQUE,
    user_pwd character varying(100) NOT NULL,
	user_name character varying(50) NOT NULL,
    nickname character varying(50) NOT NULL UNIQUE,
    gender character varying(1) NOT NULL CHECK(gender IN ('M', 'F')),
    birth date NOT NULL,
    address character varying(300) NOT NULL,
    email character varying(50) NOT NULL UNIQUE,
	phone character varying(11) NOT NULL UNIQUE,
    genre_like character varying(100),
    grade integer NOT NULL CHECK(grade IN (1, 2)), /*관리자(1), 일반사용자(2)*/
    enroll_date timestamp with time zone NOT NULL DEFAULT now(),
    withdrawal_date timestamp with time zone,
    user_status character varying(1) NOT NULL CHECK(user_status IN ('Y', 'N')) DEFAULT 'Y' 
	/*일반회원(Y), 탈퇴회원(N)*/
);

ALTER TABLE IF EXISTS public.staez_user
    OWNER to postgres;

COMMENT ON TABLE public.staez_user
    IS '회원';

COMMENT ON COLUMN public.staez_user.user_no
    IS '회원번호';

COMMENT ON COLUMN public.staez_user.user_id
    IS '아이디';

COMMENT ON COLUMN public.staez_user.user_pwd
    IS '비밀번호';

COMMENT ON COLUMN public.staez_user.user_name
    IS '이름(실명)';

COMMENT ON COLUMN public.staez_user.nickname
    IS '닉네임';

COMMENT ON COLUMN public.staez_user.gender
    IS '성별';

COMMENT ON COLUMN public.staez_user.birth
    IS '생년월일(나이)';

COMMENT ON COLUMN public.staez_user.address
    IS '주소';

COMMENT ON COLUMN public.staez_user.email
    IS '이메일';

COMMENT ON COLUMN public.staez_user.phone
    IS '휴대폰번호';

COMMENT ON COLUMN public.staez_user.genre_like
    IS '관심장르';

COMMENT ON COLUMN public.staez_user.grade
    IS '회원등급';

COMMENT ON COLUMN public.staez_user.enroll_date
    IS '가입날짜';

COMMENT ON COLUMN public.staez_user.withdrawal_date
    IS '탈퇴날짜';

COMMENT ON COLUMN public.staez_user.user_status
    IS '회원상태';





/*프로필사진 테이블*/
CREATE TABLE public.profile_img
(
    file_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_profile_img'),
    user_no integer NOT NULL,
    origin_name character varying(255),
    change_name character varying(255) UNIQUE,
    file_path character varying(1000) NOT NULL,
    upload_date timestamp with time zone NOT NULL DEFAULT now(),
    status character varying(1) NOT NULL CHECK(status IN ('Y', 'N')) DEFAULT 'Y'
	/*사진있음(Y), 없음(N)*/
);

ALTER TABLE IF EXISTS public.profile_img
	OWNER to postgres;

COMMENT ON TABLE public.profile_img
    IS '프로필사진';

COMMENT ON COLUMN public.profile_img.file_no
    IS '파일번호';

COMMENT ON COLUMN public.profile_img.user_no
    IS '회원번호';

COMMENT ON COLUMN public.profile_img.origin_name
    IS '파일원본명';

COMMENT ON COLUMN public.profile_img.change_name
    IS '파일수정명';

COMMENT ON COLUMN public.profile_img.file_path
    IS '파일경로';

COMMENT ON COLUMN public.profile_img.upload_date
    IS '업로드날짜';

COMMENT ON COLUMN public.profile_img.status
    IS '업로드여부';





/*게시글 테이블*/
CREATE TABLE public.board
(
    board_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_board'),
    ref_board_no integer,
    user_no integer NOT NULL,
    board_level integer NOT NULL DEFAULT 1, /*원글/문의/신고(1), 답변(2)*/
    board_code integer NOT NULL DEFAULT 2, /*공지사항(1), 일반게시글(2), 문의(3), FAQ(4), 신고(5)*/
    board_write_date timestamp with time zone NOT NULL DEFAULT now(),
    board_title character varying(150) NOT NULL,
    board_content text NOT NULL,
    board_count integer NOT NULL DEFAULT 0,
    board_status character varying(1) NOT NULL CHECK(board_status IN('Y', 'N')) DEFAULT 'Y' 
	/*활성화게시글(Y), 삭제된게시글(N)*/
);

ALTER TABLE IF EXISTS public.board
    OWNER to postgres;

COMMENT ON TABLE public.board
    IS '게시글';

COMMENT ON COLUMN public.board.board_no
    IS '게시글번호';

COMMENT ON COLUMN public.board.ref_board_no
    IS '참조게시글';

COMMENT ON COLUMN public.board.user_no
    IS '작성회원번호';

COMMENT ON COLUMN public.board.board_level
    IS '게시글레벨';

COMMENT ON COLUMN public.board.board_code
    IS '게시글코드';

COMMENT ON COLUMN public.board.board_write_date
    IS '작성날짜';

COMMENT ON COLUMN public.board.board_title
    IS '제목';

COMMENT ON COLUMN public.board.board_content
    IS '내용';

COMMENT ON COLUMN public.board.board_count
    IS '조회수';

COMMENT ON COLUMN public.board.board_status
    IS '게시글활성화여부';





/*게시글 첨부파일 테이블*/
CREATE TABLE public.board_attachment
(
    file_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_board_attachment'),
    board_no integer NOT NULL,
    origin_name character varying(255) NOT NULL,
    change_name character varying(255) NOT NULL UNIQUE,
    file_path character varying(1000) NOT NULL,
    upload_date timestamp with time zone NOT NULL DEFAULT now(),
    file_level integer NOT NULL CHECK(file_level IN (1, 2)) DEFAULT 1, /*썸네일사진(1), 그외(2)*/
    status character varying(1) NOT NULL CHECK(status IN ('Y', 'N')) DEFAULT 'Y'
	/*첨부파일 있음(Y), 없음(N)*/
);

ALTER TABLE IF EXISTS public.board_attachment
    OWNER to postgres;

COMMENT ON TABLE public.board_attachment
  IS '게시글 첨부파일';

COMMENT ON COLUMN public.board_attachment.file_no
    IS '파일번호';

COMMENT ON COLUMN public.board_attachment.board_no
    IS '게시글번호';

COMMENT ON COLUMN public.board_attachment.origin_name
    IS '파일원본명';

COMMENT ON COLUMN public.board_attachment.change_name
    IS '파일수정명';

COMMENT ON COLUMN public.board_attachment.file_path
    IS '파일경로';

COMMENT ON COLUMN public.board_attachment.upload_date
    IS '업로드날짜';

COMMENT ON COLUMN public.board_attachment.file_level
    IS '파일레벨';

COMMENT ON COLUMN public.board_attachment.status
    IS '업로드여부';







/*게시글좋아요 테이블*/
CREATE TABLE public.board_like
(
    board_like_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_board_like'),
    user_no integer NOT NULL,
    board_no integer NOT NULL,
    like_date timestamp with time zone NOT NULL DEFAULT now(),
    status character varying(1) NOT NULL CHECK(status IN('Y', 'N')) DEFAULT 'Y', /*눌러진상태(Y), 취소(N)*/
    UNIQUE(user_no, board_no)
);

ALTER TABLE IF EXISTS public.board_like
    OWNER to postgres;

COMMENT ON TABLE public.board_like
    IS '게시글좋아요';

COMMENT ON COLUMN public.board_like.board_like_no
    IS '게시글좋아요번호';

COMMENT ON COLUMN public.board_like.user_no
    IS '누른회원번호';

COMMENT ON COLUMN public.board_like.board_no
    IS '게시글번호';

COMMENT ON COLUMN public.board_like.status
    IS '좋아요여부';

COMMENT ON COLUMN public.board_like.like_date
    IS '좋아요누른날짜';





/*댓글 테이블*/
CREATE TABLE public.reply
(
    reply_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_reply'),
    ref_reply_no integer,
    board_no integer NOT NULL,
    user_no integer NOT NULL,
    reply_content text NOT NULL,
    reply_write_date timestamp with time zone NOT NULL DEFAULT now(),
    reply_status character varying(1) NOT NULL CHECK(reply_status IN('Y', 'N')) DEFAULT 'Y' 
	/*일반댓글(Y), 삭제댓글(N)*/
);

ALTER TABLE IF EXISTS public.reply
    OWNER to postgres;

COMMENT ON TABLE public.reply
    IS '댓글';

COMMENT ON COLUMN public.reply.reply_no
    IS '댓글번호';

COMMENT ON COLUMN public.reply.ref_reply_no
    IS '참조댓글번호';

COMMENT ON COLUMN public.reply.board_no
    IS '게시글번호';

COMMENT ON COLUMN public.reply.user_no
    IS '작성회원번호';

COMMENT ON COLUMN public.reply.reply_content
    IS '내용';

COMMENT ON COLUMN public.reply.reply_write_date
    IS '작성날짜';

COMMENT ON COLUMN public.reply.reply_status
    IS '댓글활성화여부';





/*댓글좋아요 테이블*/
CREATE TABLE public.reply_like
(
    reply_like_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_reply_like'),
    reply_no integer,
    user_no integer NOT NULL,
    like_date timestamp with time zone NOT NULL DEFAULT now(),
    status character varying(1) NOT NULL CHECK(status IN('Y', 'N')) DEFAULT 'Y', /*눌러진상태(Y), 취소(N)*/
    UNIQUE(reply_no, user_no)
);

ALTER TABLE IF EXISTS public.reply_like
    OWNER to postgres;

COMMENT ON TABLE public.reply_like
    IS '댓글좋아요';

COMMENT ON COLUMN public.reply_like.reply_like_no
    IS '댓글좋아요번호';

COMMENT ON COLUMN public.reply_like.reply_no
    IS '댓글번호';

COMMENT ON COLUMN public.reply_like.user_no
    IS '좋아요누른회원번호';

COMMENT ON COLUMN public.reply_like.like_date
    IS '좋아요누른날짜';

COMMENT ON COLUMN public.reply_like.status
    IS '좋아요여부';





/*공연 테이블*/
CREATE TABLE public.concert
(
    concert_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_concert'),
    theater_no integer,
    concert_title character varying(150) NOT NULL,
    concert_plot text NOT NULL,
    concert_runtime integer NOT NULL,
    concert_members character varying(120) NOT NULL,
    concert_production character varying(60) NOT NULL,
    age_limit character varying(20) NOT NULL,
    update_date timestamp with time zone NOT NULL DEFAULT now(),
    concert_status character varying(1) NOT NULL CHECK(concert_status IN('Y', 'N')) DEFAULT 'Y'
	/*진행중인 공연(Y), 종료된 공연(N)*/
);

ALTER TABLE IF EXISTS public.concert
    OWNER to postgres;

COMMENT ON TABLE public.concert
    IS '공연';

COMMENT ON COLUMN public.concert.concert_no
    IS '공연번호';

COMMENT ON COLUMN public.concert.theater_no
    IS '공연시설번호';

COMMENT ON COLUMN public.concert.concert_title
    IS '공연명';

COMMENT ON COLUMN public.concert.concert_plot
    IS '줄거리';

COMMENT ON COLUMN public.concert.concert_runtime
    IS '공연런타임';

COMMENT ON COLUMN public.concert.concert_members
    IS '출연진';

COMMENT ON COLUMN public.concert.concert_production
    IS '제작진';

COMMENT ON COLUMN public.concert.age_limit
    IS '관람연령';

COMMENT ON COLUMN public.concert.update_date
    IS '최종수정일';

COMMENT ON COLUMN public.concert.concert_status
    IS '공연상태';





/*공연찜 테이블*/
CREATE TABLE public.concert_like
(
    concert_like_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_concert_like'),
    user_no integer NOT NULL,
    concert_no integer NOT NULL,
    concert_like_date timestamp with time zone NOT NULL DEFAULT now(),
    status character varying(1) NOT NULL CHECK(status IN('Y', 'N')) DEFAULT 'Y', /*찜한상태(Y), 취소(N)*/
    UNIQUE(user_no, concert_no)
);

ALTER TABLE IF EXISTS public.concert_like
    OWNER to postgres;

COMMENT ON TABLE public.concert_like
    IS '공연찜';

COMMENT ON COLUMN public.concert_like.concert_like_no
    IS '공연찜번호';

COMMENT ON COLUMN public.concert_like.user_no
    IS '회원번호';

COMMENT ON COLUMN public.concert_like.concert_no
    IS '공연번호';

COMMENT ON COLUMN public.concert_like.concert_like_date
    IS '찜날짜';

COMMENT ON COLUMN public.concert_like.status
    IS '찜여부';





/*좌석 테이블*/
CREATE TABLE public.seat
(
    seat_id integer PRIMARY KEY DEFAULT NEXTVAL('seq_seat'),
    concert_no integer NOT NULL,
    grade character varying(1), /*좌석 등급 CHECK 제약조건 나중에 추가*/
    price integer,
    concert_date date NOT NULL,
    seat_start_row integer NOT NULL,
    seat_end_row integer NOT NULL,
    seat_start_col integer NOT NULL,
    seat_end_col integer NOT NULL,
    status character varying(1) NOT NULL CHECK(status IN('Y', 'N')) DEFAULT 'Y'
	/*예매안된좌석(Y), 예매된좌석(N)*/
);

ALTER TABLE IF EXISTS public.seat
    OWNER to postgres;

COMMENT ON TABLE public.seat
    IS '좌석';

COMMENT ON COLUMN public.seat.seat_id
    IS '좌석아이디';

COMMENT ON COLUMN public.seat.concert_no
    IS '공연번호';

COMMENT ON COLUMN public.seat.grade
    IS '좌석등급';

COMMENT ON COLUMN public.seat.price
    IS '가격';

COMMENT ON COLUMN public.seat.concert_date
    IS '공연날짜';

COMMENT ON COLUMN public.seat.seat_start_row
    IS '좌석시작행';

COMMENT ON COLUMN public.seat.seat_end_row
    IS '좌석끝행';

COMMENT ON COLUMN public.seat.seat_start_col
    IS '좌석시작열';

COMMENT ON COLUMN public.seat.seat_end_col
    IS '좌석끝열';

COMMENT ON COLUMN public.seat.status
    IS '좌석활성화여부';





/*공연첨부파일 테이블*/
CREATE TABLE public.concert_attachment
(
    file_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_concert_attachment'),
    concert_no integer NOT NULL,
    origin_name character varying(255) NOT NULL,
    change_name character varying(255) NOT NULL UNIQUE,
    file_path character varying(1000) NOT NULL,
    upload_date timestamp with time zone NOT NULL DEFAULT now(),
    file_level integer NOT NULL CHECK(file_level IN (1, 2)) DEFAULT 1, /*썸네일사진(1), 그외(2)*/
    status character varying(1) NOT NULL CHECK(status IN ('Y', 'N')) DEFAULT 'Y' 
	/*첨부파일 있음(Y), 없음(N)*/    
);

ALTER TABLE IF EXISTS public.concert_attachment
    OWNER to postgres;

COMMENT ON TABLE public.concert_attachment
    IS '공연첨부파일';

COMMENT ON COLUMN public.concert_attachment.file_no
    IS '파일번호';

COMMENT ON COLUMN public.concert_attachment.concert_no
    IS '공연번호';

COMMENT ON COLUMN public.concert_attachment.origin_name
    IS '파일원본명';

COMMENT ON COLUMN public.concert_attachment.change_name
    IS '파일수정명';

COMMENT ON COLUMN public.concert_attachment.file_path
    IS '파일경로';

COMMENT ON COLUMN public.concert_attachment.upload_date
    IS '업로드날짜';

COMMENT ON COLUMN public.concert_attachment.file_level
    IS '파일레벨';

COMMENT ON COLUMN public.concert_attachment.status
    IS '업로드여부';





/*공연시설 테이블*/
CREATE TABLE public.theater
(
    theater_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_theater'),
    theater_name character varying(60) NOT NULL,
    theater_row integer NOT NULL,
    theater_col integer NOT NULL,
    address character varying(100) NOT NULL,
    telno character varying(20)
);

ALTER TABLE IF EXISTS public.theater
    OWNER to postgres;

COMMENT ON TABLE public.theater
    IS '공연시설';

COMMENT ON COLUMN public.theater.theater_no
    IS '공연시설번호';

COMMENT ON COLUMN public.theater.theater_name
    IS '공연장명';

COMMENT ON COLUMN public.theater.theater_row
    IS '총행수';

COMMENT ON COLUMN public.theater.theater_col
    IS '총열수';

COMMENT ON COLUMN public.theater.address
    IS '주소';

COMMENT ON COLUMN public.theater.telno
    IS '전화번호';






/*착석불가 테이블*/
CREATE TABLE public.impossible_seat
(
    impossible_seat_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_impossible_seat'),
    theater_no integer NOT NULL,
    impossible_seat_row integer  NOT NULL,
    impossible_seat_col integer NOT NULL
);

ALTER TABLE IF EXISTS public.impossible_seat
    OWNER to postgres;

COMMENT ON TABLE public.impossible_seat
    IS '착석불가';

COMMENT ON COLUMN public.impossible_seat.impossible_seat_no
    IS '착석불가번호';

COMMENT ON COLUMN public.impossible_seat.theater_no
    IS '공연장번호';

COMMENT ON COLUMN public.impossible_seat.impossible_seat_row
    IS '좌석행';

COMMENT ON COLUMN public.impossible_seat.impossible_seat_col
    IS '좌석열';






/*공연일정 테이블*/
CREATE TABLE public.concert_schedule
(
    schedule_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_concert_schedule'),
    concert_no integer NOT NULL,
    schedule character varying(120) NOT NULL DEFAULT 'N', /*공연 시간(e.g. 20:00-22:00 or N)*/
    start_date date NOT NULL,
    end_date date NOT NULL,
    concert_times integer NOT NULL DEFAULT 1,
    status character varying NOT NULL CHECK(status IN('Y', 'N')) DEFAULT 'Y'
	/*진행중인일정(Y), 종료된일정(N)*/
);

ALTER TABLE IF EXISTS public.concert_schedule
    OWNER to postgres;

COMMENT ON TABLE public.concert_schedule
    IS '공연일정';

COMMENT ON COLUMN public.concert_schedule.schedule_no
    IS '일정번호';

COMMENT ON COLUMN public.concert_schedule.concert_no
    IS '공연번호';

COMMENT ON COLUMN public.concert_schedule.schedule
    IS '일정(시간)';

COMMENT ON COLUMN public.concert_schedule.start_date
    IS '시작날짜';

COMMENT ON COLUMN public.concert_schedule.end_date
    IS '종료날짜';

COMMENT ON COLUMN public.concert_schedule.concert_times
    IS '공연회차';

COMMENT ON COLUMN public.concert_schedule.status
    IS '일정상태';






/*한줄평(별점) 테이블*/
CREATE TABLE public.concert_review
(
    review_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_concert_review'),
    user_no integer NOT NULL,
    concert_no integer NOT NULL,
    review_content text,
    score integer NOT NULL CHECK(score BETWEEN 1 AND 5),
    review_date timestamp with time zone NOT NULL DEFAULT now(),
    review_status character varying(1) NOT NULL CHECK(review_status IN ('Y', 'N')) DEFAULT 'Y'
	/*일반상태(Y), 삭제된상태(N)*/
);

ALTER TABLE IF EXISTS public.concert_review
    OWNER to postgres;

COMMENT ON TABLE public.concert_review
    IS '한줄평(별점)';

COMMENT ON COLUMN public.concert_review.review_no
    IS '평가번호';

COMMENT ON COLUMN public.concert_review.user_no
    IS '평가회원번호';

COMMENT ON COLUMN public.concert_review.concert_no
    IS '평가공연번호';

COMMENT ON COLUMN public.concert_review.review_content
    IS '한줄평';

COMMENT ON COLUMN public.concert_review.score
    IS '별점(1~5)';

COMMENT ON COLUMN public.concert_review.review_date
    IS '작성날짜';

COMMENT ON COLUMN public.concert_review.review_status
    IS '한줄평활성화여부';







/*예매내역 테이블*/
CREATE TABLE public.reserve
(
    reserve_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_reserve'),
    concert_no integer NOT NULL,
    user_no integer NOT NULL,
	r_name character varying(50) NOT NULL, /*staez_user테이블의 정보와 다를 수 있음*/
	r_birth date NOT NULL, /*staez_user테이블의 정보와 다를 수 있음*/
	r_phone character varying(11) NOT NULL, /*staez_user테이블의 정보와 다를 수 있음*/  
    reserve_row integer NOT NULL,
    reserve_col integer NOT NULL,
    reserve_date timestamp with time zone NOT NULL DEFAULT now(),
    pay_method character varying(20) NOT NULL CHECK(pay_method IN('무통장입금', '카카오페이', '네이버페이', '토스')),
    concert_date date NOT NULL,
    reserve_status character varying(1) NOT NULL CHECK(reserve_status IN ('Y', 'U', 'N')) DEFAULT 'U',
	/*활성화된(결제된)예약(Y), 결제전예약(U) 만료된예약(N)*/
    schedule character varying(20) NOT NULL,
	UNIQUE(concert_no, reserve_row, reserve_col, concert_date, schedule)
);

ALTER TABLE IF EXISTS public.reserve
    OWNER to postgres;

COMMENT ON TABLE public.reserve
    IS '예매내역';

COMMENT ON COLUMN public.reserve.reserve_no
    IS '예매번호';

COMMENT ON COLUMN public.reserve.concert_no
    IS '공연번호';

COMMENT ON COLUMN public.reserve.user_no
    IS '예매회원번호';

COMMENT ON COLUMN public.reserve.r_name
	IS '예매자이름(실명)';

COMMENT ON COLUMN public.reserve.r_birth
    IS '예매자생년월일';

COMMENT ON COLUMN public.reserve.r_phone
    IS '예매자휴대폰번호';

COMMENT ON COLUMN public.reserve.reserve_row
    IS '좌석행';

COMMENT ON COLUMN public.reserve.reserve_col
    IS '좌석열';

COMMENT ON COLUMN public.reserve.reserve_date
    IS '예매날짜';

COMMENT ON COLUMN public.reserve.pay_method
    IS '결제방법';

COMMENT ON COLUMN public.reserve.concert_date
    IS '공연날짜';

COMMENT ON COLUMN public.reserve.reserve_status
    IS '예약활성화여부';

COMMENT ON COLUMN public.reserve.schedule
    IS '일정(시간)';






/*카테고리 테이블*/
CREATE TABLE public.category
(
    category_no integer PRIMARY KEY DEFAULT NEXTVAL('seq_category'),
    ref_category_no integer,
    category_name character varying(30) NOT NULL,
    category_level integer NOT NULL DEFAULT 1
	/*대분류(1), 나머지(2, 3, ...)*/
);

ALTER TABLE IF EXISTS public.category
    OWNER to postgres;

COMMENT ON TABLE public.category
    IS '카테고리';

COMMENT ON COLUMN public.category.category_no
    IS '카테고리번호';

COMMENT ON COLUMN public.category.ref_category_no
    IS '상위카테고리번호';

COMMENT ON COLUMN public.category.category_name
    IS '카테고리이름';

COMMENT ON COLUMN public.category.category_level
    IS '카테고리레벨';






/*게시글카테고리 테이블*/
CREATE TABLE public.board_category
(
    board_no integer NOT NULL,
    category_no integer NOT NULL
);

ALTER TABLE IF EXISTS public.board_category
    OWNER to postgres;

COMMENT ON TABLE public.board_category
    IS '게시글카테고리';

COMMENT ON COLUMN public.board_category.board_no
    IS '게시글번호';

COMMENT ON COLUMN public.board_category.category_no
    IS '카테고리번호';







/*태그 테이블*/
CREATE TABLE public.tag
(
    board_no integer NOT NULL,
    concert_no integer NOT NULL
);

ALTER TABLE IF EXISTS public.tag
    OWNER to postgres;

COMMENT ON TABLE public.tag
    IS '태그';

COMMENT ON COLUMN public.tag.board_no
    IS '게시글번호';

COMMENT ON COLUMN public.tag.concert_no
    IS '공연번호';






/*공연카테고리 테이블*/
CREATE TABLE public.concert_category
(
    concert_no integer NOT NULL,
    category_no integer NOT NULL
);

ALTER TABLE IF EXISTS public.concert_category
    OWNER to postgres;

COMMENT ON TABLE public.concert_category
    IS '공연카테고리';

COMMENT ON COLUMN public.concert_category.concert_no
    IS '공연번호';

COMMENT ON COLUMN public.concert_category.category_no
    IS '카테고리번호';





/*이메일 인증 테이블*/
CREATE TABLE public.email_auth(
   email character varying(50) NOT NULL UNIQUE,
   authNo character varying(6) NOT NULL,
   send_time timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE IF EXISTS public.email_auth
OWNER to postgres;

COMMENT ON TABLE public.email_auth
    IS '이메일인증';

COMMENT ON COLUMN public.email_auth.email
    IS '이메일주소';

COMMENT ON COLUMN public.email_auth.authNo
    IS '인증번호(6자리)';

COMMENT ON COLUMN public.email_auth.send_time
    IS '전송시간';



-------------------------제약조건 생성-----------------------------
/*외래키 생성*/

ALTER TABLE profile_img ADD FOREIGN KEY(user_no)
REFERENCES staez_user;

----

ALTER TABLE board ADD FOREIGN KEY(ref_board_no)
REFERENCES board; /*셀프조인*/

ALTER TABLE board ADD FOREIGN KEY(user_no)
REFERENCES staez_user;

----

ALTER TABLE board_like ADD FOREIGN KEY(board_no)
REFERENCES board; 

ALTER TABLE board_like ADD FOREIGN KEY(user_no)
REFERENCES staez_user;

----

ALTER TABLE board_attachment ADD FOREIGN KEY(board_no)
REFERENCES board; 

----

ALTER TABLE reply ADD FOREIGN KEY(ref_reply_no)
REFERENCES reply; /*셀프조인*/

ALTER TABLE reply ADD FOREIGN KEY(board_no)
REFERENCES board;

ALTER TABLE reply ADD FOREIGN KEY(user_no)
REFERENCES staez_user;

----

ALTER TABLE reply_like ADD FOREIGN KEY(reply_no)
REFERENCES reply;

ALTER TABLE reply_like ADD FOREIGN KEY(user_no)
REFERENCES staez_user;

----

ALTER TABLE concert ADD FOREIGN KEY(theater_no)
REFERENCES theater;

----

ALTER TABLE concert_attachment ADD FOREIGN KEY(concert_no)
REFERENCES concert;

----

ALTER TABLE concert_like ADD FOREIGN KEY(user_no)
REFERENCES staez_user;

ALTER TABLE concert_like ADD FOREIGN KEY(concert_no)
REFERENCES concert;

----

ALTER TABLE seat ADD FOREIGN KEY(concert_no)
REFERENCES concert;

----

ALTER TABLE impossible_seat ADD FOREIGN KEY(theater_no)
REFERENCES theater;

----

ALTER TABLE reserve ADD FOREIGN KEY(user_no)
REFERENCES staez_user;

ALTER TABLE reserve ADD FOREIGN KEY(concert_no)
REFERENCES concert;

----

ALTER TABLE concert_review ADD FOREIGN KEY(user_no)
REFERENCES staez_user;

ALTER TABLE concert_review ADD FOREIGN KEY(concert_no)
REFERENCES concert;

----

ALTER TABLE concert_schedule ADD FOREIGN KEY(concert_no)
REFERENCES concert;

----

ALTER TABLE category ADD FOREIGN KEY(ref_category_no)
REFERENCES category; /*셀프조인*/

----

ALTER TABLE board_category ADD FOREIGN KEY(board_no)
REFERENCES board;

ALTER TABLE board_category ADD FOREIGN KEY(category_no)
REFERENCES category;

----

ALTER TABLE tag ADD FOREIGN KEY(board_no)
REFERENCES board;

ALTER TABLE tag ADD FOREIGN KEY(concert_no)
REFERENCES concert;

----

ALTER TABLE concert_category ADD FOREIGN KEY(concert_no)
REFERENCES concert;

ALTER TABLE concert_category ADD FOREIGN KEY(category_no)
REFERENCES category;
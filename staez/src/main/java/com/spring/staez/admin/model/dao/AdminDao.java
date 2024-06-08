package com.spring.staez.admin.model.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.spring.staez.admin.model.dto.AdminBoardDto;
import com.spring.staez.admin.model.dto.AdminBoardSelectDto;
import com.spring.staez.admin.model.dto.AdminSearchDto;
import com.spring.staez.admin.model.vo.Category;
import com.spring.staez.admin.model.vo.ConcertSchedule;
import com.spring.staez.admin.model.vo.ImpossibleSeat;
import com.spring.staez.admin.model.vo.Seat;
import com.spring.staez.common.model.vo.PageInfo;
import com.spring.staez.common.template.ImpossibleSeatList;
import com.spring.staez.community.model.vo.Board;
import com.spring.staez.concert.model.vo.Concert;
import com.spring.staez.concert.model.vo.Theater;
import com.spring.staez.user.model.vo.User;

@Repository
public class AdminDao {

	public ArrayList<Category> selectFaqCategory(SqlSessionTemplate sqlSession, int refCategoryNo) {
		return (ArrayList)sqlSession.selectList("adminMapper.selectFaqCategory", refCategoryNo);
	}
	
	public int faqInsert(SqlSessionTemplate sqlSession, Board b) {
		return sqlSession.insert("adminMapper.faqInsert", b);
	}

	public int faqCategoryInsert(SqlSessionTemplate sqlSession, int categoryNo) {
		return sqlSession.insert("adminMapper.faqCategoryInsert", categoryNo);
	}

	public int insertTheater(SqlSessionTemplate sqlSession, Theater t) {
		return sqlSession.insert("adminMapper.insertTheater", t);
	}

	public int insertImpossibleSeat(SqlSessionTemplate sqlSession) {
		int result = 1;
		for(ImpossibleSeat i : ImpossibleSeatList.getList()) {
			result *= sqlSession.insert("adminMapper.insertImpossibleSeat", i);
		}
		return result;
	}

	public ArrayList<Theater> selectTheaterList(SqlSessionTemplate sqlSession, String keyword) {
		return (ArrayList)sqlSession.selectList("adminMapper.selectTheaterList", keyword);
	}

	public int insertConcert(SqlSessionTemplate sqlSession, Concert c) {
		return sqlSession.insert("adminMapper.insertConcert", c);
	}

	public int insertConcertCategory(SqlSessionTemplate sqlSession, Concert c) {
		return sqlSession.insert("adminMapper.insertConcertCategory", c);
	}

	public int insertConcertAttachment(SqlSessionTemplate sqlSession, Concert c) {
		return sqlSession.insert("adminMapper.insertConcertAttachment", c);
	}

	public int insertScheduleList(SqlSessionTemplate sqlSession, List<ConcertSchedule> scheduleList) {
		int result = 1;
		for(ConcertSchedule cs : scheduleList) {
			result *= sqlSession.insert("adminMapper.insertScheduleList", cs);
		}
		return result;
	}

	public int insertSeatList(SqlSessionTemplate sqlSession, List<Seat> seatList) {
		int result = 1;
		for(Seat s : seatList) {
			result *= sqlSession.insert("adminMapper.insertSeatList", s);
		}
		return result;
	}

	public ArrayList<Concert> selectConcertContentList(SqlSessionTemplate sqlSession, PageInfo pi){
		int offset = (pi.getCurrentPage()-1)* pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		return (ArrayList)sqlSession.selectList("adminMapper.selectConcertContentList", null, rowBounds);
	}
	
	public ArrayList<Concert> selectConcertImgList(SqlSessionTemplate sqlSession, PageInfo pi){
		int offset = (pi.getCurrentPage()-1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("adminMapper.selectConcertImgList", null, rowBounds);
	}
	
	public int selectConcertContentListCount(SqlSessionTemplate sqlSession) {
		return sqlSession.selectOne("adminMapper.selectConcertContentListCount");
	}
	
	public int selectTheaterListCount(SqlSessionTemplate sqlSession) {
		return sqlSession.selectOne("adminMapper.selectTheaterListCount");
	}
	
	public ArrayList<Theater> selectTheaterList(SqlSessionTemplate sqlSession, PageInfo pi) {
		int offset = (pi.getCurrentPage()-1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("adminMapper.selectMainTheaterList", null, rowBounds);
	}

	public int selectBoardCnt(SqlSessionTemplate sqlSession, AdminSearchDto dto) {
		return sqlSession.selectOne("adminMapper.selectBoardCnt", dto);
	}

	public ArrayList<User> selectBoard(SqlSessionTemplate sqlSession, AdminSearchDto dto, PageInfo pi) {
		int offset = (pi.getCurrentPage()-1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("adminMapper.selectBoard", dto, rowBounds);
	}

	public int deleteBoard(SqlSessionTemplate sqlSession, AdminBoardSelectDto dto) {
		return sqlSession.update("adminMapper.deleteBoard", dto);
	}

	public int deleteBoardCategory(SqlSessionTemplate sqlSession, Map<String, Integer> boardInfoOrigin) {
		return sqlSession.delete("adminMapper.deleteBoardCategory", boardInfoOrigin);
	}

	public int insertBoardCategory(SqlSessionTemplate sqlSession, AdminBoardSelectDto dto) {
		int result = 1;
		Map<String, Integer> map = new HashMap<>();
		map.put("categoryNo", dto.getCategoryNo());
		for(int boardNo : dto.getBoardList()) {
			map.put("boardNo", boardNo);
			result *= sqlSession.insert("adminMapper.insertBoardCategory", map);
		}
		return result;
	}

	public int selectBoardCategory(SqlSessionTemplate sqlSession, Map<String, Integer> boardCategoryLevel) {
		return sqlSession.selectOne("adminMapper.selectBoardCategory", boardCategoryLevel);
	}

	public int selectFaqCnt(SqlSessionTemplate sqlSession, AdminSearchDto dto) {
		return sqlSession.selectOne("adminMapper.selectFaqCnt", dto);
	}

	public ArrayList<Board> selectFaq(SqlSessionTemplate sqlSession, AdminSearchDto dto, PageInfo pi) {
		int offset = (pi.getCurrentPage()-1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("adminMapper.selectFaq", dto, rowBounds);
	}

	public Board selectOneBoard(SqlSessionTemplate sqlSession, int boardNo) {
		return sqlSession.selectOne("adminMapper.selectOneBoard", boardNo);
	}

	public int updateOneBoard(SqlSessionTemplate sqlSession, AdminBoardDto dto) {
		return sqlSession.update("adminMapper.updateOneBoard", dto);
	}

	public int updateOneCategory(SqlSessionTemplate sqlSession, AdminBoardDto dto) {
		return sqlSession.update("adminMapper.updateOneCategory", dto);
	}

	public int insertOneBoard(SqlSessionTemplate sqlSession, Board board) {
		return sqlSession.insert("adminMapper.insertOneBoard", board);
	}

	public int selectInquireCnt(SqlSessionTemplate sqlSession, AdminSearchDto dto) {
		return sqlSession.selectOne("adminMapper.selectInquireCnt", dto);
	}

	public ArrayList<Board> selectInquire(SqlSessionTemplate sqlSession, AdminSearchDto dto, PageInfo pi) {
		int offset = (pi.getCurrentPage()-1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("adminMapper.selectInquire", dto, rowBounds);
	}

	public int selectReportCnt(SqlSessionTemplate sqlSession, AdminSearchDto dto) {
		return sqlSession.selectOne("adminMapper.selectReportCnt", dto);
	}

	public ArrayList<Board> selectReport(SqlSessionTemplate sqlSession, AdminSearchDto dto, PageInfo pi) {
		int offset = (pi.getCurrentPage()-1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("adminMapper.selectReport", dto, rowBounds);
	}

}

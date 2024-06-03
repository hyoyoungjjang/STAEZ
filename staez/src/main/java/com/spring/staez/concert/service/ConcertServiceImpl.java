package com.spring.staez.concert.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.staez.admin.model.vo.Category;
import com.spring.staez.concert.model.dao.ConcertDao;
import com.spring.staez.concert.model.vo.Concert;
import com.spring.staez.concert.model.vo.ConcertLike;
import com.spring.staez.concert.model.vo.ConcertReview;

@Service
public class ConcertServiceImpl implements ConcertService {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Autowired
	private ConcertDao concertDao;

	
	@Override
	public Category selectCate(int categoryNo) {
		return concertDao.selectCate(sqlSession, categoryNo);
	}
	
	@Override
	public ArrayList<Category> selectCateCon() {
		return concertDao.selectCateCon(sqlSession);
	}

	@Override
	public ArrayList<Concert> selectconList(int categoryNo) {
		return concertDao.selectconList(sqlSession, categoryNo);
	}

	@Override
	public Concert selectCon(int concertNo) {
		return concertDao.selectCon(sqlSession, concertNo);
	}

	
	
	
	
//	@Override
//	public ArrayList<ConcertLike> checkConLike(int userNo, int concertNo) {
//		Map<String, Integer> like = new HashMap();
//		like.put("userNo", userNo);
//		like.put("concertNo", concertNo);
//		
//		ConcertLike userLike = new 
//		
//		ArrayList<ConcertLike> userLike = null;
//		
//		if(userLike == null) {// 기존 사용자 like 없으면: insert 해라
//			int insert = concertDao.insertLike(sqlSession, like);
//			
//			if( )
//			
//		} else {
//			
//		}
//		
//		
//		return concertDao.checkConLike(sqlSession, userNo, concertNo);
//	}
//
	@Override
	public ArrayList<Concert> selectConDetail(int concertNo) {
		return concertDao.selectConDetail(sqlSession, concertNo);
	}

	@Override
	public ArrayList<ConcertReview> selectComDetail(int concertNo) {
		return concertDao.selectComDetail(sqlSession, concertNo);
	}

	@Override
	public ArrayList<ConcertReview> selectRevDetail(int concertNo) {
		return concertDao.selectRevDetail(sqlSession, concertNo);
	}

	@Override
	public ArrayList<ConcertLike> checkLikeExist(int concertNo) {
		return concertDao.checkLikeExist(sqlSession, concertNo);
	}



	
//	@Transactional
//	@Override
//	public int insertConLike(ConcertLike conL) {  
//		
//		int cl = new ConcertServiceImpl().checkConLike(conL);
//		// 사용자가 찜한 적 없는 콘서트이면 찜: insert 가져와서
//		
//		if(cl == 0) { 
//			
//			int result = concertDao.insertConLike(sqlSession, conL);			
//						
//		} else { // 사용자가 찜한 적 있는 콘서트이고 status Y -> status N : update
//				 // 사용자가 찜한 적 있는 콘서트이고 status N -> status Y
//			if(conL.getStatus().equals("Y")) {
//				int updateLikeYtoN = concertDao.updateLikeYtoN(sqlSession, conL);
//			}else {
//				int updateLikeNtoY = concertDao.updateLikeNtoY(sqlSession, conL);
//			}
//		}
//		return concertDao.insertConLike(sqlSession, conL);
//	}
//
//
//	@Transactional
//    @Override
//    public int updateLikeYtoN(ConcertLike conL) {
//        return concertDao.updateLikeYtoN(sqlSession, conL);
//    }
//
//	@Transactional
//    @Override
//    public int updateLikeNtoY(ConcertLike conL) {
//        return concertDao.updateLikeNtoY(sqlSession, conL);
//    }





	

	



}

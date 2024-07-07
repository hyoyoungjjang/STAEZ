package com.spring.staez.concert.controller;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.spring.staez.admin.model.vo.ConcertSchedule;
import com.spring.staez.admin.model.vo.ImpossibleSeat;
import com.spring.staez.admin.model.vo.Seat;
import com.spring.staez.common.model.vo.ReadyResponse;
import com.spring.staez.concert.model.dto.ReserveInsertDTO;
import com.spring.staez.concert.model.vo.Concert;
import com.spring.staez.concert.model.vo.Theater;
import com.spring.staez.concert.service.ConcertReserveService;
import com.spring.staez.user.model.vo.Reserve;
import com.spring.staez.user.model.vo.User;


import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class ConcertReserveController {

	@Autowired
	private ConcertReserveService crService;

	// 카카오페이 시크릿키
	   @Value("${kakaopay.secretkey}")
	   private String secretKey;
	   
		// 발송자 이메일
	   @Value("${reserveMail.username}")
	   private String userName;
	   
    	// 발송자 비밀번호
	   @Value("${reserveMail.password}")
	   private String password;
	   

	   @Value("${reserveMail.auth}")
	   private String auth;

	   @Value("${reserveMail.starttls.enable}")
	   private String enable;
	   
	   @Value("${deposit.account}")
	   private String deposit;
	
	   @Autowired
		private JavaMailSender sender;
	
	
	@GetMapping("selectDate.co")
	public String concertReserveStepOne(Model model, String concertNo, String userNo) {
		int cNo = Integer.parseInt(concertNo);
		int uNo = Integer.parseInt(userNo);
		Concert concert = crService.reserveConcertInfo(cNo);
		model.addAttribute("concert", concert);
		model.addAttribute("userNo", uNo);
		return "concert/concertReserveStepOne";
	}

	@PostMapping("selectSeat.co")
	public String concertReserveStepTwo(Model model, String concertNo, String reserveDate, String userNo) {
		int cNo = Integer.parseInt(concertNo);
		int uNo = Integer.parseInt(userNo);
		Concert concert = crService.reserveConcertInfo(cNo);

		model.addAttribute("concert", concert);
		model.addAttribute("userNo", uNo);
		model.addAttribute("reserveDate", reserveDate);
		return "concert/concertReserveStepTwo";
	}

	@PostMapping("selectMember.co")
	public String concertReserveStepThree(Model model, String cNo, String reserveDate,
			String userNo, String totalAmount, String seatList) {
		int concertNo = Integer.parseInt(cNo);
		int uNo = Integer.parseInt(userNo);
		Concert concert = crService.reserveConcertInfo(concertNo);
		User user = crService.userInfo(uNo);
		Gson gson = new Gson();
		Type type = new TypeToken<List>() {
		}.getType();
		List sList = gson.fromJson(seatList, type);

		model.addAttribute("seatList", sList);
		model.addAttribute("concert", concert);
		model.addAttribute("user", user);
		model.addAttribute("totalAmount", totalAmount);
		model.addAttribute("reserveDate", reserveDate);

		return "concert/concertReserveStepThree";
	}

	@PostMapping("selectPayment.co")
	public String concertReserveLastStep(Model model, String concertNo, String recipientName, String recipientPhone,
			String recipientBirth,
			String recipientEmail, String seatList, String totalAmount, String reserveDate, String userNo) {
		int cNo = Integer.parseInt(concertNo);
		int uNo = Integer.parseInt(userNo);
		Concert concert = crService.reserveConcertInfo(cNo);
		Gson gson = new Gson();
		Type type = new TypeToken<List>() {
		}.getType();
		List sList = gson.fromJson(seatList, type);

		model.addAttribute("recipientEmail", recipientEmail);
		model.addAttribute("recipientName", recipientName);
		model.addAttribute("recipientPhone", recipientPhone);
		model.addAttribute("recipientBirth", recipientBirth);
		model.addAttribute("seatList", sList);
		model.addAttribute("concert", concert);
		model.addAttribute("userNo", uNo);
		model.addAttribute("totalAmount", totalAmount);
		model.addAttribute("reserveDate", reserveDate);

		return "concert/concertReserveLastStep";
	}

	@ResponseBody
	@PostMapping(value = "insertReserve.co", produces = "application/json; charset-UTF-8")
	public String insertReserve(String rids) {

		System.out.println(rids);
		JsonObject totalObj = JsonParser.parseString(rids).getAsJsonObject();
	
		
	    int totalPrice = Integer.parseInt(totalObj.get("totalAmount").getAsString());
		
		int concertNo = Integer.parseInt(totalObj.get("concertNo").getAsString());
		String recipientEmail = totalObj.get("recipientEmail").getAsString();
		
		ReserveInsertDTO rid = new ReserveInsertDTO();
		rid.setUserNo(Integer.parseInt(totalObj.get("userNo").getAsString()));
		rid.setConcertNo(Integer.parseInt(totalObj.get("concertNo").getAsString()));
		rid.setConcertDate(totalObj.get("concertDate").getAsString());
		rid.setSchedule(totalObj.get("schedule").getAsString());
		rid.setPayMethod(totalObj.get("payMethod").getAsString());
		rid.setRecipientName(totalObj.get("recipientName").getAsString());
		rid.setRecipientPhone(totalObj.get("recipientPhone").getAsString());
		rid.setRecipientBirth(totalObj.get("recipientBirth").getAsString());
		
		JsonArray seatListArray = totalObj.getAsJsonArray("seatList");
		System.out.println(seatListArray.size());
		List<String> seatList = new ArrayList<>();
		for (JsonElement seatInformation : seatListArray) {
			seatList.add(seatInformation.getAsString());
		}
		rid.setSeatList(seatList);
		
		
		int result = crService.insertReserve(rid);
		String seatStr = "";
		for(int i = 0; i < rid.getSeatList().size(); i++) {
			 String seat = rid.getSeatList().get(i);
			 String[] parts = seat.split("-");
		     int numberPart = Integer.parseInt(parts[0]);
		     StringBuilder alphaPart = new StringBuilder();
		     while (numberPart > 0) {
		            int remainder = numberPart % 26;
		            alphaPart.insert(0, (char) (remainder + 'A' - 1));
		            numberPart = numberPart / 26;
		     }
		     seatStr += alphaPart.toString() + "-" + parts[1] + " ";
		}

		if (result > 0) {
			if(rid.getPayMethod().equals("카카오페이")) {
				SimpleMailMessage message = new SimpleMailMessage();
				String emailText = "좌석정보 : " + seatStr + "결제 방식 : 카카오페이" + "결제 금액 : " + totalPrice ;
				message.setSubject("예매 정보");
				message.setText(emailText);
				
				String to = userName;
				message.setTo(to);
				
				String cc = recipientEmail;
				message.setCc(cc);
				
				sender.send(message);
			} else {
				SimpleMailMessage message = new SimpleMailMessage();
				String emailText = "좌석정보 : " + seatStr + "결제 방식 : 무통장입금" + "결제 금액 : " + totalPrice +"입금계좌 : KB국민은행 "+ deposit ;
				message.setSubject("예매 정보");
				message.setText(emailText);
				
				String to = userName;
				message.setTo(to);
				
				String cc = recipientEmail;
				message.setCc(cc);
				
				sender.send(message);
			}
			
			return new Gson().toJson("good");
		} else {
			return new Gson().toJson("no");
		}

	}

	@ResponseBody
	@GetMapping(value = "ajaxConcertPeriod.co", produces = "application/json; charset-UTF-8")
	public String ajaxConcertPeriod(String concertNo) {
		int cNo = Integer.parseInt(concertNo);

		Concert concert = crService.selectConcertPeriod(cNo);

		return new Gson().toJson(concert);
	}

	@ResponseBody
	@GetMapping(value = "ajaxConcertDayOff.co", produces = "application/json; charset-UTF-8")
	public String ajaxConcertDayOff(String concertNo) {
		int cNo = Integer.parseInt(concertNo);

		ArrayList<Concert> dayOff = crService.selectConcertDayOff(cNo);

		return new Gson().toJson(dayOff);
	}

	@ResponseBody
	@GetMapping(value = "ajaxChoiceDateSchedule.co", produces = "application/json; charset-UTF-8")
	public String ajaxChoiceDateSchedule(String concertNo, String choiceDate) {
		int cNo = Integer.parseInt(concertNo);

		ArrayList<ConcertSchedule> schedules = crService.selectChoiceDateSchedule(cNo, choiceDate);

		return new Gson().toJson(schedules);
	}

	@ResponseBody
	@GetMapping(value = "ajaxChoiceScheduleSeat.co", produces = "application/json; charset-UTF-8")
	public String ajaxChoiceScheduleSeat(String cNo, String tNo, String choiceDate, String schedule) {
		int concertNo = Integer.parseInt(cNo);
		int theaterNo = Integer.parseInt(tNo);

		ArrayList<Seat> ratingTotalSeat = crService.selectRatingTotalSeat(concertNo, choiceDate, schedule);
		ArrayList<Seat> reserveRatingSeat = crService.selectReserveRatingSeat(concertNo, choiceDate, schedule);
		ArrayList<Seat> impossibleRatingSeat = crService.selectImpossibleRatingSeat(concertNo, theaterNo, choiceDate);

		Map resMap = new HashMap();
		resMap.put("totalSeat", ratingTotalSeat);
		resMap.put("reserveSeat", reserveRatingSeat);
		resMap.put("impossibleSeat", impossibleRatingSeat);

		return new Gson().toJson(resMap);
	}

	@ResponseBody
	@GetMapping(value = "ajaxTheaterSeatInfo.co", produces = "application/json; charset-UTF-8")
	public String ajaxTheaterSeatInfo(String theaterName) {
		Theater theater = crService.selectTheaterSeatInfo(theaterName);

		return new Gson().toJson(theater);
	}

	@ResponseBody
	@GetMapping(value = "ajaxImpossibleSeatInfo.co", produces = "application/json; charset-UTF-8")
	public String ajaxImpossibleSeatInfo(String tNo) {
		int theaterNo = Integer.parseInt(tNo);
		ArrayList<ImpossibleSeat> seatInfos = crService.selectImpossibleSeatInfo(theaterNo);

		return new Gson().toJson(seatInfos);
	}

	@ResponseBody
	@GetMapping(value = "ajaxReserveSeatInfo.co", produces = "application/json; charset-UTF-8")
	public String ajaxReserveSeatInfo(String cNo, String choiceDate, String schedule) {
		int concertNo = Integer.parseInt(cNo);

		ArrayList<Reserve> reSeatInfos = crService.selectReserveSeatInfo(concertNo, choiceDate, schedule);

		return new Gson().toJson(reSeatInfos);
	}

	@ResponseBody
	@GetMapping(value = "ajaxGradeSeatInfo.co", produces = "application/json; charset-UTF-8")
	public String ajaxGradeSeatInfo(String cNo, String choiceDate) {
		int concertNo = Integer.parseInt(cNo);

		ArrayList<Seat> grSeatInfos = crService.selectGradeSeatInfo(concertNo, choiceDate);

		return new Gson().toJson(grSeatInfos);
	}

	@ResponseBody
	@PostMapping(value = "kakaopay.co", produces = "application/json; charset-UTF-8")
	public ReadyResponse kakaopay(String rids, String concertTitle, String totalAmount , HttpSession session) {
		JsonObject totalObj = JsonParser.parseString(rids).getAsJsonObject();


		
		int userNo = Integer.parseInt(totalObj.get("userNo").getAsString());		
		int concertNo = Integer.parseInt(totalObj.get("concertNo").getAsString());
		String concertDate = totalObj.get("concertDate").getAsString();
		String schedule = totalObj.get("schedule").getAsString();
		String payMethod = totalObj.get("payMethod").getAsString();
		String recipientName = totalObj.get("recipientName").getAsString();
		String recipientPhone = totalObj.get("recipientPhone").getAsString();
		String recipientBirth = totalObj.get("recipientBirth").getAsString();
		String recipientEmail = totalObj.get("recipientEmail").getAsString();
		JsonArray seatListArray = totalObj.get("seatList").getAsJsonArray();
		
		 Gson gson = new Gson();
	     String seatListJson = gson.toJson(seatListArray);
	     String encodedSeatList = null;
	     String encodedEamil = null;
	     try {
			encodedSeatList = URLEncoder.encode(seatListJson, StandardCharsets.UTF_8.toString());
			encodedEamil = URLEncoder.encode(recipientEmail, StandardCharsets.UTF_8.toString());
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	     
	    System.out.println("인코딩 이메일"+encodedEamil);
	     
		String name = concertTitle;
        int totalPrice = Integer.parseInt(totalAmount);
        log.info("좌석 정보 : " + seatListJson);
        log.info("주문 상품 이름: " + name);
        log.info("주문 금액: " + totalPrice);
     
        session.setAttribute("userNo", userNo);
        session.setAttribute("recipientName", recipientName);
        session.setAttribute("recipientPhone", recipientPhone);
        session.setAttribute("recipientBirth", recipientBirth);
        session.setAttribute("recipientEmail", recipientEmail);
        
        
        // 카카오 결제 준비하기
        // Map을 이용해 파라미터를 저장
        Map<String, String> parameters = new HashMap<>();
        parameters.put("cid", "TC0ONETIME");                        
        parameters.put("partner_order_id", "1234567890");             
        parameters.put("partner_user_id", "roommake");                
        parameters.put("item_name", name);                           
        parameters.put("quantity", "1");                              
        parameters.put("total_amount", String.valueOf(totalPrice));   
        parameters.put("tax_free_amount", "0");                       
      
		parameters.put("approval_url", "http://localhost:8888/staez/success.co?"
				+ "&concertNo="+concertNo
				+ "&concertDate="+concertDate
				+ "&schedule="+schedule
				+ "&payMethod="+payMethod
				+ "&seatListArray="+encodedSeatList
				+ "&totalAmount="+String.valueOf(totalPrice));
	    
        parameters.put("cancel_url", "http://localhost:8888/staez/cancel.co");       
        parameters.put("fail_url", "http://localhost:8888/staez/fail.co");         

        // HttpHeaders(Spring Framework에서 제공하는 클래스)
        // HTTP 요청 헤더를 설정하는 객체이다 API호출 인증 정보나 HTTP요청의 컨텐츠 타입을 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "DEV_SECRET_KEY " + secretKey);
        headers.set("Content-type", "application/json");
        
        // HttpEntity(Spring Framework에서 제공하는 클래스)
        // HTTP 요청 또는 응답의 헤더와 바디를 포함하는 클래스이다.
        // 주로 RestTemplate를 사용하여 RESTful 웹 서비스를 호출할 때 요청의 바디와 헤더를 정의하는 데 사용
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(parameters, headers);

        // RestTemplate(Spring Framework에서 제공하는 클래스)
        // Rest 방식 API를 호출할 수 있는 Spring 내장 클래스
        // REST API 호출 이후 응답을 받을 때까지 기다리는 동기 방식 (json, xml 응답)
        RestTemplate template = new RestTemplate();
        String url = "https://open-api.kakaopay.com/online/v1/payment/ready";
        
        // ResponseEntity(Spring Framework에서 제공하는 클래스)
        // HTTP 응답을 나타내는 클래스로, 상태 코드, 헤더 및 응답 본문을 포함하여 외부 서비스에서 받은 응답을 처리하는 데 사용됩니다.
        ResponseEntity<ReadyResponse> responseEntity = template.postForEntity(url, requestEntity, ReadyResponse.class);
        log.info("결제준비 응답객체: " + responseEntity.getBody());

        ReadyResponse readyResponse = responseEntity.getBody();
        
        
     
        log.info("결제 고유번호: " + readyResponse.getTid());

		
        

//		try {
//			URL url = new URL("https://open-api.kakaopay.com/online/v1/payment/ready");
//
//			HttpURLConnection httpUrlConnection = (HttpURLConnection)url.openConnection();
//
//			httpUrlConnection.setRequestMethod("POST");
//			httpUrlConnection.setRequestProperty("Authorization","DEV_SECRET_KEY " + "secretKey");
//			httpUrlConnection.setRequestProperty("Content-Type", "application/json");
//			httpUrlConnection.setDoOutput(true);
//
//			String parameter = "cid=TC0ONETIME";
//			parameter += "&partner_order_id=partner_order_id";
//			parameter += "&partner_user_id=partner_user_id";
//			parameter += "&item_name=초코파이";
//			parameter += "&quantity=1";
//			parameter += "&total_amount=2200";
//			parameter += "&tax_free_amount=0";
//			parameter += "&approval_url=http://localhost:8888";
//			parameter += "&cancel_url=http://localhost:8888";
//			parameter += "&fail_url=http://localhost:8888";
//			OutputStream outputStream = httpUrlConnection.getOutputStream();
//			DataOutputStream dataOutputStream = new DataOutputStream(outputStream);
//			System.out.println(parameter);
//			dataOutputStream.writeBytes(parameter);
//			dataOutputStream.flush();
//			dataOutputStream.close();
//
//			int result = httpUrlConnection.getResponseCode();
//			InputStream inputStream;
//
//			if (result == 200) {
//				inputStream = httpUrlConnection.getInputStream();
//			} else {
//				inputStream = httpUrlConnection.getErrorStream();
//			}
//
//			InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
//		
//			BufferedReader br = new BufferedReader(inputStreamReader);
//		
//			return br.readLine();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}

		return responseEntity.getBody();
	}
	
	@GetMapping("success.co")
	public String kakaoSuccess(Model model, HttpSession session, String concertNo, String concertDate, String schedule, String payMethod, String seatListArray, String totalAmount) {
		
		JsonArray jsonArray = JsonParser.parseString(seatListArray).getAsJsonArray();
        
        // JsonArray를 문자열로 변환하여 모델에 담기
        String seatList = jsonArray.toString();
		
        int userNo = (int) session.getAttribute("userNo");
        String recipientName = (String) session.getAttribute("recipientName");
        String recipientPhone = (String) session.getAttribute("recipientPhone");
        String recipientBirth = (String) session.getAttribute("recipientBirth");
        String recipientEmail = (String) session.getAttribute("recipientEmail");
        
		System.out.println(seatList);
		model.addAttribute("userNo", userNo);
		model.addAttribute("concertNo", concertNo);
		model.addAttribute("concertDate", concertDate);
		model.addAttribute("schedule", schedule);
		model.addAttribute("payMethod", payMethod);
		model.addAttribute("recipientName", recipientName);
		model.addAttribute("recipientPhone", recipientPhone);
		model.addAttribute("recipientBirth", recipientBirth);
		model.addAttribute("recipientEmail", recipientEmail);
		model.addAttribute("seatList", seatList);
		model.addAttribute("totalAmount", totalAmount);
		
		session.removeAttribute("userNo");
		session.removeAttribute("recipientName");
	    session.removeAttribute("recipientPhone");
	    session.removeAttribute("recipientBirth");
	    session.removeAttribute("recipientEmail");
		
		return "concert/success";
	}
	
	@GetMapping("cancel.co")
	public String kakaoCancel() {
		return "concert/cancel";
	}
	
	@GetMapping("fail.co")
	public String kakaoFail() {
		return "concert/fail";
	}
	

}

package com.cst.demo.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cst.demo.po.User;
import com.cst.demo.services.impl.UsersService;
import com.cst.demo.util.UserInfoBean;

@Controller
public class ControllerUtil {
	
	@Autowired
	UsersService usersService;

	/**
	 * 修改密码业务,只做视图切换作用
	 * @param url
	 */
	@RequestMapping(value = ("/updateUserPwd.cst"), method = RequestMethod.GET)
	public String updateUserPwd() {
		return "/users/updateUserPwd";
	}
	/**
	 * 退出系统
	 * @param request
	 * @return
	 */
	@RequestMapping(value = ("/quitSys.cst"), method = RequestMethod.GET)
	public String quitSys(HttpServletRequest request) {
		UserInfoBean userInfoBean = (UserInfoBean) request.getSession().getAttribute("loginUser");
		usersService.updateUserIsonline(new User(userInfoBean.getUser_id(),1));//设置用户离线
		request.getSession().removeAttribute("loginUser");
		return "login";
	}
	
}

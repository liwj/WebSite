package com.cst.demo.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.cst.demo.dao.UserBeanDao;
import com.cst.demo.services.IUserBeanService;
import com.cst.demo.util.PageBean;
import com.cst.demo.util.UserInfoBean;

/**
 * @author Administrator
 *
 */
public class UserBeanService implements IUserBeanService {
	
	@Autowired
	UserBeanDao userBeanDao;
	
	@Override
	public List<UserInfoBean> findAllUserBean(PageBean pageBean) {
		return userBeanDao.findAllUserBean(pageBean);
	}

	@Override
	public UserInfoBean findUserBean(String userId) {
		return userBeanDao.findUserBean(userId);
	}
	
	public int findUserCount(){
		return userBeanDao.findUserCount();
	}
	
}

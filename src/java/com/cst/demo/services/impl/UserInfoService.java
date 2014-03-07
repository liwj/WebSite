package com.cst.demo.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.cst.demo.dao.UserInfoDao;
import com.cst.demo.po.UserInfo;
import com.cst.demo.services.IUserInfoService;
import com.cst.demo.util.UserInfoBean;

/**
 * @author Administrator
 *
 */
public class UserInfoService implements IUserInfoService {

	@Autowired
	UserInfoDao userInfoDao;
	
	@Override
	public List<UserInfoBean> findAllUser() {
		return userInfoDao.findAllUser();
	}

	@Override
	public boolean saveUserInfo(UserInfo info) {
		boolean flag=false;
		try {
			userInfoDao.saveUserInfo(info);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public boolean deleteUserInfo(String[] uid) {
		boolean flag=false;
		try {
			userInfoDao.deleteUserInfo(uid);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public boolean updateUserInfo(UserInfo info) {
		boolean flag=false;
		try {
			userInfoDao.updateUserInfo(info);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
		
	}

	@Override
	public UserInfoBean findUserData(String uid) {
		return userInfoDao.findUserData(uid);
	}

}

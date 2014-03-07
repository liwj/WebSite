package com.cst.demo.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cst.demo.dao.UsersDao;
import com.cst.demo.po.User;
import com.cst.demo.services.IUsersService;

/**
 * @author Administrator
 *
 */
 @Service
public class UsersService implements IUsersService {

	 @Autowired
	 UsersDao usersDao;
	 
	@Override
	public User find(User user) {
		return usersDao.find(user);
	}

	@Override
	public boolean deleteUser(String[] uid) {
		boolean flag=false;
		try{
			usersDao.deleteUser(uid);
			flag=true;
		}catch(Exception e){
			
		}
		return flag;
	}

	@Override
	@Transactional()
	public boolean saveUser(User user) {
		boolean flag = false;
		try {
			usersDao.saveUser(user);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	@Transactional
	public boolean updateUser(User user) {
		boolean flag = false;
		try {
			usersDao.updateUser(user);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	@Transactional
	public boolean updatePwd(User user) {
		boolean flag=false;
		try {
			usersDao.updatePwd(user);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public boolean updateUserIsonline(User user) {
		boolean flag=false;
		try {
			usersDao.updateUserIsonline(user);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public boolean resetPassword(String[] ids) {
		boolean flag=false;
		try {
			usersDao.resetPassword(ids);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public boolean checkLoginName(String loginName) {
		return 	usersDao.checkLoginName(loginName)==null?false:true;
	}
}

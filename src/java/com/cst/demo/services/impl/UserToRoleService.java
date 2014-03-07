package com.cst.demo.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import com.cst.demo.dao.UserToRoleDao;
import com.cst.demo.po.UserToRole;
import com.cst.demo.services.IUserToRoleService;

/**
 * @author Administrator
 *
 */

public class UserToRoleService implements IUserToRoleService {

	@Autowired
	UserToRoleDao userToRoleDao;

	@Override
	public String findUserRole(String uid) {
		return userToRoleDao.findUserRole(uid);
	}

	@Override
	public boolean saveRole(UserToRole role) {
		boolean flag = false;
		try {
			userToRoleDao.saveRole(role);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public boolean updateRole(UserToRole role) {
		boolean flag = false;
		try {
			userToRoleDao.updateRole(role);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public boolean deleteUserRole(String[] id) {
		boolean flag = false;
		try {
			userToRoleDao.deleteUserRole(id);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

}

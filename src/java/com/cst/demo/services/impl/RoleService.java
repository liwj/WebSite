package com.cst.demo.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.cst.demo.dao.RoleDao;
import com.cst.demo.po.Role;
import com.cst.demo.services.IRoleService;
import com.cst.demo.util.PageBean;

/**
 * @author Administrator
 *
 */
public class RoleService implements IRoleService {

	@Autowired
	RoleDao roleDao;

	@Override
	public List<Role> findAllRole() {
		return roleDao.findAllRole();
	}

	@Override
	public boolean addRole(Role role) {
		boolean flag=false;
		try {
			roleDao.addRole(role);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public List<Role> findRole(PageBean pageBean) {
		return roleDao.findRole(pageBean);
	}

	@Override
	public int findRoleCount() {
		return roleDao.findRoleCount();
	}
}

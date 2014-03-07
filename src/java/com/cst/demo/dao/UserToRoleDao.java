package com.cst.demo.dao;

import com.cst.demo.po.UserToRole;

/**
 * @author Administrator
 * 用户关系映射持久化类
 */
public interface UserToRoleDao {
	
	/**
	 * 查询用户角色
	 * @return 用户id
	 */
	String findUserRole(String uid);
	
	/**
	 * 新增用户角色
	 * @param role
	 */
	void saveRole(UserToRole role);
	
	/**
	 * 修改用户角色
	 * @param role
	 */
	void updateRole(UserToRole role);
	 /**
	 * @param uid
	 */
	void deleteUserRole(String[] uid);
}

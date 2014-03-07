package com.cst.demo.dao;

import com.cst.demo.po.User;

/**
 * @author Administrator
 * 
 */
public interface UsersDao {
	/**
	 * 查询用户
	 * @param user
	 * @return 
	 */
	User find(User user);
	
	/**
	 * 删除用户
	 * @param uid
	 */
	void deleteUser(String[] uid);
	/**
	 * 添加用户
	 * @param user
	 */
	void saveUser(User user);
	
	/**
	 * 更新密码
	 * @param pwd
	 */
	void updatePwd(User user);	
	
	/**
	 * 更新用户（用户的名字和是否禁用状态）
	 * @param user
	 */
	void updateUser(User user);
	
	/**
	 * 更新用户是否在线的状态
	 * @param user
	 */
	void updateUserIsonline(User user);
	
	/**
	 * 重置密码
	 * @param ids
	 */
	void resetPassword(String[] ids);
	
	/**
	 * 验证用户名
	 * @param loginName
	 */
	String checkLoginName(String loginName);
	
}

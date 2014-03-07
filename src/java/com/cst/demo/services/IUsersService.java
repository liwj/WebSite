package com.cst.demo.services;

import org.springframework.stereotype.Service;

import com.cst.demo.po.User;

/**
 * @author Administrator
 *
 */
@Service
public interface IUsersService {
	/**
	 * user login
	 * @param user
	 * @return
	 */
	User find(User user);
	
	
	/**
	 * 删除用户
	 * @param uid
	 * @return
	 */
	boolean deleteUser(String[] uid);
	
	/**
	 * 添加用户
	 * @param user
	 * @return
	 */
	boolean saveUser(User user);
	
	/**
	 * 修改用户（用户名和是否禁用状态）
	 * @param user
	 * @return
	 */
	boolean updateUser(User user);
	
	/**
	 * 更新密码
	 * @param pwd
	 * @return
	 */
	boolean updatePwd(User user);
	
	/**
	 * 更新用户是否在线的状态
	 * @param user
	 */
	boolean updateUserIsonline(User user);
	
	/**
	 * 重置密码
	 * @param ids
	 * @return
	 */
	boolean resetPassword(String[] ids);
	
	/**
	 * 验证用户名
	 * @param loginName
	 * @return
	 */
	boolean checkLoginName(String loginName);
}

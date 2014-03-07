package com.cst.demo.dao;

import java.util.List;

import com.cst.demo.po.UserInfo;
import com.cst.demo.util.UserInfoBean;

/**
 * @author Administrator
 * 
 */
public interface UserInfoDao {
	/**
	 * 根据userId获取用户基本信息
	 * @param userId 用户id
	 * @return
	 */
	UserInfo find(String userId);
	
	
	/**
	 * 访问用户信息（包括用户部门等）
	 * @return
	 */
	List<UserInfoBean> findAllUser();
	
	/**
	 * 添加用户
	 * @param userInfo
	 */
	void saveUserInfo(UserInfo userInfo);
	
	/**
	 * 删除用户
	 * @param uid
	 */
	void deleteUserInfo(String[] uid);
	
	/**
	 * 更新用户
	 * @param uid
	 */
	void updateUserInfo(UserInfo info);
	
	/**
	 * 根据用户查询用户基本信息（包括用户部门等。）
	 * @param uid
	 * @return
	 */
	UserInfoBean findUserData(String uid);
}

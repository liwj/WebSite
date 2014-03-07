package com.cst.demo.dao;

import java.util.List;

import com.cst.demo.util.PageBean;
import com.cst.demo.util.UserInfoBean;

/**
 * @author Administrator
 * 用户信息数据访问类，
 */
public interface UserBeanDao {
	
	/**
	 * 根据用户的ID查询用户
	 * @param userId 用户id
	 * @return 
	 */
	UserInfoBean findUserBean(String userId);
	
	/**
	 * 分页查询所有用户信息
	 * @return 
	 */
	List<UserInfoBean> findAllUserBean(PageBean pageBean);
	/**
	 * 查询用户的数据数目
	 * @return
	 */
	int findUserCount();
	
	
	
}

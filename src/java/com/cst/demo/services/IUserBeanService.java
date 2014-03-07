package com.cst.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cst.demo.util.PageBean;
import com.cst.demo.util.UserInfoBean;

/**
 * @author Administrator
 *
 */
@Service
public interface IUserBeanService {
	/**
	 * 根据用户的ID查询用户
	 * @param userId 用户id
	 * @return 
	 */
	UserInfoBean findUserBean(String userId);
	
	/**
	 * 查询所有用户信息
	 * @return 
	 */
	List<UserInfoBean> findAllUserBean(PageBean pagebean);
	
	/**
	 * 查询用户的数据数
	 * @return
	 */
	int findUserCount();
}

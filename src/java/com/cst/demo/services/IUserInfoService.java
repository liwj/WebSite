package com.cst.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cst.demo.po.UserInfo;
import com.cst.demo.util.UserInfoBean;

/**
 * @author Administrator
 *
 */
@Service
public interface IUserInfoService {

	/**
	 * 访问所有用户信息
	 * @return 用户信息bean
	 */
	List<UserInfoBean> findAllUser();
	
	/**
	 * 保存用户资料
	 * @param info
	 * @return
	 */
	@Transactional
	boolean saveUserInfo(UserInfo info);
	
	/**
	 * 删除用户资料
	 * @param userInfoId
	 * @return
	 */
	boolean deleteUserInfo(String[] uid);
	
	/**
	 * 修改用户资料
	 * @param info
	 * @return
	 */
	boolean updateUserInfo(UserInfo info);
	
	/**
	 * 根据用户id查询用户基本信息
	 * @param uid
	 * @return
	 */
	UserInfoBean findUserData(String uid);
	
	
}

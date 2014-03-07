package com.cst.demo.services;

import org.springframework.stereotype.Service;

import com.cst.demo.po.UserToRole;

/**
 * @author Administrator
 * 用户角色关系
 */
@Service
public interface IUserToRoleService {	
	
	/**
	 * 根据用户id查询用户角色
	 * @param uid 用户id
	 * @return 用户角色编号
	 */
	String findUserRole(String uid);
	/**
	 * 新增用户角色
	 * @param role
	 * @return
	 */
	boolean saveRole(UserToRole role);
	/**
	 * 更新用户角色
	 * @param role
	 * @return
	 */
	boolean updateRole(UserToRole role);
	
	/**
	 * 删除用户角色
	 * @param id
	 * @return
	 */
	boolean deleteUserRole(String[] id);
}

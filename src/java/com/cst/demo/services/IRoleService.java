package com.cst.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cst.demo.po.Role;
import com.cst.demo.util.PageBean;

/**
 * @author Administrator
 * 角色
 */
@Service
public interface IRoleService {
	/**
	 * 访问所有的角色
	 * @return
	 */
	List<Role> findAllRole();
	
	/**
	 * @param role
	 * @return
	 */
	boolean addRole(Role role);
	
	/**
	 * @param pageBean
	 * @return
	 */
	List<Role> findRole(PageBean pageBean);
	
	/**
	 * 总数据条数
	 * @return
	 */
	int findRoleCount();
	
}

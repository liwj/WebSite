package com.cst.demo.dao;

import java.util.List;

import com.cst.demo.po.Role;
import com.cst.demo.util.PageBean;

/**
 * @author Administrator
 *
 */
public interface RoleDao {
	
	/**
	 * 查询所有角色
	 * @return 角色集合
	 */
	public List<Role> findAllRole();
	
	void addRole(Role role);
	
	List<Role> findRole(PageBean pageBean);
	
	
	/**
	 * 总数据条数
	 * @return
	 */
     int findRoleCount();
}

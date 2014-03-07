package com.cst.demo.dao;

import java.util.List;

import com.cst.demo.po.Dept;
import com.cst.demo.po.Menu;

/**
 * @author Administrator
 * 
 */
public interface MenuDao {
	/**
	 * 跟据菜单id获取菜单信息
	 * @param id 
	 * @return 
	 */
	List<Menu> findSub(String id);
	
	/**
	 * 获取所有菜单信息
	 * @return
	 */
	List<Menu> findAll();
	
	/**
	 * 根据角色id查询菜单
	 * @return
	 */
	List<Menu> findMenuByRole(String roleId);
	
	List<Dept> findDepts();
	
	
}

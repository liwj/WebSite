package com.cst.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cst.demo.po.Menu;

/**
 * @author Administrator
 * 
 */
@Service
public interface IMenuService {
	/**
	 * 根据父级ID菜单的查询菜单
	 * @param menuSuper 菜单的父级ID
	 * @return 菜单集合
	 */
	List<Menu> findMenu(String menuSuper);	
	
	/**
	 * 获取所有菜单信息
	 * @return 
	 */
	List<Menu> findAll();
	
}

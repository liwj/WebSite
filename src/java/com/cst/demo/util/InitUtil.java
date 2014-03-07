package com.cst.demo.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;

import com.cst.demo.dao.DeptDao;
import com.cst.demo.dao.MenuDao;
import com.cst.demo.dao.RoleDao;
import com.cst.demo.po.Menu;
import com.cst.demo.po.Role;

/**
 * @author Administrator 初始化菜单
 */
public class InitUtil implements InitializingBean {

	/**
	 * 菜单map集合，key:role_id用户角色id,value:菜单集合
	 */
	public static Map<String, ArrayList<Menu>> menuList = new HashMap<String, ArrayList<Menu>>();

	// 菜单
	@Autowired
	MenuDao menuDao;
	// 角色
	@Autowired
	RoleDao roleDao;
	@Autowired
	DeptDao deptDao;
	PageBean bean = new PageBean();
	// 部门
	@Override
	public void afterPropertiesSet() throws Exception {
		InitUtil.menuList = this.initMenu();
		roleDao.findRoleCount();
	}

	/**
	 * 初始化角色匹配的菜单
	 * @return
	 */
	private Map<String, ArrayList<Menu>> initMenu() {
		Map<String, ArrayList<Menu>> menuList= new HashMap<String, ArrayList<Menu>>();
		// 所有角色
		List<Role> roles = roleDao.findAllRole();
		for (Role role : roles) {
			List<Menu> menus = menuDao.findMenuByRole(role.getRole_id());
			menuList.put(role.getRole_id(), (ArrayList<Menu>) menus);
		}
		return menuList;
	}
}

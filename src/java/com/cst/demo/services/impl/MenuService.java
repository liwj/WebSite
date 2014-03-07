package com.cst.demo.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cst.demo.dao.MenuDao;
import com.cst.demo.po.Menu;
import com.cst.demo.services.IMenuService;

/**
 * @author Administrator
 * 
 */
@Service
public class MenuService implements IMenuService {
	
	@Autowired
	MenuDao menuDao;
	
	@Override
	public List<Menu> findMenu(String menuSuper) {
		return menuDao.findSub(menuSuper);
	}

	@Override
	public List<Menu> findAll() {
		return  menuDao.findAll();
	}
}

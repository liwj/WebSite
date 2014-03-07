package com.cst.demo.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.cst.demo.dao.DeptDao;
import com.cst.demo.po.Dept;
import com.cst.demo.services.IDeptService;
import com.cst.demo.util.PageBean;

/**
 * @author Administrator
 *
 */
public  class DeptService implements IDeptService {
	
	@Autowired
	DeptDao  deptDao;
	
	@Override
	public List<Dept> findAllDept() {
		return deptDao.findDepts();
	}

	@Override
	public boolean saveDept(Dept dept) {
		boolean flag = false;
		try {
			deptDao.saveDept(dept);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public boolean deleteDept(String[] ids) {
		boolean flag = false;
		try {
			deptDao.deleteDept(ids);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public Dept findDeptById(Integer deptId) {
		return deptDao.findDeptById(deptId);
	}

	@Override
	public boolean updateDept(Dept dept) {
		boolean flag = false;
		try {
			deptDao.updateDept(dept);
			flag=true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public List<Dept> findDeptBySuper(Integer superId) {
		return deptDao.findDeptBySuper(superId);
	}

	@Override
	public int findDeptCount() {
		return deptDao.findDeptCount();
	}

	@Override
	public List<Dept> findDept(PageBean pageBean) {
		return deptDao.findDept(pageBean);
	}

}

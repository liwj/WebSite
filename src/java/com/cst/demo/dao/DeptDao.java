package com.cst.demo.dao;

import java.util.List;

import com.cst.demo.po.Dept;
import com.cst.demo.util.PageBean;

/**
 * @author Administrator
 * 部门数据访问类
 */
public interface DeptDao {
	
	/**
	 * 查询所有的部门
	 * @return
	 */
	List<Dept> findDepts();
	
	/**
	 * 添加部门
	 * @param dept
	 */
	void saveDept(Dept dept);
	
	/**
	 * 删除部门
	 * @param ids
	 */
	void deleteDept(String[] ids);
	
	/**
	 * 查询一个部门的信息
	 * @param deptId 部门id
	 * @return
	 */
	Dept findDeptById(Integer deptId);
	/**
	 * 修改部门信息
	 * @param dept
	 */
	void updateDept(Dept dept);
	
	/**
	 * 根据部门的父级id查询子级部门
	 * @param superId 父级部门id
	 * @return
	 */
	List<Dept> findDeptBySuper(Integer superId);
	
	/**
	 * 查询部门的总数据数
	 * @return
	 */
	int findDeptCount();
	/**
	 * 分页查询部门数据
	 * @param pageBean
	 * @return
	 */
	List<Dept> findDept(PageBean pageBean);
}

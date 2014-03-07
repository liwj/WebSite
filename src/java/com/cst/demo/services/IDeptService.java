package com.cst.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cst.demo.po.Dept;
import com.cst.demo.util.PageBean;

/**
 * @author Administrator
 *
 */
@Service
public interface IDeptService {
	/**
	 * 查询所有部门
	 * @return
	 */
	List<Dept> findAllDept();
	
	/**
	 * 添加新部门
	 * @param dept
	 * @return
	 */
	boolean saveDept(Dept dept);
	
	/**
	 * 删除部门
	 * @param ids
	 * @return
	 */
	boolean deleteDept(String [] ids);
	/**
	 * 查询一个部门的信息
	 * @param deptId 部门id
	 * @return
	 */
	Dept findDeptById(Integer deptId);
	
	/**
	 * 修改部门信息
	 * @param dept 部门
	 * @return
	 */
	boolean updateDept(Dept dept);
	
	/**
	 * 根据部门的父级id查询子级部门
	 * @param superId 父级部门id
	 * @return
	 */
	List<Dept> findDeptBySuper(Integer superId);
	
	/**
	 * 部门的总数据条数
	 * @return 
	 */
	int findDeptCount();
	/**
	 * 分页查询部门信息
	 * @param pageBean
	 * @return
	 */
	List<Dept> findDept(PageBean pageBean);
}

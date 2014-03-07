package com.cst.demo.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cst.demo.po.Dept;
import com.cst.demo.services.IDeptService;
import com.cst.demo.services.impl.RoleService;
import com.cst.demo.util.PageBean;

/**
 * @author Administrator
 * 部门业务控制器
 */
@Controller
public class DeptController {
	
	@Autowired
	IDeptService deptService;
	@Autowired
	RoleService roleService;
	
	/**
	 * 请求部门信息
	 * @param model
	 */
	@RequestMapping(value="/addUser.cst",method = RequestMethod.GET)
	public String findDept(Model model){
		model.addAttribute("depts", deptService.findAllDept());
		model.addAttribute("roles", roleService.findAllRole());
		return "/users/addUser";
	}
	/**
	 * 跳转到部门管理
	 */
	@RequestMapping(value="/deptManage.cst",method = RequestMethod.GET)
	public String deptManage(int pageIndex,Model model){
		PageBean pageBean = new PageBean();
		pageBean.setPageIndex(pageIndex);
		int count = deptService.findDeptCount();//数据总的条数
		int sum = count/PageBean.pageSize;
		int pageNum = sum%PageBean.pageSize == 0?sum:sum+1;
		model.addAttribute("pageNum", pageNum);
		model.addAttribute("page", pageBean);//分页实体bean
		model.addAttribute("depts", deptService.findDept(pageBean));
//		model.addAttribute("depts", deptService.findAllDept());
		return "/users/deptManage";
	}
	/**
	 * 跳转到新增部门页面
	 */
	@RequestMapping(value="/addDept.cst",method = RequestMethod.POST)
	public String addDept(Model model){
		model.addAttribute("depts", deptService.findAllDept());
		return "/users/addDept";
	}
	/**
	 * 添加新部门
	 */
	@RequestMapping(value="/saveDept.cst",method = RequestMethod.POST)
	public @ResponseBody String saveDept(Dept dept){
		if(deptService.saveDept(dept))
			return "ok";
		return "error";
		
	}
	/**
	 * 删除部门信息
	 */
	@RequestMapping(value="/deleteDept.cst",method = RequestMethod.POST)
	public String deleteDept(String uid,Model model) {
		String[] ids = uid.split(":");
		deptService.deleteDept(ids);
		model.addAttribute("depts", deptService.findAllDept());
		return "/users/deptManage";
	}
	
	/**
	 * 显示一个部门信息
	 * @param id 部门id
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/showDept.cst",method = RequestMethod.POST)
	public String showDept(String id,Model model){
		Integer deptId = Integer.parseInt(id);
		model.addAttribute("deptInfo", deptService.findDeptById(deptId));
		return "/users/editDeptInfo";
	}
	/**
	 * 修改部门信息
	 * @param dept
	 * @return
	 */
	@RequestMapping(value="/editDept.cst",method = RequestMethod.POST)
	public @ResponseBody String editDept(Dept dept){
		dept.setUpdatetime(new Date());
		if(deptService.updateDept(dept))
			return "ok";
		return "error";
	}
	
	/**
	 * 在为用户选择部门时显示部门信息
	 * @return
	 */
	@RequestMapping(value="/selDept.cst",method=RequestMethod.POST)
	public String selDept(Model model){
		model.addAttribute("depts", deptService.findAllDept());
		return "/users/selDept";
	}
}

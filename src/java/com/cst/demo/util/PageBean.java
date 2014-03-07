
package com.cst.demo.util;

public class PageBean {
	public static final int pageSize = 10;//每页显示的数据数
	private int pageIndex = 1;//当前页
	private int startResult = 1;//开始索引
	private int endResult;//结束索引
	
	public void setStartResult(int startResult) {
		this.startResult = startResult;
	}
	public void setEndResult(int endResult) {
		this.endResult = endResult;
	}
	public static int getPagesize() {
		return pageSize;
	}
	public int getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}
	public int getStartResult() {
		return pageSize*pageIndex;
	}
	
	public int getEndResult() {
		return pageSize*(pageIndex-1);
	}
 }

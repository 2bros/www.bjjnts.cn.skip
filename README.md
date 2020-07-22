## [北京市职业技能提升行动管理平台](https://www.bjjnts.cn/)(https://www.bjjnts.cn/) 刷课脚步

> 适用网站：[北京市职业技能提升行动管理平台](https://www.mdeditor.com/)

> 网址：https://www.bjjnts.cn/

> 脚步运行环境：浏览器JS

# 一、实现功能
秒刷课程，执行代码后，把一个目录下的课程全部刷完，变成100%。

# 二、说明
不需要等待课程视频全部播放完，甚至不需要播放视频，复制粘贴，代码一执行，等几秒钟，一个目录下的课程就刷完了。

# 三、操作
1 用浏览器打开要刷的课程页面，例如 https://www.bjjnts.cn/lessonStudy/210/4596 页面内容为第一个视频课程等待播放，其后还有多个视频等待播放。
2 浏览器打开【开发者工具】，谷歌浏览器chrome可按快捷键： windows: `Ctrl+Shift+I` mac: `command+option+I`。
3 在开发者工具中切换到`console`控制台，在`>`符号后面复制输入以下代码回车执行。
4 这时可以看到`XHR finished loading: POST ...`的字符会出现，该目录下的课程越多，出现的数量就越多。不要急于关掉浏览器页面，等这些字符不再改变增加，就代表脚步执行完了。一般都是几秒钟。其实这时候就OK了，只是还需要等1-5分钟，刷新几下页面，就可以看到该页面下的所有课程都变成了100%。

# 四、代码
```javascript
;(()=>{
	var chapter=location.pathname.replace(/\/\D+\/|\/\d+$/mg,'');
	$('.course_study_videomenu .change_chapter').each((i, o)=>{
		var id=$(o).attr('data-lessonid');
		var timestr=$(o).find('.course_study_menudate')[0].textContent;
		var duration=timestr.replace(/\(|:.*/mg,'')*60*60+timestr.replace(/\(\d\d:|:\d\d\)/mg,'')*60+parseInt(timestr.replace(/\(\d\d:\d\d:|\)/mg,''));
		$.post(id).then(()=>{
			$.post('/editVideoChapter/'+chapter+'/'+id, {duration}).then(()=>{
				$.post('/addstudentTaskVer2/'+chapter+'/'+id, {learnTime: duration});
			});
		});
	});
})();
```
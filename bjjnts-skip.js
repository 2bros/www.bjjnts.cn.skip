/**
 * author: 肖
 * 浏览器端刷课脚步
 * /

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
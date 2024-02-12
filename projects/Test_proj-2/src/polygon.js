//trace polygon
// Fonction pour vérifier si un point est à l'intérieur d'un polygone
function isPointInsidePolygon(pt, polygon) {
	var x = pt[0], y = pt[1];
	var inside = false;
	for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		var xi = polygon[i][0], yi = polygon[i][1];
		var xj = polygon[j][0], yj = polygon[j][1];

		var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    	if (intersect) inside = !inside;
	}
	return inside;
}
function pointInRectangle(pointX, pointY, rectX, rectY, rectWidth, rectHeight) {
    return pointX >= rectX && pointX <= rectX + rectWidth &&
           pointY >= rectY && pointY <= rectY + rectHeight;
}
var Draw_contour = true;
var Show_points = true;
var Grab_points = false;
var Delete_contour = false;
var refPoints = [];
var grabbingOn=false;
var graghold = {
	indexBox:0,
	indexPoint:0
}

function DrawOnePolygon(pol,colStroke='purple'){
	if (Show_points) {
		ctx.beginPath();
		ctx.moveTo(pol[0][0],pol[0][1]);
		for (var i = 1; i < pol.length; i++) {
			ctx.lineTo(pol[i][0],pol[i][1]);
		}
		ctx.lineTo(pol[0][0],pol[0][1]);
		ctx.closePath();
		ctx.strokeStyle = colStroke;
		ctx.lineWidth = pixLine;
		ctx.stroke();
		for (var i = 0; i < pol.length; i++) {
			ctx.fillStyle = 'red';
			var xx = pol[i][0] - ctx.lineWidth*2;
			var yy = pol[i][1] - ctx.lineWidth*2;
			ctx.fillRect(xx, yy, pixLine*4, pixLine*4);
		}
	} else {
		ctx.beginPath();
		ctx.moveTo(pol[0][0],pol[0][1]);
		for (var i = 1; i < pol.length; i++) {
			ctx.lineTo(pol[i][0],pol[i][1]);
		}
		ctx.lineTo(pol[0][0],pol[0][1]);
		ctx.closePath();

		ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'; // Couleur de remplissage avec transparence
		ctx.fill();

		ctx.strokeStyle = colStroke;
		ctx.lineWidth = pixLine;
		ctx.stroke();
	}
	
}
function DrawAllSavedBBox(){
	ctx.clearRect(0,0,size.width,size.height)
	ctx.lineWidth = pixLine;
	ctr.lineWidth = pixLine;
	console.lo
	for (var i = 0; i < data.annotations[index].length; i++) {
		DrawOnePolygon(data.annotations[index][i].points)
	}
	if (refPoints.length>0) {
		DrawOnePolygon(refPoints)
	}
}
app.addEventListener('mousemove', (event) => {
	//document.querySelector('.devview').innerHTML = 'Mouse('+(event.clientX)+', '+event.clientY+')';
	DrawAllSavedBBox()
});
app.addEventListener('mouseleave', (event) => {
	//document.querySelector('.devview').innerHTML = '';
	DrawAllSavedBBox()
});
document.querySelector('#hidePoints').addEventListener('click',(e)=>{
    e.preventDefault()
    if (Show_points) {Show_points=false;} else {Show_points=true;}
    DrawAllSavedBBox()
})
function PencilHandle(){
    if (Draw_contour) {
    	Draw_contour=false;
    	if (refPoints.length>2) {
    		const ann = {
    			points: refPoints,
    			label: 'wall_art',
    			id:0
    		}
    		data.annotations[index].push(ann)
    	} else {}
    	refPoints = [];
    	Draw_contour=false;
    } else {
    	Draw_contour=true;
    }
    DrawAllSavedBBox()
}
function DeleteContourHandle(){
	if (!Delete_contour) {
		Delete_contour=true;
		Draw_contour=false;
	}
}
function SaveBoxHandle(){
	//alert('Points: '+refPoints.length)
	if (refPoints.length>2) {
		const ann = {
			points: refPoints,
			label: 'wall_art',
			id:0
		}
		data.annotations[index].push(ann);
		refPoints = [];
	} else {
		alert('No area inside the box!')
	}
}
document.querySelector('#deleteContour').addEventListener('click',(e)=>{
    e.preventDefault()
    DeleteContourHandle()
})
document.querySelector('#pencil').addEventListener('click',(e)=>{
    e.preventDefault()
    PencilHandle()
})
document.querySelector('#assignLabel').addEventListener('click',(e)=>{
    e.preventDefault()
    SaveBoxHandle()
    document.querySelector('.devview').innerHTML = 'Box(es) Saved : '+data.annotations[index].length;
})
canvasPs.addEventListener('click',(e)=>{
    e.preventDefault()
    const pt = [e.offsetX,e.offsetY];
    var onbox=false;
    var ibox = null;
    var ipoint = null;
    var i_pt_cont = null;
    var onpoint = false; 
	for (var i = data.annotations[index].length - 1; i >= 0; i--) {
    	if (isPointInsidePolygon(pt,data.annotations[index][i].points)) {
    		onbox=true;
    		ibox = i;
    	}
    	for (var ii = 0; ii < data.annotations[index][i].points.length; ii++) {
    		
    		if (pointInRectangle(pt[0],pt[1],(data.annotations[index][i].points[ii][0]-pixLine*2),(data.annotations[index][i].points[ii][1]-pixLine*2),pixLine*4,pixLine*4)) {//function pointInRectangle(pointX, pointY, rectX, rectY, rectWidth, rectHeight) {}
    			onpoint=true;
				i_pt_cont = i;
				ipoint = ii;
				if(grabbingOn){
					grabbingOn=false;
				}else{
					graghold.indexBox = i;
					graghold.indexPoint = ii;
					grabbingOn=true;
				}
    		}
    	}
    }
    if (Draw_contour) {
    	if (e.shiftKey) {refPoints.pop();}else{refPoints.push(pt)}
    }else if (Delete_contour) {
    	console.log('onbox: '+onbox+' On:'+ibox)
    	if (isPointInsidePolygon(pt,refPoints)) {
    		var ConfDel = confirm("Careful: this will delete the current contour.\nDelete this contour?");
    		if (ConfDel) {
    			refPoints=[];
    		}
    	} else if(onbox) {
    		var ConfDel2 = confirm("Careful: this will delete the current contour.\nDelete this contour?");
    		if (ConfDel2) {
    			data.annotations[index].splice(ibox,1)
    		}
    	}
    	Delete_contour=false;
    } else {
    	if (onpoint) {
    		if (Grab_points) {
    			Grab_points=false;
    			canvasPs.style.cursor='grab';
    		} else {
    			Grab_points=true;
    			canvasPs.style.cursor='grabbing';
    			data.annotations[index][i_pt_cont].points[ipoint][0]=pt[0];
    			data.annotations[index][i_pt_cont].points[ipoint][1]=pt[1];
    		}
    	}
    }
    DrawAllSavedBBox()
})
canvasPs.addEventListener('mousemove',(e) => {
	e.preventDefault();
	const pt = [e.offsetX,e.offsetY];
	var onbox=false;
    var ibox = null;
    var ipoint = null;
    var i_pt_cont = null;
    var onpoint = false; 
	for (var i = data.annotations[index].length - 1; i >= 0; i--) {
    	if (isPointInsidePolygon(pt,data.annotations[index][i].points)) {
    		onbox=true;
    		ibox = i;
    	}
    	for (var ii = 0; ii < data.annotations[index][i].points.length; ii++) {
    		
    		if (pointInRectangle(pt[0],pt[1],(data.annotations[index][i].points[ii][0]-pixLine*2),(data.annotations[index][i].points[ii][1]-pixLine*2),pixLine*4,pixLine*4)) {//function pointInRectangle(pointX, pointY, rectX, rectY, rectWidth, rectHeight) {}
    			onpoint=true;
				i_pt_cont = i;
				ipoint = ii;
    		}
    	}
    }
    if (grabbingOn){
		onpoint=true;
		i_pt_cont = graghold.indexBox;
		ipoint = graghold.indexPoint;
	}
	if (Draw_contour) {
		canvasPs.style.cursor='pointer';
	} else if (Delete_contour) {
		canvasPs.style.cursor='default';
		if (onbox) {canvasPs.style.cursor='pointer';}
		if (isPointInsidePolygon(pt,refPoints)) {canvasPs.style.cursor='pointer';}
	}else{
		canvasPs.style.cursor='default';
		if (onpoint) {
			if (Grab_points) {
				canvasPs.style.cursor='grabbing';
				data.annotations[index][i_pt_cont].points[ipoint][0]=pt[0];
    			data.annotations[index][i_pt_cont].points[ipoint][1]=pt[1];
			} else {
				canvasPs.style.cursor='grab';
			}
		} else {}
	}
})
document.addEventListener('keydown', function(e) {
	//e.preventDefault();
	if (e.key=='Control') {//(e.keyCode==13)
		if (getSelectedOption('image_selected')!=undefined && document.querySelector('#tab2').style.display!='none') {
			PencilHandle()
		}
	} else {
	}
	console.log('Code de la touche :', e.keyCode,'\nTouche pressée :',e.key);
});
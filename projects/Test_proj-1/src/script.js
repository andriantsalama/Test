//script
var index=null;
var Submitable = false;
var Data_Ready = false;
document.addEventListener('DOMContentLoaded', function() {
	// Code à exécuter une fois que le DOM est complètement chargé
	//console.log('DOMContentLoaded');
	document.querySelector('.option_images').innerHTML='';
	//openTab('tab1')
	//if (data.images.length>0) {index=0;}
	//build_option_image(index)
	// Ajoutez votre code ici...
});
window.addEventListener('load', function() {
	// Code à exécuter une fois que la page et ses ressources associées sont complètement chargées
	//alert('La page et toutes les ressources sont chargées !');
	// Ajoutez votre code ici...
});
function build_option_image(ind){
	document.querySelector('.option_images').innerHTML='';
	//console.log('index: '+ index)
	//console.log('images: '+ data.images[index].length)
	var link2 = document.querySelector('#asin_link_2 a');
	var link1 = document.querySelector('#asin_link_1 a');
	link1.innerHTML = data.asins[ind];
	link1.href = 'https://www.amazon.'+data.location[ind]+'/dp/'+data.asins[ind];
	link2.innerHTML = data.asins[ind];
	link2.href = 'https://www.amazon.'+data.location[ind]+'/dp/'+data.asins[ind];
	for (var i = 0; i < data.images[ind].length; i++) {
		var lbl = document.createElement('label');
		var inp = document.createElement('input');
		var img = document.createElement('img');
		lbl.setAttribute('for','inl'+(i+1));
		inp.setAttribute('type','radio');
		inp.setAttribute('name','image_selected');
		inp.setAttribute('value',data.images[ind][i]);
		if (data.answer[ind].image_selected!=undefined) {
			if (data.images[ind][i]==data.answer[ind].image_selected) {
				inp.checked=true;
			} else {inp.checked=false;}
		}
		inp.id = 'inl'+(i+1);
		img.src = data.images[ind][i];
		img.id = 'i'+(i+1);
		img.setAttribute('width','200px');
		img.setAttribute('height','200px');
		lbl.appendChild(img)
		document.querySelector('.option_images').appendChild(inp)
		document.querySelector('.option_images').appendChild(lbl)
		img.setAttribute('onload','resizeSelect(this)')
	}
	image.src = '';
	openTab('tab1')
	if (document.querySelector('#candidate_id').value=='Admin') {reinitialize_view(ind)}
	
}
function reinitialize_view(ind){
	var ckbs = document.querySelectorAll('input[type="checkbox"]')
	ckbs.forEach((choice) => {choice.checked=false})
	var rads = document.querySelectorAll('input[type="radio"]')
	rads.forEach((choice) => {choice.checked=false})
	document.querySelector('#Width').value = '';
	document.querySelector('#Height').value = '';
	if (document.querySelector('#candidate_id').value=='Admin') {
		document.querySelector('#Width').value = data.answer[ind].Width;
		document.querySelector('#Height').value = data.answer[ind].Height;
		if (data.answer[ind].ASINLoad!=undefined) {
			var chcs = document.querySelectorAll('input[name="ASINLoad"]')
			chcs.forEach((choice) => {
				if (choice.value==data.answer[ind].ASINLoad) {
					choice.checked=true;
				}else{choice.checked=false;}
			})
		}
		if (data.answer[ind].correctMetric!=undefined) {//isLengthLessThanPoint2
			var chcs = document.querySelectorAll('input[name="correctMetric"]')
			chcs.forEach((choice) => {
				if (choice.value==data.answer[ind].correctMetric) {
					choice.checked=true;
				}else{choice.checked=false;}
			})
		}
		if (data.answer[ind].isLengthLessThanPoint2!=undefined) {//isLengthLessThanPoint2
			var chcs = document.querySelectorAll('input[name="isLengthLessThanPoint2"]')
			chcs.forEach((choice) => {
				if (choice.value==data.answer[ind].isLengthLessThanPoint2) {
					choice.checked=true;
				}else{choice.checked=false;}
			})
		}
		if (data.answer[ind].invalid_image!='') {
			if (data.answer[ind].invalid_image.includes("|")) {
				var invs = data.answer[ind].invalid_image.split("|");
				invs.forEach(function(element, index) {
					document.querySelector('input[value="'+element+'"]').checked=true;
				});
			} else {
				document.querySelector('input[value="'+data.answer[ind].invalid_image+'"]').checked=true;
			}
		} else {}
	}
}
function resizeSelect(XX){
	//var XX=document.getElementById(XXX)
	//console.log(XX);
	XX.style.width='200px';
	XX.style.height='auto';
	var w = XX.offsetWidth;
	var h = XX.offsetHeight;
	//console.log(XX.id+": "+'('+w+'*'+h+')');
	var it = Math.max(w,h)
	if (w==it) {
		XX.style.width='300px';
		XX.style.height='auto';
	} else {
		XX.style.height='300px';
		XX.style.width='auto';
	}
}
function telechargerEnFichierText(nomFichier,contenuFichier) {
	if (nomFichier!='.txt') {
		var blob = new Blob([contenuFichier], { type: "text/plain;charset=utf-8" });
		var lienTelechargement = document.createElement("a");
		lienTelechargement.href = URL.createObjectURL(blob);
		lienTelechargement.download = nomFichier;
		document.body.appendChild(lienTelechargement);
		lienTelechargement.click();
		document.body.removeChild(lienTelechargement);
	} else {
		alert('invalide filename!')
	}
}
function getSelectedOption(option) {
	const radioButtons = document.querySelectorAll('input[name="'+option+'"]');
	let selectedValue = "";
	radioButtons.forEach((radio) => {
		if (radio.checked) {
			selectedValue = radio.value;
		}
	});
	if (selectedValue) {
		return selectedValue;
	}
}
function getCheckedOption(option){//getCheckedOption('difference_type')
	const CheckButtons = document.querySelectorAll('input[name="'+option+'"]');
	let CheckValue = null;
	CheckButtons.forEach((choice) => {
		if (choice.checked) {
			if (CheckValue=='') {CheckValue = choice.value;} else {CheckValue += ','+choice.value;}
		}
	});
	return CheckValue;
}
var image = new Image();
const app = document.querySelector('.app');
var canvas = document.querySelector('.imgShow');
var canvasDr = document.querySelector('.draw');
var canvasPs = document.querySelector('.position');
var cti = canvas.getContext('2d');
var ctx = canvasDr.getContext('2d');
var ctr = canvasPs.getContext('2d');
ctx.strokeStyle = '#0026fcb5';
var scale = 1;
var pixLine = 2
var angle = 0;
var size = {
	top:10,
	left:10,
	width:0,
	height:0,
	iscale:1
}
var isRightClick = false;
var LastImageView = '';
function SetImageStep2(){
	image.src = '';
	if (document.querySelector('#candidate_id').value=='Admin') {
		document.querySelector('.navigation').style.display='flex';
		document.querySelector('.Submition').style.display='none';
		if (data.answer[index].image_selected!=undefined) {
			document.querySelector('input[value="'+data.answer[index].image_selected+'"]').checked=true;
		}
	}
	if (getSelectedOption('image_selected')!=undefined) {
		image.src = getSelectedOption('image_selected');
		image.onload = function() {
			ctx.lineWidth=pixLine;
			ctr.lineWidth=pixLine;
			//console.log('width: '+image.width + '\nheight: '+image.height );
			size.width = image.width;
			size.height = image.height;
			canvas.width=size.width;
			canvas.height=size.height;
			canvasDr.width=size.width;
			canvasDr.height=size.height;
			canvasPs.width=size.width;
			canvasPs.height=size.height;
			/*
			width: 864px;
			height: 695px;
			*/
			var max_WH = Math.max(image.width,image.height) 
			const iscale = 800/max_WH;
			size.iscale = iscale;
			if (LastImageView != image.src) {
				restoreContext()
			}
			// Dessinez l'image sur le canvas
			//document.querySelector('.infoDev').innerHTML = (scale*100).toFixed(0)+'%';
			cti.drawImage(image, 0, 0, image.width, image.height);
			DrawAllSavedBBox()
		};
	} else {
		cti.clearRect(0,0,canvas.width,canvas.height)
	}
}
setInterval(function () {
	Submitable_Check()
	LastImageView = image.src;
	if (index!=null) {
		if (LastImageView != getSelectedOption('image_selected')) {
			SetImageStep2()
		}
	}
}, 500);
function SetZoomOne(val){
	scale = val;
	canvas.style.transform = `scale(${scale})`;
	canvasDr.style.transform = `scale(${scale})`;
	canvasPs.style.transform = `scale(${scale})`;
	//document.querySelector('.infoDev').innerHTML = (scale*100).toFixed(0)+'%';
	DrawAllSavedBBox()
}
function SetLineWidthOne(val){
	pixLine = val;
	document.querySelector('.devview').innerHTML = 'lineWidth = '+pixLine;
	DrawAllSavedBBox()
}
document.querySelector('.app').addEventListener("wheel", (e) => {
	e.preventDefault();
	const container = document.querySelector('.app');
	// Calcule le facteur de zoom en fonction de la direction de la molette
	const zoomFactor = e.deltaY > 0 ? 0.95 : 1.05;
	const lineStep  = e.deltaY > 0 ? -1 : 1;

	if (e.shiftKey) {
		ctx.lineWidth += lineStep;
		SetLineWidthOne(ctx.lineWidth)
		//console.log(ctx.lineWidth)
	} else {
		ctr.clearRect(0,0,canvas.offsetWidth*1.5,canvas.offsetHeight*1.5);
		scale *= zoomFactor;
		SetZoomOne(scale)
	}
})//, { passive: true });
app.addEventListener('contextmenu',(e)=>{
	e.preventDefault();
})
canvasPs.addEventListener('mousedown', function (e) {
	if (e.button === 2) {
		isRightClick = true;
		// Récupérer la position initiale de la souris et de l'image
		var initialMouseX = e.clientX;
		var initialMouseY = e.clientY;
		var initialImageX = this.offsetLeft;
		var initialImageY = this.offsetTop;
		// Fonction pour mettre à jour la position de l'image
		var moveImage = function (event) {
			if (isRightClick) {
				var deltaX = event.clientX - initialMouseX;
				var deltaY = event.clientY - initialMouseY;
				// Mettre à jour la position de l'image en fonction du déplacement de la souris
				canvas.style.left = initialImageX + deltaX + 'px';
				canvas.style.top = initialImageY + deltaY + 'px';
				canvasDr.style.left = initialImageX + deltaX + 'px';
				canvasDr.style.top = initialImageY + deltaY + 'px';
				canvasPs.style.left = initialImageX + deltaX + 'px';
				canvasPs.style.top = initialImageY + deltaY + 'px';
			}
		};
		// Fonction pour arrêter le déplacement de l'image
		var stopMoving = function () {
			isRightClick = false;
			document.removeEventListener('mousemove', moveImage);
			document.removeEventListener('mouseup', stopMoving);
		};
		// Écouter les mouvements de la souris et le relâchement du bouton droit
		document.addEventListener('mousemove', moveImage);
		document.addEventListener('mouseup', stopMoving);
	}
});
function restoreContext(){
	console.log(size)
	var e_left = '10px';
	var e_top = '10px';
	var cenX = 432;
	var cenY = 347;
	var D_x = cenX - (size.width/2)
	var D_y = cenY - (size.height/2)
	e_left = D_x// + (size.width/2)*scale;
	e_top = D_y// + (size.height/2)*scale;
	scale = size.iscale;
	//console.log('Scale: '+scale);
	canvas.style = `transform: scale(${scale}); left: ${e_left}px; top: ${e_top}px;`;
	canvasDr.style = `transform: scale(${scale}); left: ${e_left}px; top: ${e_top}px;`;
	canvasPs.style = `transform: scale(${scale}); left: ${e_left}px; top: ${e_top}px;`;
}
canvasPs.addEventListener('mousemove',(e) => {
	e.preventDefault();
	/*const pt = {x: e.offsetX,y:e.offsetY}
	ctr.clearRect(0,0,canvas.offsetWidth*1.5,canvas.offsetHeight*1.5);
	ctr.strokeStyle = 'rgba(245, 40, 145, 0.99)';
	ctr.fillStyle = 'rgba(15, 72, 145, 0.99)';
	ctr.setLineDash([(ctx.lineWidth*1),(ctx.lineWidth*2)]);
	ctr.beginPath(); 
	ctr.moveTo(e.offsetX,0);
	ctr.lineTo(e.offsetX,canvas.offsetHeight*1.5);
	ctr.moveTo(0,e.offsetY);
	ctr.lineTo(canvas.offsetWidth*1.5,e.offsetY);
	ctr.stroke();
	ctr.beginPath(); 
	ctr.arc(pt.x, pt.y, ctr.lineWidth, 0, 2 * Math.PI)
	ctr.fill();
	ctr.closePath();//infoEvent
	//document.querySelector('.devview').innerHTML = 'Mouse('+e.offsetX+', '+e.offsetY+')';*/
})
app.addEventListener('mouseleave',(e) => {
	e.preventDefault();
	ctr.clearRect(0,0,canvas.offsetWidth*1.5,canvas.offsetHeight*1.5);
	document.querySelector('.devview').innerHTML = '';
})
app.addEventListener('mousemove',(e) => {
	e.preventDefault();
	var ox = e.clientX-app.offsetLeft;//
	var oy = e.clientY-app.offsetTop;//
	var mx = app.offsetWidth-app.offsetLeft;
	var my = app.offsetHeight-app.offsetTop;
	const pos = {
		x:ox,
		y:oy
	}
	document.querySelector('.devview').innerHTML = 'Mouse('+ox+', '+oy+')';
})
document.querySelector('#Slogin').addEventListener('click', (e) => {
	var id_c = document.querySelector('#candidate_id').value;
	var name_c = document.querySelector('#candidate_name').value;
	document.querySelector('#nm').innerHTML = '<b>'+name_c+'</b>';
	if (id_c.length!=6 || name_c=='') {
		if (id_c=='Admin') {
			document.querySelector('.Upload_file').style.display='flex';
			document.querySelector('.Admin').style.display='block';
			document.querySelector('.Login').style.display='none';
		} else {
			alert('Invalide ID or name!')
		}
	} else {
		document.querySelector('.Upload_file').style.display='flex';
		document.querySelector('.Members').style.display='block';
		document.querySelector('.Login').style.display='none';
	}
})
document.querySelector('#jsonFileInput').addEventListener('change', handleJsonInputChange)
function handleJsonInputChange(event) {
	const files = event.target.files;
	if (files.length > 0) {
		const file = files[0];
		const reader = new FileReader();
		reader.onload = function (e) {
			try {
				// Analyser le contenu du fichier en tant qu'objet JSON
				const jsonObject = JSON.parse(e.target.result);
				console.log(jsonObject)
				// Ajouter l'objet JSON au tableau
				for (let key in data) {
					if (key=='images' || key=='asins' || key=='location' || key=='annotations' || key=='answer') {
						data[key]=jsonObject[key];
					}
				}
				// Vous pouvez faire d'autres opérations ici avec l'objet JSON si nécessaire
				document.querySelector('.Identification_log').style.display='none';
				document.querySelector('.Submition').style.display='flex';
				document.querySelector('.left_side').style.display='flex';
				document.querySelector('.app').style.display='flex';

				if (data.images.length>0) {index=0;Data_Ready=true;}
				build_option_image(index)
				console.log(data)
			} catch (error) {
				console.error('Erreur lors de l\'analyse du fichier JSON:', error);
			}
		};
		// Lire le contenu du fichier en tant que texte
		reader.readAsText(file);
	}
}

function Submitable_Check(){
	var invalid_image_select = false;
	var annotation_draw = false;
	Submitable=false;
	invalide_str='';
	check_boxs = document.querySelectorAll('.image_not_loaded_or_valid')
	check_boxs.forEach((choice) => {
        if (choice.checked) {
        	invalid_image_select = true;
        	if (invalide_str=='') {
        		invalide_str = choice.value;
        	} else {
        		invalide_str += '|'+choice.value;
        	}
        }
    });
    if (Data_Ready) {
	    if (invalid_image_select) {
	    	Submitable=true;
	    } else {
	    	if (data.annotations[index].length>0 && getSelectedOption('ASINLoad')!=undefined && getSelectedOption('correctMetric')!=undefined && getSelectedOption('image_selected')!='') {
	    		Submitable=true;
	    	}
	    }
	}
    if (Submitable) {
    	document.querySelector('#Submit_hit').disabled=false;
    }else{
    	document.querySelector('#Submit_hit').disabled=true;
    }
}
document.querySelector('#Submit_hit').addEventListener('click', handleSendHit)
function handleSendHit(){
    var answer = {
		invalid_image:invalide_str,
		ASINLoad:getSelectedOption('ASINLoad'),
		Height:document.querySelector('#Height').value,
		Width:document.querySelector('#Width').value,
		correctMetric:getSelectedOption('correctMetric'),
		isLengthLessThanPoint2:getSelectedOption('isLengthLessThanPoint2'),
		image_selected:getSelectedOption('image_selected')
	}
	if (Submitable) {
		data.answer[index]=answer;
		if (index<data.asins.length-1) {
			index++;
			var ckbs = document.querySelectorAll('input[type="checkbox"]')
			ckbs.forEach((choice) => {choice.checked=false})
			var rads = document.querySelectorAll('input[type="radio"]')
			rads.forEach((choice) => {choice.checked=false})
			build_option_image(index)
		} else {
			const out_name = document.querySelector('#candidate_id').value+"_"+document.querySelector('#candidate_name').value +'_'+ (new Date)+'.json'
			const result = JSON.stringify(data)
			telechargerEnFichierText(out_name,result)
			alert('Test Done, Thank you!')
		}
	} else {
		alert('Fill ALL REQUIRED ANSWER befor Submit!')
	}
}
document.querySelector('#reftresh').addEventListener('click',(e)=>{build_option_image(index)})
document.querySelector('#Prev_hit').addEventListener('click',(e)=>{
	if (index>1) {
		index--;
		build_option_image(index)
	}else{
		alert('This is the first HIT!')
	}
})
document.querySelector('#Next_hit').addEventListener('click',(e)=>{
	if (index<data.asins.length-1) {
		index++;
		build_option_image(index)
	}else{
		alert('This is the last HIT!')
	}
})
